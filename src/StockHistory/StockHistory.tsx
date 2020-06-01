import React, { useState, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { Chart } from 'react-charts';
import { Container, Row } from 'reactstrap';
import { useParams, Link } from 'react-router-dom';

import { HistoryEntry, StockWithHistoryModel } from '../models/StockWithHistoryModel';

import './StockHistory.css';
import StockHistoryTooltip from './StockHistoryTooltip';
import StockSummary from './StockSummary';

function StockHistory() {
    const { key } = useParams();
    const [stock, setStock] = useState<StockWithHistoryModel>();
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/history/${key}`).then(result => result.json().then(setStock));
    }, [key, setStock]);
    const series = useMemo(() => ({ showPoints: true }), []);
    const axes = useMemo(() => [
        { primary: true, type: 'time', position: 'bottom' },
        { type: 'linear', position: 'left' }
    ], []);
    const tooltip = useMemo(
        () => ({
            render: (props: any) => {
                if (props.datum) {
                    return <StockHistoryTooltip entry={props.datum.originalDatum.entry} />;
                }
                return null;
            }
        }),
        []
    );
    const stockData = useMemo(
        () => [{
            label: key,
            datums: stock ? stock.history.map((entry: HistoryEntry) => ({
                x: new Date(entry.date),
                y: entry.close,
                entry
            })) : []
        }]
        ,
        [key, stock]
    );
    return (
        <div>
            <Link to="/tracker">
                <h6><FontAwesomeIcon icon={faCaretLeft} /> Back</h6>
            </Link>
            <Container>
                <Row>
                    <h4>{key.toUpperCase()}</h4>
                </Row>
                <Row className="mb-3">
                    { stock ? <StockSummary stock={stock} /> : <></> }
                </Row>
                <Row className="stock-history-chart-container">
                    {stock && stockData.length ? <Chart
                        data={stockData}
                        series={series}
                        axes={axes}
                        tooltip={tooltip}
                    /> : <></>}
                </Row>
            </Container>
        </div>
    )
}

export default StockHistory;