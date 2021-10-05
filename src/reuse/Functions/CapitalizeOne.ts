export const capitalizeOne = (word:string) => {
    let newWord = word.charAt(0).toUpperCase() + word.slice(1);
    return newWord
}