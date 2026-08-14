import type { SessionTemplate } from '../../types';
import { phase1Templates } from './phase1-templates';
import { phase2Templates } from './phase2-templates';
import { phase3Templates } from './phase3-templates';

export { curriculumPhases } from './phases';
export { phase1Templates, phase2Templates, phase3Templates };

/** Giai đoạn 4 không có ở đây — sinh động trong core/schedule theo trường mục tiêu (FR-C06). */
export const staticSessionTemplates: SessionTemplate[] = [...phase1Templates, ...phase2Templates, ...phase3Templates];
