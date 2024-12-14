import React, { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Home = ({ addFavorite }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState("");
    const [reason, setReason] = useState("");

    const navigate = useNavigate();
    const ans = JSON.parse(localStorage.getItem("favorites"));
    if (ans && ans.id) {
        console.log(ans.id);
    } else {
        console.log("No favorites found or 'id' is not defined.");
    }


    const fetchPackages = async () => {
        if (!searchQuery) return;
        const response = await fetch(`https://api.npms.io/v2/search?q=${searchQuery}`);
        const data = await response.json();
        console.log(data)
        setSearchResults(data.results.map((pkg) => pkg.package.name));
    };

    useEffect(() => {
        fetchPackages()
    }, [])

    const handleSubmit = () => {
        if (!selectedPackage || !reason) {
            toast("Select Package or Add Reason", { autoClose: 1000 })
            return;
        }
        else {
            const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
            const newFavorite = { name: selectedPackage, reason: reason };
            favorites.push(newFavorite);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            toast("Added to favorites", { autoClose: 1000 });
            addFavorite(newFavorite);
            setSelectedPackage("");
            setReason("");
            navigate("/favorites");
        }
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

export default Home;
