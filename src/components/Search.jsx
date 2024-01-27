// SearchFilter.js
import React, { useState } from 'react';
import appwriteService from "../appwrite/config";
import { useDispatch } from 'react-redux';

import { setSearchTerm } from '../store/SearchSlice';

const SearchFilter = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const dispatch = useDispatch();

    const handleSearch = () => {
        dispatch(setSearchTerm(searchQuery));
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchFilter;
