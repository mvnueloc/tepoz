"use client";
import React, { useState } from "react";
import Movimiento_Item from "./Movimiento_Item";

export const Ultimos_Movimientos = ({movimientos,colores_categoria=new Map()}) => {
  const [categorias, setcategorias] = useState([]);

  return (
    <div className="w-full pb-5">
      <h4>Ultimos movimientos</h4>

      <div className='' >
        {/* Mapear los movimientos */}
          {movimientos.map((movimiento, index) => (
            movimiento.titulo !== "Negro" && movimiento.titulo !== "negro"  &&
            <div key={index}>
              <Movimiento_Item 
                titulo={movimiento.descripcion} 
                categoria={movimiento.categoria}
                tipo={movimiento.tipo} 
                valor={ movimiento.monto }
                color={colores_categoria.get(movimiento.categoria)}
              />
              <hr className='border-t-1 border-gray-300 mt-1' />
            </div>
          ))}
         {/* <Movimiento_Item titulo={"Transferencia"} tipo={"transferencia"} valor={1200} />
         <hr className='border-t-1 border-gray-300 mt-1' /> */ }
      </div>
    </div>
  );
};
