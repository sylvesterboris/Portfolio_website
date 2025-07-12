interface CommandResult {
  output: string;
  type?: 'output' | 'error';
  action?: 'clear';
}

export class CommandProcessor {
  private matrixToggle: (enabled: boolean) => void;
  private matrixEnabled: boolean = true;

  constructor(matrixToggle: (enabled: boolean) => void) {
    this.matrixToggle = matrixToggle;
  }

  processCommand(command: string): CommandResult {
    const [cmd, ...args] = command.toLowerCase().split(' ');
    
    switch (cmd) {
      case 'help':
        return { output: this.getHelpText() };
      
      case 'about':
        return { output: this.getAboutText() };
      
      case 'skills':
        return { output: this.getSkillsText() };
      
      case 'resume':
        return { output: this.getResumeText() };
      
      case 'goals':
        return { output: this.getGoalsText() };
      
      case 'projects':
        return { output: this.getProjectsText() };
      
      case 'socials':
        return { output: this.getSocialsText() };
      
      case 'experiences':
        return { output: this.getExperiencesText() };
      
      case 'effects':
        this.matrixEnabled = !this.matrixEnabled;
        this.matrixToggle(this.matrixEnabled);
        return { 
          output: `Matrix/CRT effects ${this.matrixEnabled ? 'enabled' : 'disabled'}.` 
        };
      
      case 'clear':
        return { output: '', action: 'clear' };
      
      case 'echo':
        return { output: args.join(' ') };
      
      default:
        return { 
          output: `Command not found: ${cmd}. Type 'help' for available commands.`,
          type: 'error'
        };
    }
  }

  private getHelpText(): string {
    return `Available Commands:

about      - Display information about me
skills     - List my technical skills
resume     - View or download my resume
goals      - Display my current goals
projects   - Show a list of my projects
socials    - Display my social media links
experiences - Show my work experiences
effects    - Toggle Matrix/CRT visual effects
clear      - Clear the terminal screen
echo [text] - Display a line of text`;
  }

  private getAboutText(): string {
    return `About Me:

Hi! I'm Aman, a passionate software developer and technology enthusiast.

I specialize in  web development,UI/UX and CyberSecurity with a focus on creating
innovative and user-friendly applications. I love exploring new 
technologies and solving complex problems through code.

When I'm not coding, you can find me learning about emerging tech
trends, Grinding in gym , or sharing knowledge
with the developer community.

I believe in continuous learning and strive to write clean,
maintainable code that makes a positive impact.`;
  }

  private getSkillsText(): string {
    return `Technical Skills:

Programming Languages:
  • JavaScript/TypeScript ████████████ 95%
  • Python                ██████████   85%
  • Java                  ████████     75%
  • C++                   ██████       65%

Frontend Development:
  • React.js/Next.js      ████████████ 95%
  • Angular.js            ██           20%
  • HTML/CSS/             ████████████ 95%
  • Tailwind CSS          ███████████  90%

Backend Development:
  • Node.js/Express       ███████████  90%
  • Django/Flask          ████████     75%
  • REST/ APIs            ███████████  85%
  • Database Design       ████████     80%

Tools & Technologies:
  • Git/GitHub            ███████████  90%
  • Docker/Kubernetes     ██████       65%
  • AWS/Cloud Platforms   ███████      70%
  • Linux/Terminal        ████████     80%`;
  }

  private getResumeText(): string {
    return `Resume:

📄 My resume is available for download!

Online Version: https://aman-portfolio.dev/resume
PDF Download:   https://aman-portfolio.dev/resume.pdf

Quick Overview:
├── Education: BCA+MCA
├── Experience: 3+ years in Full-Stack Development
├── Specialties: React, Node.js, Python, Cloud Technologies
├── Certifications: AWS Certified Developer Associate
└── Languages: English (Fluent), Hindi (Native) ,German (A1)

For the most up-to-date version, please visit the links above.`;
  }

