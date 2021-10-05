export const capitalizeAllInitials = (sentence: string | null | undefined) => {
    if (sentence) {
        let newSentence = '';
        let wordsArr: string[] = sentence.split(' ');
        // console.log({ wordsArr });
        let len = wordsArr.length;
        wordsArr.forEach((word, i) => {
            let newWord = word.charAt(0).toUpperCase() + word.slice(1);
            if (i < len - 1) {
                newSentence += newWord + ' ';
            } else newSentence += newWord;
        });
        return newSentence;
    } else return '_';
};
