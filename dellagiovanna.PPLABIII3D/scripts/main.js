import { updateList, generarAnuncio, saveAnuncio} from "./Anuncios.js";

export let listaVehiculos;
let divTabla;
let nextID;

window.addEventListener("load", InicializarManejadores);

function InicializarManejadores() {
  localStorage.clear('vehiculos');
  listaVehiculos = getVehicles();
  sleep(listaVehiculos,updateList);

  divTabla = document.getElementById("divTabla");

  btnSave();

  // updateList(listaVehiculos);
}

function btnSave() {
  const formAnuncio = document.forms[0];
  const BtnForm = document.getElementById("btnGuardar");
  BtnForm.addEventListener("click", (e) => {
    e.preventDefault();
    const newAnuncio = generarAnuncio(formAnuncio);
    sleep(newAnuncio, saveAnuncio);
  });
}

export function getVehicles() {
  //si Json.parse() devulve null entonces me trae un array vacio
  return JSON.parse(localStorage.getItem("vehiculos")) || [];
}





/* function saveAnuncio(newAnuncio) {
  if (newAnuncio) {
    listaVehiculos.push(newAnuncio);
    saveData(listaVehiculos);
    updateList(listaVehiculos, divTabla);
  }
}


function generarAnuncio(frm) {
  nextID = getId();
  const anuncio = new Anuncio_Auto(
    nextID,
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
} */

function sleep(item, func) {
  const div = document.getElementById("spinnerContainer");
  const img = document.createElement("img");
  img.src = "./images/wheelspinner.svg";
  const lbl = document.createElement("label");
  lbl.appendChild(document.createTextNode("Loading.."));
  img.className = "spinner";
  div.appendChild(img);
  div.appendChild(lbl);
  setTimeout(() => {
    while (div.hasChildNodes()) {
      div.removeChild(div.firstChild);
    }
    if(item)func(item);
    else func();
  }, 1000);
}
