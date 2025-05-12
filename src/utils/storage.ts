import { Blockchain } from '../types/blockchain';

// Local storage key
const STORAGE_KEY = 'blockchain_data';

// Save blockchain to local storage
export const saveBlockchain = (blockchain: Blockchain): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blockchain));
  } catch (error) {
    console.error('Error saving blockchain to local storage:', error);
  }
};

// Load blockchain from local storage
export const loadBlockchain = (): Blockchain | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading blockchain from local storage:', error);
    return null;
  }
};

// Clear blockchain from local storage
export const clearBlockchain = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing blockchain from local storage:', error);
  }
};