export const StringUtils = {
    countOccurances: (str: string, target: string) => {
        let count = 0;
        for (let i = 0; i < str.length - target.length; i++) {
            const curStr = str.substr(i, target.length);
            if (curStr === target) {
                count++;
            }
        }
        return count;
    }
};