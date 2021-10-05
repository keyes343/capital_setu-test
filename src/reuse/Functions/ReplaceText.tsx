export const ReplaceText = (word: string, cut: string, paste: string) => {
    if (!word.includes(cut)) {
        return word;
    }
    let words = word.split(cut);
    console.log({ words, word, cut, paste });
    const newWord = `${words[0]}${paste}${words[1]}`;
    // console.log('newWord = ', newWord);
    return newWord;
};
