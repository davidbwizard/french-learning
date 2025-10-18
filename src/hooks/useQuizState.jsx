import { useState, useEffect } from 'react';
import { WORDS_BY_CATEGORY, SETTINGS } from '../data/words';
import { generateQuestion as generateQuestionUtil } from '../utils/questionGenerator';

export const useQuizState = (selectedCategory, practiceMode) => {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [choices, setChoices] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const generateQuestion = (category = selectedCategory, wordPool = null) => {
        const result = generateQuestionUtil(category, WORDS_BY_CATEGORY, SETTINGS, wordPool);
        setCurrentQuestion(result.word);
        setChoices(result.choices);
        setSelectedAnswer(null);
        setShowResult(false);
    };

    const selectAnswer = (answer) => {
        setSelectedAnswer(answer);
        setShowResult(true);
    };

    const getQuestionText = () => {
        if (!currentQuestion) return '';
        return SETTINGS.quizDirection === 'french-to-english' 
            ? currentQuestion.french 
            : currentQuestion.english;
    };

    const getCorrectAnswer = () => {
        if (!currentQuestion) return '';
        return SETTINGS.quizDirection === 'french-to-english'
            ? currentQuestion.english
            : currentQuestion.french;
    };

    return {
        currentQuestion,
        choices,
        selectedAnswer,
        showResult,
        questionText: getQuestionText(),
        correctAnswer: getCorrectAnswer(),
        generateQuestion,
        selectAnswer
    };
};