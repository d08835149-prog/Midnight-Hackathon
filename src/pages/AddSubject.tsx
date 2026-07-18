import { useEffect, useState } from "react";
import type { Subject } from "../types/Subject";
import { supabase } from "../lib/supabase";

function AddSubject() {

  const [subjects, setSubjects] = useState<Subject[]>([]);


  async function loadSubjects() {
    const { data, error } = await supabase
      .from("subjects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setSubjects(data);
  }

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


  async function loadSettings() {
  const { data, error } = await supabase
    .from("study_settings")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error(error);
    return;
  }

  setSavedSettings(data);
}

  async function resetSubjects() {

  const confirmReset = window.confirm(
    "ARE YOU SURE DELETE EVERY DATA?"
  );

  if (!confirmReset) {
    return;
  }


  // Delete subjects
  const { error: subjectError } = await supabase
    .from("subjects")
    .delete()
    .neq("id", 0);


  if (subjectError) {
    console.error(subjectError);
    return;
  }


  // Delete study settings
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

  console.log("All data reset");
}

  useEffect(() => {
    loadSubjects();
    loadSettings();
  }, []);


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

const [savedSettings, setSavedSettings] = useState<any>(null);

async function addSubject() {
  const { data, error } = await supabase
    .from("subjects")
    .insert({
    name: subject.name,
    difficulty: subject.difficulty,
    exam_date: subject.examDate || null,
    confidence: subject.confidence,
    goal: subject.goal,
  })
    .select();

  console.log("data:", data);
  console.log(JSON.stringify(error, null, 2));

  if (error) {
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
}


async function saveSettings() {

  const { data: existing } = await supabase
    .from("study_settings")
    .select("id")
    .limit(1)
    .single();


  if (existing) {

    const { error } = await supabase
      .from("study_settings")
      .update({
        daily_minutes: settings.dailyMinutes,
        max_session_minutes: settings.maxSessionMinutes,
        break_minutes: settings.breakMinutes,
        main_goal: settings.mainGoal,
      })
      .eq("id", existing.id);


    if (error) {
      console.error(error);
      return;
    }

  } else {

    const { error } = await supabase
      .from("study_settings")
      .insert({
        daily_minutes: settings.dailyMinutes,
        max_session_minutes: settings.maxSessionMinutes,
        break_minutes: settings.breakMinutes,
        main_goal: settings.mainGoal,
      });


    if (error) {
      console.error(error);
      return;
    }
  }


  await loadSettings();


  
  console.log("Settings saved");
}

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <label>Subject Name</label>
      <h1 className="text-3xl font-bold mb-6">
        Add Subject
      </h1>
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
    | "Easy" | "Medium" | "Hard" | "Very Hard",
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
      confidence: Number(e.target.value) as 1 | 2 | 3 | 4 | 5,
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
  <option value="Understand">Understand Concepts</option>
  <option value="Exam">Prepare for Exam</option>
  <option value="Improve">Improve Grades</option>
  <option value="Review">Review</option>
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


<label>Daily Study Time (minutes)</label>

<input
  className="border rounded-lg p-2 w-full mb-4"
  type="number"
  value={settings.dailyMinutes}
  onChange={(e) =>
    setSettings({
      ...settings,
      dailyMinutes: Number(e.target.value),
    })
  }
/>


<label>Maximum Focus Session (minutes)</label>

<input
  className="border rounded-lg p-2 w-full mb-4"
  type="number"
  value={settings.maxSessionMinutes}
  onChange={(e) =>
    setSettings({
      ...settings,
      maxSessionMinutes: Number(e.target.value),
    })
  }
/>


<label>Break Time (minutes)</label>

<input
  className="border rounded-lg p-2 w-full mb-4"
  type="number"
  value={settings.breakMinutes}
  onChange={(e) =>
    setSettings({
      ...settings,
      breakMinutes: Number(e.target.value),
    })
  }
/>


<label>Main Goal</label>

<select
  className="border rounded-lg p-2 w-full mb-4"
  value={settings.mainGoal}
  onChange={(e) =>
    setSettings({
      ...settings,
      mainGoal: e.target.value,
    })
  }
>
  <option value="Improve Grades">
    Improve Grades
  </option>

  <option value="Exam Preparation">
    Exam Preparation
  </option>

  <option value="Build Study Habit">
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

      <h2>My Subjects</h2>
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

    <p>
      Difficulty: {item.difficulty}
    </p>

    <p>
      Confidence: {item.confidence}/5
    </p>

    <p>
      Goal: {item.goal}
    </p>
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