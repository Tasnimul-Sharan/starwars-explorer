import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import CharacterCard from "./components/CharacterCard";
import Pagination from "./components/Pagination";
import { getCharacterDetails, getCharacters } from "./services/api";
import "./App.css";

function App() {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [homeworldName, setHomeworldName] = useState("");

  useEffect(() => {
    async function loadData() {
      const data = await getCharacters(page, search);
      setCharacters(data.results || []);
      const total = data.total_records || 0;
      setTotalPages(Math.ceil(total / 10));
    }

    loadData();
  }, [page, search]);

  const handleSearch = () => {
    setPage(1);
  };

  const handleCardClick = async (char) => {
    const details = await getCharacterDetails(char.uid);
    setSelectedCharacter(details.result);

    const homeworldUrl = details.result.properties.homeworld;
    if (homeworldUrl) {
      try {
        const res = await fetch(homeworldUrl);
        const planetData = await res.json();
        setHomeworldName(planetData.result.properties.name || "Unknown");
      } catch (err) {
        console.error("Failed to fetch homeworld:", err);
        setHomeworldName("Unknown");
      }
    } else {
      setHomeworldName("Unknown");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-black text-white w-full py-12 md:px-12 px-6 font-sans">
      <h1 className="text-5xl font-extrabold text-center mb-10 text-blue-400 drop-shadow-lg tracking-wide">
        Star Wars Characters
      </h1>

      <div className="flex justify-end mb-10">
        <div className="flex border border-blue-600 rounded-2xl overflow-hidden shadow-lg w-full max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search characters..."
            className="bg-gray-800 text-white px-5 py-3 w-full focus:outline-none placeholder:text-gray-400"
          />
          <button
            className="bg-blue-600 px-6 flex items-center justify-center hover:bg-blue-700 transition"
            onClick={handleSearch}
            aria-label="Search"
          >
            <FaSearch />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {characters.map((char) => (
          <CharacterCard
            key={char.uid}
            character={char}
            onClick={() => handleCardClick(char)}
          />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      {selectedCharacter && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 px-4"
          onClick={() => setSelectedCharacter(null)}
        >
          <div
            className="bg-gray-900 text-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative overflow-y-auto max-h-[90vh] border border-blue-700"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="flex items-center justify-center gap-6 mb-6">
              <h2 className="text-3xl font-bold text-blue-400 text-center">
                {selectedCharacter.properties.name}
              </h2>
              <button
                onClick={() => setSelectedCharacter(null)}
                className="text-gray-400 hover:text-red-500 text-3xl font-bold transition-colors"
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            <div className="grid grid-cols-2 gap-y-3 text-sm max-h-[60vh] overflow-y-auto pr-2">
              {Object.entries(selectedCharacter.properties).map(
                ([key, value]) => {
                  if (key === "name" || key === "url") return null;
                  const displayValue =
                    key === "homeworld" ? homeworldName : value;

                  return (
                    <React.Fragment key={key}>
                      <span className="text-gray-300 capitalize font-medium">
                        {key.replace(/_/g, " ")}:
                      </span>
                      <span className="text-gray-100 break-words">
                        {displayValue}
                      </span>
                    </React.Fragment>
                  );
                }
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
