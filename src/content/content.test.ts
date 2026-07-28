import { describe, expect, it } from 'vitest';
import { allTopics } from './topics';
import { allExercises } from './exercises';
import { parseNumericToken, isParseError } from '../core/answer-checker/parse';

/**
 * Kiểm tra tự động lớp 1 (Mục 13, Giai đoạn 7): mọi bài `numeric` có `acceptedValues`
 * hợp lệ, mọi bài `mcq` có đúng 4 lựa chọn và chỉ số đáp án hợp lệ, mọi bài đều có
 * `solutionSteps` không rỗng.
 */
describe('Kiểm chứng cấu trúc nội dung', () => {
  const topicIds = new Set(allTopics.map((t) => t.id));

  it('mọi chuyên đề có đủ công thức, ví dụ và câu kiểm tra nhanh', () => {
    for (const topic of allTopics) {
      expect(topic.formulas.length, `${topic.id} thiếu công thức`).toBeGreaterThan(0);
      expect(topic.examples.length, `${topic.id} cần ít nhất 2 ví dụ`).toBeGreaterThanOrEqual(2);
      for (const example of topic.examples) {
        expect(example.steps.length, `${topic.id}: ví dụ thiếu lời giải từng bước`).toBeGreaterThan(0);
      }
      expect(topic.quickCheck.length, `${topic.id} cần 3-5 câu kiểm tra nhanh`).toBeGreaterThanOrEqual(3);
      expect(topic.quickCheck.length).toBeLessThanOrEqual(5);
    }
  });

  it('mọi bài tập tham chiếu tới chuyên đề có thật và có lời giải từng bước', () => {
    for (const ex of allExercises) {
      expect(ex.topicIds.length, `${ex.id} phải gắn ít nhất 1 chuyên đề`).toBeGreaterThan(0);
      for (const tid of ex.topicIds) {
        expect(topicIds.has(tid), `${ex.id} tham chiếu chuyên đề không tồn tại: ${tid}`).toBe(true);
      }
      expect(ex.solutionSteps.length, `${ex.id} thiếu lời giải từng bước`).toBeGreaterThan(0);
    }
  });

  it('mọi bài mcq có đúng 4 lựa chọn và chỉ số đáp án hợp lệ', () => {
    for (const ex of allExercises.filter((e) => e.answerType === 'mcq')) {
      expect(ex.mcq, `${ex.id} thiếu dữ liệu mcq`).toBeDefined();
      expect(ex.mcq!.options.length).toBe(4);
      expect(ex.mcq!.answerIndex).toBeGreaterThanOrEqual(0);
      expect(ex.mcq!.answerIndex).toBeLessThanOrEqual(3);
    }
  });

  it('mọi bài numeric có acceptedValues hợp lệ, parse được không lỗi', () => {
    for (const ex of allExercises.filter((e) => e.answerType === 'numeric')) {
      expect(ex.numeric, `${ex.id} thiếu dữ liệu numeric`).toBeDefined();
      expect(ex.numeric!.acceptedValues.length, `${ex.id} thiếu acceptedValues`).toBeGreaterThan(0);
      for (const v of ex.numeric!.acceptedValues) {
        const parsed = parseNumericToken(v, ex.numeric!.isInteger);
        expect(isParseError(parsed), `${ex.id}: acceptedValue "${v}" không parse được`).toBe(false);
      }
    }
  });

  it('mọi bài essay có lời giải mẫu và tiêu chí chấm điểm', () => {
    for (const ex of allExercises.filter((e) => e.answerType === 'essay')) {
      expect(ex.essay, `${ex.id} thiếu dữ liệu essay`).toBeDefined();
      expect(ex.essay!.modelSolution.length, `${ex.id} thiếu lời giải mẫu`).toBeGreaterThan(0);
      expect(ex.essay!.rubric.length, `${ex.id} thiếu tiêu chí chấm điểm`).toBeGreaterThan(0);
    }
  });
});
