const KEY = 'ol6m.curriculum.inProgressTemplateId';

/** Đánh dấu buổi học đang mở dở — phục vụ banner "Quay lại buổi học đang dở" (FR-C08). */
export function markSessionInProgress(templateId: string): void {
  localStorage.setItem(KEY, templateId);
}

export function clearSessionInProgress(): void {
  localStorage.removeItem(KEY);
}

export function getInProgressTemplateId(): string | null {
  return localStorage.getItem(KEY);
}
