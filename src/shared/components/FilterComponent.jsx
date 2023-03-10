import React from "react";
import { Row, Col, InputGroup, FormControl } from "react-bootstrap";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";

export const FilterComponent = ({ filterText, onFilter, onClear }) => {
  return (
    <Row>
      <Col>
        <InputGroup className="mb-3">
          <FormControl
            id="search"
            placeholder="Search..."
            aria-label="Search..."
            value={filterText}
            onChange={onFilter}
          />
          <InputGroup.Text>
            <FeatherIcon icon={"x"} />
          </InputGroup.Text>
        </InputGroup>
      </Col>
    </Row>
  );
};
