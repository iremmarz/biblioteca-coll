var dataLlista;
var dataPelis;
//let cards = JSON.parse(sessionStorage.getItem("jsonLibros"));
//let llistaPelis = JSON.parse(sessionStorage.getItem("jsonPeliculas"));

async function init(){
  dataLlista = await fetchJSON();
  dataPelis = await fetchJSONPeliculas();
  generarCards();
}
init();



function generarCards(){

  document.getElementById("libro").innerHTML = "";
  
  for(let i in dataLlista){
    url = "";
    for(let d in dataPelis){
      if(dataLlista[i]["name"] == dataPelis[d]["name"]){
        url = dataPelis[d]["datosextra"][0]["trailerApi"];
        console.log(url);
      } 
    }
  
    
    document.getElementById("libro").innerHTML += '<div class="col mb-5" >'+
                        '<div class="card-cat h-100">'+
                            '<img class="card-img-top" src='+dataLlista[i]["image"][0]["name"]+'>'+                            
                            '<div class="card-body p-4">'+
                               '<div class="text-center">'+
                                    
                                    '<h7 class="fw-bolder">'+dataLlista[i]["name"]+'</h7>'+
                                    '<p><p2>'+dataLlista[i]["author"]+'</p2></p>'+
                                    
                                '</div>'+
                            '</div>'+
                            '<div class="card-footer p-4 pt-0 border-top-0 bg-transparent">'+
                                '<div class="text-center">'+
                                '<button type="button" class="btn btn-outline-dark mt-auto" data-toggle="modal" data-target="#exampleModalCenter" onclick="ventanaModal('+i+','+url+')">Detalles</button></div>'+
                                '<div id="cardM"></div>'+
                            '</div>'+
                       ' </div>'+
                       '</div>'+
                    '</div>'

  }


}

function ventanaModal(i,url){
  document.getElementById("cardM").innerHTML ='<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">'+
                                  '<div class="modal-dialog modal-dialog-centered" role="document">'+
                                    '<div class="modal-content">'+
                                      '<div class="modal-header">'+
                                        '<h5 class="modal-title">'+dataLlista[i]["name"]+' - <i>'+dataLlista[i]["author"]+'</i></h5>'+
                                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                                         ' <span aria-hidden="true">&times;</span>'+
                                        '</button>'+
                                      '</div>'+
                                      '<div class="modal-body">'+
                                      '<p><b>Fecha de publicación: </b>'+dataLlista[i]["datePublished"]+'</p>'+
                                      '<p><b>Número de páginas: </b>'+dataLlista[i]["numberOfPages"]+'</p>'+
                                      '<p><b>Editorial: </b>'+dataLlista[i]["publisher"]["name"]+'</p>'+
                                      '<p><b>ISBN-10: </b>'+dataLlista[i]["isbn"]+'</p>'+
                                      '<p><b>Sinópsis: </b>'+dataLlista[i]["description"]+'<br></p>'+
                                      '<p><b>Trailer: </b></p>'+
                                      '<div class="iframe-container"><iframe width="600" height="350" src="'+url+'" class="responsive-iframe" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div><br><br>'+
                                      '<p><b>Comentarios: </b></p>'+
                                      '<div class="container border border-1 rounded-end shadow mt-5 p-3 px-5 aos-init aos-animate" data-aos="flip-up"> <div class="row commentAuthor mb-2"><img src="images/usericon.png"> <div class="col-12 col-lg-8 nameAuthor">'+
                                      '<div class="fs-5 fw-bold"><b>'+dataLlista[i]["coments"][0]["nickname"]+'</b></div></div></div><div class="row commentText"> <div class="col-12 fs-6">'+dataLlista[i]["coments"][0]["comment"]+'</div></div></div>'+
                                      '<div class="container border border-1 rounded-end shadow mt-5 p-3 px-5 aos-init aos-animate" data-aos="flip-up"> <div class="row commentAuthor mb-2"><img src="images/usericon.png"> <div class="col-12 col-lg-8 nameAuthor">'+
                                      '<div class="fs-5 fw-bold"><b>'+dataLlista[i]["coments"][1]["nickname"]+'</b></div></div></div><div class="row commentText"> <div class="col-12 fs-6">'+dataLlista[i]["coments"][1]["comment"]+'</div></div></div>'+
                                      '</div>'+
                                      '<div class="modal-footer">'+
                                        '<button type="button" class="btn boton" data-dismiss="modal">Cerrar</button>'+
                                      '</div>'+
                                    '</div>'+
                                  '</div>'+
                                '</div>'
}