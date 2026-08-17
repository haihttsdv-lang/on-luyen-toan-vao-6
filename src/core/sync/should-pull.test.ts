import { describe, expect, it } from 'vitest';
import { shouldPullFromCloud } from './should-pull';

describe('shouldPullFromCloud (SY-07, SY-10)', () => {
  it('luôn kéo về nếu máy này chưa từng đồng bộ', () => {
    expect(shouldPullFromCloud(1000, null)).toBe(true);
  });

  it('kéo về khi cloud mới hơn mốc đồng bộ gần nhất', () => {
    expect(shouldPullFromCloud(2000, 1000)).toBe(true);
  });

  it('không kéo về khi cloud không mới hơn (đẩy lên thay vào đó)', () => {
    expect(shouldPullFromCloud(1000, 1000)).toBe(false);
    expect(shouldPullFromCloud(500, 1000)).toBe(false);
  });
});
