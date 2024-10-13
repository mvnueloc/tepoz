import Image from "next/image";
import microphoneIcon from "/public/Microphone.svg";
import microphoneComponent from "/public/Component-microphone.svg";
import microphonePause from "/public/Component-pause.svg";
import iconHome from "/public/Home.svg";
import iconCard from "/public/Card.svg";

import "../globals.css";

// const StopIcon = () => (
//   <svg
//     className="text-white"
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 16 16">
//     <path
//       fill="currentColor"
//       fillRule="evenodd"
//       d="M4.5 1.5a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3z"
//       clipRule="evenodd"
//     />
//   </svg>
// );

export const MicrophoneContainer = ({
  isActive,
  setIsActive,
  handleBotonEscuchar,
}) => {
  const toggleMicrophone = () => {
    setIsActive(!isActive);
    handleBotonEscuchar();
  };

  return (
    <div className="container-microphone flex items-center justify-evenly w-full h-[85px] mt-[70px]">
      <Image
        src={iconHome}
        alt="Microphone Icon"
        width={30}
        height={30}
      />
      <div
        className="mb-20 container-microphone-img  rounded-[20rem] cursor-pointer"
        onClick={toggleMicrophone}>
        {isActive ? (
          <Image
            src={microphonePause}
            alt="Microphone Icon"
            width={100}
            height={100}
            className="m-3"
          />
        ) : (
          <Image
            src={microphoneComponent}
            alt="Microphone Icon"
            width={100}
            height={100}
            className="m-3"
          />
        )}
      </div>
      <Image
        src={iconCard}
        alt="Microphone Icon"
        width={30}
        height={30}
      />
    </div>
  );
};
