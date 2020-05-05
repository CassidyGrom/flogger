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
import { SavedEntries, deleteEntries } from "../utils/API";
import UserInfoContext from "../utils/UserInfoContext";
import AuthService from "../utils/auth";

function NewEntry() {
  return (
    <>
      <Container>
        <Row>
          <Col xs={6} md={6}>
            <h1>How are you feeling today?</h1>
          </Col>
          <Col xs={6} md={6}>
            <h1>Current Entry</h1>
          </Col>
          <Col xs={6} md={6}>
        <Form>
          {/* <Form onSubmit={handleFormSubmit}> */}
          {/* our html */}
          <Form.Row>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Talk about your day here:</Form.Label>
              <Form.Control
                name="entryInput"
                // value={entryInput}
                // onChange={(e) => setEntryInput(e.target.value)}
                type="text"
                placeholder="journal feelings here"
                as="textarea"
                rows="5"
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="Form.PrimaryEmotion">
              <Form.Label>Primary Emotion</Form.Label>
              <Form.Control as="select">
                <option>Example feelings</option>
                <option>Example feeling 2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="Form.SecondaryEmotion">
              <Form.Label>Secondary Emotion</Form.Label>
              <Form.Control as="select">
                <option>This is prepopulated by above drop down</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Row>
            <Col xs={12} md={4}>
              <Button type="submit" variant="success">
                Submit Search
              </Button>
            </Col>
          </Row>
        </Form>
        </Col>
        <Col xs={6} md={6}>
          <Container>
            <Card>
              <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </Card>
          </Container>
        </Col>
        </Row>
      </Container>
    </>
  );
}

export default NewEntry;
