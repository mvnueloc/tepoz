"use client";
import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const TransferenciaContent = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const letter = searchParams.get("letter");
  const monto = searchParams.get("monto");
  const concepto = searchParams.get("concepto");
  const fecha = searchParams.get("fecha");

  return (
    <section className="w-[90vw] bg-gray-100 py-8 rounded-lg">
      <h2 className="font-semibold text-2xl text-center">
        Realizado con éxito
      </h2>
      <p className="font-light text-blue-500 text-center mt-4">Para {name}</p>
      <div className="flex items-center justify-center w-full mt-6">
        <p className="bg-indigo-400 text-gray-200 w-12 h-12 rounded-full flex items-center justify-center">
          {letter}
        </p>
      </div>
      <div className="text-center font-semibold text-6xl mt-16">
        <p>${monto}</p>
      </div>
      <div className="text-center mt-16">
        <p>
          <span className="font-semibold">Concepto: </span>
          {concepto}
        </p>
      </div>
      <div className="text-center mt-4 font-light">
        <p>{fecha}</p>
      </div>
      <div className="text-center mt-12">
        <Link
          className="border-2 border-blue-500 text-blue-500 px-8 py-1 rounded-lg"
          href={"/"}>
          Continuar
        </Link>
      </div>
    </section>
  );
};

const Page = () => {
  return (
    <main className="h-100vh-8rem flex justify-center items-center">
      <Suspense fallback={<div>Cargando...</div>}>
        <TransferenciaContent />
      </Suspense>
    </main>
  );
};

export default Page;
