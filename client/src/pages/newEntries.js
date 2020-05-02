import React, { useState, useContext } from "react";
import {
  Forms,
  FromControl,
  FormGroup,
  FormlLabel,
  ControlId,
} from "react-bootstrap";

import { SavedEntries, deleteEntries } from "../utils/API";
import { UserInfoConext } from "../utils/UserInfoContext";

function NewEntry() {
  // create state for holding returned entry data we don't know if need right here lol help
  const [newEntry, setNewEntry] = useState([]);
  // create state for holding our inpputted field data
  const [EntryInput, setEntryInput] = useState("");

  // get saved books from app.js on load
  const { journal: savedEntries, getSavedEntries } = useContext(
    UserInfoContext
  );

  console.log(UserInfoContext);

  // create method to search for books and set state on form submit COME BACK TO THIS!!
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    searchGoogleBooks(searchInput)
      .then(({ data }) => {
        const bookData = data.items.map((book) => ({
          bookId: book.id,
          authors: book.volumeInfo.authors || ["No author to display"],
          title: book.volumeInfo.title,
          description: book.volumeInfo.description,
          image: book.volumeInfo.imageLinks?.thumbnail || "",
        }));
        console.log(bookData);

        return setSearchedBooks(bookData);
      })
      .then(() => setSearchInput(""))
      .catch((err) => console.log(err));
  };

  // create function to handle saving a book to our database
  const handleSaveBook = (bookId) => {
    // find the book in `searchedBooks` state by the matching id
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    // send the books data to our api
    saveBook(bookToSave)
      .then(() => getSavedBooks())
      .catch((err) => console.log(err));
  };
  //HTML :)
  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>How are you feeling today?</h1>
          <Form onSubmit={handleFormSubmit}>
            {/* our html */}
            <Form.Row>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Example textarea</Form.Label>
                <Form.Control
                  name="entryInput"
                  value={entryInput}
                  onChange={(e) => setEntryInput(e.target.value)}
                  type="text"
                  placeholder="journal feelings here"
                  as="textarea"
                  rows="3"
                />
              </Form.Group>
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
              {/* leave this */}
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container fluid>
        <h2>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : "Search for a book to begin"}
        </h2>
        <CardColumns>
          {searchedBooks.map((book) => {
            return (
              <Card key={book.bookId} border="dark">
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    disabled={savedBooks.some(
                      (savedBook) => savedBook.bookId === book.bookId
                    )}
                    className="btn-block btn-info"
                    onClick={() => handleSaveBook(book.bookId)}
                  >
                    {savedBooks.some(
                      (savedBook) => savedBook.bookId === book.bookId
                    )
                      ? "This book has already been saved!"
                      : "Save this Book!"}
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
}

export default SearchBooks;
