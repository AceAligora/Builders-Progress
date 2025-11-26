import React, { useState, useEffect } from "react";
import {
  Check,
  Lock,
  BookOpen,
  AlertCircle,
  BarChart3,
  ChevronRight,
  GraduationCap,
} from "lucide-react";

// --- DATA: Full Civil Engineering Curriculum ---
const CURRICULUM_DATA = [
  {
    year: "First Year",
    schoolYear: "2023 - 2024",
    terms: [
      {
        termName: "Term 1",
        courses: [
          { id: "COE0001", title: "Engineering Mathematics 1", units: 3, prereqs: [] },
          { id: "COE0003", title: "Engineering Mathematics 2", units: 3, prereqs: [] },
          { id: "COE0005", title: "Chemistry for Engineers 1", units: 3, prereqs: [] },
          { id: "GED0001", title: "Specialized English Program 1", units: 3, prereqs: [] },
          { id: "GED0004", title: "Physical Education 1", units: 3, prereqs: [] },
          { id: "GED0006", title: "Personal and Professional Effectiveness", units: 2, prereqs: [] },
          { id: "GED0007", title: "Art Appreciation", units: 3, prereqs: [] },
          { id: "NSTP1", title: "Civic Welfare Training Service 1", units: 0, prereqs: [] }
        ]
      },
      {
        termName: "Term 2",
        courses: [
          { id: "COE0007", title: "Calculus 1", units: 3, prereqs: ["COE0001", "COE0003"] },
          { id: "COE0009", title: "Physics for Engineers 1 (LEC)", units: 2, prereqs: ["COE0001", "COE0003"] },
          { id: "COE0009L", title: "Physics for Engineers 1 (Lab)", units: 1, prereqs: [] },
          { id: "GED0015", title: "Physical Education 2", units: 3, prereqs: ["GED0004"] },
          { id: "GED0019", title: "Understanding the Self", units: 3, prereqs: [] },
          { id: "GED0021", title: "Specialized English Program 2", units: 3, prereqs: ["GED0001"] },
          { id: "GED0027", title: "Mathematics in the Modern World", units: 3, prereqs: [] }
        ]
      },
      {
        termName: "Term 3",
        courses: [
          { id: "COE0011", title: "Engineering Data Analysis", units: 3, prereqs: ["COE0007"] },
          { id: "COE0013", title: "Calculus 2", units: 3, prereqs: ["COE0007"] },
          { id: "COE0015", title: "Physics for Engineers 2 (LEC)", units: 2, prereqs: ["COE0009", "COE0007"] },
          { id: "COE0015L", title: "Physics for Engineers 2 (Lab)", units: 1, prereqs: [] },
          { id: "COE0017", title: "Chemistry for Engineers 2 (LEC)", units: 2, prereqs: ["COE0005"] },
          { id: "COE0017L", title: "Chemistry for Engineers 2 (Lab)", units: 1, prereqs: [] },
          { id: "GED0023", title: "Physical Education 3", units: 3, prereqs: ["GED0015"] },
          { id: "GED0031", title: "Purposive Communication", units: 3, prereqs: ["GED0021"] },
          { id: "NSTP2", title: "Civic Welfare Training Service 2", units: 0, prereqs: [] }
        ]
      }
    ]
  },
  {
    year: "Second Year",
    schoolYear: "2024 - 2025",
    terms: [
      {
        termName: "Term 1",
        courses: [
          { id: "CE0001", title: "Statics of Rigid Bodies", units: 3, prereqs: ["COE0009"] },
          { id: "CE0002L", title: "Computer Fundamentals and Programming", units: 2, prereqs: [] },
          { id: "CE0003L", title: "Engineering Drawing and Plans", units: 1, prereqs: [] },
          { id: "CE0005", title: "Introduction to Civil Engineering", units: 2, prereqs: ["GED0006"] },
          { id: "COE0019", title: "Differential Equations", units: 3, prereqs: ["COE0013"] },
          { id: "GED0035", title: "The Contemporary World", units: 3, prereqs: [] },
          { id: "GED0043", title: "Specialized English Program 3", units: 3, prereqs: ["GED0031"] },
          { id: "GED0045", title: "G.E. Elective – Bioengineering", units: 3, prereqs: [] }
        ]
      },
      {
        termName: "Term 2",
        courses: [
          { id: "CE0007", title: "Dynamics of Rigid Bodies for CE", units: 2, prereqs: ["CE0001"] },
          { id: "CE0009", title: "Fluid Mechanics (LEC)", units: 2, prereqs: ["CE0001"] },
          { id: "CE0009L", title: "Fluid Mechanics (Lab)", units: 1, prereqs: [] },
          { id: "CE0011L", title: "Computer-Aided Drafting for CE", units: 1, prereqs: ["CE0003L"] },
          { id: "CE0013", title: "Mechanics of Deformable Bodies for CE", units: 5, prereqs: ["CE0001"] },
          { id: "CE0015", title: "Fundamentals of Surveying (LEC)", units: 3, prereqs: ["CE0003L"] },
          { id: "CE0015L", title: "Fundamentals of Surveying (Lab)", units: 1, prereqs: [] },
          { id: "COE0057", title: "Design Thinking for Engineers", units: 3, prereqs: [] },
          { id: "GED0085", title: "Gender and Society", units: 3, prereqs: [] }
        ]
      },
      {
        termName: "Term 3",
        courses: [
          { id: "CE0017", title: "Building System Design (LEC)", units: 2, prereqs: ["CE0011L"] },
          { id: "CE0017L", title: "Building System Design (Lab)", units: 1, prereqs: [] },
          { id: "CE0019", title: "Structural Theory (LEC)", units: 3, prereqs: ["CE0013"] },
          { id: "CE0019L", title: "Structural Theory (Lab)", units: 1, prereqs: [] },
          { id: "CE0021", title: "Hydraulics (LEC)", units: 4, prereqs: ["CE0009"] },
          { id: "CE0021L", title: "Hydraulics (Lab)", units: 1, prereqs: [] },
          { id: "CE0023", title: "Highway and Railroad Engineering", units: 3, prereqs: ["CE0015"] },
          { id: "CE0025", title: "CE Correlation Course 1 (LEC)", units: 2, prereqs: ["CE0013"] },
          { id: "CE0025L", title: "CE Correlation Course 1 (Lab)", units: 1, prereqs: [] },
          { id: "COE0039", title: "Engineering Economics", units: 3, prereqs: ["COE0011"] }
        ]
      }
    ]
  },
  {
    year: "Third Year",
    schoolYear: "2025 - 2026",
    terms: [
      {
        termName: "Term 1",
        courses: [
          { id: "CE0027", title: "Construction Materials and Testing (LEC)", units: 2, prereqs: ["CE0013"] },
          { id: "CE0027L", title: "Construction Materials and Testing (Lab)", units: 1, prereqs: [] },
          { id: "CE0029", title: "Geotechnical Engineering 1 (LEC)", units: 3, prereqs: ["CE0013"] },
          { id: "CE0029L", title: "Geotechnical Engineering 1 (Lab)", units: 1, prereqs: [] },
          { id: "CE0031", title: "Hydrology", units: 3, prereqs: ["CE0021"] },
          { id: "CE0033", title: "Quantity Surveying (LEC)", units: 2, prereqs: ["CE0017"] },
          { id: "CE0033L", title: "Quantity Surveying (Lab)", units: 1, prereqs: [] },
          { id: "CE0035", title: "Principle of Transportation Engineering", units: 3, prereqs: ["CE0023"] },
          { id: "COE0049", title: "Engineering Management", units: 2, prereqs: ["COE0039"] },
          { id: "GED0049", title: "Life and Works of Rizal", units: 3, prereqs: [] }
        ]
      },
      {
        termName: "Term 2",
        courses: [
          { id: "CE0037", title: "Principles of Reinforced /Prestressed Concrete (LEC)", units: 3, prereqs: ["CE0019"] },
          { id: "CE0037L", title: "Principles of Reinforced /Prestressed Concrete (Lab)", units: 1, prereqs: [] },
          { id: "CE0039", title: "Principle of Steel Design (LEC)", units: 3, prereqs: ["CE0019"] },
          { id: "CE0039L", title: "Principle of Steel Design (Lab)", units: 1, prereqs: [] },
          { id: "CE0041", title: "Geology for Civil Engineers", units: 2, prereqs: ["CE0033"] },
          { id: "GED0009", title: "Readings in Philippine History", units: 3, prereqs: [] },
          { id: "GED0061", title: "Ethics", units: 3, prereqs: [] },
          { id: "GED0063", title: "Technopreneurship", units: 3, prereqs: ["COE0049", "COE0057"] }
        ]
      },
      {
        termName: "Term 3",
        courses: [
          { id: "CE0043", title: "Professional Course 1 – Earthquake Engineering", units: 3, prereqs: ["CE0037", "CE0039"] },
          { id: "CE0045", title: "Professional Course 2 – Reinforced Concrete Design", units: 3, prereqs: ["CE0037", "CE0039"] },
          { id: "CE0047", title: "Numerical Solutions to CE Problems (LEC)", units: 2, prereqs: ["COE0019"] },
          { id: "CE0047L", title: "Numerical Solutions to CE Problems (Lab)", units: 1, prereqs: [] },
          { id: "CE0049", title: "Methods of Research", units: 3, prereqs: ["COE0049"] },
          { id: "CE0051", title: "CE Correlation Course 2 (LEC)", units: 2, prereqs: ["CE0037", "CE0039", "CE0025"] },
          { id: "CE0051L", title: "CE Correlation Course 2 (Lab)", units: 1, prereqs: [] },
          { id: "CE0053", title: "Engineering Utilities 1", units: 3, prereqs: ["COE0015"] },
          { id: "GED0047", title: "Foreign Language", units: 3, prereqs: [] }
        ]
      }
    ]
  },
  {
    year: "Fourth Year",
    schoolYear: "2026 - 2027",
    terms: [
      {
        termName: "Term 1",
        courses: [
          { id: "CE0055", title: "CE Laws, Ethics and Contract", units: 3, prereqs: ["CE0031"] },
          { id: "CE0057", title: "CE Project 1 (LEC)", units: 2, prereqs: ["CE0043", "CE0045", "GED0063", "CE0049"] },
          { id: "CE0057L", title: "CE Project 1 (Lab)", units: 1, prereqs: [] },
          { id: "CE0059", title: "Professional Course 3 – Design of Steel Structures", units: 3, prereqs: ["CE0043", "CE0045"] },
          { id: "CE0061", title: "Professional Course 4 – Prestressed Concrete Design", units: 3, prereqs: ["CE0043", "CE0045"] },
          { id: "CE0063", title: "Construction Methods and Project Management", units: 3, prereqs: ["COE0049"] },
          { id: "CE0065", title: "Engineering Utilities 2", units: 3, prereqs: ["CE0053"] },
          { id: "COE0061", title: "Professional Development for Engineers", units: 1, prereqs: ["CE0005"] },
          { id: "GED0011", title: "Science, Technology and Society", units: 3, prereqs: [] }
        ]
      },
      {
        termName: "Term 2",
        courses: [
          { id: "CE0067", title: "Internship for CE", units: 9, prereqs: ["CE0059", "CE0061"] }
        ]
      },
      {
        termName: "Term 3",
        courses: [
          { id: "CE0069", title: "CE Correlation Course 3 (LEC)", units: 5, prereqs: ["CE0051", "CE0067"] },
          { id: "CE0069L", title: "CE Correlation Course 3 (Lab)", units: 1, prereqs: [] },
          { id: "CE0071", title: "CE Project 2 (LEC)", units: 2, prereqs: ["CE0057", "CE0067"] },
          { id: "CE0071L", title: "CE Project 2 (Lab)", units: 1, prereqs: [] },
          { id: "CE0073", title: "Professional Course 5 – Foundation and Retaining Wall", units: 3, prereqs: ["CE0067"] },
          { id: "CE0075", title: "Professional Course 6 – Computer Software in Structural Analysis", units: 3, prereqs: ["CE0067"] },
          { id: "CE0077", title: "Technical Elective for CE - COSH", units: 3, prereqs: ["CE0067"] }
        ]
      }
    ]
  }
];

