
/**
 * Nice Decimal number
 * @param num 
 */
export const niceDec = (num: number = 0): string => {
    if(typeof num !== "number"){
        return ``;
    }
    return num.toFixed(2);
}