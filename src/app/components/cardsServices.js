import Image from "next/image";
import iconBook from "/public/book.svg";
import iconMoney from "/public/money.svg";
import iconService from "/public/service.svg";
import logoVisa from "/public/logo-visa.svg";

const dataCardServices = [
  {
    iconCard: iconService,
    titleCard: "Servicios",
  },
  {
    iconCard: iconMoney,
    titleCard: "Transferencias",
  },
  {
    iconCard: iconBook,
    titleCard: "Estado de Cuenta",
  },
  {
    iconCard: iconService,
    titleCard: "Pagos",
  },
];

export const CardServices = () => {
  return (
    <div className="pt-4 pb-2 overflow-x-auto whitespace-nowrap">
      <div
        className="flex space-x-4"
        style={{ width: `${dataCardServices.length * 120}px` }}
      >
        {dataCardServices.map((card, index) => (
          <div
            key={index}
            className="w-[100px] h-[100px] flex-shrink-0 rounded-[1.5rem] overflow-hidden shadow-lg bg-white  ml-4 mt-4 mb-4 flex flex-col items-center justify-center relative"
          >
            <Image
              src={card.iconCard}
              alt="Logo Visa"
              className="creditCard mb-2"
              width={40}
              height={40}
            />
            <p className="text-gray-700 text-sm text-center truncate w-full">
              {card.titleCard}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
