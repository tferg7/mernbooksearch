// Search for books. Tries Google Books first; Google often rate-limits requests
// without an API key (HTTP 429), so fall back to Open Library, which needs no key.
// Both return the same shape: { bookId, authors, title, description, image, link }.

const fromGoogle = async (query) => {
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error(`Google Books returned ${response.status}`);
  const { items = [] } = await response.json();
  return items.map((book) => ({
    bookId: book.id,
    authors: book.volumeInfo.authors || ['No author to display'],
    title: book.volumeInfo.title,
    description: book.volumeInfo.description || '',
    image: book.volumeInfo.imageLinks?.thumbnail?.replace('http://', 'https://') || '',
    link: book.volumeInfo.infoLink || '',
  }));
};

const fromOpenLibrary = async (query) => {
  const fields = 'key,title,author_name,cover_i,first_publish_year,first_sentence';
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20&fields=${fields}`
  );
  if (!response.ok) throw new Error(`Open Library returned ${response.status}`);
  const { docs = [] } = await response.json();
  return docs.map((doc) => ({
    bookId: doc.key.replace('/works/', ''),
    authors: doc.author_name || ['No author to display'],
    title: doc.title,
    description: doc.first_sentence?.[0] || (doc.first_publish_year ? `First published ${doc.first_publish_year}.` : ''),
    image: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : '',
    link: `https://openlibrary.org${doc.key}`,
  }));
};

export const searchBooks = async (query) => {
  try {
    return await fromGoogle(query);
  } catch (err) {
    console.warn(`${err.message}; using Open Library instead`);
    return fromOpenLibrary(query);
  }
};
