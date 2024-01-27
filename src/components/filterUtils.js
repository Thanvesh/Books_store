

const filterData = (booksData, searchValue, priceRange) => {
    return searchValue
      ? booksData.books.filter((item) => {
          const itemTitle = item.title ? item.title.toLowerCase() : "";
          const itemPrice = parseFloat(item.price.replace(/[^\d.]/g, ''));
          return (
            itemTitle.includes(searchValue.toLowerCase()) &&
            itemPrice >= priceRange[0] &&
            itemPrice <= priceRange[1]
          );
        })
      : booksData.books.filter((item) => {
          const itemPrice = parseFloat(item.price.replace(/[^\d.]/g, ''));
          return itemPrice >= priceRange[0] && itemPrice <= priceRange[1];
        });
  };
  
  export default filterData;