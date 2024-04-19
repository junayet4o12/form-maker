
export const hourMinuteSecond = (milliseconds) => {
    // Convert milliseconds to seconds
    const seconds = Math.floor(milliseconds / 1000);

    // Calculate hours
    const hours = Math.floor(seconds / 3600);

    // Calculate remaining seconds after extracting hours
    const remainingSeconds = seconds % 3600;

    // Calculate minutes
    const minutes = Math.floor(remainingSeconds / 60);

    // Calculate remaining seconds after extracting minutes
    const finalSeconds = remainingSeconds % 60;

    // Format the result with leading zeros
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(finalSeconds).padStart(2, '0')}`;

    return formattedTime;
};
