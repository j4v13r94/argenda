export const getHorarios = (start, end, interval) => {
    var startHour = parseInt(start.split(':')[0]);
    var endHour = parseInt(end.split(':')[0]);
    var startMinute = parseInt(start.split(':')[1]);
    var endMinute = parseInt(end.split(':')[1]);
    var hours = [];

    for (var i = startHour; i <= endHour; i++) {
        for (var j = 0; j < 60; j += interval) {
            if (i == startHour && j < startMinute) {
                continue;
            }
            if (i == endHour && j > endMinute) {
                break;
            }
            var hour = i.toString().padStart(2, '0') + ':' + j.toString().padStart(2, '0');
            hours.push(hour);
        }
    }

    return hours;
}

export const getHoursFromTime = (hours, time) => {
    let startIndex = hours.indexOf(time);
    if (startIndex === -1) {
        return [];
    }
    return hours.slice(startIndex + 1);
}




export const checkTime = (h1, h2) => {

    h1 = new Date(`2023-05-31T${h1}Z`);
    h2 = new Date(`2023-05-31T${h2}Z`);
    return h1 < h2;
}

export const addMinutes = (time, minutes = 15) => {
    let date = new Date(`2023-05-31T${time}Z`);
    date.setMinutes(date.getMinutes() + minutes);
    return date.toISOString().substr(11, 5);
}

