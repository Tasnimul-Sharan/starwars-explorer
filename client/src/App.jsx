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

  // useEffect(() => {
  //   async function loadData() {
  //     const data = await getCharacters(page, search);

  //     // Optional: filter locally if API returns broad results
  //     const filteredResults = data.results.filter((char) =>
  //       char.name.toLowerCase().includes(search.toLowerCase())
  //     );

  //     setCharacters(filteredResults);

  //     const total = search ? filteredResults.length : data.total_records || 60;
  //     setTotalPages(Math.ceil(total / 10));
  //   }

  //   loadData();
  // }, [page, search]);

  useEffect(() => {
  async function loadData() {
    const data = await getCharacters(page, search);

    // Backend already handles filtering
    setCharacters(data.results || []);

   const total = data.total_records || (search ? characters.length : 60);


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
      )} */}
      {/* {selectedCharacter && (
  <div
    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
    onClick={() => setSelectedCharacter(null)}
  >
    <div
      className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >

      <button
        onClick={() => setSelectedCharacter(null)}
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold transition-colors"
        aria-label="Close"
      >
        &times;
      </button>


      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        {selectedCharacter.properties.name}
      </h2>


      <div className="space-y-3 text-[15px] text-gray-700 max-h-[60vh] overflow-y-auto pr-1">
        {Object.entries(selectedCharacter.properties).map(([key, value]) => {
          if (key === "name" || key === "url") return null;

          if (key === "homeworld") {
            return (
              <p key={key}>
                <span className="font-semibold text-gray-600">Homeworld:</span>{" "}
                {homeworldName}
              </p>
            );
          }

          return (
            <p key={key}>
              <span className="font-semibold text-gray-600">
                {key.replace(/_/g, " ")}:
              </span>{" "}
              {value}
            </p>
          );
        })}
      </div>
    </div>
  </div>
)} */}

{selectedCharacter && (
  <div
    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
    onClick={() => setSelectedCharacter(null)}
  >
    <div
      className="bg-neutral-800 text-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >

      <button
        onClick={() => setSelectedCharacter(null)}
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold transition-colors"
        aria-label="Close"
      >
        &times;
      </button>


      <h2 className="text-3xl font-bold text-center mb-6 text-white">
        {selectedCharacter.properties.name}
      </h2>


      <div className="grid grid-cols-2 gap-y-3 text-[15px] max-h-[60vh] overflow-y-auto pr-1">
        {Object.entries(selectedCharacter.properties).map(([key, value]) => {
          if (key === "name" || key === "url") return null;

          const displayValue = key === "homeworld" ? homeworldName : value;

          return (
            <React.Fragment key={key}>
              <span className="font-semibold text-gray-300 capitalize">
                {key.replace(/_/g, " ")}:
              </span>
              <span className="text-gray-100">{displayValue}</span>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  </div>
)}



    </div>
  );
}

export default App;
