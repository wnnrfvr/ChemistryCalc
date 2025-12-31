import AsyncStorage from '@react-native-async-storage/async-storage';

const XP_PER_LEVEL = 500;
const STORAGE_KEY = '@chemistry_calc_gamification';

// Predefined Daily Tasks
const DAILY_TASKS_POOL = [
    { id: 'solve_5_stoich', description: 'Solve 5 Stoichiometry Problems', target: 5, xp: 100, type: 'SOLVE', category: 'Stoichiometry' },
    { id: 'balance_3_eq', description: 'Balance 3 Chemical Equations', target: 3, xp: 150, type: 'SOLVE', category: 'EquationBalancer' },
    { id: 'quiz_perfect', description: 'Get a Perfect Score in Quiz', target: 1, xp: 200, type: 'QUIZ', category: 'Quiz' },
    { id: 'read_glossary', description: 'Explore 5 Glossary Terms', target: 5, xp: 50, type: 'READ', category: 'Glossary' },
    { id: 'solve_gas', description: 'Calculate 3 Gas Law Problems', target: 3, xp: 120, type: 'SOLVE', category: 'Gases' },
    { id: 'share_solution', description: 'Share a Solution with a Friend', target: 1, xp: 300, type: 'SHARE', category: 'Any' },
    { id: 'nuclear_decay', description: 'Solve 2 Nuclear Decay Problems', target: 2, xp: 150, type: 'SOLVE', category: 'NuclearChemistry' },
    { id: 'study_elements', description: 'Study 5 Elements in Periodic Table', target: 5, xp: 80, type: 'READ', category: 'PeriodicTable' },
];

class GamificationManagerService {
    constructor() {
        this.state = {
            xp: 0,
            level: 1,
            streak: 0,
            lastLoginDate: null,
            dailyTasks: [],
            lastTaskDate: null,
            completedTaskIds: [], // IDs of tasks completed today
        };
        this.listeners = [];
    }

    // --- Core Persistence ---
    async loadData() {
        try {
            const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
            if (jsonValue != null) {
                this.state = { ...this.state, ...JSON.parse(jsonValue) };
            }
            this.checkDailyReset();
            this.notifyListeners();
        } catch (e) {
            console.error("Failed to load gamification data", e);
        }
    }

    async saveData() {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
            this.notifyListeners();
        } catch (e) {
            console.error("Failed to save gamification data", e);
        }
    }

    // --- Daily Logic ---
    checkDailyReset() {
        const today = new Date().toDateString();

        // Streak Logic
        if (this.state.lastLoginDate !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            if (this.state.lastLoginDate === yesterday.toDateString()) {
                this.state.streak += 1;
            } else if (this.state.lastLoginDate !== today) { // Missed a day (and it's not first install)
                // Only reset if it's strictly not today and not yesterday.
                // But initially lastLoginDate is null.
                if (this.state.lastLoginDate) {
                    this.state.streak = 1; // Reset to 1 (new streak)
                } else {
                    this.state.streak = 1; // First day
                }
            }
            this.state.lastLoginDate = today;
        }

        // Task Logic
        if (this.state.lastTaskDate !== today) {
            this.generateDailyTasks();
            this.state.lastTaskDate = today;
            this.state.completedTaskIds = []; // Reset completions
        }

        this.saveData();
    }

    generateDailyTasks() {
        // Pick 3 random tasks
        const shuffled = [...DAILY_TASKS_POOL].sort(() => 0.5 - Math.random());
        this.state.dailyTasks = shuffled.slice(0, 3).map(task => ({
            ...task,
            progress: 0,
            completed: false
        }));
    }

    // --- Gamification Actions ---
    addXP(amount) {
        this.state.xp += amount;
        const newLevel = Math.floor(this.state.xp / XP_PER_LEVEL) + 1;
        if (newLevel > this.state.level) {
            this.state.level = newLevel;
            // Could trigger "Level Up" modal callback here
        }
        this.saveData();
    }

    // Call this when an action is performed
    // actionType: 'SOLVE', 'QUIZ', 'READ', 'SHARE'
    // category: 'Stoichiometry', etc.
    recordAction(actionType, category) {
        let taskUpdated = false;

        this.state.dailyTasks.forEach(task => {
            if (!task.completed && task.type === actionType) {
                // Check category match if specific, or 'Any'
                if (task.category === 'Any' || task.category === category) {
                    task.progress += 1;
                    if (task.progress >= task.target) {
                        task.progress = task.target;
                        task.completed = true;
                        this.addXP(task.xp); // Reward immediately
                        this.state.completedTaskIds.push(task.id);
                        // Could trigger "Task Complete" toast
                    }
                    taskUpdated = true;
                }
            }
        });

        if (taskUpdated) {
            this.saveData();
        }
    }

    // --- Getters ---
    getState() {
        return this.state;
    }

    // --- Listeners (for React Hooks) ---
    addListener(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(cb => cb !== callback);
        };
    }

    notifyListeners() {
        this.listeners.forEach(cb => cb(this.state));
    }
}

export const GamificationManager = new GamificationManagerService();
