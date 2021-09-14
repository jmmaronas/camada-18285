$(document).ready( ()=>{
    //cargar carrito
    carrito.renderCarrito("#contenedorCarrito");
})

const carrito = new Carrito();
//eliminar producto
$("#contenedorCarrito").on("click", e=>{    
    if(e.target.classList.contains("eliminar")){         
        carrito.eliminar(e.target.getAttribute("id"));
    }
});
//Crear boton Vaciar
let carritoCapturar=carrito;  
let resultado=document.getElementById("resultado");
let botonVaciarCarrito = document.createElement("button");
botonVaciarCarrito.className= "btn btn-primary";
botonVaciarCarrito.id="botonVaciar";
botonVaciarCarrito.innerText="Vaciar Carrito";
resultado.appendChild(botonVaciarCarrito);

//Evento vaciar carrito
$("#botonVaciar").on("click", ()=>carrito.vaciar());

//FORMULARIO
let capturarProdcuto= document.getElementById("form");

capturarProdcuto.addEventListener("submit",capturarForm);

function capturarForm(e){  
    e.preventDefault(); 
    let nombre= (document.getElementById("nombre").value).toLowerCase();    
    console.log(nombre);    
}