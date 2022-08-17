import { baseWindow } from "./base-window";

export const openBrowser = (url: string) => {
  // TODO maybe in the future
  // - Url bar missing
  // - Proper iframes
  if (<HTMLSpanElement>document.getElementById("browser")) return;
  const content = document.createElement("div");
  content.id = "browser";
  content.innerHTML = `
    <iframe class="w-full h-screen" is="x-frame-bypass" src="` + url + `" />
  `;

  baseWindow("w-screen h-screen", content);
};
