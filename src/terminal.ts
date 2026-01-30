export class Terminal {
  private container: HTMLElement;
  private output!: HTMLElement;
  private promptLine!: HTMLElement;
  private input!: HTMLElement;
  private cursor!: HTMLElement;
  private currentCommand: string = "";
  private isTyping: boolean = false;

  constructor(containerId: string) {
    this.container = document.getElementById(containerId) as HTMLElement;
    this.init();
  }

  private init() {
    // Clear container
    this.container.innerHTML = "";
    this.container.className = "h-screen bg-[#0A0E27] text-[#E8E9ED] font-mono p-6 overflow-y-auto";

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

    this.input = document.createElement("span");
    this.input.className = "text-[#E8E9ED] ml-2";

    this.cursor = document.createElement("span");
    this.cursor.className = "inline-block w-2 h-5 bg-[#00FF88] ml-1 animate-pulse";

    this.promptLine.appendChild(prompt);
    this.promptLine.appendChild(path);
    this.promptLine.appendChild(promptEnd);
    this.promptLine.appendChild(this.input);
    this.promptLine.appendChild(this.cursor);

    this.container.appendChild(this.promptLine);
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

    // Type the command
    await this.typeCommand(cmd);

    // Add command to history
    this.addCommandToHistory(cmd);

    // Execute and show output
    const output = await this.getCommandOutput(cmd);
    await this.typeOutput(output);

    // Reset for next command
    this.input.textContent = "";
    this.currentCommand = "";
    this.isTyping = false;
    this.scrollToBottom();
  }

  private async typeCommand(cmd: string, speed: number = 30) {
    this.input.textContent = "";
    for (let i = 0; i < cmd.length; i++) {
      this.input.textContent += cmd[i];
      await this.sleep(speed);
    }
    await this.sleep(300);
  }

  private async typeOutput(text: string, speed: number = 1) {
    const outputDiv = document.createElement("div");
    outputDiv.className = "mb-4 whitespace-pre-wrap";
    this.output.appendChild(outputDiv);

    for (let i = 0; i < text.length; i++) {
      outputDiv.textContent += text[i];
      if (speed > 0) {
        await this.sleep(speed);
        if (i % 10 === 0) this.scrollToBottom();
      }
    }
    this.scrollToBottom();
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
    outputDiv.textContent = text;
    this.output.appendChild(outputDiv);
    this.scrollToBottom();
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

  experience     Show work experience and career history
  blog           Read blog posts and thoughts
  contact        Get in touch
  social         Social media links
  about          About this site and technology
  clear          Clear terminal screen
  help           Show this help message

Navigation: Click any section above or type a command.
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

  private scrollToBottom() {
    this.container.scrollTop = this.container.scrollHeight;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
