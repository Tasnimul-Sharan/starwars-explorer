import React, { useState, useEffect } from "react";
import "./App.css";
import CharacterCard from "./components/CharacterCard";
import Pagination from "./components/Pagination";
import { getCharacterDetails, getCharacters } from "./services/api";

function App() {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [homeworldName, setHomeworldName] = useState("");

  // useEffect(() => {
  //   async function loadData() {
  //     const data = await getCharacters(page, search);
  //     setCharacters(data.results || []);
  //     const total = data.total_records || 60;
  //     setTotalPages(Math.ceil(total / 10));
  //   }
  //   loadData();
  // }, [page, search]);

  useEffect(() => {
    async function loadData() {
      const data = await getCharacters(page, search);

      // Optional: filter locally if API returns broad results
      const filteredResults = data.results.filter((char) =>
        char.name.toLowerCase().includes(search.toLowerCase())
      );

      setCharacters(filteredResults);

      const total = search ? filteredResults.length : data.total_records || 60;
      setTotalPages(Math.ceil(total / 10));
    }

    loadData();
  }, [page, search]);

  const handleSearch = () => {
    setPage(1);
  };

  // const handleCardClick = async (char) => {
  //   const details = await getCharacterDetails(char.uid);
  //   setSelectedCharacter(details.result);
  // };

  const handleCardClick = async (char) => {
    const details = await getCharacterDetails(char.uid);
    setSelectedCharacter(details.result);

    // Fetch the homeworld name
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
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search characters"
          className="border p-2 rounded-l"
        />
        <button
          className="bg-blue-600 text-white px-4 rounded-r"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {characters.map((char) => (
          <CharacterCard
            key={char.uid}
            character={char}
            onClick={() => handleCardClick(char)}
          />
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
      {/* {selectedCharacter && (
  <div
    className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
    onClick={() => setSelectedCharacter(null)}
  >
    <div
      className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 relative"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => setSelectedCharacter(null)}
        className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl font-bold"
      >
        &times;
      </button>

      <h2 className="text-2xl font-semibold mb-4 text-center">
        {selectedCharacter.properties.name}
      </h2>

      <div className="space-y-2 text-gray-700">
        {Object.entries(selectedCharacter.properties).map(([key, value]) => (
          key !== "name" && (
            <p key={key}>
              <strong className="capitalize">{key.replace(/_/g, " ")}:</strong> {value}
            </p>
          )
        ))}
      </div>
    </div>
  </div>
)} */}

      {selectedCharacter && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setSelectedCharacter(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCharacter(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-center">
              {selectedCharacter.properties.name}
            </h2>

            <div className="space-y-2 text-gray-700">
              {/* Render character properties */}
              {Object.entries(selectedCharacter.properties).map(
                ([key, value]) => {
                  if (key === "name" || key === "url") return null;

                  if (key === "homeworld") {
                    return (
                      <p key={key}>
                        <strong className="capitalize">Homeworld:</strong>{" "}
                        {homeworldName}
                      </p>
                    );
                  }

                  return (
                    <p key={key}>
                      <strong className="capitalize">
                        {key.replace(/_/g, " ")}:
                      </strong>{" "}
                      {value}
                    </p>
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
