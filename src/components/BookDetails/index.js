import { useState,useEffect,useMemo } from "react"
import { useParams,Link} from 'react-router-dom';
import Loader from "../Loader";
import "./index.css"



const renderConstraints = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    fail: 'FAIL',
    loading: 'LOADING',
}

const BookDetails = () => {
    const [apiStatus, setApistatus] = useState(renderConstraints.initial)
    const [bookDetailsData, setBookDetails] = useState([])
    const [selectedOption, setSelectedOption] = useState('');
    const [isActive1, setIsActive1] = useState(false);
    const [isActive2, setIsActive2] = useState(false);

    const options = useMemo(() => Array.from({ length: 10 }, (_, index) => index + 1), []);

    const {isbn13 } = useParams();

    console.log(isbn13)
    const getBookData = async () => {
        setApistatus(renderConstraints.loading)
        try {
            const options = {
                method: 'GET',
              }
            const response = await fetch(`https://api.itbook.store/1.0/books/${isbn13}`,options);
            const data = await response.json();
            setBookDetails(data);
            setApistatus(renderConstraints.success)
        } catch (error) {
            console.error("Error Fetching Data:", error);
            setApistatus(renderConstraints.fail)
        }
    };

    useEffect(() => {

        getBookData()
    },[isbn13,])


    const handleTryAgain = () => (
        getBookData()
    )

    const handleButtonClick1 = () => {
        setIsActive1(!isActive1);
        setIsActive2(false); // Deactivate the other button
    };

    const handleButtonClick2 = () => {
        setIsActive2(!isActive2);
        setIsActive1(false); // Deactivate the other button
    };




    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const renderLoaderView = () => (
        <Loader />
    )

    const renderFailureView = () => (
        <div className="failure-container">
            <h1>Something Went Wrong </h1>
            <button type="button" className="try-again-button" onClick={handleTryAgain}>Try Again</button>
        </div>
    )



    const renderSuccessView = () => {

        const { title, authors, publisher, isbn13,  year, rating, desc, price, image,} = bookDetailsData
        const totalStars = 5;
        const filledStars = Math.round(rating); // Assuming rating is a decimal or integer
    
        // Create an array of stars based on the rating
        const stars = Array.from({ length: totalStars }, (_, index) => (
            <span key={index} className={index < filledStars ? 'star filled' : 'star'}>
                &#9733; {/* Unicode character for a filled star */}
            </span>
        ));

        return (
            <div className="main-container">
                <div>
                    <p className="heading"><Link to="/" className="text">Home</Link>/<Link to="/Books" className="text">Books</Link>/<Link className="text-book">{title}</Link></p>
                    <div className="book-image-details-container">
                        <div className="book-image-container">
                            <div className="image-container-one">
                                <img className="short-image" src={image} alt={`short${title}`} />
                            </div>
                            <div className="image-container-two">
                                <img className="large-image" src={image} alt={`large${title}`} />
                            </div>
                            
                        </div>
                        <div className="book-side-conatiner">
                            <div>
                                <h1 className="details-heading">{title}</h1>
                                <p className="details-author">{authors}</p>
                            </div>

                            <div className="price-container">
                                <p className="details-price">{price}</p>
                                <span className="price-text">(Inclusive of all taxes)</span>
                            </div>

                            <div className="quantity-selector">
                                <select value={selectedOption} onChange={handleSelectChange} className="select-option-box">
                                    {options.map((value) => (
                                        <option key={value} value={value}>
                                            {value}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="btn-container">
                                <button type="button" className={`button button1 ${isActive1 ? 'active' : ''}`} onClick={handleButtonClick1}>Add To Bag</button>
                                <button type="button" className={`button button2 ${isActive2 ? 'active' : ''}`}  onClick={handleButtonClick2}>Buy IT Now</button>
                            </div>

                            <div>
                                <h1>Description</h1>
                                <p>{desc}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-details">
                    <h1>Product Details</h1>
                    <div>
                        <p>Title:{title}</p>
                        <p>Author:{authors}</p>
                        <p>Publisher:{publisher}</p>
                        <p>Year:{year}</p>
                        <p>ISBN:{isbn13}</p>
                        <p>Reading Age: all age groups</p>
                    </div>

                </div>
                <div className="star-rating">
                    <h1>Customer Review</h1>
                    <p>{stars}</p>
                </div>


            </div>


        )


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



export default BookDetails