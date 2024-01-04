import { baseWindow } from "./base-window";

export const openContacts = () => {
  if (<HTMLSpanElement>document.getElementById("contacts")) return;
  const content = document.createElement("div");
  content.id = "contacts";
  content.className = "p-4";
  content.innerHTML = `
    <h1 class="font-semibold text-2xl">Contacts</h1>
    <div class="mt-2 flex items-end">
      <img src="./assets/icons/briefcase.svg" class="w-6 h-6 mt-4">
      <span class="ml-2 text-lg">Business</span>
    </div>
    <a href="mailto:oak@tripleoak.vc" class="text-sm md:text-base text-pastel-blue underline">oak[at]tripleoak.vc</a>
    <div class="mt-2 flex items-end">
      <img src="./assets/icons/idea.svg" class="w-6 h-6 mt-4">
      <span class="ml-2 text-lg">Research</span>
    </div>
    <a href="mailto:oak@ziku.io" class="text-sm md:text-base text-pastel-blue underline">oak[at]ziku.io</a>
    <div class="mt-2 flex items-end">
      <img src="./assets/icons/user.svg" class="w-6 h-6 mt-4">
      <span class="ml-2 text-lg">Personal</span>
    </div>
    <p class="text-xs mt-1 mb-1">Requires proof-of-knowledge in the subject ("PoK quack: " + subject)</p>
    <a href="mailto:me+website@droak.sh" class="text-sm md:text-base text-pastel-blue underline">me+website[at]droak.sh</a>
  `;

  baseWindow("w-72 h-96 md:w-[30rem] md:h-96", content);
};
