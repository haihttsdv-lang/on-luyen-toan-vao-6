import Dexie, { type EntityTable } from 'dexie';
import type {
  Attempt,
  ErrorLogEntry,
  LearnerProfile,
  SessionOutcomeRecord,
  TestResult,
  TopicProgressRecord,
} from '../../types';

export interface AttemptRecord extends Attempt {
  id?: number;
}

export interface TestResultRecord extends TestResult {
  id?: number;
}

interface ProfileRecord extends LearnerProfile {
  id: 'singleton';
}

class VnAdvisorDB extends Dexie {
  attempts!: EntityTable<AttemptRecord, 'id'>;
  errorLog!: EntityTable<ErrorLogEntry, 'exerciseId'>;
  testResults!: EntityTable<TestResultRecord, 'id'>;
  profile!: EntityTable<ProfileRecord, 'id'>;
  topicProgress!: EntityTable<TopicProgressRecord, 'topicId'>;
  sessionOutcomes!: EntityTable<SessionOutcomeRecord, 'templateId'>;

  constructor() {
    super('vnadvisor-toan-vao-6');
    this.version(1).stores({
      attempts: '++id, exerciseId, timestamp, context',
      errorLog: 'exerciseId',
      testResults: '++id, configId, date',
      profile: 'id',
      topicProgress: 'topicId',
    });
    // v2 (URD v2.0): thêm bảng sessionOutcomes cho module Lộ trình học — additive, không phá dữ liệu cũ.
    this.version(2).stores({
      sessionOutcomes: 'templateId, completedAt',
    });
  }
}

export const db = new VnAdvisorDB();
