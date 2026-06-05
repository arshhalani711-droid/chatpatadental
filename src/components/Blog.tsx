import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BLOGS } from '../data/dentalData';
import { Blog } from '../types';
import { BookOpen, Calendar, Clock, User, X, ChevronRight, Activity } from 'lucide-react';

export default function BlogList() {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  // Quick formatting render for simplistic markdown paragraphs inside list
  const renderParagraphs = (content: string) => {
    return content.split('\n\n').map((paragraph, idx) => {
      if (paragraph.startsWith('###')) {
        return (
          <h4 key={idx} className="text-base font-semibold text-slate-800 font-sans tracking-tight mt-6 mb-2">
            {paragraph.replace('###', '').trim()}
          </h4>
        );
      }
      if (paragraph.startsWith('-')) {
        return (
          <ul key={idx} className="list-disc pl-5 mt-2 mb-4 space-y-1.5 text-xs text-slate-600 font-sans leading-relaxed">
            {paragraph.split('\n').map((item, id) => (
              <li key={id}>{item.replace('-', '').trim()}</li>
            ))}
          </ul>
        );
      }
      return (
        <p key={idx} className="text-slate-600 text-sm font-light leading-relaxed font-sans mt-3">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <section id="blogs-section" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-wider text-teal-600 uppercase font-sans">Chatpata Oral Library</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mt-2 font-sans">
            Dental Science & Guidelines
          </h2>
          <p className="text-sm text-slate-500 mt-2 font-light font-sans">
            Explore advanced medical research, treatment breakthroughs, and modern hygiene advice published by our board directors.
          </p>
          <div className="h-1 w-16 bg-gradient-to-r from-teal-500 to-teal-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOGS.map((blog, idx) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => setSelectedBlog(blog)}
              className="group bg-slate-50 rounded-2xl border border-slate-200/50 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left cursor-pointer"
            >
              
              {/* Cover Photo */}
              <div className="relative aspect-video bg-slate-100 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-slate-950/80 text-white font-mono text-[9px] font-bold tracking-wider px-2.5 py-1 rounded-md uppercase">
                  {blog.category}
                </div>
              </div>

              {/* Snippet Block */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex gap-4 text-[10px] text-slate-400 font-mono font-medium">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {blog.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {blog.readTime}</span>
                  </div>

                  <h3 className="text-base font-semibold text-slate-800 font-sans tracking-tight mt-3 group-hover:text-teal-700 transition-colors duration-200 leading-snug">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed font-sans font-light mt-2 line-clamp-3">
                    {blog.snippet}
                  </p>
                </div>

                {/* Read Button */}
                <div className="border-t border-slate-200/50 pt-4 mt-5 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-600 font-sans flex items-center gap-1">
                    By {blog.author}
                  </span>
                  <span className="text-xs font-semibold text-teal-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Article <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>

      {/* Reader Panel Dialog */}
      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop filter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBlog(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 w-full max-w-2xl relative z-10 max-h-[85vh] overflow-y-auto overflow-x-hidden text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedBlog(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-all duration-200 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Meta tags */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono font-semibold text-slate-400">
                <span className="text-teal-700 bg-teal-50 px-2.5 py-1 rounded-sm uppercase">{selectedBlog.category}</span>
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {selectedBlog.date}</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {selectedBlog.readTime}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight mt-4 mb-2 font-sans leading-tight">
                {selectedBlog.title}
              </h3>

              {/* Author profile */}
              <div className="flex items-center gap-2.5 border-y border-slate-100 py-3 my-5">
                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs uppercase">
                  {selectedBlog.author.charAt(3)}
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-700 font-sans">Published by {selectedBlog.author}</p>
                  <p className="text-[9px] text-slate-400 font-mono">MEDICAL BOARD MEMBER // CERTIFIED</p>
                </div>
              </div>

              {/* Body Content */}
              <div className="mt-6 prose prose-slate">
                {renderParagraphs(selectedBlog.content)}
              </div>

              {/* Footer assurances */}
              <div className="mt-8 border-t border-slate-150 pt-5 text-center flex items-center justify-center gap-2 text-[10px] font-mono text-slate-400">
                <Activity className="h-4 w-4 text-emerald-500" />
                <span>Reviewed and medically-approved by Chatpata Board directors.</span>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
