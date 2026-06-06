import color from "picocolors";

export function info(msg: string) {
  console.log(color.cyan(`ℹ ${msg}`));
}

export function success(msg: string) {
  console.log(color.green(`✔ ${msg}`));
}

export function warning(msg: string) {
  console.log(color.yellow(`⚠ ${msg}`));
}

export function error(msg: string) {
  console.log(color.red(`✖ ${msg}`));
}

export function banner() {
  const lines = [
    "   _____ _______ ______ _____ _    _ ______ ",
    "  / ____|__   __|  ____|_   _| |  | |  ____|",
    " | (___    | |  | |__    | | | |  | | |__   ",
    "  \\___ \\   | |  |  __|   | | | |  | |  __|  ",
    "  ____) |  | |  | |     _| |_| |__| | |____ ",
    " |_____/   |_|  |_|    |_____|\\____/|______|",
  ];
  const colors = [color.green, color.cyan, color.green, color.cyan, color.green, color.cyan];
  for (let i = 0; i < lines.length; i++) {
    console.log(colors[i](lines[i]));
  }
  console.log();
}
