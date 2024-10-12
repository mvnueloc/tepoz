import React from "react";

const Header = () => {
  return (
    <header className="h-32 bg-primary w-full rounded-b-2xl">
      <div className="flex justify-center">
        <img
          className="w-1/2 mt-6"
          src="/banorte-logo.png"
          alt="logo del banco banorte"
        />
      </div>
      <div className="flex justify-between text-gray-100 font-semibold mx-6 mt-4 pb-6">
        <button>{"<"} Regresar</button>
        <button>Asistente</button>
      </div>
    </header>
  );
};

export default Header;
