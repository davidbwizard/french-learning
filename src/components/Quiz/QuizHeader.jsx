import React from 'react';
import { Volume2, BarChart3, User, ChevronDown } from '../UI/Icons';

const QuizHeader = ({ 
    currentProfile, 
    profiles, 
    currentProfileId,
    showProfileDropdown, 
    setShowProfileDropdown,
    onSwitchProfile,
    onAddNewProfile,
    soundEnabled, 
    onToggleSound, 
    onShowProgress 
}) => {
    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-green-800 flex items-center gap-3">🦊 French Quiz</h1>
            <div className="flex gap-3 items-center">
                {/* Profile Dropdown */}
                <div className="relative">
                    <button onClick={() => setShowProfileDropdown(!showProfileDropdown)} className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all font-bold flex items-center gap-2">
                        <User /> {currentProfile?.name} <ChevronDown />
                    </button>
                    {showProfileDropdown && (
                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border-4 border-purple-200 z-50">
                            <div className="p-2">
                                {Object.values(profiles).map(profile => (
                                    <button key={profile.id} onClick={() => onSwitchProfile(profile.id)} className={`w-full text-left px-4 py-3 rounded-xl hover:bg-purple-100 transition-all font-semibold ${profile.id === currentProfileId ? 'bg-purple-200' : ''}`}>
                                        {profile.name} {profile.id === currentProfileId && '✓'}
                                    </button>
                                ))}
                                {Object.keys(profiles).length < 3 && (
                                    <button onClick={onAddNewProfile} className="w-full text-left px-4 py-3 rounded-xl hover:bg-green-100 transition-all font-semibold text-green-700 border-t-2 border-gray-200 mt-2">
                                        ➕ Add New Profile
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <button onClick={onToggleSound} className={`p-3 rounded-full ${soundEnabled ? 'bg-green-600' : 'bg-gray-400'} text-white hover:scale-110 transition-transform`} title={soundEnabled ? 'Sound On' : 'Sound Off'}>
                    <Volume2 />
                </button>
                <button onClick={onShowProgress} className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 font-bold flex items-center gap-2">
                    <BarChart3 /> Progress
                </button>
            </div>
        </div>
    );
};

export default QuizHeader;