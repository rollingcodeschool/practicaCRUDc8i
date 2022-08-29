import { Pelicula } from "./classPelicula.js";

let listaPeliculas =
  JSON.parse(localStorage.getItem("listaPeliculasKey")) || [];

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

cargarInicial();

//muestre la tabla con datos
function cargarInicial() {
  if (listaPeliculas.length > 0) {
    //dibujar filas de la tabla
    listaPeliculas.forEach((itemPelicula) => {
      crearFila(itemPelicula);
    });
  }
}

function crearFila(pelicula) {
  let tablaPeliculas = document.querySelector("#tablaPeliculas");
  tablaPeliculas.innerHTML += `<tr>
  <th scope="row">${pelicula.codigo}</th>
  <td>${pelicula.titulo}</td>
  <td>${pelicula.descripcion} 
  </td>
  <td>
   ${pelicula.imagen}
  </td>
  <td>
    ${pelicula.genero}
  </td>
  <td>
    <button type="button" class="btn btn-danger" onclick="borrarPelicula('${pelicula.codigo}')">
      <i class="bi bi-file-x-fill colorIncono fs-5"></i>
    </button>
    <button type="button" class="btn btn-warning mt-2" onclick="editarPelicula('${pelicula.codigo}')">
      <i class="bi bi-pencil-square fs-5"></i>
    </button>
  </td>
</tr>`;
}

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
  guardarPeliculasEnLocalStorage();
  //limpiar formulario
  limpiarFormulario();
  //dibujar la fila en la tabla
  crearFila(nuevaPelicula);
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

function guardarPeliculasEnLocalStorage() {
  localStorage.setItem("listaPeliculasKey", JSON.stringify(listaPeliculas));
}

window.borrarPelicula = function (codigo) {
  console.log(codigo);
  Swal.fire({
    title: "Eliminar pelicula",
    text: "Esta seguro de eliminar la pelicula seleccionada, no se puede revertir este paso",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Borrar",
    CancelButtonText: "Cancelar",
  }).then((result) => {
    console.log(result);
    if (result.isConfirmed) {
      //agregar el codigo para borrar la pelicula
      //buscar la pelicula con el codigo indicado en el arreglo y borrarlo
      let copiaListaPeliculas = listaPeliculas.filter((pelicula) => {
        return pelicula.codigo != codigo;
      });
      console.log(copiaListaPeliculas);
      listaPeliculas = copiaListaPeliculas;
      //actualizar el localstorage
      guardarPeliculasEnLocalStorage();
      //actualizar la tabla
      borrarTabla();
      cargarInicial();

      Swal.fire("Pelicula eliminada", "La pelicula seleccionada fue correctamente eliminada", "success");
    }
  });
};

function borrarTabla() {
  let tablaPeliculas = document.querySelector("#tablaPeliculas");
  tablaPeliculas.innerHTML = "";
}

window.editarPelicula = function (codigoBuscado){
  
  //buscar del arreglo de peliculas la pelicula seleccionada
  // let peliculaBuscada = listaPeliculas.find((pelicula)=>{return pelicula.codigo === codigo});
  let peliculaBuscada = listaPeliculas.find((pelicula)=> pelicula.codigo === codigoBuscado); //return implicito
  //cargar los datos de la pelicula seleccionada en el formulario
  codigo.value = peliculaBuscada.codigo;
  titulo.value = peliculaBuscada.titulo;
  descripcion.value = peliculaBuscada.descripcion;
  imagen.value = peliculaBuscada.imagen;
  genero.value = peliculaBuscada.genero;
  //abrir ventana modal
  modalPelicula.show();

}