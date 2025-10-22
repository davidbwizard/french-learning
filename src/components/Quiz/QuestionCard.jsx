import React from 'react';
import { RotateCcw } from '../UI/Icons';
import SpeakerIcon from '../UI/SpeakerIcon';

const QuestionCard = ({ 
    questionText,
    currentQuestion,
    getCurrentStats,
    choices,
    selectedAnswer,
    correctAnswer,
    showResult,
    onAnswer,
    onNextQuestion
}) => {
    return (
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-12 mb-8 border-8 border-green-200">
            <div className="text-center mb-8">
                <p className="text-gray-600 text-lg mb-3">What does this mean?</p>
                <div className="flex items-center justify-center gap-4 mb-6">
                    <h2 className="text-5xl font-bold text-green-800">{questionText}</h2>
                    <SpeakerIcon text={questionText} />
                </div>
                {currentQuestion && getCurrentStats()[currentQuestion.id] && (
                    <p className="text-sm text-gray-500">
                        Attempted: {getCurrentStats()[currentQuestion.id].attempts} times
                    </p>
                )}
            </div>

            <div className="space-y-4">
                {choices.map((choice, index) => {
                    const isSelected = selectedAnswer === choice;
                    const isCorrect = choice === correctAnswer;
                    const showCorrect = showResult && isCorrect;
                    const showWrong = showResult && isSelected && !isCorrect;
                    
                    return (
                        <button 
                            key={index} 
                            onClick={() => !showResult && onAnswer(choice)} 
                            disabled={showResult} 
                            className={`w-full p-6 rounded-2xl text-2xl font-bold transition-all transform hover:scale-105 border-4
                                ${showCorrect ? 'bg-green-500 text-white border-green-600 scale-105' : ''}
                                ${showWrong ? 'bg-red-400 text-white border-red-500' : ''}
                                ${!showResult ? 'bg-amber-100 border-amber-300 hover:bg-amber-200 text-green-800' : ''}
                                ${showResult && !isSelected && !isCorrect ? 'bg-gray-200 border-gray-300 text-gray-500' : ''}`}
                        >
                            {showCorrect && '🌟 '}
                            {choice}
                            {showWrong && ' ❌'}
                        </button>
                    );
                })}
            </div>

            {showResult && (
                <div className="mt-8 text-center">
                    <button 
                        onClick={onNextQuestion} 
                        className="px-10 py-4 bg-green-600 text-white rounded-full text-2xl font-bold hover:bg-green-700 transition-all transform hover:scale-110 shadow-lg flex items-center gap-3 mx-auto"
                    >
                        Next Question <RotateCcw />
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuestionCard;