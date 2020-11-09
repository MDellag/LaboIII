import crearTabla from "./tabla.js";
import { listaVehiculos } from './main.js'

class Anuncio {
  constructor(id, titulo, transaccion, descripcion, precio) {
    this.id = id;
    this.titulo = titulo;
    this.transaccion = transaccion;
    this.descripcion = descripcion;
    this.precio = precio;
  }

  AltaAnuncio() {
    console.log(`Dado de alta: ${this.titulo}`);
  }
}

export class Anuncio_Auto extends Anuncio {
  constructor(
    id,
    titulo,
    transaccion,
    descripcion,
    precio,
    puertas,
    kms,
    potencia
  ) {
    super(id, titulo, transaccion, descripcion, precio);
    this.puertas = puertas;
    this.kms = kms;
    this.potencia = potencia;
  }

  
}


  // const listaVehiculos = getVehicles();
  let nextID = getId();
  

  export function updateList(listaVehiculos) {
    while (divTabla.firstChild) {
      //Este codigo elimina todos los child dentro del Div para recrearlos de 0
      divTabla.removeChild(divTabla.firstChild);
    }
    divTabla.appendChild(crearTabla(listaVehiculos));
  }

  export function generarAnuncio(frm) {
    const anuncio = new Anuncio_Auto(
      nextID + 1,
      frm.txtTitulo.value,
      frm.rdo.value,
      frm.txtDescripcion.value,
      frm.txtPrecio.value,
      frm.txtPuertas.value,
      frm.txtKMS.value,
      frm.txtPotencia.value
    );

    return anuncio;
  }

  export function saveAnuncio(newAnuncio) {
    
    if (newAnuncio) {
      listaVehiculos.push(newAnuncio);
      saveData(Anuncio_Auto.listaVehiculos);
      updateList(listaVehiculos);
    }
  }

  function saveData(listAnuncios) {
    localStorage.setItem("vehiculos", JSON.stringify(listAnuncios));
    localStorage.setItem("nextID", nextID++);
  }

   /* function getVehicles() {
    //si Json.parse() devulve null entonces me trae un array vacio
    return JSON.parse(localStorage.getItem("vehiculos")) || [];
  } */

  function getId() {
    return JSON.parse(localStorage.getItem("nextID")) || 1;
  }

  

  