/**
 * Kiểm tra "nhẹ" (SY-13): đọc biến môi trường, KHÔNG import SDK Firebase (~550KB).
 * Trả về false nếu chưa cấu hình — giao diện khi đó hiện hướng dẫn thay vì lỗi (SY-14).
 */
export interface FirebaseEnvConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  appId: string;
}

export function readFirebaseEnvConfig(env: ImportMetaEnv = import.meta.env): FirebaseEnvConfig | null {
  const apiKey = env.VITE_FIREBASE_API_KEY;
  const authDomain = env.VITE_FIREBASE_AUTH_DOMAIN;
  const projectId = env.VITE_FIREBASE_PROJECT_ID;
  const appId = env.VITE_FIREBASE_APP_ID;
  if (!apiKey || !authDomain || !projectId || !appId) return null;
  return { apiKey, authDomain, projectId, appId };
}

export function isSyncAvailable(env: ImportMetaEnv = import.meta.env): boolean {
  return readFirebaseEnvConfig(env) !== null;
}
