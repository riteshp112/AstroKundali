import type { KundaliData } from '../App';

const STORAGE_KEY = 'astrokundali_data';

export interface StorageData {
  kundalis: KundaliData[];
  recentKundalis: KundaliData[];
  userPreferences: {
    chartStyle: 'north' | 'south' | 'east';
    theme: 'light' | 'dark';
  };
}

const getDefaultData = (): StorageData => ({
  kundalis: [],
  recentKundalis: [],
  userPreferences: {
    chartStyle: 'north',
    theme: 'light',
  },
});

export const loadFromStorage = (): StorageData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...getDefaultData(), ...JSON.parse(stored) };
    }
  } catch (error) {
    console.error('Failed to load from storage:', error);
  }
  return getDefaultData();
};

export const saveToStorage = (data: Partial<StorageData>): void => {
  try {
    const existing = loadFromStorage();
    const updated = { ...existing, ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save to storage:', error);
  }
};

export const saveKundali = (kundali: KundaliData): void => {
  const data = loadFromStorage();
  
  // Add to kundalis if not exists
  const exists = data.kundalis.some(k => k.id === kundali.id);
  if (!exists) {
    data.kundalis.push(kundali);
  }
  
  // Update recent kundalis (keep last 5)
  data.recentKundalis = data.recentKundalis.filter(k => k.id !== kundali.id);
  data.recentKundalis.unshift(kundali);
  data.recentKundalis = data.recentKundalis.slice(0, 5);
  
  saveToStorage(data);
};

export const getKundaliById = (id: string): KundaliData | null => {
  const data = loadFromStorage();
  return data.kundalis.find(k => k.id === id) || 
         data.recentKundalis.find(k => k.id === id) || 
         null;
};

export const deleteKundali = (id: string): void => {
  const data = loadFromStorage();
  data.kundalis = data.kundalis.filter(k => k.id !== id);
  data.recentKundalis = data.recentKundalis.filter(k => k.id !== id);
  saveToStorage(data);
};

export const getAllKundalis = (): KundaliData[] => {
  const data = loadFromStorage();
  return data.kundalis;
};

export const getRecentKundalis = (): KundaliData[] => {
  const data = loadFromStorage();
  return data.recentKundalis;
};

export const saveUserPreferences = (preferences: Partial<StorageData['userPreferences']>): void => {
  const data = loadFromStorage();
  data.userPreferences = { ...data.userPreferences, ...preferences };
  saveToStorage(data);
};

export const getUserPreferences = (): StorageData['userPreferences'] => {
  const data = loadFromStorage();
  return data.userPreferences;
};
