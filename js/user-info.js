document.addEventListener("DOMContentLoaded", function(e){
  let getLocalStorage = window.localStorage;
  let user = JSON.parse(getLocalStorage.getItem("user-logged"));
  let htmlContentToAppend = "";
  if(name != undefined){
      htmlContentToAppend = `<div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown">
      `+user.username+`
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" id="close">Cerrar Sesión</a>
      </div>
    </div>`
      document.getElementById("userInfo").innerHTML = htmlContentToAppend;
      document.getElementById("close").addEventListener("click", function(e){
        getLocalStorage.clear();
        window.location.href = "index.html"
      });
       }
    });