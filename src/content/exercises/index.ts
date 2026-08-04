import type { Exercise } from '../../types';
import { dh01Exercises } from './dh-01';
import { ps01Exercises } from './ps-01';
import { hh02Exercises } from './hh-02';
import { shExercises } from './sh';
import { psMoreExercises } from './ps-more';
import { dhMoreExercises } from './dh-more';
import { hhMoreExercises } from './hh-more';
import { dlExercises } from './dl';
import { tdExercises } from './td';

export const allExercises: Exercise[] = [
  ...dh01Exercises,
  ...ps01Exercises,
  ...hh02Exercises,
  ...shExercises,
  ...psMoreExercises,
  ...dhMoreExercises,
  ...hhMoreExercises,
  ...dlExercises,
  ...tdExercises,
];

export { dh01Exercises, ps01Exercises, hh02Exercises };
