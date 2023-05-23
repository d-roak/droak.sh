import { baseWindow } from "./base-window";

export const openInfo = () => {
  if (<HTMLSpanElement>document.getElementById("info")) return;
  const content = document.createElement("div");
  content.id = "info";
  content.className = "p-4";
  content.innerHTML = `
    <h1 class="font-semibold text-2xl">Info</h1>
    <p class="mt-8">
      You can check the source code on <a href="https://github.com/d-roak/droak.sh" class="text-pastel-blue underline">GitHub</a>
    </p>
    <p class="mt-8">
      All the icons are from <a href="https://icons8.com/" class="text-pastel-blue underline">Icons8</a>
    </p>
  `;

  baseWindow("w-72 h-80 md:w-96 md:h-96", content);
};
