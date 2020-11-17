import { Anuncio_Auto } from "./Anuncios.js";
import crearTabla from "./tabla.js";

window.addEventListener("load", InicializarManejadores);

const divTabla = document.getElementById("divTabla");
const BtnForm = document.getElementById("btnGuardar");
const BtnUpdate = document.getElementById("btnUpdate");
// const BtnBorrar = document.getElementById("btnBorrar");
const BtnBorrarID = document.getElementById("btnBorrarPorID");
const BtnFilter = document.getElementById("txtFilter");

let listaVehiculos;
let nextID;

/* ---- Inicializador ---- */
async function InicializarManejadores() {
  listaVehiculos = await getAnuncios();
  nextID = maxID() + 1;
  sleep(updateList); //spinner y update

  btnSave();
  // btnBorrar();
  btnBorrarAnuncioPorID();
  btnUpdateAnuncioPorID();
  myFilterFunc();
  checkBoxFilter();
}

/* ---------- Funciones de Buttons ----------- */

//Boton que se encarga de guardar el Anuncio
function btnSave() {
  const formAnuncio = document.forms[0];

  BtnForm.addEventListener("click", (e) => {
    e.preventDefault();
    const newAnuncio = generarAnuncio(formAnuncio);
    saveAnuncio(newAnuncio);
    sleep(updateList);
  });
}

//Boton que se encarga de borrar todos los Anuncios y resetear el ID
/* function btnBorrar() {
  BtnBorrar.addEventListener("click", (e) => {
    e.preventDefault();
    borrarAnuncios();
  });
} */

//Boton que se encarga de borrar el Anuncio por id
function btnBorrarAnuncioPorID() {
  BtnBorrarID.addEventListener("click", (e) => {
    e.preventDefault();
    borrarAnuncioPorID();
  });
}

//Boton que se encarga de Updatear el Anuncio
function btnUpdateAnuncioPorID() {
  const formAnuncio = document.forms[0];
  BtnUpdate.addEventListener("click", (e) => {
    e.preventDefault();
    updatearAnuncio(formAnuncio);
  });
}

/* ------------------ Funciones Get - Save LocalStorage --------------- */

function maxID() {
  const maxId = listaVehiculos.reduce(
    (max, listaVehiculo) => (listaVehiculo.id > max ? listaVehiculo.id : max),
    listaVehiculos[0].id
  );
  return maxId;
}

async function getAnuncios() {
  try {
    const res = await axios.get("http://localhost:3000/anuncios");
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

function getId() {
  return JSON.parse(localStorage.getItem("nextID")) || 1;
}

/* function saveData(anuncio) {
  localStorage.setItem("listaVehiculos", JSON.stringify(anuncio));
  localStorage.setItem("nextID", nextID++);
} */
function updateList() {
  while (divTabla.firstChild) {
    //Este codigo elimina todos los child dentro del Div para recrearlos de 0
    divTabla.removeChild(divTabla.firstChild);
  }
  // listaVehiculos = [];
  // listaVehiculos = await getAnuncios();
  divTabla.appendChild(crearTabla(listaVehiculos));
}

/* ----------------- Funciones Anuncio ------------------------ */

//Genera un anuncio a partir de los datos del Form y lo retorna
function generarAnuncio(frm) {
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
  nextID++;
  return anuncio;
}

//Updatea un anuncio a partir de los datos del Form y el ID pasado por prompt y lo guarda
async function updatearAnuncio(frm) {
  const idAnuncio = prompt('Introduzca ID del Anuncio');
  const index = listaVehiculos.findIndex((a) => a.id == idAnuncio);
  if (index) {

    const anuncio = {
      id: idAnuncio,
      titulo: frm.txtTitulo.value,
      transaccion: frm.rdo.value,
      descripcion: frm.txtDescripcion.value,
      precio: frm.txtPrecio.value,
      puertas: frm.txtPuertas.value,
      kms: frm.txtKMS.value,
      potencia: frm.txtPotencia.value
    };

    listaVehiculos[index] = anuncio;
    /*  nextID--;
     saveData(listaVehiculos); */
    sleep(updateList);
  }
  else {
    alert('No existe el Anuncio')
  }
}

//Guarda un nuevo Anuncio en el array y en el localStorage
async function saveAnuncio(newAnuncio) {
  if (newAnuncio) {
    const config = {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=utf-8"
      },
      data: JSON.stringify(newAnuncio)
    }

    try {
      const res = await axios("http://localhost:3000/anuncios", config)
      listaVehiculos.push(newAnuncio);
      console.log(`${res.status} Se agrego el anuncio correctamente`)
    } catch (error) {
      console.error(error)
    }
  }
}

//Borra todos los anuncios e ID
/* async function borrarAnuncios() {
  const config= {
    method: "DELETE",
    headers: {
      "content-type": "application/json;charset=utf-8"
    }
  }

  try {
    const res = await axios(`http://localhost:3000/anuncios/all`, config);
    console.log(`Se borro apropiadamente el anuncio con status: ${res.status}`)
    nextID = 1;
    listaVehiculos = [];
    sleep(updateList);
  } catch (error) {
    console.error(error);
  }
} */

//Borra el anuncio segun el ID pasado por prompt
async function borrarAnuncioPorID() {
  let idAnuncio = prompt("Indique ID del anuncio a borrar");
  if (idAnuncio) {
    const config = {
      method: "DELETE",
      headers: {
        "content-type": "application/json;charset=utf-8"
      }
    }

    try {
      const res = await axios(`http://localhost:3000/anuncios/${idAnuncio}`, config);
      console.log(`Se borro apropiadamente el anuncio con status: ${res.status}`)
      nextID--;
      listaVehiculos = listaVehiculos.filter((anuncio) => anuncio.id != idAnuncio);
      sleep(updateList);
    } catch (error) {
      console.error(error);
    }
  }
}

/* ----------------- Spinner ---------------- */


//Spinner con 1 seg de Delay
function sleep(func) {
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
    if (func) func();
  }, 3000);
}




function myFilterFunc() {
  BtnFilter.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    filter();
  });
}


function filter() {
  // Variables
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("txtFilter");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop a traves de las filas
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

const chk = document.getElementById("fTitulo");
table = document.getElementById("myTable");

async function checkBoxFilter() {
  chk.addEventListener('change', function () {
    if (!this.checked) {
      const newList = listaVehiculos.map{}

    }

    else {

    }
  });
}