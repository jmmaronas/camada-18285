$(document).ready( ()=>{
    //cargar carrito
    carrito.renderCarrito("#contenedorCarrito");
    //cargar suma total
    totalCarrito();
})

const carrito = new Carrito();

//Crear boton Vaciar
let carritoCapturar=carrito;  
let resultado=document.getElementById("vaciarCarrito");
let botonVaciarCarrito = document.createElement("button");
botonVaciarCarrito.className= "btn btn-danger px-5";
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
    let mail= ($("#mail").val()).toLowerCase();
    let moneda=($("#moneda").val());
    let compra= new Compra(nombre,mail,moneda,carrito.carrito);
    console.log(compra);
    $("#finalizarCompra", ()=>{
        Swal.fire('Gracias por su compra');
        localStorage.clear()})
        location.reload()
}
// Calcular total de compra
function totalCarrito(){
    carrito.sumarPrecio();
    $("#contenedorCarritoTotal").hide();
    $("#contenedorCarritoTotal").html("");
    $("#contenedorCarritoTotal").append(`<h2 class="text-center text-danger">El total es $ ${carrito.total}</h2>`).toggle(3000);
}
//Ocultar formulario confirmar compra
$("#formBuyConfirm").hide();
//eliminar producto
$("#contenedorCarrito").on("click", e=>{    
    if(e.target.classList.contains("eliminar")){         
        carrito.eliminar(e.target.getAttribute("id"));
        totalCarrito();
    }
});
// Mostrar formulario
$("#confirmBuy").on("click", ()=>{    
    $("#formBuyConfirm").slideDown(4000);
})