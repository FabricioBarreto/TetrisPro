https://prod.liveshare.vsengsaas.visualstudio.com/join?260FCCEF1BCB3DED65FD1F2787E51238A950



type Venta = {
  producto: string;
  categoria: "libros" | "tecnologia";
  importe: number;
  pagada: boolean;
};

const ventas: Venta[] = [
  { producto: "Libro TypeScript", categoria: "libros", importe: 25000, pagada: true },
  { producto: "Mouse", categoria: "tecnologia", importe: 18000, pagada: true },
  { producto: "Teclado", categoria: "tecnologia", importe: 45000, pagada: false },
  { producto: "Libro Clean Code", categoria: "libros", importe: 32000, pagada: true },
  { producto: "Monitor", categoria: "tecnologia", importe: 150000, pagada: true },
  { producto: "Auriculares", categoria: "tecnologia", importe: 28000, pagada: false }
];


//Implementar las funciones solicitadas
//Filtrado y transformación
//Obtener todas las ventas pagadas utilizando filter().
//Obtener un arreglo que contenga únicamente los importes de las ventas pagadas utilizando map().
//Listar los nombres de los productos de tecnología que fueron pagados.
//Reducción y agregación
//Calcular la facturación total de las ventas pagadas utilizando reduce().
//Contar cuántas ventas están pendientes de pago utilizando filter().
//Calcular el importe total pendiente de cobro utilizando filter() y reduce().
