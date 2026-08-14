import type {
  Attempt,
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
}

export const localProgressStore = new LocalProgressStore();
