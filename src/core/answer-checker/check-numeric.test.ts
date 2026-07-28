import { describe, expect, it } from 'vitest';
import { checkNumericAnswer } from './check-numeric';
import type { NumericAnswerSpec } from './types';

function spec(overrides: Partial<NumericAnswerSpec> = {}): NumericAnswerSpec {
  return {
    kind: 'single',
    acceptedValues: ['1/2'],
    tolerance: 0,
    ...overrides,
  };
}

describe('FR-M05: dấu thập phân — dấu phẩy và dấu chấm tương đương', () => {
  it('chấp nhận dấu phẩy kiểu Việt Nam', () => {
    expect(checkNumericAnswer(spec({ acceptedValues: ['4.65'] }), '4,65')).toEqual({ status: 'correct' });
  });
  it('chấp nhận dấu chấm', () => {
    expect(checkNumericAnswer(spec({ acceptedValues: ['4.65'] }), '4.65')).toEqual({ status: 'correct' });
  });
  it('hai cách viết ra cùng kết quả', () => {
    const s = spec({ acceptedValues: ['4,65'] }); // đề cũng có thể lưu dạng phẩy
    expect(checkNumericAnswer(s, '4.65')).toEqual({ status: 'correct' });
  });
});

describe('FR-M06: phân số và số thập phân tương đương', () => {
  it('1/2 và 0,5 là cùng đáp án', () => {
    expect(checkNumericAnswer(spec({ acceptedValues: ['1/2'] }), '0,5')).toEqual({ status: 'correct' });
  });
  it('0.5 và đáp án phân số 1/2', () => {
    expect(checkNumericAnswer(spec({ acceptedValues: ['1/2'] }), '0.5')).toEqual({ status: 'correct' });
  });
  it('requireExactForm=true: từ chối thập phân khi đề yêu cầu đúng dạng phân số', () => {
    expect(checkNumericAnswer(spec({ acceptedValues: ['1/2'], requireExactForm: true }), '0.5')).toEqual({
      status: 'incorrect',
    });
  });
});

describe('FR-M07: phân số chưa tối giản', () => {
  it('2/4 được chấp nhận khi đáp án là 1/2', () => {
    expect(checkNumericAnswer(spec({ acceptedValues: ['1/2'] }), '2/4')).toEqual({ status: 'correct' });
  });
  it('requireSimplified=true: từ chối 2/4 khi đề yêu cầu tối giản', () => {
    expect(checkNumericAnswer(spec({ acceptedValues: ['1/2'], requireSimplified: true }), '2/4')).toEqual({
      status: 'incorrect',
    });
  });
  it('requireSimplified=true: vẫn chấp nhận 1/2 (đã tối giản)', () => {
    expect(checkNumericAnswer(spec({ acceptedValues: ['1/2'], requireSimplified: true }), '1/2')).toEqual({
      status: 'correct',
    });
  });
});

describe('FR-M08: hỗn số', () => {
  it('1 1/2 và 3/2 tương đương', () => {
    expect(checkNumericAnswer(spec({ acceptedValues: ['3/2'] }), '1 1/2')).toEqual({ status: 'correct' });
  });
  it('3/2 khớp đáp án hỗn số', () => {
    expect(checkNumericAnswer(spec({ acceptedValues: ['1 1/2'] }), '3/2')).toEqual({ status: 'correct' });
  });
});

describe('FR-M09: khoảng trắng và dấu phân cách hàng nghìn', () => {
  const intSpec = spec({ acceptedValues: ['1000'], isInteger: true });
  it('"1 000" bằng 1000', () => {
    expect(checkNumericAnswer(intSpec, '1 000')).toEqual({ status: 'correct' });
  });
  it('"1.000" bằng 1000', () => {
    expect(checkNumericAnswer(intSpec, '1.000')).toEqual({ status: 'correct' });
  });
  it('"1000" bằng 1000', () => {
    expect(checkNumericAnswer(intSpec, '1000')).toEqual({ status: 'correct' });
  });
});

describe('FR-M10: đơn vị đo', () => {
  const s = spec({ acceptedValues: ['5'], unit: 'cm' });
  it('nhập kèm đơn vị đúng vẫn được chấp nhận', () => {
    expect(checkNumericAnswer(s, '5 cm')).toEqual({ status: 'correct' });
  });
  it('không nhập đơn vị vẫn đúng', () => {
    expect(checkNumericAnswer(s, '5')).toEqual({ status: 'correct' });
  });
  it('nhập sai đơn vị bị tính là sai kèm thông báo', () => {
    const result = checkNumericAnswer(s, '5 m');
    expect(result.status).toBe('wrong_unit');
  });
});

describe('FR-M11: sai số cho phép (tolerance)', () => {
  it('mặc định tolerance=0 khớp tuyệt đối', () => {
    expect(checkNumericAnswer(spec({ acceptedValues: ['3.14'] }), '3.141')).toEqual({ status: 'incorrect' });
  });
  it('tolerance > 0 chấp nhận sai số nhỏ (số pi)', () => {
    expect(checkNumericAnswer(spec({ acceptedValues: ['3.14159'], tolerance: 0.01 }), '3.14')).toEqual({
      status: 'correct',
    });
  });
  it('tolerance > 0 vẫn từ chối nếu lệch quá ngưỡng', () => {
    expect(checkNumericAnswer(spec({ acceptedValues: ['3.14159'], tolerance: 0.001 }), '3.2')).toEqual({
      status: 'incorrect',
    });
  });
});

describe('FR-M12: nhiều đáp án đúng (dạng danh sách)', () => {
  const s = spec({ kind: 'list', acceptedValues: ['121', '131', '141'], isInteger: true });
  it('liệt kê đủ và đúng thứ tự bất kỳ', () => {
    expect(checkNumericAnswer(s, '131, 121, 141')).toEqual({ status: 'correct' });
  });
  it('thiếu một giá trị bị tính sai', () => {
    expect(checkNumericAnswer(s, '121, 131')).toEqual({ status: 'incorrect' });
  });
  it('thừa giá trị bị tính sai', () => {
    expect(checkNumericAnswer(s, '121, 131, 141, 151')).toEqual({ status: 'incorrect' });
  });
});

describe('FR-M13: đáp án âm và số 0', () => {
  it('nhận đúng số âm', () => {
    expect(checkNumericAnswer(spec({ acceptedValues: ['-3'], isInteger: true }), '-3')).toEqual({
      status: 'correct',
    });
  });
  it('không nhầm số 0 với chuỗi rỗng', () => {
    expect(checkNumericAnswer(spec({ acceptedValues: ['0'], isInteger: true }), '0')).toEqual({ status: 'correct' });
  });
  it('chuỗi rỗng là lỗi định dạng, không phải số 0', () => {
    const result = checkNumericAnswer(spec({ acceptedValues: ['0'], isInteger: true }), '');
    expect(result.status).toBe('format_error');
  });
});

describe('FR-M14: lỗi định dạng nhập', () => {
  it('nhập chữ vào ô số trả về format_error kèm hướng dẫn', () => {
    const result = checkNumericAnswer(spec({ acceptedValues: ['5'] }), 'năm');
    expect(result.status).toBe('format_error');
    if (result.status === 'format_error') {
      expect(result.message.length).toBeGreaterThan(0);
    }
  });
  it('mẫu số bằng 0 trả về format_error', () => {
    const result = checkNumericAnswer(spec({ acceptedValues: ['1/2'] }), '1/0');
    expect(result.status).toBe('format_error');
  });
});
