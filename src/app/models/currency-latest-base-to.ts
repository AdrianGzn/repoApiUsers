export interface CurrencyLatestBaseTo {
    amount: number,
    base: string,
    date_start: string,
    date_end: string,
    rates: {
        [to: string]: number
    }
}
