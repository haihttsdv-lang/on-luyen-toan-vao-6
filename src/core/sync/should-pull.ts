/**
 * Quyết định khi mở app: kéo dữ liệu cloud về hay đẩy dữ liệu máy này lên (SY-07, SY-10).
 * Chỉ kéo về nếu cloud mới hơn mốc đồng bộ gần nhất của máy này — tránh kéo lại dữ liệu
 * không đổi mỗi lần mở app. Nếu máy này chưa từng đồng bộ (`lastSyncedAt === null`),
 * luôn kéo về trước (ưu tiên dữ liệu đã có trên cloud khi liên kết vào mã có sẵn).
 */
export function shouldPullFromCloud(cloudUpdatedAt: number, lastSyncedAt: number | null): boolean {
  return lastSyncedAt === null || cloudUpdatedAt > lastSyncedAt;
}
