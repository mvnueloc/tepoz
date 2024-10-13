import Image from "next/image";
import iconSenal from "/public/Union-senal.svg";
import debitCard from "/public/Card6.png";
import creditCard from "/public/Card7.png";
import logoVisa from "/public/logo-visa.svg";

const dataCard = [
  {
    logoCard: logoVisa,
    typeCard: creditCard,
  },
  {
    logoCard: logoVisa,
    typeCard: debitCard,
  }
];

export const CardBank = ({ saldo, description }) => {
  return (
    <div className="mt-11">
      <div className="max-w-full rounded overflow-hidden shadow-lg bg-white ml-4 mr-4 relative">
      <div className="px-6 py-4">
        <p>Saldo</p>
        <div className="font-bold text-xl mb-2 text-gray-900">${saldo}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>

      
      <div className=" pb-4 whitespace-nowrap">
        <div className="flex flex-row">
          {dataCard.map((card, index) => (
            <div
              key={index}
              className="relative flex justify-center m-2 w-[45%] max-w-xs"
            >
              <Image
                src={card.logoCard}
                alt="Logo Visa"
                className="creditCard absolute top-5 left-6"
              />
              <Image
                src={iconSenal}
                alt="Icono Señal"
                className="creditCard absolute top-5 right-7"
              />
              <Image
                src={card.typeCard}
                alt="Avatar de Andres Rivas"
                className="creditCard"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};
