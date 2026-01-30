import { Terminal } from "./terminal";

const init = () => {
  // Set body styles
  document.body.className = "m-0 p-0 overflow-hidden font-sans";
  
  // Create terminal container
  const container = document.createElement("div");
  container.id = "terminal";
  document.body.appendChild(container);

  // Initialize terminal
  const terminal = new Terminal("terminal");
  
  // Show help on load
  setTimeout(() => {
    terminal.executeCommand("help");
  }, 500);
};

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
