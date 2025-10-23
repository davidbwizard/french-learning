import React from 'react';
import { Home } from '../UI/Icons';
import { CATEGORY_CONFIG } from '../../data/words';

const PracticeModeBanner = ({ practiceMode, onExit }) => {
    if (!practiceMode) return null;

    const config = CATEGORY_CONFIG[practiceMode.category];
	const Icon = config.icon;
    return (
        <div className="mb-6 bg-orange-100 border-4 border-orange-400 rounded-2xl p-4 flex justify-between items-center">
            <div>
                <h2 className="text-xl font-bold text-orange-900">
                    Practicing <Icon size={32} className="inline-block" weight="duotone" /> {config.label} Mistakes
                </h2>
                <p className="text-orange-700">{practiceMode.words.length} words to practice</p>
            </div>
            <button onClick={onExit} className="px-6 py-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-all transform hover:scale-105 font-bold flex items-center gap-2">
                <Home /> Exit Practice
            </button>
        </div>
    );
};

export default PracticeModeBanner;