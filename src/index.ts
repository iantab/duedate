import DueDateCalculator from "./DueDateCalculator";

const date: Date = DueDateCalculator.CalculateDueDate(new Date(2025, 3, 1, 12, 12), 8);

console.log(date);