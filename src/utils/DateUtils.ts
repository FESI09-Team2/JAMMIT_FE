export const dateUtils = (isoDate: string) => {
  const date = new Date(isoDate);
  // 시간 변환
  const koreanDate = new Date(
    date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }),
  );
  const month = koreanDate.getMonth() + 1;
  const day = koreanDate.getDate();
  return `${month}월 ${day}일`;
};
export const timeUtils = (isoDate: string) => {
  const date = new Date(isoDate);
  // 시간 변환
  const koreanDate = new Date(
    date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }),
  );
  const hours = String(koreanDate.getHours()).padStart(2, '0');
  const minutes = String(koreanDate.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};