import React from "react";
import Link from "next/link";

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
        <Link href={"/"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M17.51 3.87L15.73 2.1L5.84 12l9.9 9.9l1.77-1.77L9.38 12z"
            />
          </svg>
        </Link>
        <button>Asistente</button>
      </div>
    </header>
  );
};

export default Header;
