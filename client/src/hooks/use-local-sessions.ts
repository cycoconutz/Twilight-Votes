import { useState, useEffect } from "react";
import type { Session, Player } from "@shared/schema";
import { nanoid } from "nanoid";

const STORAGE_KEY = "twilight_voting_sessions";

export function useSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSessions(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse sessions", e);
      }
    }
  }, []);

  const saveSessions = (newSessions: Session[]) => {
    setSessions(newSessions);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSessions));
  };

  const createSession = (name: string) => {
    const newSession: Session = {
      id: nanoid(),
      name,
      createdAt: Date.now(),
      players: [
        { id: 1, name: "Player 1", faction: "", totalVotes: 0, agenda1Votes: 0, agenda2Votes: 0 },
        { id: 2, name: "Player 2", faction: "", totalVotes: 0, agenda1Votes: 0, agenda2Votes: 0 },
      ],
    };
    saveSessions([...sessions, newSession]);
    return newSession;
  };

  const deleteSession = (id: string) => {
    saveSessions(sessions.filter((s) => s.id !== id));
  };

  const updateSession = (id: string, updates: Partial<Session>) => {
    saveSessions(
      sessions.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  return { sessions, createSession, deleteSession, updateSession };
}
