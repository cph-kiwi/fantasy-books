import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import booksData from "../assets/fantasy-books.json";
import BookCard from "../components/BookCard.tsx";

const LandingPage = () => {
	const [searchTerm, setSearchTerm] = useState(
		new URLSearchParams(useLocation().search).get("search") || ""
	);

	const latestBooks = [...booksData.books]
		.sort(
			(a, b) =>
				new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
		)
		.slice(0, 3);

	const searchResults = searchTerm
		? booksData.books.filter(
				(book) =>
					book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					book.author.toLowerCase().includes(searchTerm.toLowerCase())
		  )
		: [];

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		window.history.pushState({}, "", `/?search=${searchTerm}`);
	};

	return (
		<div>
			<nav className="nav-center">
				<Link to="/books" className="back-link">
					Books →
				</Link>
			</nav>
			<h1>Do you live in fantasy land?</h1>
			<div className="search-container">
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						value={searchTerm}
						onChange={handleSearch}
						placeholder="Search for a book"
					/>
					<button type="submit" className="button-link">
						Search
					</button>
				</form>
			</div>

			{searchTerm && (
				<div className="search-results">
					<h2>Search Results</h2>
					<ul className="books-list">
						{searchResults.map((book) => (
							<BookCard key={book.id} book={book} />
						))}
						{searchResults.length === 0 && (
							<p>No books found matching "{searchTerm}"</p>
						)}
					</ul>
				</div>
			)}

			<h2>Latest Books</h2>
			<ul className="books-list">
				{latestBooks.map((book) => (
					<BookCard key={book.id} book={book} />
				))}
			</ul>
		</div>
	);
};

export default LandingPage;
