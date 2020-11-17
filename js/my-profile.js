//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    document.getElementById("guardarPerfil").addEventListener("click", function() {
            let name = document.getElementById("nombre").value;
            let lastName = document.getElementById("apellido").value;
            let age = document.getElementById("edad").value;
            let email = document.getElementById("mail").value;
            let tel = document.getElementById("tel").value;
            let cel = document.getElementById("cel").value;

            let datosPerfil = {
                nombre: name,
                apellido: lastName,
                edad: age,
                mail: email,
                telefono: tel,
                celular: cel
            }
            var perfilJSON = JSON.stringify(datosPerfil);
            localStorage.setItem("datosDePerfil", perfilJSON);
        })
});

document.addEventListener("DOMContentLoaded", function(e) {

    /* insertar en el html los datos del perfil guardados anteriormente*/
    let perfil = JSON.parse(localStorage.getItem("datosDePerfil"));

    if (perfil != undefined) {
        document.getElementById("nombreSaved").innerHTML = perfil.nombre;
        document.getElementById("apellidoSaved").innerHTML = perfil.apellido;
        document.getElementById("edadSaved").innerHTML = perfil.edad;
        document.getElementById("emailSaved").innerHTML = perfil.mail;
        document.getElementById("telSaved").innerHTML = perfil.telefono;
        document.getElementById("celSaved").innerHTML = perfil.celular;
    }
});