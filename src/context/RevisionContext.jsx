import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialModules } from '../data/curriculumData';
import confetti from 'canvas-confetti';

const RevisionContext = createContext();

export const RevisionProvider = ({ children }) => {
  const [modules, setModules] = useState(() => {
    const saved = localStorage.getItem('esatic_modules_v2025_v6');
    if (!saved) {
      localStorage.setItem('esatic_modules_v2025_v6', JSON.stringify(initialModules));
      return initialModules;
    }
    
    try {
      localStorage.setItem('esatic_modules_v2025_v6', JSON.stringify(initialModules));
      return initialModules;
    } catch (e) {
      return initialModules;
    }
  });

  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('esatic_progress');
    return saved ? JSON.parse(saved) : {};
  });

  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('esatic_streak');
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('esatic_modules_v2025_v6', JSON.stringify(modules));
  }, [modules]);

  useEffect(() => {
    localStorage.setItem('esatic_progress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('esatic_streak', streak.toString());
  }, [streak]);

  // Compute total stats
  const allQuestions = modules.flatMap(m => m.questions || []);
  const totalQuestions = allQuestions.length;
  
  const masteredCount = allQuestions.filter(q => progress[q.id]?.mastered).length;
  const masteryPercentage = totalQuestions > 0 ? Math.round((masteredCount / totalQuestions) * 100) : 0;

  // Trigger celebration on 100%
  useEffect(() => {
    if (masteryPercentage === 100 && totalQuestions > 0) {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
    }
  }, [masteryPercentage, totalQuestions]);

  const markQuestionResult = (questionId, isCorrect) => {
    setProgress(prev => {
      const current = prev[questionId] || { attempts: 0, mastered: false };
      const newAttempts = current.attempts + 1;
      const newMastered = isCorrect;

      if (isCorrect) {
        setStreak(s => s + 1);
      } else {
        setStreak(0);
      }

      return {
        ...prev,
        [questionId]: {
          attempts: newAttempts,
          mastered: newMastered,
          lastAnswerCorrect: isCorrect,
          updatedAt: new Date().toISOString()
        }
      };
    });
  };

  const getUnmasteredQuestions = () => {
    return allQuestions.filter(q => !progress[q.id]?.mastered);
  };

  const resetAllProgress = () => {
    if (window.confirm("Voulez-vous vraiment réinitialiser toute votre progression de révision ?")) {
      setProgress({});
      setStreak(0);
      setModules(initialModules);
      localStorage.setItem('esatic_modules_v2025_v6', JSON.stringify(initialModules));
    }
  };

  const addQuestionToModule = (moduleId, newQuestion) => {
    setModules(prevModules => prevModules.map(mod => {
      if (mod.id === moduleId) {
        return {
          ...mod,
          questions: [...mod.questions, { ...newQuestion, id: `${moduleId}-${Date.now()}` }]
        };
      }
      return mod;
    }));
  };

  const addNewModule = (newModule) => {
    setModules(prevModules => [...prevModules, newModule]);
  };

  return (
    <RevisionContext.Provider value={{
      modules,
      progress,
      streak,
      totalQuestions,
      masteredCount,
      masteryPercentage,
      markQuestionResult,
      getUnmasteredQuestions,
      resetAllProgress,
      addQuestionToModule,
      addNewModule
    }}>
      {children}
    </RevisionContext.Provider>
  );
};

export const useRevision = () => useContext(RevisionContext);
