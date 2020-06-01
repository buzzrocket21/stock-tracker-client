import React from 'react';
import moment from 'moment';
import { formatCurrency } from '../utils/stringFormatters';
import { HistoryEntry } from '../models/StockWithHistoryModel';

interface StockHistoryTooltipProps {
    entry: HistoryEntry
}

function StockHistoryTooltip(props: StockHistoryTooltipProps) {
    return (<div className="d-flex flex-column">
        <b>{moment(props.entry.date).format('MM/DD/YYYY')}</b>
        <i>Open: {formatCurrency(props.entry.open)}</i>
        <i>Close: {formatCurrency(props.entry.close)}</i>
        <i>High: {formatCurrency(props.entry.high)}</i>
        <i>Low: {formatCurrency(props.entry.low)}</i>
    </div>)
}

export default StockHistoryTooltip;