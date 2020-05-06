import React, { useState, useContext } from "react";
import {
  Form,
  Card,
  Button,
  Container,
  Jumbotron,
  Col,
  Row,
  CardColumns,
} from "react-bootstrap";
// import context for global state
import UserInfoContext from '../utils/UserInfoContext';
import * as API from '../utils/API';
import AuthService from '../utils/auth';

function SavedEntries() {

    // get whole userData state object from App.js
    const userData = useContext(UserInfoContext);

    const handleDeleteEntry = (journalId) => {
      // get token
      const token = AuthService.loggedIn() ? AuthService.getToken() : null;
  
      if (!token) {
        return false;
      }
      API.deleteEntries(journalId, token)
        // upon succes, update user data to reflect book change
        .then(() => userData.getUserData())
        .catch((err) => console.log(err));
    };

  return (
    <>
    <Container>
      <h1>
        Past journal entries
      </h1>
    </Container>
      <Container>
      <CardColumns>
          {userData.savedEntries.map((entry) => {
            return (
              <Card key={entry.journalId} border='dark'>
                <Card.Body>
                  <Card.Title>{entry.createdAt}</Card.Title>
                  <Card.Text>{entry.journalText}
                  <div><p>{entry.primaryEmotion} | {entry.secondaryEmotion}</p></div>
                  </Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteEntry(entry.journalId)}>
                    Delete this entry!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
    )
}

export default SavedEntries;