import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TrailHistoryContext = createContext();

export const TrailHistoryProvider = ({ children }) => {
    const [trailHistory, setTrailHistory] = useState([]);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        try {
            const history = await AsyncStorage.getItem('trailHistory');
            if (history !== null) {
                setTrailHistory(JSON.parse(history));
            }
        } catch (error) {
            console.error('Error loading trail history:', error);
        }
    };

    const addToHistory = async trail => {
        try {
            if (!trailHistory.some(item => item.id === trail.id)) {
                const newHistory = [...trailHistory, trail];
                setTrailHistory(newHistory);
                await AsyncStorage.setItem('trailHistory', JSON.stringify(newHistory));
            }
        } catch (error) {
            console.error('Error saving trail history:', error);
        }
    };

    const clearHistory = () => {
        setTrailHistory([]);
        AsyncStorage.removeItem('trailHistory');
    };

    return (
        <TrailHistoryContext.Provider value={{ trailHistory, addToHistory, clearHistory }}>
            {children}
        </TrailHistoryContext.Provider>
    );
};
