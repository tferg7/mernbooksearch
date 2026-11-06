// Demo mode is turned on for the GitHub Pages build (REACT_APP_DEMO=true).
// There is no server there, so saved books live in this browser's localStorage.
export const DEMO = process.env.REACT_APP_DEMO === 'true';

const KEY = 'demo_saved_books';

export const getDemoBooks = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch (err) {
    return [];
  }
};

const setDemoBooks = (books) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(books));
  } catch (err) {
    // storage unavailable; saves last until the page is closed
  }
};

export const saveDemoBook = (book) => {
  const books = getDemoBooks().filter((b) => b.bookId !== book.bookId);
  setDemoBooks([...books, book]);
};

export const removeDemoBook = (bookId) => {
  setDemoBooks(getDemoBooks().filter((b) => b.bookId !== bookId));
};
