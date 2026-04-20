import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

const LANGUAGES = [
  { id: 'javascript', label: 'JavaScript', monacoLang: 'javascript' },
  { id: 'python', label: 'Python', monacoLang: 'python' },
  { id: 'cpp', label: 'C++', monacoLang: 'cpp' },
  { id: 'java', label: 'Java', monacoLang: 'java' },
];

const DiffBadge = ({ d }) => {
  const cls = { Easy: 'badge-easy', Medium: 'badge-medium', Hard: 'badge-hard' };
  return <span className={cls[d]}>{d}</span>;
};

// Render problem description with basic markdown-like formatting
function ProblemDescription({ text }) {
  if (!text) return null;
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return (
    <span>
      {parts.map((part, i) => {
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={i} className="text-blue-300 bg-slate-800 px-1.5 py-0.5 rounded font-mono text-sm">{part.slice(1, -1)}</code>;
        }
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
          return <em key={i} className="text-slate-200 italic">{part.slice(1, -1)}</em>;
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}

export default function EditorPage() {
  const { slug } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [runError, setRunError] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [leftWidth, setLeftWidth] = useState(40); // percent

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await axios.get(`/api/problems/${slug}`);
        setProblem(res.data.problem);
        const starter = res.data.problem.starterCode?.javascript || '// Write your solution here\n';
        setCode(starter);
      } catch (err) {
        setError(err.response?.data?.message || 'Problem not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [slug]);

  const handleLanguageChange = useCallback((lang) => {
    setLanguage(lang);
    if (problem?.starterCode?.[lang]) {
      setCode(problem.starterCode[lang]);
    }
    setOutput('');
  }, [problem]);

  const handleRunCode = async () => {
    if (!code.trim()) return;
    setRunning(true);
    setOutput('');
    setRunError(false);
    try {
      const res = await axios.post('/api/code/run', { code, language });
      setOutput(res.data.output || 'No output');
      setRunError(res.data.isError || false);
    } catch (err) {
      setOutput(err.response?.data?.message || 'Execution failed. Check your code.');
      setRunError(true);
    } finally {
      setRunning(false);
    }
  };

  const handleKeyDown = useCallback((e) => {
    // Ctrl+Enter or Cmd+Enter to run
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleRunCode();
    }
  }, [code, language]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const monacoLang = LANGUAGES.find(l => l.id === language)?.monacoLang || 'javascript';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner size="lg" />
          <p className="text-slate-400">Loading problem...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="card border-red-500/20">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold mb-2 text-red-400">{error}</h2>
          <Link to="/problems" className="btn-primary inline-block mt-4">← Back to Problems</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden animate-fade-in">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-card/50 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link to="/problems" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Problems
          </Link>
          <span className="text-slate-600">/</span>
          <span className="font-semibold text-white text-sm truncate max-w-[200px]">{problem.title}</span>
          <DiffBadge d={problem.difficulty} />
        </div>

        <div className="flex items-center gap-2">
          {/* Language selector */}
          <div className="hidden sm:flex items-center gap-1 bg-bg rounded-xl border border-border p-1">
            {LANGUAGES.map(l => (
              <button
                key={l.id}
                onClick={() => handleLanguageChange(l.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-150 ${
                  language === l.id
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Mobile language selector */}
          <select
            value={language}
            onChange={e => handleLanguageChange(e.target.value)}
            className="sm:hidden bg-bg border border-border text-white text-sm rounded-xl px-3 py-1.5 focus:outline-none focus:border-primary"
          >
            {LANGUAGES.map(l => (
              <option key={l.id} value={l.id}>{l.label}</option>
            ))}
          </select>

          <button
            onClick={handleRunCode}
            disabled={running}
            className="btn-primary flex items-center gap-2 text-sm py-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {running ? (
              <>
                <LoadingSpinner size="sm" />
                Running...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Run Code
                <span className="hidden sm:inline text-xs opacity-60 ml-0.5">Ctrl+↵</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main split layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT PANEL — Problem */}
        <div
          className="flex flex-col border-r border-border overflow-hidden flex-shrink-0"
          style={{ width: `${leftWidth}%` }}
        >
          {/* Tabs */}
          <div className="flex border-b border-border bg-card/30 flex-shrink-0">
            {['description', 'examples', 'constraints'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-sm font-medium capitalize transition-all duration-150 border-b-2 ${
                  activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 text-sm text-slate-300 leading-relaxed">
            {activeTab === 'description' && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-white">{problem.title}</h2>
                <div className="flex gap-2 flex-wrap">
                  <DiffBadge d={problem.difficulty} />
                  {problem.tags?.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <div className="prose-dark whitespace-pre-wrap text-slate-300">
                  <ProblemDescription text={problem.description} />
                </div>
              </div>
            )}

            {activeTab === 'examples' && (
              <div className="space-y-5">
                <h3 className="font-semibold text-white">Examples</h3>
                {problem.examples?.length > 0 ? problem.examples.map((ex, i) => (
                  <div key={i} className="rounded-xl bg-bg border border-border p-4 space-y-2">
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Example {i + 1}</p>
                    <div>
                      <span className="text-slate-400 text-xs">Input: </span>
                      <code className="font-mono text-blue-300 text-sm">{ex.input}</code>
                    </div>
                    <div>
                      <span className="text-slate-400 text-xs">Output: </span>
                      <code className="font-mono text-emerald-300 text-sm">{ex.output}</code>
                    </div>
                    {ex.explanation && (
                      <div className="mt-2 pt-2 border-t border-border">
                        <span className="text-slate-400 text-xs">Explanation: </span>
                        <span className="text-slate-300 text-sm">{ex.explanation}</span>
                      </div>
                    )}
                  </div>
                )) : (
                  <p className="text-slate-500">No examples provided.</p>
                )}
              </div>
            )}

            {activeTab === 'constraints' && (
              <div className="space-y-3">
                <h3 className="font-semibold text-white">Constraints</h3>
                {problem.constraints?.length > 0 ? (
                  <ul className="space-y-2">
                    {problem.constraints.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <code className="font-mono text-blue-200 text-sm">{c}</code>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-500">No constraints listed.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL — Editor + Output */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Editor */}
          <div className="flex-1 overflow-hidden editor-container">
            <Editor
              height="100%"
              language={monacoLang}
              value={code}
              onChange={(val) => setCode(val || '')}
              theme="vs-dark"
              options={{
                fontSize: 14,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                fontLigatures: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                renderWhitespace: 'none',
                tabSize: 2,
                wordWrap: 'on',
                smoothScrolling: true,
                cursorBlinking: 'smooth',
                cursorSmoothCaretAnimation: 'on',
                padding: { top: 16, bottom: 16 },
                lineDecorationsWidth: 0,
                overviewRulerLanes: 0,
                hideCursorInOverviewRuler: true,
                overviewRulerBorder: false,
                scrollbar: {
                  vertical: 'auto',
                  horizontal: 'auto',
                  verticalScrollbarSize: 6,
                  horizontalScrollbarSize: 6,
                },
              }}
            />
          </div>

          {/* Output Console */}
          <div className="border-t border-border flex-shrink-0" style={{ height: '200px' }}>
            <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card/30">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${running ? 'bg-yellow-400 animate-pulse' : output ? (runError ? 'bg-red-400' : 'bg-emerald-400') : 'bg-slate-600'}`} />
                <span className="text-sm font-medium text-slate-300">Output Console</span>
              </div>
              {output && (
                <button
                  onClick={() => setOutput('')}
                  className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="h-full overflow-y-auto p-4 font-mono text-sm bg-[#0a0f1e]">
              {running ? (
                <div className="flex items-center gap-3 text-slate-400">
                  <LoadingSpinner size="sm" />
                  <span>Executing code...</span>
                </div>
              ) : output ? (
                <pre className={`whitespace-pre-wrap break-all leading-relaxed ${runError ? 'text-red-400' : 'text-emerald-300'}`}>
                  {output}
                </pre>
              ) : (
                <p className="text-slate-600 italic">
                  Click "Run Code" or press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 not-italic text-xs">Ctrl+Enter</kbd> to execute your code.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
