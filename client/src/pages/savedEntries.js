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
        <h1 className="mt-4 mb-4 text-center">Past journal entries</h1>
      </Container>
      <Container>
        <CardColumns>
          {userData.journals?.map((entry) => {
            return (
              <Card key={entry._id}>
                <Card.Body>
                  <div className="mb-4">
                    <Button
                      className="remove"
                      onClick={() => handleDeleteEntry(entry._id)}
                    >
                      X
                    </Button>
                  </div>
                  <Card.Title className="form-label pl-2 pr-2 text-center">
                    {entry.createdAt}
                  </Card.Title>
                  <Card.Text className="ml-3">
                    {entry.journalText}
                    <div>
                      <p class="labels mt-4">
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
