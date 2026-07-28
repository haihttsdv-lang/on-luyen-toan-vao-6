import type { Exercise } from '../../types';
import { dh01Exercises } from './dh-01';
import { ps01Exercises } from './ps-01';
import { hh02Exercises } from './hh-02';

export const allExercises: Exercise[] = [...dh01Exercises, ...ps01Exercises, ...hh02Exercises];

export { dh01Exercises, ps01Exercises, hh02Exercises };
