

var listaPersonas = [
    {"id":1,"first_name":"Feliza","last_name":"Corser","email":"fcorser0@google.es","gender":"Female"},
    {"id":2,"first_name":"Nial","last_name":"Barnardo","email":"nbarnardo1@wisc.edu","gender":"Male"},
    {"id":3,"first_name":"Tish","last_name":"D'Costa","email":"tdcosta2@miitbeian.gov.cn","gender":"Female"},
    {"id":4,"first_name":"Kiel","last_name":"Switsur","email":"kswitsur3@php.net","gender":"Male"},
    {"id":5,"first_name":"Ashlin","last_name":"Corderoy","email":"acorderoy4@amazonaws.com","gender":"Male"},
    {"id":6,"first_name":"Carline","last_name":"Francisco","email":"cfrancisco5@loc.gov","gender":"Female"},
    {"id":7,"first_name":"Josey","last_name":"Cowl","email":"jcowl6@ycombinator.com","gender":"Female"},
    {"id":8,"first_name":"Kip","last_name":"Serrier","email":"kserrier7@huffingtonpost.com","gender":"Male"},
    {"id":9,"first_name":"Dillie","last_name":"Finnes","email":"dfinnes8@google.com.au","gender":"Male"},
    {"id":10,"first_name":"Alain","last_name":"Daykin","email":"adaykin9@weibo.com","gender":"Male"},
    {"id":11,"first_name":"Diane-marie","last_name":"Hannond","email":"dhannonda@yale.edu","gender":"Female"},
    {"id":12,"first_name":"Korey","last_name":"Tuma","email":"ktumab@macromedia.com","gender":"Male"},
    {"id":13,"first_name":"Jae","last_name":"Hendrick","email":"jhendrickc@aol.com","gender":"Male"},
    {"id":14,"first_name":"Bronnie","last_name":"Kubyszek","email":"bkubyszekd@trellian.com","gender":"Male"},
    {"id":15,"first_name":"Janaya","last_name":"Wilber","email":"jwilbere@fastcompany.com","gender":"Female"},
    {"id":16,"first_name":"Paten","last_name":"Bradburne","email":"pbradburnef@skyrock.com","gender":"Male"},
    {"id":17,"first_name":"Bartlet","last_name":"Beelby","email":"bbeelbyg@cbslocal.com","gender":"Male"},
    {"id":18,"first_name":"Leila","last_name":"Bachelor","email":"lbachelorh@elpais.com","gender":"Female"},
    {"id":19,"first_name":"Findlay","last_name":"Puller","email":"fpulleri@hc360.com","gender":"Male"},
    {"id":20,"first_name":"Worthington","last_name":"Ivanin","email":"wivaninj@techcrunch.com","gender":"Male"}
];

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

const btnTabl = document.getElementById('btnTabl');
btnTabl.addEventListener('click', ()=>{
    const divTabla = document.getElementById('divTabla');
    divTabla.appendChild(crearTabla(listaPersonas));
});


function crearTabla(list){
    const table = document.createElement('table');

    table.appendChild(crearCabecera(list[0]));
    table.appendChild(crearCuerpo(list));

    return table;
}


function crearCabecera(item){
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');

    for (const key in item){
        const th = document.createElement('th');

        const texto = document.createTextNode(key);
        th.appendChild(texto);
        //th.textContent = key;

        tr.appendChild(th);
    }

    thead.appendChild(tr);
    return thead;
}

function crearCuerpo(list){
    const tbody = document.createElement('tbody');

    list.forEach(element => {
        const tr = document.createElement('tr');
        
        for(const key in element){
            const td = document.createElement('td');
            const texto = document.createTextNode(element[key]);
            td.appendChild(texto);
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    });

    return tbody;
}