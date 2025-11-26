# Builders Progress – BSCE Academic Tracker  
_For FEU Institute of Technology – Civil Engineering Students_

Builders Progress is a simple, visual tracker made specifically for **FEU Institute of Technology – Bachelor of Science in Civil Engineering (BSCE)** students.

You **do not need to know how to code** to use or understand this project. This guide explains everything in plain language.

---

## 1. What this tool is for

This tool helps **FEU Tech BSCE students** track their progress through the Civil Engineering curriculum.

It helps you answer:

- Which CE subjects have I **already passed**?
- Which subjects am I **currently taking** this term?
- Which subjects are still **pending or failed**?
- How many **units** have I earned so far?
- How close am I to **finishing the BSCE curriculum**?

You will see:

- All BSCE subjects organized by **Year** and **Term** (based on FEU Tech’s curriculum).
- Your current status in each subject:
  - **Inactive / Failed** – not yet taken or not passed.
  - **Active** – currently enrolled.
  - **Passed** – successfully completed.
- A summary of:
  - **Total Units Earned**
  - **Completion Percentage** of your BSCE curriculum.

Your progress is **saved in your browser** on your device.

---

## 2. FEU Tech BSCE curriculum in the app

The subjects listed in the tracker follow the **FEU Institute of Technology BSCE curriculum structure**, including:

- **General Education (GE) courses**
- **Common engineering courses**
- **Major Civil Engineering professional courses**
- **Laboratory courses (with “L” in the code)**
- **Internship and project courses**

Each entry in the tracker shows:

- **Subject code** (for example: `CE0009`, `CE0009L`)
- **Subject title** (for example: _Fluid Mechanics (Lec)_)
- **Number of units**
- **Prerequisite subjects**, when applicable
- **Co-requisite information** for lab subjects

This makes it easier for FEU Tech BSCE students to see their **actual load**, **prerequisite flow**, and **lab–lecture pairing**, similar to how it appears in your curriculum and advising.

---

## 3. Lecture and laboratory subjects (co-requisites)

In the FEU Tech BSCE program, many Civil Engineering subjects have **lecture** and **laboratory** components.

In this tracker:

- Subjects with **no “L” at the end** of the code are usually **Lecture** courses.  
  - Example: `CE0009` – _Fluid Mechanics (Lec)_
- Subjects with **“L” at the end** are **Laboratory** courses.  
  - Example: `CE0009L` – _Fluid Mechanics (Lab)_

Laboratory courses are treated as **co-requisites** of their matching lecture courses.

The rule used in the app:

- If a subject code ends in **“L”**, its co-requisite is the **same code without “L”**.

Examples:

- `CE0009L` → Co-requisite: `CE0009`
- `CE0015L` → Co-requisite: `CE0015`
- `CE0037L` → Co-requisite: `CE0037`
- `CE0039L` → Co-requisite: `CE0039`
- `CE0057L` → Co-requisite: `CE0057`
- `CE0069L` → Co-requisite: `CE0069`
- `CE0071L` → Co-requisite: `CE0071`

In the interface, lab subjects show a **small label** like:

> Co-requisite: CE0009

This is a **visual reminder** only. The app does **not automatically enforce** that you must take them together, but it reflects how FEU Tech usually pairs lecture and lab courses.

---

## 4. Status meanings: Inactive, Active, Passed

Every subject in the FEU Tech BSCE curriculum shown in the tracker has a **status** that you can set using **three buttons**:

1. **Inactive / Failed**
   - Use this if:
     - You have **not yet taken** the subject, or
     - You took it but **did not pass**.
   - The units for this subject are **not added** to your total earned units.

2. **Active**
   - Use this if you are **currently enrolled** in the subject this term.
   - This makes the subject visually stand out as part of your **current load**.
   - Units are only counted toward completion once the status is **Passed**.

3. **Passed**
   - Use this once you have **successfully completed and passed** the subject.
   - The subject’s units are **added** to your:
     - **Units Earned**, and
     - **Overall completion percentage**.

You can adjust these buttons at any time to match your real status at FEU Tech.

---

## 5. Prerequisites and locked subjects

Just like in the official BSCE flow at FEU Tech, many subjects require you to **pass certain subjects first**. These are **prerequisites**.

In the tracker:

