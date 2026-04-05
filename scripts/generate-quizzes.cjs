const fs = require("fs");
const path = require("path");

const sourcePath = path.join("components", "QuizApp.tsx");
const source = fs.readFileSync(sourcePath, "utf8");

const match = source.match(/const QUESTIONS: Question\[] = \[(.*?)\n\];/s);
if (!match) {
  throw new Error("Could not find QUESTIONS array in components/QuizApp.tsx");
}

const questionsExpr = `[${match[1]}\n]`;
const questions = Function(`"use strict"; return (${questionsExpr});`)();

const outDir = path.join("assets", "quizzes");
fs.mkdirSync(outDir, { recursive: true });

const files = [
  {
    name: "first-exam.json",
    data: {
      id: "exam1",
      title: "1st Exam Quiz",
      description: "Systems Simulation & Modeling",
      questions,
    },
  },
  {
    name: "second-exam.json",
    data: {
      id: "exam2",
      title: "2nd Exam Quiz",
      description: "Add your questions here",
      questions: [],
    },
  },
  {
    name: "third-exam.json",
    data: {
      id: "exam3",
      title: "3rd Exam Quiz",
      description: "Add your questions here",
      questions: [],
    },
  },
  {
    name: "fourth-exam.json",
    data: {
      id: "exam4",
      title: "4th Exam Quiz",
      description: "Add your questions here",
      questions: [],
    },
  },
];

for (const file of files) {
  fs.writeFileSync(path.join(outDir, file.name), `${JSON.stringify(file.data, null, 2)}\n`, "utf8");
}

console.log("Created quiz JSON files in assets/quizzes");
