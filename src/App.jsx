import React, { useState, useEffect } from 'react';
import { WORDS_BY_CATEGORY } from './data/words';
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
	const firstCategory = Object.keys(WORDS_BY_CATEGORY)[0];
	const [selectedCategory, setSelectedCategory] = useState(firstCategory);
	const [practiceMode, setPracticeMode] = useState(null);
	const [showProgress, setShowProgress] = useState(false);
	const [showProfileDropdown, setShowProfileDropdown] = useState(false);
	const [soundEnabled, setSoundEnabled] = useState(true);
	const [currentMode, setCurrentMode] = useState('quiz'); // 'quiz' or 'flashcard'

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
	} = useQuizState(selectedCategory, practiceMode);

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
        if (currentProfileId) generateQuestion();
    }, [currentProfileId]);

    // Profile selection screen
    if (!currentProfileId) {
		return (
			<ProfileSelectionScreen
				profiles={profiles}
				onSelectProfile={switchProfile}
				onCreateProfile={createProfile}
				onDeleteProfile={deleteProfile}
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
			/>
		);
	}

    if (!currentQuestion && !sessionComplete) return null;

    const progressData = getProgressData(practiceMode ? practiceMode.category : selectedCategory);
    const hasHardWords = progressData.hasIncorrect.length > 0;

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-green-100">
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

				<CategoryTabs
					selectedCategory={selectedCategory}
					onSelectCategory={handleCategoryChange}
					practiceMode={practiceMode}
				/>

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

                <AnimalFooter />
            </div>
        </div>
    );
};

export default FrenchQuiz;