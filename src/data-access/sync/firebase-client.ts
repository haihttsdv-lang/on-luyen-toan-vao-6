import type { BackupData } from '../../types';
import { readFirebaseEnvConfig } from '../../core/sync/is-sync-available';

/**
 * Phần "nặng" của đồng bộ (SY-13) — SDK Firebase (~550KB) chỉ được import động từ đây,
 * và chỉ khi hàm trong file này thực sự được gọi (có mã đồng bộ hoặc người dùng bấm
 * tạo/liên kết mã). Không import tĩnh ở đầu file nào khác trong dự án.
 */

export interface CloudDoc {
  data: BackupData;
  updatedAt: number;
  updatedBy: string;
}

let appPromise: Promise<import('firebase/app').FirebaseApp> | null = null;
let authUidPromise: Promise<string> | null = null;

async function getApp() {
  if (!appPromise) {
    appPromise = (async () => {
      const config = readFirebaseEnvConfig();
      if (!config) {
        throw new Error('Đồng bộ chưa được cấu hình (thiếu biến môi trường Firebase).');
      }
      const { initializeApp } = await import('firebase/app');
      return initializeApp(config);
    })();
  }
  return appPromise;
}

/** SY-05: Anonymous Auth để Firestore Rules chặn được truy cập hoàn toàn không xác thực. */
async function getAuthUid(): Promise<string> {
  if (!authUidPromise) {
    authUidPromise = (async () => {
      const app = await getApp();
      const { getAuth, signInAnonymously } = await import('firebase/auth');
      const auth = getAuth(app);
      const cred = await signInAnonymously(auth);
      return cred.user.uid;
    })();
  }
  return authUidPromise;
}

async function getFirestoreDb() {
  const app = await getApp();
  const { getFirestore } = await import('firebase/firestore');
  return getFirestore(app);
}

/** Đọc document `progress_sync/{syncCode}` — trả về null nếu mã chưa từng được tạo. */
export async function pullFromCloud(syncCode: string): Promise<CloudDoc | null> {
  await getAuthUid();
  const db = await getFirestoreDb();
  const { doc, getDoc } = await import('firebase/firestore');
  const snap = await getDoc(doc(db, 'progress_sync', syncCode));
  if (!snap.exists()) return null;
  return snap.data() as CloudDoc;
}

/** Ghi đè document `progress_sync/{syncCode}` bằng dữ liệu hiện tại của máy này (SY-03). */
export async function pushToCloud(syncCode: string, data: BackupData): Promise<number> {
  const uid = await getAuthUid();
  const db = await getFirestoreDb();
  const { doc, setDoc } = await import('firebase/firestore');
  const updatedAt = Date.now();
  const payload: CloudDoc = { data, updatedAt, updatedBy: uid };
  await setDoc(doc(db, 'progress_sync', syncCode), payload);
  return updatedAt;
}