  private getGoalsText(): string {
    return `Current Professional Goals:

🎯 Short-term Goals (2025):
  • Master advanced Frontend patterns and performance optimization
  • Contribute to 5+ open-source projects
  • Complete AWS Solutions Architect certification
  • Build and deploy at least 2 production-ready SaaS applications

🚀 Medium-term Goals (2025-2026):
  • Transition into a Senior Full-Stack Developer role
  • Learn and implement microservices architecture
  • Start a technical blog and share knowledge on Medium or Twitter
  • Mentor junior developers in the community

🌟 Long-term Goals (2026+):
  • Lead a development team on innovative projects
  • Become a recognized expert in modern web technologies
  • Launch my own tech startup or consultancy
  • Speak at major tech conferences and events

💡 Continuous Learning:
  • Stay updated with latest JavaScript/TypeScript features
  • Explore emerging technologies And Learn about AI/ML
  • Deepen knowledge in system design and scalability`;
  }

  private getProjectsText(): string {
    return `Featured Projects:

1. 🚀 IPhone-15-clone-app
   ├── Tech: React, GSAP, Three.js, Nextjs
   ├── Features: Responsive UI, 3D animations, real-time data
   ├── Live: https://spectacular-meringue-456e02.netlify.app/
   

2.     Task Management App UI,
   ├── Tech: Figma
   ├── Features: Latest UI design, clean UI  
   ├── Live: https://www.figma.com/design/NgC6i2zPgGVlKpNn7c2Fie/Untitled?node-id=102-1147&t=unL02wP6nez0FDa3-0
   

3.     Smarter Solar Decisions with AI & Satellite Intelligence
   ├── Tech: React + Vite + Tailwind CSS + TypeScript + Vision APIs + Coordinate-based Image Synthesis
   ├── Features: Group chats, file sharing, emoji reactions
   ├── Live: https://solaraiapp.netlify.app/
   

4. 🔧 Flash Meme Generator App 
   ├── Tech: Python, Flask, 
   ├── Features: meme generator, download meme,edit and personalized watermark
   ├── Live: https://flash-meme-app-2ree.onrender.com/
   

5. 📱 : AI Habit Tracker
   ├── Tech: React, 
   ├── Features: Productivity + wellness-focused interface, Local data persistence — your habits stay saved
   ├── Live: https://ai-habit.netlify.app/
   └── Code: https://github.com/aman/progressive-web-app`;
  }

  private getSocialsText(): string {
    return `Social Media & Professional Links:

💼 Professional:
  • LinkedIn:    https://www.linkedin.com/in/amanndangi/
  • GitHub:      https://github.com/aman
  • Portfolio:   https://aman.dev
  • Email:       aman.103.iitm@gmail.com

🌐 Development:
  • Stack Overflow: https://stackoverflow.com/users/31026619/escanor-gaming


📱 Social:
  • Twitter:        https://x.com/Aman_devlops
  • Instagram:      https://www.instagram.com/success_summit_fitness/
  • YouTube:        https://www.youtube.com/@escanorgaming2806

💬 Community:
  • Discord:        totobadmaas
  • Slack:          Available on tech communities
  • Telegram:       @Aman

Feel free to connect with me on any of these platforms!
I'm always open to interesting conversations and collaborations.`;
  }

  private getExperiencesText(): string {
    return `Work Experience:

🏢  QA Automation intern, SDET Technology  
   📅 June 2025- Present
   ├── Developed and executed automated test cases using Robot Framework, Python, and Selenium.
   ├── Wrote robust scripts, identified bugs, and ensured quality software delivery through continuous testing
   ├── Gained hands-on experience in automation, scripting, and debugging in agile environments.

🏢  Cybersecurity Virtual Intern, Mastercard (via Forage)
   📅  Remote | 2024
   ├── Completed a job simulation where served as an analyst on Mastercards Security Awareness Team
   ├──  Analyzed and identified which areas of the business needed more robust security training and implemented
   |__ training courses and procedures for those teams.

📚 Key Achievements:
   • Increased TestScripts performance by average 35% across projects 
   • AWS Certified Cloud Practitioner
   • Improved team productivity by implementing automated workflows`;
  }
}