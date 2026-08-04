import type { Topic } from '../../types';
import { dh01 } from './dh-01';
import { ps01 } from './ps-01';
import { hh02 } from './hh-02';
import { shTopics } from './sh';
import { psMoreTopics } from './ps-more';
import { dhMoreTopics } from './dh-more';
import { hhMoreTopics } from './hh-more';
import { dlTopics } from './dl';
import { tdTopics } from './td';

export const allTopics: Topic[] = [
  dh01,
  ps01,
  hh02,
  ...shTopics,
  ...psMoreTopics,
  ...dhMoreTopics,
  ...hhMoreTopics,
  ...dlTopics,
  ...tdTopics,
];

export { dh01, ps01, hh02 };
