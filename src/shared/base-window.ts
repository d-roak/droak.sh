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
  const genericBtnStyle = "absolute top-1/2 h-4 w-4 border-2 border-pastel-grey rounded-full -translate-y-1/2 cursor-pointer";
  const genericBtnImgStyle = "absolute h-3 w-3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
  
  const maximize = document.createElement("button");
  maximize.className = genericBtnStyle + " bg-pastel-green right-10";
  maximize.innerHTML = "<img src='./assets/icons/plus.png' class='" + genericBtnImgStyle + "'>";
  maximize.onclick = () => {
    base.className = "w-full h-full";
    header.className = header.className.replace(" rounded-t-2xl", "");
    contentArea.className = contentArea.className.replace(" rounded-b-2xl", "");
    header.removeChild(maximize);
    header.appendChild(minimize);
  }

  const minimize = document.createElement("button");
  minimize.className = genericBtnStyle + " bg-pastel-green right-10";
  minimize.innerHTML = "<img src='./assets/icons/subtract.png' class='" + genericBtnImgStyle + "'>";
  minimize.onclick = () => {
    base.className = "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-pastel-grey rounded-2xl " + dimensions;
    header.className = header.className + " rounded-t-2xl";
    contentArea.className = contentArea.className + " rounded-b-2xl";
    header.removeChild(minimize);
    header.appendChild(maximize);
  };
  
  const close = document.createElement("button");
  close.className = genericBtnStyle + " bg-pastel-red right-4 !border-pastel-dark-grey";
  close.innerHTML = "<img src='./assets/icons/cancel.svg' class='" + genericBtnImgStyle + " !h-4 !w-4'>";
  close.onclick = () => {
    canvas.removeChild(base);
  };
  
  header.appendChild(maximize);
  header.appendChild(close);

  // Content area
  const contentArea = document.createElement("div");
  contentArea.className = "absolute top-6 left-0 w-full h-[calc(100%-1.5rem)] overflow-y-auto overflow-x-hidden bg-pastel-yellow rounded-b-2xl font-['dynapuff'] text-pastel-dark-grey";
  contentArea.appendChild(content);

  base.appendChild(header);
  base.appendChild(contentArea);
  canvas.appendChild(base);
};
