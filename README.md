# Builders Progress – Civil Engineering Academic Tracker

Builders Progress is a simple website that helps Civil Engineering students keep track of their subjects and progress toward graduation.

You do **not** need to know how to code to use or understand this project. This file explains things in plain language.

---

## 1. What this tool does

This tool is like a **digital checklist of your BSCE curriculum**.  
It helps you answer questions such as:

- What subjects do I still need to take?
- Which subjects am I currently taking?
- How many units have I already passed?
- How far along am I in percentage?

You can:

- See all your subjects by **year** and **term**.
- Mark each subject as:
  - **Inactive / Failed** – not yet taken, dropped, or failed.
  - **Active** – currently taking this subject.
  - **Passed** – finished and passed this subject.
- View your **total earned units** and **overall completion percentage**.

Your progress is **saved in your browser** (using local storage), so when you come back using the same browser and device, your data will still be there.

---

## 2. How the subjects and labs work

The curriculum includes:

- **Lecture subjects** (example: `CE0009 – Fluid Mechanics (Lec)`)
- **Laboratory subjects** (example: `CE0009L – Fluid Mechanics (Lab)`)

Laboratory subjects are considered **co-requisites** of their matching lecture subjects.  
This means:

- If a subject code ends with the letter **“L”**, it is a **Lab**.
- The **Lecture** subject has the **same code but without “L”** at the end.

For example:

- `CE0009` → Fluid Mechanics (Lec)
- `CE0009L` → Fluid Mechanics (Lab)  
  Co-requisite shown in the app as: **“Co-requisite: CE0009”**

Other examples:

- `CE0015` and `CE0015L`
- `CE0037` and `CE0037L`
- `CE0039` and `CE0039L`
- `CE0057` and `CE0057L`
- `CE0071` and `CE0071L`

In the app, lab subjects will display a **small label** like:

> Co-requisite: CE0009

This is just for **information**. The app does **not** automatically enforce taking them together, but it reminds you which lecture goes with which lab.

---

## 3. Understanding status: Inactive, Active, Passed

Each subject has its own **status**. You control it using **three buttons** on each subject card:

1. **Inactive / Failed**
   - Use this if you:
     - Haven’t taken the subject yet, or
     - Took it but did not pass.
   - This means the units are **not counted yet** toward your total.

2. **Active**
   - Use this when you are **currently enrolled** in the subject.
   - This makes it visually stand out, but units are still only fully counted when **Passed**.

3. **Passed**
   - Use this when you have **finished and passed** the subject.
   - The units from this subject are **added to your total earned units** and to your **completion percentage**.

You can change a subject’s status at any time, as long as **prerequisites are satisfied** (see next section).

---

## 4. Prerequisites and locked subjects

Some subjects require you to **pass other subjects first**.  
These are called **prerequisites**.

In the app:

- If a subject has prerequisites that are **not yet passed**:
  - The card will appear **dimmed** and slightly “locked”.
  - You may see a small red label like:

    > Req: CE0009

- If you try to set that subject to **Active** or **Passed**:
  - The app will show a **warning message** at the top saying which subject(s) you must pass first.
  - The status will **not change** until you pass the required subject(s).

This is to help you **follow the correct order** of subjects as recommended in the curriculum.

---

## 5. What information you see on the screen

When you open the tracker, you will see:

1. **Header**
   - Title: “Academic Tracker”
   - Subtitle: “Civil Engineering • BSCE Curriculum”

2. **Summary section**
   - **Units Earned** – total number of units you have marked as **Passed**.
   - **Complete (%)** – percentage of total curriculum units you have already passed.
   - A **progress bar** showing visually how close you are to 100%.

3. **Curriculum section**
   - The curriculum is divided by:
     - **Year** (First Year, Second Year, Third Year, Fourth Year)
     - **Term** (Term 1, Term 2, Term 3)
   - For each subject you see:
     - **Subject code** (e.g., CE0009)
     - **Subject title** (e.g., Fluid Mechanics (Lec))
     - **Units**
     - **Prerequisite indicator** (if any)
     - **Co-requisite label** for labs (for example: “Co-requisite: CE0009”)
     - **Three buttons**:
       - Inactive / Failed
       - Active
       - Passed
     - A small icon on the right showing if it’s:
       - Passed (checkmark)
       - Active (open book)
       - Locked (lock icon)  

You can **expand or collapse each year** to focus on your current level.

---

## 6. How your data is saved

You do **not** need an account or login.

- All your choices (Inactive / Active / Passed) are saved **in your browser**.
- The data is stored locally using something called **localStorage**.
- If you close the browser and come back later **on the same device and browser**, your progress will still be there.
- If you switch devices or browsers, your data will **not** carry over automatically.

If needed, you can reset the data by clearing your browser’s site data / local storage for this site.

---

## 7. Who is this for?

This tool is designed for:

- **Civil Engineering students** who want a simple way to track their progress.
- **Advisers or mentors** who want to quickly see a student’s standing.
- Anyone who wants an **easy, visual view** of the BSCE curriculum over four years.

You do not need any programming or technical background to use it.

---

## 8. Technical note (for those who are curious)

You do not need this section to use the app, but in case you wonder how it’s built:

- The project is built using **React** (a JavaScript library for building user interfaces).
- The subjects and curriculum are stored in a JavaScript data structure inside the project.
- Styling is done using **Tailwind CSS** classes.
- Status and progress data are stored in the browser using **localStorage**.

If you are not a programmer, you can safely ignore this section.

---

## 9. Feedback and improvements

If you have suggestions such as:

- Adding more programs (not just Civil Engineering),
- Customizing subjects,
- Changing how progress is calculated,

you can share your ideas through the project’s GitHub page or by contacting the project owner.

The goal of this tool is to stay **simple**, **clear**, and **helpful** for students who just want to know:

> “Where am I in my degree, and what’s next?”

---
