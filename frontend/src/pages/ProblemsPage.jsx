import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

const DifficultyBadge = ({ difficulty }) => {
  const cls = {
    Easy: 'badge-easy',
    Medium: 'badge-medium',
    Hard: 'badge-hard',
  };
  return <span className={cls[difficulty]}>{difficulty}</span>;
};

const FILTERS = ['All', 'Easy', 'Medium', 'Hard'];

export default function ProblemsPage() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await axios.get('https://coding-portal-backend-enjf.onrender.com/api/problems');
        setProblems(res.data.problems);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load problems.');
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  const filtered = problems.filter(p => {
    const matchDiff = filter === 'All' || p.difficulty === filter;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(search.toLowerCase())));
    return matchDiff && matchSearch;
  });

  const counts = {
    All: problems.length,
    Easy: problems.filter(p => p.difficulty === 'Easy').length,
    Medium: problems.filter(p => p.difficulty === 'Medium').length,
    Hard: problems.filter(p => p.difficulty === 'Hard').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner size="lg" />
          <p className="text-slate-400">Loading problems...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="card border-red-500/20">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold mb-2">Failed to load</h2>
          <p className="text-red-400 text-sm mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Problem Set</h1>
        <p className="text-slate-400">
          {problems.length} problems available. Pick one and start solving.
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search problems or tags..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <div className="flex gap-2">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                filter === f
                  ? 'bg-primary border-primary text-white'
                  : 'bg-card border-border text-slate-400 hover:text-white hover:border-primary/40'
              }`}
            >
              {f}
              <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                filter === f ? 'bg-white/20' : 'bg-slate-700'
              }`}>
                {counts[f]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Problem List */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg font-medium mb-1">No problems found</p>
          <p className="text-sm">Try adjusting your search or filter</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((problem, index) => (
            <div
              key={problem._id}
              className="card hover:border-primary/30 transition-all duration-200 hover:-translate-y-0.5 group"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <span className="text-slate-600 font-mono text-sm w-6 text-right flex-shrink-0">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-white group-hover:text-primary transition-colors truncate">
                      {problem.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <DifficultyBadge difficulty={problem.difficulty} />
                      {problem.tags && problem.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <Link
                  to={`/problems/${problem.slug}`}
                  className="flex-shrink-0 btn-primary text-sm px-4 py-2"
                >
                  Solve →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
