import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [resume, setResume] = useState({
    name: "Priyanshu Kumar",
    summary: "Experienced web developer with a passion for clean UI.",
    education: ["BCA - XYZ University"],
    experience: ["Intern - Web Dev at ABC Company"],
    skills: ["React", "JavaScript", "FastAPI"]
  });

  const handleChange = (section, value, index = null) => {
    if (Array.isArray(resume[section])) {
      const updated = [...resume[section]];
      updated[index] = value;
      setResume({ ...resume, [section]: updated });
    } else {
      setResume({ ...resume, [section]: value });
    }
  };

  const addItem = (section) => {
    const updated = [...resume[section], ""];
    setResume({ ...resume, [section]: updated });
  };

  const removeItem = (section, index) => {
    const updated = resume[section].filter((_, i) => i !== index);
    setResume({ ...resume, [section]: updated });
  };

  const enhance = async (section) => {
    const content = Array.isArray(resume[section])
      ? resume[section].join(", ")
      : resume[section];

    const res = await axios.post("http://127.0.0.1:8000/ai-enhance", {
      section,
      content,
    });

    const enhanced = res.data.enhanced_content;
    if (Array.isArray(resume[section])) {
      setResume({ ...resume, [section]: [enhanced] });
    } else {
      setResume({ ...resume, [section]: enhanced });
    }
  };

  const saveResume = async () => {
    await axios.post("http://127.0.0.1:8000/save-resume", resume);
    alert("✅ Resume saved successfully!");
  };

  const download = () => {
    const blob = new Blob([JSON.stringify(resume, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "resume.json";
    link.click();
  };

  return (
    <div className="App">
      <h1>📝 Resume Editor</h1>

      {/* NAME */}
      <label>Name:</label>
      <input
        value={resume.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <button onClick={() => enhance("name")}>Enhance with AI</button>

      {/* SUMMARY */}
      <label>Summary:</label>
      <textarea
        value={resume.summary}
        onChange={(e) => handleChange("summary", e.target.value)}
      />
      <button onClick={() => enhance("summary")}>Enhance with AI</button>

      {/* EDUCATION */}
      <h3>Education</h3>
      {resume.education.map((item, i) => (
        <div key={i}>
          <input
            value={item}
            onChange={(e) => handleChange("education", e.target.value, i)}
          />
          <button onClick={() => removeItem("education", i)}>❌</button>
        </div>
      ))}
      <button onClick={() => addItem("education")}>➕ Add</button>
      <button onClick={() => enhance("education")}>Enhance with AI</button>

      {/* EXPERIENCE */}
      <h3>Experience</h3>
      {resume.experience.map((item, i) => (
        <div key={i}>
          <input
            value={item}
            onChange={(e) => handleChange("experience", e.target.value, i)}
          />
          <button onClick={() => removeItem("experience", i)}>❌</button>
        </div>
      ))}
      <button onClick={() => addItem("experience")}>➕ Add</button>
      <button onClick={() => enhance("experience")}>Enhance with AI</button>

      {/* SKILLS */}
      <h3>Skills</h3>
      {resume.skills.map((item, i) => (
        <div key={i}>
          <input
            value={item}
            onChange={(e) => handleChange("skills", e.target.value, i)}
          />
          <button onClick={() => removeItem("skills", i)}>❌</button>
        </div>
      ))}
      <button onClick={() => addItem("skills")}>➕ Add</button>
      <button onClick={() => enhance("skills")}>Enhance with AI</button>

      {/* ACTIONS */}
      <br />
      <button onClick={saveResume}>💾 Save to Backend</button>
      <button onClick={download}>⬇️ Download JSON</button>
    </div>
  );
}

export default App;
