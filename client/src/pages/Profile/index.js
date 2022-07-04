import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getMe, deleteBook } from '../../utils/API';
import Auth from '../../utils/auth';
import { removeBookId } from '../../utils/localStorage';


const Profile = () => {


    return (
        <>
        <Container>
        <Row>
            <Col>User Information</Col>
            <Col></Col>
        </Row>

        <Row>
            <Col>Username:</Col>
            <Col>Username Input</Col>
        </Row>
        <Row>
            <Col>Email:</Col>
            <Col>Email Input</Col>
        </Row>
        <Row>
            <Col>Change Username BTN</Col>
            <Col>Change Email BTN</Col>
            <Col>Change Password</Col>
        </Row>

        <Row>
            <Col>My Reviews</Col>
            <Col></Col>
        </Row>

        <Row>
            <Col>PPIndivReviews</Col>
        </Row>

        <Row>
            <Col></Col>
            <Col></Col>
            <Col>Sign Out BTN</Col>
        </Row>
        </Container>
        </>
    )
 }

export default Profile;