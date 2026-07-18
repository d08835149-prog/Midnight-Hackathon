import { calculatePriority } from "../algorithms/calculatePriority";
import type { Subject } from "../types/Subject";


const physics: Subject = {
  id: 1,
  name: "Physics",
  difficulty: "Hard",
  examDate: "2026-07-20",
  confidence: 2,
  goal: "Exam",
};


const math: Subject = {
  id: 2,
  name: "Math",
  difficulty: "Medium",
  examDate: "2026-08-10",
  confidence: 5,
  goal: "Review",
};


console.log(
  "Physics:",
  calculatePriority(physics)
);


console.log(
  "Math:",
  calculatePriority(math)
);