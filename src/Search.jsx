import React, { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Search = ({ addFavorite }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [reason, setReason] = useState("");

  const navigate=useNavigate();

  const fetchPackages = async () => {
    if (!searchQuery) return;
    const response = await fetch(`https://api.npms.io/v2/search?q=${searchQuery}`);
    const data = await response.json();
    setSearchResults(data.results.map((pkg) => pkg.package.name));
  };

  const handleSubmit = () => {
    if (!selectedPackage || !reason) {
      toast("Add reason",{autoClose:1000})
      return;
    }
    toast("Added to favorites",{autoClose:1000})
    addFavorite({ name: selectedPackage, reason });
    setSelectedPackage("");
    setReason("");
    navigate('/favorites');
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold text-center">Search NPM Packages</h1>
      <div className="mt-6">
        <input
          type="text"
          className="border p-2 rounded w-full"
          placeholder="Search for NPM packages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
          onClick={fetchPackages}
        >
          Search
        </button>
        <ul className="mt-4 max-h-40 overflow-y-auto">
          {searchResults.map((pkg) => (
            <li key={pkg} className="p-4 border rounded-md">
              <input
                type="radio"
                name="package"
                value={pkg}
                onChange={(e) => setSelectedPackage(e.target.value)}
                checked={selectedPackage === pkg}
              />
              <span className="ml-2">{pkg}</span>
            </li>
          ))}
        </ul>
        <textarea
          className="border p-2 rounded w-full mt-4"
          placeholder="Why is this your favorite?"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <button
          className="bg-purple-500 text-white px-4 py-2 mt-2 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Search;
