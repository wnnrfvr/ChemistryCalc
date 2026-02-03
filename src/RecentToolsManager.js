import AsyncStorage from '@react-native-async-storage/async-storage';

const RECENTS_KEY = '@chemistry_calc_recent_tools';
const MAX_RECENTS = 4;

class RecentToolsManagerService {
    constructor() {
        this.recentTools = [];
        this.listeners = [];
    }

    // Load from storage
    async loadRecents() {
        try {
            const jsonValue = await AsyncStorage.getItem(RECENTS_KEY);
            if (jsonValue != null) {
                this.recentTools = JSON.parse(jsonValue);
            }
            this.notifyListeners();
            return this.recentTools;
        } catch (e) {
            console.error("Failed to load recent tools", e);
            return [];
        }
    }

    // Add a tool to the list (deduplicated, max 4)
    async addToRecents(toolId) {
        if (!toolId) return;

        // Remove if exists (to move to top)
        const filtered = this.recentTools.filter(id => id !== toolId);

        // Add to front
        filtered.unshift(toolId);

        // Trim
        this.recentTools = filtered.slice(0, MAX_RECENTS);

        this.notifyListeners(); // Update UI immediately
        await this.saveRecents();
    }

    async saveRecents() {
        try {
            await AsyncStorage.setItem(RECENTS_KEY, JSON.stringify(this.recentTools));
        } catch (e) {
            console.error("Failed to save recent tools", e);
        }
    }

    getRecents() {
        return this.recentTools;
    }

    // Integration with React Hooks
    addListener(callback) {
        this.listeners.push(callback);
        // Call immediately with current state
        callback(this.recentTools);
        return () => {
            this.listeners = this.listeners.filter(cb => cb !== callback);
        };
    }

    notifyListeners() {
        this.listeners.forEach(cb => cb(this.recentTools));
    }
}

export const RecentToolsManager = new RecentToolsManagerService();
