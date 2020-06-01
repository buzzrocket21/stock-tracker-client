import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { ListGroupItem, Container, Row, Col } from 'reactstrap';

import { StockModel } from '../models/StockModel';

import './StockListItem.css';
import { useHistory } from 'react-router-dom';
import { formatCurrency } from '../utils/stringFormatters';

interface StockListItemProps {
  stockKey: string;
  value: StockModel;
  handleUntrack: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

function StockListItem(props: StockListItemProps) {
  const history = useHistory();

  return <ListGroupItem className="stock-list-item" action onClick={() => {
    history.push(`/history/${props.stockKey}`);
  }}>
    <Container>
      <Row>
        <h4>{props.stockKey.toUpperCase()}</h4>
      </Row>
      <Row>
        <Col>
          <Row>
          <strong>
            <i>{props.value.name}</i>
          </strong>
          </Row>
          <Row>
          <span className={props.value.change > 0 ? "text-success" : "text-danger"}>
            {formatCurrency(props.value.price)}
            <sub className="pl-2">
              <FontAwesomeIcon icon={props.value.change > 0 ? faCaretUp : faCaretDown} />
              {formatCurrency(props.value.change)}</sub>
          </span>
          </Row>
        </Col>
        <Col className="d-flex justify-content-between">
          <i className="p-2">{moment(props.value.time).fromNow()}</i>
          <a href="/tracker" onClick={props.handleUntrack}>
            <FontAwesomeIcon id="deleteIcon" icon={faTrash} />
          </a>
        </Col>
      </Row>
    </Container>
  </ListGroupItem>;
}

export default StockListItem;