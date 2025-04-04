export default class DueDateCalculator {

    private static readonly WORKING_HOURS_START: number = 9; // 9 AM
    private static readonly WORKING_HOURS_END: number = 17; // 5 PM

    /**
     * Calculates the due date based on the submit date and turnaround time.
     * @param submitDate The date and time the issue was submitted (must be within working hours).
     * @param turnaroundTime The turnaround time in working hours.
     * @returns The calculated due date and time.
     */
    public static CalculateDueDate(submitDate: Date, turnaroundTime: number): Date {
        if (!this.isWithinWorkingHours(submitDate)) {
            throw new Error("Submit date must be within working hours (9AM to 5PM).");
        }

        let remainingHours: number = turnaroundTime;
        let dueDate: Date = new Date(submitDate);

        while (remainingHours > 0) {
            const hoursLeftInDay: number = this.WORKING_HOURS_END - dueDate.getHours();
            if (remainingHours <= hoursLeftInDay) {
                dueDate.setHours(dueDate.getHours() + remainingHours);
                remainingHours = 0;
            } else {
                remainingHours -= hoursLeftInDay;
                dueDate = this.getNextWorkingDay(dueDate);
                dueDate.setHours(this.WORKING_HOURS_START);
            }
        }

        return dueDate;
    }

    /**
     * Checks if the given date is within working hours.
     * @param date The date to check.
     * @returns True if the date is within working hours, false otherwise.
     */
    private static isWithinWorkingHours(date: Date): boolean {
        const day: number = date.getDay();
        const hour: number = date.getHours();
        return (
            day >= 1 && day <= 5 && // Monday to Friday
            hour >= this.WORKING_HOURS_START &&
            hour < this.WORKING_HOURS_END
        );
    }

    /**
     * Gets the next working day.
     * @param date The date to check.
     * @returns The next working day.
     */
    private static getNextWorkingDay(date: Date): Date {
        const nextDay: Date = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        const day: number = nextDay.getDay();

        if (day === 6) {
            // If Saturday, skip to Monday
            nextDay.setDate(nextDay.getDate() + 2);
        } else if (day === 0) {
            // If Sunday, skip to Monday
            nextDay.setDate(nextDay.getDate() + 1);
        }

        return nextDay;
    }
}