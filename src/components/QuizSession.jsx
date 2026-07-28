import React, { useState, useEffect } from 'react';
import { useRevision } from '../context/RevisionContext';
import { 
  ArrowLeft, CheckCircle2, XCircle, 
  Lightbulb, ChevronRight, Clock, Sparkles, Send, ShieldCheck, Image as ImageIcon, Maximize2, X, FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import MathText from './MathText';

export default function QuizSession({ questions, sessionTitle, onBack }) {
  const { progress, markQuestionResult } = useRevision();

  // Lock session questions upon mounting
  const [sessionQuestions] = useState(() => {
    return questions.filter(q => !progress[q.id]?.mastered);
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [writtenAnswer, setWrittenAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [showFullImageModal, setShowFullImageModal] = useState(false);

  const currentQ = sessionQuestions[currentIndex];

  useEffect(() => {
    const timer = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleMCQSubmit = (option) => {
    if (feedback) return;
    setSelectedOption(option.id);

    const isCorrect = option.isCorrect;
    markQuestionResult(currentQ.id, isCorrect);

    if (isCorrect) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      setFeedback({
        isCorrect: true,
        message: "Bravo !"
      });
    } else {
      setFeedback({
        isCorrect: false,
        message: "❌ C'est faux."
      });
    }
  };

  const handleWrittenSubmit = (e) => {
    e.preventDefault();
    if (!writtenAnswer.trim() || feedback) return;

    const userInput = writtenAnswer.trim().toLowerCase();
    const cleanUserInput = userInput.replace(/\s+/g, '');
    const explanationText = (currentQ.explanation || '').toLowerCase();
    const cleanExplanation = explanationText.replace(/\s+/g, '');
    const answerKey = (currentQ.correctAnswerKey || '').toLowerCase();

    let isCorrect = false;

    // 1. Explicit answer key matching if present
    if (answerKey) {
      const keys = answerKey.split(/,|\n/).map(k => k.trim().toLowerCase().replace(/\s+/g, '')).filter(Boolean);
      if (keys.some(k => cleanUserInput.includes(k) || (k.length >= 3 && cleanUserInput.includes(k)))) {
        isCorrect = true;
      }
    }

    // 2. Direct string inclusion check in solution (e.g. "(x+3)^4")
    if (!isCorrect && cleanUserInput.length >= 3 && cleanExplanation.includes(cleanUserInput)) {
      isCorrect = true;
    }

    // 3. Meaningful keyword matching from the solution
    if (!isCorrect) {
      const stopWords = new Set([
        'avec', 'dans', 'pour', 'cette', 'sont', 'toutes', 'ainsi', 'donc', 'soit', 'tout', 'tous',
        'alors', 'nous', 'vous', 'par', 'sur', 'qui', 'que', 'les', 'des', 'une', 'un', 'est'
      ]);

      const wordsInSolution = Array.from(new Set(
        explanationText
          .split(/[\s,();:\n\t=+\-*\/\\^$]+/)
          .filter(w => w.length >= 2 && !stopWords.has(w))
      ));

      const matchedWords = wordsInSolution.filter(w => userInput.includes(w));
      // Must match at least 1 significant term or keyword from the specific question's solution
      isCorrect = matchedWords.length >= 1;
    }

    markQuestionResult(currentQ.id, isCorrect);

    if (isCorrect) {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
      setFeedback({
        isCorrect: true,
        message: "Bravo ! Réponse correcte."
      });
    } else {
      setFeedback({
        isCorrect: false,
        message: "Réponse enregistrée. Comparez votre démarche avec la correction :"
      });
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setWrittenAnswer('');
    setShowHint(false);
    setFeedback(null);
    setShowFullImageModal(false);

    if (currentIndex < sessionQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onBack();
    }
  };

  if (!currentQ || sessionQuestions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="glass-card p-10 space-y-4 border-emerald-500/40">
          <ShieldCheck className="w-20 h-20 text-emerald-400 mx-auto animate-bounce" />
          <h2 className="text-3xl font-extrabold text-white">Module 100% Maîtrisé !</h2>
          <p className="text-gray-300 text-sm">
            Tous les exercices de ce module ont été réussis à 100%. Ils ne vous seront plus représentés !
          </p>
          <button onClick={onBack} className="glow-button glow-button-emerald justify-center">
            Retour au tableau de bord
          </button>
        </div>
      </div>
    );
  }

  const isPdfDocument = currentQ.isPdf || (currentQ.image && currentQ.image.startsWith('data:application/pdf'));

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8 space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="action-nav-btn"
        >
          <ArrowLeft className="w-4 h-4" /> Quitter la session
        </button>

        <div className="flex items-center gap-4">
          <div className="stats-box text-xs text-gray-400 font-mono flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span>{formatTime(seconds)}</span>
          </div>

          <span className="badge bg-purple-500/20 text-purple-300 border-purple-500/30">
            Question {currentIndex + 1} / {sessionQuestions.length}
          </span>
        </div>
      </div>

      {/* Question Card */}
      <div className="glass-card p-8 space-y-6 relative border-purple-500/20">
        
        {/* Category Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
            {sessionTitle}
          </span>

          <div className="flex items-center gap-2">
            <span className={`badge ${
              currentQ.difficulty === 'Facile' ? 'bg-emerald-500/20 text-emerald-300' :
              currentQ.difficulty === 'Moyen' ? 'bg-amber-500/20 text-amber-300' :
              'bg-rose-500/20 text-rose-300'
            }`}>
              {currentQ.difficulty || 'Moyen'}
            </span>
          </div>
        </div>

        {/* Display Paper Photo or PDF if uploaded */}
        {currentQ.image && (
          <div className="bg-black/50 border border-purple-500/30 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                {isPdfDocument ? <FileText className="w-4 h-4 text-purple-400" /> : <ImageIcon className="w-4 h-4 text-purple-400" />}
                {isPdfDocument ? "Document PDF Officiel de l'Épreuve" : "Photo Officielle de la Feuille d'Examen"}
              </span>

              {!isPdfDocument && (
                <button
                  onClick={() => setShowFullImageModal(true)}
                  className="text-xs text-cyan-300 hover:underline flex items-center gap-1 font-semibold"
                >
                  <Maximize2 className="w-3.5 h-3.5" /> Agrandir la photo
                </button>
              )}
            </div>
            
            {isPdfDocument ? (
              <iframe
                src={currentQ.image}
                title="Document PDF du sujet"
                className="w-full h-96 rounded-lg border border-white/10"
              />
            ) : (
              <div 
                onClick={() => setShowFullImageModal(true)} 
                className="cursor-pointer overflow-hidden rounded-lg border border-white/10 hover:border-purple-400 transition-colors bg-black/40 p-2 text-center"
              >
                <img 
                  src={currentQ.image} 
                  alt="Feuille d'examen officielle" 
                  className="max-h-80 w-auto mx-auto object-contain rounded-md" 
                />
              </div>
            )}
          </div>
        )}

        {/* Prompt */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white leading-snug">
            {currentQ.title}
          </h3>
          <div className="text-sm text-gray-200 prompt-text prompt-box-dark">
            <MathText text={currentQ.prompt} />
          </div>
        </div>

        {/* Hint Section */}
        {currentQ.hint && (
          <div>
            {!showHint ? (
              <button
                onClick={() => setShowHint(true)}
                className="hint-trigger-btn"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Afficher l'indice du tuteur
              </button>
            ) : (
              <div className="hint-box-dark">
                <div className="font-bold flex items-center gap-1.5 text-amber-300 mb-1">
                  <Lightbulb className="w-4 h-4 text-amber-400" /> Indice :
                </div>
                <MathText text={currentQ.hint} />
              </div>
            )}
          </div>
        )}

        {/* Answer Input */}
        <div className="pt-2">
          {currentQ.type === 'mcq' && currentQ.options ? (
            <div className="grid grid-cols-1 gap-3">
              {currentQ.options.map(opt => {
                const isSelected = selectedOption === opt.id;
                let btnStyle = "mcq-option-btn";

                if (feedback) {
                  if (opt.isCorrect) {
                    btnStyle = "mcq-option-btn mcq-correct";
                  } else if (isSelected && !opt.isCorrect) {
                    btnStyle = "mcq-option-btn mcq-wrong";
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleMCQSubmit(opt)}
                    disabled={!!feedback}
                    className={btnStyle}
                  >
                    <span><MathText text={opt.text} /></span>
                    {feedback && opt.isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {feedback && isSelected && !opt.isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <form onSubmit={handleWrittenSubmit} className="space-y-4">
              <textarea
                value={writtenAnswer}
                onChange={e => setWrittenAnswer(e.target.value)}
                disabled={!!feedback}
                placeholder="Tapez votre réponse ou votre code ici..."
                rows={5}
                className="dark-textarea"
              />
              
              {!feedback && (
                <button
                  type="submit"
                  disabled={!writtenAnswer.trim()}
                  className="glow-button text-xs py-2.5 px-5 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" /> Soumettre ma réponse
                </button>
              )}
            </form>
          )}
        </div>

        {/* Feedback Display */}
        {feedback && (
          <div className="space-y-4 pt-4 border-t border-white/10 animate-fade-in">
            <div className={`p-4 rounded-xl border text-sm flex items-start gap-3 ${
              feedback.isCorrect ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200' :
              'bg-rose-500/10 border-rose-500/30 text-rose-200'
            }`}>
              {feedback.isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-bold text-base">{feedback.message}</p>
              </div>
            </div>

            {/* ONLY DISPLAY EXPLANATION IF WRONG */}
            {!feedback.isCorrect && (
              <div className="bg-purple-950/30 border border-purple-500/30 rounded-xl p-5 space-y-3">
                <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-400" /> Explication de l'erreur & Correction :
                </h4>
                <div className="text-xs text-gray-200 prompt-text prompt-box-dark leading-relaxed">
                  <MathText text={currentQ.explanation} />
                </div>
              </div>
            )}

            {/* Next Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="glow-button text-xs py-2.5 px-6"
              >
                <span>Question suivante</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* FULL IMAGE MODAL */}
      {showFullImageModal && currentQ.image && !isPdfDocument && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setShowFullImageModal(false)}
              className="absolute -top-12 right-0 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={currentQ.image} 
              alt="Vue grand angle sujet papier" 
              className="max-h-[85vh] w-auto object-contain rounded-xl border border-white/20 shadow-2xl" 
            />
          </div>
        </div>
      )}

    </div>
  );
}
