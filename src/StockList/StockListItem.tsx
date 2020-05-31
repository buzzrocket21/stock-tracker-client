import React, { } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { ListGroupItem, Container, Row, Col } from 'reactstrap';

import { StockModel } from './StockModel';

import './StockListItem.css';

interface StockListItemProps {
  stockKey: string;
  value: StockModel;
  handleUntrack: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

function StockListItem(props: StockListItemProps) {
  return <ListGroupItem className="stock-list-item" action>
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
            {props.value.price.toLocaleString("en-US", {
              style: 'currency',
              currency: 'USD'
            })}
            <sub className="pl-2">
              <FontAwesomeIcon icon={props.value.change > 0 ? faCaretUp : faCaretDown} />
              {props.value.change.toLocaleString("en-US", {
                style: 'currency',
                currency: 'USD'
              })}</sub>
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