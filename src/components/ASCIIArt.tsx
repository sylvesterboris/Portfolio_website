import React from 'react';

interface ASCIIArtProps {
  name: string;
}

export const ASCIIArt: React.FC<ASCIIArtProps> = ({ name }) => {
  const generateASCII = (text: string): string => {
    // ASCII art for "AMAN"
    if (text.toUpperCase() === 'AMAN') {
      return `
     █████╗ ███╗   ███╗ █████╗ ███╗   ██╗
    ██╔══██╗████╗ ████║██╔══██╗████╗  ██║
    ███████║██╔████╔██║███████║██╔██╗ ██║
    ██╔══██║██║╚██╔╝██║██╔══██║██║╚██╗██║
    ██║  ██║██║ ╚═╝ ██║██║  ██║██║ ╚████║
    ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝`;
    }
    
    // Fallback for other names (simple block letters)
    return text.toUpperCase().split('').map(char => {
      switch (char) {
        case 'A':
          return '  ██  \n ████ \n██  ██\n██████\n██  ██';
        case 'M':
          return '██  ██\n██████\n██████\n██  ██\n██  ██';
        case 'N':
          return '██  ██\n███ ██\n██████\n██ ███\n██  ██';
        default:
          return '██████\n██    \n██████\n██    \n██████';
      }
    }).join('  ');
  };

  return (
    <pre className="text-cyan-400 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-mono leading-tight glow-cyan animate-pulse-slow">
      {generateASCII(name)}
    </pre>
  );
};