import React from 'react';
import { useRevision } from '../context/RevisionContext';
import { 
  Calculator, Network, Wifi, Database, Code2, Layers, 
  CheckCircle2, ArrowRight, Award, Zap, UserCheck, Star 
} from 'lucide-react';

const iconMap = {
  Calculator,
  Network,
  Wifi,
  Database,
  Code2,
  Layers
};

export default function Dashboard({ onSelectModule, startMasteryDrill, selectedTrack }) {
  const { modules, progress, totalQuestions, masteredCount, getUnmasteredQuestions } = useRevision();

  // Filter modules based on selected track
  const filteredModules = modules.filter(mod => {
    if (selectedTrack === 'all') return true;
    return mod.track === 'all' || mod.track === selectedTrack;
  });

  const unmasteredQuestions = getUnmasteredQuestions();
  
  // Count questions that were attempted at least once but missed
  const failedCount = unmasteredQuestions.filter(q => (progress[q.id]?.attempts || 0) > 0).length;

  let buttonText = `⚡ Démarrer l'entraînement (${unmasteredQuestions.length} exercices)`;
  if (unmasteredQuestions.length === 0) {
    buttonText = "🎉 Tout est 100% Maîtrisé !";
  } else if (failedCount > 0) {
    buttonText = `⚡ Chasser mes ${failedCount} erreur(s)`;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-10">
      
      {/* Hero Header */}
      <div className="glass-card p-8 relative overflow-hidden border-purple-500/20">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-gradient-to-br from-purple-600/20 to-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              PREPA <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">ESATIC</span> - Révisions 100% Maîtrise
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Prépare les concours d'entrée en Master Informatique & Télécoms. Révise les cours des enseignants principaux et entraîne-toi en boucle sur les **épreuves officielles de la Session 2025**.
            </p>
          </div>

          {/* Quick Launch Card */}
          <div className="w-full md:w-auto bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-3">
            <div className="text-3xl font-extrabold text-white">
              {masteredCount} <span className="text-gray-500 text-xl font-normal">/ {totalQuestions}</span>
            </div>
            <div className="text-xs text-gray-400 font-medium">Exercices 100% maîtrisés</div>
            
            <button
              onClick={startMasteryDrill}
              disabled={unmasteredQuestions.length === 0}
              className="w-full glow-button glow-button-emerald justify-center text-xs py-2.5 px-5"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>{buttonText}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Program Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-400" /> Épreuves Officielles & Modules de Révision
          </h3>
          <span className="text-xs text-gray-400">Cliquez sur un module pour démarrer</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map(mod => {
            const IconComponent = iconMap[mod.icon] || Calculator;
            const moduleQuestions = mod.questions || [];
            const moduleMastered = moduleQuestions.filter(q => progress[q.id]?.mastered).length;
            const modPercentage = moduleQuestions.length > 0 
              ? Math.round((moduleMastered / moduleQuestions.length) * 100) 
              : 0;

            const isFullyMastered = modPercentage === 100 && moduleQuestions.length > 0;
            const isOfficial2025 = mod.id.includes('session-2025');

            return (
              <div 
                key={mod.id}
                onClick={() => onSelectModule(mod)}
                className={`glass-card glass-card-interactive p-6 flex flex-col justify-between space-y-6 cursor-pointer relative overflow-hidden group ${
                  isOfficial2025 ? 'border-amber-500/50 bg-purple-950/20 shadow-purple-500/10' : ''
                } ${isFullyMastered ? 'border-emerald-500/40 bg-emerald-950/10' : ''}`}
              >
                {/* Decorative Top Gradient Line */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${mod.color}`} />

                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${mod.color} text-white shadow-lg shadow-purple-500/10`}>
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      {isOfficial2025 && (
                        <span className="badge bg-amber-500/20 text-amber-300 border-amber-500/40 font-extrabold animate-pulse">
                          <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" /> Épreuve 2025
                        </span>
                      )}

                      {isFullyMastered ? (
                        <span className="badge bg-emerald-500/20 text-emerald-300 border-emerald-500/40">
                          <CheckCircle2 className="w-3.5 h-3.5" /> 100% Maîtrisé
                        </span>
                      ) : (
                        <span className={`badge ${mod.badgeColor}`}>
                          {modPercentage}% terminé
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title, Category & Professor */}
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20">
                      {mod.category}
                    </span>

                    <h4 className="text-lg font-bold text-white mt-1.5 group-hover:text-purple-300 transition-colors">
                      {mod.title}
                    </h4>

                    {mod.professor && (
                      <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold mt-1">
                        <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span>Source : {mod.professor}</span>
                      </div>
                    )}

                    <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                      {mod.description}
                    </p>
                  </div>
                </div>

                {/* Footer Progress & CTA */}
                <div className="space-y-3 pt-4 border-t border-white/5">
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>Progression</span>
                    <span className="font-semibold text-white">{moduleMastered} / {moduleQuestions.length} exercices</span>
                  </div>

                  <div className="card-progress-bar-bg">
                    <div 
                      className="card-progress-bar-fill"
                      style={{ width: `${modPercentage}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-semibold text-purple-400 group-hover:text-purple-300 transition-colors flex items-center gap-1">
                      {isFullyMastered ? 'Réviser à nouveau' : "S'entraîner"} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
