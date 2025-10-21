import React from 'react';
import { CATEGORY_CONFIG, WORDS_BY_CATEGORY } from '../../data/words';

const CategoryTabs = ({ selectedCategory, onSelectCategory, practiceMode }) => {
    if (practiceMode) return null;

    return (
        <div className="max-w-3xl mx-auto flex gap-3 mb-6 mt-8">
            {Object.keys(WORDS_BY_CATEGORY).map(categoryKey => {
                const config = CATEGORY_CONFIG[categoryKey];
                return (
                    <button 
                        key={categoryKey} 
                        onClick={() => onSelectCategory(categoryKey)} 
                        className={`flex-1 py-4 rounded-2xl text-xl font-bold transition-all transform hover:scale-105 border-4 ${selectedCategory === categoryKey ? 'bg-green-600 text-white border-green-700 shadow-lg' : 'bg-white text-green-800 border-green-300 hover:bg-green-50'}`}
                    >
                        {config.icon} {config.label}
                    </button>
                );
            })}
        </div>
    );
};

export default CategoryTabs;