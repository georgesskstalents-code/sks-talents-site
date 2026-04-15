"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "sks-orientation-v1";

export type OrientationProfile = "student" | "professional";
export type OrientationLead = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  targetSector: string;
};

export function useOrientation() {
  const [profile, setProfile] = useState<OrientationProfile | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<Record<string, "up" | "down">>({});
  const [lead, setLead] = useState<OrientationLead>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    targetSector: "Life Sciences"
  });

  useEffect(() => {
    try {
      const rawValue = window.localStorage.getItem(STORAGE_KEY);
      if (!rawValue) return;

      const parsed = JSON.parse(rawValue) as {
        profile?: OrientationProfile | null;
        answers?: Record<number, string>;
        feedback?: Record<string, "up" | "down">;
        targetSector?: string;
      };

      setProfile(parsed.profile ?? null);
      setAnswers(parsed.answers ?? {});
      setFeedback(parsed.feedback ?? {});
      setLead(
        {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          targetSector: parsed.targetSector ?? "Life Sciences"
        }
      );
    } catch {
      // Ignore malformed local state and start fresh.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
            JSON.stringify({
              profile,
              answers,
              feedback,
              targetSector: lead.targetSector
            })
          );
    } catch {
      // Ignore localStorage failures in private browsing contexts.
    }
  }, [answers, feedback, lead.targetSector, profile]);

  function resetOrientation() {
    setProfile(null);
    setAnswers({});
    setFeedback({});
    setLead({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      targetSector: "Life Sciences"
    });
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore localStorage failures.
    }
  }

  return {
    profile,
    setProfile,
    answers,
    setAnswers,
    feedback,
    setFeedback,
    lead,
    setLead,
    resetOrientation
  };
}
