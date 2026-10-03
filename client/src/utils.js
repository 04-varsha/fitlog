// Must match the enum in server/models/Exercise.js
export const TYPES = ["Running", "Walking", "Cycling", "Gym", "Yoga", "Swimming"];

// Local date -> "YYYY-MM-DD" (avoids the UTC shift you get from toISOString)
export function toDateStr(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
const DAY_MS = 24 * 60 * 60 * 1000;

const parseDay = (s) => new Date(`${s}T00:00:00Z`);

// dateStrings: array of "YYYY-MM-DD"
// Duplicate dates are allowed
export function calcStreaks(dateStrings) {
  const unique = [...new Set(dateStrings)].sort();

  if (unique.length === 0) {
    return { current: 0, best: 0 };
  }

  // Best streak: longest run of consecutive days
  let best = 1;
  let run = 1;

  for (let i = 1; i < unique.length; i++) {
    const diffDays =
      (parseDay(unique[i]) - parseDay(unique[i - 1])) / DAY_MS;

    run = diffDays === 1 ? run + 1 : 1;
    best = Math.max(best, run);
  }

  // Current streak: count backwards from today
  // If there is no workout today, start from yesterday
  const logged = new Set(unique);
  const cursor = new Date();

  if (!logged.has(toDateStr(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }

  let current = 0;

  while (logged.has(toDateStr(cursor))) {
    current++;
    cursor.setDate(cursor.getDate() - 1);
  }

  return { current, best };
}