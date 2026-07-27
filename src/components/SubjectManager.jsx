import React, { useState } from 'react';
import { useRevision } from '../context/RevisionContext';
import { Plus, ArrowLeft, CheckCircle2, Image as ImageIcon, Trash2, FileText, Cpu } from 'lucide-react';

export default function SubjectManager({ onBack }) {
  const { modules, addQuestionToModule } = useRevision();

  // Mode tab: 'manual'
  const [selectedModuleId, setSelectedModuleId] = useState(modules[0]?.id || 'algo');
  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [type, setType] = useState('mcq');
  const [difficulty, setDifficulty] = useState('Moyen');
  const [hint, setHint] = useState('');
  const [explanation, setExplanation] = useState('');
  const [fileData, setFileData] = useState(null);
  const [isPdf, setIsPdf] = useState(false);
  const [options, setOptions] = useState([
    { id: 'a', text: '', isCorrect: true },
    { id: 'b', text: '', isCorrect: false }
  ]);

  const [successMsg, setSuccessMsg] = useState('');

  const handleManualFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsPdf(file.type === 'application/pdf' || file.name.endsWith('.pdf'));

    const reader = new FileReader();
    reader.onloadend = () => {
      setFileData(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddOption = () => {
    const nextId = String.fromCharCode(97 + options.length);
    setOptions(o => [...o, { id: nextId, text: '', isCorrect: false }]);
  };

  const handleOptionChange = (idx, text) => {
    setOptions(o => o.map((opt, i) => i === idx ? { ...opt, text } : opt));
  };

  const handleSetCorrect = (idx) => {
    setOptions(o => o.map((opt, i) => ({ ...opt, isCorrect: i === idx })));
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!title || !prompt) return;

    const newQuestion = {
      title,
      type,
      difficulty,
      prompt,
      hint: hint || null,
      explanation: explanation || "Aucune explication fournie.",
      image: fileData || null,
      isPdf: isPdf,
      options: type === 'mcq' ? options : null,
      correctAnswerKey: type !== 'mcq' ? explanation : null
    };

    addQuestionToModule(selectedModuleId, newQuestion);

    setSuccessMsg("Exercice et document ajoutés avec succès !");
    setTitle('');
    setPrompt('');
    setHint('');
    setExplanation('');
    setFileData(null);
    setIsPdf(false);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="action-nav-btn"
        >
          <ArrowLeft className="w-4 h-4" /> Retour au tableau de bord
        </button>
      </div>

      <div className="glass-card p-8 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Plus className="w-6 h-6 text-purple-400" /> Ajouter un Exercice / Sujet d'Examen
          </h2>
          <p className="text-gray-400 text-xs mt-1">
            Enrichissez votre banque d'exercices. Ils seront sauvegardés automatiquement dans votre navigateur.
          </p>
        </div>

        {/* Tab Switcher with Disabled Grey Button */}
        <div className="tab-switch-container">
          <button
            type="button"
            disabled
            className="tab-switch-btn opacity-40 cursor-not-allowed pointer-events-none bg-gray-900/80 text-gray-500 border border-gray-800"
          >
            <Cpu className="w-4 h-4 text-gray-600" /> Analyseur IA Automatique (PDF / Photo)
          </button>
          
          <button
            type="button"
            className="tab-switch-btn active"
          >
            <Plus className="w-4 h-4" /> Ajout Manuel d'Exercice
          </button>
        </div>

        {successMsg && (
          <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold p-4 rounded-xl flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> {successMsg}
          </div>
        )}

        {/* MANUAL EXERCISE CREATION FORM */}
        <form onSubmit={handleManualSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Module Cible</label>
              <select
                value={selectedModuleId}
                onChange={e => setSelectedModuleId(e.target.value)}
                className="dark-select"
              >
                {modules.map(m => (
                  <option key={m.id} value={m.id} className="bg-gray-900 text-white">
                    {m.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Format</label>
              <select
                value={type}
                onChange={e => setType(e.target.value)}
                className="dark-select"
              >
                <option value="mcq" className="bg-gray-900 text-white">QCM (Choix Multiples)</option>
                <option value="code_written" className="bg-gray-900 text-white">Rédaction de Code / Écrit</option>
                <option value="short_answer" className="bg-gray-900 text-white">Réponse Courte / Calcul</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Difficulté</label>
              <select
                value={difficulty}
                onChange={e => setDifficulty(e.target.value)}
                className="dark-select"
              >
                <option value="Facile" className="bg-gray-900 text-white">Facile</option>
                <option value="Moyen" className="bg-gray-900 text-white">Moyen</option>
                <option value="Difficile" className="bg-gray-900 text-white">Difficile</option>
              </select>
            </div>
          </div>

          {/* Photo or PDF Import Field */}
          <div className="bg-purple-950/20 border border-purple-500/30 p-4 rounded-xl space-y-3">
            <label className="block text-xs font-bold text-purple-300 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-purple-400" /> Importer Photo ou Document PDF du sujet (Optionnel)
            </label>
            <input
              type="file"
              accept="image/*,.pdf,application/pdf"
              onChange={handleManualFileUpload}
              className="dark-file-input cursor-pointer text-xs text-gray-300"
            />
            {fileData && (
              <div className="mt-3 relative p-3 bg-black/50 rounded-lg border border-purple-500/40 inline-block">
                {isPdf ? (
                  <div className="flex items-center gap-2 text-purple-300 text-xs font-bold py-2">
                    <FileText className="w-6 h-6 text-purple-400" /> Document PDF prêt
                  </div>
                ) : (
                  <img src={fileData} alt="Aperçu du sujet papier" className="h-40 object-contain rounded-md" />
                )}
                <button 
                  type="button" 
                  onClick={() => { setFileData(null); setIsPdf(false); }} 
                  className="mt-2 text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Supprimer le fichier
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Titre de l'exercice</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="ex: Session 2025 - Exercice IP"
              required
              className="dark-input"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Énoncé complet / Problème</label>
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              rows={4}
              placeholder="Tapez le sujet ou la question ici..."
              required
              className="dark-textarea"
            />
          </div>

          {/* If MCQ Options */}
          {type === 'mcq' && (
            <div className="space-y-3 prompt-box-dark rounded-xl">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-300">Options du QCM (Cochez la bonne réponse)</label>
                <button
                  type="button"
                  onClick={handleAddOption}
                  className="text-xs text-purple-400 hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Ajouter une option
                </button>
              </div>

              {options.map((opt, idx) => (
                <div key={opt.id} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="correctOption"
                    checked={opt.isCorrect}
                    onChange={() => handleSetCorrect(idx)}
                    className="w-4 h-4 accent-purple-500 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={opt.text}
                    onChange={e => handleOptionChange(idx, e.target.value)}
                    placeholder={`Option ${opt.id.toUpperCase()}`}
                    required
                    className="dark-input flex-1"
                  />
                </div>
              ))}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-amber-300 mb-1">Indice du Tuteur (Optionnel)</label>
            <input
              type="text"
              value={hint}
              onChange={e => setHint(e.target.value)}
              placeholder="ex: Observez bien le masque /26..."
              className="dark-input"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Correction & Explication détaillée</label>
            <textarea
              value={explanation}
              onChange={e => setExplanation(e.target.value)}
              rows={3}
              placeholder="Fournissez la solution explicative détaillée..."
              className="dark-textarea"
            />
          </div>

          <button
            type="submit"
            className="glow-button text-xs py-3 px-6 w-full justify-center"
          >
            <Plus className="w-4 h-4" /> Ajouter cet exercice au programme
          </button>

        </form>

      </div>

    </div>
  );
}
