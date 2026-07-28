/**
 * Math Diagnostic Engine for ESATIC Revision Mastery
 * Analyzes student written solutions, detects calculation errors,
 * sign errors, partial steps, and provides detailed pedagogical feedback.
 */

export function evaluateMathAnswer(userInput, question) {
  if (!userInput || !userInput.trim()) {
    return {
      status: 'error',
      isCorrect: false,
      title: "Réponse vide",
      analysis: "Veuillez saisir votre calcul ou démonstration.",
      details: []
    };
  }

  const rawInput = userInput.trim();
  const inputLower = rawInput.toLowerCase();
  const cleanInput = inputLower.replace(/\s+/g, '');
  const qId = question.id || '';
  const explanation = (question.explanation || '').toLowerCase();
  const cleanExplanation = explanation.replace(/\s+/g, '');
  const answerKey = (question.correctAnswerKey || '').toLowerCase();

  const details = [];
  let status = 'incorrect'; // 'correct', 'partial', 'incorrect'
  let isCorrect = false;
  let summaryTitle = "";
  let mainAnalysis = "";

  // ----------------------------------------------------
  // Specific Question Evaluation Rules (ESATIC Math 2025)
  // ----------------------------------------------------

  // EXERCICE 1 Q1 : Polynôme Caractéristique P_A(X) = (X+3)^4
  if (qId.includes('ex1-q1')) {
    if (cleanInput.includes('(x+3)^4') || cleanInput.includes('(x+3)4') || cleanInput.includes('(x+3)**4')) {
      status = 'correct';
      isCorrect = true;
      summaryTitle = "🟢 Calcul du Polynôme Caractéristique Exact !";
      mainAnalysis = "Votre résultat $P_A(X) = (X+3)^4$ est parfaitement exact.";
      details.push("✓ Déterminant des 2 blocs $A_{11}$ et $A_{22}$ bien multipliés : $(X+3)^2 \\times (X+3)^2 = (X+3)^4$.");
    } else if (cleanInput.includes('(x-3)^4')) {
      status = 'incorrect';
      summaryTitle = "🔴 Erreur de Signe Détectée";
      mainAnalysis = "Attention : vous avez écrit $(X-3)^4$ avec un signe moins.";
      details.push("⚠️ Les blocs donnent $\\det(X I_2 - A_{11}) = (X+2)(X+4) + 1 = X^2 + 6X + 9 = (X+3)^2$.");
      details.push("👉 La racine est $-3$, donc la forme factorisée est $(X - (-3))^4 = (X+3)^4$.");
    } else if (cleanInput.includes('(x+3)^2') || cleanInput.includes('(x+3)2')) {
      status = 'partial';
      isCorrect = true;
      summaryTitle = "🟡 Démarche Partielle Détectée";
      mainAnalysis = "Vous avez calculé le polynôme pour un seul bloc $2 \\times 2$.";
      details.push("✓ $\\det(X I_2 - A_{11}) = (X+3)^2$ est exact pour le premier bloc.");
      details.push("👉 N'oubliez pas de multiplier par le second bloc $\\det(X I_2 - A_{22}) = (X+3)^2$, ce qui donne $P_A(X) = (X+3)^4$.");
    } else {
      // General polynomial term check
      if (cleanInput.includes('x^4') || cleanInput.includes('12x^3') || cleanInput.includes('54x^2')) {
        status = 'correct';
        isCorrect = true;
        summaryTitle = "🟢 Polynôme Développé Exact !";
        mainAnalysis = "Le développement de $(X+3)^4 = X^4 + 12X^3 + 54X^2 + 108X + 81$ est correct.";
      }
    }
  }

  // EXERCICE 1 Q2 : Valeurs Propres λ = -3 (mult 4)
  else if (qId.includes('ex1-q2')) {
    if (cleanInput.includes('-3') || cleanInput.includes('lambda=-3') || cleanInput.includes('λ=-3')) {
      status = 'correct';
      isCorrect = true;
      summaryTitle = "🟢 Valeur Propre Exacte !";
      mainAnalysis = "La seule valeur propre est bien $\\lambda = -3$ de multiplicité algébrique 4.";
    } else if (cleanInput.includes('3') && !cleanInput.includes('-3')) {
      status = 'incorrect';
      summaryTitle = "🔴 Erreur de Signe Détectée";
      mainAnalysis = "Attention : la valeur propre n'est pas $+3$, mais $-3$.";
      details.push("👉 $P_A(X) = (X+3)^4 = 0 \\iff X = -3$.");
    }
  }

  // EXERCICE 1 Q3 : Diagonalisabilité
  else if (qId.includes('ex1-q3')) {
    if (cleanInput.includes('non') || cleanInput.includes('pas') || cleanInput.includes('dim') || cleanInput.includes('rang')) {
      status = 'correct';
      isCorrect = true;
      summaryTitle = "🟢 Justification de Non-Diagonalisabilité Validée !";
      mainAnalysis = "La matrice $A$ n'est pas diagonalisable car $\\dim(E_{-3}) = 4 - \\text{rg}(A+3I) = 4 - 2 = 2 < 4$.";
    } else if (cleanInput.includes('oui') || cleanInput.includes('est diagonalisable')) {
      status = 'incorrect';
      summaryTitle = "🔴 Conclusion Erronée";
      mainAnalysis = "Attention : la matrice N'EST PAS diagonalisable.";
      details.push("👉 La multiplicité algébrique est 4, mais le sous-espace propre $E_{-3}$ n'est que de dimension 2.");
    }
  }

  // EXERCICE 2 Q1 : Somme télescopique
  else if (qId.includes('ex2-q1')) {
    if (cleanInput.includes('(n+1)^3-1') || cleanInput.includes('(n+1)^3-1^3') || cleanInput.includes('3v_n') || cleanInput.includes('3vn')) {
      status = 'correct';
      isCorrect = true;
      summaryTitle = "🟢 Calcul des 2 Démarches Validé !";
      mainAnalysis = "Les deux méthodes (télescopage et développement $(k+1)^3 - k^3 = 3k^2 + 3k + 1$) sont exactes.";
    }
  }

  // EXERCICE 2 Q3 : Décomposition a, b, c
  else if (qId.includes('ex2-q3')) {
    if ((cleanInput.includes('a=1') || cleanInput.includes('1/n')) && (cleanInput.includes('b=1') || cleanInput.includes('1/(n+1)')) && (cleanInput.includes('c=-4') || cleanInput.includes('-4/(2n+1)'))) {
      status = 'correct';
      isCorrect = true;
      summaryTitle = "🟢 Décomposition en Éléments Simples Exacte !";
      mainAnalysis = "Les coefficients $a=1$, $b=1$ et $c=-4$ sont parfaitement calculés.";
    } else if (cleanInput.includes('c=4') || cleanInput.includes('+4/(2n+1)')) {
      status = 'incorrect';
      summaryTitle = "🔴 Erreur de Signe sur le Coefficient c";
      mainAnalysis = "Attention : $c = -4$ et non $+4$.";
      details.push("👉 En multipliant par $(2n+1)$ et en faisant $n \\to -1/2$ : $\\frac{1}{(-1/2)(-1/2 + 1)} = \\frac{1}{-1/4} = -4$.");
    }
  }

  // EXERCICE 3 Q2 : Equation f' + f = 0 dans E (f(0) = 0)
  else if (qId.includes('ex3-q2')) {
    if (cleanInput.includes('f(x)=0') || cleanInput.includes('f=0') || cleanInput.includes('nulle') || cleanInput.includes('c=0')) {
      status = 'correct';
      isCorrect = true;
      summaryTitle = "🟢 Solution de l'Équation Différentielle Exacte !";
      mainAnalysis = "La seule solution dans $E$ vérifiant $f(0) = 0$ est la fonction nulle $f = 0$.";
    }
  }

  // EXERCICE 4 : Harmoniques du Signal
  else if (qId.includes('ex4-q1')) {
    if (cleanInput.includes('4') && (cleanInput.includes('12/pi') || cleanInput.includes('3.82') || cleanInput.includes('12/\\pi'))) {
      status = 'correct';
      isCorrect = true;
      summaryTitle = "🟢 Fondamental Exact (f = 4 kHz, A = 12/π V) !";
      mainAnalysis = "La fréquence fondamentale est $f_0 = 4\\text{ kHz}$ et l'amplitude est $A_0 = \\frac{12}{\\pi}\\text{ V} \\approx 3.82\\text{ V}$.";
    }
  } else if (qId.includes('ex4-q2')) {
    if (cleanInput.includes('12') && (cleanInput.includes('4/pi') || cleanInput.includes('1.27') || cleanInput.includes('4/\\pi'))) {
      status = 'correct';
      isCorrect = true;
      summaryTitle = "🟢 1er Harmonique Exact (f = 12 kHz, A = 4/π V) !";
      mainAnalysis = "Pour $n=1$ : la fréquence est $3 f = 12\\text{ kHz}$ et l'amplitude est $A_1 = \\frac{4}{\\pi}\\text{ V} \\approx 1.27\\text{ V}$.";
    }
  } else if (qId.includes('ex4-q3')) {
    if (cleanInput.includes('20') && (cleanInput.includes('12/5') || cleanInput.includes('0.76') || cleanInput.includes('12/(5pi)'))) {
      status = 'correct';
      isCorrect = true;
      summaryTitle = "🟢 2ème Harmonique Exact (f = 20 kHz, A = 12/(5π) V) !";
      mainAnalysis = "Pour $n=2$ : la fréquence est $5 f = 20\\text{ kHz}$ et l'amplitude est $A_2 = \\frac{12}{5\\pi}\\text{ V} \\approx 0.76\\text{ V}$.";
    }
  }

  // EXERCICE 5 : Bernoulli EMV
  else if (qId.includes('ex5')) {
    if (cleanInput.includes('barre') || cleanInput.includes('1/n') || cleanInput.includes('moyenne') || cleanInput.includes('sum')) {
      status = 'correct';
      isCorrect = true;
      summaryTitle = "🟢 Estimateur du Maximum de Vraisemblance Exact !";
      mainAnalysis = "L'estimateur du maximum de vraisemblance est la moyenne empirique $\\hat{\\theta}_{EMV} = \\bar{X} = \\frac{1}{n} \\sum_{i=1}^n X_i$.";
    }
  }

  // ----------------------------------------------------
  // Fallback / General Heuristic Evaluation
  // ----------------------------------------------------
  if (status === 'incorrect' && !summaryTitle) {
    // Check key terms against answerKey or explanation
    const stopWords = new Set([
      'avec', 'dans', 'pour', 'cette', 'sont', 'toutes', 'ainsi', 'donc', 'soit', 'tout', 'tous',
      'alors', 'nous', 'vous', 'par', 'sur', 'qui', 'que', 'les', 'des', 'une', 'un', 'est'
    ]);

    const wordsInSolution = Array.from(new Set(
      explanation
        .split(/[\s,();:\n\t=+\-*\/\\^$]+/)
        .filter(w => w.length >= 2 && !stopWords.has(w))
    ));

    const matchedWords = wordsInSolution.filter(w => inputLower.includes(w));

    if (matchedWords.length >= 2) {
      status = 'correct';
      isCorrect = true;
      summaryTitle = "🟢 Démarche et Résultats Validés !";
      mainAnalysis = "Votre raisonnement comporte les éléments mathématiques clés de la solution.";
      details.push(`✓ Mots-clés / Formules identifiés : ${matchedWords.slice(0, 4).join(', ')}.`);
    } else if (matchedWords.length === 1) {
      status = 'partial';
      isCorrect = true;
      summaryTitle = "🟡 Démarche Partiellement Validée";
      mainAnalysis = "Vous avez identifié une partie du raisonnement, mais des étapes ou résultats manquent.";
      details.push(`✓ Terme identifié : ${matchedWords[0]}.`);
      details.push("👉 Comparez votre développement complet avec la solution ci-dessous.");
    } else {
      status = 'incorrect';
      isCorrect = false;
      summaryTitle = "🔴 Erreur de Calcul ou Raisonnement Incomplet";
      mainAnalysis = "Votre calcul ou proposition ne concorde pas avec le résultat attendu pour cet exercice.";
      details.push("👉 Vérifiez vos signes, vos dérivées/intégrales et la cohérence de vos étapes.");
    }
  }

  return {
    status,
    isCorrect,
    title: summaryTitle,
    analysis: mainAnalysis,
    details
  };
}
