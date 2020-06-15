import React from "react";
import {Col, Form} from "react-bootstrap";

function NewList() {

    let expArr = [];
    if (localStorage.getItem('expArr') !== null) {
        expArr = JSON.parse(localStorage.getItem('expArr'))
    } else {
        expArr = []
    }

    let List = expArr.map(elem => {
        return (
            <Form key={elem.key} className="pb-2">
                <Form.Row className="m-2">
                    <Col xs={4} md={2}>
                        <Form.Label className="pt-1">
                            Abgelaufenes Produkt:
                        </Form.Label>
                    </Col>
                    <Col xs={8} md={3}>
                        <Form.Control type="text"
                                      value={elem.text}
                                      disabled
                        />
                    </Col>
                </Form.Row>
            </Form>
        )
    })


    if (expArr.length === 0) {
        return null
    } else {
        return (
            <React.Fragment>
                <h2 className="mt-2">Expire List:</h2>
                <div>{List}</div>
            </React.Fragment>
        )
    }

}
export default NewList;