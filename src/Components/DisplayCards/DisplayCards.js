
import React, { useEffect, useState } from "react";
import SortComponents from "../SortComponents/SortComponents";


// Fetching data and displaying of cards in Pagination
const DisplayCards = () => {
  const [details, setDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchWord, setSearchWord] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, [currentPage, searchWord, selectedDateRange, selectedType]);


  const fetchData = async () => {
    try {
      setError("");
  
      const searchParam = searchWord ? `search=${searchWord}` : "";
      const url = `https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats?${searchParam}`;
  
      const response = await fetch(url);
  
      let data = await response.json();
  
      // Converting timestamps to readable dates
      data = data.map((card) => ({
        ...card,
        date: new Date(card.date * 1000).toLocaleDateString('en-GB', { year: 'numeric', month: 'numeric', day: 'numeric' }),
      }));
  
      // Applying date filtering
      if (selectedDateRange) {
        const [startYear, endYear] = selectedDateRange.split('-');
        data = data.filter((card) => {
          const year = new Date(card.date).getFullYear();
          return year >= parseInt(startYear) && year <= parseInt(endYear);
        });
      }
  
      // Applying type filtering
      if (selectedType) {
        data = data.filter((card) => card.type === selectedType || card.tag.includes(selectedType));
      }
  
      // Sorting the data by date in ascending order
      data.sort((a, b) => new Date(a.date) - new Date(b.date));
  
      // Creating pagination
      const itemsPerPage = 3;
      const startIndex = (currentPage - 1) * itemsPerPage;
      const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);
  
      // Checking if no data is found
      if (paginatedData.length === 0) {
        setDetails([]);
        return;
      }
  
      setDetails(paginatedData);
    } catch (err) {
      setError("");
      console.error(err);
      setDetails([]);
    }
  };
  

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="cards-container">
      <SortComponents 
        setSearchWord={setSearchWord} 
        setSelectedDateRange={setSelectedDateRange} 
        setSelectedType={setSelectedType} 
      />
      {error && <div className="error">{error}</div>}
      {details.length > 0 ? (
        <>
          <div className="cards">
            {details.map((card) => (
              <div className="card" key={card.id}>
                <img className="card-img" src={card.image} alt={card.title} />
                <div className="details">
                  <h1>{card.title}</h1>
                  <p>{card.description}</p>
                  <p>Date: {card.date}</p>
                  <p>Location: {card.location}</p>
                  <p>Price: ₹{card.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="buttons-container">
            <button className="buttons" onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</button>
            <button className="buttons" onClick={goToNextPage}>Next</button>
          </div>
        </>
      ) : (
        <div className="empty-message">
          <h1>No Data Found</h1>
        </div>
      )}
    </div>
  );
};

export default DisplayCards;
