export const getTradeColor = (profit: number): string => {
    return profit >= 0 ? "green" : "red";
}