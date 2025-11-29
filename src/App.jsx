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
  LayoutGrid,
  Palette,
  Filter,
  Share2,
  Calendar,
  Target,
  AlertTriangle,
  Link2,
  ZoomIn,
  ZoomOut,
  Home,
  Clock,
  FileText,
  Settings,
  Undo2,
  History,
  Move,
  ArrowLeftRight,
  Inbox,
  Sparkles,
  MessageSquare,
  Info,
  ChevronDown,
  Image,
  Table,
  Layers,
  Search,
  Save,
  Building2,
  Users,
  Code,
  MapPin,
} from "lucide-react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Confetti from "react-confetti";

// Configuration constants
const STUDENT_PORTAL_URL = "https://solar.feutech.edu.ph/course/offerings";

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

// Petition-required courses - courses that typically require petition for out-of-sequence taking
// These include internship, projects, and specialized courses with multiple prerequisites
const PETITION_REQUIRED_COURSES = new Set([
  "CE0067", // Internship for CE
  "CE0057", // CE Project 1
  "CE0071", // CE Project 2
  "CE0043", // Professional Course 1 – Earthquake Engineering
  "CE0045", // Professional Course 2 – Reinforced Concrete Design
  "CE0059", // Professional Course 3 – Design of Steel Structures
  "CE0061", // Professional Course 4 – Prestressed Concrete Design
  "CE0073", // Professional Course 5 – Foundation and Retaining Wall
  "CE0075", // Professional Course 6 – Computer Software in Structural Analysis
  "CE0077", // Technical Elective for CE - COSH
  "CE0069", // CE Correlation Course 3
]);

// Check if a course requires petition for out-of-sequence enrollment
const isPetitionRequired = (courseId) => PETITION_REQUIRED_COURSES.has(courseId);

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
    highlightBg: "bg-yellow-100",
    hoverHighlightBg: "bg-blue-50",
  },
  feuGold: {
    name: "FEU Gold",
    heroGradient: "from-feugold-6 via-feugold-5 to-feugold-4",
    heroBg: "bg-feugold-5",
    heroText: "text-feugold-1",
    heroAccent: "text-feugold-2",
    headerBg: "bg-white",
    headerBorder: "border-feugold-3",
    cardBg: "bg-white",
    cardBorder: "border-feugold-2",
    cardHover: "hover:border-feugold-4",
    primaryBtn: "bg-feugold-4 hover:bg-feugold-5 border-feugold-4",
    primaryBtnText: "text-white",
    accentBg: "bg-feugold-1",
    accentBorder: "border-feugold-3",
    accentText: "text-feugold-6",
    secondaryBg: "bg-feugold-1",
    textPrimary: "text-slate-800",
    textSecondary: "text-slate-600",
    textMuted: "text-slate-400",
    bodyBg: "bg-feugold-1",
    passedBg: "bg-green-50",
    passedBorder: "border-green-300",
    passedBadge: "bg-green-100 text-green-700",
    takingBadge: "bg-feugold-4 text-white",
    progressBar: "from-feugold-4 to-feugold-3",
    navActive: "bg-feugold-4 text-white border-feugold-4",
    highlightBg: "bg-yellow-100",
    hoverHighlightBg: "bg-feugold-1",
  },
  acesTheme: {
    name: "ACES Theme",
    heroGradient: "from-aces-5 via-aces-4 to-aces-3",
    heroBg: "bg-aces-5",
    heroText: "text-aces-1",
    heroAccent: "text-aces-2",
    headerBg: "bg-white",
    headerBorder: "border-aces-2",
    cardBg: "bg-white",
    cardBorder: "border-aces-2",
    cardHover: "hover:border-aces-3",
    primaryBtn: "bg-aces-4 hover:bg-aces-5 border-aces-4",
    primaryBtnText: "text-white",
    accentBg: "bg-aces-1",
    accentBorder: "border-aces-2",
    accentText: "text-aces-5",
    secondaryBg: "bg-aces-1",
    textPrimary: "text-slate-800",
    textSecondary: "text-slate-600",
    textMuted: "text-slate-400",
    bodyBg: "bg-aces-1",
    passedBg: "bg-aces-1",
    passedBorder: "border-aces-3",
    passedBadge: "bg-aces-2 text-aces-5",
    takingBadge: "bg-aces-4 text-white",
    progressBar: "from-aces-4 to-aces-3",
    navActive: "bg-aces-4 text-white border-aces-4",
    highlightBg: "bg-yellow-100",
    hoverHighlightBg: "bg-aces-1",
  },
  dark: {
    name: "Dark Mode",
    heroGradient: "from-slate-900 via-slate-800 to-slate-700",
    heroBg: "bg-slate-900",
    heroText: "text-slate-100",
    heroAccent: "text-slate-200",
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
    textMuted: "text-slate-400",
    bodyBg: "bg-slate-900",
    passedBg: "bg-slate-700",
    passedBorder: "border-blue-500",
    passedBadge: "bg-blue-900 text-blue-300",
    takingBadge: "bg-blue-500 text-blue-50",
    progressBar: "from-blue-500 to-cyan-400",
    navActive: "bg-blue-600 text-white border-blue-600",
    highlightBg: "bg-yellow-900/30",
    hoverHighlightBg: "bg-blue-900/30",
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
    textMuted: "text-yellow-300",
    bodyBg: "bg-black",
    passedBg: "bg-green-900",
    passedBorder: "border-green-400",
    passedBadge: "bg-green-900 text-green-300",
    takingBadge: "bg-yellow-400 text-black",
    progressBar: "from-yellow-400 to-yellow-300",
    navActive: "bg-yellow-400 text-black border-yellow-400",
    highlightBg: "bg-yellow-900/50",
    hoverHighlightBg: "bg-yellow-800/30",
  },
};

