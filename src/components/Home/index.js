
import "./index.css"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from "react-router-dom"
import { Vortex } from 'react-loader-spinner'





const Home = (props) => {
    const { bannerData, loading } = props

    // Choose a random starting index to get a subset of 6 books
    const dataToDisplay = Array.isArray(bannerData.books) ? bannerData.books : [];

    // Choose a random starting index to get a subset of 6 books
    const startIndex = Math.floor(Math.random() * (dataToDisplay.length - 6 + 1));

    // Extract a subset of 6 books starting from the random index
    const selectedBooks = dataToDisplay.slice(startIndex, startIndex + 6);





    const settings = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000, // Adjust the duration between slides in milliseconds
    };

    return (
        <div className="home-container">

            {loading ? (
            <div className="spinner">
                <Vortex
            visible={true}
            height="80"
            width="80"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
        /> 
        </div> ) : (
                <>
                    <ul className="banner-container">
                        <div className="banner-text">
                            <h1 className="banner-title">New Books Arrived</h1>
                            <p className="banner-desc">We have more than 100 books in our store most of the books are usefull for students and creative heads explore here</p>
                            <Link to="/book" className="explore-more"><button className="button-explore">Explore More</button></Link>
                        </div>
                        <Slider {...settings} className="carousel-container" >
                            {selectedBooks.map((book) => {
                                console.log(book)
                                return (
                                    <li key={book.isbn13} className="slide-item">
                                        <img src={book.image} alt={book.title} />
                                    </li>
                                )
                            }
                            )}
                        </Slider>
                    </ul>
                    <div className="newbooks-container">
                        <h1 >Newly Released Books</h1>
                        <ul className="card-container">
                            {bannerData.books.map((book) => (
                                <li key={book.isbn13} className="card-list-item" >
                                    <img className="card-image" src={book.image} alt={book.title} />
                                    <div className="newbook-card-details">
                                        <h1 className="card-title">{book.title}</h1>
                                        <p className="card-price">₹{book.price}</p>
                                        <button className="card-button" type="button">Order Now</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>)}
        </div>
    )
}

export default Home