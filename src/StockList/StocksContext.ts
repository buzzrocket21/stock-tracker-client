import React, { useCallback, useState } from 'react';
import { StockModel } from '../models/StockModel';
export interface StocksContext {
    stocks: Array<StockModel>,
    getStock: (key: string) => StockModel | undefined,
    addStock: (model: StockModel) => void,
    removeStock: (key: string) => void
}

export const stockMapContext = React.createContext({
    stocks: new Array<StockModel>(),
    getStock: (key: string) => {},
    addStock: (model: StockModel) => {},
    removeStock: (key: string) => {}
});

export const useStocks = (): StocksContext => {
    const [stocks, setStocks] = useState(new Array<StockModel>());

    const getStock = useCallback((key: string): StockModel | undefined => {
        return stocks.find((stock) => {
            return stock.key === key;
        });
    }, [stocks]);

    const addStock = useCallback((model: StockModel): void => {
        if(!getStock(model.key)) {
            stocks.push(model);
            setStocks([...stocks]);
        }
    }, [stocks, getStock]);

    const removeStock = useCallback((key: string): void => {
        setStocks(stocks.filter(stock => stock.key !== key))
    }, [setStocks, stocks]);

    return {
        stocks,
        getStock,
        addStock,
        removeStock
    }
}