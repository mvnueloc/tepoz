"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";

// Constants
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY;
const MODEL_NAME = "gemini-1.5-flash";
const INITIAL_CONFIG = "Eres un asistente, se muy breve y directo";

// Utility Functions
const createGenAI = () => new GoogleGenerativeAI(API_KEY);
const getModel = (genAI) => genAI.getGenerativeModel({ model: MODEL_NAME });

// Icons
const MicrophoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 48 48">
    <g
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="4">
      <rect
        width="14"
        height="27"
        x="17"
        y="4"
        rx="7"
      />
      <path
        strokeLinecap="round"
        d="M9 23c0 8.284 6.716 15 15 15s15-6.716 15-15M24 38v6"
      />
    </g>
  </svg>
);

const SendIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18.07 8.51001L9.51002 4.23001C3.76002 1.35001 1.40002 3.71001 4.28002 9.46001L5.15002 11.2C5.40002 11.71 5.40002 12.3 5.15002 12.81L4.28002 14.54C1.40002 20.29 3.75002 22.65 9.51002 19.77L18.07 15.49C21.91 13.57 21.91 10.43 18.07 8.51001ZM14.84 12.75H9.44002C9.03002 12.75 8.69002 12.41 8.69002 12C8.69002 11.59 9.03002 11.25 9.44002 11.25H14.84C15.25 11.25 15.59 11.59 15.59 12C15.59 12.41 15.25 12.75 14.84 12.75Z"
      fill="#E70F2B"
    />
  </svg>
);

const StopIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 16 16">
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M4.5 1.5a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3z"
      clipRule="evenodd"
    />
  </svg>
);

const escuchandoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 50">
    <rect
      x="0"
      y="22"
      width="10"
      height="6"
      fill="#25D366">
      <animate
        attributeName="height"
        values="6;20;6"
        dur="1s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="y"
        values="22;15;22"
        dur="1s"
        repeatCount="indefinite"
      />
    </rect>
    <rect
      x="15"
      y="18"
      width="10"
      height="14"
      fill="#25D366">
      <animate
        attributeName="height"
        values="14;30;14"
        dur="1.2s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="y"
        values="18;10;18"
        dur="1.2s"
        repeatCount="indefinite"
      />
    </rect>
    <rect
      x="30"
      y="15"
      width="10"
      height="20"
      fill="#25D366">
      <animate
        attributeName="height"
        values="20;40;20"
        dur="0.8s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="y"
        values="15;5;15"
        dur="0.8s"
        repeatCount="indefinite"
      />
    </rect>
    <rect
      x="45"
      y="18"
      width="10"
      height="14"
      fill="#25D366">
      <animate
        attributeName="height"
        values="14;30;14"
        dur="1.1s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="y"
        values="18;10;18"
        dur="1.1s"
        repeatCount="indefinite"
      />
    </rect>
    <rect
      x="60"
      y="22"
      width="10"
      height="6"
      fill="#25D366">
      <animate
        attributeName="height"
        values="6;20;6"
        dur="0.9s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="y"
        values="22;15;22"
        dur="0.9s"
        repeatCount="indefinite"
      />
    </rect>
  </svg>
);

// Main Component
const Chat = () => {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [recording, setRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakMessage = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "es-ES"; // Establece el idioma a español
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    } else {
      console.error("La síntesis de voz no está soportada en este navegador.");
    }
  };

  useEffect(() => {
    const initializeChat = async () => {
      const genAI = createGenAI();
      const model = getModel(genAI);
      const newChat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: INITIAL_CONFIG }],
          },
        ],
      });
      setChat(newChat);
    };

    initializeChat();
  }, []);

  const sendMessage = useCallback(
    async (message) => {
      if (!chat) return;

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", text: message },
      ]);

      try {
        const result = await chat.sendMessage(message);
        const responseText = await result.response.text();
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "model", text: responseText },
        ]);
        speakMessage(responseText);
      } catch (error) {
        console.error("Error sending message:", error);
        // Handle error (e.g., show error message to user)
      }
    },
    [chat]
  );

  // <-- Mandar por texto -->

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  // <-- Mandar por voz -->

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
      // alert(`Transcripción: ${data.text}`);
      sendMessage(data.text);
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

  return (
    <div className="bg-gray-50 w-[90vw] h-[80vh] mx-auto flex flex-col border rounded-lg shadow-lg">
      <div className="p-4 bg-gray-50 border-b font-semibold text-md">
        <div className="flex space-x-1 items-center justify-between w-full">
          <div className="inline-flex items-center">
            <div>
              Habla con tu{" "}
              <div className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-quaternary inline-flex items-center gap-1">
                Asistente Financiero
                <svg
                  className="text-quaternary"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="m19 1l-1.26 2.75L15 5l2.74 1.26L19 9l1.25-2.74L23 5l-2.75-1.25M9 4L6.5 9.5L1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5M19 15l-1.26 2.74L15 19l2.74 1.25L19 23l1.25-2.75L23 19l-2.75-1.26"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex-grow pb-0">
        <div className="absolute inset-0 p-4 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {messages.map((msg, index) => (
            <MessageBubble
              key={index}
              message={msg}
            />
          ))}
        </div>
      </div>
      <div className="p-4 border-t bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="flex items-center space-x-2">
          {!recording ? (
            <input
              className="w-full py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 px-4"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu pregunta..."
            />
          ) : (
            <p className="w-full py-2  px-4">Escuchando ...</p>
          )}
          <button onClick={handleBotonEscuchar}>
            {!recording ? <MicrophoneIcon /> : <StopIcon />}
          </button>
          <button
            className="p-2 text-white rounded-full hover:bg-neutral-900 transition-colors duration-600 hover:scale-110 flex items-center justify-center"
            type="submit">
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

const MessageBubble = ({ message }) => {
  const { role, text } = message;
  const isUser = role === "user";

  return (
    <div
      className={`flex items-start space-x-3 mb-4 ${
        isUser ? "justify-end" : "justify-start"
      }`}>
      {!isUser && (
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-gray-500 ${
            isUser ? "bg-neutral-300" : "bg-neutral-200"
          }`}>
          {isUser ? "U" : "🤖"}
        </div>
      )}
      <div
        className={`max-w-[70%] p-3 rounded-lg ${
          isUser ? "bg-neutral-700 text-gray-50" : "bg-gray-100 text-gray-900"
        }`}>
        <div className="text-sm">
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      </div>
      {isUser && (
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-gray-500 ${
            isUser ? "bg-neutral-300" : "bg-neutral-200"
          }`}>
          {isUser ? "U" : "🤖"}
        </div>
      )}
    </div>
  );
};

export default Chat;
