import Dexie, { type EntityTable } from 'dexie';
import type { Attempt, ErrorLogEntry, LearnerProfile, TestResult, TopicProgressRecord } from '../../types';

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

  constructor() {
    super('vnadvisor-toan-vao-6');
    this.version(1).stores({
      attempts: '++id, exerciseId, timestamp, context',
      errorLog: 'exerciseId',
      testResults: '++id, configId, date',
      profile: 'id',
      topicProgress: 'topicId',
    });
  }
}

export const db = new VnAdvisorDB();
