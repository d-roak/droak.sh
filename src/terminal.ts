export class Terminal {
  private container: HTMLElement;
  private output!: HTMLElement;
  private promptLine!: HTMLElement;
  private inputEl!: HTMLInputElement;
  private cursor!: HTMLElement;
  private currentCommand: string = "";
  private isTyping: boolean = false;
  private commandHistory: string[] = [];
  private historyIndex: number = -1;

  constructor(containerId: string) {
    const el = document.getElementById(containerId);
    if (!el) {
      throw new Error(`Terminal container #${containerId} not found`);
    }
    this.container = el;
    this.init();
  }

  private init() {
    // Clear container
    this.container.innerHTML = "";
    this.container.className = "h-screen bg-[#0A0E27] text-[#E8E9ED] font-mono p-6 overflow-hidden";

    // Create output area
    this.output = document.createElement("div");
    this.output.className = "mb-4";
    this.container.appendChild(this.output);

    // Create prompt line
    this.createPromptLine();

    // Show welcome message
    this.showWelcome();
  }

  private createPromptLine() {
    this.promptLine = document.createElement("div");
    this.promptLine.className = "flex items-center space-x-2";

    const prompt = document.createElement("span");
    prompt.className = "text-[#00D9FF]";
    prompt.textContent = "[oak@droak.sh";

    const path = document.createElement("span");
    path.className = "text-[#8B92B3]";
    path.textContent = " ~";

    const promptEnd = document.createElement("span");
    promptEnd.className = "text-[#00D9FF]";
    promptEnd.textContent = "]$";

    // Create actual input element
    this.inputEl = document.createElement("input");
    this.inputEl.type = "text";
    this.inputEl.className = "bg-transparent border-none outline-none text-[#E8E9ED] ml-2 flex-1 font-mono caret-[#00FF88]";
    this.inputEl.spellcheck = false;
    this.inputEl.autocomplete = "off";
    
    // Handle input
    this.inputEl.addEventListener("keydown", (e) => this.handleKeyDown(e));

    this.promptLine.appendChild(prompt);
    this.promptLine.appendChild(path);
    this.promptLine.appendChild(promptEnd);
    this.promptLine.appendChild(this.inputEl);

    this.container.appendChild(this.promptLine);
    
    // Focus input
    this.inputEl.focus();
    
    // Refocus on click anywhere
    this.container.addEventListener("click", () => {
      this.inputEl.focus();
    });
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      const cmd = this.inputEl.value.trim();
      if (cmd) {
        this.commandHistory.push(cmd);
        this.historyIndex = this.commandHistory.length;
        this.executeCommand(cmd);
      }
      this.inputEl.value = "";
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.inputEl.value = this.commandHistory[this.historyIndex];
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (this.historyIndex < this.commandHistory.length - 1) {
        this.historyIndex++;
        this.inputEl.value = this.commandHistory[this.historyIndex];
      } else {
        this.historyIndex = this.commandHistory.length;
        this.inputEl.value = "";
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Basic autocomplete
      const partial = this.inputEl.value;
      const commands = ["help", "experience", "work", "blog", "thoughts", "contact", "contacts", "social", "links", "about", "info", "clear"];
      const matches = commands.filter(cmd => cmd.startsWith(partial));
      if (matches.length === 1) {
        this.inputEl.value = matches[0];
      }
    } else if (e.ctrlKey && e.key === "l") {
      e.preventDefault();
      this.clearTerminal();
    }
  }

  private showWelcome() {
    const welcome = `
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║                    Welcome to oak@droak.sh                    ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝

Type 'help' to see available commands or click a section below.
`;
    this.addOutput(welcome, "#8B92B3");
  }

  public async executeCommand(cmd: string) {
    if (this.isTyping) return;
    this.isTyping = true;
    this.currentCommand = cmd;

    // Add command to history display
    this.addCommandToHistory(cmd);

    // Execute and show output
    const output = await this.getCommandOutput(cmd);
    await this.typeOutput(output);

    // Reset for next command
    this.currentCommand = "";
    this.isTyping = false;
    this.inputEl.value = "";
    this.inputEl.focus();
  }

  private async typeOutput(text: string, speed: number = 0.5) {
    const outputDiv = document.createElement("div");
    outputDiv.className = "mb-4 whitespace-pre-wrap";
    this.output.appendChild(outputDiv);

    // Process text to handle clickable elements
    const processedHTML = this.processClickableElements(text);
    
    // Type out character by character
    let currentHTML = "";
    for (let i = 0; i < text.length; i++) {
      currentHTML += text[i];
      outputDiv.innerHTML = this.processClickableElements(currentHTML);
      if (speed > 0) {
        await this.sleep(speed);
      }
    }
    
    outputDiv.innerHTML = processedHTML;
    this.attachClickHandlers(outputDiv);
  }

  private processClickableElements(text: string): string {
    // Make commands clickable
    text = text.replace(/<cmd>(.*?)<\/cmd>/g, '<span class="text-[#00D9FF] hover:text-[#00FF88] cursor-pointer underline" data-cmd="$1">$1</span>');
    
    // Make blog posts clickable
    text = text.replace(/\[(\d+)\]\s+(.+)/g, '<span class="text-[#7B61FF] hover:text-[#00FF88] cursor-pointer" data-blog="$1">[$1] $2</span>');
    
    // Make URLs clickable
    text = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" class="text-[#00D9FF] hover:text-[#00FF88] underline">$1</a>');
    
    return text;
  }

  private attachClickHandlers(element: HTMLElement) {
    // Handle command clicks
    element.querySelectorAll('[data-cmd]').forEach(el => {
      el.addEventListener('click', () => {
        const cmd = el.getAttribute('data-cmd');
        if (cmd) {
          this.inputEl.value = cmd;
          this.executeCommand(cmd);
        }
      });
    });

    // Handle blog post clicks
    element.querySelectorAll('[data-blog]').forEach(el => {
      el.addEventListener('click', () => {
        const postNum = el.getAttribute('data-blog');
        if (postNum) {
          this.executeCommand(`blog ${postNum}`);
        }
      });
    });
  }

  private addCommandToHistory(cmd: string) {
    const historyLine = document.createElement("div");
    historyLine.className = "mb-2";
    historyLine.innerHTML = `<span class="text-[#00D9FF]">[oak@droak.sh ~]$</span> <span class="text-[#E8E9ED]">${cmd}</span>`;
    this.output.appendChild(historyLine);
  }

  private addOutput(text: string, color: string = "#E8E9ED") {
    const outputDiv = document.createElement("div");
    outputDiv.className = "mb-4 whitespace-pre-wrap";
    outputDiv.style.color = color;
    outputDiv.innerHTML = this.processClickableElements(text);
    this.output.appendChild(outputDiv);
    this.attachClickHandlers(outputDiv);
  }

  private async getCommandOutput(cmd: string): Promise<string> {
    const command = cmd.toLowerCase().trim();

    switch (command) {
      case "help":
        return this.getHelpOutput();
      case "experience":
      case "work":
        return await this.getExperienceOutput();
      case "blog":
      case "thoughts":
        return await this.getBlogOutput();
      case "contact":
      case "contacts":
        return this.getContactOutput();
      case "social":
      case "links":
        return this.getSocialOutput();
      case "about":
      case "info":
        return this.getAboutOutput();
      case "clear":
        this.clearTerminal();
        return "";
      default:
        return `bash: ${cmd}: command not found\n\nType 'help' to see available commands.`;
    }
  }

  private getHelpOutput(): string {
    return `
Available commands:

  <cmd>experience</cmd>     Show work experience and career history
  <cmd>blog</cmd>           Read blog posts and thoughts
  <cmd>contact</cmd>        Get in touch
  <cmd>social</cmd>         Social media links
  <cmd>about</cmd>          About this site and technology
  <cmd>clear</cmd>          Clear terminal screen
  <cmd>help</cmd>           Show this help message

Type a command and press Enter. Use ↑/↓ for history, Tab for autocomplete.
`;
  }

  private async getExperienceOutput(): Promise<string> {
    const { formatExperience } = await import("./data/loader");
    return formatExperience();
  }

  private async getBlogOutput(): Promise<string> {
    const { formatBlogList, formatBlogPost } = await import("./data/loader");
    
    // Check if user wants a specific post
    const match = this.currentCommand.match(/blog\s+(\d+)/);
    if (match) {
      const postIndex = parseInt(match[1]) - 1;
      const { getBlogPosts } = await import("./data/loader");
      const posts = getBlogPosts();
      if (posts[postIndex]) {
        return formatBlogPost(posts[postIndex].id);
      }
    }
    
    return formatBlogList();
  }

  private getContactOutput(): string {
    return `
╔═══════════════════════════════════════════════════════════════╗
║                          CONTACT                              ║
╚═══════════════════════════════════════════════════════════════╝

📬 Get in touch:

  Email: Available on request
  
Type 'social' to see social media links.
`;
  }

  private getSocialOutput(): string {
    return `
╔═══════════════════════════════════════════════════════════════╗
║                       SOCIAL LINKS                            ║
╚═══════════════════════════════════════════════════════════════╝

🔗 Connect with me:

  GitHub:    github.com/d-roak
  Twitter:   twitter.com/[handle]
  LinkedIn:  linkedin.com/in/[profile]

`;
  }

  private getAboutOutput(): string {
    return `
╔═══════════════════════════════════════════════════════════════╗
║                          ABOUT                                ║
╚═══════════════════════════════════════════════════════════════╝

This terminal-style website is built with:
  • TypeScript
  • Tailwind CSS
  • Webpack

Version: 2.0.0
Theme: Modern Terminal

GitHub: github.com/d-roak/droak.sh
`;
  }

  private clearTerminal() {
    this.output.innerHTML = "";
    this.showWelcome();
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
