import { Pelicula } from "./classPelicula.js";

let listaPeliculas = [];

//codigo para instanciar una ventana modal formularioPelicula
const modalPelicula = new bootstrap.Modal(
  document.getElementById("formularioPelicula")
);
const btnCrearPelicula = document.querySelector("#btnCrearPelicula");
let codigo = document.getElementById("codigo");
let titulo = document.getElementById("titulo");
let descripcion = document.getElementById("descripcion");
let imagen = document.getElementById("imagen");
let genero = document.getElementById("genero");
let formulario = document.getElementById("formPeliculas");

// aqui voy agregando los eventos
btnCrearPelicula.addEventListener("click", mostrarFormulario);
formulario.addEventListener("submit", guardarPelicula);

function mostrarFormulario() {
  modalPelicula.show();
  //mostrar el identificador unico cargado
  codigo.value = uuidv4();
  // console.log( uuidv4()); //este metodo genera identificadores unicos alfanumericos
}

function guardarPelicula(e) {
  e.preventDefault();
  //volver a validar (practica para la casa)

  //crear un objeto pelicula
  let nuevaPelicula = new Pelicula(
    codigo.value,
    titulo.value,
    descripcion.value,
    imagen.value,
    genero.value
  );
  //guardar la pelicula en el arreglo
  listaPeliculas.push(nuevaPelicula);
  console.log(listaPeliculas);
  //limpiar formulario
  limpiarFormulario();
  //cerrar la ventana modal
  modalPelicula.hide();
}

function limpiarFormulario() {
  formulario.reset(); //reset resetea el value de todo lo que esta en el form
  //resetar las clases
  titulo.className = "form-control";
  descripcion.className = "form-control";
  genero.className = "form-control";
  imagen.className = "form-control";
}
