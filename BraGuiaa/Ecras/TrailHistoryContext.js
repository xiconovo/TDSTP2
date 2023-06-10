// TrailHistoryContext.js
import React, { createContext, useState } from 'react';

export const TrailHistoryContext = createContext();

export const TrailHistoryProvider = ({ children }) => {
    const [trailHistory, setTrailHistory] = useState([]);

    const addToHistory = trail => {
        setTrailHistory(prevHistory => [...prevHistory, trail]);
    };

    return (
        <TrailHistoryContext.Provider value={{ trailHistory, addToHistory }}>
            {children}
        </TrailHistoryContext.Provider>
    );
};
