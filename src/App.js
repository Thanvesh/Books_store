import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from "react"
import {CartProvider} from "./components/CartContext"

import Header from "./components/Header";
import Home from './components/Home';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import Cart from './components/Cart';
import './App.css';


const App = () => {
  const [bookList, setBookList] = useState([])
  const [loading, setLoading] = useState(true);





  useEffect(() => {

    const booksData = async () => {
      try {
        const response = await fetch("https://api.itbook.store/1.0/new");
        const data = await response.json();
        setBookList(data);
      } catch (error) {
        console.error("Error Fetching Data:", error);
      }
      setLoading(false);
    };

    booksData();
  }, []);

  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home bannerData={bookList} loading={loading} />} />
          <Route path="/Book" exact element={<BookList />} />
          <Route path="/Book/:isbn13" exact element={<BookDetails />} />
          <Route path="/cart" exact element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>

  );
}

export default App;
