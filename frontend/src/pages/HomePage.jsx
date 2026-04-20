import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const features = [
  {
    icon: '⚡',
    title: 'Real Code Execution',
    desc: 'Write and run code in your browser with instant feedback via Judge0 API.',
  },
  {
    icon: '🎯',
    title: 'Curated Problems',
    desc: 'Hand-picked problems across Easy, Medium, and Hard difficulty levels.',
  },
  {
    icon: '🛠️',
    title: 'Multi-Language Support',
    desc: 'Code in JavaScript, Python, C++, and Java with syntax highlighting.',
  },
  {
    icon: '🔐',
    title: 'Secure & Personal',
    desc: 'Your progress is saved to your account. Sign up to get started.',
  },
];

const stats = [
  { value: '10+', label: 'Problems' },
  { value: '4', label: 'Languages' },
  { value: '3', label: 'Difficulty Levels' },
  { value: '∞', label: 'Possibilities' },
];

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-32 px-4">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-slow" />
            Now with real code execution
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
            Online Coding
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent animate-gradient">
              Practice Portal
            </span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Sharpen your coding skills with our curated problem set. Write, run, and debug
            code directly in your browser — no setup required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {isAuthenticated ? (
              <Link to="/problems" className="btn-primary text-base px-8 py-3.5">
                Browse Problems →
              </Link>
            ) : (
              <>
                <Link to="/signup" className="btn-primary text-base px-8 py-3.5">
                  Start Practicing Free
                </Link>
                <Link to="/login" className="btn-secondary text-base px-8 py-3.5">
                  Sign In
                </Link>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-6 mt-20 max-w-2xl mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-extrabold text-white mb-1">{s.value}</div>
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code preview strip */}
      <section className="py-8 px-4 border-y border-border bg-card/30 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="card font-mono text-sm overflow-x-auto">
            <div className="flex items-center gap-1.5 mb-4">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-2 text-slate-500 text-xs">two-sum.js</span>
            </div>
            <div className="space-y-0.5 leading-6">
              <div><span className="text-purple-400">function</span> <span className="text-yellow-300">twoSum</span><span className="text-white">(nums, target) {'{'}</span></div>
              <div className="pl-4"><span className="text-blue-400">const</span> <span className="text-white">map = </span><span className="text-blue-400">new</span> <span className="text-yellow-300">Map</span><span className="text-white">();</span></div>
              <div className="pl-4"><span className="text-purple-400">for</span> <span className="text-white">(</span><span className="text-blue-400">let</span> <span className="text-white">i = </span><span className="text-orange-400">0</span><span className="text-white">; i &lt; nums.length; i++) {'{'}</span></div>
              <div className="pl-8"><span className="text-blue-400">const</span> <span className="text-white">complement = target - nums[i];</span></div>
              <div className="pl-8"><span className="text-purple-400">if</span> <span className="text-white">(map.has(complement))</span> <span className="text-purple-400">return</span> <span className="text-white">[map.get(complement), i];</span></div>
              <div className="pl-8"><span className="text-white">map.set(nums[i], i);</span></div>
              <div className="pl-4"><span className="text-white">{'}'}</span></div>
              <div><span className="text-white">{'}'}</span></div>
              <div className="mt-2 text-slate-500">{'// Output: [0, 1] ✓'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything you need to practice</h2>
            <p className="text-slate-400 text-lg">A complete coding environment right in your browser.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="card hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-white mb-2 group-hover:text-primary transition-colors">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="card border-primary/20 glow-blue">
            <h2 className="text-3xl font-bold mb-3">Ready to level up?</h2>
            <p className="text-slate-400 mb-8">Join and start solving problems today. No credit card required.</p>
            {isAuthenticated ? (
              <Link to="/problems" className="btn-primary inline-block text-base px-8 py-3">
                Go to Problems →
              </Link>
            ) : (
              <Link to="/signup" className="btn-primary inline-block text-base px-8 py-3">
                Create Free Account
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 text-center text-slate-600 text-sm">
        <p>© {new Date().getFullYear()} CodePortal — Built with React, Node.js & MongoDB</p>
      </footer>
    </div>
  );
}
