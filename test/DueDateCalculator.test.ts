import DueDateCalculator from "../src/DueDateCalculator";

describe("DueDateCalculator", () => {
    it("should calculate the due date within the same day", () => {
        const submitDate = new Date(2025, 3, 1, 10); // April 1, 2025, 10 AM
        const turnaroundTime = 5;
        const expectedDate = new Date(2025, 3, 1, 15); // April 1, 2025, 3 PM
        const result = DueDateCalculator.CalculateDueDate(submitDate, turnaroundTime);
        expect(result).toEqual(expectedDate);
    });

    it("should calculate the due date spanning multiple days", () => {
        const submitDate = new Date(2025, 3, 1, 14); // April 1, 2025, 2 PM
        const turnaroundTime = 10;
        const expectedDate = new Date(2025, 3, 2, 16); // April 2, 2025, 4 PM
        const result = DueDateCalculator.CalculateDueDate(submitDate, turnaroundTime);
        expect(result).toEqual(expectedDate);
    });

    it("should skip weekends when calculating the due date", () => {
        const submitDate = new Date(2025, 3, 4, 16); // April 4, 2025, 4 PM (Friday)
        const turnaroundTime = 2;
        const expectedDate = new Date(2025, 3, 7, 10); // April 7, 2025, 10 AM (Monday)
        const result = DueDateCalculator.CalculateDueDate(submitDate, turnaroundTime);
        expect(result).toEqual(expectedDate);
    });

    it("should throw an error if the submit date is before working hours", () => {
        const submitDate = new Date(2025, 3, 1, 8); // April 1, 2025, 8 AM (before working hours)
        const turnaroundTime = 5;
        expect(() => {
            DueDateCalculator.CalculateDueDate(submitDate, turnaroundTime);
        }).toThrow("Submit date must be within working hours (9AM to 5PM).");
    });

    it("should throw an error if the submit date is after working hours", () => {
        const submitDate = new Date(2025, 3, 1, 18); // April 1, 2025, 6 PM (after working hours)
        const turnaroundTime = 5;
        expect(() => {
            DueDateCalculator.CalculateDueDate(submitDate, turnaroundTime);
        }).toThrow("Submit date must be within working hours (9AM to 5PM).");
    });

    it("should handle turnaround time that spans multiple weekends", () => {
        const submitDate = new Date(2025, 3, 4, 10); // April 4, 2025, 10 AM (Friday)
        const turnaroundTime = 48; // 48 working hours (6 days)
        const expectedDate = new Date(2025, 3, 14, 10); // April 14, 2025, 10 AM (Monday)
        const result = DueDateCalculator.CalculateDueDate(submitDate, turnaroundTime);
        expect(result).toEqual(expectedDate);
    });
});