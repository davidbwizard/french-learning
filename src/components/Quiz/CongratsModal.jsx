import React from 'react';
import Modal from '../UI/Modal';

const CongratsModal = ({ 
    isOpen, 
    onClose, 
    onPracticeHardWords, 
    onTryAgain, 
    hasHardWords,
    isPracticeMode 
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} showCloseButton={false}>
            <div className="text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {isPracticeMode ? 'Practice Complete!' : 'Amazing Work!'}
                </h2>
                <p className="text-gray-600 mb-6">
                    {isPracticeMode 
                        ? "You've practiced all your challenging words!"
                        : "You've seen all the words in this category!"}
                </p>
                
                <div className="space-y-3">
                    {hasHardWords && !isPracticeMode && (
                        <button
                            onClick={onPracticeHardWords}
                            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                        >
                            Practice Hard Words
                        </button>
                    )}
                    
                    <button
                        onClick={onTryAgain}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                    >
                        Try Again
                    </button>
                    
                    <button
                        onClick={onClose}
                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-xl transition-colors"
                    >
                        Back to Quiz
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default CongratsModal;