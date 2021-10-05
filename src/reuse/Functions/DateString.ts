export const monthString = (date: number, increment: number, len: 'full' | 3 | 1) => {
    const d = new Date(date);
    const month = [];
    month[0] = 'January';
    month[1] = 'February';
    month[2] = 'March';
    month[3] = 'April';
    month[4] = 'May';
    month[5] = 'June';
    month[6] = 'July';
    month[7] = 'August';
    month[8] = 'September';
    month[9] = 'October';
    month[10] = 'November';
    month[11] = 'December';
    let n: string;
    n = month[d.getMonth() + increment];

    switch (len) {
        case 'full':
            return n;
        case 3:
            return n.slice(0, 3);
        case 1:
            return n.slice(0, 1);
    }
};

export const yearString = (date: Date, num: number) => {
    let fullYear: number;
    // num represents if and incremented date is to be return or not, and by how much
    fullYear = date.getFullYear() + num;
    return fullYear;
};

export const dayString = (date: number, num: number, len: 'full' | 3 | 1) => {
    const d = new Date(date);
    const day = [];
    day[0] = 'Sunday';
    day[1] = 'Monday';
    day[2] = 'Tuesday';
    day[3] = 'Wednesday';
    day[4] = 'Thursday';
    day[5] = 'Friday';
    day[6] = 'Saturday';

    let n: string;
    n = day[d.getDay() + num];

    switch (len) {
        case 'full':
            return n;
        case 3:
            return n.slice(0, 3);
        case 1:
            return n.slice(0, 1);
    }
};