- If a subject has **prerequisites that are not yet passed**:
  - The card appears **dimmer** and looks **locked**.
  - You may see a small red label, for example:

    > Req: CE0009

- If you try to mark that subject as **Active** or **Passed** without finishing the prerequisite(s):
  - A **warning message** appears at the top of the page, telling you which prerequisite(s) you still need.
  - The status will **not change** until you set the prerequisite subject(s) to **Passed**.

This behavior is meant to help FEU Tech BSCE students follow the **recommended subject sequence**, similar to how advisers guide your enrolment.

---

## 6. What you see on the screen

When using the tracker, you will see several main areas:

### 6.1 Header

At the top:

- **Title:** “Academic Tracker”
- **Context:** Civil Engineering • BSCE Curriculum (FEU Institute of Technology)

This confirms that the tracker is tailored to **FEU Tech BSCE**.

### 6.2 Summary / Dashboard

A small summary box shows:

- **Units Earned**
  - Total number of units in subjects marked as **Passed**.
- **Complete (%)**
  - The percentage of your **BSCE curriculum** that you have already passed.
- A **progress bar**
  - Visually shows how close you are to completing 100% of your BSCE units.

This gives you a quick overview of how far you’ve gone in your CE journey at FEU Tech.

### 6.3 Curriculum by Year and Term

The main section shows your curriculum grouped as:

- **First Year**, **Second Year**, **Third Year**, **Fourth Year**
- Within each year: **Term 1**, **Term 2**, **Term 3**

Under each term, you will see **subject cards**, each showing:

- **Subject code** (e.g., `CE0009`)
- **Subject title** (e.g., _Fluid Mechanics (Lec)_)
- **Units**
- Prerequisite note (if any)
- Co-requisite label for labs (e.g., “Co-requisite: CE0009”)
- **Three status buttons:**
  - Inactive / Failed
  - Active
  - Passed
- A small icon on the right side indicating:
  - Passed (checkmark)
  - Active (open book)
  - Locked (lock icon)

You can **expand or collapse** each year to focus only on your current level at FEU Tech.

---

## 7. How your data is saved

You **do not need an FEU Tech account or login** to use this tracker.

- All your status changes (Inactive / Active / Passed) are saved **in your browser** on your device.
- The data is stored locally using a browser feature called **localStorage**.
- If you:
  - Close the tab,
  - Turn off your laptop, or
  - Come back later using the **same device and same browser**,

  your data will still be there.

- If you switch to a different:
  - Device (e.g., from laptop to phone), or
  - Browser (e.g., from Chrome to Firefox),

  your saved progress will **not automatically transfer**.

If you want to completely reset your tracker, you can **clear the site data / local storage** for this page in your browser settings.

---

## 8. Who should use this tracker?

This tool is designed mainly for:

- **FEU Institute of Technology BSCE students** who want:
  - A clear picture of where they are in the curriculum.
  - A simple way to plan subjects for future terms.
  - A reminder of prerequisites and co-requisites.
- **Advisers or mentors at FEU Tech** who want a quick visual of a student’s standing.
- BSCE students who prefer a **simple, checklist-style view** rather than spreadsheets or handwritten notes.

No programming skills are required. If you understand FEU Tech’s flowcharts, prospectus, or advising checklist, you will understand this tracker.

---

## 9. Technical note (optional, for the curious)

You don’t need this section to use the tracker, but in case you are curious:

- The app is built with **React** (a JavaScript library for creating user interfaces).
- The **FEU Tech BSCE curriculum data** is defined inside the project as a JavaScript structure.
- Visual styling uses **Tailwind CSS** utility classes.
- Your progress is stored in the browser using `localStorage`.

If you are not into coding, you can ignore this part completely.

---

## 10. Feedback for improvement (for FEU Tech BSCE)

If you are a BSCE student or faculty member at **FEU Institute of Technology** and you have ideas such as:

- Updating the curriculum to a **new version**,
- Adding options for **electives or specializations**,
- Allowing custom subjects (e.g., irregular loads or credited subjects),
- Changing how units or percentages are displayed,

you are encouraged to share feedback through the project’s GitHub page or by contacting the project owner.

The goal is to make this tracker a **practical companion** for FEU Tech BSCE students—something you can open during enrolment, advising, or anytime you want to ask:

> “How far am I now in my BSCE at FEU Tech, and what should I take next?”

---
