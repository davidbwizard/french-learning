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
import AnimalFooter from './components/UI/AnimalFooter';

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

	const {
		currentQuestion,
		choices,
		selectedAnswer,
		showResult,
		questionText,
		correctAnswer,
		generateQuestion,
		selectAnswer
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
        generateQuestion(category);
    };

	const getProgressData = (category) => {
		const stats = getCurrentStats();
		return getProgressDataForCategoryUtil(category, WORDS_BY_CATEGORY, stats);
	};

    const startPracticeMode = (category, words) => {
        setPracticeMode({ category, words });
        setShowProgress(false);
        generateQuestion(category, words);
    };

    const exitPracticeMode = () => {
        setPracticeMode(null);
        generateQuestion(selectedCategory);
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

    if (!currentQuestion) return null;
    // const currentProfile = profiles[currentProfileId];

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-green-100 p-8">
            <div className="max-w-3xl mx-auto">
				<QuizHeader
					currentProfile={currentProfile}
					profiles={profiles}
					currentProfileId={currentProfileId}
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
				<QuestionCard
					questionText={questionText}
					currentQuestion={currentQuestion}
					getCurrentStats={getCurrentStats}
					choices={choices}
					selectedAnswer={selectedAnswer}
					correctAnswer={correctAnswer}
					showResult={showResult}
					onAnswer={handleAnswer}
					onNextQuestion={() => generateQuestion(
						practiceMode ? practiceMode.category : selectedCategory, 
						practiceMode ? practiceMode.words : null
					)}
				/>

                <AnimalFooter />
            </div>
        </div>
    );
};

export default FrenchQuiz;