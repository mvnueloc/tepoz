"use client";
import Header from "./components/common/header-home";
import { CardBank } from "./components/card";
import { CardServices } from "./components/cardsServices";
import { MicrophoneContainer } from "./components/microphone";
import Avatar from "/public/avatar.png";
import IconCardBank from "/public/iconcardtBank.png";
import Image from "next/image";
import "./globals.css";
import { useState, useEffect, use } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [recording, setRecording] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive) {
    }
  }, [isActive]);

  return (
    <>
      <div className="w-full h-full relative flex flex-col">
        <Header name={"Gabriela"}/>

        <CardBank saldo="5300.15" />
        <CardServices />

        <div className="flex-grow">
          <div className="w-[90%] h-16 rounded-[1.2rem] overflow-hidden shadow-lg bg-white p-2 ml-4  mb-4 flex items-center justify-evenly relative">
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
        </div>

        <MicrophoneContainer isActive={isActive} setIsActive={setIsActive} />
      </div>
    </>
  );
}
