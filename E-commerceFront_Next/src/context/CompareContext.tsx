'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CompareItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  slug: string;
  vendor: string;
  rating?: number;
  specs?: Record<string, string>;
}

interface CompareContextType {
  compareItems: CompareItem[];
  addToCompare: (item: CompareItem) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isInCompare: (id: string) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [compareItems, setCompareItems] = useState<CompareItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('gonzales-compare');
    if (saved) {
      try {
        setCompareItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load comparison items', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('gonzales-compare', JSON.stringify(compareItems));
  }, [compareItems]);

  const addToCompare = (item: CompareItem) => {
    setCompareItems(prev => {
      if (prev.find(i => i.id === item.id)) return prev;
      if (prev.length >= 4) {
        alert("Máximo 4 productos para comparar.");
        return prev;
      }
      // On mobile, ask user if they want to add more comparisons
      if (typeof window !== 'undefined' && window.innerWidth < 640 && prev.length > 0) {
        const ok = confirm('¿Quieres comparar más productos?');
        if (!ok) return prev;
      }
      return [...prev, item];
    });
  };

  const removeFromCompare = (id: string) => {
    setCompareItems(prev => prev.filter(i => i.id !== id));
  };

  const clearCompare = () => setCompareItems([]);

  const isInCompare = (id: string) => compareItems.some(item => item.id === id);

  return (
    <CompareContext.Provider value={{ compareItems, addToCompare, removeFromCompare, clearCompare, isInCompare }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};
