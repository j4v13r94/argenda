export const parseObject = (obj) => {
    for (const key in obj) {


        let value = obj[key];
        if (!isNaN(value) && value !== '') {
            obj[key] = Number(value);
        } else if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
            obj[key] = value.toLowerCase() === 'true';
        } else if (value.toLowerCase() === 'null' || value === '') {
            obj[key] = null;
        } else {
            obj[key] = value;
        }

    }
}