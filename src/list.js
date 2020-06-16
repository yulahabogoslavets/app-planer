import React from "react";
import './App.css';
import {Col, Row, Button, Form} from "react-bootstrap";

import {faTrash} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function List(props){
    const listItems = props.product.map(item =>{
        return <Form key={item.key} className="bg-info pt-3" >
            <Form.Row>
                <Col md={2} className="mb-2">
                    <Form.Control type="text"
                           value={item.text}
                           id={item.key}
                           onChange={(e)=>props.editText(e.target.value, item.key)}
                    />
                </Col>

                <Col md={2} className="mb-2">
                    <Form.Control type="number"
                           value={item.number}
                           id={item.key}
                           onChange={(e)=>props.editNumber(e.target.value, item.key)}
                    />
                </Col>

                <Col md={2} className="mb-2">
                    <Form.Control type="date"
                           value={item.date}
                           id={item.key}
                           onChange={(e)=>props.editDate(e.target.value, item.key)}
                    />
                </Col>
                <Col md={3} xs={6}>
                    <Form.Group as={Row} xs={3}>
                        <Form.Label htmlFor="check" column sm="8" className="text-light text-center">
                            {item.isChecked === true? 'Erledigt': 'Unerledigt'}
                        </Form.Label>
                        <Col xs={3}>
                            <Form.Control type="checkbox"
                                   id={item.key}
                                   value={item.isChecked}
                                          checked={item.isChecked}
                                   onChange={(e)=>props.toggleChange(e.target.checked, item.key)}
                            />
                        </Col>

                    </Form.Group>
                </Col>

                <Col md={3} xs={6}>
                    <Button onClick={()=>props.deleteElement(item)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </Col>

            </Form.Row>
        </Form>
    })
    return(
        <div>{listItems}</div>

    )
}