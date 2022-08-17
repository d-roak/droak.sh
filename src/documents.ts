import { baseWindow } from "./base-window";

export const openDocuments = () => {
  if (<HTMLSpanElement>document.getElementById("documents")) return;
  const content = document.createElement("div");
  content.id = "documents";
  content.className = "p-4";
  content.innerHTML = `
    <h1 class="font-semibold text-2xl">Coming soon!</h1>
  `;

  baseWindow("w-72 h-28 md:w-72 md:h-28", content);
};
