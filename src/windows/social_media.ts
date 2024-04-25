import { baseWindow } from "../shared/base-window";

export const openSocialMedia = () => {
  if (<HTMLSpanElement>document.getElementById("social_media")) return;
  const content = document.createElement("div");
  content.id = "social_media";
  content.className = "p-4";
  content.innerHTML = `
    <h2 class="font-semibold text-xl">Technology</h2>
    <div class="flex items-end">
      <img src="./assets/icons/github.svg" class="w-8 h-8 mt-4">
      <a href="https://github.com/d-roak" target="_blank" class="ml-2 text-sm md:text-base text-pastel-blue underline">@d-roak</a>
    </div>
    <div class="flex items-end">
      <img src="./assets/icons/twitter.gif" class="w-8 h-8 mt-4">
      <a href="https://twitter.com/droak_" target="_blank" class="ml-2 text-sm md:text-base text-pastel-blue underline">@droak_</a>
    </div>
    <div class="flex items-end">
      <img src="./assets/icons/youtube.svg" class="w-8 h-8 mt-4">
      <a href="https://www.youtube.com/@droak_" target="_blank" class="ml-2 text-sm md:text-base text-pastel-blue underline">@droak_</a>
    </div>

    <h1 class="mt-6 font-semibold text-xl">Personal</h1>
    <div class="flex items-end">
      <img src="./assets/icons/instagram.png" class="w-8 h-8 mt-4">
      <a href="https://www.instagram.com/thisisoak___" target="_blank" class="ml-2 text-sm md:text-base text-pastel-blue underline">@thisisoak___</a>
    </div>
  `;

  baseWindow("w-72 h-96 md:w-[30rem]", content);
};
