interface User {
  name: string,
  email: string,
  journalEntries: Array<JournalEntry>,
  moodEntries: Array<MoodEntry>,
  energyEntries: Array<EnergyEntry>
}

interface JournalEntry {
  yesterdayReflection: string,
  plansAndIntentions: string,
  whatINeedToday: string,
  gratefulList: string,
  date: Date
}

interface MoodEntry {
  value: number,
  date: Date
}

interface EnergyEntry {
  value: number,
  date: Date
}
