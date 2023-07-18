export const colors = ["#DC2626", "#D97706", "#059669", "#7C3AED", "#DB2777"];

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function getRandomColor() {
  return colors[getRandomInt(colors.length)];
}
