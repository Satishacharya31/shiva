import React from 'react';

export type Language = 'en' | 'hi' | 'ne';

export interface Temple {
  id: string;
  name: string;
  name_hi?: string;
  name_ne?: string;
  location: string;
  location_hi?: string;
  location_ne?: string;
  description: string;
  description_hi?: string;
  description_ne?: string;
  imageUrl: string;
  coordinates: { x: number; y: number }; // Percentage on map relative to a container
  jyotirlinga: boolean;
}

export interface ScriptureChapter {
  id: string;
  title: string;
  title_hi?: string;
  title_ne?: string;
  source: 'Shiva Purana' | 'Vedas' | 'Upanishads';
  content: string; // Simplified for demo
  content_hi?: string;
  content_ne?: string;
}

export interface Mantra {
  id: string;
  name: string;
  name_hi: string;
  name_ne: string;
  sanskrit: string;
  meaning: string;
  meaning_hi: string;
  meaning_ne: string;
  audioDuration: string; 
  audioUrl?: string; // URL for real chanting audio
}

export enum Page {
  HOME = 'HOME',
  SCRIPTURES = 'SCRIPTURES',
  VIRTUAL_TEMPLE = 'VIRTUAL_TEMPLE',
  MANTRA = 'MANTRA',
  EXPLORER = 'EXPLORER',
}

export interface UserStats {
  prayersOffered: number;
  mantrasChanted: number;
  streakDays: number;
}