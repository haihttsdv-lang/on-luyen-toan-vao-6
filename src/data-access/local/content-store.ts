import type { Exercise, TestConfig, Topic } from '../../types';
import type { ContentStore, ExerciseFilter } from '../types';
import { allTopics } from '../../content/topics';
import { allExercises } from '../../content/exercises';
import { allTestConfigs } from '../../content/test-configs';

export class LocalContentStore implements ContentStore {
  async listTopics(): Promise<Topic[]> {
    return allTopics;
  }

  async getTopic(id: string): Promise<Topic | undefined> {
    return allTopics.find((t) => t.id === id);
  }

  async listExercises(filter?: ExerciseFilter): Promise<Exercise[]> {
    let exercises = allExercises;
    if (filter?.topicIds && filter.topicIds.length > 0) {
      const wanted = new Set(filter.topicIds);
      exercises = exercises.filter((e) => e.topicIds.some((tid) => wanted.has(tid)));
    }
    if (filter?.level) {
      exercises = exercises.filter((e) => e.level === filter.level);
    }
    return exercises;
  }

  async getExercise(id: string): Promise<Exercise | undefined> {
    return allExercises.find((e) => e.id === id);
  }

  async listTestConfigs(): Promise<TestConfig[]> {
    return allTestConfigs;
  }

  async getTestConfig(id: string): Promise<TestConfig | undefined> {
    return allTestConfigs.find((c) => c.id === id);
  }
}

export const localContentStore = new LocalContentStore();
