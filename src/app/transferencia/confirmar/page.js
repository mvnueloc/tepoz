"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Obtener los valores de los parámetros de búsqueda
  const name = searchParams.get("name") || "Invitado"; // Valor predeterminado si 'name' es null
  const letter = name.charAt(0).toUpperCase();
  
  let concepto_ = searchParams.get("concepto");
  const concepto = concepto_ && concepto_ !== "undefined" ? concepto_ : "Sin concepto"; // Manejar el caso undefined
  
  let monto_ = searchParams.get("monto");
  const [monto, setMonto] = useState(monto_ || 0); // Si monto es null, se usa 0 por defecto
  
  const fecha = new Date().toLocaleDateString(); // Obtener la fecha actual

  // Puedes usar useEffect para manejar cualquier cambio en los parámetros
  useEffect(() => {
    setMonto(monto_ || 0); // Actualizar monto cuando el parámetro cambie
  }, [monto_]);

  const handleMontoChange = (e) => setMonto(e.target.value);

  const handleContinue = () => {
    router.push({
      pathname: "./realizado",
      query: {
        name: name,
        letter: letter,
        monto: monto,
        concepto: concepto,
        fecha: fecha,
      },
    });
  };

  return (
    <main className="flex-grow justify-center items-center">
      <section className=" w-full h-full bg-gray-100 py-6 rounded-lg">
        <h2 className="text-center font-semibold mx-6">Ingresa el monto a transferir</h2>

        <div className="flex flex-col items-center mt-6 space-y-2">
          {/* Letra de identificacion del destinatario*/}
          <p className="bg-indigo-400 text-gray-200 w-12 h-12 rounded-full flex items-center justify-center">
            {letter}
          </p>

          {/* Nombre del destinatario */}
          <div className="font-normal ml-0">Para: </div>
          <div className="text-center font-medium"> {name}</div>
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
          <button
            className="bg-blue-500 text-gray-100 px-8 py-1 rounded-lg"
            onClick={handleContinue}
          >
            Continuar
          </button>
        </div>
      </section>
    </main>
  );
};

export default Page;