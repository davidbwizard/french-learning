import React from 'react';
import { CATEGORY_CONFIG } from '../../data/words';

const CategoryTabs = ({ selectedCategory, onSelectCategory, practiceMode, wordsByCategory }) => {
    if (practiceMode) return null;

    const getCategoryColors = (categoryKey, isSelected) => {
        const colorMap = {
            'grade1': {
                active: 'bg-gradient-to-br from-grade1-400 to-grade1-600 text-white border-grade1-700 shadow-xl',
                inactive: 'bg-white text-grade1-700 border-grade1-300 hover:bg-gradient-to-br hover:from-grade1-50 hover:to-grade1-100 hover:border-grade1-400'
            },
            'grade2': {
                active: 'bg-gradient-to-br from-grade2-400 to-grade2-600 text-white border-grade2-700 shadow-xl',
                inactive: 'bg-white text-grade2-700 border-grade2-300 hover:bg-gradient-to-br hover:from-grade2-50 hover:to-grade2-100 hover:border-grade2-400'
            },
            'grade3': {
                active: 'bg-gradient-to-br from-grade3-400 to-grade3-600 text-white border-grade3-700 shadow-xl',
                inactive: 'bg-white text-grade3-700 border-grade3-300 hover:bg-gradient-to-br hover:from-grade3-50 hover:to-grade3-100 hover:border-grade3-400'
            }
        };

        return colorMap[categoryKey]?.[isSelected ? 'active' : 'inactive'] || colorMap.grade1.inactive;
    };

    const getIconBgColor = (categoryKey, isSelected) => {
        if (isSelected) return 'bg-white/20 group-hover:bg-white/30';
        
        const bgMap = {
            'grade1': 'bg-grade1-100 group-hover:bg-grade1-200',
            'grade2': 'bg-grade2-100 group-hover:bg-grade2-200',
            'grade3': 'bg-grade3-100 group-hover:bg-grade3-200'
        };
        
        return bgMap[categoryKey] || bgMap.grade1;
    };

    // const selectedConfig = CATEGORY_CONFIG[selectedCategory];

    return (
        <div className="mx-auto px-4 mb-6 w-full">
            {/* Desktop: Show all categories vertically stacked */}
            <div className="hidden sm:grid grid-cols-1 gap-3 w-full">
                {Object.keys(wordsByCategory).map(categoryKey => {
                    const config = CATEGORY_CONFIG[categoryKey];
                    const Icon = config.icon;
                    const isSelected = selectedCategory === categoryKey;
                    
                    return (
                        <button 
                            key={categoryKey} 
                            onClick={() => onSelectCategory(categoryKey)} 
                            className={`group relative overflow-hidden rounded-2xl py-4 px-4 border-4 font-bold transition-all transform hover:scale-105 ${
                                isSelected ? 'hover:-rotate-1' : ''
                            } ${getCategoryColors(categoryKey, isSelected)}`}
                        >
                            <div className="flex items-center justify-center gap-3">
                                <div className={`p-2 rounded-xl backdrop-blur-sm transition-all ${getIconBgColor(categoryKey, isSelected)}`}>
                                    <Icon size={32} weight="duotone" />
                                </div>
                                <span className="text-xl">{config.label}</span>
                            </div>
                            
                            {/* Active Indicator */}
                            {isSelected && (
                                <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full shadow-lg animate-pulse"></div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Mobile: Horizontal scrolling compact tabs */}
            <div className="sm:hidden overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                <div className="flex gap-3 min-w-min">
                    {Object.keys(wordsByCategory).map(categoryKey => {
                        const config = CATEGORY_CONFIG[categoryKey];
                        const Icon = config.icon;
                        const isSelected = selectedCategory === categoryKey;
                        
                        return (
                            <button 
                                key={categoryKey} 
                                onClick={() => onSelectCategory(categoryKey)} 
                                className={`group relative flex-shrink-0 rounded-2xl py-3 px-5 border-3 font-bold transition-all transform active:scale-95 ${
                                    getCategoryColors(categoryKey, isSelected)
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <div className={`p-2 rounded-xl backdrop-blur-sm transition-all ${getIconBgColor(categoryKey, isSelected)}`}>
                                        <Icon size={24} weight="duotone" />
                                    </div>
                                    <span className="text-base whitespace-nowrap">{config.label}</span>
                                </div>
                                
                                {/* Active Indicator */}
                                {isSelected && (
                                    <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-white rounded-full shadow-lg"></div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CategoryTabs;