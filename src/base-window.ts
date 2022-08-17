export const baseWindow = (
  dimensions: string,
  content: HTMLElement
) => {
  const canvas = <HTMLSpanElement>document.getElementById("canvas");

  const base = document.createElement("div");
  base.className = "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-pastel-grey rounded-2xl " + dimensions;

  // Header
  const header = document.createElement("div");
  header.className = "absolute top-0 left-0 w-full h-6 bg-pastel-blue border-b-2 border-pastel-grey rounded-t-2xl";

  // Header buttons
  const maximize = document.createElement("button");
  maximize.classList.add("window-maximize");
  maximize.innerHTML = "<img src='./assets/icons/plus.png'>";
  maximize.onclick = () => {
    base.className = "w-full h-full";
    base.removeChild(maximize);
    base.appendChild(minimize);
  }
  const minimize = document.createElement("button");
  minimize.classList.add("window-maximize");
  minimize.innerHTML = "<img src='./assets/icons/minus.png'>";
  minimize.onclick = () => {
    base.className = "w-12 h-12";
    base.removeChild(minimize);
    base.appendChild(maximize);
  };
  const close = document.createElement("button");
  close.classList.add("window-close");
  close.innerHTML = "<img src='./assets/icons/cancel.svg'>";
  close.onclick = () => {
    canvas.removeChild(base);
  };
  header.appendChild(minimize);
  header.appendChild(close);

  // Content area
  const contentArea = document.createElement("div");
  contentArea.classList.add("window-content");
  contentArea.appendChild(content);

  base.appendChild(header);
  base.appendChild(contentArea);
  canvas.appendChild(base);
};
