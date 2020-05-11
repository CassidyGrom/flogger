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
import UserInfoContext from "../utils/UserInfoContext";
import * as API from "../utils/API";
import AuthService from "../utils/auth";

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
      // upon success, update user data to reflect a journal entry change
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Container>
        <h1 className="m-5">Past journal entries</h1>
      </Container>
      <Container>
        <CardColumns>
          {userData.journals?.map((entry) => {
            return (
              <Card key={entry._id} border="secondary">
                <Card.Body>
                <Button
                    className="remove"
                    onClick={() => handleDeleteEntry(entry._id)}
                  > X
                  </Button>
                  <Card.Title>{entry.createdAt}</Card.Title>
                  <Card.Text>
                    {entry.journalText}
                    <div>
                      <p>
                        {entry.primaryEmotion} | {entry.secondaryEmotion}
                      </p>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
}

export default SavedEntries;
