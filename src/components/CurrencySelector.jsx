import React, { useState } from 'react';
import countriesAndCurrencySymbols from './countriesAndCurrencySymbols.js';

const CurrencySelector = () => {
    const [selectedCurrencySymbol, setSelectedCurrencySymbol] = useState('₦');

    const handleChange = (event) => {
    const selectedValue = event.target.value;
    const selectedCountry = countriesAndCurrencySymbols.find(
      (country) => country.symbol === selectedValue
    );

    if (selectedCountry) {
      setSelectedCurrencySymbol(selectedCountry.symbol);
    }
    };

  return (
    <div className="col-span-12 md:col-span-2 m-2">
        <p className="text-sm">Select Currency: </p>
        <div>
        <select onChange={handleChange} className="w-full text-lg p-2 border border-gray-400 rounded my-3 md:w-44 md:text-sm">
            
        {countriesAndCurrencySymbols.map((country, index) => (
            <option key={index} value={country.symbol}>
              {country.country} ({country.currency})
            </option>
          ))}
        </select>
        </div>
        <div>
        <p>Selected Currency Symbol: {selectedCurrencySymbol}</p>
        </div>
    </div>
    );
}

export default CurrencySelector