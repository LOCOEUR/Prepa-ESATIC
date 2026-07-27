import React from 'react';
import { useRevision } from '../context/RevisionContext';
import { Target, Flame, RefreshCw, PlusCircle, Trophy, GraduationCap } from 'lucide-react';

export default function Navbar({ currentTab, setCurrentTab, startMasteryDrill, selectedTrack, setSelectedTrack }) {
  const { masteryPercentage, streak, resetAllProgress, getUnmasteredQuestions } = useRevision();
  const unmasteredCount = getUnmasteredQuestions().length;

  return (
    <nav className="nav-bar-container">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Brand */}
        <div
          onClick={() => setCurrentTab('dashboard')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="brand-logo-box">
            <div className="brand-logo-inner">
              <GraduationCap className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-tight text-white">
              PREPA <span className="text-purple-400">ESATIC</span>
            </h1>
            <p className="text-xs text-gray-400 font-medium">Sujet Officiel du Concours Master</p>
          </div>
        </div>

        {/* Global Stats Jauge */}
        <div className="stats-box flex items-center gap-6">

          {/* Track Selector */}
          <div className="track-selector-box">
            <button
              onClick={() => setSelectedTrack('all')}
              className={`track-btn ${selectedTrack === 'all' ? 'active' : ''}`}
            >
              Tous
            </button>
            <button
              onClick={() => setSelectedTrack('info')}
              className={`track-btn ${selectedTrack === 'info' ? 'active' : ''}`}
            >
              Informatique
            </button>
            <button
              onClick={() => setSelectedTrack('telecom')}
              className={`track-btn ${selectedTrack === 'telecom' ? 'active' : ''}`}
            >
              Télécoms
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex flex-col gap-1 w-36 sm:w-44">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-gray-300 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-400" /> Maîtrise
              </span>
              <span className={masteryPercentage === 100 ? "text-emerald-400 font-bold" : "text-purple-400"}>
                {masteryPercentage}%
              </span>
            </div>
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill"
                style={{ width: `${masteryPercentage}%` }}
              />
            </div>
          </div>

          {/* Streak */}
          <div className="streak-badge">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Série : {streak}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={startMasteryDrill}
            disabled={unmasteredCount === 0}
            className={`glow-button glow-button-emerald text-xs py-2 px-3.5 ${unmasteredCount === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            <Target className="w-4 h-4" />
            <span>Mode 100% Loop ({unmasteredCount})</span>
          </button>

          <button
            onClick={() => setCurrentTab('manage')}
            className={`icon-nav-btn ${currentTab === 'manage' ? 'active' : ''}`}
            title="Ajouter un sujet"
          >
            <PlusCircle className="w-4 h-4" />
          </button>

          <button
            onClick={resetAllProgress}
            className="icon-nav-btn hover-danger"
            title="Réinitialiser"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

      </div>
    </nav>
  );
}
