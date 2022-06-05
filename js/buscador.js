var cards;
var llistaPelis;

//let cards = JSON.parse(sessionStorage.getItem("jsonLibros"));
//let llistaPelis = JSON.parse(sessionStorage.getItem("jsonPeliculas"));

async function init() {
  cards = await fetchJSON();
  llistaPelis = await fetchJSONPeliculas();
  search();
}
init();
//hacemos i global para que no de problemas la url
console.log(cards);
console.log(llistaPelis);

function search() {
  document.getElementById("myInput").placeholder = "Introduzca el título del libro...";
  document.getElementById("myInput").setAttribute('onkeyup', 'search()');
  let input = document.getElementById('myInput').value
  input = input.toLowerCase();
  let x = document.querySelector('#libro');
  x.innerHTML = ""
  let url = ""
  for (i = 0; i < cards.length; i++) {
    let obj = cards[i];
    if (obj.name.toLowerCase().includes(input)) {
      for (d = 0; d < llistaPelis.length; d++) {
        if (obj["name"] == llistaPelis[d]["name"]) {
          url = llistaPelis[d]["datosextra"][0].trailerApi;
        }
      }
      document.getElementById("libro").innerHTML +=`
      <div class="col mb-5" >
        <div class="card-cat h-100">
        <img class="card-img-top" src=${obj["image"][0]["name"]}>
        <div class="card-body p-4">
          <div class="text-center">
            <h7 class="fw-bolder">${obj["name"]}</h7>
            <p><p2>${obj["author"]}</p2></p>
          </div>
        </div>
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div class="text-center">
            <button type="button" class="btn btn-outline-dark mt-auto" data-toggle="modal" data-target="#exampleModalCenter" onclick="ventanaModal('${i}') ; urlIframe('${url}')">Detalles</button></div>
            <div id="cardM"></div>
          </div>
        </div>

        </div>

      </div>
      `;
      url = ""
      /* document.getElementById("libro").innerHTML += '<div class="col mb-5" >' +
        '<div class="card-cat h-100">' +
        '<img class="card-img-top" src=' + obj["image"][0]["name"] + '>' +
        '<div class="card-body p-4">' +
        '<div class="text-center">' +

        '<h7 class="fw-bolder">' + obj["name"] + '</h7>' +
        '<p><p2>' + obj["author"] + '</p2></p>' +

        '</div>' +
        '</div>' +
        '<div class="card-footer p-4 pt-0 border-top-0 bg-transparent">' +
        '<div class="text-center">' +
        '<button type="button" class="btn btn-outline-dark mt-auto" data-toggle="modal" data-target="#exampleModalCenter" onclick="alertPrueba('+url+')">Detalles</button></div>' +
        '<div id="cardM"></div>' +
        '</div>' +
        ' </div>' +
        '</div>' +
        '</div>'; */
    }
    
    
  }
}

function autor() {
  document.getElementById("myInput").placeholder = "Introduzca el autor del libro...";
  document.getElementById("myInput").setAttribute('onkeyup', 'searchAutor()');
}
function searchAutor() {
  let input = document.getElementById('myInput').value
  input = input.toLowerCase();
  let x = document.querySelector('#libro');
  x.innerHTML = ""
  let url = ""

  for (i = 0; i < cards.length; i++) {
    let obj = cards[i];
    if (obj.author.toLowerCase().includes(input)) {
      for (d = 0; d < llistaPelis.length; d++) {
        if (obj["name"] == llistaPelis[d]["name"]) {
          url = llistaPelis[d]["datosextra"][0]["trailerApi"];
          console.log(url);
        }
      }
      
      document.getElementById("libro").innerHTML +=`
      <div class="col mb-5" >
        <div class="card-cat h-100">
        <img class="card-img-top" src=${obj["image"][0]["name"]}>
        <div class="card-body p-4">
          <div class="text-center">
            <h7 class="fw-bolder">${obj["name"]}</h7>
            <p><p2>${obj["author"]}</p2></p>
          </div>
        </div>
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div class="text-center">
            <button type="button" class="btn btn-outline-dark mt-auto" data-toggle="modal" data-target="#exampleModalCenter" onclick="ventanaModal('${i}') ; urlIframe('${url}')">Detalles</button></div>
            <div id="cardM"></div>
          </div>
        </div>

        </div>

      </div>
      `;
    }
  }
}

function alertPrueba(url){
  alert(url)
}
//hacemos i global para que no de problemas la url, pero el indice llega con uno de más, por lo que al buscarlo
//le restamos -1 par que lo encuentre en el json de libros
function ventanaModal(i) {

  document.getElementById("cardM").innerHTML = '<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">' +
    '<div class="modal-dialog modal-dialog-centered" role="document">' +
    '<div class="modal-content">' +
    '<div class="modal-header">' +
    '<h5 class="modal-title">'+cards[i]["name"]+' - <i>' + cards[i]["author"] + '</i></h5>' +
    '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
    ' <span aria-hidden="true">&times;</span>' +
    '</button>' +
    '</div>' +
    '<div class="modal-body">' +
    '<p><b>Fecha de publicación: </b>' + cards[i]["datePublished"] + '</p>' +
    '<p><b>Número de páginas: </b>' + cards[i]["numberOfPages"] + '</p>' +
    '<p><b>Editorial: </b>' + cards[i]["publisher"]["name"] + '</p>' +
    '<p><b>ISBN-10: </b>' + cards[i]["isbn"] + '</p>' +
    '<p><b>Sinópsis: </b>' + cards[i]["description"] + '<br></p>' +
    '<p><b>Trailer: </b></p>' +
    '<div id="trailer" class="iframe-container"></div>' +
    '<div id="notrailer"></div>'+
    '<p><b>Comentarios: </b></p>' +
    '<div class="container border border-1 rounded-end shadow mt-5 p-3 px-5 aos-init aos-animate" data-aos="flip-up"> <div class="row commentAuthor mb-2"><img src="images/usericon.png"> <div class="col-12 col-lg-8 nameAuthor">' +
    '<div class="fs-5 fw-bold"><b>' + cards[i]["datosextra"][0]["comentarios"][0]["author"] + '</b></div></div></div><div class="row commentText"> <div class="col-12 fs-6">' + cards[i]["datosextra"][0]["comentarios"][0]["comment"] + '</div></div></div>' +
    '<div class="container border border-1 rounded-end shadow mt-5 p-3 px-5 aos-init aos-animate" data-aos="flip-up"> <div class="row commentAuthor mb-2"><img src="images/usericon.png"> <div class="col-12 col-lg-8 nameAuthor">' +
    '<div class="fs-5 fw-bold"><b>' + cards[i]["datosextra"][0]["comentarios"][1]["author"] + '</b></div></div></div><div class="row commentText"> <div class="col-12 fs-6">' + cards[i]["datosextra"][0]["comentarios"][1]["comment"] + '</div></div></div>' +
    '</div>' +
    '<div class="modal-footer">' +
    '<button type="button" class="btn boton" data-dismiss="modal">Cerrar</button>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>'
}

function urlIframe(url){
  console.log("dentro url func: "+url);
  document.getElementById("trailer").innerHTML = '<iframe width="600" height="350" src="'+url+'" class="responsive-iframe" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div><br><br>';
  if(url == ""){
    var elem = document.getElementById("trailer");
    elem.parentNode.removeChild(elem);
    document.getElementById("notrailer").innerHTML += '<div class="fs-5 text-center" style="color:red"><b>No tiene trailer</b></div>'
  }
}