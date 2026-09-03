import React, { useState } from 'react';
import { useClinic } from '@/app/context/ClinicContext';
import { BlogPost } from '@/app/types';
import { 
  Search,
  Clock, 
  ArrowRight,
  X, 
  CalendarCheck,
  Share2,
} from 'lucide-react';

export const BlogView: React.FC = () => {
  const { 
    blogPosts, 
    selectedBlogPost, 
    setSelectedBlogPost, 
    setCurrentSection, 
    setSelectedPsychologistForBooking,
    psychologists,
    showToast
  } = useClinic();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = ['Todos', 'Ansiedad', 'Relaciones', 'Salud Mental', 'Crianza', 'Bienestar'];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'Todos' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleBookWithAuthor = (authorId: string) => {
    const psy = psychologists.find((p) => p.id === authorId) || psychologists[0];
    setSelectedPsychologistForBooking(psy);
    setSelectedBlogPost(null);
    setCurrentSection('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = (post: BlogPost) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Enlace del artículo copiado al portapapeles.');
    } else {
      showToast('Artículo: ' + post.title);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-4 sm:space-y-5">
      {/* Header - High Density */}
      <div className="text-center max-w-2xl mx-auto space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
          Psicoeducación y Bienestar
        </span>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          Artículos y Recomendaciones Clínicas
        </h1>
        <p className="text-xs text-slate-600">
          Publicaciones escritas por nuestro equipo de psicólogos colegiados con base en evidencia científica.
        </p>
      </div>

      {/* Filter and Search - High Density */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 bg-white p-2.5 sm:p-3 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Buscar por tema o tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-lg border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md text-[11px] whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-teal-600 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid - High Density */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => setSelectedBlogPost(post)}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-teal-400 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              {/* Cover Image */}
              <div className="relative h-40 bg-slate-100 overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 bg-white/95 backdrop-blur-xs text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                  {post.category}
                </span>
                <span className="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur-xs text-white text-[9px] px-1.5 py-0.5 rounded flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" />
                  <span>{post.readTime}</span>
                </span>
              </div>

              {/* Body */}
              <div className="p-3.5 space-y-2">
                <span className="text-[10px] text-slate-400 block">{post.date}</span>
                <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-teal-700 transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {post.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Author Footer */}
            <div className="p-3 pt-2 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={post.authorAvatar}
                  alt={post.authorName}
                  className="w-6 h-6 rounded-full object-cover border border-slate-200"
                />
                <span className="text-[11px] font-semibold text-slate-700 truncate max-w-[130px]">
                  {post.authorName}
                </span>
              </div>

              <span className="text-[11px] font-bold text-teal-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Leer</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* FULL ARTICLE READER MODAL - High Density */}
      {selectedBlogPost && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden transform transition-all my-6">
            {/* Modal Top Bar */}
            <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-900">
              <img
                src={selectedBlogPost.imageUrl}
                alt={selectedBlogPost.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

              {/* Close button */}
              <button
                onClick={() => setSelectedBlogPost(null)}
                className="absolute top-3 right-3 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full backdrop-blur-xs transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Category & meta */}
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <span className="inline-block bg-teal-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                  {selectedBlogPost.category}
                </span>
                <h2 className="text-base sm:text-lg font-bold leading-tight">
                  {selectedBlogPost.title}
                </h2>
                <div className="flex items-center gap-2 text-[11px] text-slate-300">
                  <span>{selectedBlogPost.date}</span>
                  <span>•</span>
                  <span>{selectedBlogPost.readTime}</span>
                </div>
              </div>
            </div>

            {/* Author Bar */}
            <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <img
                  src={selectedBlogPost.authorAvatar}
                  alt={selectedBlogPost.authorName}
                  className="w-9 h-9 rounded-full object-cover border-2 border-teal-600"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">{selectedBlogPost.authorName}</h4>
                  <p className="text-[11px] text-teal-700 font-medium">{selectedBlogPost.authorTitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleShare(selectedBlogPost)}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Compartir</span>
                </button>
                <button
                  onClick={() => handleBookWithAuthor(selectedBlogPost.authorId)}
                  className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>Agendar</span>
                </button>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-4 sm:p-6 space-y-4 max-h-[50vh] overflow-y-auto text-slate-700 leading-relaxed text-xs">
              <div className="p-3 bg-teal-50/60 rounded-xl border border-teal-100 text-teal-900 italic font-medium">
                "{selectedBlogPost.excerpt}"
              </div>

              {selectedBlogPost.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={idx} className="text-sm font-bold text-slate-900 pt-1">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                return (
                  <p key={idx} className="text-slate-600 whitespace-pre-line">
                    {paragraph}
                  </p>
                );
              })}

              <div className="pt-3 border-t border-slate-200">
                <h5 className="text-[10px] uppercase font-bold text-slate-400 mb-1.5">Temas relacionados:</h5>
                <div className="flex flex-wrap gap-1">
                  {selectedBlogPost.tags.map((t, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
              <button
                onClick={() => setSelectedBlogPost(null)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Cerrar Artículo
              </button>

              <button
                onClick={() => handleBookWithAuthor(selectedBlogPost.authorId)}
                className="px-3.5 py-1.5 rounded-lg bg-teal-600 text-white text-xs font-semibold hover:bg-teal-700 transition-colors shadow-xs flex items-center gap-1 cursor-pointer"
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                <span>Separar Cita con este Especialista</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
