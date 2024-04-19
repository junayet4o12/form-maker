export const millisecondMaker = (date = '0000:00:00', time = "00:00") => {
    const millisecondOfDate = new Date(date).getTime()
    const hour = parseFloat(time?.split(':')[0])
    const minute = parseFloat(time?.split(':')[1])
    const hourInMillisecond = hour * 60 * 60 * 1000;
    const minuteInMillisecond = minute * 60 * 1000;
    const fullDateInMillisecond = millisecondOfDate + hourInMillisecond + minuteInMillisecond - (6 * 60 * 60 * 1000)
    return fullDateInMillisecond
}