"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function SearchComponent() {
  const searchParams = useSearchParams();

  const name = searchParams.get("name");
  const letter = name.charAt(0).toUpperCase();
  const monto = searchParams.get("monto");
  const concepto = searchParams.get("concepto");
  
  const fecha = new Date().toLocaleDateString();

  const handleMontoChange = (e) => setMonto(e.target.value);

  return(
    <main className="h-100vh-8rem flex justify-center items-center">
      <section className=" w-[90vw] bg-gray-100 py-6 rounded-lg">
        <h2 className="font-semibold mx-6">Ingresa el monto a transferir</h2>

        <div className="flex items-center  space-x-4 mt-6 mx-6">
          {/* Letra de identificacion del destinatario*/}
          <p className="bg-indigo-400 text-gray-200 w-12 h-12 rounded-full flex items-center justify-center">
            {letter}
          </p>

          {/* Nombre del destinatario */}
          <p className="font-light ">Para {name}</p>
        </div>

        <div className="text-center font-semibold text-6xl mt-20 mx-6 flex items-center justify-center">
          <p>$ </p>
          <input
            className="w-full bg-gray-100  text-center"
            type="number"
            value={monto}
            onChange={handleMontoChange}
          />
        </div>

        {/* Boton para confirmar */}
        <div className="text-center mt-20">
          <Link
            className=" bg-blue-500 text-gray-100 px-8 py-1 rounded-lg "
            href={{
              pathname: "./realizado",
              query: {
                name: name,
                letter: letter,
                monto: monto,
                concepto: concepto,
                fecha: fecha,
              },
            }}>
            Continuar
          </Link>
        </div>
      </section>
  </main>  
  );
}

export default function (){

  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <SearchComponent />
    </Suspense>
  );
};
