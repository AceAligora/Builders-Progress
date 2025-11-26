import React, { useState, useEffect } from "react";
import {
  Check,
  Lock,
  BookOpen,
  AlertCircle,
  BarChart3,
  ChevronRight,
  GraduationCap,
  Calculator,
  LayoutTemplate,
} from "lucide-react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

// --- DATA: Full Civil Engineering Curriculum (FEU Tech BSCE) ---
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

// GPA DROPDOWN OPTIONS
const GPA_OPTIONS = [
  "",
  "0.0",
  "0.5",
  "1.0",
  "1.5",
  "2.0",
  "2.5",
  "3.0",
  "3.5",
  "4.0",
];

// Build a set of all course IDs to detect lecture counterparts
const buildCourseIdSet = () => {
  const set = new Set();
  CURRICULUM_DATA.forEach((year) =>
    year.terms.forEach((term) =>
      term.courses.forEach((c) => set.add(c.id))
    )
  );
  return set;
};

const ALL_COURSE_IDS = buildCourseIdSet();

// A lab is auto-synced if there exists a lecture with same code minus 'L'
const isAutoSyncedLabId = (courseId) => {
  if (!courseId.endsWith("L")) return false;
  const lectureId = courseId.slice(0, -1);
  return ALL_COURSE_IDS.has(lectureId);
};

const getCoreqLectureId = (courseId) =>
  courseId.endsWith("L") ? courseId.slice(0, -1) : null;

const isLabCourse = (course) => course.id.endsWith("L");

// --- SHARED GPA HELPERS ---
const getNumericGpaFromMap = (map, courseId) => {
  const val = map[courseId];
  if (val === undefined || val === "") return null;
  const num =
    typeof val === "string"
      ? parseFloat(val)
      : val;
  if (Number.isNaN(num)) return null;
  return num;
};

