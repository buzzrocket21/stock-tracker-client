import React from 'react';
import { StockModel } from '../models/StockModel';
import { Col, Row } from 'reactstrap';
import { formatCurrency } from '../utils/stringFormatters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

interface StockSummaryProps {
    stock: StockModel;
}

function StockSummary(props: StockSummaryProps) {
    return (
        <Col>
            <Row>
                <strong>
                    <i>{props.stock.name}</i>
                </strong>
            </Row>
            <Row>
                <span className={props.stock.change > 0 ? "text-success" : "text-danger"}>
                    {formatCurrency(props.stock.price)}
                    <sub className="pl-2">
                        <FontAwesomeIcon icon={props.stock.change > 0 ? faCaretUp : faCaretDown} />
                        {formatCurrency(props.stock.change)}</sub>
                </span>
            </Row>
        </Col>
    );
}

export default StockSummary;