import { StockModel } from "./StockModel";

export class HistoryEntry {
    symbol!: string;
    date!: Date;
    open!: number;
    low!: number;
    high!: number;
    close!: number;

}

export class StockWithHistoryModel extends StockModel {
    history!: Array<HistoryEntry>;
}