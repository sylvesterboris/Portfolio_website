import React from 'react';

interface OutputLine {
  id: string;
  content: string;
  type: 'input' | 'output' | 'error';
  timestamp: number;
}

interface TerminalLineProps {
  line: OutputLine;
}

export const TerminalLine: React.FC<TerminalLineProps> = ({ line }) => {
  const getLineClass = () => {
    switch (line.type) {
      case 'input':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-green-300';
    }
  };

  // Format content with proper spacing and colors
  const formatContent = (content: string) => {
    // Handle multi-line content
    if (content.includes('\n')) {
      return content.split('\n').map((line, index) => (
        <div key={index} className="min-h-[1em]">
          {line || '\u00A0'}
        </div>
      ));
    }
    
    // Handle commands with syntax highlighting
    if (line.type === 'input' && content.includes('$')) {
      const parts = content.split('$');
      return (
        <div>
          <span className="text-green-400">{parts[0]}$</span>
          <span className="text-cyan-400">{parts[1]}</span>
        </div>
      );
    }

    // Handle help command output with colors
    if (content.includes('Available Commands:') || content.includes('- ')) {
      return content.split('\n').map((line, index) => {
        if (line.includes('Available Commands:')) {
          return <div key={index} className="text-cyan-400 font-bold">{line}</div>;
        }
        if (line.trim().match(/^[a-z]+\s+-/)) {
          const [command, description] = line.split(' - ');
          return (
            <div key={index}>
              <span className="text-yellow-400">{command}</span>
              <span className="text-gray-400"> - {description}</span>
            </div>
          );
        }
        return <div key={index}>{line || '\u00A0'}</div>;
      });
    }

    // Handle skills progress bars
    if (content.includes('█')) {
      return content.split('\n').map((line, index) => {
        if (line.includes('█')) {
          const parts = line.split('█');
          const beforeBars = parts[0];
          const barCount = line.match(/█/g)?.length || 0;
          const afterBars = line.substring(line.lastIndexOf('█') + 1);
          
          return (
            <div key={index} className="flex items-center">
              <span className="text-cyan-400">{beforeBars}</span>
              <span className="text-green-400">{'█'.repeat(barCount)}</span>
              <span className="text-gray-400">{afterBars}</span>
            </div>
          );
        }
        return <div key={index}>{line || '\u00A0'}</div>;
      });
    }

    // Handle URLs
    if (content.includes('http')) {
      return content.split('\n').map((line, index) => {
        if (line.includes('http')) {
          const parts = line.split(/(https?:\/\/[^\s]+)/g);
          return (
            <div key={index}>
              {parts.map((part, partIndex) => 
                part.match(/https?:\/\/[^\s]+/) ? (
                  <a 
                    key={partIndex}
                    href={part} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    {part}
                  </a>
                ) : (
                  <span key={partIndex}>{part}</span>
                )
              )}
            </div>
          );
        }
        return <div key={index}>{line || '\u00A0'}</div>;
      });
    }

    return <div>{content || '\u00A0'}</div>;
  };

  return (
    <div className={`font-mono text-sm ${getLineClass()} whitespace-pre-wrap break-words`}>
      {formatContent(line.content)}
    </div>
  );
};