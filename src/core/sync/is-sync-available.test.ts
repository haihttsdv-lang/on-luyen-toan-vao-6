import { describe, expect, it } from 'vitest';
import { isSyncAvailable, readFirebaseEnvConfig } from './is-sync-available';

const FULL_ENV = {
  VITE_FIREBASE_API_KEY: 'key',
  VITE_FIREBASE_AUTH_DOMAIN: 'x.firebaseapp.com',
  VITE_FIREBASE_PROJECT_ID: 'x',
  VITE_FIREBASE_APP_ID: '1:1:web:1',
} as ImportMetaEnv;

describe('isSyncAvailable / readFirebaseEnvConfig (SY-14)', () => {
  it('trả về false/null khi thiếu toàn bộ biến môi trường', () => {
    expect(isSyncAvailable({} as ImportMetaEnv)).toBe(false);
    expect(readFirebaseEnvConfig({} as ImportMetaEnv)).toBeNull();
  });

  it('trả về false/null khi thiếu một biến bất kỳ', () => {
    const { VITE_FIREBASE_APP_ID: _omit, ...partial } = FULL_ENV;
    expect(isSyncAvailable(partial as ImportMetaEnv)).toBe(false);
  });

  it('trả về true/config đầy đủ khi có đủ biến môi trường', () => {
    expect(isSyncAvailable(FULL_ENV)).toBe(true);
    expect(readFirebaseEnvConfig(FULL_ENV)).toEqual({
      apiKey: 'key',
      authDomain: 'x.firebaseapp.com',
      projectId: 'x',
      appId: '1:1:web:1',
    });
  });
});
