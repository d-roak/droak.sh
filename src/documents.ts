import { baseWindow } from "./base-window";

export const openDocuments = () => {
  if (<HTMLSpanElement>document.getElementById("documents")) return;
  const content = document.createElement("div");
  content.id = "documents";
  content.className = "p-4";
  content.innerHTML = `
    <h1 class="font-semibold text-2xl">Coming Soon!</h1>
  `;

  baseWindow("w-72 h-28 md:w-1/2 md:h-3/4", content);
};
