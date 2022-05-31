/* jshint esversion: 8 */


//let libros = getJson("https://biblioteca-coll.netlify.app/data/libros.json");
//let peliculas = getJson("https://hollypedia.netlify.app/json/peliculas.json");
//let peliculas = fetchJSON();
//console.log(peliculas);
//fetchJSON("https://hollypedia.netlify.app/json/peliculas.json").then(peliculas => result.json()).then(peliculas => console.log(peliculas));



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

async function fetchJSON1(url) {
  console.log("fetch1");
    const response = await fetch(url);
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    const data = response.json();
    return data;
}
async function fetchJSON2(url) {
  console.log("fetch2");
    const response = await fetch(url);
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    const data = response.json();
    return data;
}
fetchJSON2().catch(error => {
    error.message; // 'An error has occurred: 404'
});

async function fetchPelis(){
  let peliculas = await fetchJSON1('https://hollypedia.netlify.app/json/peliculas.json');
  sessionStorage.setItem("jsonPeliculas",JSON.parse(peliculas));
  console.log(peliculas);
}

async function fetchLibros(){
  let libros = await fetchJSON2('https://biblioteca-coll.netlify.app/data/libros.json');
  console.log(libros);
  sessionStorage.setItem("jsonLibros",JSON.parse(libros));
  
}