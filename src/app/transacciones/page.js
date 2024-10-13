"use client";
import React, { useEffect, useState } from "react";
import Flecha from "../components/Flecha";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Ultimos_Movimientos } from "./ultimos_movimientos";

ChartJS.register(ArcElement, Tooltip, Legend);

const Months_data = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          return `${tooltipItem.label}: ${tooltipItem.raw}`;
        },
      },
    },
  },
};

export default function Analisis_Financiero_Screen() {
  const [mes_seleccionado, setmes_seleccionado] = useState(new Date().getMonth());
  const [chart_Data, setchart_Data] = useState({ labels: [], datasets: [] });
  const [Color_Categoria, setColor_Categoria] = useState(new Map());
  const [transacciones_Filtradas, settransacciones_Filtradas] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const [transacciones, setTransacciones] = useState([]);

  const handleCambiarMes = (numero) => {
    const nuevo_mes = (mes_seleccionado + numero + 12) % 12;
    setmes_seleccionado(nuevo_mes);
  };

  useEffect(() => {
    const fetchSaldo = async () => {
      try {
        const response = await fetch('https://backend-banorte-328383011109.us-central1.run.app/api/cuentas/get/clabe/122256758493847567');
        const data = await response.json();
        setSaldo(data.saldo);
      } catch (error) {
        console.log('Error al obtener el saldo', error);
      }
    };
  
    const fetchTransacciones = async () => {
      try {
        const response = await fetch('https://backend-banorte-328383011109.us-central1.run.app/api/movimientos/get/dto/usuario/5');
        const data = await response.json();
    
        const transaccionesConCategorias = data.map(e => ({
          ...e,
          categoria: e.tipo,
          monto: Math.abs(e.monto) // Use absolute value for chart
        }));
    
        setTransacciones(transaccionesConCategorias);
      } catch (error) {
        console.log('Error al obtener las transacciones', error);
      }
    };
  
    // fetchSaldo();
    // fetchTransacciones();
  }, []);

  useEffect(() => {
    const filteredTransacciones = transacciones.filter((transaccion) => {
      const fecha = new Date(transaccion.fecha);
      return fecha.getMonth() === mes_seleccionado;
    });

    settransacciones_Filtradas(filteredTransacciones);

    const Transacciones_Categoria = new Map();
    filteredTransacciones.forEach((element) => {
      const clave = element.categoria;
      if (!Transacciones_Categoria.has(clave)) {
        Transacciones_Categoria.set(clave, []);
      }
      Transacciones_Categoria.get(clave).push(element);
    });

    const uniqueLabels = Array.from(Transacciones_Categoria.keys());
    const newData = uniqueLabels.map(category => 
      Transacciones_Categoria.get(category).reduce((sum, t) => sum + t.monto, 0)
    );

    const backgroundColors = uniqueLabels.map(() => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgba(${r}, ${g}, ${b}, 1)`;
    });

    const newColorCategoria = new Map(uniqueLabels.map((label, index) => [label, backgroundColors[index]]));
    setColor_Categoria(newColorCategoria);

    setchart_Data({
      labels: uniqueLabels,
      datasets: [{
        label: "Gastos por Categoría",
        data: newData,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors.map(color => color.replace('1)', '0.5)')),
        borderWidth: 1,
      }],
    });

  }, [transacciones, mes_seleccionado]);

  return (
    <div className="overflow-x-hidden relative">
      <div className="w-full bg-gradient-to-r from-[#EB0029] to-[#B2001F] h-screen p-8 relative z-10">
        <div className="text-white flex flex-row justify-between">
          <button>
            <span className="flex flex-row items-center">
              <Flecha />
              <a className="font-semibold text-lg" href="/">
                atrás
              </a>
            </span>
          </button>
          <button className="font-bold text-2xl">Transacciones</button>
        </div>
        <div className="bg-slate-100 w-full mx-auto h-auto rounded-3xl p-5 mt-5 relative z-20">
          <div>
            <p className="font-semibold text-slate-700">Disponible</p>
            <span className="flex flex-row">
              <p className="font-medium text-[#3629B7] text-4xl">
                ${saldo.toFixed(2)}
              </p>
              <p className="self-end text-slate-500 font-medium ml-1">mxn</p>
            </span>
          </div>
          <p className="font-medium mt-5">Gastos por categoría.</p>
          <div className="justify-between flex flex-row mt-5 ">
            <button
              className="text-[#3629B7] "
              onClick={() => handleCambiarMes(-1)}>
              <Flecha />
            </button>
            <p className="text-[#3629B7] font-medium self-center text-2xl transition-transform duration-300 hover:scale-110">
              {Months_data[mes_seleccionado]}
            </p>
            <button
              className="text-[#3629B7]"
              onClick={() => handleCambiarMes(1)}>
              <Flecha invertirFlecha={true} />
            </button>
          </div>

          <div className="justify-center mt-5 transition-transform duration-300 transform hover:scale-105 hover:shadow-lg rounded-lg">
            <span className="flex flex-row mx-auto justify-center">
              <p className="font-medium text-2xl">
                ${chart_Data.datasets[0]?.data.reduce((a, b) => a + b, 0).toFixed(2) || '0.00'}
              </p>
              <p className="self-end text-slate-500 font-medium ml-1">mxn</p>
            </span>
            <div className="sm:w-5/6 h-full justify-center mx-auto mt-2 ">
              <Doughnut data={chart_Data} options={options} />
            </div>
          </div>
        </div>
        <div className=" relative w-full z-20 mt-5">
          <Ultimos_Movimientos movimientos={transacciones_Filtradas} colores_categoria={Color_Categoria} />
        </div>

        <div className="absolute top-1/3 w-full h-2/3 bg-white z-0 left-0 rounded-t-3xl "></div>
      </div>
    </div>
  );
}