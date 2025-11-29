# 🧱 Builders Progress  
### BSCE Academic Tracker · FEU Institute of Technology – Civil Engineering

[![Live Site](https://img.shields.io/badge/Live%20Demo-Visit%20App-34D399?style=for-the-badge&logo=vercel)](https://builders-progress.vercel.app)
[![Status](https://img.shields.io/badge/Status-Active-22c55e?style=for-the-badge)](#)
[![Made with Love](https://img.shields.io/badge/Made%20with-%E2%9D%A4-ec4899?style=for-the-badge)](#)

Welcome, future Civil Engineer! 💚  
This is a **simple, visual, and friendly academic tracker** made specifically for **FEU Institute of Technology – BS Civil Engineering (BSCE)** students.

You **do not need to know how to code** to use this.  
This page is written in **plain language**, so you can focus on what matters: **your progress**.

---

## ✨ Features

### 📋 Curriculum Tracker
- **Multiple Views** – Toggle between Card, Timeline, Table, and Compact views for your preferred layout
- **"What Can I Take?" Filter** – Instantly see only the subjects you're eligible to enroll in (prerequisites passed)
- **Chain Visualizer** – Hover over any subject to highlight all courses that depend on it
- **Critical Path Warning** – Get warned when failing a subject will delay your graduation
- **Prerequisite Tracking** – Visual indicators show which subjects are locked until prerequisites are passed
- **Bulk Actions** – Mark all courses in a term or year as passed with one click

### 🎨 Theme Customizer
- **FEU Green** – Default school colors theme
- **FEU Gold** – Gold color palette (#F2A900)
- **ACES Theme** – Blue color palette for ACES students
- **Dark Mode** – Perfect for late-night study sessions
- **High Contrast** – Accessibility-focused with enhanced visibility

### 📊 GPA Calculator
- **Per-Term GPA** – Calculate your GPA for each term
- **Overall TGPA** – Track your cumulative Total Grade Point Average
- **Target Grade Calculator** – Set a Dean's Lister goal and see the average grade needed in remaining units
- **Lab-Lecture Sync** – Laboratory courses automatically use the same GPA as their lecture co-requisite

### 🔗 Chain Visualizer
- **Prerequisite Flow** – Interactive visualization of how courses depend on each other
- **Pan & Zoom** – Navigate through the curriculum flowchart easily
- **Course Highlighting** – See upstream and downstream dependencies at a glance

### 📅 Schedule Maker *(Coming Soon)*
- **Mock Enrollment** – Build your class schedule before actual enrollment
- **Conflict Detection** – Automatically check for schedule conflicts
- **Export Options** – Export schedule to Google Calendar or CSV
> ⚠️ This feature is currently under development

### 🎯 Progress & Planning
- **Graduation Countdown** – Set your target graduation date and track terms remaining
- **Shareable Progress Link** – Generate a URL to share your progress with advisers, parents, or friends
- **Progress Dashboard** – See units completed, active, and remaining at a glance

### 🎉 Engagement
- **Confetti Celebrations** – Small burst when you pass a subject, big explosion when you complete a year!

### 💾 Data Management
- **Local Storage** – Progress saved in your browser, no account needed
- **Export/Import** – Backup and restore your tracker or GPA data
- **Cross-Site Transfer** – Move data between main site and preview environments

---

## 🎯 What this tool is for

This tracker helps **FEU Tech BSCE students** see where they are in the curriculum at a glance.

It helps you answer:

- ✅ Which CE subjects have I **already passed**?
- 📚 Which subjects am I **currently taking** this term?
- ⏳ Which subjects are still **pending or failed**?
- 🔢 How many **units** have I earned so far?
- 🎓 How close am I to **finishing the BSCE curriculum**?

You'll see:

- All BSCE subjects organized by **Year** and **Term** (following FEU Tech's curriculum).
- A clear status for each subject:
  - **Inactive / Failed** – not yet taken or not passed.
  - **Active** – currently enrolled this term.
  - **Passed** – successfully completed.
- A small **dashboard summary** showing:
  - 📌 **Total Units Earned**
  - 📈 **Completion Percentage** of your BSCE curriculum.

All of your progress is **saved in your browser**, on **your device**.

---

## 📚 FEU Tech BSCE curriculum inside the app

The tracker is built around the **FEU Institute of Technology BSCE curriculum**, including:

- **General Education (GE) courses**
- **Common engineering courses**
- **Major Civil Engineering professional courses**
- **Laboratory courses** (codes ending in `L`)
- **Internship and project courses**

Each subject card shows:

- 📘 **Subject code** (e.g., `CE0009`, `CE0009L`)
- 📝 **Subject title** (e.g., _Fluid Mechanics (Lec)_)
- 🔢 **Number of units**
- 🔗 **Prerequisite subjects**, when applicable
- 🤝 **Co-requisite information** for lab courses

---

## 🧪 Lecture and laboratory subjects (co-requisites)

In FEU Tech's BSCE program, many CE subjects come in **lecture** and **laboratory** pairs.

In this tracker:

- 🔹 Codes **without `L`** at the end → usually **Lecture** courses  
  - Example: `CE0009` – _Fluid Mechanics (Lec)_
- 🔹 Codes **with `L`** at the end → **Laboratory** courses  
  - Example: `CE0009L` – _Fluid Mechanics (Lab)_

Lab courses are treated as **co-requisites** of their corresponding lecture course.

**Rule used in the app:**

> If a subject code ends in `L`, its co-requisite is the **same code without `L`**.

---

## 🎛 Status options: Inactive · Active · Passed

Every subject in the BSCE curriculum inside the tracker has a **status** you can change using **three buttons**:

### 1. Inactive / Failed
Use this when you have **never taken** the subject, or you took it but **did not pass**.

### 2. Active
Use this when you are **currently enrolled** in the subject this term.

### 3. Passed
Use this when you have **successfully completed and passed** the subject.

---

## 💾 How your data is saved

You **do not need an FEU Tech account or login** to use this tracker.

- All your status changes are stored **directly in your browser**, on **your device**.
- The app uses a browser feature called **`localStorage`**.
- If you close the tab, shut down your laptop, or return later using the **same device and same browser**, your progress will still be there. ✅

However, if you switch to a **different device** or use a different **browser**, your saved data will **not automatically follow you**.

---

## 👥 Who is this for?

This tracker is designed mainly for:

- 🎓 **FEU Institute of Technology BSCE students** who want a clear, visual view of their place in the curriculum
- 🧑‍🏫 **Advisers or mentors at FEU Tech** who would like a quick, visual reference of a student's standing
- 📝 BSCE students who like having a **checklist-style overview** of their entire Civil Engineering journey

---

## 🧠 Technical note (optional, for the curious)

- The interface is built using **React** (JavaScript UI library) with **Vite** as the build tool.
- The **FEU Tech BSCE curriculum data** is stored in the project as a JavaScript data structure.
- Styling relies on **Tailwind CSS** utility classes for a clean, modern look.
- **react-confetti** library provides celebration animations.
- Theme system uses a centralized configuration object for consistent styling across views.
- URL-based state sharing uses **Base64 encoding** for progress links.
- Your progress is saved in the browser with **`localStorage`**, so no external database is needed.

---

## 🌱 Feedback & improvements

If you're a **BSCE student**, **faculty member**, or **adviser** at FEU Institute of Technology and you have ideas like:

- Updating the tracker for a **new curriculum version**
- Adding **electives** or **specializations**
- Suggesting new features or themes

you are very welcome to share your thoughts through:

- The project's **GitHub Issues** page
- Or by directly contacting the **project owner** on GitHub

---

> 🧱 **The goal** is simple:  
> To give FEU Tech BSCE students a gentle, visual companion that helps answer:  
> **"How far am I in my BSCE at FEU Tech, and what's the smartest next step?"**

Thank you for visiting this project.  
Open it during **enrolment**, **advising**, or whenever you need a reminder that you're **making real progress** toward becoming a Civil Engineer. 💚
