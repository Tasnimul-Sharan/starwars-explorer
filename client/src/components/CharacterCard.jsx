import React from "react";

const CharacterCard = ({ character, onClick }) => {
  return (
    <div
      className="border rounded p-4 cursor-pointer hover:shadow-lg"
      onClick={() => onClick(character)}
    >
      <h2 className="font-bold text-lg">{character.name}</h2>
    </div>
  );
};

export default CharacterCard;