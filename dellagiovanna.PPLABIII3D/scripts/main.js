import crearTabla from "./tabla.js";
import Anuncio_Auto from "./Anuncios.js";

let listaVehiculos;
let divTabla;
let nextID;

window.addEventListener("load", InicializarManejadores);

function InicializarManejadores() {
  listaVehiculos = getVehicles();

  divTabla = document.getElementById("divTabla");

  const formAnuncio = document.forms[0];
  const BtnForm = document.getElementById("btnGuardar");
  BtnForm.addEventListener("click", (e) => {
    e.preventDefault();
    const newAnuncio = generarAnuncio(formAnuncio);
    if (newAnuncio) {
      listaVehiculos.push(newAnuncio);
      saveData(listaVehiculos);
      updateList(listaVehiculos, divTabla);
    }
  });

  const btnMostrar = document.getElementById("btnMostrar");
  btnMostrar.addEventListener("click", (e) => {
    e.preventDefault();
    updateList(listaVehiculos);
  });
}

export function getVehicles() {
  //si Json.parse() devulve null entonces me trae un array vacio
  return JSON.parse(localStorage.getItem("vehiculos")) || [];
}

export function getId() {
  return JSON.parse(localStorage.getItem("nextID")) || 1;
}

function generarAnuncio(frm) {
  nextID = getId();
  const anuncio = new Anuncio(
    nextID,
    frm.txtTitulo.value,
    frm.rdo.value,
    frm.txtDescripcion.value,
    frm.txtPrecio.value
  );

  return anuncio;
}

function saveData(listAnuncios) {
  localStorage.setItem("vehiculos", JSON.stringify(listAnuncios));
  localStorage.setItem("nextID", nextID++);
}

function updateList(listAnuncios) {
  while (divTabla.firstChild) {
    //Este codigo elimina todos los child dentro del Div para recrearlos de 0
    divTabla.removeChild(divTabla.firstChild);
  }
  divTabla.appendChild(crearTabla(listAnuncios));
}
