import { baseWindow } from "../shared/base-window";
declare const window: any;

export const openShell = () => {
  if (<HTMLSpanElement>document.getElementById("shell")) return;
  const content = document.createElement("div");
  content.id = "shell";
  content.className = "w-full h-full bg-black";
  content.innerHTML = `
    <div id="screen_container">
      <div style="white-space: pre; font: 14px monospace"></div>
      <canvas></canvas>
    </div>
  `;
  baseWindow("w-3/4 h-3/4", content);

  new window.V86({
      wasm_path: "./libs/v86/v86.wasm",
      memory_size: 512 * 1024 * 1024,
      vga_memory_size: 8 * 1024 * 1024,
      screen_container: document.getElementById("screen_container"),
      bios: {
          url: "./libs/v86/bios/seabios.bin",
      },
      vga_bios: {
          url: "./libs/v86/bios/vgabios.bin",
      },
      bzimage: {
          url: "./libs/v86/images/buildroot-bzimage.bin",
      },
      autostart: true,
  });
};