const App = () => {
  const [courseStatus, setCourseStatus] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [expandedYear, setExpandedYear] = useState("First Year"); // Default open

  useEffect(() => {
    const savedData = localStorage.getItem("ce_tracker_data_v2");
    if (savedData) {
      setCourseStatus(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ce_tracker_data_v2", JSON.stringify(courseStatus));
  }, [courseStatus]);

  const isLocked = (course) => {
    if (course.prereqs.length === 0) return false;
    const allPrereqsPassed = course.prereqs.every(
      (prereqId) => courseStatus[prereqId] === "passed"
    );
    return !allPrereqsPassed;
  };

  // safer prerequisite error message (no deep nested find that can crash)
  const handleToggle = (courseId, currentStatus, locked) => {
    if (locked && currentStatus === "inactive") {
      const course = CURRICULUM_DATA.flatMap((y) =>
        y.terms.flatMap((t) => t.courses)
      ).find((c) => c.id === courseId);
      if (course && course.prereqs.length > 0) {
        setErrorMsg(`Prerequisite required: ${course.prereqs.join(", ")}`);
        setTimeout(() => setErrorMsg(""), 3000);
      }
      return;
    }

    let nextStatus = "inactive";
    if (currentStatus === "inactive" || !currentStatus) nextStatus = "taking";
    else if (currentStatus === "taking") nextStatus = "passed";
    else if (currentStatus === "passed") nextStatus = "inactive";

    setCourseStatus((prev) => ({
      ...prev,
      [courseId]: nextStatus,
    }));
  };

  // Stats
  const totalUnits = CURRICULUM_DATA.reduce(
    (acc, year) =>
      acc +
      year.terms.reduce(
        (tAcc, term) =>
          tAcc +
          term.courses.reduce((cAcc, course) => cAcc + course.units, 0),
        0
      ),
    0
  );

  const passedUnits = Object.keys(courseStatus).reduce((acc, courseId) => {
    if (courseStatus[courseId] === "passed") {
      let units = 0;
      CURRICULUM_DATA.forEach((y) =>
        y.terms.forEach((t) =>
          t.courses.forEach((c) => {
            if (c.id === courseId) units = c.units;
          })
        )
      );
      return acc + units;
    }
    return acc;
  }, 0);

  const percentage =
    totalUnits === 0 ? 0 : Math.round((passedUnits / totalUnits) * 100);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* --- HERO HEADER --- */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white pb-24 pt-10 px-6 shadow-xl">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap className="w-8 h-8 text-blue-200" />
              <h1 className="text-3xl font-bold tracking-tight">
                Academic Tracker
              </h1>
            </div>
            <p className="text-blue-100 opacity-90">
              Civil Engineering • BSCE Curriculum
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex gap-8 bg-blue-800/30 p-4 rounded-xl border border-blue-500/30 backdrop-blur-sm">
            <div className="text-center">
              <span className="block text-3xl font-bold">{passedUnits}</span>
              <span className="text-xs uppercase tracking-wider text-blue-200">
                Units Earned
              </span>
            </div>
            <div className="w-px bg-blue-500/50"></div>
            <div className="text-center">
              <span className="block text-3xl font-bold">{percentage}%</span>
              <span className="text-xs uppercase tracking-wider text-blue-200">
                Complete
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-16 pb-20">
        {/* --- ERROR TOAST --- */}
        {errorMsg && (
          <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-white border-l-4 border-red-500 text-slate-700 px-6 py-4 rounded-r shadow-2xl z-50 flex items-center animate-bounce">
            <AlertCircle className="w-5 h-5 mr-3 text-red-500" />
            <span className="font-medium">{errorMsg}</span>
          </div>
        )}

        {/* --- PROGRESS BAR --- */}
        <div className="bg-white rounded-lg p-1 mb-8 shadow-md">
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-700 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* --- CURRICULUM DISPLAY --- */}
        <div className="space-y-6">
          {CURRICULUM_DATA.map((year, yIdx) => (
            <div
              key={yIdx}
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
            >
              {/* Year Header */}
              <button
                onClick={() =>
                  setExpandedYear(
                    expandedYear === year.year ? null : year.year
                  )
                }
                className="w-full flex justify-between items-center px-6 py-4 bg-slate-50 hover:bg-slate-100 transition-colors border-b border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      expandedYear === year.year
                        ? "bg-blue-100 text-blue-700"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-lg font-bold text-slate-800">
                      {year.year}
                    </h2>
                    <p className="text-sm text-slate-500">
                      {year.schoolYear}
                    </p>
                  </div>
                </div>
                <ChevronRight
                  className={`w-5 h-5 text-slate-400 transition-transform ${
                    expandedYear === year.year ? "rotate-90" : ""
                  }`}
                />
              </button>

              {/* Terms Grid */}
              {expandedYear === year.year && (
                <div className="p-6 bg-slate-50/50">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {year.terms.map((term, tIdx) => (
                      <div key={tIdx} className="flex flex-col">
                        <div className="mb-3 flex justify-between items-end px-1">
                          <h3 className="font-semibold text-slate-700 uppercase tracking-wide text-sm">
                            {term.termName}
                          </h3>
                          <span className="text-xs font-mono text-slate-400">
                            {term.courses.reduce(
                              (acc, c) => acc + c.units,
                              0
                            )}
                            u
                          </span>
                        </div>

                        <div className="space-y-3 flex-grow">
                          {term.courses.map((course) => {
                            const status = courseStatus[course.id] || "inactive";
                            const locked = isLocked(course);

                            // --- CARD STYLING LOGIC ---
                            let baseStyle =
                              "relative p-4 rounded-xl border transition-all duration-200 cursor-pointer flex justify-between items-start group shadow-sm ";

                            if (status === "passed") {
                              baseStyle +=
                                "bg-white border-blue-200 hover:shadow-md hover:border-blue-400";
                            } else if (status === "taking") {
                              baseStyle +=
                                "bg-blue-600 border-blue-600 text-white shadow-lg scale-[1.02] z-10";
                            } else if (locked) {
                              baseStyle +=
                                "bg-slate-100 border-slate-200 opacity-60 cursor-not-allowed grayscale";
                            } else {
                              baseStyle +=
                                "bg-white border-slate-200 hover:border-blue-300 hover:shadow-md";
                            }

                            return (
                              <div
                                key={course.id}
                                onClick={() =>
                                  handleToggle(course.id, status, locked)
                                }
                                className={baseStyle}
                              >
                                <div className="flex-1 pr-3">
                                  {/* Header Badge */}
                                  <div className="flex items-center gap-2 mb-1.5">
                                    <span
                                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider
                                      ${
                                        status === "taking"
                                          ? "bg-blue-500 text-blue-50"
                                          : status === "passed"
                                          ? "bg-green-100 text-green-700"
                                          : "bg-slate-100 text-slate-500"
                                      }`}
                                    >
                                      {course.id}
                                    </span>
                                  </div>

                                  {/* Title */}
                                  <h4
                                    className={`text-sm font-semibold leading-snug 
                                    ${
                                      status === "taking"
                                        ? "text-white"
                                        : "text-slate-700"
                                    }`}
                                  >
                                    {course.title}
                                  </h4>

                                  {/* Footer: Units & Prereq warning */}
                                  <div className="mt-2 flex items-center gap-2">
                                    <span
                                      className={`text-xs ${
                                        status === "taking"
                                          ? "text-blue-100"
                                          : "text-slate-400"
                                      }`}
                                    >
                                      {course.units} Units
                                    </span>
                                    {locked && course.prereqs.length > 0 && (
                                      <span className="text-[10px] text-red-500 flex items-center bg-red-50 px-1 rounded">
                                        <Lock className="w-3 h-3 mr-1" />
                                        Req: {course.prereqs[0]}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Status Icon */}
                                <div className="mt-1">
                                  {status === "passed" && (
                                    <div className="bg-blue-100 p-1 rounded-full">
                                      <Check className="w-4 h-4 text-blue-600" />
                                    </div>
                                  )}
                                  {status === "taking" && (
                                    <div className="bg-white/20 p-1 rounded-full">
                                      <BookOpen className="w-4 h-4 text-white" />
                                    </div>
                                  )}
                                  {locked && (
                                    <Lock className="w-4 h-4 text-slate-400" />
                                  )}
                                  {status === "inactive" && !locked && (
                                    <div className="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-blue-300"></div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
