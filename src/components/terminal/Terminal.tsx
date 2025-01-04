import React, { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { useWebContainer } from '../../hooks/useWebContainer';
import { terminalTheme } from './terminalTheme';
import 'xterm/css/xterm.css';

export function Terminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const { webcontainer, ready, error } = useWebContainer();
  const xtermRef = useRef<XTerm>();
  const shellRef = useRef<any>(null);
  const fitAddonRef = useRef(new FitAddon());

  useEffect(() => {
    if (!terminalRef.current || !ready || !webcontainer) return;

    const xterm = new XTerm({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      theme: terminalTheme,
      allowProposedApi: true
    });

    xtermRef.current = xterm;

    const setupTerminal = async () => {
      try {
        xterm.loadAddon(fitAddonRef.current);
        xterm.open(terminalRef.current!);
        fitAddonRef.current.fit();

        const shell = await webcontainer.spawn('jsh', {
          terminal: {
            cols: xterm.cols,
            rows: xterm.rows
          }
        });

        shellRef.current = shell;

        shell.output.pipeTo(
          new WritableStream({
            write(data) {
              xterm.write(data);
            }
          })
        );

        const input = shell.input.getWriter();
        xterm.onData((data) => {
          input.write(data);
        });

        xterm.onResize(({ cols, rows }) => {
          shell.resize({ cols, rows });
        });

        fitAddonRef.current.fit();
      } catch (err) {
        console.error('Terminal setup error:', err);
        xterm.write('\r\nFailed to start shell. Please try again.\r\n');
      }
    };

    setupTerminal();

    const handleResize = () => fitAddonRef.current?.fit();
    window.addEventListener('resize', handleResize);

    return () => {
      shellRef.current?.kill();
      xtermRef.current?.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [ready, webcontainer]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-900 text-red-400 p-4">
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gray-900">
      <div ref={terminalRef} className="h-full" />
    </div>
  );
}