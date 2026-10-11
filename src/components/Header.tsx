import React from 'react';
import { Sprout, Camera, Heart, Stethoscope, BookOpen } from 'lucide-react';

interface HeaderProps {
  currentTab: 'identify' | 'garden' | 'doctor' | 'guides';
  onSelectTab: (tab: 'identify' | 'garden' | 'doctor' | 'guides') => void;
  gardenCount: number;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onSelectTab, gardenCount }) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-50/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => onSelectTab('identify')}
          className="flex items-center gap-2.5 text-left group shrink-0 focus-visible:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-800 text-emerald-100 flex items-center justify-center shadow-sm group-hover:bg-emerald-700 transition-colors">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-stone-900 font-display">FloraCare</span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Single-line, unboxed, text with subtle hover) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={() => onSelectTab('identify')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-stone-900 ${
              currentTab === 'identify' ? 'text-emerald-800 font-semibold border-b-2 border-emerald-800 pb-0.5' : ''
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Identify Plant</span>
          </button>

          <button
            onClick={() => onSelectTab('garden')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-stone-900 ${
              currentTab === 'garden' ? 'text-emerald-800 font-semibold border-b-2 border-emerald-800 pb-0.5' : ''
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>My Garden</span>
            {gardenCount > 0 && (
              <span className="text-xs bg-emerald-100 text-emerald-800 rounded-full px-1.5 py-0.2 font-mono">
                {gardenCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onSelectTab('doctor')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-stone-900 ${
              currentTab === 'doctor' ? 'text-emerald-800 font-semibold border-b-2 border-emerald-800 pb-0.5' : ''
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span>Plant Doctor</span>
          </button>

          <button
            onClick={() => onSelectTab('guides')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-stone-900 ${
              currentTab === 'guides' ? 'text-emerald-800 font-semibold border-b-2 border-emerald-800 pb-0.5' : ''
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Care Guides</span>
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectTab('identify')}
            className="px-4 py-2 text-sm font-medium text-white bg-emerald-800 hover:bg-emerald-900 active:scale-[0.98] transition-all rounded-xl shadow-sm flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <Camera className="w-4 h-4" />
            <span>Identify Photo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
