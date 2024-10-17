import React, { useState } from 'react';
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types'
import AirportSearchBar from './AirportSearchBar';

const SearchBar = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const originAirportCode = AirportSearchBar.location


  // Function to handle input changes
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setErrorMessage('');
  };

  //validate the search
  const isValidSearchTerm = (term) => {
    const regex = /^[a-zA-Z0-9\s]*$/;
    return regex.test(term);
  };

  // Function to handle the search request
  const handleSearch = async (e) => {
        
    // check input using isValidSearchTerm
    if(!isValidSearchTerm(searchTerm)){
      setErrorMessage('Search term contails illegal characters');
      setSearchTerm('');
      return;
    }

    // API call
    axios.defaults.baseURL= 'http://ec2-52-204-31-136.compute-1.amazonaws.com';
    try {    
      const response = await axios.post('/result', {
        originAirportCode,  
        keyword: searchTerm  // Sending keyword
      });
  
      onSearchResults(response.data);  // Update with the data
      console.log(response);  // Log the response for debugging
    } catch (error) {
      console.error('Error fetching search results:', error);  // Log errors if they occur
    }
  };
      
        /*
      const response = await fetch('/result', { // proxy not working
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originAirportCode, keyword: searchTerm }),  // Sending keyword in JSON
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();  // Parse the JSON response
  
     
      onSearchResults(data);  // Update the search results state
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
    
  };*/


  const handleKeyPress = (e) => {
    if (e.key == 'Enter'){
        handleSearch();
    }
  }
  const handleClearSearch = () => {
    setSearchTerm('');  // Clear the search input
    setErrorMessage('');
  };


  return (
    <div className="search-bar-container">
      <TextField
        className="search-input"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleInputChange}
        onKeyUpCapture={handleKeyPress}
        placeholder="Search..."
        Input={{
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <IconButton onClick={handleClearSearch}>
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button  onClick={handleSearch}>
      <div className='search-button'>    
            search
            </div>    
        
      </Button>
      {errorMessage && (
        <div className='error-message'>{errorMessage}</div> // display Error Message
      )}
    </div>
  );


};

SearchBar.propTypes = {
  onSearchResult: PropTypes.func.isRequired,
};

export default SearchBar;




      