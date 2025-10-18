export const getProgressDataForCategory = (category, wordsByCategory, stats) => {
    const wordsForCategory = wordsByCategory[category];
    const notAttempted = wordsForCategory.filter(w => !stats[w.id]);
    const attempted = wordsForCategory.filter(w => stats[w.id]);
    const allCorrect = attempted.filter(w => stats[w.id].incorrect === 0);
    const hasIncorrect = attempted.filter(w => stats[w.id].incorrect > 0);
    
    return { 
        notAttempted, 
        allCorrect, 
        hasIncorrect, 
        total: wordsForCategory.length 
    };
};

export const calculatePercentComplete = (allCorrect, total) => {
    return Math.round((allCorrect.length / total) * 100);
};

export const calculateOverallProgress = (wordsByCategory, stats) => {
    const totalWords = Object.values(wordsByCategory).flat().length;
    const masteredWords = Object.values(stats).filter(s => s.incorrect === 0 && s.attempts > 0).length;
    return Math.round((masteredWords / totalWords) * 100);
};

export const updateWordStats = (stats, wordId, isCorrect, category) => {
    return {
        ...stats,
        [wordId]: {
            ...stats[wordId],
            attempts: (stats[wordId]?.attempts || 0) + 1,
            correct: (stats[wordId]?.correct || 0) + (isCorrect ? 1 : 0),
            incorrect: (stats[wordId]?.incorrect || 0) + (isCorrect ? 0 : 1),
            category: category,
        }
    };
};