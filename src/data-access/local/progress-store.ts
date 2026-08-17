import type {
  Attempt,
  BackupData,
  ErrorLogEntry,
  ErrorType,
  LearnerProfile,
  SessionOutcomeRecord,
  TestResult,
  TopicProgressRecord,
} from '../../types';
import type { AttemptFilter, ProgressStore } from '../types';
import { applyAttemptToErrorLog } from '../../core/error-log/apply-attempt';
import { db } from './db';

const PROFILE_ID = 'singleton' as const;

export class LocalProgressStore implements ProgressStore {
  async addAttempt(attempt: Attempt): Promise<void> {
    await db.attempts.add(attempt);
    const currentLog = await db.errorLog.toArray();
    const updatedLog = applyAttemptToErrorLog(currentLog, attempt.exerciseId, attempt.correct, attempt.timestamp);
    await db.transaction('rw', db.errorLog, async () => {
      await db.errorLog.clear();
      if (updatedLog.length > 0) {
        await db.errorLog.bulkPut(updatedLog);
      }
    });
  }

  async updateAttemptErrorType(exerciseId: string, timestamp: string, errorType: ErrorType): Promise<void> {
    await db.attempts.where({ exerciseId, timestamp }).modify({ errorType });
  }

  async getAttempts(filter?: AttemptFilter): Promise<Attempt[]> {
    let attempts = await db.attempts.toArray();
    if (filter?.exerciseId) {
      attempts = attempts.filter((a) => a.exerciseId === filter.exerciseId);
    }
    if (filter?.context) {
      attempts = attempts.filter((a) => a.context === filter.context);
    }
    return attempts;
  }

  async getErrorLog(): Promise<ErrorLogEntry[]> {
    return db.errorLog.toArray();
  }

  async saveTestResult(result: TestResult): Promise<void> {
    await db.testResults.add(result);
  }

  async getTestResults(): Promise<TestResult[]> {
    return db.testResults.toArray();
  }

  async getProfile(): Promise<LearnerProfile | undefined> {
    const record = await db.profile.get(PROFILE_ID);
    if (!record) return undefined;
    const { id: _id, ...profile } = record;
    return profile;
  }

  async saveProfile(profile: LearnerProfile): Promise<void> {
    await db.profile.put({ ...profile, id: PROFILE_ID });
  }

  async getTopicProgress(topicId: string): Promise<TopicProgressRecord | undefined> {
    return db.topicProgress.get(topicId);
  }

  async listTopicProgress(): Promise<TopicProgressRecord[]> {
    return db.topicProgress.toArray();
  }

  async saveTopicProgress(record: TopicProgressRecord): Promise<void> {
    await db.topicProgress.put(record);
  }

  async saveSessionOutcome(record: SessionOutcomeRecord): Promise<void> {
    await db.sessionOutcomes.put(record);
  }

  async listSessionOutcomes(): Promise<SessionOutcomeRecord[]> {
    return db.sessionOutcomes.toArray();
  }

  async exportAll(): Promise<BackupData> {
    const [attempts, errorLog, testResults, profile, topicProgress, sessionOutcomes] = await Promise.all([
      this.getAttempts(),
      this.getErrorLog(),
      this.getTestResults(),
      this.getProfile(),
      this.listTopicProgress(),
      this.listSessionOutcomes(),
    ]);
    return {
      version: 1,
      exportedAt: new Date().toISOString(),
      attempts,
      errorLog,
      testResults,
      profile,
      topicProgress,
      sessionOutcomes,
    };
  }

  async importAll(data: BackupData): Promise<void> {
    await db.transaction(
      'rw',
      [db.attempts, db.errorLog, db.testResults, db.profile, db.topicProgress, db.sessionOutcomes],
      async () => {
        await db.attempts.clear();
        await db.attempts.bulkAdd(data.attempts.map((a) => ({ ...a })));

        await db.errorLog.clear();
        if (data.errorLog.length > 0) await db.errorLog.bulkPut(data.errorLog);

        await db.testResults.clear();
        await db.testResults.bulkAdd(data.testResults.map((r) => ({ ...r })));

        await db.profile.clear();
        if (data.profile) await db.profile.put({ ...data.profile, id: PROFILE_ID });

        await db.topicProgress.clear();
        if (data.topicProgress.length > 0) await db.topicProgress.bulkPut(data.topicProgress);

        await db.sessionOutcomes.clear();
        if (data.sessionOutcomes.length > 0) await db.sessionOutcomes.bulkPut(data.sessionOutcomes);
      },
    );
  }
}

export const localProgressStore = new LocalProgressStore();
