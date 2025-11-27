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
- **Card & List Views** – Toggle between detailed card view and compact spreadsheet-style list view
- **"What Can I Take?" Filter** – Instantly see only the subjects you're eligible to enroll in (prerequisites passed)
- **Chain Visualizer** – Hover over any subject to highlight all courses that depend on it
- **Critical Path Warning** – Get warned when failing a subject will delay your graduation
- **Prerequisite Tracking** – Visual indicators show which subjects are locked until prerequisites are passed
- **Bulk Actions** – Mark all courses in a term or year as passed with one click

### 🎨 Theme Customizer
- **FEU Green** – Default school colors theme
- **Dark Mode** – Perfect for late-night study sessions
- **High Contrast** – Accessibility-focused with enhanced visibility

### 📊 GPA Calculator
- **Per-Term GPA** – Calculate your GPA for each term
- **Overall TGPA** – Track your cumulative Total Grade Point Average
- **Target Grade Calculator** – Set a Dean's Lister goal and see the average grade needed in remaining units
- **Lab-Lecture Sync** – Laboratory courses automatically use the same GPA as their lecture co-requisite

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

You’ll see:

- All BSCE subjects organized by **Year** and **Term** (following FEU Tech’s curriculum).
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

This lets you see your **actual load**, **prerequisite flow**, and **lab–lecture pairing**, similar to what you see in:

- the **prospectus**
- your **curriculum flowchart**
- or **advising forms** at FEU Tech.

---

## 🧪 Lecture and laboratory subjects (co-requisites)

In FEU Tech’s BSCE program, many CE subjects come in **lecture** and **laboratory** pairs.

In this tracker:

- 🔹 Codes **without `L`** at the end → usually **Lecture** courses  
  - Example: `CE0009` – _Fluid Mechanics (Lec)_
- 🔹 Codes **with `L`** at the end → **Laboratory** courses  
  - Example: `CE0009L` – _Fluid Mechanics (Lab)_

Lab courses are treated as **co-requisites** of their corresponding lecture course.

**Rule used in the app:**

> If a subject code ends in `L`, its co-requisite is the **same code without `L`**.

Examples:

- `CE0009L` → Co-requisite: `CE0009`  
- `CE0015L` → Co-requisite: `CE0015`  
- `CE0037L` → Co-requisite: `CE0037`  
- `CE0039L` → Co-requisite: `CE0039`  
- `CE0057L` → Co-requisite: `CE0057`  
- `CE0069L` → Co-requisite: `CE0069`  
- `CE0071L` → Co-requisite: `CE0071`

In the interface, lab subjects include a **small label** such as:

> Co-requisite: CE0009

This is a **visual reminder only**.  
The app does **not** automatically enforce that you must take them together, but it is designed to **mirror how FEU Tech usually pairs** lecture and lab courses.

---

## 🎛 Status options: Inactive · Active · Passed

Every subject in the BSCE curriculum inside the tracker has a **status** you can change using **three buttons**:

### 1. Inactive / Failed

Use this when:

- You have **never taken** the subject, or  
- You took it but **did not pass**.

In this status:

- Units are **not counted** toward your earned units.
- The card appears as **not completed**.

---

### 2. Active

Use this when:

- You are **currently enrolled** in the subject this term.

In this status:

- The card is visually highlighted as part of your **current load**.
- Units are **still not counted** toward completion  
  until you switch the subject to **Passed**.

---

### 3. Passed

Use this when:

- You have **successfully completed and passed** the subject.

In this status:

- The subject’s units are **added to**:
  - ✅ **Units Earned**
  - 📈 **Overall completion percentage**

You can change these statuses anytime so the tracker always reflects your **real standing at FEU Tech**.

---

## 🔐 Prerequisites and locked subjects

Just like the official BSCE flow at FEU Tech, many subjects require **prerequisites**.

In the tracker:

- If a subject’s **prerequisites are not yet marked as Passed**:
  - The card appears **dimmer** or slightly **faded**.
  - It can show a **small red label**, for example:

    > Req: CE0009

- If you try to mark a subject as **Active** or **Passed** **before** completing its prerequisites:
  - A **warning message** appears at the **top of the page**, listing the missing prerequisite(s).
  - The status will **not change** until you set the required subjects to **Passed**.

This behavior encourages FEU Tech BSCE students to follow the **recommended subject sequence**, similar to how academic advisers help you during enrolment.

---

## 🖥 What you’ll see on the screen

When you open the tracker, the layout is divided into clear sections:

### 6.1 Header

At the top, you’ll find:

- 🧱 **Title:** “Academic Tracker”
- 🏫 **Context line:**  
  `Civil Engineering • BSCE Curriculum (FEU Institute of Technology)`

