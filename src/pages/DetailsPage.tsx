import React from "react";
import { Link, useParams } from "react-router-dom";
import booksData from "../assets/fantasy-books.json";

const DetailsPage = () => {
	const { id } = useParams();
	const book = booksData.books.find((book) => book.id === Number(id));

	if (!book) {
		return <div>Book not found</div>;
	}

	return (
		<div className="details-page">
			<Link
				onClick={(e) => {
					e.preventDefault();
					window.history.back();
				}}
				to="#"
				className="back-link"
			>
				← Back
			</Link>
			<div className="book-details">
				<img src={book.coverImage} alt={book.title} className="book-cover" />
				<div className="book-info">
					<h1>{book.title}</h1>
					<h2>by {book.author}</h2>
					<p className="description">{book.description}</p>
					<div className="metadata">
						<p>
							<strong>Published:</strong> {book.yearPublished}
						</p>
						<p>
							<strong>Publisher:</strong> {book.publisher}
						</p>
						<p>
							<strong>Pages:</strong> {book.pages}
						</p>
						<p>
							<strong>Genre:</strong> {book.genre}
						</p>
						<p>
							<strong>Setting:</strong> {book.setting}
						</p>
						{book.series && (
							<p>
								<strong>Series:</strong> {book.series}
							</p>
						)}
						<div className="themes">
							<strong>Themes:</strong>
							<ul>
								{book.themes.map((theme, index) => (
									<li key={index}>{theme}</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailsPage;
