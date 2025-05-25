import React from "react";

const CharacterCard = ({ character, onClick }) => {
  return (
    <div
      onClick={() => onClick(character)}
      className="cursor-pointer bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-blue-500 rounded-xl p-4 transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
    >
      <h2 className="font-bold text-lg">{character.name}</h2>
    </div>
  );
};

export default CharacterCard;