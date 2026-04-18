export function pickRandom<T = any>(array: T[]): number {
  return Math.floor(Math.random() * array.length);
}
