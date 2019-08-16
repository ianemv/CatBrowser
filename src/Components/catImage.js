import React, { Component } from 'react'
import { Card,  Button, Col } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default function CatImage(props) {
    return <Col md={3} sm={6} >
        <Card>
            <img className="card-img-top" alt={props.cat.id} src={props.cat.url} />
            <Card.Body>            
                <Link className="btn btn-primary btn-block" to={props.cat.id}>View details</Link>            
            </Card.Body>   
        </Card>
    </Col>
    
}