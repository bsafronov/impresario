export function getRandomByPercent(percent: number) {
  const min = -percent / 100;
  const max = percent / 100;
  return Math.random() * (max - min) + min;
}

export function getRandomUpTo(max: number) {
  const min = 0;
  return Math.random() * (max - min) + min;
}