// --- CURRICULUM TRACKER PAGE ---
const CurriculumTrackerPage = ({
  courseStatus,
  setCourseStatus,
  errorMsg,
  setErrorMsg,
}) => {
  const [expandedYear, setExpandedYear] = useState("First Year");

  const isLocked = (course) => {
    if (isAutoSyncedLabId(course.id)) return true;
    if (course.prereqs.length === 0) return false;
    const allPrereqsPassed = course.prereqs.every(
      (id) => courseStatus[id] === "passed"
    );
    return !allPrereqsPassed;
  };

  const syncLabsWithLectures = (statusMap) => {
    const updated = { ...statusMap };

    CURRICULUM_DATA.forEach((year) =>
      year.terms.forEach((term) =>
        term.courses.forEach((course) => {
          if (isAutoSyncedLabId(course.id)) {
            const lectureId = getCoreqLectureId(course.id);
            if (!lectureId) return;
            const lectureStatus = updated[lectureId] || "inactive";
            updated[course.id] = lectureStatus;
          }
        })
      )
    );

    return updated;
  };

  const setCourseStatusWithValidation = (courseId, targetStatus, locked) => {
    const autoLab = isAutoSyncedLabId(courseId);

    if (autoLab) {
      setErrorMsg(
        "This laboratory course follows the status of its Lecture co-requisite."
      );
      setTimeout(() => setErrorMsg(""), 3000);
      return;
    }

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
      const next = { ...prev, [courseId]: targetStatus };
      return syncLabsWithLectures(next);
    });
  };

  const markTermAsPassed = (term) => {
    setCourseStatus((prev) => {
      const next = { ...prev };

      term.courses.forEach((course) => {
        const autoLab = isAutoSyncedLabId(course.id);
        const locked = isLocked(course);
        if (!autoLab && !locked) {
          next[course.id] = "passed";
        }
      });

      const synced = syncLabsWithLectures(next);

      if (Object.keys(synced).length === Object.keys(prev).length) {
        setErrorMsg(
          "No additional courses in this term can be marked as passed yet."
        );
        setTimeout(() => setErrorMsg(""), 3000);
      }

      return synced;
    });
  };

  const resetTerm = (term) => {
    setCourseStatus((prev) => {
      const next = { ...prev };

      term.courses.forEach((course) => {
        next[course.id] = "inactive";
      });

      const synced = syncLabsWithLectures(next);
      return synced;
    });
  };

  const markYearAsPassed = (year) => {
    setCourseStatus((prev) => {
      const next = { ...prev };

      year.terms.forEach((term) => {
        term.courses.forEach((course) => {
          const autoLab = isAutoSyncedLabId(course.id);
          if (!autoLab) {
            next[course.id] = "passed";
          }
        });
      });

      const synced = syncLabsWithLectures(next);

      const changed = Object.keys(synced).some(
        (key) => synced[key] !== prev[key]
      );
      if (!changed) {
        setErrorMsg(
          "All courses in this year are already marked as passed."
        );
        setTimeout(() => setErrorMsg(""), 3000);
      }

      return synced;
    });
  };

  const resetYear = (year) => {
    setCourseStatus((prev) => {
      const next = { ...prev };

      year.terms.forEach((term) =>
        term.courses.forEach((course) => {
          next[course.id] = "inactive";
        })
      );

      const synced = syncLabsWithLectures(next);
      return synced;
    });
  };

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

  const completedUnits = Object.keys(courseStatus).reduce((acc, id) => {
    if (courseStatus[id] === "passed") {
      let units = 0;
      CURRICULUM_DATA.forEach((y) =>
        y.terms.forEach((t) =>
          t.courses.forEach((c) => {
            if (c.id === id) units = c.units;
          })
        )
      );
      return acc + units;
    }
    return acc;
  }, 0);

  const activeUnits = Object.keys(courseStatus).reduce((acc, id) => {
    if (courseStatus[id] === "taking") {
      let units = 0;
      CURRICULUM_DATA.forEach((y) =>
        y.terms.forEach((t) =>
          t.courses.forEach((c) => {
            if (c.id === id) units = c.units;
          })
        )
      );
      return acc + units;
    }
    return acc;
  }, 0);

  const remainingUnits = Math.max(totalUnits - completedUnits, 0);

  let passedCourses = 0;
  let activeCourses = 0;
  let inactiveCourses = 0;

  CURRICULUM_DATA.forEach((year) =>
    year.terms.forEach((term) =>
      term.courses.forEach((course) => {
        const status = courseStatus[course.id] || "inactive";
        if (status === "passed") passedCourses += 1;
        else if (status === "taking") activeCourses += 1;
        else inactiveCourses += 1;
      })
    )
  );

  let percentage = 0;
  if (totalUnits > 0) {
    percentage = Math.round((completedUnits / totalUnits) * 100);
    if (Number.isNaN(percentage)) percentage = 0;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
  }
  const barWidth = percentage === 0 ? 0 : Math.max(4, percentage);

  return (
    <>
      <div className="bg-blue-900 text-white pb-24 pt-10 px-6 shadow-xl">
        <div className="max-w-6xl mx-auto flex flex-col gap-6 md:flex-row md:justify-between md:items-center">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap className="w-8 h-8 text-blue-200" />
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Academic Tracker
              </h1>
            </div>
            <p className="text-blue-100 opacity-90 text-sm md:text-base">
              Civil Engineering • BSCE Curriculum (FEU Institute of Technology)
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 p-4 rounded-xl border border-blue-300/50 backdrop-blur-sm text-center text-xs md:text-sm">
            <div>
              <span className="block text-lg md:text-2xl font-bold">
                {completedUnits}
              </span>
              <span className="uppercase tracking-wider text-blue-100">
                Units Completed
              </span>
              <span className="block text-[10px] md:text-xs text-blue-100/80 mt-1">
                ({passedCourses} courses)
              </span>
            </div>
            <div className="border-x border-blue-300/60 px-3">
              <span className="block text-lg md:text-2xl font-bold">
                {activeUnits}
              </span>
              <span className="uppercase tracking-wider text-blue-100">
                Units Active
              </span>
              <span className="block text-[10px] md:text-xs text-blue-100/80 mt-1">
                ({activeCourses} courses)
              </span>
            </div>
            <div>
              <span className="block text-lg md:text-2xl font-bold">
                {remainingUnits}
              </span>
              <span className="uppercase tracking-wider text-blue-100">
                Units Remaining
              </span>
              <span className="block text-[10px] md:text-xs text-blue-100/80 mt-1">
                ({inactiveCourses} courses)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full">
        <div className="max-w-6xl mx-auto px-4 -mt-16 pb-12">
          {errorMsg && (
            <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-white border-l-4 border-red-500 text-slate-700 px-6 py-4 rounded-r shadow-2xl z-50 flex items-center">
              <AlertCircle className="w-5 h-5 mr-3 text-red-500" />
              <span className="font-medium">{errorMsg}</span>
            </div>
          )}

          {/* Progress bar */}
          <div className="bg-white rounded-lg p-3 mb-8 shadow-md flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span>Overall Progress</span>
              <span>{percentage}%</span>
            </div>
            <div className="relative h-3 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-slate-100" />
              <div
                className="relative h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-700 ease-out"
                style={{
                  width: `${barWidth}%`,
                  maxWidth: "100%",
                  minWidth: barWidth > 0 ? "8px" : "0px",
                }}
              />
            </div>
          </div>

          {/* Curriculum display */}
          <div className="space-y-6">
            {CURRICULUM_DATA.map((year, yIdx) => (
              <div
                key={yIdx}
                className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
              >
                <div className="w-full flex justify-between items-center px-6 py-4 bg-slate-50 hover:bg-slate-100 transition-colors border-b border-slate-100">
                  <button
                    onClick={() =>
                      setExpandedYear(
                        expandedYear === year.year ? null : year.year
                      )
                    }
                    className="flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <h2 className="font-semibold text-slate-800">
                        {year.year}
                      </h2>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 text-slate-400 transition-transform ${
                        expandedYear === year.year ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => markYearAsPassed(year)}
                      className="text-[11px] px-3 py-1 rounded-full border border-green-500 text-green-700 bg-green-50 hover:bg-green-100 transition"
                    >
                      Mark all courses this year as passed
                    </button>
                    <button
                      type="button"
                      onClick={() => resetYear(year)}
                      className="text-[11px] px-3 py-1 rounded-full border border-slate-300 text-slate-600 bg-white hover:bg-slate-50 transition"
                    >
                      Reset this year
                    </button>
                  </div>
                </div>

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
                            <div className="flex flex-col items-end gap-1">
                              <button
                                type="button"
                                onClick={() => markTermAsPassed(term)}
                                className="text-[10px] px-2 py-1 rounded-full border border-green-500 text-green-700 bg-green-50 hover:bg-green-100 transition"
                              >
                                Mark all courses this term as passed
                              </button>
                              <button
                                type="button"
                                onClick={() => resetTerm(term)}
                                className="text-[10px] px-2 py-1 rounded-full border border-slate-300 text-slate-600 bg-white hover:bg-slate-50 transition"
                              >
                                Reset this term
                              </button>
                            </div>
                          </div>

                          <div className="space-y-3 flex-grow">
                            {term.courses.map((course) => {
                              const status =
                                courseStatus[course.id] || "inactive";
                              const autoSyncedLab = isAutoSyncedLabId(
                                course.id
                              );
                              const lab = isLabCourse(course);
                              const locked = isLocked(course);
                              const coreqLectureId =
                                autoSyncedLab && getCoreqLectureId(course.id);

                              let baseStyle =
                                "relative p-4 rounded-xl border transition-all duration-200 flex justify-between items-start group shadow-sm ";

                              if (status === "passed") {
                                baseStyle +=
                                  "bg-blue-50 border-blue-200 shadow-md";
                              } else if (status === "taking") {
                                baseStyle +=
                                  "bg-white border-blue-200 hover:shadow-md hover:border-blue-400";
                              } else if (locked && autoSyncedLab) {
                                baseStyle +=
                                  "bg-slate-100 border-slate-200 opacity-60 grayscale";
                              } else if (locked) {
                                baseStyle +=
                                  "bg-slate-100 border-slate-200 opacity-60";
                              } else {
                                baseStyle +=
                                  "bg-white border-slate-200 hover:border-blue-300 hover:shadow-md";
                              }

                              return (
                                <div key={course.id} className={baseStyle}>
                                  <div className="flex-1 pr-3">
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
                                      {locked &&
                                        !autoSyncedLab &&
                                        course.prereqs.length > 0 && (
                                          <span className="text-[10px] text-red-500 flex items-center bg-red-50 px-1 rounded">
                                            <Lock className="w-3 h-3 mr-1" />
                                            Req: {course.prereqs[0]}
                                          </span>
                                        )}
                                    </div>

                                    {autoSyncedLab && coreqLectureId && (
                                      <div className="mt-1 text-[10px] text-blue-600 bg-blue-50 inline-flex items-center px-2 py-0.5 rounded-full">
                                        Co-requisite: {coreqLectureId}
                                      </div>
                                    )}

                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                      {autoSyncedLab ? (
                                        <span className="text-[10px] text-slate-500 italic">
                                          Laboratory status follows its Lecture
                                          co-requisite.
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
                                            } ${
                                              locked
                                                ? "opacity-60 cursor-not-allowed"
                                                : ""
                                            }`}
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
                                            } ${
                                              locked
                                                ? "opacity-60 cursor-not-allowed"
                                                : ""
                                            }`}
                                            disabled={locked}
                                          >
                                            Passed
                                          </button>
                                        </>
                                      )}
                                    </div>
                                  </div>

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
                                    {(locked || autoSyncedLab) && (
                                      <Lock className="w-4 h-4 text-slate-400" />
                                    )}
                                    {status === "inactive" &&
                                      !locked &&
                                      !autoSyncedLab && (
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

        {/* PATCH NOTES + FOOTER */}
        <div className="w-full border-t border-slate-200 bg-slate-50/80">
          <div className="max-w-6xl mx-auto px-4 py-6 space-y-4 text-sm text-slate-600">
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                PATCH NOTES
              </h2>
              <ul className="text-xs space-y-1 list-disc pl-4">
                <li>
                  <strong>v14:</strong> Introduced dedicated status buttons
                  (Inactive / Failed, Active, Passed) for each course instead
                  of click-cycling; added co-requisite display linking
                  Laboratory courses to their Lecture counterparts.
                </li>
                <li>
                  <strong>v15:</strong> Implemented automatic synchronization
                  for true co-requisite laboratory courses: their status now
                  mirrors the status of their Lecture (Inactive, Active,
                  Passed).
                </li>
                <li>
                  <strong>v16:</strong> Marked independent labs (e.g., CE0002L,
                  CE0003L, CE0011L) as fully controllable with their own
                  buttons, while keeping Lecture–Lab auto-sync only when a
                  matching Lecture course actually exists.
                </li>
                <li>
                  <strong>v17:</strong> Added Vercel Web Analytics and Speed
                  Insights integration, improved the header styling, and made
                  the overall progress bar more reliable and visible.
                </li>
                <li>
                  <strong>v18:</strong> Added term-level and year-level controls: “Mark all
                  courses this term as passed”, “Reset this term”, “Mark all
                  courses this year as passed”, and “Reset this year”.
                </li>
                <li>
                  <strong>v19:</strong> Updated header statistics to show Units
                  Completed, Units Active, and Units Remaining; completion
                  percentage and progress bar now reflect completed units only.
                </li>
                <li>
                  <strong>v20:</strong> Introduced separate views for Curriculum
                  Tracking and GPA Calculation for a cleaner experience.
                </li>
                <li>
                  <strong>v21:</strong> GPA Calculator now uses dropdowns with
                  fixed increments (0.0–4.0) for easier and more consistent
                  input.
                </li>
                <li>
                  Future versions will focus on UI refinements, export/backup
                  options, and support for curriculum changes or elective
                  tracks.
                </li>
              </ul>
            </section>

            <footer className="pt-2 border-t border-slate-200 text-[11px] text-slate-500">
              <p className="leading-relaxed">
                This is a personal and on-going project, and it's not affiliated
                with FEU Institute of Technology nor the FEU Tech Civil
                Engineering Department.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

// --- GPA CALCULATOR PAGE ---
const GpaCalculatorPage = ({ courseGPA, setCourseGPA }) => {
  const handleGpaChange = (courseId, value) => {
    if (value === "") {
      setCourseGPA((prev) => {
        const next = { ...prev };
        delete next[courseId];
        return next;
      });
      return;
    }

    const num = parseFloat(value);
    if (Number.isNaN(num)) return;

    setCourseGPA((prev) => ({
      ...prev,
      [courseId]: value,
    }));
  };

  // Global totals
  let TCU = 0;
  let TWQP = 0;

  CURRICULUM_DATA.forEach((year) =>
    year.terms.forEach((term) =>
      term.courses.forEach((course) => {
        const gpa = getNumericGpaFromMap(courseGPA, course.id);
        if (gpa !== null && gpa >= 0) {
          TCU += course.units;
          TWQP += course.units * gpa;
        }
      })
    )
  );

  const TGPA = TCU > 0 ? TWQP / TCU : 0;

  const computeTermGpa = (term) => {
    let tcu = 0;
    let twqp = 0;
    term.courses.forEach((course) => {
      const gpa = getNumericGpaFromMap(courseGPA, course.id);
      if (gpa !== null && gpa >= 0) {
        tcu += course.units;
        twqp += course.units * gpa;
      }
    });
    return {
      TCU: tcu,
      TWQP: twqp,
      TGPA: tcu > 0 ? twqp / tcu : 0,
    };
  };

  return (
    <>
      <div className="bg-indigo-900 text-white pb-20 pt-10 px-6 shadow-xl">
        <div className="max-w-6xl mx-auto flex flex-col gap-6 md:flex-row md:justify-between md:items-center">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Calculator className="w-8 h-8 text-indigo-200" />
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                GPA Calculator
              </h1>
            </div>
            <p className="text-indigo-100 opacity-90 text-sm md:text-base">
              Uses the Civil Engineering curriculum data for term and overall TGPA.
            </p>
          </div>

          <div className="bg-indigo-800/70 border border-indigo-400/60 rounded-xl px-4 py-3 text-xs md:text-sm max-w-sm">
            <p className="font-semibold mb-1">Formula Reference</p>
            <p className="font-mono text-[11px] leading-relaxed">
              WQP = Course Units × Quality Point (GPA)
              <br />
              TCU = Σ Course Units
              <br />
              TWQP = Σ WQP
              <br />
              TGPA = TWQP / TCU
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full">
        <div className="max-w-6xl mx-auto px-4 -mt-16 pb-12">
          {/* Overall GPA Summary */}
          <div className="bg-white rounded-lg p-4 mb-8 shadow-md">
            <h2 className="text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-600" />
              Overall GPA Summary
            </h2>

            <div className="grid grid-cols-3 gap-4 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-slate-500 uppercase tracking-wide text-[10px]">
                  TCU
                </div>
                <div className="text-lg font-semibold text-slate-900">
                  {TCU.toFixed(2)}
                </div>
                <div className="text-[10px] text-slate-400">
                  Total Course Units (with GPA entered)
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-slate-500 uppercase tracking-wide text-[10px]">
                  TWQP
                </div>
                <div className="text-lg font-semibold text-slate-900">
                  {TWQP.toFixed(3)}
                </div>
                <div className="text-[10px] text-slate-400">
                  Total Weighted Quality Points
                </div>
              </div>

              <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-200">
                <div className="text-indigo-600 uppercase tracking-wide text-[10px]">
                  TGPA
                </div>
                <div className="text-lg font-bold text-indigo-800">
                  {TGPA.toFixed(3)}
                </div>
                <div className="text-[10px] text-indigo-500">
                  Overall Grade Point Average
                </div>
              </div>
            </div>
          </div>

          {/* Per-year / per-term GPA inputs */}
          <div className="space-y-6">
            {CURRICULUM_DATA.map((year, yIdx) => (
              <div
                key={yIdx}
                className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
              >
                <div className="w-full flex justify-between items-center px-6 py-4 bg-slate-50 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="text-left">
                      <h2 className="font-semibold text-slate-800">
                        {year.year}
                      </h2>
                      <p className="text-[11px] text-slate-500">
                        Select your final term GPA for each course.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-3">
                  <div className="grid md:grid-cols-3 gap-4">
                    {year.terms.map((term, tIdx) => {
                      const stats = computeTermGpa(term);
                      return (
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
                              {stats.TCU > 0 && (
                                <p className="text-[11px] text-slate-500 mt-1">
                                  <span className="font-semibold">
                                    TGPA:
                                  </span>{" "}
                                  {stats.TGPA.toFixed(3)} ·{" "}
                                  <span className="font-mono">
                                    TCU={stats.TCU.toFixed(2)}, TWQP=
                                    {stats.TWQP.toFixed(3)}
                                  </span>
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="space-y-3 flex-grow">
                            {term.courses.map((course) => {
                              const gpa = getNumericGpaFromMap(
                                courseGPA,
                                course.id
                              );
                              const wqp =
                                gpa !== null && gpa >= 0
                                  ? course.units * gpa
                                  : null;

                              return (
                                <div
                                  key={course.id}
                                  className="relative p-4 rounded-xl border bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-200 flex justify-between items-start"
                                >
                                  <div className="flex-1 pr-3">
                                    <div className="flex items-center gap-2 mb-1.5">
                                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider bg-slate-100 text-slate-600">
                                        {course.id}
                                      </span>
                                      {isLabCourse(course) && (
                                        <span className="text-[9px] uppercase tracking-wide bg-slate-800 text-slate-50 px-1.5 py-0.5 rounded-full">
                                          Laboratory
                                        </span>
                                      )}
                                    </div>

                                    <h4 className="text-sm font-semibold leading-snug text-slate-800">
                                      {course.title}
                                    </h4>

                                    <div className="mt-2 flex flex-wrap items-center gap-2">
                                      <span className="text-xs text-slate-500">
                                        {course.units} Units
                                      </span>

                                      {/* GPA dropdown */}
                                      <div className="flex items-center gap-1 text-[11px] text-slate-500">
                                        <span>GPA:</span>
                                        <select
                                          className="w-20 px-1 py-0.5 text-[11px] border border-slate-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                          value={courseGPA[course.id] ?? ""}
                                          onChange={(e) =>
                                            handleGpaChange(
                                              course.id,
                                              e.target.value
                                            )
                                          }
                                        >
                                          {GPA_OPTIONS.map((opt) => (
                                            <option key={opt} value={opt}>
                                              {opt === "" ? "-" : opt}
                                            </option>
                                          ))}
                                        </select>
                                      </div>

                                      {wqp !== null && (
                                        <span className="text-[11px] text-indigo-700 font-mono bg-indigo-50 px-1.5 py-0.5 rounded">
                                          WQP: {wqp.toFixed(3)}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full border-t border-slate-200 bg-slate-50/80">
          <div className="max-w-6xl mx-auto px-4 py-6 text-[11px] text-slate-500">
            <p className="leading-relaxed">
              GPA values are stored locally in your browser (localStorage). Clear your
              browser storage if you want to reset all GPA inputs.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

// --- ROOT APP WITH SIMPLE PAGE SWITCHER ---
const App = () => {
  const [courseStatus, setCourseStatus] = useState({});
  const [courseGPA, setCourseGPA] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [activePage, setActivePage] = useState("tracker"); // "tracker" | "gpa"

  useEffect(() => {
    const savedData = localStorage.getItem("ce_tracker_data_v2");
    if (savedData) {
      setCourseStatus(JSON.parse(savedData));
    }

    const savedGpa = localStorage.getItem("ce_gpa_data_v1");
    if (savedGpa) {
      setCourseGPA(JSON.parse(savedGpa));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ce_tracker_data_v2", JSON.stringify(courseStatus));
  }, [courseStatus]);

  useEffect(() => {
    localStorage.setItem("ce_gpa_data_v1", JSON.stringify(courseGPA));
  }, [courseGPA]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <Analytics />
      <SpeedInsights />

      {/* Top navigation to switch pages */}
      <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-700" />
            <span className="font-semibold text-slate-800 text-sm md:text-base">
              BSCE Academic Tools
            </span>
          </div>
          <nav className="flex items-center gap-2 text-xs md:text-sm">
            <button
              type="button"
              onClick={() => setActivePage("tracker")}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs md:text-sm transition ${
                activePage === "tracker"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
              }`}
            >
              <LayoutTemplate className="w-4 h-4" />
              Curriculum Tracker
            </button>
            <button
              type="button"
              onClick={() => setActivePage("gpa")}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs md:text-sm transition ${
                activePage === "gpa"
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
              }`}
            >
              <Calculator className="w-4 h-4" />
              GPA Calculator
            </button>
          </nav>
        </div>
      </header>

      {activePage === "tracker" ? (
        <CurriculumTrackerPage
          courseStatus={courseStatus}
          setCourseStatus={setCourseStatus}
          errorMsg={errorMsg}
          setErrorMsg={setErrorMsg}
        />
      ) : (
        <GpaCalculatorPage courseGPA={courseGPA} setCourseGPA={setCourseGPA} />
      )}
    </div>
  );
};

export default App;
