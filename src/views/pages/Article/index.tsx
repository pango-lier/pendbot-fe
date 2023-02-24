import React from "react";
import { Route, Switch } from "react-router-dom";
import { Card, Col, Row } from "reactstrap";
import BaseTable from "./components/BaseTable";

function Table(props) {
    const { match } = props;
    return (
        <Row>
            <Col sm="12">
                <Card code="BaseTable">
                    <Switch>
                        <Route exact path={match.path} component={BaseTable} />
                    </Switch>
                </Card>
            </Col>
        </Row>
    );
}

Table.propTypes = {};

export default Table;
