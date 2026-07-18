import { calculateStudyPlan } from "../algorithms/calculateStudyPlan";
import type { Subject } from "../types/Subject";


function Home() {


  const testSubjects: Subject[] = [
    {
      id: 1,
      name: "Physics",
      difficulty: "Hard",
      examDate: "2026-07-20",
      confidence: 2,
      goal: "Exam",
    },

    {
      id: 2,
      name: "Math",
      difficulty: "Medium",
      examDate: "2026-08-10",
      confidence: 4,
      goal: "Review",
    }
  ];


 



  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold">
          🚀 StudySpark
        </h1>

        <p className="mt-4 text-xl">
          Plan your study.
          <br />
          Study smarter, not harder.
        </p>

        <button className="mt-8 px-6 py-3 rounded-lg bg-black text-white">
          Start Planning
        </button>
      </div>
    </div>
  );
}

export default Home;
