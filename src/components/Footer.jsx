import React from 'react';
import { Heart, GraduationCap } from 'lucide-react';

export default function Footer({ authorUrl = "https://www.linkedin.com/in/astride-lobasse-a660a233a/" }) {
  return (
    <footer className="w-full border-t border-white/10 bg-black/40 backdrop-blur-md py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
        
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-purple-400" />
          <span className="font-semibold text-gray-300">PREPA ESATIC - Concours Master</span>
        </div>

        <div className="flex items-center gap-1.5 font-medium">
          <span>Développé avec</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
          <span>par</span>
          <a
            href={authorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 font-bold underline transition-colors"
          >
            Lobasse Astride
          </a>
          <span className="text-gray-500">en 2026</span>
        </div>

      </div>
    </footer>
  );
}
