interface User {
  name: string,
  email: string,
  id: number,
  journalEntries?: Array<JournalEntry>,
  moodEntries?: Array<MoodEntry>,
  energyEntries?: Array<EnergyEntry>
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
