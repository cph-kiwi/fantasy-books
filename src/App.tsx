import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import BooksPage from "./pages/BooksPage.tsx";
import DetailsPage from "./pages/DetailsPage.tsx";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/books" element={<BooksPage />} />
				<Route path="/book/:id" element={<DetailsPage />} />
			</Routes>
		</Router>
	);
}

export default App;
