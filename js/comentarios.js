var datosTienda='',nombreTienda='',coordenadas='',direccion='',descripcion='',telefono='',email='', horariolv='',horariosb='',horariodm='',foto='',contador=0,contenidoJson='';
let comentarios = [];

const valores = window.location.search
const urlParams = new URLSearchParams(valores);
var catalogo = urlParams.get('name');




$(document).ready(function () {
    
    checkSession();
    printList()
    /*Tomar la fecha actual. Esto tienes que agergarlo a cada cometnario*/
    const mes = new Date().getMonth()+1
    const dia=new Date().getDate()
    const anho=new Date().getFullYear()
    //$('#fecha').text(dia+'/'+mes+'/'+anho)

    $('#botonFormId').click(function (e) {
        e.preventDefault()
        let nombre = $('#contact-name').val();
        let email = $('#contact-email').val();
        let telefono = $('#contact-phone').val();
        let comentario = $('#contact-message').val();

        let validated = validateForm(nombre, email, comentario)

        if (validated) {
            saveComent(nombre, email, telefono, comentario)
            addLast(nombre, email, telefono, comentario)
        } else
            alert('Debe completar todos los datos para poder enviar el comentario')

    })

})

function saveComent(nombre, email, telefono, comentario) {
    comentarios.push({
        nombre,
        email,
        telefono,
        comentario
    })
    window.localStorage.setItem(catalogo, JSON.stringify(comentarios));
}

function addLast(nombre, email, telefono, comentario) {
    var lista = document.getElementById("lista_comentarios");
    var linew = document.createElement("li");
        var img = document.createElement("img"); 
        var nom = document.createElement("h4");
        var com = document.createElement("p");
        lista.appendChild(linew);
        linew.appendChild(img);
        linew.appendChild(nom);
        linew.appendChild(com);

        var nomb = document.createTextNode(nombre);
        var coment = document.createTextNode(comentario);
        var emai = document.createTextNode(email);
        
        nom.appendChild(nomb);
        com.appendChild(coment);
        img.setAttribute('src', 'images/usericon.png');
        img.setAttribute('class', 'rounded-circle');
        img.setAttribute('height', '40px');
        img.setAttribute('width', '40px');
}

function checkSession() {
    if (window.localStorage.getItem(catalogo) == null) {
        window.localStorage.setItem(catalogo, JSON.stringify(comentarios));
    } else {
        comentarios = JSON.parse(window.localStorage.getItem(catalogo))
    }
}

function validateForm(nombre, email, telefono, comentario) {
    if (nombre == '' || email == '' || comentario == '')
        return false
    return true
}

function printList() {
    var lista = document.getElementById("lista_comentarios");
    comentarios.forEach(function (data, index) {
        var linew = document.createElement("li");
        var img = document.createElement("img"); 
        var nom = document.createElement("h4");
        var com = document.createElement("p");
        lista.appendChild(linew);
        linew.appendChild(img);
        linew.appendChild(nom);
        linew.appendChild(com);

        var nombre = document.createTextNode(data.nombre);
        var comentario = document.createTextNode(data.comentario);
        var email = document.createTextNode(data.email);
        
        nom.appendChild(nombre);
        com.appendChild(comentario);
        img.setAttribute('src', 'images/usericon.png');
        img.setAttribute('class', 'rounded-circle');
        img.setAttribute('height', '40px');
        img.setAttribute('width', '40px');


    })
}

