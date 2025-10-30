import React from 'react';
import { CATEGORY_CONFIG } from '../../data/words';
import { calculatePercentComplete, getProgressDataForCategory } from '../../utils/statsCalculator';
import { ChartBar, CaretCircleLeft, Trophy, Fire, Target } from '@phosphor-icons/react';

// Theme styles matching CategoryTabs
const THEME_STYLES = {
    grade1: {
        bg: 'from-grade1-50 to-grade1-100',
        border: 'border-grade1-300',
        text: 'text-grade1-700',
        progress: 'bg-grade1-500',
    },
    grade2: {
        bg: 'from-grade2-50 to-grade2-100',
        border: 'border-grade2-300',
        text: 'text-grade2-700',
        progress: 'bg-grade2-500',
    },
    grade3: {
        bg: 'from-grade3-50 to-grade3-100',
        border: 'border-grade3-300',
        text: 'text-grade3-700',
        progress: 'bg-grade3-500',
    }
};

const ProgressReport = ({ 
    getCurrentStats, 
    onClose, 
    onStartPracticeMode, 
    wordsByCategory
}) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 sm:p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-grade1-700 flex items-center gap-3">
                        <ChartBar size={48} weight="duotone" className="text-grade2-600" /> 
                        <span>Progress Report</span>
                    </h1>
                    <button 
                        onClick={onClose} 
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-grade1-500 to-grade1-600 hover:from-grade1-600 hover:to-grade1-700 text-white rounded-2xl transition-all transform hover:scale-105 font-bold shadow-lg"
                    >
                        <CaretCircleLeft size={28} weight="duotone" /> 
                        <span>Back to Quiz</span>
                    </button>
                </div>

                {/* Category Progress Cards */}
                {Object.keys(wordsByCategory).map(categoryKey => {
                    const config = CATEGORY_CONFIG[categoryKey];
                    const theme = config.theme || categoryKey;
                    const themeStyles = THEME_STYLES[theme] || THEME_STYLES.grade1;
                    const stats = getCurrentStats();
                    // Get progress for THIS specific category
                    const { notAttempted, allCorrect, hasIncorrect, total } = getProgressDataForCategory(categoryKey, wordsByCategory, stats);
                    const percentComplete = calculatePercentComplete(allCorrect, total);
                    const Icon = config.icon;
                    
                    return (
                        <div 
                            key={categoryKey} 
                            className={`mb-6 bg-gradient-to-br ${themeStyles.bg} rounded-3xl shadow-2xl p-6 border-4 ${themeStyles.border}`}
                        >
                            {/* Category Header */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                <h2 className={`text-2xl sm:text-3xl font-bold ${themeStyles.text} flex items-center gap-3`}>
                                    <div className="p-2 bg-white/60 rounded-xl">
                                        <Icon size={36} weight="duotone" />
                                    </div>
                                    <span>{config.label}</span>
                                </h2>
                                <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg">
                                    <div className="text-3xl font-bold text-grade1-700">{percentComplete}%</div>
                                    <div className="text-sm font-semibold text-gray-600">
                                        {allCorrect.length}/{total} mastered
                                    </div>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-white/50 rounded-full h-8 mb-6 shadow-inner overflow-hidden">
                                <div 
                                    className={`${themeStyles.progress} h-8 rounded-full transition-all duration-500 flex items-center justify-end pr-3 shadow-lg`}
                                    style={{ width: `${percentComplete}%` }}
                                >
                                    {percentComplete > 15 && (
                                        <span className="text-white font-bold text-sm">
                                            {percentComplete}%
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Stats Sections */}
                            <div className="space-y-4">
                                {/* Not Attempted */}
                                <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border-3 border-grade2-200 shadow-lg">
                                    <h3 className="text-lg sm:text-xl font-bold text-grade2-700 mb-3 flex items-center gap-2">
                                        <Target size={24} weight="duotone" />
                                        <span>Not Tried Yet ({notAttempted.length})</span>
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {notAttempted.length > 0 ? (
                                            notAttempted.map(w => (
                                                <span 
                                                    key={w.id} 
                                                    className="px-3 py-2 bg-grade2-100 hover:bg-grade2-200 rounded-xl text-sm font-bold text-grade2-700 transition-all transform hover:scale-105 shadow"
                                                >
                                                    {w.french}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-grade2-600 text-base font-semibold">
                                                All words attempted! 🎉
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* All Correct */}
                                <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border-3 border-success-200 shadow-lg">
                                    <h3 className="text-lg sm:text-xl font-bold text-success-700 mb-3 flex items-center gap-2">
                                        <Trophy size={24} weight="duotone" />
                                        <span>Mastered! 🌟 ({allCorrect.length})</span>
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {allCorrect.length > 0 ? (
                                            allCorrect.map(w => (
                                                <span 
                                                    key={w.id} 
                                                    className="px-3 py-2 bg-success-100 hover:bg-success-200 rounded-xl text-sm font-bold text-success-700 transition-all transform hover:scale-105 shadow"
                                                >
                                                    {w.french} ({stats[w.id].correct}/{stats[w.id].attempts})
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-success-600 text-base font-semibold">
                                                Keep practicing! 💪
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Need Practice */}
                                <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border-3 border-celebration-300 shadow-lg">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3">
                                        <h3 className="text-lg sm:text-xl font-bold text-celebration-700 flex items-center gap-2">
                                            <Fire size={24} weight="duotone" />
                                            <span>Need Practice 💪 ({hasIncorrect.length})</span>
                                        </h3>
                                        {hasIncorrect.length > 0 && (
                                            <button 
                                                onClick={() => onStartPracticeMode(categoryKey, hasIncorrect)} 
                                                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-celebration-500 to-celebration-600 hover:from-celebration-600 hover:to-celebration-700 text-white rounded-xl transition-all transform hover:scale-105 font-bold text-sm shadow-lg whitespace-nowrap"
                                            >
                                                <Fire size={20} weight="duotone" />
                                                <span>Practice These</span>
                                            </button>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {hasIncorrect.length > 0 ? (
                                            hasIncorrect.map(w => (
                                                <span 
                                                    key={w.id} 
                                                    className="px-3 py-2 bg-celebration-100 hover:bg-celebration-200 rounded-xl text-sm font-bold text-celebration-700 transition-all transform hover:scale-105 shadow"
                                                >
                                                    {w.french} ({stats[w.id].correct}/{stats[w.id].attempts})
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-celebration-600 text-base font-semibold">
                                                No mistakes yet! ✨
                                            </span>
                                        )}
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