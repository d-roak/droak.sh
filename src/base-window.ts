export const baseWindow = (
  width: string,
  height: string,
  content: HTMLElement
) => {
  const canvas = <HTMLSpanElement>document.getElementById("canvas");

  const base = document.createElement("div");
  base.classList.add("window");
  base.style.width = width;
  base.style.height = height;

  // create header
  const header = document.createElement("div");
  header.classList.add("window-header");

  const minimize = document.createElement("button");
  minimize.classList.add("window-maximize");
  minimize.innerHTML = "<img src='./assets/icons/plus.png'>";
  minimize.onclick = () => {
    base.classList.add("minimized");
  };
  const close = document.createElement("button");
  close.classList.add("window-close");
  close.innerHTML = "<img src='./assets/icons/cancel.svg'>";
  close.onclick = () => {
    canvas.removeChild(base);
  };
  header.appendChild(minimize);
  header.appendChild(close);

  // create content area
  const contentArea = document.createElement("div");
  contentArea.classList.add("window-content");
  contentArea.appendChild(content);

  base.appendChild(header);
  base.appendChild(contentArea);
  canvas.appendChild(base);
};
