/**
 * Central fictional fixtures for the AyuOS demo preview.
 * Keep this file small — screen builders own their fixtures locally.
 * All data here is fictional; there is no backend.
 */

export interface DemoSubject {
  id: string;
  name: string;
}

export interface DemoUser {
  name: string;
}

export const DEMO_SUBJECTS: DemoSubject[] = [
  { id: "me", name: "My Health" },
  { id: "mummy", name: "Mummy's Health" },
  { id: "daddy", name: "Daddy's Health" },
];

export const DEMO_USER: DemoUser = {
  name: "Eishaan Shah (demo)",
};
