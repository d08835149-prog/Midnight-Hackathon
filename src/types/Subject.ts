export interface Subject {
  id: number;

  // Subject name
  name: string;

  // How difficult the subject feels
  difficulty: "Easy" | "Medium" | "Hard" | "Very Hard";

  // Exam date
  examDate: string;

  // User confidence level (1~5)
  confidence: 1 | 2 | 3 | 4 | 5;

  // What the user wants to achieve
  goal:
    | "Understand"
    | "Exam"
    | "Improve"
    | "Review";
}