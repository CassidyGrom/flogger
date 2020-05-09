import React, { useState, useContext, useEffect } from "react";
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
import { saveEntries, deleteEntries, getEmotionList } from "../utils/API";
import UserInfoContext from "../utils/UserInfoContext";
import AuthService from "../utils/auth";

function NewEntry() {
  // set up state to hold emotions retrieved from server
  const [emotionList, setEmotionList] = useState([]);
  // set up place to set secondary emotion list when we select a primary emotion
  const [secondaryEmotionOptions, setSecondaryEmotionOptions] = useState([]);
  const [pickedPrimaryEmotion, setPrimaryEmotion] = useState("");
  const [pickedSecondaryEmotion, setSecondaryEmotion] = useState("");
  const [entryInput, setEntryInput] = useState("");

  const userData = useContext(UserInfoContext);

  // get emotion list from server
  useEffect(() => {
    console.log("helloooo");
    getEmotionList()
      .then(({ data }) => {
        console.log(data);
        setEmotionList(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const entryData = {
      primaryEmotion: pickedPrimaryEmotion,
      secondaryEmotion: pickedSecondaryEmotion,
      journalText: entryInput,
    };

    // get token
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }

    saveEntries(entryData, token)
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  };

  const handleSelectPrimaryEmotion = (e) => {
    const secondaryEmotions = emotionList.find(
      ({ primaryEmotion }) => primaryEmotion === e.target.value
    ).secondaryEmotion;

    console.log(secondaryEmotions);
    setPrimaryEmotion(e.target.value);
    setSecondaryEmotionOptions(secondaryEmotions);
  };

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
            <Form onSubmit={handleFormSubmit}>
              <Form.Row>
                <Form.Group
                  className="col-12"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Talk about your day here:</Form.Label>
                  <Form.Control
                    name="entryInput"
                    value={entryInput}
                    onChange={(e) => setEntryInput(e.target.value)}
                    type="text"
                    placeholder="journal feelings here"
                    as="textarea"
                    rows="5"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group controlId="Form.PrimaryEmotion" className="col-12">
                  <Form.Label className="mr-3">Primary emotion:</Form.Label>
                  <Form.Control
                    as="select"
                    name="primary-emotion"
                    onChange={handleSelectPrimaryEmotion}
                  >
                    <option selected disabled>
                      Pick a primary emotion
                    </option>
                    {emotionList.map(({ primaryEmotion }) => {
                      return (
                        <option key={primaryEmotion} value={primaryEmotion}>
                          {primaryEmotion}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              {/* set area for picking secondary emotion */}
              <Form.Row>
                <Form.Group controlId="Form.PrimaryEmotion" className="col-12">
                  <Form.Label className="mr-3">Secondary emotion:</Form.Label>
                  <Form.Control
                    as="select"
                    name="secondary-emotion"
                    onChange={(event) =>
                      setSecondaryEmotion(event.target.value)
                    }
                  >
                    {/* if we haven't selected a primary emotion yet, show a different option*/}
                    {secondaryEmotionOptions.length ? (
                      secondaryEmotionOptions.map((emotion) => (
                        <option key={emotion} value={emotion}>
                          {emotion}
                        </option>
                      ))
                    ) : (
                      <option selected disabled>
                        Pick a primary emotion first
                      </option>
                    )}
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <Row>
                <Col xs={12} md={12} className="text-right">
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
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
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