This confirms that the tracker is **specifically tailored for FEU Tech BSCE**.

---

### 6.2 Summary / Dashboard

Below the header is a small **summary box** showing:

- 🎓 **Units Earned**  
  Total units of all subjects marked as **Passed**.

- 📊 **Complete (%)**  
  The percentage of your **BSCE curriculum** that you’ve already completed.

- 📈 **Progress bar**  
  A colored bar that visually shows how close you are to **100% completion**.

This gives you an instant snapshot of:

> “How far am I in my BSCE journey at FEU Tech?”

---

### 6.3 Curriculum by Year and Term

The main section organizes subjects into:

- **First Year**
- **Second Year**
- **Third Year**
- **Fourth Year**

Each year is divided into:

- **Term 1**
- **Term 2**
- **Term 3**

Under each term, you’ll find **subject cards**. Each card includes:

- 📘 **Subject code** (e.g., `CE0009`)
- 📝 **Subject title** (e.g., _Fluid Mechanics (Lec)_)
- 🔢 **Units**
- 🔗 **Prerequisite note**, if required
- 🤝 **Co-requisite label** for labs (e.g., `Co-requisite: CE0009`)
- 🎛 **Three status buttons**:
  - Inactive / Failed
  - Active
  - Passed
- 🔍 A small **status icon** on the right, such as:
  - ✅ Checkmark – Passed
  - 📖 Open book – Active
  - 🔒 Lock – Prerequisites not yet complete

You can **expand or collapse** each year to focus on:

- Your **current level**, or
- Future terms you want to **plan ahead** for.

---

## 💾 How your data is saved

You **do not need an FEU Tech account or login** to use this tracker.

- All your status changes are stored **directly in your browser**, on **your device**.
- The app uses a browser feature called **`localStorage`**.
- This means:
  - If you **close the tab**,
  - **Shut down** your laptop, or
  - Return later using the **same device and same browser**,

  your progress will still be there. ✅

However:

- If you switch to a **different device** (e.g., from laptop to phone), or
- Use a different **browser** (e.g., from Chrome to Firefox),

your saved data will **not automatically follow you**.

To **reset** your tracker completely, you can:

- Clear the site data / local storage for this page  
  via your browser’s **privacy or site settings**.

---

## 👥 Who is this for?

This tracker is designed mainly for:

- 🎓 **FEU Institute of Technology BSCE students** who:
  - Want a clear, visual view of their place in the curriculum.
  - Want to **plan future terms** more confidently.
  - Prefer a **simple, clickable tracker** over spreadsheets or notes.

- 🧑‍🏫 **Advisers or mentors at FEU Tech** who:
  - Would like a quick, visual reference of a student’s standing.

- 📝 BSCE students who:
  - Like having a **checklist-style overview** of their entire Civil Engineering journey.

You don’t need any programming skills.  
If you understand your **prospectus**, **flowchart**, or **advising checklist**,  
you’ll feel right at home with this tracker.

---


## 🧠 Technical note (optional, for the curious)

This section is only for those who are curious about _how_ the tracker is built.

- The interface is built using **React** (JavaScript UI library) with **Vite** as the build tool.
- The **FEU Tech BSCE curriculum data** is stored in the project as a JavaScript data structure.
- Styling relies on **Tailwind CSS** utility classes for a clean, modern look.
- **react-confetti** library provides celebration animations.
- Theme system uses a centralized configuration object for consistent styling across views.
- URL-based state sharing uses **Base64 encoding** for progress links.
- Your progress is saved in the browser with **`localStorage`**, so no external database is needed.

If you're not into coding, you can safely **skip this section**.  
The tracker will still work perfectly for you.

---

## 🌱 Feedback & improvements (For FEU Tech BSCE community)

If you’re a **BSCE student**, **faculty member**, or **adviser** at FEU Institute of Technology and you have ideas like:

- Updating the tracker for a **new curriculum version**
- Adding **electives** or **specializations**
- Allowing **custom subjects** (credited courses, irregular loads, etc.)
- Refining how **units** or **percentages** are calculated or displayed
- Suggesting new features or themes

you are very welcome to share your thoughts.

You can send feedback through:

- The project’s **GitHub Issues** page
- Or by directly contacting the **project owner** on GitHub

---

> 🧱 **The goal** is simple:  
> To give FEU Tech BSCE students a gentle, visual companion that helps answer:  
> **“How far am I in my BSCE at FEU Tech, and what’s the smartest next step?”**

Thank you for visiting this project.  
Open it during **enrolment**, **advising**, or whenever you need a reminder that you’re **making real progress** toward becoming a Civil Engineer. 💚
