import { openDocuments } from "./documents";
import { openContacts } from "./contacts";
import { openInfo } from "./info";

const btns = [
  {
    icon: "./assets/icons/console.png",
    text: "Shell Version",
    position: "md:col-span-6 lg:col-span-12",
    onclick: () => {
      window.open("https://shell.droak.sh", "_blank")?.focus();
    },
  },
  {
    icon: "./assets/icons/opened-folder.gif",
    text: "Documents",
    position: "md:col-span-6 lg:col-span-12",
    onclick: () => {
      openDocuments();
    },
  },
  {
    icon: "./assets/icons/contacts.svg",
    text: "Contacts",
    position: "md:col-span-6 lg:col-span-12 md:row-span-3 align-top items-start",
    onclick: () => {
      openContacts();
    },
  },
  {
    icon: "./assets/icons/github.svg",
    text: "GitHub",
    position: "",
    onclick: () => {
      window.open("https://github.com/d-roak", "_blank")?.focus();
    },
  },
  {
    icon: "./assets/icons/twitter.gif",
    text: "Twitter",
    position: "",
    onclick: () => {
      window.open("https://twitter.com/droak_", "_blank")?.focus();
    },
  },
  {
    icon: "./assets/icons/youtube.svg",
    text: "YouTube",
    position: "md:col-span-2 lg:col-span-8",
    onclick: () => {
      window
        .open(
          "https://www.youtube.com/channel/UC0vboDaMi68l2c-lAkiPAzw",
          "_blank"
        )
        ?.focus();
    },
  },
  {
    icon: "./assets/icons/info.gif",
    text: "Info",
    position: "",
    onclick: () => {
      openInfo();
    },
  },
];

const render = () => {
  const canvas = <HTMLSpanElement>document.getElementById("canvas");
  const base = document.createElement("div");
  canvas.appendChild(base);
  base.className = "h-screen py-5 px-10 grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-4";
  for (const btn of btns) {
    const divEl = document.createElement("div");
    const btnEl = document.createElement("button");
    btnEl.innerHTML = `
    <img src="${btn.icon}" class="mx-auto w-16 h-16">
    <span class="block w-24 mt-2 text-base font-['dynapuff'] text-pastel-dark-grey font-medium">${btn.text}</span>`;
    divEl.className = btn.position;
    btnEl.className = "align-middle focus-visible:outline-none";
    btnEl.onclick = btn.onclick;
    divEl.appendChild(btnEl);
    base.appendChild(divEl);
  }
};

render();
