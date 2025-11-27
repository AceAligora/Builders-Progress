import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Check,
  Lock,
  BookOpen,
  AlertCircle,
  BarChart3,
  ChevronRight,
  GraduationCap,
  Download,
  Upload,
  Copy,
  X,
  Calculator,
  LayoutTemplate,
  RotateCcw,
  List,
  LayoutGrid,
  Palette,
  Filter,
  Share2,
  Calendar,
  Target,
  AlertTriangle,
  Link2,
} from "lucide-react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Confetti from "react-confetti";

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

// GPA dropdown options
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

// Theme configurations
const THEMES = {
  feuGreen: {
    name: "FEU Green",
    heroGradient: "from-green-900 via-green-800 to-green-700",
    heroBg: "bg-green-900",
    heroText: "text-green-100",
    heroAccent: "text-green-200",
    headerBg: "bg-white",
    headerBorder: "border-slate-200",
    cardBg: "bg-white",
    cardBorder: "border-slate-200",
    cardHover: "hover:border-green-300",
    primaryBtn: "bg-green-600 hover:bg-green-700 border-green-600",
    primaryBtnText: "text-white",
    accentBg: "bg-green-50",
    accentBorder: "border-green-200",
    accentText: "text-green-700",
    secondaryBg: "bg-slate-50",
    textPrimary: "text-slate-800",
    textSecondary: "text-slate-600",
    textMuted: "text-slate-400",
    bodyBg: "bg-slate-50",
    passedBg: "bg-green-50",
    passedBorder: "border-green-200",
    passedBadge: "bg-green-100 text-green-700",
    takingBadge: "bg-green-500 text-green-50",
    progressBar: "from-green-500 to-emerald-400",
    navActive: "bg-green-600 text-white border-green-600",
  },
  dark: {
    name: "Dark Mode",
    heroGradient: "from-slate-900 via-slate-800 to-slate-700",
    heroBg: "bg-slate-900",
    heroText: "text-slate-300",
    heroAccent: "text-slate-400",
    headerBg: "bg-slate-900",
    headerBorder: "border-slate-700",
    cardBg: "bg-slate-800",
    cardBorder: "border-slate-700",
    cardHover: "hover:border-slate-500",
    primaryBtn: "bg-blue-600 hover:bg-blue-700 border-blue-600",
    primaryBtnText: "text-white",
    accentBg: "bg-slate-700",
    accentBorder: "border-slate-600",
    accentText: "text-blue-400",
    secondaryBg: "bg-slate-800",
    textPrimary: "text-slate-100",
    textSecondary: "text-slate-300",
    textMuted: "text-slate-500",
    bodyBg: "bg-slate-900",
    passedBg: "bg-slate-700",
    passedBorder: "border-blue-500",
    passedBadge: "bg-blue-900 text-blue-300",
    takingBadge: "bg-blue-500 text-blue-50",
    progressBar: "from-blue-500 to-cyan-400",
    navActive: "bg-blue-600 text-white border-blue-600",
  },
  highContrast: {
    name: "High Contrast",
    heroGradient: "from-black via-black to-gray-900",
    heroBg: "bg-black",
    heroText: "text-yellow-300",
    heroAccent: "text-yellow-400",
    headerBg: "bg-black",
    headerBorder: "border-yellow-400",
    cardBg: "bg-black",
    cardBorder: "border-yellow-400",
    cardHover: "hover:border-yellow-300",
    primaryBtn: "bg-yellow-400 hover:bg-yellow-300 border-yellow-400",
    primaryBtnText: "text-black",
    accentBg: "bg-gray-900",
    accentBorder: "border-yellow-400",
    accentText: "text-yellow-400",
    secondaryBg: "bg-gray-900",
    textPrimary: "text-white",
    textSecondary: "text-yellow-200",
    textMuted: "text-gray-400",
    bodyBg: "bg-black",
    passedBg: "bg-green-900",
    passedBorder: "border-green-400",
    passedBadge: "bg-green-900 text-green-300",
    takingBadge: "bg-yellow-400 text-black",
    progressBar: "from-yellow-400 to-yellow-300",
    navActive: "bg-yellow-400 text-black border-yellow-400",
  },
};

// Dean's lister GWA thresholds
const DEAN_LISTER_TARGETS = [
  { label: "Gold Dean's Lister", gwa: 1.0 },
  { label: "Silver Dean's Lister", gwa: 1.5 },
  { label: "Bronze Dean's Lister", gwa: 1.75 },
  { label: "Dean's Lister", gwa: 2.0 },
];

// Helper to build dependency chain (subjects that depend on a given subject)
const buildDependencyMap = () => {
  const dependencyMap = {}; // courseId -> array of courseIds that depend on it
  
  CURRICULUM_DATA.forEach((year) =>
    year.terms.forEach((term) =>
      term.courses.forEach((course) => {
        course.prereqs.forEach((prereqId) => {
          if (!dependencyMap[prereqId]) {
            dependencyMap[prereqId] = [];
          }
          dependencyMap[prereqId].push(course.id);
        });
      })
    )
  );
  
  return dependencyMap;
};

const DEPENDENCY_MAP = buildDependencyMap();

// Get all downstream dependencies (recursive)
const getAllDependents = (courseId, visited = new Set()) => {
  if (visited.has(courseId)) return [];
  visited.add(courseId);
  
  const directDependents = DEPENDENCY_MAP[courseId] || [];
  let allDependents = [...directDependents];
  
  directDependents.forEach((depId) => {
    allDependents = allDependents.concat(getAllDependents(depId, visited));
  });
  
  return [...new Set(allDependents)];
};

// Encode state to Base64 URL
const encodeStateToURL = (courseStatus, courseGPA, graduationDate) => {
  const state = {
    s: courseStatus,
    g: courseGPA,
    d: graduationDate,
  };
  const json = JSON.stringify(state);
  const base64 = btoa(encodeURIComponent(json));
  return base64;
};

// Decode state from Base64 URL
const decodeStateFromURL = (base64) => {
  try {
    const json = decodeURIComponent(atob(base64));
    const state = JSON.parse(json);
    return {
      courseStatus: state.s || {},
      courseGPA: state.g || {},
      graduationDate: state.d || "",
    };
  } catch (e) {
    return null;
  }
};

// Calculate terms until graduation
const calculateTermsRemaining = (targetDate) => {
  if (!targetDate) return null;
  const now = new Date();
  const target = new Date(targetDate);
  const diffTime = target - now;
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  // Assume ~4 months per term
  const terms = Math.ceil(diffDays / 120);
  return Math.max(0, terms);
};

// GPA helpers
const getNumericGpaFromMap = (map, courseId) => {
  const val = map[courseId];
  if (val === undefined || val === "") return null;
  const num = typeof val === "string" ? parseFloat(val) : val;
  if (Number.isNaN(num)) return null;
  return num;
};

