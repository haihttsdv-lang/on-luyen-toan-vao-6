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
import { dhPriorityMoreExercises } from './dh-priority-more';
import { psPriorityMoreExercises } from './ps-priority-more';
import { hhPriorityMoreExercises } from './hh-priority-more';
import { shPriorityMoreExercises } from './sh-priority-more';
import { shExpandExercises } from './sh-expand';
import { psExpandExercises } from './ps-expand';
import { dhExpandExercises } from './dh-expand';
import { hhExpandExercises } from './hh-expand';
import { dlExpandExercises } from './dl-expand';
import { tdExpandExercises } from './td-expand';
import { v2NewExercises } from './v2-new';

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
  ...dhPriorityMoreExercises,
  ...psPriorityMoreExercises,
  ...hhPriorityMoreExercises,
  ...shPriorityMoreExercises,
  ...shExpandExercises,
  ...psExpandExercises,
  ...dhExpandExercises,
  ...hhExpandExercises,
  ...dlExpandExercises,
  ...tdExpandExercises,
  ...v2NewExercises,
];

export { dh01Exercises, ps01Exercises, hh02Exercises };
