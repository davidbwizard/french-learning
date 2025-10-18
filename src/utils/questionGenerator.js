export const generateQuestion = (category, wordsByCategory, settings, wordPool = null) => {
    const wordsForCategory = wordPool || wordsByCategory[category];
    const word = wordsForCategory[Math.floor(Math.random() * wordsForCategory.length)];
    const correctAnswer = settings.quizDirection === 'french-to-english' ? word.english : word.french;
    
    // Shuffle and pick sequentially to avoid infinite loops
    const fullCategoryWords = wordsByCategory[category];
    const shuffledWords = [...fullCategoryWords].sort(() => Math.random() - 0.5);
    const wrongAnswers = [];
    
    for (let i = 0; i < shuffledWords.length && wrongAnswers.length < settings.multipleChoiceCount - 1; i++) {
        const wrongAnswer = settings.quizDirection === 'french-to-english' 
            ? shuffledWords[i].english 
            : shuffledWords[i].french;
        
        if (wrongAnswer !== correctAnswer && !wrongAnswers.includes(wrongAnswer)) {
            wrongAnswers.push(wrongAnswer);
        }
    }
    
    const allChoices = [...wrongAnswers, correctAnswer].sort(() => Math.random() - 0.5);
    
    return {
        word,
        choices: allChoices,
        correctAnswer
    };
};

export const checkAnswer = (answer, correctAnswer) => {
    return answer === correctAnswer;
};