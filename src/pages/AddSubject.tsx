import { useEffect, useState } from "react";
import type { Subject } from "../types/Subject";
import { supabase } from "../lib/supabase";
import { calculateStudyPlan } from "../algorithms/calculateStudyPlan";

function AddSubject() {

  


  
  // -----------------------------
  // States
  // -----------------------------

  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [studyPlan, setStudyPlan] = useState<any[]>([]);

  const [savedSettings, setSavedSettings] = useState<any>(null);

  const [subject, setSubject] = useState<Subject>({
    id: 1,
    name: "",
    difficulty: "Medium",
    examDate: "",
    confidence: 3,
    goal: "Review",
  });

  const [settings, setSettings] = useState({
    dailyMinutes: 120,
    maxSessionMinutes: 50,
    breakMinutes: 10,
    mainGoal: "Improve Grades",
  });

  // -----------------------------
  // Load Subjects
  // -----------------------------

  async function loadSubjects() {
    const { data, error } = await supabase
      .from("subjects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setSubjects(data as Subject[]);
  }

  // -----------------------------
  // Load Settings
  // -----------------------------

  async function loadSettings() {
    const { data, error } = await supabase
      .from("study_settings")
      .select("*")
      .limit(1)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setSavedSettings(data);

    setSettings({
      dailyMinutes: data.daily_minutes,
      maxSessionMinutes: data.max_session_minutes,
      breakMinutes: data.break_minutes,
      mainGoal: data.main_goal,
    });
  }

  // -----------------------------
  // Add Subject
  // -----------------------------

  async function addSubject() {

        if (!subject.name.trim()) {
      alert("Please enter a subject name");
      return;
    }




    const { error } = await supabase.from("subjects").insert({
      name: subject.name,
      difficulty: subject.difficulty,
      exam_date: subject.examDate || null,
      confidence: subject.confidence,
      goal: subject.goal,
    });

    if (error) {
      console.error(error);
      return;
    }

    setSubject({
      id: 1,
      name: "",
      difficulty: "Medium",
      examDate: "",
      confidence: 3,
      goal: "Review",
    });

    loadSubjects();
  }

  // -----------------------------
  // Delete Subject
  // -----------------------------

  async function deleteSubject(id: number) {
    const { error } = await supabase
      .from("subjects")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    loadSubjects();
  }

  // -----------------------------
  // Save Settings
  // -----------------------------

  async function saveSettings() {
    const { data: existing } = await supabase
      .from("study_settings")
      .select("id")
      .limit(1)
      .single();

    if (existing) {
      await supabase
        .from("study_settings")
        .update({
          daily_minutes: settings.dailyMinutes,
          max_session_minutes: settings.maxSessionMinutes,
          break_minutes: settings.breakMinutes,
          main_goal: settings.mainGoal,
        })
        .eq("id", existing.id);
    } else {
      await supabase.from("study_settings").insert({
        daily_minutes: settings.dailyMinutes,
        max_session_minutes: settings.maxSessionMinutes,
        break_minutes: settings.breakMinutes,
        main_goal: settings.mainGoal,
      });
    }

    await loadSettings();

    setSavedSettings({
    daily_minutes: settings.dailyMinutes,
    max_session_minutes: settings.maxSessionMinutes,
    break_minutes: settings.breakMinutes,
    main_goal: settings.mainGoal,
    });
  }

  // -----------------------------
  // Reset All Data
  // -----------------------------

  async function resetSubjects() {
    const confirmReset = window.confirm(
      "ARE YOU SURE DELETE EVERY DATA?"
    );

    if (!confirmReset) return;

    const { error: subjectError } = await supabase
      .from("subjects")
      .delete()
      .neq("id", 0);

    if (subjectError) {
      console.error(subjectError);
      return;
    }

    const { error: settingsError } = await supabase
      .from("study_settings")
      .delete()
      .neq("id", 0);

    if (settingsError) {
      console.error(settingsError);
      return;
    }

    setSavedSettings(null);

    loadSubjects();
  }

  // -----------------------------
  // Generate Study Plan
  // -----------------------------

  function generateStudyPlan() {
    const result = calculateStudyPlan(
      subjects,
      settings.dailyMinutes
    );

    setStudyPlan(result);
  }

  // -----------------------------
  // Initial Load
  // -----------------------------

  useEffect(() => {
    loadSubjects();
    loadSettings();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-4xl font-bold mb-2">
        🚀 StudySpark
      </h1>

      <p className="text-gray-600 mb-6">
        Smart Study Planner
      </p>

      <h1 className="text-3xl font-bold mb-6">
        Add Subject
      </h1>

      <label>Subject Name</label>

      <input
        className="border rounded-lg p-2 w-full mb-4"
        placeholder="Subject Name"
        value={subject.name}
        onChange={(e) =>
          setSubject({
            ...subject,
            name: e.target.value,
          })
        }
      />

      <label>Difficulty</label>

      <select
        className="border rounded-lg p-2 w-full mb-4"
        value={subject.difficulty}
        onChange={(e) =>
          setSubject({
            ...subject,
            difficulty: e.target.value as
              | "Easy"
              | "Medium"
              | "Hard"
              | "Very Hard",
          })
        }
      >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
        <option value="Very Hard">Very Hard</option>
      </select>

      <label>Confidence Level</label>

      <select
        className="border rounded-lg p-2 w-full mb-4"
        value={subject.confidence}
        onChange={(e) =>
          setSubject({
            ...subject,
            confidence: Number(
              e.target.value
            ) as 1 | 2 | 3 | 4 | 5,
          })
        }
      >
        <option value={1}>1 - Very Low</option>
        <option value={2}>2 - Low</option>
        <option value={3}>3 - Medium</option>
        <option value={4}>4 - High</option>
        <option value={5}>5 - Very High</option>
      </select>

      <label>Exam Date</label>

      <input
        className="border rounded-lg p-2 w-full mb-4"
        type="date"
        value={subject.examDate}
        onChange={(e) =>
          setSubject({
            ...subject,
            examDate: e.target.value,
          })
        }
      />

      <label>Goal</label>

      <select
        className="border rounded-lg p-2 w-full mb-4"
        value={subject.goal}
        onChange={(e) =>
          setSubject({
            ...subject,
            goal: e.target.value as
              | "Understand"
              | "Exam"
              | "Improve"
              | "Review",
          })
        }
      >
        <option value="Understand">
          Understand Concepts
        </option>

        <option value="Exam">
          Prepare for Exam
        </option>

        <option value="Improve">
          Improve Grades
        </option>

        <option value="Review">
          Review
        </option>
      </select>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700"
        onClick={addSubject}
      >
        Add Subject
      </button>

      <h2 className="text-2xl font-bold mt-8 mb-4">
        Study Settings
      </h2>
      
      <label className="block mb-1 font-medium">
        Daily Study Time (minutes)
      </label>

      <input
        className="border rounded-lg p-2 w-full mb-3"
        type="number"
        placeholder="Daily Study Time"
        value={settings.dailyMinutes}
        onChange={(e) =>
          setSettings({
            ...settings,
            dailyMinutes: Number(e.target.value),
          })
        }
      />

    <label className="block mb-1 font-medium">
      Maximum Focus Session (minutes)
    </label>

    <input
      className="border rounded-lg p-2 w-full mb-3"
      type="number"
      placeholder="Maximum Focus Session"
      value={settings.maxSessionMinutes}
      onChange={(e) =>
        setSettings({
          ...settings,
          maxSessionMinutes: Number(e.target.value),
        })
      }
    />

    

    <label className="block mb-1 font-medium">
      Break Time (minutes)
    </label>

    <input
      className="border rounded-lg p-2 w-full mb-3"
      type="number"
      placeholder="Break Minutes"
      value={settings.breakMinutes}
      onChange={(e) =>
        setSettings({
          ...settings,
          breakMinutes: Number(e.target.value),
        })
      }
    />

    <label className="block mb-1 font-medium">
      Main Goal
    </label>

    <select
      className="border rounded-lg p-2 w-full mb-4"
      value={settings.mainGoal}
      onChange={(e)=>
        setSettings({
          ...settings,
           mainGoal:e.target.value
        })
      }
    >
    <option>
      Improve Grades
    </option>

    <option>
     Exam Preparation
    </option>

    <option>
      Understand Concepts
    </option>

    <option>
      Build Study Habit
    </option>

  </select>

            <button
        className="bg-green-600 text-white px-4 py-2 rounded-lg w-full"
        onClick={saveSettings}
      >
        Save Settings
      </button>

      <h2 className="text-2xl font-bold mt-8 mb-4">
        Current Study Settings
      </h2>

      {savedSettings && (
        <div className="border rounded-xl p-4 mb-6 shadow-sm">
          <p>
            Daily Study Time: {savedSettings.daily_minutes} minutes
          </p>

          <p>
            Maximum Focus Session: {savedSettings.max_session_minutes} minutes
          </p>

          <p>
            Break Time: {savedSettings.break_minutes} minutes
          </p>

          <p>
            Goal: {savedSettings.main_goal}
          </p>
        </div>
      )}

      <button
        className="bg-purple-600 text-white px-4 py-2 rounded-lg w-full mb-6"
        onClick={generateStudyPlan}
      >
        Generate Study Plan
      </button>

{studyPlan.length > 0 && (
  <>
    <h2 className="text-2xl font-bold mb-4">
      Today's Study Plan
    </h2>

    {studyPlan.map((plan, index) => (
      <div
        key={index}
        className="border rounded-xl p-4 mb-3 shadow-sm"
      >
        <h3 className="font-bold text-xl">
          {plan.subject}
        </h3>
        
        <p>
         🔥 Priority Score: {Math.round(plan.priority)}
        </p>
        
        <p>
          Total Time: {plan.totalMinutes} minutes
        </p>

        <p>
          📖 Study: {plan.studyMinutes} minutes
        </p>

        <p>
          🔄 Review: {plan.reviewMinutes} minutes
        </p>

        <p>
          📝 Organize: {plan.organizeMinutes} minutes
        </p>

      </div>
    ))}
  </>
)}

      <h2 className="text-2xl font-bold mt-8 mb-4">
        My Subjects
      </h2>

      <button
        className="bg-red-700 text-white px-4 py-2 rounded-lg mb-4"
        onClick={resetSubjects}
      >
        Reset All Data
      </button>

      {subjects.map((item) => (
        <div
          key={item.id}
          className="border rounded-xl p-4 mb-3 shadow-sm"
        >
          <h3 className="text-xl font-bold">
            {item.name}
          </h3>

          <p>Difficulty: {item.difficulty}</p>

          <p>Confidence: {item.confidence}/5</p>

          <p>Goal: {item.goal}</p>

          {item.examDate && (
            <p>Exam Date: {item.examDate}</p>
          )}

          <button
            className="mt-3 bg-red-500 text-white px-3 py-1 rounded-lg"
            onClick={() => deleteSubject(item.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default AddSubject;
