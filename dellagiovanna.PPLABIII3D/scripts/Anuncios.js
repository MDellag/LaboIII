import crearTabla from "./tabla.js";

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

  listaVehiculos = Anuncio_Auto.getVehicles();

  static saveAnuncio(newAnuncio) {
    
    if (newAnuncio) {
      listaVehiculos.push(newAnuncio);
      Anuncio_Auto.saveData(listaVehiculos);
      Anuncio_Auto.updateList(listaVehiculos, divTabla);
    }
  }

  static saveData(listAnuncios) {
    localStorage.setItem("vehiculos", JSON.stringify(listAnuncios));
    localStorage.setItem("nextID", nextID++);
  }

  static getVehicles() {
    //si Json.parse() devulve null entonces me trae un array vacio
    return JSON.parse(localStorage.getItem("vehiculos")) || [];
  }

  static getId() {
    return JSON.parse(localStorage.getItem("nextID")) || 1;
  }

  static generarAnuncio(frm) {
    const nextID = Anuncio_Auto.getId();
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

  static updateList(listAnuncios) {
    while (divTabla.firstChild) {
      //Este codigo elimina todos los child dentro del Div para recrearlos de 0
      divTabla.removeChild(divTabla.firstChild);
    }
    divTabla.appendChild(crearTabla(listAnuncios));
  }
}
