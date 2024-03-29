export const makeVisibleTime = (time) => {
    if (isNaN(time)) {
        return time
    }
    const date = new Date(time);
    const formattedDate = date.toLocaleDateString("en-US", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
    return formattedDate;
} 