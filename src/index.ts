import { Terminal } from "./terminal";

let terminal: Terminal;

const sections = [
  { cmd: "experience", label: "💼 /work", desc: "Experience" },
  { cmd: "blog", label: "📝 /thoughts", desc: "Blog" },
  { cmd: "social", label: "🔗 /connect", desc: "Social" },
  { cmd: "contact", label: "📬 /reach", desc: "Contact" },
  { cmd: "about", label: "ℹ️ /about", desc: "Info" },
];

const renderNavigation = () => {
  const nav = document.createElement("nav");
  nav.className = "fixed top-0 left-0 right-0 bg-[#1A1F3A] border-b border-[#2D3561] px-6 py-3 z-50";
  
  const container = document.createElement("div");
  container.className = "flex items-center space-x-1";
  
  // Logo/Home
  const home = document.createElement("button");
  home.className = "text-[#00D9FF] font-mono text-sm hover:text-[#00FF88] transition-colors px-3 py-1";
  home.textContent = "[oak@droak.sh ~]$";
  home.onclick = () => {
    terminal.executeCommand("clear");
  };
  container.appendChild(home);

  // Sections
  sections.forEach((section) => {
    const btn = document.createElement("button");
    btn.className = "text-[#8B92B3] hover:text-[#00D9FF] hover:bg-[#2D3561] transition-all font-mono text-sm px-3 py-1 rounded";
    btn.textContent = section.label;
    btn.title = section.desc;
    btn.onclick = () => {
      terminal.executeCommand(section.cmd);
    };
    container.appendChild(btn);
  });

  // Help button
  const help = document.createElement("button");
  help.className = "ml-auto text-[#8B92B3] hover:text-[#7B61FF] transition-colors font-mono text-sm px-3 py-1";
  help.textContent = "help";
  help.onclick = () => {
    terminal.executeCommand("help");
  };
  container.appendChild(help);

  nav.appendChild(container);
  document.body.appendChild(nav);
};

const init = () => {
  // Set body styles
  document.body.className = "m-0 p-0 overflow-hidden font-sans";
  
  // Create terminal container
  const container = document.createElement("div");
  container.id = "terminal";
  container.className = "pt-12"; // Space for nav
  document.body.appendChild(container);

  // Render navigation
  renderNavigation();

  // Initialize terminal
  terminal = new Terminal("terminal");
};

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
