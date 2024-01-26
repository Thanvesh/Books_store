import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import Loader from "../Loader"
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort } from '@fortawesome/free-solid-svg-icons';
import "./index.css"





const renderConstraints = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    fail: 'FAIL',
    loading: 'LOADING',
}


const BookList = (props) => {
    const { bannerData, } = props

    const [booksData, setBooksData] = useState({ total: '0', books: [], })
    const [apiStatus, setApistatus] = useState(renderConstraints.initial)
    const [searchValue, setSearchValue] = useState("")
    const [showPriceRange, setShowPriceRange] = useState(false);
    const [priceRange, setPriceRange] = useState([0, 100]); // Initial price range





    const getBookDetails = async () => {
        setApistatus(renderConstraints.loading)
        try {
            const response = await fetch("https://api.itbook.store/1.0/search/mongodb");
            const data = await response.json();
            setBooksData({ total: data.total, books: data.books });
            setApistatus(renderConstraints.success)
        } catch (error) {
            console.error("Error Fetching Data:", error);
            setApistatus(renderConstraints.fail)
        }
    };

    useEffect(() => {

        getBookDetails()
    }, [])

    const handleTryAgain = () => (
        getBookDetails()
    )

    const renderLoaderView = () => (
        <Loader />
    )

    const renderFailureView = () => (
        <div className="failure-container">
            <h1>Something Went Wrong </h1>
            <button type="button" className="try-again-button" onClick={handleTryAgain}>Try Again</button>
        </div>
    )


    const handlePriceChange = (value) => {
        setPriceRange(value);
        setShowPriceRange(false);
    };

    const handleTogglePriceRange = () => {
        setShowPriceRange(!showPriceRange);
    };

    const handleToggle = () => {

        handleTogglePriceRange();
    };


    const handleSearchInput = (event) => {
        setSearchValue(event.target.value)


    }

    const filteredData = searchValue ? booksData.books.filter(item => {
        const itemTitle = item.title ? item.title.toLowerCase() : "";
        const itemPrice = parseFloat(item.price.replace(/[^\d.]/g, ''));

        return (
            itemTitle.includes(searchValue.toLowerCase()) &&
            itemPrice >= priceRange[0] &&
            itemPrice <= priceRange[1]
        )
    }) : booksData.books.filter(item => {
        const itemPrice = parseFloat(item.price.replace(/[^\d.]/g, ''));

        return (
            itemPrice >= priceRange[0] &&
            itemPrice <= priceRange[1]
        )
    })



    const filteredBooks = searchValue ? bannerData.filter(book => {
        const bookTitle = book.title ? book.title.toLowerCase() : "";
        const bookPrice = parseFloat(book.price.replace(/[^\d.]/g, ''));

        return (
            bookTitle.includes(searchValue.toLowerCase()) &&
            bookPrice >= priceRange[0] &&
            bookPrice <= priceRange[1]
        )
    }) : bannerData.filter(book => {
        const bookPrice = parseFloat(book.price.replace(/[^\d.]/g, ''));

        return (
            bookPrice >= priceRange[0] &&
            bookPrice <= priceRange[1]
        )
    })





    const renderSuccessView=()=> {
        return (
            <div className="books-main-container">
                <h1 className="heading"><Link to="/" className="text">Home</Link>/<Link to="/Books" className="text-book">Books</Link></h1>
                <div className="books-filter-container">
                    <div className="search-sort-container">
                        <div className="search-container">
                            <input className="search-box" onChange={handleSearchInput} type="search" value={searchValue} name="search" placeholder="Search By Title,Author" />
                        </div>
                        <div className="web-sort">
                            <label>Price Range:</label>
                            <Slider
                                range
                                min={0}
                                max={100}
                                defaultValue={[0, 100]}
                                value={priceRange}
                                onChange={handlePriceChange} />
                            <div>
                                <span>Min Price: ${priceRange[0]}</span>
                                <span>Max Price: ${priceRange[1]}</span>
                            </div>
                        </div>
                    </div>
                    <ul className="book-list-container">
                        {filteredData.map((book) => (

                            <li key={book.isbn13} className="book-card">
                                <Link to={`/Book/${book.isbn13}`}>
                                    <img className="card-image" src={book.image} alt={book.title} />
                                    <div className="card-text-details">
                                        <h1 className="card-title">{book.title}</h1>
                                        <p className="card-price">₹{book.price}</p>
                                        <button className="card-button" type="button">Order Now</button>
                                    </div>
                                </Link>
                            </li>
                        ))}

                    </ul>
                    <h1 className="new-books-heading">Newly Released Section </h1>
                    <ul className="book-list-container">
                        {filteredBooks.map((book) => (
                            <li key={book.isbn13} className="book-card">
                                <Link to={`/Book/${book.isbn13}`}>
                                    <img className="card-image" src={book.image} alt={book.title} />
                                    <div className="card-text-details">
                                        <h1 className="card-title">{book.title}</h1>
                                        <p className="card-price">₹{book.price}</p>
                                        <button className="card-button" type="button">Order Now</button>
                                    </div>
                                </Link>
                            </li>
                        ))}

                    </ul>
                </div>
                <div className="mobile-sort">

                    {showPriceRange && (
                        <div className="price-dropdown">
                            <button type="button" onClick={() => handlePriceChange([0, 34])}>Price: Low</button>
                            <button type="button" onClick={() => handlePriceChange([35, 100])}>Price: High</button>
                        </div>
                    )}
                    <div className="sort-button-container">
                        <FontAwesomeIcon id="icon" icon={faSort} onClick={handleToggle} className="sort-icon" />
                        <button id="sort" onClick={handleTogglePriceRange} type="button" className="sort-button" >Sort By</button>
                    </div>

                </div>
            </div>

        );

    }


    const renderSwitchView = () => {
        switch (apiStatus) {
            case renderConstraints.loading:
                return renderLoaderView()

            case renderConstraints.success:
                return renderSuccessView()

            case renderConstraints.fail:
                return renderFailureView()
            default:
                return null
        }
    }

    return (

        renderSwitchView()


    )



}

export default BookList