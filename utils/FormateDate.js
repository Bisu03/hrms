export const FormateDate = (data) => {
    return data?.split("-").reverse().join("-");
};

const currentDate = new Date();

// Format the date and time
const timeOptions = { hour: "numeric", minute: "numeric", second: "numeric" };
export const FormattedTime = () =>
    currentDate.toLocaleTimeString(undefined, timeOptions);

export const GetDate = () => new Date().toISOString().substring(0, 10);

export const GetTomorrowDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow.toISOString().substring(0, 10);
};

export function compareDates(previousDate) {
    const currentDate = new Date();
    const oldDate = new Date(previousDate);

    // Calculate the time difference in milliseconds
    const timeDifference = currentDate - oldDate;

    // Convert time difference from milliseconds to days
    const dayDifference = timeDifference / (1000 * 3600 * 24);

    // Check if the difference is more than 7 days
    if (dayDifference > 7) {
        return false
    } else {
        return true
    }
}