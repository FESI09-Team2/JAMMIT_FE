import { dateUtils, timeUtils } from '../DateUtils';

describe('dateUtils test', () => {
  test('한국 날짜 작업', () => {
    const input = '2024-05-01T15:30:00.000Z'; // UTC
    const result = dateUtils(input);
    expect(result).toBe('5월 2일'); // KST는 +9시간이라 날짜 넘어감
  });
});

describe('timeUtils test', () => {
  test('한국 시간 작업', () => {
    const input = '2024-05-01T15:30:00.000Z'; // UTC
    const result = timeUtils(input);
    expect(result).toBe('00:30'); // +9시간
  });
});
