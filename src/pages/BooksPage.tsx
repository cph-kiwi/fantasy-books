import React from "react";
import { Link } from "react-router-dom";
import BookCard from "../components/BookCard.tsx";
import booksData from "../assets/fantasy-books.json";

const BooksPage = () => {
	//This function sorts the books by date added, to display the latest books first
	const sortedBooks = [...booksData.books].sort(
		(a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
	);

	return (
		<div>
			<Link to="/" className="back-link">
				← Back to Home
			</Link>
			<h1>Books List</h1>
			<ul className="books-list">
				{sortedBooks.map((book) => (
					<BookCard key={book.id} book={book} />
				))}
			</ul>
		</div>
	);
};

export default BooksPage;
