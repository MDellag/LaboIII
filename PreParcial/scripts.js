
var listaPersonas = [];

function pushPersonToList(){
    // cada variable toma el valor asignado en el INPUT del HTML
    let perName = document.getElementById('namePers').value ;
    let perLastName = document.getElementById('apellPers').value ;
    let perDni = document.getElementById('dniPers').value ;
    let perSex = document.getElementById('sexoPers').value ;

    //Creamos un objeto JSON asignandole los valores de los INPUT
    const person = {
        "name": perName,
        "lastName": perLastName,
        "dni": perDni,
        "sex": perSex
    };

    //Lo Agregamos a la Lista 
    listaPersonas.push(person);
    //Esto es para verificar por consola que cargue apropiadamente
    console.log(listaPersonas);

    personsToTable(person);
}


function personsToTable(persona){
    let myTable = document.getElementById('tablePersons');
    
    const trElemt = document.createElement('tr');
    const tdName = document.createElement('td');
    const tdLastname = document.createElement('td');
    const tdDni = document.createElement('td');
    const tdSex = document.createElement('td');

    tdName.innerHTML = persona.name;
    tdLastname.innerHTML = persona.lastName;
    tdDni.innerHTML = persona.dni;
    tdSex.innerHTML = persona.sex;

    trElemt.appendChild(tdName);
    trElemt.appendChild(tdLastname);
    trElemt.appendChild(tdDni);
    trElemt.appendChild(tdSex);
  

    myTable.appendChild(trElemt);
    
}

