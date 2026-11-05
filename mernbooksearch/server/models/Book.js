const { Schema } = require('mongoose');

// Subdocument schema: not its own model, used for the User's `savedBooks` array
const bookSchema = new Schema({
  authors: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
  },
  // saved book id from Google Books
  bookId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = bookSchema;
