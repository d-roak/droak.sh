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
    <a href="mailto:joao.carvalho+wp@tripleoak.pt" class="text-sm md:text-base text-pastel-blue underline">joao.carvalho[at]tripleoak.pt</a>
    <div class="mt-2 flex items-end">
      <img src="./assets/icons/idea.svg" class="w-6 h-6 mt-4">
      <span class="ml-2 text-lg">Institutional/Research</span>
    </div>
    <a href="mailto:jpld.carvalho+wp@campus.fct.unl.pt" class="text-sm md:text-base text-pastel-blue underline">jpld.carvalho[at]campus.fct.unl.pt</a>
    <div class="mt-2 flex items-end">
      <img src="./assets/icons/user.svg" class="w-6 h-6 mt-4">
      <span class="ml-2 text-lg">Personal</span>
    </div>
    <p class="text-xs mt-1 mb-1">Requires proof-of-knowledge in the subject ("PoK quack: " + subject)</p>
    <a href="mailto:me+wp@jpldcarvalho.com" class="text-sm md:text-base text-pastel-blue underline">me[at]jpldcarvalho.com</a>
  `;

  baseWindow("w-72 h-96 md:w-[30rem] md:h-96", content);
};
