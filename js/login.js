//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  });
//Google SignIn
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    logged(profile.getName());
  }
  function renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': onSuccess,
      'onfailure': onFailure
    });
  }

  //Manual SignIn
  document.getElementById("submit").addEventListener("click", function(e){
    let user = document.getElementById("user").value;
    let password = document.getElementById("pswd").value;
    
    if(user != "" && password != ""){
      logged(user);
    }
 });


  function logged (name){
    if(name != undefined){
      let setlocalStorage = window.localStorage;
      setlocalStorage.setItem("user-logged", JSON.stringify({username:name}));
      window.location.href = "Home.html"
    }
    
  }