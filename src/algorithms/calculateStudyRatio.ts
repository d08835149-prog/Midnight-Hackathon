import type { Subject } from "../types/Subject";


export function calculateStudyRatio(subject: Subject) {

  if (!subject.examDate) {
    return {
      study: 60,
      review: 20,
      organize: 20,
    };
  }


  const today = new Date();
  const examDate = new Date(subject.examDate);


  const daysLeft = Math.ceil(
    (examDate.getTime() - today.getTime())
    /
    (1000 * 60 * 60 * 24)
  );


  // Exam is approaching
  if (daysLeft <= 2) {

    return {
      study: 40,
      review: 50,
      organize: 10,
    };

  }


  // 3-7 days before exam
  if (daysLeft <= 7) {

    return {
      study: 50,
      review: 35,
      organize: 15,
    };

  }


  // 8-14 days before exam
  if (daysLeft <= 14) {

    return {
      study: 60,
      review: 25,
      organize: 15,
    };

  }


  // Long-term preparation
  return {
    study: 70,
    review: 15,
    organize: 15,
  };

}
