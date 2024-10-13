import Image from "next/image";
import microphoneIcon from "/public/Microphone.svg";
import microphoneComponent from "/public/Component-microphone.svg";
import iconHome from "/public/Home.svg";
import iconCard from "/public/Card.svg";

import "../globals.css";

export const MicrophoneContainer = () => {
  return (
    <div className="container-microphone flex items-center justify-evenly w-full h-[85px] mt-[70px]">
      <Image src={iconHome} alt="Microphone Icon" width={30} height={30} />
      <div className="mb-20 container-microphone-img  rounded-[20rem]">
        <Image
          src={microphoneComponent}
          alt="Microphone Icon"
          width={100}
          height={100}
          className="m-3"
        />
      </div>
      <Image src={iconCard} alt="Microphone Icon" width={30} height={30} />
    </div>
  );
};
