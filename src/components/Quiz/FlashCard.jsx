import React, { useState } from 'react';

const FlashCard = ({ 
    questionText, 
    answerText, 
    currentQuestion,
    onNextCard 
}) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNext = () => {
        setIsFlipped(false);
        onNextCard();
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="perspective-1000">
                <div 
                    className={`relative w-full h-96 transition-transform duration-500 transform-style-3d cursor-pointer ${
                        isFlipped ? 'rotate-y-180' : ''
                    }`}
                    onClick={handleFlip}
                    style={{
                        transformStyle: 'preserve-3d',
                        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                    }}
                >
                    {/* Front of card */}
                    <div 
                        className="absolute w-full h-full bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center backface-hidden"
                        style={{ backfaceVisibility: 'hidden' }}
                    >
                        <div className="text-6xl font-bold text-gray-800 mb-4">
                            {questionText}
                        </div>
                        <div className="text-gray-400 text-sm mt-8">
                            👆 Tap to reveal answer
                        </div>
                    </div>

                    {/* Back of card */}
                    <div 
                        className="absolute w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center backface-hidden"
                        style={{ 
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)'
                        }}
                    >
                        <div className="text-white text-2xl mb-2 opacity-75">
                            {questionText}
                        </div>
                        <div className="text-6xl font-bold text-white">
                            {answerText}
                        </div>
                        <div className="text-white text-sm mt-8 opacity-75">
                            👆 Tap to flip back
                        </div>
                    </div>
                </div>
            </div>

            {/* Next button - only shows when flipped */}
            {isFlipped && (
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleNext();
                        }}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-lg"
                    >
                        Next Card →
                    </button>
                </div>
            )}
        </div>
    );
};

export default FlashCard;