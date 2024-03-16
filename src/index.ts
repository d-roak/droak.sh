import { openDocuments } from "./windows/documents";
import { openContacts } from "./windows/contacts";
import { openInfo } from "./windows/info";
import { openShell } from "./shell";
import { openSocialMedia } from "./windows/social_media";

const btns = [
  {
    icon: "./assets/icons/console.png",
    text: "Shell",
    position: "hidden lg:block lg:col-span-12",
    onclick: () => {
      openShell();
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
    position: "md:col-span-6 lg:col-span-12",
    onclick: () => {
      openContacts();
    },
  },
  {
    icon: "./assets/icons/brain.png",
    text: "Knowledge",
    position: "md:col-span-6 lg:col-span-12 md:row-span-3 align-top items-start",
    onclick: () => {
      window.open("https://knowledge.droak.sh", "_blank")?.focus();
    },
  },
  {
    icon: "./assets/icons/social_media.png",
    text: "Social Media",
    position: "md:col-span-5 lg:col-span-11",
    onclick: () => {
      openSocialMedia();
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
