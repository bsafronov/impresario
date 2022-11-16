export interface IPrefs {
  name: string,
  difficulty: IPrefsDifficulty,
}

type IPrefsDifficulty = "easy" | "medium" | "hard";