import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export default function MathText({ text, className = "" }) {
  if (!text) return null;

  const renderFormattedText = (str) => {
    const lines = str.split('\n');

    return lines.map((line, lineIdx) => {
      // Split by $$...$$ first, then by $...$
      const parts = line.split(/(\$\$.*?\$\$|\$.*?\$)/g);

      const lineContent = parts.map((part, partIdx) => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          const math = part.slice(2, -2);
          try {
            const html = katex.renderToString(math, { displayMode: true, throwOnError: false });
            return (
              <span
                key={partIdx}
                className="my-2 block text-center overflow-x-auto py-1 text-purple-200"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          } catch (e) {
            return <span key={partIdx}>{part}</span>;
          }
        } else if (part.startsWith('$') && part.endsWith('$')) {
          const math = part.slice(1, -1);
          try {
            const html = katex.renderToString(math, { displayMode: false, throwOnError: false });
            return (
              <span
                key={partIdx}
                className="inline-block px-0.5 text-purple-200 font-medium"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          } catch (e) {
            return <span key={partIdx}>{part}</span>;
          }
        }
        return <span key={partIdx}>{part}</span>;
      });

      return (
        <React.Fragment key={lineIdx}>
          {lineContent}
          {lineIdx < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return <div className={`math-rendered-content ${className}`}>{renderFormattedText(text)}</div>;
}
