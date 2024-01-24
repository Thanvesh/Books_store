import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from "react"
import './App.css';
import Header from "./components/Header";
import Home from './components/Home';



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

  console.log(bookList)
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Home bannerData={bookList} loading={loading} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
