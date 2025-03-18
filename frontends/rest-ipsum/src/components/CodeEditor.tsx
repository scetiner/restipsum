import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-twilight';

interface CodeEditorProps {
  title: string;
  buttonText?: string;
  initialContent?: string;
  onGenerate?: (content: string) => void;
  readOnly?: boolean;
  onChange?: (value: string) => void;
  status?: {
    type: 'warning' | 'error' | 'success';
    message: string;
  };
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  title, 
  buttonText = 'Generate',
  initialContent = '', 
  onGenerate, 
  readOnly = false, 
  onChange,
  status 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(initialContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="bg-[#1c1c1c] rounded-lg shadow-lg overflow-hidden border border-[#2a2a2a]">
      <div className="px-4 py-3 border-b border-[#2a2a2a] flex justify-between items-center">
        <h2 className="text-sm font-medium text-slate-200">{title}</h2>
        {status && (
          <div className={`text-xs px-2 py-1 rounded ${
            status.type === 'warning' ? 'bg-yellow-500/10 text-yellow-500' :
            status.type === 'error' ? 'bg-red-500/10 text-red-500' :
            'bg-green-500/10 text-green-500'
          }`}>
            {status.message}
          </div>
        )}
      </div>
      <div className="p-4">
        <AceEditor
          mode="json"
          theme="twilight"
          name={`editor-${title}`}
          value={initialContent}
          onChange={onChange}
          width="100%"
          height="300px"
          fontSize={14}
          showPrintMargin={false}
          readOnly={readOnly}
          setOptions={{
            useWorker: false,
            showGutter: true,
            tabSize: 2,
          }}
          style={{ borderRadius: '0.5rem' }}
        />
        <div className="mt-4 flex justify-between items-center">
          {status?.type === 'warning' && status.message === 'Partial Schema' && (
            <div className="text-xs text-yellow-500">
              <span>⚠️ Some fields could not be inferred. Please review and update the schema.</span>
            </div>
          )}
          <div className="flex space-x-3 ml-auto">
            <button
              onClick={handleCopy}
              className="group relative px-4 py-2 bg-[#2a2a2a] text-sm font-medium text-slate-300 rounded-md overflow-hidden transition-all hover:bg-[#333333] hover:text-white"
            >
              <span className="relative z-10 flex items-center">
                {copied ? 'Copied!' : 'Copy'}
                {copied && (
                  <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </button>
            {onGenerate && (
              <button
                onClick={() => onGenerate(initialContent)}
                className="group relative px-4 py-2 bg-indigo-600 text-sm font-medium text-white rounded-md overflow-hidden transition-all hover:bg-indigo-700"
              >
                <span className="relative z-10">{buttonText}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor; 