import { createGlobalStyle } from "styled-components";
import Color from "colorjs.io";

// https://oklch.com/
const bgColor = new Color("oklch(32.44% 0.023 264.18)").to("hsl").toString();
const fgColor = new Color("oklch(95.13% 0.007 260.73)").to("hsl").toString();

const GlobalStyles = createGlobalStyle`  
:root {
  --max-width: 1100px;
  --border-radius: 12px;
  --font-mono: ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono",
    "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro",
    "Fira Mono", "Droid Sans Mono", "Courier New", monospace;

  --foreground-rgb: 236, 239, 244;
  --background-rgb: 46, 52, 64;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
}

body {
  color: ${fgColor};
  background: ${bgColor};
}
`;

export default GlobalStyles;
