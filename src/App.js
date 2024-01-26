import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from "react"

import Header from "./components/Header";
import Home from './components/Home';
import BookList  from './components/BookList';
import BookDetails from './components/BookDetails';
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
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home bannerData={bookList} loading={loading} />}/>
        <Route  path="/Book" exact element={<BookList bannerData={bookList.books} />}/>
        <Route  path="/Book/:isbn13" exact element={<BookDetails/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
