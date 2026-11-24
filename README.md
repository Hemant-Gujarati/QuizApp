# 🧠 Quiz Master

A simple, interactive quiz website built with **HTML, CSS and JavaScript** as a college mini project. No libraries or frameworks are used, so it is easy to understand and a good fit for beginners.

## Features

- 3 quiz topics: **HTML**, **Python** and **General Knowledge**
- 5 multiple-choice questions per topic
- 15-second timer for every question
- Instant feedback: correct answers turn green, wrong answers turn red
- Live score and progress bar
- Final result with a message based on your score
- Best score for each topic is saved in the browser (using `localStorage`)
- Works on both mobile and desktop screens

## Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML | Structure of the page |
| CSS | Design and layout |
| JavaScript | Quiz logic, timer and score |

## Project Structure

```
quiz-app/
├── index.html   → page structure (start, quiz and result screens)
├── style.css    → all styling
├── script.js    → questions and quiz logic
└── README.md    → project information
```

## How to Run

1. Download or clone this repository.
2. Keep all files in the same folder.
3. Double-click `index.html` to open it in any web browser.

No installation or internet connection is needed.

## How to Play

1. Choose a topic on the start screen.
2. Read the question and click an answer before the timer ends.
3. Click **Next** to move to the following question.
4. See your final score at the end and try again to beat your best score.

## How to Add Your Own Questions

Open `script.js` and copy one question block inside `allQuestions`:

```js
{ question: "Your question here?",
  options: ["Option A", "Option B", "Option C", "Option D"],
  answer: 1 }
```

The `answer` number is the position of the correct option, starting from 0 (0 = first option, 1 = second, and so on).

## What I Learned

- Building a multi-screen page with HTML
- Styling with CSS (flexbox, gradients, transitions)
- Using JavaScript variables, arrays, objects, functions and loops
- Handling button clicks and updating the page dynamically (DOM)
- Using `setInterval` for a timer
- Saving data in the browser with `localStorage`
- Hosting a project on GitHub Pages

## Future Improvements

- Add more topics and questions
- Add a sound effect for correct and wrong answers
- Add a dark mode
- Shuffle the questions every time

## Author

Made by a first-year B.Tech CSE (AI & ML) student as a mini project.
