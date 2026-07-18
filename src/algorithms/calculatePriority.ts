import type { Subject } from "../types/Subject";

function calculateExamUrgency(subject: Subject) {
  if (!subject.examDate) {
    return 0;
  }

  const today = new Date();
  const examDate = new Date(subject.examDate);

  const difference =
    Math.ceil(
      (examDate.getTime() - today.getTime())
      / (1000 * 60 * 60 * 24)
    );


  if (difference >= 14) {
    return 10;
  }

  if (difference >= 7) {
    return 20;
  }

  if (difference >= 2) {
    return 30;
  }

  if (difference === 1) {
    return 40;
  }

  return 40;
}

function calculateDifficultyScore(subject: Subject) {

  switch(subject.difficulty) {

    case "Easy":
      return 10;

    case "Medium":
      return 20;

    case "Hard":
      return 30;

    case "Very Hard":
      return 35;

    default:
      return 0;
  }

}


function calculateConfidenceScore(subject: Subject) {

 switch(subject.confidence){

  case 1:
    return 30;

  case 2:
    return 25;

  case 3:
    return 20;

  case 4:
    return 15;

  case 5:
    return 10;

 }

}


function calculateGoalScore(subject: Subject) {

  switch(subject.goal) {

    case "Exam":
      return 30;

    case "Improve":
      return 20;

    case "Understand":
      return 15;

    case "Review":
      return 10;

    default:
      return 0;
  }

}


export function calculatePriority(subject: Subject) {

  let score = 0;

  // 시험 긴급도 (최우선)
  score += calculateExamUrgency(subject) * 2;

  // 난이도
  score += calculateDifficultyScore(subject);

  // 자신감
  score += calculateConfidenceScore(subject);

  // 목표
  score += calculateGoalScore(subject) * 0.5;


  return score;
}