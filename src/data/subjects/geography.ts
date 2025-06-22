
import { Chapter } from '../types';
import { foundationChapters } from './geography/foundation';
import { grade11Chapters } from './geography/grade11';
import { grade12EthiopianGeographyChapters } from './geography/grade12/index';

export const geographyChapters: Chapter[] = [
  ...foundationChapters,
  ...grade11Chapters,
  ...grade12EthiopianGeographyChapters
];
