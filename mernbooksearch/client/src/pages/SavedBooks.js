import React, { useState } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { DEMO, getDemoBooks, removeDemoBook } from '../utils/demo';

const SavedBooks = () => {
  // the demo has no server, so skip the query and read books from localStorage
  const { loading, data } = useQuery(QUERY_ME, { skip: DEMO });
  const [removeBook] = useMutation(REMOVE_BOOK);
  const [demoBooks, setDemoBooks] = useState(DEMO ? getDemoBooks() : []);

  const userData = data?.me || {};
  const savedBooks = DEMO ? demoBooks : userData.savedBooks || [];

  // delete the book from the user's account by its Google Books id
  const handleDeleteBook = async (bookId) => {
    if (!Auth.loggedIn()) {
      return false;
    }

    try {
      if (DEMO) {
        removeDemoBook(bookId);
        setDemoBooks(getDemoBooks());
        removeBookId(bookId);
        return;
      }
      // the response updates the cached `me` query, so the list re-renders
      await removeBook({ variables: { bookId } });
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  if (!Auth.loggedIn()) {
    return <h2 className='m-4'>Log in to see your saved books.</h2>;
  }

  // if data isn't here yet, say so
  if (loading) {
    return <h2 className='m-4'>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {savedBooks.length
            ? `Viewing ${savedBooks.length} saved ${savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {(book.authors || []).join(', ')}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
