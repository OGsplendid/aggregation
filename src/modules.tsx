export type TListItem = {
    type: string,
    amount: number,
}

export interface IList {
    list: TListItem[],
}
