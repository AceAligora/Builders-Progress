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
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

// --- DATA: Full Civil Engineering Curriculum (FEU Tech BSCE) ---
// NOTE: "LEC" -> "Lecture", "Lab" -> "Laboratory" in titles
const CURRICULUM_DATA = [
  {
    year: "First Year",
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
          { id: "NSTP1", title: "Civic Welfare Training Service 1", units: 0, prereqs: [] },
        ],
      },
      {
        termName: "Term 2",
        courses: [
          { id: "COE0007", title: "Calculus 1", units: 3, prereqs: ["COE0001", "COE0003"] },
          { id: "COE0009", title: "Physics for Engineers 1 (Lecture)", units: 2, prereqs: ["COE0001", "COE0003"] },
          { id: "COE0009L", title: "Physics for Engineers 1 (Laboratory)", units: 1, prereqs: [] },
          { id: "GED0015", title: "Physical Education 2", units: 3, prereqs: ["GED0004"] },
          { id: "GED0019", title: "Understanding the Self", units: 3, prereqs: [] },
          { id: "GED0021", title: "Specialized English Program 2", units: 3, prereqs: ["GED0001"] },
          { id: "GED0027", title: "Mathematics in the Modern World", units: 3, prereqs: [] },
        ],
      },
      {
        termName: "Term 3",
        courses: [
          { id: "COE0011", title: "Engineering Data Analysis", units: 3, prereqs: ["COE0007"] },
          { id: "COE0013", title: "Calculus 2", units: 3, prereqs: ["COE0007"] },
          { id: "COE0015", title: "Physics for Engineers 2 (Lecture)", units: 2, prereqs: ["COE0009", "COE0007"] },
          { id: "COE0015L", title: "Physics for Engineers 2 (Laboratory)", units: 1, prereqs: [] },
          { id: "COE0017", title: "Chemistry for Engineers 2 (Lecture)", units: 2, prereqs: ["COE0005"] },
          { id: "COE0017L", title: "Chemistry for Engineers 2 (Laboratory)", units: 1, prereqs: [] },
          { id: "GED0023", title: "Physical Education 3", units: 3, prereqs: ["GED0015"] },
          { id: "GED0031", title: "Purposive Communication", units: 3, prereqs: ["GED0021"] },
          { id: "NSTP2", title: "Civic Welfare Training Service 2", units: 0, prereqs: ["NSTP1"] },
        ],
      },
    ],
  },
  {
    year: "Second Year",
    terms: [
      {
        termName: "Term 1",
        courses: [
          { id: "CE0001", title: "Statics of Rigid Bodies", units: 3, prereqs: ["COE0009"] },
          { id: "CE0002L", title: "Computer Fundamentals and Programming (Laboratory)", units: 2, prereqs: [] },
          { id: "CE0003L", title: "Engineering Drawing and Plans (Laboratory)", units: 1, prereqs: [] },
          { id: "CE0005", title: "Introduction to Civil Engineering", units: 2, prereqs: ["GED0006"] },
          { id: "COE0019", title: "Differential Equations", units: 3, prereqs: ["COE0013"] },
          { id: "GED0035", title: "The Contemporary World", units: 3, prereqs: [] },
          { id: "GED0043", title: "Specialized English Program 3", units: 3, prereqs: ["GED0031"] },
          { id: "GED0045", title: "G.E. Elective – Bioengineering", units: 3, prereqs: [] },
        ],
      },
      {
        termName: "Term 2",
        courses: [
          { id: "CE0007", title: "Dynamics of Rigid Bodies for CE", units: 2, prereqs: ["CE0001"] },
          { id: "CE0009", title: "Fluid Mechanics (Lecture)", units: 2, prereqs: ["CE0001"] },
          { id: "CE0009L", title: "Fluid Mechanics (Laboratory)", units: 1, prereqs: [] },
          { id: "CE0011L", title: "Computer-Aided Drafting for CE (Laboratory)", units: 1, prereqs: ["CE0003L"] },
          { id: "CE0013", title: "Mechanics of Deformable Bodies for CE", units: 5, prereqs: ["CE0001"] },
          { id: "CE0015", title: "Fundamentals of Surveying (Lecture)", units: 3, prereqs: ["CE0003L"] },
          { id: "CE0015L", title: "Fundamentals of Surveying (Laboratory)", units: 1, prereqs: [] },
          { id: "COE0057", title: "Design Thinking for Engineers", units: 3, prereqs: [] },
          { id: "GED0085", title: "Gender and Society", units: 3, prereqs: [] },
        ],
      },
      {
        termName: "Term 3",
        courses: [
          { id: "CE0017", title: "Building System Design (Lecture)", units: 2, prereqs: ["CE0011L"] },
          { id: "CE0017L", title: "Building System Design (Laboratory)", units: 1, prereqs: [] },
          { id: "CE0019", title: "Structural Theory (Lecture)", units: 3, prereqs: ["CE0013"] },
          { id: "CE0019L", title: "Structural Theory (Laboratory)", units: 1, prereqs: [] },
          { id: "CE0021", title: "Hydraulics (Lecture)", units: 4, prereqs: ["CE0009"] },
          { id: "CE0021L", title: "Hydraulics (Laboratory)", units: 1, prereqs: [] },
          { id: "CE0023", title: "Highway and Railroad Engineering", units: 3, prereqs: ["CE0015"] },
          { id: "CE0025", title: "CE Correlation Course 1 (Lecture)", units: 2, prereqs: ["CE0013"] },
          { id: "CE0025L", title: "CE Correlation Course 1 (Laboratory)", units: 1, prereqs: [] },
          { id: "COE0039", title: "Engineering Economics", units: 3, prereqs: ["COE0011"] },
        ],
      },
    ],
  },
  {
    year: "Third Year",
    terms: [
      {
        termName: "Term 1",
        courses: [
          { id: "CE0027", title: "Construction Materials and Testing (Lecture)", units: 2, prereqs: ["CE0013"] },
          { id: "CE0027L", title: "Construction Materials and Testing (Laboratory)", units: 1, prereqs: [] },
          { id: "CE0029", title: "Geotechnical Engineering 1 (Lecture)", units: 3, prereqs: ["CE0013"] },
          { id: "CE0029L", title: "Geotechnical Engineering 1 (Laboratory)", units: 1, prereqs: [] },
          { id: "CE0031", title: "Hydrology", units: 3, prereqs: ["CE0021"] },
          { id: "CE0033", title: "Quantity Surveying (Lecture)", units: 2, prereqs: ["CE0017"] },
          { id: "CE0033L", title: "Quantity Surveying (Laboratory)", units: 1, prereqs: [] },
          { id: "CE0035", title: "Principle of Transportation Engineering", units: 3, prereqs: ["CE0023"] },
          { id: "COE0049", title: "Engineering Management", units: 2, prereqs: ["COE0039"] },
          { id: "GED0049", title: "Life and Works of Rizal", units: 3, prereqs: [] },
        ],
      },
      {
        termName: "Term 2",
        courses: [
          { id: "CE0037", title: "Principles of Reinforced /Prestressed Concrete (Lecture)", units: 3, prereqs: ["CE0019"] },
          { id: "CE0037L", title: "Principles of Reinforced /Prestressed Concrete (Laboratory)", units: 1, prereqs: [] },
          { id: "CE0039", title: "Principle of Steel Design (Lecture)", units: 3, prereqs: ["CE0019"] },
          { id: "CE0039L", title: "Principle of Steel Design (Laboratory)", units: 1, prereqs: [] },
          { id: "CE0041", title: "Geology for Civil Engineers", units: 2, prereqs: ["CE0033"] },
          { id: "GED0009", title: "Readings in Philippine History", units: 3, prereqs: [] },
          { id: "GED0061", title: "Ethics", units: 3, prereqs: [] },
          { id: "GED0063", title: "Technopreneurship", units: 3, prereqs: ["COE0049", "COE0057"] },
        ],
      },
      {
        termName: "Term 3",
        courses: [
          { id: "CE0043", title: "Professional Course 1 – (Specialized 1) Earthquake Engineering", units: 3, prereqs: ["CE0037", "CE0039"] },
          { id: "CE0045", title: "Professional Course 2 – (Reinforced Concrete Design)", units: 3, prereqs: ["CE0037", "CE0039"] },
          { id: "CE0047", title: "Numerical Solutions to CE Problems (Lecture)", units: 2, prereqs: ["COE0019"] },
          { id: "CE0047L", title: "Numerical Solutions to CE Problems (Laboratory)", units: 1, prereqs: [] },
          { id: "CE0049", title: "Methods of Research", units: 3, prereqs: ["COE0049"] },
          { id: "CE0051", title: "CE Correlation Course 2 (Lecture)", units: 2, prereqs: ["CE0037", "CE0039", "CE0025"] },
          { id: "CE0051L", title: "CE Correlation Course 2 (Laboratory)", units: 1, prereqs: [] },
          { id: "CE0053", title: "Engineering Utilities 1", units: 3, prereqs: ["COE0015"] },
          { id: "GED0047", title: "Foreign Language", units: 3, prereqs: [] },
        ],
      },
    ],
  },
  {
    year: "Fourth Year",
    terms: [
      {
        termName: "Term 1",
        courses: [
          { id: "CE0055", title: "CE Laws, Ethics and Contract", units: 3, prereqs: ["CE0031"] },
          { id: "CE0057", title: "CE Project 1 (Lecture)", units: 2, prereqs: ["CE0043", "CE0045", "GED0063", "CE0049"] },
          { id: "CE0057L", title: "CE Project 1 (Laboratory)", units: 1, prereqs: [] },
          { id: "CE0059", title: "Professional Course 3 – (Specialized 3) Design of Steel Structures", units: 3, prereqs: ["CE0043", "CE0045"] },
          { id: "CE0061", title: "Professional Course 4 – (Specialized 4) Prestressed Concrete Design", units: 3, prereqs: ["CE0043", "CE0045"] },
          { id: "CE0063", title: "Construction Methods and Project Management", units: 3, prereqs: ["COE0049"] },
          { id: "CE0065", title: "Engineering Utilities 2", units: 3, prereqs: ["CE0053"] },
          { id: "COE0061", title: "Professional Development for Engineers", units: 1, prereqs: ["CE0005"] },
          { id: "GED0011", title: "Science, Technology and Society", units: 3, prereqs: [] },
        ],
      },
      {
        termName: "Term 2",
        courses: [
          { id: "CE0067", title: "Internship for CE", units: 9, prereqs: ["CE0059", "CE0061"] },
        ],
      },
      {
        termName: "Term 3",
        courses: [
          { id: "CE0069", title: "CE Correlation Course 3 (Lecture)", units: 5, prereqs: ["CE0051", "CE0067"] },
          { id: "CE0069L", title: "CE Correlation Course 3 (Laboratory)", units: 1, prereqs: [] },
          { id: "CE0071", title: "CE Project 2 (Lecture)", units: 2, prereqs: ["CE0057", "CE0067"] },
          { id: "CE0071L", title: "CE Project 2 (Laboratory)", units: 1, prereqs: [] },
          { id: "CE0073", title: "Professional Course 5 – (Specialized 5) Foundation and Retaining Wall", units: 3, prereqs: ["CE0067"] },
          { id: "CE0075", title: "Professional Course 6 – (Specialized 6) Computer Software in Structural Analysis", units: 3, prereqs: ["CE0067"] },
          { id: "CE0077", title: "Technical Elective for CE - COSH", units: 3, prereqs: ["CE0067"] },
        ],
      },
    ],
  },
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

  // Co-requisite: if course id ends with "L", lecture is same id without "L"
  const getCoreqLectureId = (courseId) => {
    if (courseId.endsWith("L")) {
      return courseId.slice(0, -1);
    }
    return null;
  };

  // Helper: determine if a course is a lab (Laboratory) based on ID
  const isLabCourse = (course) => course.id.endsWith("L");

  // Determine if a course is locked:
  // - Lecture: locked if prereqs not passed
  // - Laboratory: locked from manual changes (status controlled by lecture)
  const isLocked = (course) => {
    // Lock all lab courses for manual status changes
    if (isLabCourse(course)) return true;

    if (course.prereqs.length === 0) return false;
    const allPrereqsPassed = course.prereqs.every(
      (prereqId) => courseStatus[prereqId] === "passed"
    );
    return !allPrereqsPassed;
  };

  // Sync lab statuses automatically from passed lectures
  const syncLabsWithLectures = (statusMap) => {
    const updated = { ...statusMap };

    CURRICULUM_DATA.forEach((year) =>
      year.terms.forEach((term) =>
        term.courses.forEach((course) => {
          if (isLabCourse(course)) {
            const lectureId = getCoreqLectureId(course.id);
            if (lectureId && updated[lectureId] === "passed") {
              // If lecture is passed, lab becomes passed automatically
              updated[course.id] = "passed";
            }
          }
        })
      )
    );

    return updated;
  };

  // Explicit status setter for lectures with prerequisite check
  const setCourseStatusWithValidation = (courseId, targetStatus, locked) => {
    // Prevent manual changes on lab courses entirely
    const isLab = courseId.endsWith("L");
    if (isLab) {
      setErrorMsg("Laboratory subjects are automatically updated when their Lecture co-requisite is passed.");
      setTimeout(() => setErrorMsg(""), 3000);
      return;
    }

    // Only block when trying to move from inactive to active/passed and prereqs are not met
    if (locked && (targetStatus === "taking" || targetStatus === "passed")) {
      const course = CURRICULUM_DATA.flatMap((y) =>
        y.terms.flatMap((t) => t.courses)
      ).find((c) => c.id === courseId);
      if (course && course.prereqs.length > 0) {
        setErrorMsg(`Prerequisite required: ${course.prereqs.join(", ")}`);
        setTimeout(() => setErrorMsg(""), 3000);
      }
      return;
    }

    setCourseStatus((prev) => {
      const next = {
        ...prev,
        [courseId]: targetStatus,
      };
      // After updating a lecture, sync lab statuses
      return syncLabsWithLectures(next);
    });
  };

  // Mark all courses in a term as passed (for lectures only; labs sync automatically)
  const markTermAsPassed = (term) => {
    setCourseStatus((prev) => {
      const next = { ...prev };

      term.courses.forEach((course) => {
        const isLab = isLabCourse(course);
        const locked = isLocked(course);

        // Skip labs (they'll be synced after) and locked lectures
        if (!isLab && !locked) {
          next[course.id] = "passed";
        }
      });

      const synced = syncLabsWithLectures(next);

      if (Object.keys(synced).length === Object.keys(prev).length) {
        setErrorMsg("No additional subjects in this term can be marked as passed yet.");
        setTimeout(() => setErrorMsg(""), 3000);
      }

      return synced;
    });
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
    <>
      {/* Analytics & Speed Insights (mounted once at root) */}
      <Analytics />
      <SpeedInsights />

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
                Civil Engineering • BSCE Curriculum (FEU Institute of Technology)
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
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <h2 className="font-semibold text-slate-800">
                        {year.year}
                      </h2>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 text-slate-400 transition-transform ${
                      expandedYear === year.year ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {/* Year Content */}
                {expandedYear === year.year && (
                  <div className="px-4 pb-4 pt-3">
                    <div className="grid md:grid-cols-3 gap-4">
                      {year.terms.map((term, tIdx) => (
                        <div key={tIdx} className="flex flex-col">
                          <div className="mb-3 flex justify-between items-center px-1">
                            <div>
                              <h3 className="font-semibold text-slate-700 uppercase tracking-wide text-sm">
                                {term.termName}
                              </h3>
                              <p className="text-[11px] text-slate-400">
                                {term.courses.reduce(
                                  (acc, c) => acc + c.units,
                                  0
                                )}
                                u total
                              </p>
                            </div>

                            {/* Term-level "mark all passed" button */}
                            <button
                              type="button"
                              onClick={() => markTermAsPassed(term)}
                              className="text-[10px] px-2 py-1 rounded-full border border-green-500 text-green-700 bg-green-50 hover:bg-green-100 transition"
                            >
                              Mark all subjects this term as passed
                            </button>
                          </div>

                          <div className="space-y-3 flex-grow">
                            {term.courses.map((course) => {
                              const status = courseStatus[course.id] || "inactive";
                              const locked = isLocked(course);
                              const coreqLectureId = getCoreqLectureId(course.id);
                              const lab = isLabCourse(course);

                              // --- CARD STYLING LOGIC ---
                              let baseStyle =
                                "relative p-4 rounded-xl border transition-all duration-200 flex justify-between items-start group shadow-sm ";

                              if (status === "passed") {
                                baseStyle +=
                                  "bg-blue-50 border-blue-200 shadow-md";
                              } else if (status === "taking") {
                                baseStyle +=
                                  "bg-white border-blue-200 hover:shadow-md hover:border-blue-400";
                              } else if (locked) {
                                baseStyle +=
                                  "bg-slate-100 border-slate-200 opacity-60 grayscale";
                              } else {
                                baseStyle +=
                                  "bg-white border-slate-200 hover:border-blue-300 hover:shadow-md";
                              }

                              return (
                                <div key={course.id} className={baseStyle}>
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
                                      {lab && (
                                        <span className="text-[9px] uppercase tracking-wide bg-slate-800 text-slate-50 px-1.5 py-0.5 rounded-full">
                                          Laboratory
                                        </span>
                                      )}
                                    </div>

                                    {/* Title */}
                                    <h4
                                      className={`text-sm font-semibold leading-snug 
                                      ${
                                        status === "taking"
                                          ? "text-slate-900"
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
                                            ? "text-blue-700"
                                            : "text-slate-400"
                                        }`}
                                      >
                                        {course.units} Units
                                      </span>
                                      {!lab && locked && course.prereqs.length > 0 && (
                                        <span className="text-[10px] text-red-500 flex items-center bg-red-50 px-1 rounded">
                                          <Lock className="w-3 h-3 mr-1" />
                                          Req: {course.prereqs[0]}
                                        </span>
                                      )}
                                    </div>

                                    {/* Co-requisite info for lab courses */}
                                    {coreqLectureId && (
                                      <div className="mt-1 text-[10px] text-blue-600 bg-blue-50 inline-flex items-center px-2 py-0.5 rounded-full">
                                        Co-requisite: {coreqLectureId}
                                      </div>
                                    )}

                                    {/* Status control buttons */}
                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                      {/* For labs, show read-only status info */}
                                      {lab ? (
                                        <span className="text-[10px] text-slate-500 italic">
                                          Laboratory status follows its Lecture co-requisite.
                                        </span>
                                      ) : (
                                        <>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              setCourseStatusWithValidation(
                                                course.id,
                                                "inactive",
                                                locked
                                              )
                                            }
                                            className={`text-[10px] px-2 py-1 rounded-full border transition ${
                                              status === "inactive"
                                                ? "bg-slate-800 text-white border-slate-800"
                                                : "bg-white text-slate-600 border-slate-300 hover:bg-slate-50"
                                            }`}
                                          >
                                            Inactive / Failed
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              setCourseStatusWithValidation(
                                                course.id,
                                                "taking",
                                                locked
                                              )
                                            }
                                            className={`text-[10px] px-2 py-1 rounded-full border transition ${
                                              status === "taking"
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-white text-blue-700 border-blue-300 hover:bg-blue-50"
                                            } ${locked ? "opacity-60 cursor-not-allowed" : ""}`}
                                            disabled={locked}
                                          >
                                            Active
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              setCourseStatusWithValidation(
                                                course.id,
                                                "passed",
                                                locked
                                              )
                                            }
                                            className={`text-[10px] px-2 py-1 rounded-full border transition ${
                                              status === "passed"
                                                ? "bg-green-600 text-white border-green-600"
                                                : "bg-white text-green-700 border-green-300 hover:bg-green-50"
                                            } ${locked ? "opacity-60 cursor-not-allowed" : ""}`}
                                            disabled={locked}
                                          >
                                            Passed
                                          </button>
                                        </>
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
                                        <BookOpen className="w-4 h-4 text-blue-600" />
                                      </div>
                                    )}
                                    {/* Lock icon:
                                        - for lectures: when prereqs not satisfied
                                        - for labs: always show lock because status is auto-controlled
                                     */}
                                    {(locked || lab) && (
                                      <Lock className="w-4 h-4 text-slate-400" />
                                    )}
                                    {status === "inactive" && !locked && !lab && (
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
    </>
  );
};

export default App;
