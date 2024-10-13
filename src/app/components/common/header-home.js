import React from "react";

const Header = ({ name }) => {
  return (
    <header className="bg-primary w-full pb-4">
      <div className="flex justify-center">
        <img
          className="w-32 mt-3"
          src="/banorte-logo.png"
          alt="logo del banco banorte"
        />
      </div>
      <h1 className="text-white text-center text-sm mt-2 mb-2">Hola, {name}</h1>
    </header>
  );
};

export default Header;
