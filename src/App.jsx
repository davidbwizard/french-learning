import { loadAllWords, WORDS_BY_CATEGORY } from './data/words';
import React, { useState, useEffect } from 'react';
import { playSound } from './utils/sounds';
import { checkAnswer } from './utils/questionGenerator';
import { getProgressDataForCategory as getProgressDataForCategoryUtil, updateWordStats as updateWordStatsUtil } from './utils/statsCalculator';

// Components
import ProfileSelectionScreen from './components/Profile/ProfileSelectionScreen';
import ProgressReport from './components/Progress/ProgressReport';
import QuizHeader from './components/Quiz/QuizHeader';
import PracticeModeBanner from './components/Quiz/PracticeModeBanner';
import CategoryTabs from './components/Quiz/CategoryTabs';
import QuestionCard from './components/Quiz/QuestionCard';
import FlashCard from './components/Quiz/FlashCard';
import AnimalFooter from './components/UI/AnimalFooter';
import CongratsModal from './components/Quiz/CongratsModal';

// Hooks
import { useProfiles } from './hooks/useProfiles';
import { useQuizState } from './hooks/useQuizState';

const FrenchQuiz = () => {
	const [wordsLoaded, setWordsLoaded] = useState(false);
	const firstCategory = Object.keys(WORDS_BY_CATEGORY)[0] || 'grade1';
	const [selectedCategory, setSelectedCategory] = useState(firstCategory);
	const [practiceMode, setPracticeMode] = useState(null);
	const [showProgress, setShowProgress] = useState(false);
	const [showProfileDropdown, setShowProfileDropdown] = useState(false);
	const [soundEnabled, setSoundEnabled] = useState(true);
	const [currentMode, setCurrentMode] = useState('quiz'); // 'quiz' or 'flashcard'
    console.log('🔍 Render state:', { 
        wordsLoaded, 
        firstCategory, 
        selectedCategory,
        hasWords: Object.keys(WORDS_BY_CATEGORY).length 
    });


	    // Load words on mount
		useEffect(() => {
			const initializeWords = async () => {
				await loadAllWords();
				setWordsLoaded(true);
			};
			initializeWords();
		}, []);

	const {
		currentQuestion,
		choices,
		selectedAnswer,
		showResult,
		questionText,
		correctAnswer,
		sessionComplete,
		generateQuestion,
		selectAnswer,
		nextQuestion,
		resetSession,
		resetAndRestart
	} = useQuizState(selectedCategory, practiceMode, WORDS_BY_CATEGORY);

	const {
		profiles,
		currentProfileId,
		currentProfile,
		getCurrentStats,
		updateCurrentStats,
		createProfile,
		deleteProfile,
		switchProfile,
		setCurrentProfileId
	} = useProfiles();

	const handleAnswer = (answer) => {
		const isCorrect = checkAnswer(answer, correctAnswer);
		selectAnswer(answer);
		
		const wordId = currentQuestion.id;
		const currentStats = getCurrentStats();
		const category = practiceMode ? practiceMode.category : selectedCategory;
		const newStats = updateWordStatsUtil(currentStats, wordId, isCorrect, category);
		updateCurrentStats(newStats);
		playSound(isCorrect ? 'correct' : 'wrong', soundEnabled);
	};

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        resetAndRestart(category);
    };
    
    const handleModeChange = (mode) => {
        setCurrentMode(mode);
        resetAndRestart(selectedCategory, practiceMode ? practiceMode.words : null);
    };

	const getProgressData = (category) => {
		const stats = getCurrentStats();
		return getProgressDataForCategoryUtil(category, WORDS_BY_CATEGORY, stats);
	};

    const startPracticeMode = (category, words) => {
        setPracticeMode({ category, words });
        setShowProgress(false);
        resetAndRestart(category, words);
    };

    const exitPracticeMode = () => {
        setPracticeMode(null);
        resetAndRestart(selectedCategory);
    };

    const handleTryAgain = () => {
        const category = practiceMode ? practiceMode.category : selectedCategory;
        const wordPool = practiceMode ? practiceMode.words : null;
        resetAndRestart(category, wordPool);
    };
    
    const handleCloseModal = () => {
        resetSession();
    };

    const handlePracticeHardWords = () => {
        const progressData = getProgressData(selectedCategory);
        if (progressData.hasIncorrect.length > 0) {
            startPracticeMode(selectedCategory, progressData.hasIncorrect);
        }
    };

    useEffect(() => {
		console.log('🎯 Profile effect:', { currentProfileId, wordsLoaded });
        if (currentProfileId && wordsLoaded) {
			generateQuestion();
			console.log('🎲 Calling generateQuestion()');
		}
    }, [currentProfileId, wordsLoaded]);

	    // Add loading screen BEFORE profile selection
		if (!wordsLoaded) {
			console.log('⏳ Showing loading screen');
			return (
				<div className="min-h-screen bg-gradient-to-b from-amber-50 to-green-100 flex items-center justify-center">
					<div className="text-center">
						<div className="text-4xl mb-4">🌱</div>
						<div className="text-xl font-semibold text-green-800">Loading words...</div>
					</div>
				</div>
			);
		}

    // Profile selection screen
    if (!currentProfileId) {
		console.log('👤 Showing profile selection screen');
		return (
			<ProfileSelectionScreen
				profiles={profiles}
				onSelectProfile={switchProfile}
				onCreateProfile={createProfile}
				onDeleteProfile={deleteProfile}
				wordsByCategory={WORDS_BY_CATEGORY}
			/>
		);
	}

    // Progress screen
	if (showProgress) {
		return (
			<ProgressReport
				getProgressData={getProgressData}
				getCurrentStats={getCurrentStats}
				onClose={() => setShowProgress(false)}
				onStartPracticeMode={startPracticeMode}
				wordsByCategory={WORDS_BY_CATEGORY}
			/>
		);
	}

    if (!currentQuestion && !sessionComplete) return null;

    const progressData = getProgressData(practiceMode ? practiceMode.category : selectedCategory);
    const hasHardWords = progressData.hasIncorrect.length > 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            <div className="mx-auto">
				<QuizHeader
					currentProfile={currentProfile}
					profiles={profiles}
					currentProfileId={currentProfileId}
					currentMode={currentMode}
					onModeChange={handleModeChange}
					showProfileDropdown={showProfileDropdown}
					setShowProfileDropdown={setShowProfileDropdown}
					onSwitchProfile={switchProfile}
					onAddNewProfile={() => { setCurrentProfileId(null); setShowProfileDropdown(false); }}
					soundEnabled={soundEnabled}
					onToggleSound={() => setSoundEnabled(!soundEnabled)}
					onShowProgress={() => setShowProgress(true)}
				/>

				<PracticeModeBanner 
					practiceMode={practiceMode} 
					onExit={exitPracticeMode} 
				/>
				
				<div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-[minmax(150px,350px)_minmax(450px,1fr)] gap-3">
					<CategoryTabs
						selectedCategory={selectedCategory}
						onSelectCategory={handleCategoryChange}
						practiceMode={practiceMode}
						wordsByCategory={WORDS_BY_CATEGORY}
					/>

					<div className="px-4">
						{currentQuestion && currentMode === 'quiz' && (
							<QuestionCard
								questionText={questionText}
								currentQuestion={currentQuestion}
								getCurrentStats={getCurrentStats}
								choices={choices}
								selectedAnswer={selectedAnswer}
								correctAnswer={correctAnswer}
								showResult={showResult}
								onAnswer={handleAnswer}
								onNextQuestion={() => nextQuestion(
									practiceMode ? practiceMode.category : selectedCategory, 
									practiceMode ? practiceMode.words : null
								)}
							/>
						)}

						{currentQuestion && currentMode === 'flashcard' && (
							<FlashCard
								questionText={questionText}
								answerText={correctAnswer}
								currentQuestion={currentQuestion}
								onNextCard={() => nextQuestion(
									practiceMode ? practiceMode.category : selectedCategory, 
									practiceMode ? practiceMode.words : null
								)}
							/>
						)}

						<CongratsModal
							isOpen={sessionComplete}
							onClose={handleCloseModal}
							onPracticeHardWords={handlePracticeHardWords}
							onTryAgain={handleTryAgain}
							hasHardWords={hasHardWords}
							isPracticeMode={!!practiceMode}
						/>
					</div>

				</div>

				

                {/* <AnimalFooter /> */}
            </div>
        </div>
    );
};

export default FrenchQuiz;