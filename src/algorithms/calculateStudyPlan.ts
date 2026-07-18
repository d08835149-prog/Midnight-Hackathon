import type { Subject } from "../types/Subject";
import { calculatePriority } from "./calculatePriority";
import { calculateStudyRatio } from "./calculateStudyRatio";


export function calculateStudyPlan(
  subjects: Subject[],
  dailyMinutes: number
) {

  const totalScore = subjects.reduce(
    (sum, subject) =>
      sum + calculatePriority(subject),
    0
  );


  const plan = subjects.map((subject) => {

    const priority = calculatePriority(subject);


    const percentage =
      priority / totalScore;


    const minutes =
      Math.round(
        percentage * dailyMinutes
      );

    const ratio = calculateStudyRatio(subject);

      const studyMinutes =
        Math.round(minutes * ratio.study / 100);

      const reviewMinutes =
        Math.round(minutes * ratio.review / 100);

      const organizeMinutes =
        Math.round(minutes * ratio.organize / 100);


    return {
      subject: subject.name,

      priority,

      percentage,

      totalMinutes: minutes,

      studyMinutes,

      reviewMinutes,

      organizeMinutes,
    };

  });


  return plan;
}