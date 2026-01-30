import { openBlog } from "./windows/blog";
import { openContacts } from "./windows/contacts";
import { openExperience } from "./windows/experience";
import { openInfo } from "./windows/info";
import { openShell } from "./shell";
import { openSocialMedia } from "./windows/social_media";

const btns = [
  {
    icon: "./assets/icons/console.png",
    text: "Shell",
    position: "md:col-span-6 lg:col-span-12",
    onclick: () => {
      openShell();
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
    icon: "./assets/icons/briefcase.svg",
    text: "Experience",
    position: "md:col-span-6 lg:col-span-12",
    onclick: () => {
      openExperience();
    },
  },
  {
    icon: "./assets/icons/blog.png",
    text: "Blog",
    position: "md:col-span-6 lg:col-span-12",
    onclick: () => {
      openBlog();
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
