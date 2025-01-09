import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Home = ({ addFavorite }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [reason, setReason] = useState("");
  const [isPackageValid, setIsPackageValid] = useState(true);
  const [isReasonValid, setIsReasonValid] = useState(true);

  const navigate = useNavigate();

  const fetchPackages = async (query) => {
    if (!query) return;
    const response = await fetch(`https://api.npms.io/v2/search?q=${query}`);
    const data = await response.json();
    setSearchResults(data.results.map((pkg) => pkg.package.name));
  };

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedFetchPackages = useCallback(debounce(fetchPackages, 500), []);

  useEffect(() => {
    if (searchQuery) {
      debouncedFetchPackages(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, debouncedFetchPackages]);

  const handleSubmit = () => {
    let valid = true;

    if (!selectedPackage) {
      setIsPackageValid(false);
      valid = false;
    } else {
      setIsPackageValid(true);
    }

    if (!reason) {
      setIsReasonValid(false);
      valid = false;
    } else {
      setIsReasonValid(true);
    }

    if (!valid) {
      toast("Please fill in all required fields", { autoClose: 1000 });
      return;
    }

    const favorite = { name: selectedPackage, reason };
    addFavorite(favorite);

    setSelectedPackage("");
    setReason("");
    navigate("/favorites");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold text-center">Welcome to NPM Package App</h1>
      <div className="mt-6">
        <input
          type="text"
          className="border p-2 rounded w-full"
          placeholder="Search for NPM packages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
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
        <div className="mt-4">
          <label htmlFor="reason" className="block font-medium mb-1">
            Why is this your favorite?
          </label>
          <textarea
            id="reason"
            className={`border p-2 rounded w-full ${
              !isReasonValid ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Explain why this package is your favorite..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
