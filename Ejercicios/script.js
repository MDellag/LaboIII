var mail;
var pass;

var array = {};


//Json Object
function btnPress() {
  mail = document.getElementById("mailID").value;
  pass = document.getElementById("passID").value;

  array = {
    mail: mail,
    password: pass,
  };

  console.log(array);

  console.log(array.mail);
  console.log(array.password)
}
