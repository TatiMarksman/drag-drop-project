# 📌 AHJ Homework #6 — Trello DnD Board + Modern Image Manager

[![Build status](https://ci.appveyor.com/api/projects/status/bet9h72ue90ht4w7?svg=true)](https://ci.appveyor.com/project/TatiMarksman/drag-drop-project-bmogd)  
[**GitHub Pages**](https://TatiMarksman.github.io/drag-drop-project/)

---

## 📋 Overview

This repository was created for Netology’s **"6. Working with files, DnD"** homework.  
It contains **two separate applications** built with JavaScript, HTML5, CSS3, and Webpack.

---

### 1. **Trello Board**
- 3 fixed columns (**TODO / IN PROGRESS / DONE**)
- Add cards (**Add another card** button)
- Delete cards (hover “×” icon)
- Drag & drop cards within a column and between columns
- Cursor changes to **grabbing** while dragging
- Maintains card grab offset (you can grab from any point)
- Placeholder highlights drop position
- State is saved in **LocalStorage**
- State is restored after page reload

---

### 2. **Modern Image Manager**
- Drag & drop image upload from the file system
- Click-to-upload via `<input type="file">`
- Multiple file selection
- Ability to upload the same file more than once
- Preview of uploaded images
- Delete image previews (× button)

---

## 🚀 Live Demo

- **Trello Board:**  
  [https://TatiMarksman.github.io/drag-drop-project/](https://TatiMarksman.github.io/drag-drop-project/)

- **Modern Image Manager:**  
  [https://TatiMarksman.github.io/drag-drop-project/uploader.html](https://TatiMarksman.github.io/drag-drop-project/uploader.html)

---

## 🛠 Installation & Usage

```bash
# Install dependencies
yarn

# Start development server
yarn start
# → http://localhost:3000/              → Trello Board
# → http://localhost:3000/uploader.html → Modern Image Manager

# Create production build
yarn build