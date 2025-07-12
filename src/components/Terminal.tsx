import React, { useState, useEffect, useRef } from 'react';
import { CommandProcessor } from './CommandProcessor';
import { ASCIIArt } from './ASCIIArt';
import { TypewriterText } from './TypewriterText';
import { MatrixEffects } from './MatrixEffects';
import { TerminalLine } from './TerminalLine';

interface OutputLine {
  id: string;
  content: string;
  type: 'input' | 'output' | 'error';
  timestamp: number;
}

export const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showWelcome, setShowWelcome] = useState(true);
  const [matrixEnabled, setMatrixEnabled] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  const commandProcessor = new CommandProcessor(setMatrixEnabled);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input.trim());
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const executeCommand = (command: string) => {
    if (!command) return;

    // Add to history
    setCommandHistory(prev => [...prev, command]);
    setHistoryIndex(-1);

    // Add input line to output
    const inputLine: OutputLine = {
      id: `input-${Date.now()}`,
      content: `visitor@aman:~/ portfolio $ ${command}`,
      type: 'input',
      timestamp: Date.now()
    };

    setOutput(prev => [...prev, inputLine]);

    // Process command
    const result = commandProcessor.processCommand(command);
    
    if (result.action === 'clear') {
      setOutput([]);
      setShowWelcome(false);
    } else {
      const outputLine: OutputLine = {
        id: `output-${Date.now()}`,
        content: result.output,
        type: result.type || 'output',
        timestamp: Date.now()
      };
      
      setOutput(prev => [...prev, outputLine]);
    }

    setInput('');
  };

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {matrixEnabled && <MatrixEffects />}
      
      <div 
        className={`relative z-10 min-h-screen font-mono text-green-400 p-4 transition-all duration-1000 ${
          matrixEnabled ? 'terminal-crt' : ''
        } ${isInitialized ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleTerminalClick}
      >
        {/* Matrix/CRT Toggle Indicator */}
        {matrixEnabled && (
          <div className="absolute top-4 right-4 text-xs text-cyan-400 animate-pulse">
            ✦ Matrix & CRT effects enabled! Type "effects" to toggle
          </div>
        )}

        {/* Terminal Content */}
        <div 
          ref={terminalRef}
          className="max-w-full overflow-y-auto max-h-screen pb-20"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#00ff00 #000000' }}
        >
          {showWelcome && (
            <>
              {/* ASCII Art Name */}
              <div className="mb-8 text-center">
                <ASCIIArt name="AMAN" />
              </div>

              {/* Welcome Message */}
              <div className="mb-8 text-center space-y-2">
                <TypewriterText
                  text="Welcome to my Portfolio."
                  className="text-cyan-400 text-lg glow-cyan"
                  speed={50}
                />
                <TypewriterText
                  text="Use ↑ and ↓ to navigate command history."
                  className="text-green-300"
                  speed={30}
                  delay={1500}
                />
                <TypewriterText
                  text="Type 'help' for more commands."
                  className="text-yellow-400"
                  speed={30}
                  delay={3000}
                />
                <TypewriterText
                  text="Note: Commands are case-sensitive. Please use lowercase only."
                  className="text-gray-500 text-sm"
                  speed={20}
                  delay={4500}
                />
              </div>
            </>
          )}

          {/* Command Output */}
          <div className="space-y-1">
            {output.map((line) => (
              <TerminalLine key={line.id} line={line} />
            ))}
          </div>

          {/* Current Input Line */}
          <div className="flex items-center mt-4">
            <span className="text-green-400 mr-2">visitor@aman:~/ portfolio $</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-green-400 outline-none caret-green-400"
              autoComplete="off"
              spellCheck={false}
            />
            <span className="text-green-400 animate-pulse ml-1">_</span>
          </div>
        </div>
      </div>
    </div>
  );
};