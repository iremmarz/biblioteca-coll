/* jshint esversion: 8 */


let libros = getJson("https://biblioteca-coll.netlify.app/data/libros.json");
//let peliculas = getJson("https://hollypedia.netlify.app/json/peliculas.json");
//let peliculas = fetchJSON();
//console.log(peliculas);
//fetchJSON("https://hollypedia.netlify.app/json/peliculas.json").then(peliculas => result.json()).then(peliculas => console.log(peliculas));

sessionStorage.setItem("jsonLibros",libros);

function getJson(url){
  
  let aux;
  let xhr = new XMLHttpRequest();
  
  xhr.onreadystatechange = function(){
    
    if(this.readyState == 4 && this.status == 200){
      aux = xhr.responseText;
    }
  
  };
  
  xhr.open("GET", url, false);
  xhr.send();
  
  return aux;
}

async function fetchJSON() {
    const response = await fetch('https://hollypedia.netlify.app/json/peliculas.json');
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    const data = response.json();
    return data;
}
fetchJSON().catch(error => {
    error.message; // 'An error has occurred: 404'
});

async function fetchPelis(){
  let peliculas = await fetchJSON();
  sessionStorage.setItem("jsonPeliculas",JSON.stringify(peliculas));
  //console.log(peliculas);
}