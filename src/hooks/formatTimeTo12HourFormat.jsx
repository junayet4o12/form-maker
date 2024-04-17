export const formatTimeTo12HourFormat = (time) => {
    const [hours, minutes] = time.split(':');

    let formattedHours = parseInt(hours, 10);
    let amPm = 'AM';

    if (formattedHours > 12) {
        formattedHours -= 12;
        amPm = 'PM';
    }

    formattedHours = formattedHours < 10 ? '0' + formattedHours : formattedHours;

    const formattedTime = formattedHours + ':' + minutes + ' ' + amPm;

    return formattedTime;
}
 