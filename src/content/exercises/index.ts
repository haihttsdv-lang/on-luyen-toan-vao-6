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
import { shExpand2Exercises } from './sh-expand2';
import { psExpand2Exercises } from './ps-expand2';
import { dhExpand2Exercises } from './dh-expand2';
import { hhExpand2Exercises } from './hh-expand2';
import { dlExpand2Exercises } from './dl-expand2';
import { tdExpand2Exercises } from './td-expand2';
import { essayPriorityExercises } from './essay-priority';

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
  ...shExpand2Exercises,
  ...psExpand2Exercises,
  ...dhExpand2Exercises,
  ...hhExpand2Exercises,
  ...dlExpand2Exercises,
  ...tdExpand2Exercises,
  ...essayPriorityExercises,
];

export { dh01Exercises, ps01Exercises, hh02Exercises };
