import { openFileManager } from "./filemanager";
import { openContacts } from "./contacts";
import { openInfo } from "./info";

const btns = [
  {
    icon: "./assets/icons/console.png",
    text: "Shell Version",
    position: "top-left",
    onclick: () => {
      window.open("https://jpldcarvalho.sh", "_blank")?.focus();
    },
  },
  {
    icon: "./assets/icons/opened-folder.gif",
    text: "Documents",
    position: "top-left",
    onclick: () => {
      openFileManager();
    },
  },
  {
    icon: "./assets/icons/contacts.svg",
    text: "Contacts",
    position: "top-left",
    onclick: () => {
      openContacts();
    },
  },
  {
    icon: "./assets/icons/github.svg",
    text: "GitHub",
    position: "bottom-left",
    onclick: () => {
      window.open("https://github.com/jpldcarvalho", "_blank")?.focus();
    },
  },
  {
    icon: "./assets/icons/twitter.gif",
    text: "Twitter",
    position: "bottom-left",
    onclick: () => {
      window.open("https://twitter.com/jpldcarvalho", "_blank")?.focus();
    },
  },
  {
    icon: "./assets/icons/linkedin.gif",
    text: "LinkedIn",
    position: "bottom-left",
    onclick: () => {
      window.open("https://linkedin.com/in/jpldcarvalho", "_blank")?.focus();
    },
  },
  {
    icon: "./assets/icons/youtube.svg",
    text: "YouTube",
    position: "bottom-left",
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
    position: "bottom-right",
    onclick: () => {
      openInfo();
    },
  },
];

const render = () => {
  const canvas = <HTMLSpanElement>document.getElementById("canvas");
  let positions: any = {};
  for (const btn of btns) {
    const btnEl = document.createElement("button");
    btnEl.innerHTML = `<img src="${btn.icon}"><span class="caption">${btn.text}</span>`;
    btnEl.classList.add("btn");
    btnEl.onclick = btn.onclick;
    if (!positions[btn.position]) positions[btn.position] = [];
    positions[btn.position].push(btnEl);
  }
  for (const k in positions) {
    const wrapper = document.createElement("div");
    wrapper.classList.add(k);
    for (const btn of positions[k]) {
      wrapper.appendChild(btn);
    }
    canvas.appendChild(wrapper);
  }
};

render();
