var prodInfo = {};
var prodComments = {};
var prodsRel = {};
var rating = 0;

function showImagesGallery(array) {
    let imgs = "";
    for (let i = 0; i < array.length; i++) {
        let imagenes = array[i];
        imgs += `<div class="col-lg-3 col-md-4 col-6">
        <div class="d-block mb-4 h-100">
        <img  class="img-fluid img-thumbnail" src="`+ imagenes + `"alt=""> 
        </div>
        </div>`
        document.getElementById("productImagesGallery").innerHTML = imgs;
    }


}

function showRelatedProducts(array) {
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            prodsRel = resultObj.data;
            let relatedProds = "";
            for (let i = 0; i < array.length; i++) {
                let related = prodsRel[array[i]];
                relatedProds += `
                <div class= "col-lg-3 col-md-4 col-6 border">
                    <div id="relatedProdImg" class= "row">
                        <img class="img-fluid p-2" src="`+ related.imgSrc + `">                                              
                    </div>                   
                    <div "relatedProdInfo" class= "row p-2">
                    <p>`+ related.name + `</p> 
                    <p>`+ related.description + `</p>
                    </div>
                    <div class= "row p-2">
                    <a href="product-info.html">Ver</a>
                    </div>                     
                </div>`

            }

            document.getElementById("relatedProducts").innerHTML += relatedProds;
        }
    });

}

function showRating(rating) {
    let score = "";
    let stars = "";

    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += `<i class="fa fa-star checked"></i>`;
        } else {
            stars += `<i class="fa fa-star"></i>`;
        }
    }
    score = `<span> ${stars} </span>`
    return score;
}

function showComments() {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            prodComments = resultObj.data;
            let comments = "";
            for (let i = 0; i < prodComments.length; i++){
                let comentario = prodComments[i];
                comments += `  
                <div class="row">
                
                <div class="w-100 justify-content-between list-group-item list-group-item-action">
                         <p class="text-muted"><strong>`+ comentario.user + `</strong>` + " " + comentario.dateTime + `</p>
                         <p> ` + showRating(comentario.score) + `</p>
                         <p> ` + comentario.description + `</p>
                         
                    
                </div>
          
                </div>
                 
            `
            }
            document.getElementById("comment").innerHTML += comments;
        }
    });
}

function add(starNum) {
        for (var i = 1; i <= 5; i++) {
        var current = document.getElementById("star" + i)
        current.className = "fa fa-star"
    }

    for (var i = 1; i <= starNum; i++) {
        var current = document.getElementById("star" + i)
        if (current.className == "fa fa-star") {
            current.className = "fa fa-star checked"
        }
    }
     rating = starNum;
}

document.addEventListener("DOMContentLoaded", function(e){
getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            prodInfo = resultObj.data;

            let prodName = document.getElementById("productName");
            let prodCost = document.getElementById("productCost");
            let prodDesc = document.getElementById("productDesc");
            let prodCat = document.getElementById("productCategory");
            let prodSold = document.getElementById("productSoldCount");

            prodName.innerHTML += prodInfo.name;
            prodCost.innerHTML += prodInfo.currency + " " + prodInfo.cost;
            prodDesc.innerHTML += prodInfo.description;
            prodCat.innerHTML += prodInfo.category;
            prodSold.innerHTML += prodInfo.soldCount;
            
            showImagesGallery(prodInfo.images);
            
            showRelatedProducts(prodInfo.relatedProducts);
           
            showComments();
        }
    });

    document.getElementById("enviar").addEventListener("click", function(){
        
        let text = document.getElementById("textArea").value;
        let user = JSON.parse(localStorage.getItem("user-logged"));
   

        let today = new Date();
        let month = parseInt(today.getMonth()+1);

        if(month<10){
            month= "0"+month;
        }

        today = today.getFullYear()+'-'+month+'-'+today.getDate()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
        
        
        let comentarios = `  
        <div class="row">
        
        <div class="w-100 justify-content-between list-group-item list-group-item-action">
                 <p class="text-muted"><strong>`+ user.username + `</strong>` + " " + today + `</p>
                 <p> ` + showRating(rating) + `</p>
                 <p> ` + text + `</p>
                 
            
        </div>
  
        </div>
        
        `
        document.getElementById("comment").innerHTML += comentarios

    });    
});