// ---------------- CURRICULUM TRACKER PAGE ----------------
const CurriculumTrackerPage = ({
  courseStatus,
  setCourseStatus,
  errorMsg,
  setErrorMsg,
  successMsg,
  setSuccessMsg,
  theme,
  viewMode,
  setViewMode,
  showWhatCanITake,
  setShowWhatCanITake,
  hoveredCourse,
  setHoveredCourse,
  graduationDate,
  setGraduationDate,
  courseGPA,
  onShareLink,
  onConfetti,
}) => {
  const [expandedYear, setExpandedYear] = useState("First Year");
  const [showImportModal, setShowImportModal] = useState(false);
  const [importText, setImportText] = useState("");
  const [criticalPathWarning, setCriticalPathWarning] = useState(null);
  const fileInputRef = useRef(null);
  const t = THEMES[theme];

  const getCoreqLectureIdLocal = getCoreqLectureId;
  const isLabCourseLocal = isLabCourse;

  // Get highlighted courses (dependents of hovered course)
  const highlightedCourses = useMemo(() => {
    if (!hoveredCourse) return new Set();
    return new Set(getAllDependents(hoveredCourse));
  }, [hoveredCourse]);

  const isLocked = (course) => {
    if (isAutoSyncedLabId(course.id)) return true; // auto labs are read-only

    if (course.prereqs.length === 0) return false;
    const allPrereqsPassed = course.prereqs.every(
      (id) => courseStatus[id] === "passed"
    );
    return !allPrereqsPassed;
  };

  // Check if a course can be taken (all prereqs passed)
  const canTakeCourse = (course) => {
    if (course.prereqs.length === 0) return true;
    return course.prereqs.every((id) => courseStatus[id] === "passed");
  };

  // Sync auto labs so they always mirror their lecture (inactive/taking/passed)
  const syncLabsWithLectures = (statusMap) => {
    const updated = { ...statusMap };

    CURRICULUM_DATA.forEach((year) =>
      year.terms.forEach((term) =>
        term.courses.forEach((course) => {
          if (isAutoSyncedLabId(course.id)) {
            const lectureId = getCoreqLectureIdLocal(course.id);
            if (!lectureId) return;
            const lectureStatus = updated[lectureId] || "inactive";
            updated[course.id] = lectureStatus;
          }
        })
      )
    );

    return updated;
  };

  // Get course title by id
  const getCourseTitle = (courseId) => {
    for (const year of CURRICULUM_DATA) {
      for (const term of year.terms) {
        for (const course of term.courses) {
          if (course.id === courseId) return course.title;
        }
      }
    }
    return courseId;
  };

  const setCourseStatusWithValidation = (courseId, targetStatus, locked, previousStatus) => {
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

    // Critical path warning when marking as inactive/failed from passed
    if (targetStatus === "inactive" && previousStatus === "passed") {
      const dependents = getAllDependents(courseId);
      if (dependents.length > 0) {
        const dependentTitles = dependents.slice(0, 3).map(id => getCourseTitle(id));
        const moreCount = dependents.length > 3 ? ` and ${dependents.length - 3} more` : "";
        setCriticalPathWarning({
          courseId,
          message: `Delay Warning: This will delay your graduation by at least 1 term because it unlocks: ${dependentTitles.join(", ")}${moreCount}`,
        });
        setTimeout(() => setCriticalPathWarning(null), 6000);
      }
    }

    // Track if we're marking as passed for confetti
    const wasPassed = previousStatus !== "passed" && targetStatus === "passed";

    setCourseStatus((prev) => {
      const next = { ...prev, [courseId]: targetStatus };
      return syncLabsWithLectures(next);
    });

    // Trigger confetti for passed subject
    if (wasPassed && onConfetti) {
      onConfetti("small");
    }
  };

  const markTermAsPassed = (term) => {
    let anyChanged = false;
    setCourseStatus((prev) => {
      const next = { ...prev };

      term.courses.forEach((course) => {
        const autoLab = isAutoSyncedLabId(course.id);
        const locked = isLocked(course);
        if (!autoLab && !locked) {
          if (prev[course.id] !== "passed") {
            anyChanged = true;
          }
          next[course.id] = "passed";
        }
      });

      const synced = syncLabsWithLectures(next);

      if (!anyChanged) {
        setErrorMsg(
          "No additional courses in this term can be marked as passed yet."
        );
        setTimeout(() => setErrorMsg(""), 3000);
      }

      return synced;
    });
    
    if (anyChanged && onConfetti) {
      onConfetti("small");
    }
  };

  // Reset all courses in a term to inactive
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

  // Check if entire year is completed
  const isYearCompleted = (year) => {
    return year.terms.every((term) =>
      term.courses.every((course) => courseStatus[course.id] === "passed")
    );
  };

  // Mark all courses in a year as passed (IGNORE prereq locks for this bulk action)
  const markYearAsPassed = (year) => {
    const wasCompleted = isYearCompleted(year);
    
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

    // Trigger big confetti for year completion
    if (!wasCompleted && onConfetti) {
      onConfetti("big");
    }
  };

  // Reset all courses in a year to inactive
  const resetYear = (year) => {
    setCourseStatus((prev) => {
      const next = { ...prev };

      year.terms.forEach((term) => {
        term.courses.forEach((course) => {
          next[course.id] = "inactive";
        });
      });

      const synced = syncLabsWithLectures(next);
      return synced;
    });
  };

  // --- DATA MANAGEMENT (tracker) ---

  const exportToClipboard = async () => {
    try {
      const data = localStorage.getItem("ce_tracker_data_v2") || "{}";
      await navigator.clipboard.writeText(data);
      setSuccessMsg("Tracker data copied to clipboard!");
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err) {
      console.error("Clipboard export failed:", err);
      setErrorMsg("Failed to copy to clipboard. Please try the download option.");
      setTimeout(() => setErrorMsg(""), 3000);
    }
  };

  const exportToFile = () => {
    const data = localStorage.getItem("ce_tracker_data_v2") || "{}";
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const dateStr = new Date().toISOString().split("T")[0];
    a.download = `builders-progress-tracker-backup-${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setSuccessMsg("Tracker data exported successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const importFromText = () => {
    try {
      const parsed = JSON.parse(importText.trim());
      if (typeof parsed !== "object" || parsed === null) {
        throw new Error("Invalid format");
      }
      const synced = syncLabsWithLectures(parsed);
      setCourseStatus(synced);
      setShowImportModal(false);
      setImportText("");
      setSuccessMsg("Tracker data imported successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("Import from text failed:", err);
      setErrorMsg("Invalid data format. Please paste valid JSON data.");
      setTimeout(() => setErrorMsg(""), 3000);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result;
        const parsed = JSON.parse(content);
        if (typeof parsed !== "object" || parsed === null) {
          throw new Error("Invalid format");
        }
        const synced = syncLabsWithLectures(parsed);
        setCourseStatus(synced);
        setShowImportModal(false);
        setImportText("");
        setSuccessMsg("Tracker data imported successfully from file!");
        setTimeout(() => setSuccessMsg(""), 3000);
      } catch (err) {
        console.error("Import from file failed:", err);
        setErrorMsg("Invalid file format. Please select a valid backup file.");
        setTimeout(() => setErrorMsg(""), 3000);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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

  // Calculate terms remaining
  const termsRemaining = calculateTermsRemaining(graduationDate);

  return (
    <>
      {/* HERO HEADER */}
      <div className={`${t.heroBg} text-white pb-24 pt-10 px-6 shadow-xl`}>
        <div className="max-w-6xl mx-auto flex flex-col gap-6 md:flex-row md:justify-between md:items-center">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap className={`w-8 h-8 ${t.heroAccent}`} />
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Academic Tracker
              </h1>
            </div>
            <p className={`${t.heroText} opacity-90 text-sm md:text-base`}>
              Civil Engineering • BSCE Curriculum (FEU Institute of Technology)
            </p>
            {/* Graduation Countdown */}
            {termsRemaining !== null && (
              <div className={`mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full ${t.accentBg} ${t.accentText} text-sm font-medium`}>
                <Calendar className="w-4 h-4" />
                {termsRemaining === 0 ? "🎓 Graduation Time!" : `${termsRemaining} Term${termsRemaining !== 1 ? 's' : ''} to go!`}
              </div>
            )}
          </div>

          {/* Summary stats */}
          <div className={`grid grid-cols-3 gap-4 bg-gradient-to-r ${t.heroGradient} p-4 rounded-xl border border-white/20 backdrop-blur-sm text-center text-xs md:text-sm`}>
            <div>
              <span className="block text-lg md:text-2xl font-bold">
                {completedUnits}
              </span>
              <span className={`uppercase tracking-wider ${t.heroText}`}>
                Units Completed
              </span>
              <span className={`block text-[10px] md:text-xs ${t.heroText} opacity-80 mt-1`}>
                ({passedCourses} courses)
              </span>
            </div>
            <div className="border-x border-white/30 px-3">
              <span className="block text-lg md:text-2xl font-bold">
                {activeUnits}
              </span>
              <span className={`uppercase tracking-wider ${t.heroText}`}>
                Units Active
              </span>
              <span className={`block text-[10px] md:text-xs ${t.heroText} opacity-80 mt-1`}>
                ({activeCourses} courses)
              </span>
            </div>
            <div>
              <span className="block text-lg md:text-2xl font-bold">
                {remainingUnits}
              </span>
              <span className={`uppercase tracking-wider ${t.heroText}`}>
                Units Remaining
              </span>
              <span className={`block text-[10px] md:text-xs ${t.heroText} opacity-80 mt-1`}>
                ({inactiveCourses} courses)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 w-full">
        <div className="max-w-6xl mx-auto px-4 -mt-16 pb-12">
          {errorMsg && (
            <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 ${t.cardBg} border-l-4 border-red-500 ${t.textPrimary} px-6 py-4 rounded-r shadow-2xl z-50 flex items-center`}>
              <AlertCircle className="w-5 h-5 mr-3 text-red-500" />
              <span className="font-medium">{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 ${t.cardBg} border-l-4 border-green-500 ${t.textPrimary} px-6 py-4 rounded-r shadow-2xl z-50 flex items-center`}>
              <Check className="w-5 h-5 mr-3 text-green-500" />
              <span className="font-medium">{successMsg}</span>
            </div>
          )}

          {/* Critical Path Warning */}
          {criticalPathWarning && (
            <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 ${t.cardBg} border-l-4 border-orange-500 ${t.textPrimary} px-6 py-4 rounded-r shadow-2xl z-50 flex items-center max-w-lg`}>
              <AlertTriangle className="w-5 h-5 mr-3 text-orange-500 flex-shrink-0" />
              <span className="font-medium text-sm">{criticalPathWarning.message}</span>
            </div>
          )}

          {/* Import Modal */}
          {showImportModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className={`${t.cardBg} rounded-xl shadow-2xl max-w-md w-full p-6`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`text-lg font-semibold ${t.textPrimary}`}>Import Data</h3>
                  <button
                    onClick={() => {
                      setShowImportModal(false);
                      setImportText("");
                    }}
                    className={`${t.textMuted} hover:${t.textSecondary}`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className={`text-sm ${t.textSecondary} mb-4`}>
                  Paste your exported data below, or upload a backup file to restore your progress.
                </p>

                <textarea
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder='Paste your JSON data here (e.g., {"COE0001":"passed",...})'
                  className={`w-full h-32 p-3 border ${t.cardBorder} rounded-lg text-sm font-mono resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${t.cardBg} ${t.textPrimary}`}
                />

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={importFromText}
                    disabled={!importText.trim()}
                    className={`flex-1 ${t.primaryBtn} ${t.primaryBtnText} py-2 px-4 rounded-lg text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    Import from Text
                  </button>
                  <label className="flex-1">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept=".json"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <span className={`block w-full text-center ${t.secondaryBg} ${t.textSecondary} py-2 px-4 rounded-lg text-sm font-medium hover:opacity-80 transition cursor-pointer`}>
                      Upload File
                    </span>
                  </label>
                </div>

                <p className={`text-xs ${t.textMuted} mt-4 text-center`}>
                  This will replace your current progress data.
                </p>
              </div>
            </div>
          )}

          {/* TOOLBAR - View Toggle, What Can I Take, Share Link */}
          <div className={`${t.cardBg} rounded-lg p-3 mb-4 shadow-md flex flex-wrap items-center justify-between gap-3`}>
            <div className="flex items-center gap-2">
              {/* View Mode Toggle */}
              <div className={`flex items-center gap-1 ${t.secondaryBg} rounded-lg p-1`}>
                <button
                  onClick={() => setViewMode("card")}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition flex items-center gap-1 ${
                    viewMode === "card"
                      ? `${t.primaryBtn} ${t.primaryBtnText}`
                      : `${t.textSecondary} hover:${t.textPrimary}`
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  Card
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition flex items-center gap-1 ${
                    viewMode === "list"
                      ? `${t.primaryBtn} ${t.primaryBtnText}`
                      : `${t.textSecondary} hover:${t.textPrimary}`
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  List
                </button>
              </div>

              {/* What Can I Take Filter */}
              <button
                onClick={() => setShowWhatCanITake(!showWhatCanITake)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 border ${
                  showWhatCanITake
                    ? `${t.primaryBtn} ${t.primaryBtnText}`
                    : `${t.cardBorder} ${t.textSecondary} hover:${t.textPrimary}`
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                What Can I Take?
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Share Link Button */}
              <button
                onClick={onShareLink}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 border ${t.cardBorder} ${t.textSecondary} hover:${t.textPrimary}`}
              >
                <Share2 className="w-3.5 h-3.5" />
                Share Progress
              </button>

              {/* Graduation Date Picker */}
              <div className="flex items-center gap-1.5">
                <Calendar className={`w-3.5 h-3.5 ${t.textMuted}`} />
                <input
                  type="date"
                  value={graduationDate}
                  onChange={(e) => setGraduationDate(e.target.value)}
                  className={`px-2 py-1 rounded border ${t.cardBorder} ${t.cardBg} ${t.textPrimary} text-xs`}
                  placeholder="Target Graduation"
                />
              </div>
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className={`${t.cardBg} rounded-lg p-3 mb-8 shadow-md flex flex-col gap-2`}>
            <div className={`flex justify-between items-center text-xs ${t.textMuted}`}>
              <span>Overall Progress</span>
              <span>{percentage}%</span>
            </div>
            <div className={`relative h-3 w-full ${t.secondaryBg} rounded-full overflow-hidden`}>
              <div className={`absolute inset-0 ${t.secondaryBg}`} />
              <div
                className={`relative h-full bg-gradient-to-r ${t.progressBar} transition-all duration-700 ease-out`}
                style={{
                  width: `${barWidth}%`,
                  maxWidth: "100%",
                  minWidth: barWidth > 0 ? "8px" : "0px",
                }}
              />
            </div>
          </div>

          {/* CURRICULUM DISPLAY */}
          <div className="space-y-6">
            {CURRICULUM_DATA.map((year, yIdx) => {
              // Filter courses for "What Can I Take" mode
              const filteredTerms = year.terms.map(term => ({
                ...term,
                courses: showWhatCanITake 
                  ? term.courses.filter(course => 
                      canTakeCourse(course) && 
                      courseStatus[course.id] !== "passed" &&
                      !isAutoSyncedLabId(course.id)
                    )
                  : term.courses
              }));
              
              // Skip year if no courses match filter
              if (showWhatCanITake && filteredTerms.every(t => t.courses.length === 0)) {
                return null;
              }
              
              return (
              <div
                key={yIdx}
                className={`${t.cardBg} rounded-xl shadow-sm border ${t.cardBorder} overflow-hidden`}
              >
                <div className={`w-full flex justify-between items-center px-6 py-4 ${t.secondaryBg} hover:opacity-90 transition-colors border-b ${t.cardBorder}`}>
                  <button
                    onClick={() =>
                      setExpandedYear(
                        expandedYear === year.year ? null : year.year
                      )
                    }
                    className="flex items-center gap-3"
                  >
                    <div className={`w-9 h-9 rounded-full ${t.accentBg} flex items-center justify-center`}>
                      <BarChart3 className={`w-4 h-4 ${t.accentText}`} />
                    </div>
                    <div className="text-left">
                      <h2 className={`font-semibold ${t.textPrimary}`}>
                        {year.year}
                      </h2>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 ${t.textMuted} transition-transform ${
                        expandedYear === year.year ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  {/* Year-level controls */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => markYearAsPassed(year)}
                      className={`text-[11px] px-3 py-1 rounded-full border border-green-500 text-green-700 ${t.accentBg} hover:opacity-80 transition`}
                    >
                      Mark all courses this year as passed
                    </button>
                    <button
                      type="button"
                      onClick={() => resetYear(year)}
                      className={`text-[11px] px-3 py-1 rounded-full border ${t.cardBorder} ${t.textSecondary} ${t.cardBg} hover:opacity-80 transition`}
                    >
                      Reset this year
                    </button>
                  </div>
                </div>

                {expandedYear === year.year && (
                  <div className="px-4 pb-4 pt-3">
                    {/* List View */}
                    {viewMode === "list" ? (
                      <div className="overflow-x-auto">
                        <table className={`w-full text-xs ${t.textPrimary}`}>
                          <thead>
                            <tr className={`border-b ${t.cardBorder}`}>
                              <th className="text-left py-2 px-2 font-semibold">Code</th>
                              <th className="text-left py-2 px-2 font-semibold">Title</th>
                              <th className="text-center py-2 px-2 font-semibold">Units</th>
                              <th className="text-center py-2 px-2 font-semibold">Term</th>
                              <th className="text-center py-2 px-2 font-semibold">Status</th>
                              <th className="text-center py-2 px-2 font-semibold">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredTerms.flatMap((term, tIdx) =>
                              term.courses.map((course) => {
                                const status = courseStatus[course.id] || "inactive";
                                const autoSyncedLab = isAutoSyncedLabId(course.id);
                                const locked = isLocked(course);
                                const isHighlighted = highlightedCourses.has(course.id);
                                const isHovered = hoveredCourse === course.id;

                                return (
                                  <tr 
                                    key={course.id} 
                                    className={`border-b ${t.cardBorder} ${
                                      isHighlighted ? 'bg-yellow-100 dark:bg-yellow-900/30' : 
                                      isHovered ? 'bg-blue-50 dark:bg-blue-900/30' : ''
                                    } ${status === 'passed' ? t.passedBg : ''}`}
                                    onMouseEnter={() => setHoveredCourse(course.id)}
                                    onMouseLeave={() => setHoveredCourse(null)}
                                  >
                                    <td className="py-2 px-2 font-mono">{course.id}</td>
                                    <td className="py-2 px-2">{course.title}</td>
                                    <td className="py-2 px-2 text-center">{course.units}</td>
                                    <td className="py-2 px-2 text-center">{term.termName}</td>
                                    <td className="py-2 px-2 text-center">
                                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                                        status === 'passed' ? 'bg-green-100 text-green-700' :
                                        status === 'taking' ? 'bg-blue-100 text-blue-700' :
                                        'bg-slate-100 text-slate-500'
                                      }`}>
                                        {status === 'passed' ? 'Passed' : status === 'taking' ? 'Active' : 'Inactive'}
                                      </span>
                                    </td>
                                    <td className="py-2 px-2 text-center">
                                      {autoSyncedLab ? (
                                        <span className={`text-[10px] ${t.textMuted}`}>Auto-sync</span>
                                      ) : (
                                        <div className="flex gap-1 justify-center">
                                          <button
                                            onClick={() => setCourseStatusWithValidation(course.id, "inactive", locked, status)}
                                            className={`px-1.5 py-0.5 rounded text-[9px] ${status === 'inactive' ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                                          >
                                            I
                                          </button>
                                          <button
                                            onClick={() => setCourseStatusWithValidation(course.id, "taking", locked, status)}
                                            disabled={locked}
                                            className={`px-1.5 py-0.5 rounded text-[9px] ${status === 'taking' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'} ${locked ? 'opacity-50 cursor-not-allowed' : ''}`}
                                          >
                                            A
                                          </button>
                                          <button
                                            onClick={() => setCourseStatusWithValidation(course.id, "passed", locked, status)}
                                            disabled={locked}
                                            className={`px-1.5 py-0.5 rounded text-[9px] ${status === 'passed' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700 hover:bg-green-200'} ${locked ? 'opacity-50 cursor-not-allowed' : ''}`}
                                          >
                                            P
                                          </button>
                                        </div>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })
                            )}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                    /* Card View */
                    <div className="grid md:grid-cols-3 gap-4">
                      {filteredTerms.map((term, tIdx) => (
                        <div key={tIdx} className="flex flex-col">
                          <div className="mb-3 flex justify-between items-center px-1">
                            <div>
                              <h3 className={`font-semibold ${t.textSecondary} uppercase tracking-wide text-sm`}>
                                {term.termName}
                              </h3>
                              <p className={`text-[11px] ${t.textMuted}`}>
                                {term.courses.reduce(
                                  (acc, c) => acc + c.units,
                                  0
                                )}{" "}
                                Units Total
                              </p>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              <button
                                type="button"
                                onClick={() => markTermAsPassed(year.terms[tIdx])}
                                className={`text-[10px] px-2 py-1 rounded-full border border-green-500 text-green-700 ${t.accentBg} hover:opacity-80 transition`}
                              >
                                Mark all courses this term as passed
                              </button>
                              <button
                                type="button"
                                onClick={() => resetTerm(year.terms[tIdx])}
                                className={`text-[10px] px-2 py-1 rounded-full border ${t.cardBorder} ${t.textSecondary} ${t.cardBg} hover:opacity-80 transition`}
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
                              const lab = isLabCourseLocal(course);
                              const locked = isLocked(course);
                              const coreqLectureId =
                                autoSyncedLab &&
                                getCoreqLectureIdLocal(course.id);
                              const isHighlighted = highlightedCourses.has(course.id);
                              const isHovered = hoveredCourse === course.id;

                              let baseStyle =
                                "relative p-4 rounded-xl border transition-all duration-200 flex justify-between items-start group shadow-sm ";

                              if (isHighlighted) {
                                baseStyle += `bg-yellow-100 border-yellow-400 shadow-lg ring-2 ring-yellow-400 `;
                              } else if (isHovered) {
                                baseStyle += `bg-blue-100 border-blue-400 shadow-lg ring-2 ring-blue-400 `;
                              } else if (status === "passed") {
                                baseStyle +=
                                  `${t.passedBg} ${t.passedBorder} shadow-md `;
                              } else if (status === "taking") {
                                baseStyle +=
                                  `${t.cardBg} border-blue-200 hover:shadow-md hover:border-blue-400 `;
                              } else if (locked && autoSyncedLab) {
                                baseStyle +=
                                  `${t.secondaryBg} ${t.cardBorder} opacity-60 grayscale `;
                              } else if (locked) {
                                baseStyle +=
                                  `${t.secondaryBg} ${t.cardBorder} opacity-60 `;
                              } else {
                                baseStyle +=
                                  `${t.cardBg} ${t.cardBorder} ${t.cardHover} hover:shadow-md `;
                              }

                              return (
                                <div 
                                  key={course.id} 
                                  className={baseStyle}
                                  onMouseEnter={() => setHoveredCourse(course.id)}
                                  onMouseLeave={() => setHoveredCourse(null)}
                                >
                                  <div className="flex-1 pr-3">
                                    <div className="flex items-center gap-2 mb-1.5">
                                      <span
                                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider
                                        ${
                                          status === "taking"
                                            ? t.takingBadge
                                            : status === "passed"
                                            ? t.passedBadge
                                            : `${t.secondaryBg} ${t.textMuted}`
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
                                      className={`text-sm font-semibold leading-snug ${t.textPrimary}`}
                                    >
                                      {course.title}
                                    </h4>

                                    <div className="mt-2 flex items-center gap-2">
                                      <span
                                        className={`text-xs ${
                                          status === "taking"
                                            ? t.accentText
                                            : t.textMuted
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
                                      <div className={`mt-1 text-[10px] ${t.accentText} ${t.accentBg} inline-flex items-center px-2 py-0.5 rounded-full`}>
                                        Co-requisite: {coreqLectureId}
                                      </div>
                                    )}

                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                      {autoSyncedLab ? (
                                        <span className={`text-[10px] ${t.textMuted} italic`}>
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
                                                locked,
                                                status
                                              )
                                            }
                                            className={`text-[10px] px-2 py-1 rounded-full border transition ${
                                              status === "inactive"
                                                ? "bg-slate-800 text-white border-slate-800"
                                                : `${t.cardBg} ${t.textSecondary} ${t.cardBorder} hover:opacity-80`
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
                                                locked,
                                                status
                                              )
                                            }
                                            className={`text-[10px] px-2 py-1 rounded-full border transition ${
                                              status === "taking"
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : `${t.cardBg} text-blue-700 border-blue-300 hover:bg-blue-50`
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
                                                locked,
                                                status
                                              )
                                            }
                                            className={`text-[10px] px-2 py-1 rounded-full border transition ${
                                              status === "passed"
                                                ? "bg-green-600 text-white border-green-600"
                                                : `${t.cardBg} text-green-700 border-green-300 hover:bg-green-50`
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
                                      <div className={`${t.accentBg} p-1 rounded-full`}>
                                        <Check className={`w-4 h-4 ${t.accentText}`} />
                                      </div>
                                    )}
                                    {status === "taking" && (
                                      <div className="bg-white/20 p-1 rounded-full">
                                        <BookOpen className={`w-4 h-4 ${t.accentText}`} />
                                      </div>
                                    )}
                                    {(locked || autoSyncedLab) && status !== "passed" && status !== "taking" && (
                                      <Lock className={`w-4 h-4 ${t.textMuted}`} />
                                    )}
                                    {status === "inactive" &&
                                      !locked &&
                                      !autoSyncedLab && (
                                        <div className={`w-6 h-6 rounded-full border-2 ${t.cardBorder} group-hover:border-blue-300`}></div>
                                      )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                    )}
                  </div>
                )}
              </div>
            );})}
          </div>
        </div>

        {/* DATA MANAGEMENT + FOOTER */}
        <div className={`w-full border-t ${t.cardBorder} ${t.secondaryBg}`}>
          <div className={`max-w-6xl mx-auto px-4 py-6 space-y-4 text-sm ${t.textSecondary}`}>
            {/* Data Management Section */}
            <section>
              <h2 className={`text-xs font-semibold uppercase tracking-wide ${t.textMuted} mb-2`}>
                DATA MANAGEMENT (Tracker)
              </h2>
              <p className={`text-xs ${t.textMuted} mb-3`}>
                Transfer your tracker progress between the main site and preview site, or create a backup of your data.
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={exportToClipboard}
                  className={`inline-flex items-center gap-2 px-3 py-2 ${t.cardBg} border ${t.cardBorder} rounded-lg text-xs font-medium ${t.textSecondary} hover:opacity-80 transition`}
                >
                  <Copy className="w-4 h-4" />
                  Copy Tracker Data
                </button>
                <button
                  onClick={exportToFile}
                  className={`inline-flex items-center gap-2 px-3 py-2 ${t.cardBg} border ${t.cardBorder} rounded-lg text-xs font-medium ${t.textSecondary} hover:opacity-80 transition`}
                >
                  <Download className="w-4 h-4" />
                  Download Tracker Backup
                </button>
                <button
                  onClick={() => setShowImportModal(true)}
                  className={`inline-flex items-center gap-2 px-3 py-2 ${t.primaryBtn} rounded-lg text-xs font-medium ${t.primaryBtnText} transition`}
                >
                  <Upload className="w-4 h-4" />
                  Import Tracker Data
                </button>
              </div>
            </section>

            {/* Patch notes */}
            <section>
              <h2 className={`text-xs font-semibold uppercase tracking-wide ${t.textMuted} mb-2`}>
                PATCH NOTES
              </h2>
              <ul className="text-xs space-y-1 list-disc pl-4">
                <li>
                  <strong>v22:</strong> Added Compact vs Card View toggle, Theme Customizer
                  (FEU Green, Dark Mode, High Contrast), "What Can I Take?" filter,
                  Chain Visualizer, Critical Path Warning, Target Grade Calculator, 
                  Shareable State Link, Graduation Countdown, and Confetti celebrations.
                </li>
                <li>
                  <strong>v21+:</strong> Added separate Curriculum Tracker and GPA
                  Calculator views with lecture-lab GPA auto-sync and data management.
                </li>
              </ul>
            </section>

            {/* Footer disclaimer */}
            <footer className={`pt-2 border-t ${t.cardBorder} text-[11px] ${t.textMuted}`}>
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

// ---------------- GPA CALCULATOR PAGE ----------------
const GpaCalculatorPage = ({ courseGPA, setCourseGPA, errorMsg, setErrorMsg, successMsg, setSuccessMsg, theme, remainingUnits }) => {
  const [showGpaImportModal, setShowGpaImportModal] = useState(false);
  const [gpaImportText, setGpaImportText] = useState("");
  const [targetGWA, setTargetGWA] = useState("");
  const gpaFileInputRef = useRef(null);
  const t = THEMES[theme];

  // Sync lab GPAs when lecture GPA changes
  const syncLabGpasForLecture = (lectureId, nextMap) => {
    const updated = { ...nextMap };

    CURRICULUM_DATA.forEach((year) =>
      year.terms.forEach((term) =>
        term.courses.forEach((course) => {
          if (isAutoSyncedLabId(course.id)) {
            const coreqLectureId = getCoreqLectureId(course.id);
            if (coreqLectureId === lectureId) {
              updated[course.id] = updated[lectureId] ?? "";
            }
          }
        })
      )
    );

    return updated;
  };

  const handleGpaChange = (courseId, value) => {
    // Co-requisite labs are locked; they always mirror lecture GPA
    if (isAutoSyncedLabId(courseId)) {
      return;
    }

    if (value === "") {
      setCourseGPA((prev) => {
        const base = { ...prev };
        delete base[courseId];
        return syncLabGpasForLecture(courseId, base);
      });
      return;
    }

    const num = parseFloat(value);
    if (Number.isNaN(num)) return;

    setCourseGPA((prev) => {
      const base = { ...prev, [courseId]: value };
      return syncLabGpasForLecture(courseId, base);
    });
  };

  const resetTermGpa = (term) => {
    setCourseGPA((prev) => {
      const next = { ...prev };
      term.courses.forEach((course) => {
        delete next[course.id];
      });
      return next;
    });
  };

  const resetYearGpa = (year) => {
    setCourseGPA((prev) => {
      const next = { ...prev };
      year.terms.forEach((term) =>
        term.courses.forEach((course) => {
          delete next[course.id];
        })
      );
      return next;
    });
  };

  // --- DATA MANAGEMENT (GPA) ---

  const exportGpaToClipboard = async () => {
    try {
      const data = localStorage.getItem("ce_gpa_data_v1") || "{}";
      await navigator.clipboard.writeText(data);
      setSuccessMsg("GPA data copied to clipboard!");
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err) {
      console.error("GPA clipboard export failed:", err);
      setErrorMsg("Failed to copy GPA data. Please try the download option.");
      setTimeout(() => setErrorMsg(""), 3000);
    }
  };

  const exportGpaToFile = () => {
    const data = localStorage.getItem("ce_gpa_data_v1") || "{}";
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const dateStr = new Date().toISOString().split("T")[0];
    a.download = `builders-progress-gpa-backup-${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setSuccessMsg("GPA data exported successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const importGpaFromText = () => {
    try {
      const parsed = JSON.parse(gpaImportText.trim());
      if (typeof parsed !== "object" || parsed === null) {
        throw new Error("Invalid format");
      }
      setCourseGPA(parsed);
      setShowGpaImportModal(false);
      setGpaImportText("");
      setSuccessMsg("GPA data imported successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("GPA import from text failed:", err);
      setErrorMsg("Invalid GPA data format. Please paste valid JSON data.");
      setTimeout(() => setErrorMsg(""), 3000);
    }
  };

  const handleGpaFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result;
        const parsed = JSON.parse(content);
        if (typeof parsed !== "object" || parsed === null) {
          throw new Error("Invalid format");
        }
        setCourseGPA(parsed);
        setShowGpaImportModal(false);
        setGpaImportText("");
        setSuccessMsg("GPA data imported successfully from file!");
        setTimeout(() => setSuccessMsg(""), 3000);
      } catch (err) {
        console.error("GPA import from file failed:", err);
        setErrorMsg("Invalid GPA backup file. Please select a valid file.");
        setTimeout(() => setErrorMsg(""), 3000);
      }
    };
    reader.readAsText(file);
    if (gpaFileInputRef.current) {
      gpaFileInputRef.current.value = "";
    }
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

  // Calculate required GPA for target
  const calculateRequiredGPA = (targetGWA) => {
    if (!targetGWA || remainingUnits <= 0) return null;
    const target = parseFloat(targetGWA);
    if (isNaN(target)) return null;
    
    // Total target = (current TWQP + remaining_units * required_avg) / (TCU + remaining_units) = target
    // required_avg = (target * (TCU + remaining_units) - current TWQP) / remaining_units
    const totalUnitsWithRemaining = TCU + remainingUnits;
    const requiredTotal = target * totalUnitsWithRemaining;
    const requiredForRemaining = (requiredTotal - TWQP) / remainingUnits;
    
    return requiredForRemaining;
  };

  const requiredGPA = calculateRequiredGPA(targetGWA);

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
      <div className={`${t.heroBg} text-white pb-20 pt-10 px-6 shadow-xl`}>
        <div className="max-w-6xl mx-auto flex flex-col gap-6 md:flex-row md:justify-between md:items-center">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Calculator className={`w-8 h-8 ${t.heroAccent}`} />
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                GPA Calculator
              </h1>
            </div>
            <p className={`${t.heroText} opacity-90 text-sm md:text-base`}>
              Uses the Civil Engineering curriculum for per-term and overall TGPA.
            </p>
          </div>

          <div className={`${t.accentBg} border ${t.accentBorder} rounded-xl px-4 py-3 text-xs md:text-sm max-w-sm`}>
            <p className={`font-semibold mb-1 ${t.textPrimary}`}>Formula Reference</p>
            <p className={`font-mono text-[11px] leading-relaxed ${t.textSecondary}`}>
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
          <div className={`${t.cardBg} rounded-lg p-4 mb-4 shadow-md`}>
            <h2 className={`text-sm font-semibold ${t.textPrimary} mb-2 flex items-center gap-2`}>
              <BarChart3 className={`w-4 h-4 ${t.accentText}`} />
              Overall GPA Summary
            </h2>

            <div className="grid grid-cols-3 gap-4 text-xs">
              <div className={`p-3 rounded-lg ${t.secondaryBg} border ${t.cardBorder}`}>
                <div className={`${t.textMuted} uppercase tracking-wide text-[10px]`}>
                  TCU
                </div>
                <div className={`text-lg font-semibold ${t.textPrimary}`}>
                  {TCU.toFixed(2)}
                </div>
                <div className={`text-[10px] ${t.textMuted}`}>
                  Total Course Units (with GPA entered)
                </div>
              </div>

              <div className={`p-3 rounded-lg ${t.secondaryBg} border ${t.cardBorder}`}>
                <div className={`${t.textMuted} uppercase tracking-wide text-[10px]`}>
                  TWQP
                </div>
                <div className={`text-lg font-semibold ${t.textPrimary}`}>
                  {TWQP.toFixed(3)}
                </div>
                <div className={`text-[10px] ${t.textMuted}`}>
                  Total Weighted Quality Points
                </div>
              </div>

              <div className={`p-3 rounded-lg ${t.accentBg} border ${t.accentBorder}`}>
                <div className={`${t.accentText} uppercase tracking-wide text-[10px]`}>
                  TGPA
                </div>
                <div className={`text-lg font-bold ${t.accentText}`}>
                  {TGPA.toFixed(3)}
                </div>
                <div className={`text-[10px] ${t.textMuted}`}>
                  Overall Grade Point Average
                </div>
              </div>
            </div>
          </div>

          {/* Target Grade Calculator */}
          <div className={`${t.cardBg} rounded-lg p-4 mb-8 shadow-md`}>
            <h2 className={`text-sm font-semibold ${t.textPrimary} mb-3 flex items-center gap-2`}>
              <Target className={`w-4 h-4 ${t.accentText}`} />
              Target Grade Calculator
            </h2>
            
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <label className={`text-xs ${t.textSecondary}`}>I want to achieve:</label>
                <select
                  value={targetGWA}
                  onChange={(e) => setTargetGWA(e.target.value)}
                  className={`px-3 py-1.5 rounded border ${t.cardBorder} ${t.cardBg} ${t.textPrimary} text-sm`}
                >
                  <option value="">Select target...</option>
                  {DEAN_LISTER_TARGETS.map((target) => (
                    <option key={target.gwa} value={target.gwa}>
                      {target.label} ({target.gwa} GWA)
                    </option>
                  ))}
                  <option value="2.25">2.25 GWA</option>
                  <option value="2.5">2.5 GWA</option>
                  <option value="3.0">3.0 GWA</option>
                </select>
              </div>
              
              {targetGWA && remainingUnits > 0 && (
                <div className={`flex-1 p-3 rounded-lg ${t.accentBg} border ${t.accentBorder}`}>
                  {requiredGPA !== null && (
                    <div>
                      {requiredGPA < 0 ? (
                        <p className={`text-sm ${t.accentText}`}>
                          🎉 You've already achieved this target!
                        </p>
                      ) : requiredGPA > 4.0 ? (
                        <p className="text-sm text-red-600">
                          ⚠️ Unfortunately, this target may not be achievable with your current GPA.
                        </p>
                      ) : (
                        <p className={`text-sm ${t.textPrimary}`}>
                          📊 You need to average <span className={`font-bold ${t.accentText}`}>{requiredGPA.toFixed(2)}</span> in your remaining <span className="font-bold">{remainingUnits}</span> units to hit this goal.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Per-year / per-term GPA inputs */}
          <div className="space-y-6">
            {CURRICULUM_DATA.map((year, yIdx) => (
              <div
                key={yIdx}
                className={`${t.cardBg} rounded-xl shadow-sm border ${t.cardBorder} overflow-hidden`}
              >
                <div className={`w-full flex justify-between items-center px-6 py-4 ${t.secondaryBg} border-b ${t.cardBorder}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full ${t.accentBg} flex items-center justify-center`}>
                      <GraduationCap className={`w-4 h-4 ${t.accentText}`} />
                    </div>
                    <div className="text-left">
                      <h2 className={`font-semibold ${t.textPrimary}`}>
                        {year.year}
                      </h2>
                      <p className="text-[11px] text-slate-500">
                        Select your final term GPA for each course. Labs with
                        lecture co-requisites use the same GPA as their Lecture.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => resetYearGpa(year)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-300 text-[11px] text-slate-600 bg-white hover:bg-slate-50 transition"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset GPA for this year level
                  </button>
                </div>

                <div className="px-4 pb-4 pt-3">
                  <div className="grid md:grid-cols-3 gap-4">
                    {year.terms.map((term, tIdx) => {
                      const stats = computeTermGpa(term);
                      const totalUnitsTerm = term.courses.reduce(
                        (acc, c) => acc + c.units,
                        0
                      );
                      return (
                        <div key={tIdx} className="flex flex-col">
                          <div className="mb-3 flex justify-between items-center px-1">
                            <div>
                              <h3 className="font-semibold text-slate-700 uppercase tracking-wide text-sm">
                                {term.termName}
                              </h3>
                              <p className="text-[11px] text-slate-400">
                                {totalUnitsTerm} Units Total
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
                            <button
                              type="button"
                              onClick={() => resetTermGpa(term)}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-slate-300 text-[10px] text-slate-600 bg-white hover:bg-slate-50 transition"
                            >
                              <RotateCcw className="w-3 h-3" />
                              Reset GPA for this term
                            </button>
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

                              const isAutoLab = isAutoSyncedLabId(course.id);
                              const lectureId = isAutoLab
                                ? getCoreqLectureId(course.id)
                                : null;
                              const lectureGpaValue =
                                lectureId &&
                                courseGPA[lectureId] !== undefined
                                  ? courseGPA[lectureId]
                                  : "";

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

                                      <div className="flex items-center gap-1 text-[11px] text-slate-500">
                                        <span>GPA:</span>
                                        {isAutoLab && lectureId ? (
                                          <>
                                            <select
                                              className="w-20 px-1 py-0.5 text-[11px] border border-slate-300 rounded bg-slate-100 text-slate-500 cursor-not-allowed"
                                              value={lectureGpaValue}
                                              disabled
                                            >
                                              <option value="">-</option>
                                              {GPA_OPTIONS.filter(
                                                (o) => o !== ""
                                              ).map((opt) => (
                                                <option
                                                  key={opt}
                                                  value={opt}
                                                >
                                                  {opt}
                                                </option>
                                              ))}
                                            </select>
                                            <span className="text-[10px] text-slate-400">
                                              (Same as {lectureId})
                                            </span>
                                          </>
                                        ) : (
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
                                        )}
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

        {/* GPA DATA MANAGEMENT + FOOTER */}
        <div className="w-full border-t border-slate-200 bg-slate-50/80">
          <div className="max-w-6xl mx-auto px-4 py-6 space-y-4 text-sm text-slate-600">
            {/* GPA Data Management Section */}
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                DATA MANAGEMENT (GPA)
              </h2>
              <p className="text-xs text-slate-500 mb-3">
                Transfer your GPA data between environments, or create a backup of your GPA records only.
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={exportGpaToClipboard}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition"
                >
                  <Copy className="w-4 h-4" />
                  Copy GPA Data
                </button>
                <button
                  onClick={exportGpaToFile}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition"
                >
                  <Download className="w-4 h-4" />
                  Download GPA Backup
                </button>
                <button
                  onClick={() => setShowGpaImportModal(true)}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-600 border border-indigo-600 rounded-lg text-xs font-medium text-white hover:bg-indigo-700 transition"
                >
                  <Upload className="w-4 h-4" />
                  Import GPA Data
                </button>
              </div>
            </section>

            {/* GPA Import Modal */}
            {showGpaImportModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-slate-800">
                      Import GPA Data
                    </h3>
                    <button
                      onClick={() => {
                        setShowGpaImportModal(false);
                        setGpaImportText("");
                      }}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-sm text-slate-600 mb-4">
                    Paste your exported GPA data below, or upload a GPA backup file to restore your GPA records.
                  </p>

                  <textarea
                    value={gpaImportText}
                    onChange={(e) => setGpaImportText(e.target.value)}
                    placeholder='Paste your GPA JSON data here (e.g., {"COE0001":"1.5",...})'
                    className="w-full h-32 p-3 border border-slate-300 rounded-lg text-sm font-mono resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={importGpaFromText}
                      disabled={!gpaImportText.trim()}
                      className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Import from Text
                    </button>
                    <label className="flex-1">
                      <input
                        type="file"
                        ref={gpaFileInputRef}
                        accept=".json"
                        onChange={handleGpaFileUpload}
                        className="hidden"
                      />
                      <span className="block w-full text-center bg-slate-100 text-slate-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-slate-200 transition cursor-pointer">
                        Upload File
                      </span>
                    </label>
                  </div>

                  <p className="text-xs text-slate-400 mt-4 text-center">
                    This will replace your current GPA data.
                  </p>
                </div>
              </div>
            )}

            <div className="text-[11px] text-slate-500 border-t border-slate-200 pt-2">
              GPA values are stored locally in your browser (localStorage). Clear your
              browser storage if you want to reset all GPA inputs.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ---------------- ROOT APP WITH PAGE SWITCHER ----------------
const App = () => {
  const [courseStatus, setCourseStatus] = useState({});
  const [courseGPA, setCourseGPA] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [activePage, setActivePage] = useState("tracker"); // "tracker" | "gpa"
  const [theme, setTheme] = useState("feuGreen"); // "feuGreen" | "dark" | "highContrast"
  const [viewMode, setViewMode] = useState("card"); // "card" | "list"
  const [showWhatCanITake, setShowWhatCanITake] = useState(false);
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const [graduationDate, setGraduationDate] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiSize, setConfettiSize] = useState("small");
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  
  const t = THEMES[theme];

  // Load state from URL on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const stateParam = urlParams.get("state");
    
    if (stateParam) {
      const decoded = decodeStateFromURL(stateParam);
      if (decoded) {
        setCourseStatus(decoded.courseStatus);
        setCourseGPA(decoded.courseGPA);
        if (decoded.graduationDate) setGraduationDate(decoded.graduationDate);
        setSuccessMsg("Progress loaded from shared link!");
        setTimeout(() => setSuccessMsg(""), 3000);
        return;
      }
    }
    
    // Load from localStorage if no URL state
    const savedData = localStorage.getItem("ce_tracker_data_v2");
    if (savedData) {
      setCourseStatus(JSON.parse(savedData));
    }

    const savedGpa = localStorage.getItem("ce_gpa_data_v1");
    if (savedGpa) {
      setCourseGPA(JSON.parse(savedGpa));
    }
    
    const savedTheme = localStorage.getItem("ce_theme");
    if (savedTheme && THEMES[savedTheme]) {
      setTheme(savedTheme);
    }
    
    const savedGradDate = localStorage.getItem("ce_graduation_date");
    if (savedGradDate) {
      setGraduationDate(savedGradDate);
    }
    
    const savedViewMode = localStorage.getItem("ce_view_mode");
    if (savedViewMode) {
      setViewMode(savedViewMode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ce_tracker_data_v2", JSON.stringify(courseStatus));
  }, [courseStatus]);

  useEffect(() => {
    localStorage.setItem("ce_gpa_data_v1", JSON.stringify(courseGPA));
  }, [courseGPA]);
  
  useEffect(() => {
    localStorage.setItem("ce_theme", theme);
  }, [theme]);
  
  useEffect(() => {
    localStorage.setItem("ce_graduation_date", graduationDate);
  }, [graduationDate]);
  
  useEffect(() => {
    localStorage.setItem("ce_view_mode", viewMode);
  }, [viewMode]);

  // Handle confetti
  const triggerConfetti = useCallback((size) => {
    setConfettiSize(size);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), size === "big" ? 5000 : 2000);
  }, []);

  // Handle share link generation
  const handleShareLink = useCallback(() => {
    const encoded = encodeStateToURL(courseStatus, courseGPA, graduationDate);
    const url = `${window.location.origin}${window.location.pathname}?state=${encoded}`;
    setShareUrl(url);
    setShowShareModal(true);
  }, [courseStatus, courseGPA, graduationDate]);

  const copyShareUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setSuccessMsg("Link copied to clipboard!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setErrorMsg("Failed to copy link");
      setTimeout(() => setErrorMsg(""), 3000);
    }
  };

  // Calculate remaining units for target grade calculator
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

  const remainingUnits = Math.max(totalUnits - completedUnits, 0);

  return (
    <div className={`min-h-screen ${t.bodyBg} font-sans ${t.textPrimary} flex flex-col`}>
      <Analytics />
      <SpeedInsights />
      
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={confettiSize === "big" ? 500 : 100}
          gravity={confettiSize === "big" ? 0.3 : 0.5}
        />
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${t.cardBg} rounded-xl shadow-2xl max-w-md w-full p-6`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg font-semibold ${t.textPrimary} flex items-center gap-2`}>
                <Share2 className="w-5 h-5" />
                Share Your Progress
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className={`${t.textMuted} hover:${t.textSecondary}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className={`text-sm ${t.textSecondary} mb-4`}>
              Share this link with friends or parents to show your academic progress!
            </p>
            <div className={`p-3 ${t.secondaryBg} rounded-lg break-all text-xs font-mono ${t.textSecondary}`}>
              {shareUrl.substring(0, 100)}...
            </div>
            <button
              onClick={copyShareUrl}
              className={`w-full mt-4 ${t.primaryBtn} ${t.primaryBtnText} py-2 px-4 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2`}
            >
              <Copy className="w-4 h-4" />
              Copy Link to Clipboard
            </button>
          </div>
        </div>
      )}

      {/* Theme Modal */}
      {showThemeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${t.cardBg} rounded-xl shadow-2xl max-w-sm w-full p-6`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg font-semibold ${t.textPrimary} flex items-center gap-2`}>
                <Palette className="w-5 h-5" />
                Theme Customizer
              </h3>
              <button
                onClick={() => setShowThemeModal(false)}
                className={`${t.textMuted} hover:${t.textSecondary}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              {Object.entries(THEMES).map(([key, themeData]) => (
                <button
                  key={key}
                  onClick={() => {
                    setTheme(key);
                    setShowThemeModal(false);
                  }}
                  className={`w-full p-4 rounded-lg border-2 transition flex items-center gap-3 ${
                    theme === key
                      ? `${themeData.primaryBtn} ${themeData.primaryBtnText}`
                      : `${t.cardBorder} ${t.textSecondary} hover:opacity-80`
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full ${themeData.heroBg}`}></div>
                  <div className="text-left">
                    <div className="font-medium">{themeData.name}</div>
                    <div className="text-xs opacity-70">
                      {key === "feuGreen" && "School colors theme"}
                      {key === "dark" && "For late-night study sessions"}
                      {key === "highContrast" && "Accessibility-focused"}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Top navigation to switch pages */}
      <header className={`w-full ${t.headerBg} border-b ${t.headerBorder} sticky top-0 z-40`}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className={`w-5 h-5 ${t.accentText}`} />
            <span className={`font-semibold ${t.textPrimary} text-sm md:text-base`}>
              BSCE Academic Tools
            </span>
          </div>
          <nav className="flex items-center gap-2 text-xs md:text-sm">
            <button
              type="button"
              onClick={() => setActivePage("tracker")}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs md:text-sm transition ${
                activePage === "tracker"
                  ? t.navActive
                  : `${t.cardBg} ${t.textSecondary} ${t.cardBorder} hover:opacity-80`
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
                  : `${t.cardBg} ${t.textSecondary} ${t.cardBorder} hover:opacity-80`
              }`}
            >
              <Calculator className="w-4 h-4" />
              GPA Calculator
            </button>
            <button
              type="button"
              onClick={() => setShowThemeModal(true)}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs md:text-sm transition ${t.cardBg} ${t.textSecondary} ${t.cardBorder} hover:opacity-80`}
            >
              <Palette className="w-4 h-4" />
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
          successMsg={successMsg}
          setSuccessMsg={setSuccessMsg}
          theme={theme}
          viewMode={viewMode}
          setViewMode={setViewMode}
          showWhatCanITake={showWhatCanITake}
          setShowWhatCanITake={setShowWhatCanITake}
          hoveredCourse={hoveredCourse}
          setHoveredCourse={setHoveredCourse}
          graduationDate={graduationDate}
          setGraduationDate={setGraduationDate}
          courseGPA={courseGPA}
          onShareLink={handleShareLink}
          onConfetti={triggerConfetti}
        />
      ) : (
        <GpaCalculatorPage
          courseGPA={courseGPA}
          setCourseGPA={setCourseGPA}
          errorMsg={errorMsg}
          setErrorMsg={setErrorMsg}
          successMsg={successMsg}
          setSuccessMsg={setSuccessMsg}
          theme={theme}
          remainingUnits={remainingUnits}
        />
      )}
    </div>
  );
};

export default App;
