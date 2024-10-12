"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const [name, setName] = useState(null);
  const [letter, setLetter] = useState(null);
  const [monto, setMonto] = useState(null);
  const [concepto, setConcepto] = useState(null);
  const [fecha, setFecha] = useState(null);

  useEffect(() => {
    setName(searchParams.get("name"));
    setLetter(searchParams.get("letter"));
    setMonto(searchParams.get("monto"));
    setConcepto(searchParams.get("concepto"));
    setFecha(searchParams.get("fecha"));
  }, [searchParams]);

  return (
    <main className="h-100vh-8rem flex justify-center items-center">
      <section className=" w-[90vw] bg-gray-100 py-8 rounded-lg">
        <h2 className="font-semibold text-2xl text-center">
          Realizado con exito
        </h2>

        {/* Nombre del destinatario */}
        <p className="font-light text-blue-500 text-center mt-4">Para {name}</p>

        {/* Letra de identificacion del destinatario*/}
        <div className=" flex items-center justify-center w-full mt-6">
          <p className="bg-indigo-400 text-gray-200 w-12 h-12 rounded-full flex items-center justify-center">
            {letter}
          </p>
        </div>

        {/* Monto */}
        <div className="text-center font-semibold text-6xl mt-16">
          <p>${monto}</p>
        </div>

        {/* Concepto */}
        <div className="text-center mt-16">
          <p>
            <span className="font-semibold">Concepto: </span>
            {concepto}
          </p>
        </div>

        {/* Fecha */}
        <div className="text-center mt-4 font-light">
          <p>{fecha}</p>
        </div>

        {/* Boton para confirmar */}
        <div className="text-center mt-12">
          <Link
            className="border-2 border-blue-500 text-blue-500 px-8 py-1 rounded-lg "
            href={"/"}>
            Continuar
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Page;
