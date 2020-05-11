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
  const [charFlag, setCharFlag] = useState(false)

  const userData = useContext(UserInfoContext);

  const maxCount = 250

  // get emotion list from server
  useEffect(() => {
    getEmotionList()
      .then(({ data }) => {
        console.log(data);
        setEmotionList(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (entryInput.length > maxCount) {
      console.log('too many')
      setCharFlag(true)
    } else {
      console.log(`characters ${entryInput.length}`)
      setCharFlag(false)
    }
  }, [entryInput])

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
      .then(() => {
        userData.getUserData();
        setEntryInput("");
        setPrimaryEmotion("");
        setSecondaryEmotion("");
      })
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

  const isButtonDisabled = () => {
    if (charFlag || !entryInput || !pickedPrimaryEmotion) {
      return true
    }

    return false
  }

  return (
    <>
      <Container className="border border-secondary mt-5 p-3 rounded bg-white">
        <Row>
          <Col xs={12} md={12} className="mt-4">
            <h1 className="text-center">How are you feeling today?</h1>
          </Col>
          <Col xs={12} md={12}>
            <Form onSubmit={handleFormSubmit}>
              <Form.Row>
                <Form.Group
                  className="col-12"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label className="green mt-3">Talk about your day here:</Form.Label>
                  <Form.Control
                    name="entryInput"
                    value={entryInput}
                    onChange={(e) => setEntryInput(e.target.value)}
                    type="text"
                    placeholder="Journal your feelings here (Max characters 250)"
                    as="textarea"
                    rows="5"
                  />
                  <p>
                    {entryInput.length}/{maxCount}
                  </p>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group controlId="Form.PrimaryEmotion" className="col-12">
                  <Form.Label className="mr-3 green">Primary emotion:</Form.Label>
                  <Form.Control
                    as="select"
                    name="primary-emotion"
                    onChange={handleSelectPrimaryEmotion}
                  >
                    {!pickedPrimaryEmotion && (
                      <option selected disabled>
                        Pick a primary emotion
                      </option>
                    )}
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
                {pickedPrimaryEmotion && (
                  <Form.Group
                    controlId="Form.PrimaryEmotion"
                    className="col-12"
                  >
                    <Form.Label className="mr-3 green">Secondary emotion:</Form.Label>
                    <Form.Control
                      as="select"
                      name="secondary-emotion"
                      onChange={(event) =>
                        setSecondaryEmotion(event.target.value)
                      }
                    >
                      {(!pickedPrimaryEmotion || !pickedSecondaryEmotion) && (
                        <option selected disabled>
                          How did that make you feel specifically?
                        </option>
                      )}
                      {/* if we haven't selected a primary emotion yet, show a different option*/}
                      {secondaryEmotionOptions.length &&
                        secondaryEmotionOptions.map((emotion) => (
                          <option key={emotion} value={emotion}>
                            {emotion}
                          </option>
                        ))}
                    </Form.Control>
                  </Form.Group>
                )}
              </Form.Row>
              <Row>
                <Col xs={12} md={12} className="text-right">
                  <Button
                    disabled={isButtonDisabled()}
                    type="submit"
                    className="submitbtn"
                  >
                    Save your entry
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default NewEntry;