// Dean's lister GPA thresholds
const DEAN_LISTER_TARGETS = [
  { label: "Gold Dean's Lister", gpa: 3.8 },
  { label: "Silver Dean's Lister", gpa: 3.6 },
  { label: "Bronze Dean's Lister", gpa: 3.4 },
  { label: "Passing Grade", gpa: 1.0 },
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

// Calculate terms remaining based on year entered college
// Standard 4-year program with 3 terms per academic year = 12 terms total
const TERMS_PER_YEAR = 3;
const TOTAL_PROGRAM_YEARS = 4;
const TOTAL_TERMS = TERMS_PER_YEAR * TOTAL_PROGRAM_YEARS;

// Calculate delay terms when unmarking a course as passed
const calculateDelayTerms = (courseId) => {
  // Get the course's scheduled term in the curriculum
  let courseYearIndex = -1;
  let courseTermIndex = -1;
  
  CURRICULUM_DATA.forEach((year, yIdx) => {
    year.terms.forEach((term, tIdx) => {
      term.courses.forEach((course) => {
        if (course.id === courseId) {
          courseYearIndex = yIdx;
          courseTermIndex = tIdx;
        }
      });
    });
  });
  
  if (courseYearIndex === -1) return 1; // Default to 1 term if course not found
  
  // Calculate the term number in the curriculum (1-12)
  const courseTermNumber = (courseYearIndex * TERMS_PER_YEAR) + courseTermIndex + 1;
  
  // Get dependents and find the furthest term
  const dependents = getAllDependents(courseId);
  let maxTermDelay = 0;
  
  dependents.forEach((depId) => {
    CURRICULUM_DATA.forEach((year, yIdx) => {
      year.terms.forEach((term, tIdx) => {
        term.courses.forEach((course) => {
          if (course.id === depId) {
            const depTermNumber = (yIdx * TERMS_PER_YEAR) + tIdx + 1;
            const termDiff = depTermNumber - courseTermNumber;
            if (termDiff > maxTermDelay) {
              maxTermDelay = termDiff;
            }
          }
        });
      });
    });
  });
  
  // At minimum, delay by 1 term (the next offering of this course)
  return Math.max(1, maxTermDelay);
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
  courseGPA,
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
        const delayTerms = calculateDelayTerms(courseId);
        setCriticalPathWarning({
          courseId,
          message: `Delay Warning: This will delay your graduation by at least ${delayTerms} term${delayTerms !== 1 ? 's' : ''} because it unlocks: ${dependentTitles.join(", ")}${moreCount}`,
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

          {/* TOOLBAR - View Toggle, What Can I Take */}
          <div className={`${t.cardBg} rounded-lg p-3 mb-4 shadow-md flex flex-wrap items-center justify-between gap-3`}>
            <div className="flex items-center gap-2 flex-wrap">
              {/* View Mode Toggle */}
              <div className={`flex items-center gap-1 ${t.secondaryBg} rounded-lg p-1`}>
                <button
                  onClick={() => setViewMode("card")}
                  className={`px-2 py-1.5 rounded-md text-xs font-medium transition flex items-center gap-1 ${
                    viewMode === "card"
                      ? `${t.primaryBtn} ${t.primaryBtnText}`
                      : `${t.textSecondary} hover:${t.textPrimary}`
                  }`}
                  title="Card View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Card</span>
                </button>

                <button
                  onClick={() => setViewMode("timeline")}
                  className={`px-2 py-1.5 rounded-md text-xs font-medium transition flex items-center gap-1 ${
                    viewMode === "timeline"
                      ? `${t.primaryBtn} ${t.primaryBtnText}`
                      : `${t.textSecondary} hover:${t.textPrimary}`
                  }`}
                  title="Timeline View"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Timeline</span>
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-2 py-1.5 rounded-md text-xs font-medium transition flex items-center gap-1 ${
                    viewMode === "table"
                      ? `${t.primaryBtn} ${t.primaryBtnText}`
                      : `${t.textSecondary} hover:${t.textPrimary}`
                  }`}
                  title="Table View"
                >
                  <Table className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Table</span>
                </button>
                <button
                  onClick={() => setViewMode("compact")}
                  className={`px-2 py-1.5 rounded-md text-xs font-medium transition flex items-center gap-1 ${
                    viewMode === "compact"
                      ? `${t.primaryBtn} ${t.primaryBtnText}`
                      : `${t.textSecondary} hover:${t.textPrimary}`
                  }`}
                  title="Compact View"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Compact</span>
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

            {/* Data Management Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={exportToClipboard}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1 border ${t.cardBorder} ${t.textSecondary} hover:${t.textPrimary}`}
                title="Copy progress to clipboard"
              >
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Copy</span>
              </button>
              <button
                onClick={exportToFile}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1 border ${t.cardBorder} ${t.textSecondary} hover:${t.textPrimary}`}
                title="Download backup file"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button
                onClick={() => setShowImportModal(true)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1 border ${t.cardBorder} ${t.textSecondary} hover:${t.textPrimary}`}
                title="Import progress data"
              >
                <Upload className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Import</span>
              </button>
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
              const filteredTerms = year.terms.map((term, originalIdx) => ({
                ...term,
                originalIndex: originalIdx,
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
                    {/* Timeline View */}
                    {viewMode === "timeline" && (
                      <div className="relative">
                        {filteredTerms.map((term, tIdx) => (
                          <div key={tIdx} className="mb-6 last:mb-0">
                            <div className="flex items-center gap-3 mb-3">
                              <div className={`w-3 h-3 rounded-full ${t.accentBg} border-2 ${t.accentBorder}`}></div>
                              <h3 className={`font-semibold ${t.textSecondary} uppercase tracking-wide text-sm`}>{term.termName}</h3>
                              <div className={`flex-1 h-px ${t.cardBorder}`}></div>
                              <span className={`text-xs ${t.textMuted}`}>{term.courses.reduce((acc, c) => acc + c.units, 0)} units</span>
                            </div>
                            <div className="ml-6 border-l-2 border-dashed border-slate-200 pl-6 space-y-2">
                              {term.courses.map((course) => {
                                const status = courseStatus[course.id] || "inactive";
                                const autoSyncedLab = isAutoSyncedLabId(course.id);
                                const locked = isLocked(course);
                                return (
                                  <div 
                                    key={course.id} 
                                    className={`flex items-center justify-between p-2 rounded-lg border ${
                                      status === 'passed' ? `${t.passedBg} ${t.passedBorder}` :
                                      status === 'taking' ? 'bg-blue-50 border-blue-200' :
                                      `${t.secondaryBg} ${t.cardBorder}`
                                    }`}
                                  >
                                    <div className="flex items-center gap-3">
                                      <span className={`text-xs font-mono font-semibold ${t.textPrimary}`}>{course.id}</span>
                                      <span className={`text-xs ${t.textSecondary}`}>{course.title}</span>
                                      <span className={`text-[10px] ${t.textMuted}`}>{course.units}u</span>
                                    </div>
                                    {!autoSyncedLab && (
                                      <div className="flex gap-1">
                                        <button
                                          onClick={() => setCourseStatusWithValidation(course.id, "inactive", locked, status)}
                                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${status === 'inactive' ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                                        >I</button>
                                        <button
                                          onClick={() => setCourseStatusWithValidation(course.id, "taking", locked, status)}
                                          disabled={locked}
                                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${status === 'taking' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'} ${locked ? 'opacity-50' : ''}`}
                                        >A</button>
                                        <button
                                          onClick={() => setCourseStatusWithValidation(course.id, "passed", locked, status)}
                                          disabled={locked}
                                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${status === 'passed' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700 hover:bg-green-200'} ${locked ? 'opacity-50' : ''}`}
                                        >P</button>
                                      </div>
                                    )}
                                    {autoSyncedLab && <span className={`text-[10px] ${t.textMuted}`}>Auto</span>}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Table View (full table for entire year) */}
                    {viewMode === "table" && (
                      <div className="overflow-x-auto">
                        <table className={`w-full text-xs ${t.textPrimary}`}>
                          <thead>
                            <tr className={`border-b ${t.cardBorder} ${t.secondaryBg}`}>
                              <th className="text-left py-2 px-3 font-semibold">Code</th>
                              <th className="text-left py-2 px-3 font-semibold">Title</th>
                              <th className="text-center py-2 px-3 font-semibold">Units</th>
                              <th className="text-center py-2 px-3 font-semibold">Term</th>
                              <th className="text-left py-2 px-3 font-semibold">Prerequisites</th>
                              <th className="text-center py-2 px-3 font-semibold">Status</th>
                              <th className="text-center py-2 px-3 font-semibold">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredTerms.flatMap((term) =>
                              term.courses.map((course) => {
                                const status = courseStatus[course.id] || "inactive";
                                const autoSyncedLab = isAutoSyncedLabId(course.id);
                                const locked = isLocked(course);
                                return (
                                  <tr key={course.id} className={`border-b ${t.cardBorder} ${status === 'passed' ? t.passedBg : ''}`}>
                                    <td className="py-2 px-3 font-mono font-semibold">{course.id}</td>
                                    <td className="py-2 px-3">{course.title}</td>
                                    <td className="py-2 px-3 text-center">{course.units}</td>
                                    <td className="py-2 px-3 text-center">{term.termName}</td>
                                    <td className="py-2 px-3">
                                      {course.prereqs.length > 0 ? (
                                        <span className={`text-[10px] ${t.textMuted}`}>{course.prereqs.join(", ")}</span>
                                      ) : (
                                        <span className={`text-[10px] ${t.textMuted}`}>None</span>
                                      )}
                                    </td>
                                    <td className="py-2 px-3 text-center">
                                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                                        status === 'passed' ? t.passedBadge :
                                        status === 'taking' ? t.takingBadge :
                                        `${t.secondaryBg} ${t.textMuted}`
                                      }`}>
                                        {status === 'passed' ? 'Passed' : status === 'taking' ? 'Active' : 'Inactive'}
                                      </span>
                                    </td>
                                    <td className="py-2 px-3 text-center">
                                      {autoSyncedLab ? (
                                        <span className={`text-[10px] ${t.textMuted}`}>Auto</span>
                                      ) : (
                                        <div className="flex gap-1 justify-center">
                                          <button onClick={() => setCourseStatusWithValidation(course.id, "inactive", locked, status)} className={`px-1.5 py-0.5 rounded text-[9px] ${status === 'inactive' ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-600'}`}>I</button>
                                          <button onClick={() => setCourseStatusWithValidation(course.id, "taking", locked, status)} disabled={locked} className={`px-1.5 py-0.5 rounded text-[9px] ${status === 'taking' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'} ${locked ? 'opacity-50' : ''}`}>A</button>
                                          <button onClick={() => setCourseStatusWithValidation(course.id, "passed", locked, status)} disabled={locked} className={`px-1.5 py-0.5 rounded text-[9px] ${status === 'passed' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700'} ${locked ? 'opacity-50' : ''}`}>P</button>
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
                    )}
                    
                    {/* Compact View */}
                    {viewMode === "compact" && (
                      <div className="space-y-4">
                        {filteredTerms.map((term, tIdx) => (
                          <div key={tIdx}>
                            <div className={`text-xs font-semibold ${t.textSecondary} mb-2 uppercase tracking-wide`}>
                              {term.termName} ({term.courses.reduce((acc, c) => acc + c.units, 0)}u)
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {term.courses.map((course) => {
                                const status = courseStatus[course.id] || "inactive";
                                const autoSyncedLab = isAutoSyncedLabId(course.id);
                                const locked = isLocked(course);
                                return (
                                  <button
                                    key={course.id}
                                    onClick={() => {
                                      if (autoSyncedLab) return;
                                      const nextStatus = status === 'inactive' ? 'taking' : status === 'taking' ? 'passed' : 'inactive';
                                      if (!locked || nextStatus === 'inactive') {
                                        setCourseStatusWithValidation(course.id, nextStatus, false, status);
                                      }
                                    }}
                                    disabled={autoSyncedLab}
                                    className={`px-2 py-1 rounded-lg text-[10px] font-medium border transition ${
                                      status === 'passed' ? `${t.passedBg} ${t.passedBorder} ${t.accentText}` :
                                      status === 'taking' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                                      `${t.secondaryBg} ${t.cardBorder} ${t.textMuted}`
                                    } ${autoSyncedLab ? 'opacity-60 cursor-default' : 'hover:shadow-sm cursor-pointer'}`}
                                    title={`${course.title} (${course.units}u) - Click to cycle status`}
                                  >
                                    {course.id}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Card View (default) */}
                    {viewMode === "card" && (
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
                                onClick={() => markTermAsPassed(year.terms[term.originalIndex])}
                                className={`text-[10px] px-2 py-1 rounded-full border border-green-500 text-green-700 ${t.accentBg} hover:opacity-80 transition`}
                              >
                                Mark all courses this term as passed
                              </button>
                              <button
                                type="button"
                                onClick={() => resetTerm(year.terms[term.originalIndex])}
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
                                      {isPetitionRequired(course.id) && (
                                        <span className="text-[9px] uppercase tracking-wide bg-amber-500 text-white px-1.5 py-0.5 rounded-full" title="Petition may be required">
                                          Petition
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
              <p className={`text-xs ${t.textSecondary}`}>
                Development of this website is on-going, and this is a pre-release. It might have some issues with the functionality of the site.
              </p>
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
const GpaCalculatorPage = ({ courseGPA, setCourseGPA, errorMsg, setErrorMsg, successMsg, setSuccessMsg, theme }) => {
  const [showGpaImportModal, setShowGpaImportModal] = useState(false);
  const [gpaImportText, setGpaImportText] = useState("");
  const [targetGPA, setTargetGPA] = useState("");
  const [manualRemainingUnits, setManualRemainingUnits] = useState("");
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

  // Parse manual remaining units (independent from curriculum tracker)
  const parsedRemainingUnits = manualRemainingUnits ? parseFloat(manualRemainingUnits) : 0;

  // Calculate required GPA for target
  const calculateRequiredGPA = (targetGPAValue) => {
    if (!targetGPAValue || parsedRemainingUnits <= 0) return null;
    const target = parseFloat(targetGPAValue);
    if (isNaN(target)) return null;
    
    // Total target = (current TWQP + remaining_units * required_avg) / (TCU + remaining_units) = target
    // required_avg = (target * (TCU + remaining_units) - current TWQP) / remaining_units
    const totalUnitsWithRemaining = TCU + parsedRemainingUnits;
    const requiredTotal = target * totalUnitsWithRemaining;
    const requiredForRemaining = (requiredTotal - TWQP) / parsedRemainingUnits;
    
    return requiredForRemaining;
  };

  const requiredGPA = calculateRequiredGPA(targetGPA);

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
            
            <div className="flex flex-wrap items-start gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <label className={`text-xs ${t.textSecondary}`}>I want to achieve:</label>
                  <select
                    value={targetGPA}
                    onChange={(e) => setTargetGPA(e.target.value)}
                    className={`px-3 py-1.5 rounded border ${t.cardBorder} ${t.cardBg} ${t.textPrimary} text-sm`}
                  >
                    <option value="">Select target...</option>
                    {DEAN_LISTER_TARGETS.map((target) => (
                      <option key={target.gpa} value={target.gpa}>
                        {target.label} (≥ {target.gpa} GPA)
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center gap-2">
                  <label className={`text-xs ${t.textSecondary}`}>My remaining units:</label>
                  <input
                    type="number"
                    min="0"
                    max="300"
                    step="1"
                    value={manualRemainingUnits}
                    onChange={(e) => setManualRemainingUnits(e.target.value)}
                    placeholder="Enter units"
                    className={`w-24 px-3 py-1.5 rounded border ${t.cardBorder} ${t.cardBg} ${t.textPrimary} text-sm`}
                  />
                  <span className={`text-xs ${t.textMuted}`}>(Based on the Curriculum Tracker for the remaining units)</span>
                </div>
              </div>
              
              {targetGPA && parsedRemainingUnits > 0 && (
                <div className={`flex-1 p-3 rounded-lg ${t.accentBg} border ${t.accentBorder}`}>
                  {requiredGPA !== null && (
                    <div>
                      {requiredGPA < 0 ? (
                        <p className={`text-sm ${t.accentText}`}>
                          🎉 You've already achieved this target!
                        </p>
                      ) : requiredGPA > 4.0 ? (
                        <p className={`text-sm ${t.textSecondary}`}>
                          ⚠️ Unfortunately, this target may not be achievable with your current GPA.
                        </p>
                      ) : (
                        <p className={`text-sm ${t.textPrimary}`}>
                          📊 You need to average <span className={`font-bold ${t.accentText}`}>{requiredGPA.toFixed(2)}</span> in your remaining <span className="font-bold">{parsedRemainingUnits}</span> units to hit this goal.
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

// ---------------- CHAIN VISUALIZER PAGE ----------------
const ChainVisualizerPage = ({ theme, courseStatus }) => {
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [zoom, setZoom] = useState(1);
  const canvasRef = useRef(null);
  const t = THEMES[theme];

  // Zoom limits
  const MIN_ZOOM = 0.5;
  const MAX_ZOOM = 2;
  const ZOOM_STEP = 0.1;

  // Handle scroll wheel zoom
  const handleWheel = useCallback((e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
      setZoom((prev) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prev + delta)));
    }
  }, []);

  // Attach wheel event listener with passive: false to allow preventDefault
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      canvas.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);

  // Zoom controls
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(MAX_ZOOM, prev + ZOOM_STEP));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(MIN_ZOOM, prev - ZOOM_STEP));
  };

  const handleZoomReset = () => {
    setZoom(1);
  };

  // Get all courses with their positions
  const allCourses = useMemo(() => {
    const courses = [];
    CURRICULUM_DATA.forEach((year, yIdx) => {
      year.terms.forEach((term, tIdx) => {
        term.courses.forEach((course) => {
          courses.push({
            ...course,
            yearIndex: yIdx,
            termIndex: tIdx,
            yearName: year.year,
            termName: term.termName,
          });
        });
      });
    });
    return courses;
  }, []);

  // Get course details by ID
  const getCourseById = useCallback((courseId) => {
    return allCourses.find(c => c.id === courseId);
  }, [allCourses]);

  // Get course title by ID
  const getCourseTitle = useCallback((courseId) => {
    const course = getCourseById(courseId);
    return course ? course.title : courseId;
  }, [getCourseById]);

  // Get co-requisite (lab ↔ lecture relationship)
  const getCorequisite = useCallback((course) => {
    if (!course) return null;
    
    // If it's a lab course, check if there's a corresponding lecture
    if (course.id.endsWith('L')) {
      const lectureId = course.id.slice(0, -1);
      const lecture = getCourseById(lectureId);
      if (lecture) {
        return { id: lectureId, title: lecture.title };
      }
    }
    
    // If it's a lecture course, check if there's a corresponding lab
    const labId = course.id + 'L';
    const lab = getCourseById(labId);
    if (lab) {
      return { id: labId, title: lab.title };
    }
    
    return null;
  }, [getCourseById]);

  // Get post-requisites (courses that have this course as a prerequisite) FOR NEXT TERM ONLY
  const getNextTermPostRequisites = useCallback((course) => {
    if (!course) return [];
    
    // Calculate the next term position
    const currentCol = course.yearIndex * 3 + course.termIndex;
    const nextCol = currentCol + 1;
    
    // Find all courses that have this course as a prerequisite AND are in the next term
    const postReqs = allCourses.filter(c => {
      const cCol = c.yearIndex * 3 + c.termIndex;
      return cCol === nextCol && c.prereqs.includes(course.id);
    });
    
    return postReqs.map(c => ({ id: c.id, title: c.title }));
  }, [allCourses]);

  // Get highlighted courses (dependents of hovered course)
  const highlightedCourses = useMemo(() => {
    if (!hoveredCourse) return new Set();
    return new Set(getAllDependents(hoveredCourse));
  }, [hoveredCourse]);

  // Get prerequisites for highlighting
  const prerequisiteCourses = useMemo(() => {
    if (!hoveredCourse) return new Set();
    const course = allCourses.find(c => c.id === hoveredCourse);
    if (!course) return new Set();
    return new Set(course.prereqs);
  }, [hoveredCourse, allCourses]);

  // Calculate grid positions
  const getGridPosition = (yearIndex, termIndex) => {
    const col = yearIndex * 3 + termIndex;
    return col;
  };

  // Group courses by column (term)
  const coursesByColumn = useMemo(() => {
    const columns = {};
    allCourses.forEach((course) => {
      const col = getGridPosition(course.yearIndex, course.termIndex);
      if (!columns[col]) columns[col] = [];
      columns[col].push(course);
    });
    return columns;
  }, [allCourses]);

  const totalColumns = 12; // 4 years * 3 terms

  // Get selected course details for modal
  const selectedCourseDetails = useMemo(() => {
    if (!selectedCourse) return null;
    const course = getCourseById(selectedCourse);
    if (!course) return null;
    
    const coreq = getCorequisite(course);
    const postReqs = getNextTermPostRequisites(course);
    const prereqDetails = course.prereqs.map(pId => {
      const p = getCourseById(pId);
      return { id: pId, title: p ? p.title : pId };
    });
    
    return {
      ...course,
      corequisite: coreq,
      postRequisites: postReqs,
      prereqDetails,
    };
  }, [selectedCourse, getCourseById, getCorequisite, getNextTermPostRequisites]);

  return (
    <>
      <div className={`${t.heroBg} text-white pb-6 pt-10 px-6 shadow-xl`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Link2 className={`w-8 h-8 ${t.heroAccent}`} />
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Chain Visualizer
            </h1>
          </div>
          <p className={`${t.heroText} opacity-90 text-sm md:text-base`}>
            Click on a course to see detailed information. Hover to see prerequisite chains. Use scroll wheel (Ctrl/Cmd + scroll) or zoom buttons to zoom.
          </p>
          <div className={`mt-3 flex gap-4 text-xs ${t.heroText}`}>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-500"></div>
              <span>Hovered Course</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-orange-400"></div>
              <span>Prerequisites</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-yellow-400"></div>
              <span>Dependent Courses (at risk if failed)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Course Detail Modal */}
      {selectedCourseDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${t.cardBg} rounded-xl shadow-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className={`text-xs font-mono font-bold px-2 py-1 rounded ${t.accentBg} ${t.accentText}`}>
                  {selectedCourseDetails.id}
                </span>
                <h3 className={`text-lg font-semibold ${t.textPrimary} mt-2`}>
                  {selectedCourseDetails.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                className={`${t.textMuted} hover:${t.textSecondary} p-1`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Basic Info */}
              <div className={`p-3 rounded-lg ${t.secondaryBg} border ${t.cardBorder}`}>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className={`text-xs ${t.textMuted} uppercase tracking-wide`}>Course Code</span>
                    <p className={`font-semibold ${t.textPrimary}`}>{selectedCourseDetails.id}</p>
                  </div>
                  <div>
                    <span className={`text-xs ${t.textMuted} uppercase tracking-wide`}>Units</span>
                    <p className={`font-semibold ${t.textPrimary}`}>{selectedCourseDetails.units} Units</p>
                  </div>
                  <div className="col-span-2">
                    <span className={`text-xs ${t.textMuted} uppercase tracking-wide`}>Course Title</span>
                    <p className={`font-semibold ${t.textPrimary}`}>{selectedCourseDetails.title}</p>
                  </div>
                </div>
              </div>

              {/* Pre-requisites */}
              <div>
                <h4 className={`text-sm font-semibold ${t.textPrimary} mb-2`}>Pre-requisite:</h4>
                {selectedCourseDetails.prereqDetails.length > 0 ? (
                  <div className="space-y-1">
                    {selectedCourseDetails.prereqDetails.map((prereq) => (
                      <div key={prereq.id} className={`text-sm ${t.textSecondary} p-2 rounded ${t.secondaryBg}`}>
                        <span className="font-mono font-semibold">{prereq.id}</span> - {prereq.title}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={`text-sm ${t.textMuted} italic`}>None</p>
                )}
              </div>

              {/* Co-requisite */}
              <div>
                <h4 className={`text-sm font-semibold ${t.textPrimary} mb-2`}>Co-requisite:</h4>
                {selectedCourseDetails.corequisite ? (
                  <div className={`text-sm ${t.textSecondary} p-2 rounded ${t.secondaryBg}`}>
                    <span className="font-mono font-semibold">{selectedCourseDetails.corequisite.id}</span> - {selectedCourseDetails.corequisite.title}
                  </div>
                ) : (
                  <p className={`text-sm ${t.textMuted} italic`}>None</p>
                )}
              </div>

              {/* Post-requisites (Next Term Only) */}
              <div>
                <h4 className={`text-sm font-semibold ${t.textPrimary} mb-2`}>Post-requisite (Next Term):</h4>
                {selectedCourseDetails.postRequisites.length > 0 ? (
                  <div className="space-y-1">
                    {selectedCourseDetails.postRequisites.map((postReq) => (
                      <div key={postReq.id} className={`text-sm ${t.textSecondary} p-2 rounded ${t.secondaryBg}`}>
                        <span className="font-mono font-semibold">{postReq.id}</span> - {postReq.title}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={`text-sm ${t.textMuted} italic`}>None</p>
                )}
              </div>

              {/* Term Info */}
              <div className={`text-xs ${t.textMuted} pt-2 border-t ${t.cardBorder}`}>
                {selectedCourseDetails.yearName} • {selectedCourseDetails.termName}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Whiteboard-like visualization area with zoom */}
      <div 
        ref={canvasRef}
        className="flex-1 w-full overflow-auto relative"
      >
        <div 
          className={`min-h-screen p-6 ${t.bodyBg} transition-transform duration-200`}
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            width: `${100 / zoom}%`,
            minWidth: '1200px',
            backgroundImage: `
              linear-gradient(to right, ${theme === 'dark' || theme === 'highContrast' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px),
              linear-gradient(to bottom, ${theme === 'dark' || theme === 'highContrast' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        >
          <div className="w-full px-4">
            {/* Column Headers */}
            <div 
              className="grid gap-2 mb-4" 
              style={{ gridTemplateColumns: `repeat(${totalColumns}, minmax(100px, 1fr))` }}
            >
              {Array.from({ length: totalColumns }, (_, i) => {
                const yearIdx = Math.floor(i / 3);
                const termIdx = i % 3;
                const yearNames = ["First Year", "Second Year", "Third Year", "Fourth Year"];
                return (
                  <div 
                    key={i} 
                    className={`text-center p-2 rounded-lg ${t.accentBg} border ${t.accentBorder}`}
                  >
                    <div className={`text-[10px] font-semibold ${t.accentText}`}>
                      {yearNames[yearIdx]}
                    </div>
                    <div className={`text-[9px] ${t.textMuted}`}>
                      Term {termIdx + 1}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Course Grid */}
            <div 
              className="grid gap-2" 
              style={{ gridTemplateColumns: `repeat(${totalColumns}, minmax(100px, 1fr))` }}
            >
              {Array.from({ length: totalColumns }, (_, colIdx) => {
                const courses = coursesByColumn[colIdx] || [];
                return (
                  <div key={colIdx} className="space-y-2">
                    {courses.map((course) => {
                      const status = courseStatus[course.id] || "inactive";
                      const isHovered = hoveredCourse === course.id;
                      const isHighlighted = highlightedCourses.has(course.id);
                      const isPrereq = prerequisiteCourses.has(course.id);
                      const isAutoLab = isAutoSyncedLabId(course.id);

                      let bgColor = t.cardBg;
                      let borderColor = t.cardBorder;
                      let ringStyle = "";

                      if (isHovered) {
                        bgColor = "bg-blue-100";
                        borderColor = "border-blue-500";
                        ringStyle = "ring-2 ring-blue-500";
                      } else if (isPrereq) {
                        bgColor = "bg-orange-100";
                        borderColor = "border-orange-400";
                        ringStyle = "ring-2 ring-orange-400";
                      } else if (isHighlighted) {
                        bgColor = "bg-yellow-100";
                        borderColor = "border-yellow-400";
                        ringStyle = "ring-2 ring-yellow-400";
                      } else if (status === "passed") {
                        bgColor = t.passedBg;
                        borderColor = t.passedBorder;
                      }

                      return (
                        <div
                          key={course.id}
                          onClick={() => setSelectedCourse(course.id)}
                          onMouseEnter={() => setHoveredCourse(course.id)}
                          onMouseLeave={() => setHoveredCourse(null)}
                          className={`p-2 rounded-lg border ${bgColor} ${borderColor} ${ringStyle} transition-all duration-200 cursor-pointer hover:shadow-lg ${
                            isAutoLab ? 'opacity-60' : ''
                          }`}
                        >
                          <div className={`text-[9px] font-mono font-bold ${
                            isHovered || isHighlighted || isPrereq ? 'text-slate-700' : t.textMuted
                          }`}>
                            {course.id}
                          </div>
                          <div className={`text-[10px] font-medium leading-tight ${
                            isHovered || isHighlighted || isPrereq ? 'text-slate-800' : t.textPrimary
                          }`}>
                            {course.title.length > 30 
                              ? course.title.substring(0, 30) + "..." 
                              : course.title}
                          </div>
                          <div className={`text-[8px] mt-1 ${
                            isHovered || isHighlighted || isPrereq ? 'text-slate-600' : t.textMuted
                          }`}>
                            {course.units} units
                          </div>
                          {status === "passed" && (
                            <div className={`text-[8px] mt-1 ${t.passedBadge} px-1 py-0.5 rounded inline-block`}>
                              Passed
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* Legend and Info */}
            <div className={`mt-8 p-4 ${t.cardBg} rounded-lg border ${t.cardBorder}`}>
              <h3 className={`text-sm font-semibold ${t.textPrimary} mb-2`}>How to Use</h3>
              <p className={`text-xs ${t.textSecondary}`}>
                <strong>Click</strong> on any course to see detailed information including prerequisites, co-requisites, and post-requisites for the next term. Hover over any course to visualize its prerequisite chain. Courses highlighted in <span className="text-yellow-600 font-semibold">yellow</span> are dependent on the hovered course - failing the hovered course will delay these subjects. Courses in <span className="text-orange-600 font-semibold">orange</span> are prerequisites for the hovered course.
              </p>
              <p className={`text-xs ${t.textMuted} mt-2`}>
                Use <strong>Ctrl/Cmd + scroll wheel</strong> or the zoom buttons at the bottom right to zoom in and out of the visualization.
              </p>
            </div>
          </div>
        </div>

        {/* Zoom Controls - Fixed at bottom right */}
        <div className={`fixed bottom-6 right-6 flex flex-col gap-2 ${t.cardBg} p-2 rounded-lg shadow-lg border ${t.cardBorder} z-30`}>
          <button
            onClick={handleZoomIn}
            disabled={zoom >= MAX_ZOOM}
            className={`p-2 rounded-lg ${t.primaryBtn} ${t.primaryBtnText} transition disabled:opacity-50 disabled:cursor-not-allowed`}
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomReset}
            className={`p-2 rounded-lg ${t.secondaryBg} ${t.textSecondary} hover:opacity-80 transition text-xs font-mono`}
            title="Reset Zoom"
          >
            {Math.round(zoom * 100)}%
          </button>
          <button
            onClick={handleZoomOut}
            disabled={zoom <= MIN_ZOOM}
            className={`p-2 rounded-lg ${t.primaryBtn} ${t.primaryBtnText} transition disabled:opacity-50 disabled:cursor-not-allowed`}
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
};

// ---------------- MENU LANDING PAGE ----------------
const MenuLandingPage = ({ 
  theme, 
  setActivePage, 
  courseStatus,
  yearEnteredCollege,
  setYearEnteredCollege,
}) => {
  const t = THEMES[theme];

  // Calculate progress stats
  const totalCourses = CURRICULUM_DATA.reduce(
    (acc, year) => acc + year.terms.reduce((tAcc, term) => tAcc + term.courses.length, 0),
    0
  );
  const passedCourses = Object.values(courseStatus).filter(s => s === "passed").length;
  const activeCourses = Object.values(courseStatus).filter(s => s === "taking").length;
  const progressPercent = totalCourses > 0 ? Math.round((passedCourses / totalCourses) * 100) : 0;

  // Calculate total and completed units
  const totalUnits = CURRICULUM_DATA.reduce(
    (acc, year) =>
      acc + year.terms.reduce((tAcc, term) => tAcc + term.courses.reduce((cAcc, c) => cAcc + c.units, 0), 0),
    0
  );
  const completedUnits = Object.entries(courseStatus).reduce((acc, [id, status]) => {
    if (status === "passed") {
      for (const year of CURRICULUM_DATA) {
        for (const term of year.terms) {
          for (const c of term.courses) {
            if (c.id === id) return acc + c.units;
          }
        }
      }
    }
    return acc;
  }, 0);

  // Calculate expected graduation considering dependency chains
  const calculateExpectedGraduation = () => {
    if (!yearEnteredCollege) return null;
    const entryYear = parseInt(yearEnteredCollege);
    if (isNaN(entryYear) || entryYear < 2000 || entryYear > 2100) return null;

    // Find courses that are not passed
    const incompleteCourses = [];
    CURRICULUM_DATA.forEach((year, yIdx) => {
      year.terms.forEach((term, tIdx) => {
        term.courses.forEach((course) => {
          if (courseStatus[course.id] !== "passed") {
            incompleteCourses.push({
              ...course,
              yearIndex: yIdx,
              termIndex: tIdx,
              termNumber: yIdx * 3 + tIdx,
            });
          }
        });
      });
    });

    if (incompleteCourses.length === 0) {
      // All courses passed!
      return { year: entryYear + 4, term: "Completed!", delayTerms: 0 };
    }

    // Calculate delay terms from incomplete courses that block others
    let maxDelayedTermNumber = 0;
    
    incompleteCourses.forEach((course) => {
      // Get all dependents of this course
      const dependents = getAllDependents(course.id);
      
      // Find the furthest term this course or its dependents are in
      let furthestTerm = course.termNumber;
      
      CURRICULUM_DATA.forEach((year, yIdx) => {
        year.terms.forEach((term, tIdx) => {
          term.courses.forEach((c) => {
            if (dependents.includes(c.id) && courseStatus[c.id] !== "passed") {
              const termNum = yIdx * 3 + tIdx;
              if (termNum > furthestTerm) {
                furthestTerm = termNum;
              }
            }
          });
        });
      });
      
      if (furthestTerm > maxDelayedTermNumber) {
        maxDelayedTermNumber = furthestTerm;
      }
    });

    // Constants for degree structure
    const STANDARD_DEGREE_YEARS = 4;
    const TERMS_PER_YEAR = 3;
    const STANDARD_TOTAL_TERMS = STANDARD_DEGREE_YEARS * TERMS_PER_YEAR; // 12 terms for standard 4-year degree
    
    // Calculate remaining terms and graduation timing
    const lastIncompleteTermNumber = maxDelayedTermNumber + 1;
    
    // Calculate years from start based on the last incomplete term
    // Divide by terms per year and round up to get total years needed
    const yearsFromStart = Math.ceil(lastIncompleteTermNumber / TERMS_PER_YEAR);
    const graduationYear = entryYear + yearsFromStart;
    
    // Determine which term within the final year
    const termInYear = (maxDelayedTermNumber % TERMS_PER_YEAR);
    const termNames = ["1st Term", "2nd Term", "3rd Term"];
    
    // Calculate delay: difference between actual years and standard degree duration
    const delayInYears = Math.max(0, yearsFromStart - STANDARD_DEGREE_YEARS);
    
    return { 
      year: graduationYear, 
      term: termNames[termInYear],
      delayTerms: delayInYears,
      incompleteCourses: incompleteCourses.length,
    };
  };

  const expectedGraduation = calculateExpectedGraduation();

  // Features for the landing page
  const features = [
    {
      id: "tracker",
      title: "Curriculum Tracker",
      description: "Track your academic progress through the CE curriculum with detailed status for each course.",
      icon: LayoutTemplate,
      color: "from-green-500 to-emerald-600",
    },
    {
      id: "gpa",
      title: "GPA Calculator",
      description: "Calculate your term and cumulative GPA with target grade planning tools.",
      icon: Calculator,
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: "visualizer",
      title: "Chain Visualizer",
      description: "Visualize prerequisite chains and understand course dependencies at a glance.",
      icon: Link2,
      color: "from-purple-500 to-violet-600",
    },
    {
      id: "schedule",
      title: "Schedule Maker",
      description: "Build mock enrolments by selecting course sections and checking for schedule conflicts.",
      icon: Table,
      color: "from-pink-500 to-rose-600",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className={`bg-gradient-to-br ${t.heroGradient} text-white py-16 px-6`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                <GraduationCap className={`w-12 h-12 ${t.heroAccent}`} />
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  Builders Progress
                </h1>
              </div>
              <p className={`${t.heroText} opacity-90 text-lg md:text-xl max-w-xl`}>
                Your complete academic companion for the BSCE curriculum at FEU Tech. 
                Track progress, calculate GPA, and plan your path to graduation.
              </p>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
                <div className={`px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20`}>
                  <span className="text-2xl font-bold">{progressPercent}%</span>
                  <span className="text-sm opacity-80 ml-2">Complete</span>
                </div>
                <div className={`px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20`}>
                  <span className="text-2xl font-bold">{completedUnits}</span>
                  <span className="text-sm opacity-80 ml-2">/ {totalUnits} Units</span>
                </div>
                {activeCourses > 0 && (
                  <div className={`px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20`}>
                    <span className="text-2xl font-bold">{activeCourses}</span>
                    <span className="text-sm opacity-80 ml-2">Active</span>
                  </div>
                )}
              </div>
            </div>

            {/* Expected Graduation Card */}
            <div className={`${t.cardBg} rounded-2xl p-6 shadow-2xl max-w-sm w-full`}>
              <div className="flex items-center gap-2 mb-4">
                <Clock className={`w-5 h-5 ${t.accentText}`} />
                <h3 className={`font-semibold ${t.textPrimary}`}>Expected Graduation</h3>
              </div>
              
              {/* Entry Year Input - Always visible for editing */}
              <div className="mb-4">
                <label className={`text-xs ${t.textMuted} block mb-1`}>Year Started College:</label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  min="2000"
                  max="2100"
                  placeholder="e.g., 2022"
                  value={yearEnteredCollege}
                  onChange={(e) => {
                    // Allow only numeric input
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    setYearEnteredCollege(value);
                  }}
                  className={`w-full px-4 py-2 rounded-lg border ${t.cardBorder} ${t.cardBg} ${t.textPrimary} text-center text-lg font-semibold`}
                />
              </div>
              
              {yearEnteredCollege && expectedGraduation ? (
                <div className="text-center">
                  <div className={`text-4xl font-bold ${t.accentText} mb-1`}>
                    {expectedGraduation.term === "Completed!" ? "🎉" : expectedGraduation.year}
                  </div>
                  <div className={`text-sm ${t.textSecondary}`}>
                    {expectedGraduation.term === "Completed!" 
                      ? "Congratulations! You've completed all courses!" 
                      : `${expectedGraduation.term}, S.Y. ${expectedGraduation.year}-${expectedGraduation.year + 1}`}
                  </div>
                  {expectedGraduation.delayTerms > 0 && (
                    <div className={`mt-2 text-xs px-2 py-1 rounded-lg bg-orange-100 text-orange-700`}>
                      ⚠️ Delayed by ~{expectedGraduation.delayTerms} year{expectedGraduation.delayTerms !== 1 ? 's' : ''} due to incomplete courses
                    </div>
                  )}
                  {expectedGraduation.incompleteCourses && (
                    <div className={`mt-2 text-xs ${t.textMuted}`}>
                      {expectedGraduation.incompleteCourses} course{expectedGraduation.incompleteCourses !== 1 ? 's' : ''} remaining
                    </div>
                  )}
                </div>
              ) : yearEnteredCollege ? (
                <div className={`text-sm ${t.textMuted} text-center`}>
                  Enter a valid year (2000-2100)
                </div>
              ) : (
                <div className={`text-sm ${t.textSecondary} text-center`}>
                  Enter your entry year above to see your expected graduation
                </div>
              )}

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className={t.textMuted}>Progress</span>
                  <span className={t.textSecondary}>{progressPercent}%</span>
                </div>
                <div className={`h-2 rounded-full ${t.secondaryBg} overflow-hidden`}>
                  <div 
                    className={`h-full bg-gradient-to-r ${t.progressBar} transition-all duration-500`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className={`${t.bodyBg} py-12 px-6`}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-2xl font-bold ${t.textPrimary} mb-8 text-center`}>
            Academic Tools
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => feature.id !== "schedule" && setActivePage(feature.id)}
                disabled={feature.id === "schedule"}
                className={`${t.cardBg} rounded-xl p-5 border ${t.cardBorder} ${feature.id === "schedule" ? "opacity-60 cursor-not-allowed" : `${t.cardHover} hover:shadow-xl cursor-pointer`} transition-all duration-300 text-left group w-full sm:w-64 relative`}
              >
                {feature.id === "schedule" && (
                  <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                    Coming Soon
                  </div>
                )}
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 ${feature.id !== "schedule" ? "group-hover:scale-110" : ""} transition-transform`}>
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className={`font-semibold ${t.textPrimary} mb-1 text-sm`}>{feature.title}</h3>
                <p className={`text-xs ${t.textSecondary}`}>{feature.description}</p>
                {feature.id === "schedule" && (
                  <div className={`mt-2 flex items-center gap-1 text-amber-600`}>
                    <AlertTriangle className="w-3 h-3" />
                    <span className="text-[10px] font-medium">Under Development</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Overview Section */}
      <div className={`${t.secondaryBg} py-12 px-6 border-t ${t.cardBorder}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-2xl font-bold ${t.textPrimary} mb-8 text-center`}>
            Progress by Year
          </h2>
          
          <div className="grid md:grid-cols-4 gap-4">
            {CURRICULUM_DATA.map((year, yIdx) => {
              const yearCourses = year.terms.flatMap(t => t.courses);
              const yearPassed = yearCourses.filter(c => courseStatus[c.id] === "passed").length;
              const yearTotal = yearCourses.length;
              const yearPercent = yearTotal > 0 ? Math.round((yearPassed / yearTotal) * 100) : 0;
              const yearUnits = yearCourses.reduce((acc, c) => acc + c.units, 0);
              const yearPassedUnits = yearCourses
                .filter(c => courseStatus[c.id] === "passed")
                .reduce((acc, c) => acc + c.units, 0);
              const yearRemainingUnits = yearUnits - yearPassedUnits;

              // Calculate the gauge arc
              const gaugeRadius = 45;
              const gaugeStrokeWidth = 8;
              const gaugeCircumference = Math.PI * gaugeRadius; // Semi-circle
              const gaugeFillLength = (yearPercent / 100) * gaugeCircumference;

              return (
                <div key={yIdx} className={`${t.cardBg} rounded-xl p-4 border ${t.cardBorder}`}>
                  <h3 className={`font-semibold ${t.textPrimary} text-sm text-center mb-2`}>{year.year}</h3>
                  
                  {/* Gauge Chart */}
                  <div className="relative flex justify-center items-center mb-2">
                    <svg width="120" height="70" viewBox="0 0 120 70">
                      {/* Background arc */}
                      <path
                        d="M 10 60 A 45 45 0 0 1 110 60"
                        fill="none"
                        stroke={theme === 'dark' || theme === 'highContrast' ? '#374151' : '#e5e7eb'}
                        strokeWidth={gaugeStrokeWidth}
                        strokeLinecap="round"
                      />
                      {/* Progress arc */}
                      <path
                        d="M 10 60 A 45 45 0 0 1 110 60"
                        fill="none"
                        stroke={theme === 'feuGreen' ? '#22c55e' : theme === 'acesTheme' ? '#3b82f6' : theme === 'dark' ? '#3b82f6' : '#facc15'}
                        strokeWidth={gaugeStrokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={`${gaugeFillLength} ${gaugeCircumference}`}
                        style={{ transition: 'stroke-dasharray 0.5s ease' }}
                      />
                      {/* Percentage text */}
                      <text
                        x="60"
                        y="55"
                        textAnchor="middle"
                        className={`text-lg font-bold fill-current ${t.textPrimary}`}
                        style={{ fontSize: '18px' }}
                      >
                        {yearPercent}%
                      </text>
                    </svg>
                  </div>
                  
                  {/* Units Summary */}
                  <div className={`text-xs ${t.textSecondary} space-y-1 mb-3`}>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1">
                        <span className={`w-2 h-2 rounded-full ${theme === 'feuGreen' ? 'bg-green-500' : theme === 'acesTheme' ? 'bg-blue-500' : theme === 'dark' ? 'bg-blue-500' : 'bg-yellow-400'}`}></span>
                        Passed Units
                      </span>
                      <span className="font-semibold">{yearPassedUnits}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1">
                        <span className={`w-2 h-2 rounded-full ${theme === 'dark' || theme === 'highContrast' ? 'bg-gray-600' : 'bg-gray-300'}`}></span>
                        Remaining Units
                      </span>
                      <span className="font-semibold">{yearRemainingUnits}</span>
                    </div>
                    <div className="flex justify-between items-center pt-1 border-t border-slate-200/50">
                      <span>Total Units</span>
                      <span className="font-semibold">{yearUnits}</span>
                    </div>
                  </div>

                  {/* Term breakdown */}
                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    {year.terms.map((term, tIdx) => {
                      const termPassed = term.courses.filter(c => courseStatus[c.id] === "passed").length;
                      const termTotal = term.courses.length;
                      const termPercent = termTotal > 0 ? Math.round((termPassed / termTotal) * 100) : 0;
                      const termUnits = term.courses.reduce((acc, c) => acc + c.units, 0);
                      const termPassedUnits = term.courses
                        .filter(c => courseStatus[c.id] === "passed")
                        .reduce((acc, c) => acc + c.units, 0);
                      
                      return (
                        <div key={tIdx} className="flex items-center gap-2">
                          <span className={`text-[10px] ${t.textMuted} w-12`}>{term.termName}</span>
                          <div className={`flex-1 h-1.5 rounded-full ${t.secondaryBg} overflow-hidden`}>
                            <div 
                              className={`h-full bg-gradient-to-r ${t.progressBar} transition-all`}
                              style={{ width: `${termPercent}%` }}
                            />
                          </div>
                          <span className={`text-[10px] ${t.textMuted} w-16 text-right`}>{termPassedUnits}/{termUnits}u</span>
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

      {/* Quick Actions */}
      <div className={`${t.bodyBg} py-8 px-6 border-t ${t.cardBorder}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={STUDENT_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${t.cardBorder} ${t.cardBg} ${t.textSecondary} hover:${t.textPrimary} transition`}
            >
              <BookOpen className="w-4 h-4" />
              FEU Tech Student Portal (SOLAR)
            </a>
          </div>
        </div>
      </div>


      {/* Footer */}
      <footer className={`${t.secondaryBg} border-t ${t.cardBorder} py-8 px-6`}>
        <div className="max-w-6xl mx-auto text-center space-y-3">
          <p className={`text-sm ${t.textMuted}`}>
            Built for CE students at FEU Institute of Technology
          </p>
          <p className={`text-xs ${t.textMuted}`}>
            Data is stored locally on your device. Export your progress regularly for backup.
          </p>
          <p className={`text-xs ${t.textMuted} max-w-2xl mx-auto leading-relaxed`}>
            This is a personal and on-going project, and it's not affiliated with FEU Institute of Technology nor the FEU Tech Civil Engineering Department. Development of this website uses Github Copilot, and this website is a work-in-progress and is a pre-release. It might have some issues with the functionality of the site.
          </p>
        </div>
      </footer>
    </>
  );
};

// ---------------- GRADUATION PLANNER PAGE ----------------
const GraduationPlannerPage = ({ 
  theme, 
  courseStatus, 
  setCourseStatus,
  setSuccessMsg,
  setErrorMsg,
  onConfetti,
}) => {
  const t = THEMES[theme];
  const [planView, setPlanView] = useState("timeline"); // "timeline" | "table" | "compact"
  const [moveHistory, setMoveHistory] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState(new Set());
  const [showUnscheduled, setShowUnscheduled] = useState(true);
  const [coursePriorities, setCoursePriorities] = useState({});
  const [lockedCourses, setLockedCourses] = useState({});
  const [showPriorityModal, setShowPriorityModal] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [groupBy, setGroupBy] = useState("term"); // "term" | "year" | "department"

  // Load saved settings
  useEffect(() => {
    const savedPriorities = localStorage.getItem("ce_course_priorities");
    if (savedPriorities) setCoursePriorities(JSON.parse(savedPriorities));
    
    const savedLocked = localStorage.getItem("ce_locked_courses");
    if (savedLocked) setLockedCourses(JSON.parse(savedLocked));
  }, []);

  // Save settings
  useEffect(() => {
    localStorage.setItem("ce_course_priorities", JSON.stringify(coursePriorities));
  }, [coursePriorities]);

  useEffect(() => {
    localStorage.setItem("ce_locked_courses", JSON.stringify(lockedCourses));
  }, [lockedCourses]);

  // Get all courses flattened
  const allCourses = useMemo(() => {
    const courses = [];
    CURRICULUM_DATA.forEach((year, yIdx) => {
      year.terms.forEach((term, tIdx) => {
        term.courses.forEach((course) => {
          courses.push({
            ...course,
            yearIndex: yIdx,
            termIndex: tIdx,
            yearName: year.year,
            termName: term.termName,
            status: courseStatus[course.id] || "inactive",
          });
        });
      });
    });
    return courses;
  }, [courseStatus]);

  // Filter courses based on search
  const filteredCourses = useMemo(() => {
    if (!searchQuery) return allCourses;
    const query = searchQuery.toLowerCase();
    return allCourses.filter(c => 
      c.id.toLowerCase().includes(query) ||
      c.title.toLowerCase().includes(query)
    );
  }, [allCourses, searchQuery]);

  // Get unscheduled courses (not passed, not taking)
  const unscheduledCourses = allCourses.filter(c => 
    c.status === "inactive" && 
    !lockedCourses[c.id]
  );

  // Undo last action
  const handleUndo = () => {
    if (moveHistory.length === 0) return;
    
    const lastAction = moveHistory[moveHistory.length - 1];
    setCourseStatus(lastAction.previousState);
    setMoveHistory(prev => prev.slice(0, -1));
    setSuccessMsg("Action undone successfully!");
    setTimeout(() => setSuccessMsg(""), 2000);
  };

  // Toggle course selection
  const toggleCourseSelection = (courseId) => {
    setSelectedCourses(prev => {
      const next = new Set(prev);
      if (next.has(courseId)) {
        next.delete(courseId);
      } else {
        next.add(courseId);
      }
      return next;
    });
  };

  // Move selected courses to a status
  const moveSelectedToStatus = (newStatus) => {
    if (selectedCourses.size === 0) return;
    
    const previousState = { ...courseStatus };
    setCourseStatus(prev => {
      const next = { ...prev };
      selectedCourses.forEach(id => {
        next[id] = newStatus;
      });
      return next;
    });
    
    setMoveHistory(prev => [...prev, { 
      action: "bulk_move", 
      courses: Array.from(selectedCourses),
      previousState 
    }]);
    
    setSelectedCourses(new Set());
    setSuccessMsg(`Moved ${selectedCourses.size} course(s) to ${newStatus}`);
    setTimeout(() => setSuccessMsg(""), 2000);
    
    if (newStatus === "passed" && onConfetti) {
      onConfetti("small");
    }
  };

  // Set course priority
  const setPriority = (courseId, priority) => {
    setCoursePriorities(prev => ({
      ...prev,
      [courseId]: priority
    }));
    setShowPriorityModal(null);
  };

  // Lock course to term
  const toggleLock = (courseId) => {
    setLockedCourses(prev => {
      const next = { ...prev };
      if (next[courseId]) {
        delete next[courseId];
      } else {
        const course = allCourses.find(c => c.id === courseId);
        if (course) {
          next[courseId] = { yearIndex: course.yearIndex, termIndex: course.termIndex };
        }
      }
      return next;
    });
  };

  // Swap two courses' status
  const swapCourseStatus = () => {
    if (selectedCourses.size !== 2) {
      setErrorMsg("Select exactly 2 courses to swap their status");
      setTimeout(() => setErrorMsg(""), 2000);
      return;
    }
    
    const [courseA, courseB] = Array.from(selectedCourses);
    const statusA = courseStatus[courseA] || "inactive";
    const statusB = courseStatus[courseB] || "inactive";
    
    const previousState = { ...courseStatus };
    setCourseStatus(prev => ({
      ...prev,
      [courseA]: statusB,
      [courseB]: statusA,
    }));
    
    setMoveHistory(prev => [...prev, {
      action: "swap",
      courses: [courseA, courseB],
      previousState
    }]);
    
    setSelectedCourses(new Set());
    setSuccessMsg(`Swapped status of ${courseA} and ${courseB}`);
    setTimeout(() => setSuccessMsg(""), 2000);
  };

  // Export plan as image (simulation - would need html2canvas in production)
  const exportAsImage = () => {
    setSuccessMsg("Plan exported! (Feature in development - use browser screenshot for now)");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  // Export to calendar (ICS format simulation)
  const exportToCalendar = () => {
    const activeCourses = allCourses.filter(c => c.status === "taking");
    if (activeCourses.length === 0) {
      setErrorMsg("No active courses to export");
      setTimeout(() => setErrorMsg(""), 2000);
      return;
    }
    
    let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Builders Progress//EN
`;
    
    activeCourses.forEach(course => {
      const eventId = `${course.id}-${Date.now()}`;
      icsContent += `BEGIN:VEVENT
UID:${eventId}
SUMMARY:${course.id} - ${course.title}
DESCRIPTION:Units: ${course.units}
STATUS:CONFIRMED
END:VEVENT
`;
    });
    
    icsContent += `END:VCALENDAR`;
    
    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "course-schedule.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setSuccessMsg("Calendar exported successfully!");
    setTimeout(() => setSuccessMsg(""), 2000);
  };

  return (
    <>
      {/* Hero */}
      <div className={`${t.heroBg} text-white pb-8 pt-10 px-6 shadow-xl`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className={`w-8 h-8 ${t.heroAccent}`} />
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Graduation Planner
            </h1>
          </div>
          <p className={`${t.heroText} opacity-90 text-sm md:text-base`}>
            Plan your path to graduation with smart scheduling, priorities, and conflict detection.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${t.bodyBg} flex-1`}>
        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Toolbar */}
          <div className={`${t.cardBg} rounded-xl p-4 mb-6 shadow-sm border ${t.cardBorder}`}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* View Mode */}
              <div className="flex items-center gap-2">
                <div className={`flex items-center gap-1 ${t.secondaryBg} rounded-lg p-1`}>
                  <button
                    onClick={() => setPlanView("timeline")}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition flex items-center gap-1 ${
                      planView === "timeline"
                        ? `${t.primaryBtn} ${t.primaryBtnText}`
                        : `${t.textSecondary} hover:${t.textPrimary}`
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    Timeline
                  </button>
                  <button
                    onClick={() => setPlanView("table")}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition flex items-center gap-1 ${
                      planView === "table"
                        ? `${t.primaryBtn} ${t.primaryBtnText}`
                        : `${t.textSecondary} hover:${t.textPrimary}`
                    }`}
                  >
                    <Table className="w-3.5 h-3.5" />
                    Table
                  </button>
                  <button
                    onClick={() => setPlanView("compact")}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition flex items-center gap-1 ${
                      planView === "compact"
                        ? `${t.primaryBtn} ${t.primaryBtnText}`
                        : `${t.textSecondary} hover:${t.textPrimary}`
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    Compact
                  </button>
                </div>

                {/* Group By */}
                <select
                  value={groupBy}
                  onChange={(e) => setGroupBy(e.target.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs border ${t.cardBorder} ${t.cardBg} ${t.textSecondary}`}
                >
                  <option value="term">Group by Term</option>
                  <option value="year">Group by Year</option>
                  <option value="department">Group by Department</option>
                </select>
              </div>

              {/* Search */}
              <div className="relative flex-1 max-w-xs">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${t.textMuted}`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses..."
                  className={`w-full pl-9 pr-4 py-1.5 rounded-lg text-xs border ${t.cardBorder} ${t.cardBg} ${t.textPrimary}`}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleUndo}
                  disabled={moveHistory.length === 0}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border ${t.cardBorder} ${t.textSecondary} hover:${t.textPrimary} transition disabled:opacity-50`}
                >
                  <Undo2 className="w-3.5 h-3.5" />
                  Undo
                </button>
                <button
                  onClick={exportAsImage}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border ${t.cardBorder} ${t.textSecondary} hover:${t.textPrimary} transition`}
                >
                  <Image className="w-3.5 h-3.5" />
                  Export Image
                </button>
                <button
                  onClick={exportToCalendar}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border ${t.cardBorder} ${t.textSecondary} hover:${t.textPrimary} transition`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Export Calendar
                </button>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedCourses.size > 0 && (
              <div className={`mt-4 pt-4 border-t ${t.cardBorder} flex items-center gap-4`}>
                <span className={`text-sm ${t.textSecondary}`}>
                  {selectedCourses.size} course(s) selected
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => moveSelectedToStatus("taking")}
                    className={`px-3 py-1 rounded-lg text-xs font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition`}
                  >
                    Mark Active
                  </button>
                  <button
                    onClick={() => moveSelectedToStatus("passed")}
                    className={`px-3 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-700 hover:bg-green-200 transition`}
                  >
                    Mark Passed
                  </button>
                  <button
                    onClick={() => moveSelectedToStatus("inactive")}
                    className={`px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition`}
                  >
                    Mark Inactive
                  </button>
                  {selectedCourses.size === 2 && (
                    <button
                      onClick={swapCourseStatus}
                      className={`px-3 py-1 rounded-lg text-xs font-medium bg-purple-100 text-purple-700 hover:bg-purple-200 transition flex items-center gap-1`}
                    >
                      <ArrowLeftRight className="w-3.5 h-3.5" />
                      Swap Status
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedCourses(new Set())}
                    className={`px-3 py-1 rounded-lg text-xs font-medium ${t.textMuted} hover:${t.textSecondary}`}
                  >
                    Clear Selection
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Plan View */}
          {planView === "table" ? (
            /* Table View */
            <div className={`${t.cardBg} rounded-xl shadow-sm border ${t.cardBorder} overflow-hidden`}>
              <div className="overflow-x-auto">
                <table className={`w-full text-xs ${t.textPrimary}`}>
                  <thead className={`${t.secondaryBg} border-b ${t.cardBorder}`}>
                    <tr>
                      <th className="w-8 px-3 py-3">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCourses(new Set(filteredCourses.map(c => c.id)));
                            } else {
                              setSelectedCourses(new Set());
                            }
                          }}
                          checked={selectedCourses.size === filteredCourses.length && filteredCourses.length > 0}
                        />
                      </th>
                      <th className="text-left px-3 py-3 font-semibold">Code</th>
                      <th className="text-left px-3 py-3 font-semibold">Title</th>
                      <th className="text-center px-3 py-3 font-semibold">Units</th>
                      <th className="text-center px-3 py-3 font-semibold">Year</th>
                      <th className="text-center px-3 py-3 font-semibold">Term</th>
                      <th className="text-center px-3 py-3 font-semibold">Status</th>
                      <th className="text-center px-3 py-3 font-semibold">Priority</th>
                      <th className="text-center px-3 py-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCourses.map((course) => (
                      <tr 
                        key={course.id} 
                        className={`border-b ${t.cardBorder} hover:${t.secondaryBg} ${
                          selectedCourses.has(course.id) ? t.highlightBg : ''
                        } ${course.status === 'passed' ? t.passedBg : ''}`}
                      >
                        <td className="px-3 py-2">
                          <input
                            type="checkbox"
                            checked={selectedCourses.has(course.id)}
                            onChange={() => toggleCourseSelection(course.id)}
                          />
                        </td>
                        <td className="px-3 py-2 font-mono font-semibold">{course.id}</td>
                        <td className="px-3 py-2">{course.title}</td>
                        <td className="px-3 py-2 text-center">{course.units}</td>
                        <td className="px-3 py-2 text-center">{course.yearName}</td>
                        <td className="px-3 py-2 text-center">{course.termName}</td>
                        <td className="px-3 py-2 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                            course.status === 'passed' ? t.passedBadge :
                            course.status === 'taking' ? t.takingBadge :
                            `${t.secondaryBg} ${t.textMuted}`
                          }`}>
                            {course.status === 'passed' ? 'Passed' : course.status === 'taking' ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-center">
                          <button
                            onClick={() => setShowPriorityModal(course.id)}
                            className={`text-xs ${coursePriorities[course.id] ? 'text-orange-600' : t.textMuted}`}
                          >
                            {coursePriorities[course.id] || 'Normal'}
                          </button>
                        </td>
                        <td className="px-3 py-2 text-center">
                          <button
                            onClick={() => toggleLock(course.id)}
                            className={`p-1 rounded ${lockedCourses[course.id] ? 'text-red-500' : t.textMuted} hover:opacity-70`}
                            title={lockedCourses[course.id] ? "Unlock from term" : "Lock to term"}
                          >
                            <Lock className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : planView === "compact" ? (
            /* Compact View */
            <div className="space-y-4">
              {CURRICULUM_DATA.map((year, yIdx) => (
                <div key={yIdx} className={`${t.cardBg} rounded-xl shadow-sm border ${t.cardBorder} p-4`}>
                  <h3 className={`font-semibold ${t.textPrimary} mb-3`}>{year.year}</h3>
                  <div className="flex flex-wrap gap-2">
                    {year.terms.flatMap(term => term.courses).map(course => {
                      const status = courseStatus[course.id] || "inactive";
                      return (
                        <button
                          key={course.id}
                          onClick={() => toggleCourseSelection(course.id)}
                          className={`px-2 py-1 rounded-lg text-[10px] font-medium border transition ${
                            selectedCourses.has(course.id) 
                              ? 'ring-2 ring-blue-500' 
                              : ''
                          } ${
                            status === 'passed' 
                              ? `${t.passedBg} ${t.passedBorder}` 
                              : status === 'taking'
                              ? 'bg-blue-50 border-blue-200'
                              : `${t.secondaryBg} ${t.cardBorder}`
                          }`}
                        >
                          {course.id}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Timeline View (default) */
            <div className="grid md:grid-cols-4 gap-4">
              {CURRICULUM_DATA.map((year, yIdx) => (
                <div key={yIdx} className="space-y-3">
                  <h3 className={`font-semibold ${t.textPrimary} text-center`}>{year.year}</h3>
                  {year.terms.map((term, tIdx) => {
                    const termCourses = term.courses.filter(c => 
                      !searchQuery || 
                      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      c.title.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                    
                    return (
                      <div key={tIdx} className={`${t.cardBg} rounded-xl shadow-sm border ${t.cardBorder} p-3`}>
                        <div className={`text-xs font-semibold ${t.textSecondary} mb-2 uppercase tracking-wide`}>
                          {term.termName}
                        </div>
                        <div className="space-y-1.5">
                          {termCourses.map(course => {
                            const status = courseStatus[course.id] || "inactive";
                            const isSelected = selectedCourses.has(course.id);
                            const isLocked = !!lockedCourses[course.id];
                            const priority = coursePriorities[course.id];
                            
                            return (
                              <div
                                key={course.id}
                                onClick={() => toggleCourseSelection(course.id)}
                                className={`p-2 rounded-lg border cursor-pointer transition ${
                                  isSelected ? 'ring-2 ring-blue-500' : ''
                                } ${
                                  status === 'passed' 
                                    ? `${t.passedBg} ${t.passedBorder}` 
                                    : status === 'taking'
                                    ? 'bg-blue-50 border-blue-200'
                                    : `${t.secondaryBg} ${t.cardBorder} hover:border-slate-300`
                                }`}
                              >
                                <div className="flex items-start justify-between gap-1">
                                  <div className="min-w-0">
                                    <div className={`text-[10px] font-mono font-bold ${t.textSecondary}`}>
                                      {course.id}
                                    </div>
                                    <div className={`text-[10px] ${t.textPrimary} truncate`}>
                                      {course.title}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1 flex-shrink-0">
                                    {priority && (
                                      <span className="text-[8px] px-1 py-0.5 rounded bg-orange-100 text-orange-600">
                                        {priority}
                                      </span>
                                    )}
                                    {isLocked && (
                                      <Lock className="w-3 h-3 text-red-500" />
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
              ))}
            </div>
          )}

          {/* Unscheduled Courses Floating Card */}
          {showUnscheduled && unscheduledCourses.length > 0 && (
            <div className={`fixed bottom-6 right-6 ${t.cardBg} rounded-xl shadow-2xl border ${t.cardBorder} p-4 max-w-sm z-30`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Inbox className={`w-4 h-4 ${t.accentText}`} />
                  <span className={`text-sm font-semibold ${t.textPrimary}`}>
                    Unscheduled ({unscheduledCourses.length})
                  </span>
                </div>
                <button
                  onClick={() => setShowUnscheduled(false)}
                  className={`${t.textMuted} hover:${t.textSecondary}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="max-h-48 overflow-y-auto space-y-1">
                {unscheduledCourses.slice(0, 10).map(course => (
                  <div
                    key={course.id}
                    className={`p-2 rounded-lg ${t.secondaryBg} text-xs`}
                  >
                    <span className="font-mono font-semibold">{course.id}</span>
                    <span className={`${t.textMuted} ml-2`}>{course.units}u</span>
                  </div>
                ))}
                {unscheduledCourses.length > 10 && (
                  <div className={`text-xs ${t.textMuted} text-center pt-1`}>
                    +{unscheduledCourses.length - 10} more
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Show Unscheduled button when hidden */}
          {!showUnscheduled && unscheduledCourses.length > 0 && (
            <button
              onClick={() => setShowUnscheduled(true)}
              className={`fixed bottom-6 right-6 ${t.primaryBtn} ${t.primaryBtnText} px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 z-30`}
            >
              <Inbox className="w-4 h-4" />
              Unscheduled ({unscheduledCourses.length})
            </button>
          )}
        </div>
      </div>

      {/* Priority Modal */}
      {showPriorityModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${t.cardBg} rounded-2xl shadow-2xl max-w-xs w-full p-6`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-sm font-semibold ${t.textPrimary}`}>Set Priority</h3>
              <button
                onClick={() => setShowPriorityModal(null)}
                className={`${t.textMuted} hover:${t.textSecondary}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              {['High', 'Normal', 'Low'].map(p => (
                <button
                  key={p}
                  onClick={() => setPriority(showPriorityModal, p === 'Normal' ? null : p)}
                  className={`w-full p-3 rounded-lg text-sm text-left transition ${
                    (coursePriorities[showPriorityModal] || 'Normal') === p
                      ? `${t.primaryBtn} ${t.primaryBtnText}`
                      : `${t.secondaryBg} ${t.textSecondary} hover:opacity-80`
                  }`}
                >
                  {p} Priority
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ---------------- SCHEDULE MAKER PAGE ----------------
const ScheduleMakerPage = ({ 
  theme, 
  courseStatus,
  setSuccessMsg,
  setErrorMsg,
}) => {
  const t = THEMES[theme];
  const [selectedSections, setSelectedSections] = useState([]);
  const [groupBy, setGroupBy] = useState("course"); // "course" | "department" | "room" | "section"
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("table"); // "table" | "card"

  // Mock schedule data - in production, this would come from the student portal
  const mockSections = useMemo(() => {
    const sections = [];
    const days = ["M", "T", "W", "Th", "F", "S"];
    const dayPairs = [["M", "W"], ["T", "Th"], ["M", "Th"], ["T", "F"], ["W", "F"], ["M", "F"]];
    const times = ["7:00 AM", "8:30 AM", "10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"];
    const rooms = ["R301", "R302", "R303", "R401", "R402", "LAB1", "LAB2"];
    const instructorNames = [
      "Prof. Santos", "Prof. Cruz", "Prof. Reyes", "Prof. Garcia", "Prof. Mendoza",
      "Prof. Torres", "Prof. Flores", "Prof. Rivera", "Prof. Gonzales", "Prof. Ramos",
      "Engr. Dela Cruz", "Engr. Villanueva", "Engr. Bautista", "Engr. Aquino", "Engr. Fernandez"
    ];
    
    CURRICULUM_DATA.forEach(year => {
      year.terms.forEach(term => {
        term.courses.forEach(course => {
          const status = courseStatus[course.id] || "inactive";
          if (status !== "passed") {
            // Generate 2-3 mock sections per course
            const numSections = Math.floor(Math.random() * 2) + 2;
            for (let i = 0; i < numSections; i++) {
              const sectionLetter = String.fromCharCode(65 + i);
              const dayPair = dayPairs[Math.floor(Math.random() * dayPairs.length)];
              const time = times[Math.floor(Math.random() * times.length)];
              const room = rooms[Math.floor(Math.random() * rooms.length)];
              const instructor = instructorNames[Math.floor(Math.random() * instructorNames.length)];
              
              sections.push({
                id: `${course.id}-${sectionLetter}`,
                courseId: course.id,
                courseTitle: course.title,
                section: sectionLetter,
                units: course.units,
                schedule: `${dayPair[0]}/${dayPair[1]} ${time}`,
                room: room,
                instructor: instructor,
                slots: Math.floor(Math.random() * 40) + 5,
                department: course.id.startsWith("CE") ? "CE" : course.id.startsWith("COE") ? "COE" : "GED",
              });
            }
          }
        });
      });
    });
    
    return sections;
  }, [courseStatus]);

  // Filter sections
  const filteredSections = useMemo(() => {
    if (!searchQuery) return mockSections;
    const query = searchQuery.toLowerCase();
    return mockSections.filter(s =>
      s.courseId.toLowerCase().includes(query) ||
      s.courseTitle.toLowerCase().includes(query) ||
      s.section.toLowerCase().includes(query) ||
      s.room.toLowerCase().includes(query) ||
      s.schedule.toLowerCase().includes(query)
    );
  }, [mockSections, searchQuery]);

  // Group sections
  const groupedSections = useMemo(() => {
    const groups = {};
    filteredSections.forEach(section => {
      let key;
      switch (groupBy) {
        case "department":
          key = section.department;
          break;
        case "room":
          key = section.room;
          break;
        case "section":
          key = section.section;
          break;
        default:
          key = `${section.courseId} – ${section.courseTitle}`;
      }
      if (!groups[key]) groups[key] = [];
      groups[key].push(section);
    });
    return groups;
  }, [filteredSections, groupBy]);

  // Add section to schedule
  const addToSchedule = (section) => {
    // Check for time conflicts
    const conflict = selectedSections.find(s => 
      s.schedule === section.schedule && s.id !== section.id
    );
    
    if (conflict) {
      setErrorMsg(`Schedule conflict with ${conflict.courseId} Section ${conflict.section}`);
      setTimeout(() => setErrorMsg(""), 3000);
      return;
    }
    
    // Check if course already added
    const existing = selectedSections.find(s => s.courseId === section.courseId);
    if (existing) {
      setErrorMsg(`${section.courseId} is already in your schedule`);
      setTimeout(() => setErrorMsg(""), 3000);
      return;
    }

    // Check credit limit warning
    const newTotalUnits = totalUnits + section.units;
    if (newTotalUnits > 21) {
      setErrorMsg(`Warning: Adding this course will put you at ${newTotalUnits} units (over typical 21 unit limit)`);
      setTimeout(() => setErrorMsg(""), 4000);
    }

    // Check prerequisite status
    const courseData = CURRICULUM_DATA.flatMap(y => y.terms.flatMap(t => t.courses)).find(c => c.id === section.courseId);
    if (courseData && courseData.prereqs.length > 0) {
      const unmetPrereqs = courseData.prereqs.filter(prereqId => courseStatus[prereqId] !== "passed");
      if (unmetPrereqs.length > 0) {
        setErrorMsg(`Warning: Prerequisites not met: ${unmetPrereqs.join(", ")}`);
        setTimeout(() => setErrorMsg(""), 4000);
      }
    }
    
    setSelectedSections(prev => [...prev, section]);
    setSuccessMsg(`Added ${section.courseId} Section ${section.section} to schedule`);
    setTimeout(() => setSuccessMsg(""), 2000);
  };

  // Remove section from schedule
  const removeFromSchedule = (sectionId) => {
    setSelectedSections(prev => prev.filter(s => s.id !== sectionId));
  };

  // Calculate total units
  const totalUnits = selectedSections.reduce((acc, s) => acc + s.units, 0);

  // Check for warnings
  const getScheduleWarnings = () => {
    const warnings = [];
    
    if (totalUnits > 21) {
      warnings.push({ type: "credit", message: `Credit limit exceeded: ${totalUnits} units (typical max: 21)` });
    }
    
    // Check for prerequisite issues
    selectedSections.forEach(section => {
      const courseData = CURRICULUM_DATA.flatMap(y => y.terms.flatMap(t => t.courses)).find(c => c.id === section.courseId);
      if (courseData && courseData.prereqs.length > 0) {
        const unmetPrereqs = courseData.prereqs.filter(prereqId => courseStatus[prereqId] !== "passed");
        if (unmetPrereqs.length > 0) {
          warnings.push({ 
            type: "prereq", 
            message: `${section.courseId}: Missing prerequisites (${unmetPrereqs.join(", ")})` 
          });
        }
      }
    });

    // Check for petition-required courses
    selectedSections.forEach(section => {
      if (isPetitionRequired(section.courseId)) {
        warnings.push({
          type: "petition",
          message: `${section.courseId}: May require petition for enrollment`
        });
      }
    });
    
    return warnings;
  };

  const scheduleWarnings = getScheduleWarnings();

  // Constants for ICS export
  const DEFAULT_CLASS_DURATION_MINUTES = 90; // Standard 1.5 hour class duration
  const WEEKS_IN_SEMESTER = 16; // Standard semester length
  
  // Day abbreviation to offset mapping (0 = Monday)
  const DAY_ABBREVIATION_MAP = { 'M': 0, 'T': 1, 'W': 2, 'Th': 3, 'F': 4, 'S': 5 };

  // Export schedule as ICS (iCalendar format)
  const exportScheduleICS = () => {
    if (selectedSections.length === 0) {
      setErrorMsg("No courses selected to export");
      setTimeout(() => setErrorMsg(""), 3000);
      return;
    }

    // Generate start date (next Monday)
    const today = new Date();
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7 || 7));
    
    const formatDate = (date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    let icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Builders Progress//Schedule Maker//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'X-WR-CALNAME:My Course Schedule',
    ].join('\r\n') + '\r\n';

    selectedSections.forEach((section, idx) => {
      // Parse schedule (e.g., "M/W 7:00 AM")
      const scheduleParts = section.schedule.split(' ');
      const days = scheduleParts[0].split('/');
      const timeStr = scheduleParts.slice(1).join(' ');
      
      // Convert time string to hours (simplified)
      const timeMatch = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
      let hours = 0;
      let minutes = 0;
      if (timeMatch) {
        hours = parseInt(timeMatch[1]);
        minutes = parseInt(timeMatch[2]);
        if (timeMatch[3].toUpperCase() === 'PM' && hours !== 12) hours += 12;
        if (timeMatch[3].toUpperCase() === 'AM' && hours === 12) hours = 0;
      }

      days.forEach(day => {
        const dayOffset = DAY_ABBREVIATION_MAP[day] || 0;
        const eventDate = new Date(nextMonday);
        eventDate.setDate(nextMonday.getDate() + dayOffset);
        eventDate.setHours(hours, minutes, 0, 0);
        
        const endDate = new Date(eventDate);
        endDate.setMinutes(endDate.getMinutes() + DEFAULT_CLASS_DURATION_MINUTES);

        const uid = `${section.id}-${day}-${Date.now()}-${idx}@builders-progress`;
        
        icsContent += [
          'BEGIN:VEVENT',
          `UID:${uid}`,
          `DTSTAMP:${formatDate(new Date())}`,
          `DTSTART:${formatDate(eventDate)}`,
          `DTEND:${formatDate(endDate)}`,
          `SUMMARY:${section.courseId} - ${section.section}`,
          `DESCRIPTION:${section.courseTitle}\\nInstructor: ${section.instructor}\\nUnits: ${section.units}`,
          `LOCATION:${section.room}`,
          `RRULE:FREQ=WEEKLY;COUNT=${WEEKS_IN_SEMESTER}`,
          'STATUS:CONFIRMED',
          'END:VEVENT',
        ].join('\r\n') + '\r\n';
      });
    });

    icsContent += 'END:VCALENDAR';

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const dateStr = new Date().toISOString().split('T')[0];
    a.download = `course-schedule-${dateStr}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setSuccessMsg("Schedule exported to ICS! Import this file to Google Calendar, Outlook, or Apple Calendar.");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  // Export schedule as CSV
  const exportScheduleCSV = () => {
    if (selectedSections.length === 0) {
      setErrorMsg("No courses selected to export");
      setTimeout(() => setErrorMsg(""), 3000);
      return;
    }

    const headers = ['Course Code', 'Section', 'Title', 'Units', 'Schedule', 'Room', 'Instructor'];
    const rows = selectedSections.map(s => [
      s.courseId,
      s.section,
      `"${s.courseTitle}"`,
      s.units,
      `"${s.schedule}"`,
      s.room,
      `"${s.instructor}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const dateStr = new Date().toISOString().split('T')[0];
    a.download = `course-schedule-${dateStr}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setSuccessMsg("Schedule exported to CSV!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  // Export schedule as image
  const exportScheduleImage = () => {
    setSuccessMsg("Schedule exported! (Use browser screenshot for now)");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <>
      {/* Hero */}
      <div className={`${t.heroBg} text-white pb-8 pt-10 px-6 shadow-xl`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Table className={`w-8 h-8 ${t.heroAccent}`} />
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Schedule Maker
            </h1>
          </div>
          <p className={`${t.heroText} opacity-90 text-sm md:text-base`}>
            Build your mock enrolment schedule. Select sections and check for conflicts.
          </p>
          <p className={`text-xs ${t.heroText} opacity-70 mt-2`}>
            Data source: <a href={STUDENT_PORTAL_URL} target="_blank" rel="noopener noreferrer" className="underline">solar.feutech.edu.ph/course/offerings</a>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${t.bodyBg} flex-1`}>
        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Warnings Panel */}
          {scheduleWarnings.length > 0 && (
            <div className={`mb-6 ${t.cardBg} rounded-xl border border-orange-300 p-4`}>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <h3 className={`font-semibold ${t.textPrimary}`}>Schedule Warnings</h3>
              </div>
              <div className="space-y-2">
                {scheduleWarnings.map((warning, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                      warning.type === "credit" ? "bg-red-100 text-red-700" :
                      warning.type === "prereq" ? "bg-orange-100 text-orange-700" :
                      "bg-amber-100 text-amber-700"
                    }`}>
                      {warning.type === "credit" ? "Credit" : 
                       warning.type === "prereq" ? "Prereq" : "Petition"}
                    </span>
                    <span className={t.textSecondary}>{warning.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Summary Stats */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className={`${t.cardBg} rounded-xl p-4 border ${t.cardBorder}`}>
              <div className={`text-xs ${t.textMuted} uppercase tracking-wide`}>Selected Courses</div>
              <div className={`text-2xl font-bold ${t.textPrimary}`}>{selectedSections.length}</div>
            </div>
            <div className={`${t.cardBg} rounded-xl p-4 border ${t.cardBorder}`}>
              <div className={`text-xs ${t.textMuted} uppercase tracking-wide`}>Total Units</div>
              <div className={`text-2xl font-bold ${t.textPrimary}`}>{totalUnits}</div>
              {totalUnits > 21 && (
                <div className="text-xs text-orange-600 mt-1">⚠️ Over typical limit</div>
              )}
            </div>
            <div className={`${t.cardBg} rounded-xl p-4 border ${t.cardBorder}`}>
              <div className={`text-xs ${t.textMuted} uppercase tracking-wide`}>Available Sections</div>
              <div className={`text-2xl font-bold ${t.textPrimary}`}>{filteredSections.length}</div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Selected Schedule */}
            <div className={`${t.cardBg} rounded-xl border ${t.cardBorder} p-4`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`font-semibold ${t.textPrimary} flex items-center gap-2`}>
                  <Calendar className={`w-4 h-4 ${t.accentText}`} />
                  My Schedule
                </h2>
              </div>
              
              {/* Export Options */}
              {selectedSections.length > 0 && (
                <div className={`mb-4 p-3 rounded-lg ${t.secondaryBg} border ${t.cardBorder}`}>
                  <p className={`text-xs ${t.textMuted} mb-2`}>Export to:</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={exportScheduleICS}
                      className={`text-xs px-2 py-1 rounded-lg ${t.primaryBtn} ${t.primaryBtnText} flex items-center gap-1`}
                      title="Import to Google Calendar, Outlook, or Apple Calendar"
                    >
                      <Calendar className="w-3 h-3" />
                      Google Calendar (ICS)
                    </button>
                    <button
                      onClick={exportScheduleCSV}
                      className={`text-xs px-2 py-1 rounded-lg border ${t.cardBorder} ${t.textSecondary} hover:${t.textPrimary} flex items-center gap-1`}
                      title="Download as CSV spreadsheet"
                    >
                      <FileText className="w-3 h-3" />
                      CSV
                    </button>
                  </div>
                </div>
              )}
              
              {selectedSections.length === 0 ? (
                <div className={`text-sm ${t.textMuted} text-center py-8`}>
                  No courses selected yet. Browse available sections and add them to your schedule.
                </div>
              ) : (
                <div className="space-y-2">
                  {selectedSections.map(section => (
                    <div key={section.id} className={`p-3 rounded-lg ${t.secondaryBg} border ${t.cardBorder}`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className={`text-xs font-mono font-bold ${t.textPrimary}`}>
                            {section.courseId} – {section.section}
                          </div>
                          <div className={`text-[10px] ${t.textSecondary} mt-0.5`}>
                            {section.courseTitle}
                          </div>
                          <div className={`text-[10px] ${t.textMuted} mt-1`}>
                            {section.schedule} • {section.room}
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromSchedule(section.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Available Sections */}
            <div className="md:col-span-2">
              {/* Toolbar */}
              <div className={`${t.cardBg} rounded-xl border ${t.cardBorder} p-4 mb-4`}>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  {/* Search */}
                  <div className="relative flex-1 max-w-xs">
                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${t.textMuted}`} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search courses, rooms, times..."
                      className={`w-full pl-9 pr-4 py-2 rounded-lg text-sm border ${t.cardBorder} ${t.cardBg} ${t.textPrimary}`}
                    />
                  </div>

                  {/* Group By */}
                  <div className="flex items-center gap-2">
                    <span className={`text-xs ${t.textMuted}`}>Group by:</span>
                    <div className={`flex items-center gap-1 ${t.secondaryBg} rounded-lg p-1`}>
                      <button
                        onClick={() => setGroupBy("course")}
                        className={`px-2 py-1 rounded text-xs transition ${groupBy === "course" ? `${t.primaryBtn} ${t.primaryBtnText}` : `${t.textSecondary}`}`}
                      >
                        <Code className="w-3 h-3 inline mr-1" />
                        Course
                      </button>
                      <button
                        onClick={() => setGroupBy("department")}
                        className={`px-2 py-1 rounded text-xs transition ${groupBy === "department" ? `${t.primaryBtn} ${t.primaryBtnText}` : `${t.textSecondary}`}`}
                      >
                        <Building2 className="w-3 h-3 inline mr-1" />
                        Dept
                      </button>
                      <button
                        onClick={() => setGroupBy("room")}
                        className={`px-2 py-1 rounded text-xs transition ${groupBy === "room" ? `${t.primaryBtn} ${t.primaryBtnText}` : `${t.textSecondary}`}`}
                      >
                        <MapPin className="w-3 h-3 inline mr-1" />
                        Room
                      </button>
                    </div>
                  </div>

                  {/* View Mode */}
                  <div className={`flex items-center gap-1 ${t.secondaryBg} rounded-lg p-1`}>
                    <button
                      onClick={() => setViewMode("table")}
                      className={`px-2 py-1 rounded text-xs transition ${viewMode === "table" ? `${t.primaryBtn} ${t.primaryBtnText}` : `${t.textSecondary}`}`}
                    >
                      <Table className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setViewMode("card")}
                      className={`px-2 py-1 rounded text-xs transition ${viewMode === "card" ? `${t.primaryBtn} ${t.primaryBtnText}` : `${t.textSecondary}`}`}
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Filter Summary */}
                <div className={`text-xs ${t.textMuted} mt-3`}>
                  Showing {filteredSections.length} section{filteredSections.length !== 1 ? 's' : ''} 
                  in {Object.keys(groupedSections).length} group{Object.keys(groupedSections).length !== 1 ? 's' : ''}
                </div>
              </div>

              {/* Sections List */}
              <div className={`${t.cardBg} rounded-xl border ${t.cardBorder} overflow-hidden`}>
                {Object.entries(groupedSections).map(([groupName, sections]) => (
                  <div key={groupName} className={`border-b ${t.cardBorder} last:border-b-0`}>
                    <div className={`px-4 py-2 ${t.secondaryBg} font-semibold text-sm ${t.textPrimary}`}>
                      {groupName}
                    </div>
                    
                    {viewMode === "table" ? (
                      <table className="w-full text-xs">
                        <thead className={`${t.secondaryBg}`}>
                          <tr>
                            <th className="px-4 py-2 text-left font-medium">Section</th>
                            <th className="px-4 py-2 text-left font-medium">Schedule</th>
                            <th className="px-4 py-2 text-left font-medium">Room</th>
                            <th className="px-4 py-2 text-center font-medium">Units</th>
                            <th className="px-4 py-2 text-center font-medium">Slots</th>
                            <th className="px-4 py-2 text-center font-medium">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sections.map(section => {
                            const isSelected = selectedSections.some(s => s.id === section.id);
                            const hasConflict = selectedSections.some(s => 
                              s.schedule === section.schedule && s.id !== section.id
                            );
                            
                            return (
                              <tr key={section.id} className={`border-t ${t.cardBorder} ${isSelected ? t.passedBg : ''}`}>
                                <td className={`px-4 py-2 font-mono ${t.textPrimary}`}>
                                  {section.courseId}-{section.section}
                                </td>
                                <td className={`px-4 py-2 ${t.textSecondary}`}>{section.schedule}</td>
                                <td className={`px-4 py-2 ${t.textSecondary}`}>{section.room}</td>
                                <td className={`px-4 py-2 text-center ${t.textSecondary}`}>{section.units}</td>
                                <td className={`px-4 py-2 text-center ${t.textSecondary}`}>{section.slots}</td>
                                <td className="px-4 py-2 text-center">
                                  {isSelected ? (
                                    <button
                                      onClick={() => removeFromSchedule(section.id)}
                                      className="text-red-500 text-xs"
                                    >
                                      Remove
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => addToSchedule(section)}
                                      className={`text-xs ${hasConflict ? 'text-orange-500' : t.accentText}`}
                                    >
                                      {hasConflict ? '⚠️ Add' : 'Add'}
                                    </button>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    ) : (
                      <div className="p-4 grid md:grid-cols-2 gap-3">
                        {sections.map(section => {
                          const isSelected = selectedSections.some(s => s.id === section.id);
                          
                          return (
                            <div
                              key={section.id}
                              className={`p-3 rounded-lg border ${isSelected ? `${t.passedBg} ${t.passedBorder}` : `${t.secondaryBg} ${t.cardBorder}`}`}
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className={`text-xs font-mono font-bold ${t.textPrimary}`}>
                                    {section.courseId}-{section.section}
                                  </div>
                                  <div className={`text-[10px] ${t.textSecondary}`}>{section.schedule}</div>
                                  <div className={`text-[10px] ${t.textMuted}`}>{section.room} • {section.units}u • {section.slots} slots</div>
                                </div>
                                {isSelected ? (
                                  <button
                                    onClick={() => removeFromSchedule(section.id)}
                                    className="text-red-500"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => addToSchedule(section)}
                                    className={`${t.primaryBtn} ${t.primaryBtnText} text-xs px-2 py-1 rounded`}
                                  >
                                    Add
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
                
                {Object.keys(groupedSections).length === 0 && (
                  <div className={`p-8 text-center ${t.textMuted}`}>
                    No sections found matching your search.
                  </div>
                )}
              </div>
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
  const [activePage, setActivePage] = useState("home"); // "home" | "tracker" | "gpa" | "visualizer" | "planner" | "schedule"
  const [theme, setTheme] = useState("feuGreen"); // "feuGreen" | "acesTheme" | "dark" | "highContrast"
  const [viewMode, setViewMode] = useState("card"); // "card" | "timeline" | "table" | "compact"
  const [showWhatCanITake, setShowWhatCanITake] = useState(false);
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const [yearEnteredCollege, setYearEnteredCollege] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiSize, setConfettiSize] = useState("small");
  const [confettiRunning, setConfettiRunning] = useState(true);
  const [showThemeModal, setShowThemeModal] = useState(false);
  
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
        if (decoded.graduationDate) setYearEnteredCollege(decoded.graduationDate);
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
    
    const savedYearEntered = localStorage.getItem("ce_year_entered");
    if (savedYearEntered) {
      setYearEnteredCollege(savedYearEntered);
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
    localStorage.setItem("ce_year_entered", yearEnteredCollege);
  }, [yearEnteredCollege]);
  
  useEffect(() => {
    localStorage.setItem("ce_view_mode", viewMode);
  }, [viewMode]);

  // Handle confetti
  const triggerConfetti = useCallback((size) => {
    setConfettiSize(size);
    setConfettiRunning(true);
    setShowConfetti(true);
    // Stop producing new confetti after the display time, but keep showing until complete
    setTimeout(() => setConfettiRunning(false), size === "big" ? 5000 : 2000);
  }, []);

  // Called when all confetti pieces have left the screen
  const handleConfettiComplete = useCallback(() => {
    setShowConfetti(false);
    setConfettiRunning(true); // Reset for next trigger
  }, []);

  return (
    <div className={`min-h-screen ${t.bodyBg} font-sans ${t.textPrimary} flex flex-col`}>
      <Analytics />
      <SpeedInsights />
      
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={confettiRunning}
          numberOfPieces={confettiRunning ? (confettiSize === "big" ? 500 : 100) : 0}
          gravity={confettiSize === "big" ? 0.3 : 0.5}
          onConfettiComplete={handleConfettiComplete}
        />
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
                    <div className={`font-medium ${theme === key ? '' : t.textPrimary}`}>{themeData.name}</div>
                    <div className={`text-xs ${theme === key ? 'opacity-70' : t.textMuted}`}>
                      {key === "feuGreen" && "School colors theme"}
                      {key === "feuGold" && "FEU Gold color palette"}
                      {key === "acesTheme" && "ACES blue color palette"}
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
          <button 
            onClick={() => setActivePage("home")}
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <GraduationCap className={`w-5 h-5 ${t.accentText}`} />
            <span className={`font-semibold ${t.textPrimary} text-sm md:text-base`}>
              Builders Progress
            </span>
          </button>
          <nav className="flex items-center gap-1 md:gap-2 text-xs md:text-sm overflow-x-auto">
            <button
              type="button"
              onClick={() => setActivePage("home")}
              className={`inline-flex items-center gap-1 px-2 md:px-3 py-1.5 rounded-full border text-xs md:text-sm transition ${
                activePage === "home"
                  ? t.navActive
                  : `${t.cardBg} ${t.textSecondary} ${t.cardBorder} hover:opacity-80`
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="hidden md:inline">Home</span>
            </button>
            <button
              type="button"
              onClick={() => setActivePage("tracker")}
              className={`inline-flex items-center gap-1 px-2 md:px-3 py-1.5 rounded-full border text-xs md:text-sm transition ${
                activePage === "tracker"
                  ? t.navActive
                  : `${t.cardBg} ${t.textSecondary} ${t.cardBorder} hover:opacity-80`
              }`}
            >
              <LayoutTemplate className="w-4 h-4" />
              <span className="hidden md:inline">Tracker</span>
            </button>
            <button
              type="button"
              onClick={() => setActivePage("gpa")}
              className={`inline-flex items-center gap-1 px-2 md:px-3 py-1.5 rounded-full border text-xs md:text-sm transition ${
                activePage === "gpa"
                  ? t.navActive
                  : `${t.cardBg} ${t.textSecondary} ${t.cardBorder} hover:opacity-80`
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span className="hidden md:inline">GPA</span>
            </button>
            <button
              type="button"
              onClick={() => setActivePage("visualizer")}
              className={`inline-flex items-center gap-1 px-2 md:px-3 py-1.5 rounded-full border text-xs md:text-sm transition ${
                activePage === "visualizer"
                  ? t.navActive
                  : `${t.cardBg} ${t.textSecondary} ${t.cardBorder} hover:opacity-80`
              }`}
            >
              <Link2 className="w-4 h-4" />
              <span className="hidden md:inline">Visualizer</span>
            </button>
            <button
              type="button"
              disabled
              title="Coming Soon - Under Development"
              className={`inline-flex items-center gap-1 px-2 md:px-3 py-1.5 rounded-full border text-xs md:text-sm transition ${t.cardBg} ${t.textMuted} ${t.cardBorder} opacity-50 cursor-not-allowed relative`}
            >
              <Table className="w-4 h-4" />
              <span className="hidden md:inline">Schedule</span>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
            </button>
            <button
              type="button"
              onClick={() => setShowThemeModal(true)}
              className={`inline-flex items-center gap-1 px-2 md:px-3 py-1.5 rounded-full border text-xs md:text-sm transition ${t.cardBg} ${t.textSecondary} ${t.cardBorder} hover:opacity-80`}
            >
              <Palette className="w-4 h-4" />
            </button>
          </nav>
        </div>
      </header>

      {/* Success/Error Messages */}
      {errorMsg && (
        <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 ${t.cardBg} border-l-4 border-red-500 ${t.textPrimary} px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center max-w-md`}>
          <AlertCircle className="w-5 h-5 mr-3 text-red-500 flex-shrink-0" />
          <span className="font-medium text-sm">{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 ${t.cardBg} border-l-4 border-green-500 ${t.textPrimary} px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center max-w-md`}>
          <Check className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
          <span className="font-medium text-sm">{successMsg}</span>
        </div>
      )}

      {activePage === "home" && (
        <MenuLandingPage
          theme={theme}
          setActivePage={setActivePage}
          courseStatus={courseStatus}
          yearEnteredCollege={yearEnteredCollege}
          setYearEnteredCollege={setYearEnteredCollege}
        />
      )}
      {activePage === "tracker" && (
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
          courseGPA={courseGPA}
          onConfetti={triggerConfetti}
        />
      )}
      {activePage === "gpa" && (
        <GpaCalculatorPage
          courseGPA={courseGPA}
          setCourseGPA={setCourseGPA}
          errorMsg={errorMsg}
          setErrorMsg={setErrorMsg}
          successMsg={successMsg}
          setSuccessMsg={setSuccessMsg}
          theme={theme}
        />
      )}
      {activePage === "visualizer" && (
        <ChainVisualizerPage
          theme={theme}
          courseStatus={courseStatus}
        />
      )}
      {activePage === "schedule" && (
        <ScheduleMakerPage
          theme={theme}
          courseStatus={courseStatus}
          setSuccessMsg={setSuccessMsg}
          setErrorMsg={setErrorMsg}
        />
      )}
    </div>
  );
};

export default App;
