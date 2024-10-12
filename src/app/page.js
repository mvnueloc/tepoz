import Header from "./components/common/header";
import { CardBank } from "./components/card";
import { CardServices } from "./components/cardsServices";
import Avatar from "/public/avatar.png";
import IconCardBank from "/public/iconcardtBank.png";
import Image from "next/image";
import "./globals.css";

export default function Home() {
  return (
    <>
      <Header />
      <div className="avatar-container flex justify-between items-center p-4 max-w-full">
        <h1 className="name-avatar text-left font-semibold">
          ¡Hola, Andres Rivas!
        </h1>
        <Image
          src={Avatar}
          alt="Avatar de Andres Rivas"
          width={30}
          height={30}
          className="avatar"
        />
      </div>

      <CardBank saldo="5300.15" />
      <CardServices />

      <div className="w-[90%] flex-shrink-0 rounded-[1.2rem] overflow-hidden shadow-lg bg-white p-2 ml-4 mt-4 mb-4 flex items-center justify-evenly relative">
        <Image
          src={IconCardBank}
          alt="Logo Visa"
          className="creditCard mb- bg-black p-2 rounded-[.5rem]"
          width={30}
          height={30}
        />
        <div>
          <h3 className="font-semibold">Obten una tarjeta de credito</h3>
          <h4 className="font-thin">Hasta 20,000 pesos de credito</h4>
        </div>
      </div>
    </>
  );
}
