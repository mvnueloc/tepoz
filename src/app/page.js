"use client";
import Header from "./components/common/header-home";
import { CardBank } from "./components/card";
import { CardServices } from "./components/cardsServices";
import { MicrophoneContainer } from "./components/microphone";
import Avatar from "/public/avatar.png";
import IconCardBank from "/public/iconcardtBank.png";
import Image from "next/image";
import "./globals.css";
import { useState, useEffect, useCallback, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [recording, setRecording] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // <-- Notificaciones -->
  useEffect(() => {
    toast.warn(
      `Modo seguro activado. Consulta a tu asistente para ver los cambios realizados.
      `,
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        theme: "light",
      }
    );
  }, []);

  // <-- Responder por voz

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Tu navegador no soporta la grabación de audio.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.start();
      setRecording(true);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        sendAudio(audioBlob);
      };
    } catch (error) {
      console.error("Error al acceder al micrófono:", error);
      alert("No se pudo acceder al micrófono.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const sendAudio = async (audioBlob) => {
    const formData = new FormData();
    formData.append("audio", audioBlob, "grabacion.wav");

    try {
      const response = await fetch("http://localhost:8080/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error en la transcripción");
      }

      const data = await response.json();

      console.log(data);
      // alert(`Transcripción: ${data.text}`);
      // sendMessage(data.text);
      setInput("");
      // console.log(data);
      // console.log(data.text.action);
    } catch (error) {
      console.error("Error al transcribir el audio:", error);
      alert("Hubo un error al transcribir el audio.");
    }
  };

  const handleBotonEscuchar = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }

    setRecording(!recording);
  };

  useEffect(() => {
    if (isActive) {
      console.log("Grabando");
    }
  }, [isActive]);

  return (
    <>
      <ToastContainer />
      <div className="w-full h-full relative flex flex-col ">
        <Header name={"Gabriela"} />

        <div className={` ${isActive ? "blur" : "clase-inactiva"}`}>
          <CardBank saldo="5300.15" />
          <CardServices />
        </div>

        <div className={`flex-grow ${isActive ? "blur" : "clase-inactiva"}`}>
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

        <MicrophoneContainer
          isActive={isActive}
          setIsActive={setIsActive}
          handleBotonEscuchar={handleBotonEscuchar}
        />
      </div>
    </>
  );
}
