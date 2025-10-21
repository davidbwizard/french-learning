import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
;
import { faVolumeHigh, faVolumeMute, faRectangleList, faClipboardCheck, faPlus, faPencil, faChartBar, faUsers } from '@fortawesome/free-solid-svg-icons';

const QuizHeader = ({ 
    currentProfile, 
    profiles, 
    currentProfileId,
    currentMode,
    onModeChange,
    onSwitchProfile,
    onAddNewProfile,
    soundEnabled, 
    onToggleSound, 
    onShowProgress 
}) => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showManageProfiles, setShowManageProfiles] = useState(false);

    const getInitials = (name) => {
        if (!name) return 'NA';
        return name.substring(0, 2).toUpperCase();
    };

    const handleManageProfilesClick = () => {
        setShowManageProfiles(!showManageProfiles);
        setShowProfileDropdown(false);
    };

    const handleModeClick = (mode) => {

		// if mode is equal to current mode, do nothing
		if (mode === currentMode) {
			return;
		}

        onModeChange(mode);
        setShowMobileMenu(false);
    };

    return (
        <nav className="relative bg-green-600 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10 shadow-lg">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    {/* Mobile menu button */}
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button 
                            type="button" 
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            className="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500"
                            aria-expanded={showMobileMenu}
                        >
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open main menu</span>
                            {showMobileMenu ? (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
                                    <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
                                    <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Logo and nav links */}
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            <img 
                                src="/images/logo.png" 
                                alt="BrainBox" 
                                className="h-8 w-auto" 
                            />
                            <span className="ml-2 text-white font-bold">BrainBox</span>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <button 
                                    onClick={() => handleModeClick('quiz')}
                                    className={`rounded-md px-3 py-2 text-sm font-medium ${
                                        currentMode === 'quiz' 
                                            ? 'bg-gray-950/50 text-white' 
                                            : 'text-white hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    <FontAwesomeIcon icon={faClipboardCheck} className="size-4" /> Quiz
                                </button>
                                <button 
                                    onClick={() => handleModeClick('flashcard')}
                                    className={`rounded-md px-3 py-2 text-sm font-medium ${
                                        currentMode === 'flashcard' 
                                            ? 'bg-gray-950/50 text-white' 
                                            : 'text-white hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    <FontAwesomeIcon icon={faRectangleList} className="size-4" /> Flash Card
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right side buttons */}
                    <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/* Sound toggle button */}
                        <button 
                            type="button" 
                            onClick={onToggleSound}
                            className="relative rounded-full p-1 text-white hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
                        >
                            <span className="absolute -inset-1.5"></span>
                            <span className="sr-only">Toggle sound</span>
                            {soundEnabled ? <FontAwesomeIcon icon={faVolumeHigh} className="size-6"/> : <FontAwesomeIcon icon={faVolumeMute} className="size-6" />}
                        </button>

                        {/* Profile dropdown */}
                        <div className="relative">
                            <button 
                                onClick={() => {
                                    setShowProfileDropdown(!showProfileDropdown);
                                    setShowManageProfiles(false);
                                }}
                                className="relative flex size-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
                            >
                                <span className="absolute -inset-1.5"></span>
                                <span className="sr-only">Open user menu</span>
                                {getInitials(currentProfile?.name)}
                            </button>

                            {/* Profile dropdown menu */}
                            {showProfileDropdown && (
                                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                                    <button
                                        onClick={onShowProgress}
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                                    >
                                        <FontAwesomeIcon icon={faChartBar} className="size-4" /> Progress
                                    </button>
                                    <button
                                        onClick={handleManageProfilesClick}
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                                    >
                                        <FontAwesomeIcon icon={faUsers} className="size-4" /> Manage Profiles
                                    </button>
                                </div>
                            )}

                            {/* Manage Profiles submenu */}
                            {showManageProfiles && (
                                <div className="absolute right-0 z-20 mt-2 w-64 origin-top-right rounded-2xl bg-white shadow-2xl border-4 border-purple-200">
                                    <div className="p-2">
                                        {Object.values(profiles).map(profile => (
                                            <button 
                                                key={profile.id} 
                                                onClick={() => {
                                                    onSwitchProfile(profile.id);
                                                    setShowManageProfiles(false);
                                                    setShowProfileDropdown(false);
                                                }}
                                                className={`w-full text-left px-4 py-3 rounded-xl hover:bg-purple-100 transition-all font-semibold ${
                                                    profile.id === currentProfileId ? 'bg-purple-200' : ''
                                                }`}
                                            >
                                                {profile.name} {profile.id === currentProfileId && '✓'}
                                            </button>
                                        ))}
                                        {Object.keys(profiles).length < 3 ? (
    <button 
        onClick={() => {
            onAddNewProfile();
            setShowManageProfiles(false);
            setShowProfileDropdown(false);
        }}
        className="w-full text-left px-4 py-3 rounded-xl hover:bg-green-100 transition-all font-semibold text-green-700 border-t-2 border-gray-200 mt-2"
    >
        <FontAwesomeIcon icon={faPlus} className="size-4 mr-2" />
        <span>Add</span>
    </button>
) : (
    <button 
        onClick={() => {
            onAddNewProfile(); // This should probably call a different function
            setShowManageProfiles(false);
            setShowProfileDropdown(false);
        }}
        className="w-full text-left px-4 py-3 rounded-xl hover:bg-red-100 transition-all font-semibold text-red-700 border-t-2 border-gray-200 mt-2"
    >
        <FontAwesomeIcon icon={faPencil} className="size-4 mr-2" />
        <span>Remove</span>
    </button>
)}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {showMobileMenu && (
                <div className="sm:hidden">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        <button 
                            onClick={() => handleModeClick('quiz')}
                            className={`block w-full text-left rounded-md px-3 py-2 text-base font-medium ${
                                currentMode === 'quiz'
                                    ? 'bg-gray-950/50 text-white'
                                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            📝 Quiz
                        </button>
                        <button 
                            onClick={() => handleModeClick('flashcard')}
                            className={`block w-full text-left rounded-md px-3 py-2 text-base font-medium ${
                                currentMode === 'flashcard'
                                    ? 'bg-gray-950/50 text-white'
                                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            🗂️ Index
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default QuizHeader;