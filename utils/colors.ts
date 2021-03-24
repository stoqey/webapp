export const getTradeColor = (profit: number): string => {
    return profit >= 0 ? "#3AA76D" : "red";
}