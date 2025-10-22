import React from 'react';
import { CATEGORY_CONFIG, WORDS_BY_CATEGORY } from '../../data/words';
import { calculatePercentComplete } from '../../utils/statsCalculator';
import { ChartBar, CaretCircleLeft } from '@phosphor-icons/react';

const ProgressReport = ({ 
    getProgressData, 
    getCurrentStats, 
    onClose, 
    onStartPracticeMode 
}) => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-green-100 p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-green-800"><ChartBar size={52} className="inline-block" weight="duotone" /> Progress Report</h1>
                    <button onClick={onClose} className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all transform hover:scale-105 font-bold">
                        <CaretCircleLeft size={32} className="inline-block" weight="duotone" /> Back to Quiz
                    </button>
                </div>
                {Object.keys(WORDS_BY_CATEGORY).map(categoryKey => {
                    const config = CATEGORY_CONFIG[categoryKey];
                    const { notAttempted, allCorrect, hasIncorrect, total } = getProgressData(categoryKey);
                    const percentComplete = calculatePercentComplete(allCorrect, total);
                    const stats = getCurrentStats();
					const Icon = config.icon;
                    
                    return (
                        <div key={categoryKey} className="mb-8 bg-white rounded-3xl shadow-xl p-6 border-4 border-amber-200">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-3xl font-bold text-green-800"><Icon size={32} className="inline-block" weight="duotone" /> {config.label}</h2>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-green-700">{percentComplete}%</div>
                                    <div className="text-sm text-gray-600">{allCorrect.length}/{total} mastered</div>
                                </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-6 mb-6">
                                <div className="bg-green-500 h-6 rounded-full transition-all duration-500" style={{ width: `${percentComplete}%` }} />
                            </div>
                            <div className="space-y-4">
                                <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
                                    <h3 className="text-lg font-bold text-blue-800 mb-2">Not Tried Yet ({notAttempted.length})</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {notAttempted.length > 0 ? notAttempted.map(w => (
                                            <span key={w.id} className="px-2 py-1 bg-blue-200 rounded-full text-xs font-semibold">{w.french}</span>
                                        )) : <span className="text-blue-600 text-sm">All words attempted! 🎉</span>}
                                    </div>
                                </div>
                                <div className="bg-green-50 p-4 rounded-xl border-2 border-green-200">
                                    <h3 className="text-lg font-bold text-green-800 mb-2">All Correct! 🌟 ({allCorrect.length})</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {allCorrect.length > 0 ? allCorrect.map(w => (
                                            <span key={w.id} className="px-2 py-1 bg-green-200 rounded-full text-xs font-semibold">{w.french} ({stats[w.id].correct}/{stats[w.id].attempts})</span>
                                        )) : <span className="text-green-600 text-sm">Keep practicing! 💪</span>}
                                    </div>
                                </div>
                                <div className="bg-orange-50 p-4 rounded-xl border-2 border-orange-200">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-lg font-bold text-orange-800">Need Practice 💪 ({hasIncorrect.length})</h3>
                                        {hasIncorrect.length > 0 && (
                                            <button onClick={() => onStartPracticeMode(categoryKey, hasIncorrect)} className="px-4 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-all transform hover:scale-105 font-bold text-sm">
                                                Practice These Words
                                            </button>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {hasIncorrect.length > 0 ? hasIncorrect.map(w => (
                                            <span key={w.id} className="px-2 py-1 bg-orange-200 rounded-full text-xs font-semibold">{w.french} ({stats[w.id].correct}/{stats[w.id].attempts})</span>
                                        )) : <span className="text-orange-600 text-sm">No mistakes yet! ✨</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProgressReport;