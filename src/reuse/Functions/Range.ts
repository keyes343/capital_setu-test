export const range_generator = (start: number, end: number) => {
    const diff = end - start;
    let arr: string[] = [];
    arr.push(`${start}`);

    // let string_range = `${start}`;
    let next_num = start;

    for (let i = 1; i < diff; i++) {
        next_num++;
        arr.push(`${next_num}`);
        // string_range += `${next_num}`;
    }
    arr.push(`${end}`);

    return arr;
};
