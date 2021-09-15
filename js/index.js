$(document).ready( ()=>{
    Swal.fire('Pagina Lista');
    burbuja();    
    console.log(dolarVenta);
    //listaProductos.render("#contenedor");
});
let dolarVenta;
const contenedor = document.getElementById("contenedor");
let listaProductos;
const carrito= new Carrito();
const url="C:/Users/User/Google Drive/Curso - copia-20210907T144133Z-001/productos.json"

$.getJSON("productos.json", function(req,res){
  if(res === "success"){
    let misDatos= req;
    listaProductos = new Productos(misDatos); 
    listaProductos.render("#contenedor");
  }  
});


const APIURL = "https://api-dolar-argentina.herokuapp.com/api/dolaroficial";
$.ajax({
    method: "GET",
    url: APIURL,
    success: function(data) {
        $("#dolar").html(`<p class="text-primary">Dolar compra:$ <b>${data.compra}</b>  Dolar venta:$ <b>${data.venta}</b></p>`);          
        dolarVenta = data.venta;
    }
});


//Burbuja carrito cantidad productos
const burbuja = ()=>{
    const burbuja=document.getElementById("boubble");
    burbuja.innerHTML=localStorage.getItem("carrito") ? (JSON.parse(localStorage.getItem("carrito"))).length : "0";
}
// Filtro por tipo producto
$("#filtroPc").on("click", ()=>{
  let productosPc=new Productos(listaProductos.productos.filter(e => e.name == "Pc"));
  productosPc.render("#contenedor");  
});
$("#filtroNote").on("click", ()=>{
  let productosNote=new Productos(listaProductos.productos.filter(e => e.name == "Note"));
  productosNote.render("#contenedor");  
});

//  agregar productos al carrito
$("#contenedor").on("click", e=>{
    if(e.target.classList.contains("agregar")){
        listaProductos.agrerar(e.target.getAttribute("id"));             
        burbuja();
// Incrementar cantidades de productos
    }else if(e.target.classList.contains("sumar")){
        let id=e.target.getAttribute("id").substring(11);
        let cantidadSeleccion= listaProductos.productos.find(e => e.id == id);        
        if(cantidadSeleccion.cantidad < cantidadSeleccion.stock){
          cantidadSeleccion.cantidad += 1;       
          $("#cantidad"+id).html(cantidadSeleccion.cantidad);
          $("#nose"+id).html(`<h5>${cantidadSeleccion.cantidad} x $ ${cantidadSeleccion.precio} = $ ${cantidadSeleccion.precio * cantidadSeleccion.cantidad}</h5>`);
        }
// Disminur cantidad de prodcuto
    }else if(e.target.classList.contains("restar")){
      let id=e.target.getAttribute("id").substring(13);
      let cantidadSeleccion= listaProductos.productos.find(e => e.id == id);      
      if(cantidadSeleccion.cantidad > 1){
        cantidadSeleccion.cantidad -= 1;       
        $("#cantidad"+id).html(cantidadSeleccion.cantidad);
        $("#nose"+id).html(`<h5>${cantidadSeleccion.cantidad} x $ ${cantidadSeleccion.precio} = $ ${cantidadSeleccion.precio * cantidadSeleccion.cantidad}</h5>`);
      }
    }
});

//Ordenar productos
$("#ordenar").on("change", (e)=>{ 
    console.log(e.target.value)
    switch(e.target.value){
        case "menor-mayor":
            let menorPrecio=(listaProductos.productos).sort(function (a, b) {
                if (a.precio > b.precio) {
                  return 1;
                }
                if (a.precio < b.precio) {
                  return -1;
                }
                // a must be equal to b
                return 0;
              });    
            let produtoOrdenado= new Productos(menorPrecio);
            console.log(produtoOrdenado);
            produtoOrdenado.render("#contenedor");            
            break;

        case "mayor-menor":
            let mayorPrecio=(listaProductos.productos).sort(function (a, b) {
                if (b.precio > a.precio) {
                  return 1;
                }
                if (b.precio < a.precio) {
                  return -1;
                }
                // a must be equal to b
                return 0;
              });    
            let ordenadoMayorPrecio= new Productos(mayorPrecio);
            console.log(ordenadoMayorPrecio);
            ordenadoMayorPrecio.render("#contenedor");
            break;
            
        case "a-z":
            let a_z=(listaProductos.productos).sort(function (a, b) {
                if (a.name > b.name) {
                  return 1;
                }
                if (a.name < b.name) {
                  return -1;
                }
                // a must be equal to b
                return 0;
              });    
            let ordenadoA= new Productos(a_z);
            console.log(ordenadoA);
            ordenadoA.render("#contenedor");
            break;
            

        case "z-a":
            let z_a=(listaProductos.productos).sort(function (a, b) {
                if (b.name > a.name) {
                  return 1;
                }
                if (b.name < a.name) {
                  return -1;
                }
                // a must be equal to b
                return 0;
              });    
            let ordenadoZ= new Productos(z_a);
            console.log(ordenadoZ);
            ordenadoZ.render("#contenedor");
            break;            
    }    
});


// while (element.firstChild) {
//     element.removeChild(element.firstChild);
//   }

function animacion(e){
    let alutraPantalla = $(document).height();
    let anchoPantalla = $(document).width();
    $("body").prepend(`<div id='confirma' class="bg-success p-2" style="display: none">  </div>`);
    $("#confirma").html(
        `<h3> Producto Agregado </h3>
        <div class="card">
            <img src="${e.img}" class="card-img-top">
            <div class="card-body">            
                <div class="card-title text-center">
                    <h3>${e.name}</h3>
                </div>
                <div class="card-tex text-center">
                    <p>${e.description}</p>
                </div>
                <div class="card-title text-center">
                    <h3>$ ${e.precio}</h3>
                </div>                
            </div>
        </div>
    `)
    
    $("#confirma").css({                         
        "z-index": 1000,
        "left":'250px',                
        "height":'500px',
        "width": '400px',
        "top": alutraPantalla/3 +"px",
        "left": anchoPantalla/3+ "px",
        "position": "absolute"
        })
.fadeIn(5000)
.delay(2000)
.fadeOut(3000);

};


$("body").prepend('<p id="p1">Coder House</p>');
//Declaración de métodos encadenados
$("#p1").css("color", "red")
        .slideUp(2000)
        .delay(2000)
        .slideDown(2000);

    /*$("#confirma").animte({ 
        left:'250px',
        opacity:'0.5',
        height:'
        150px',
        width:'150px'   }, //1er parámetro propiedades
        "slow",            //2do parámetro duración 
        function(){        //3er parámetro callback
            console.log("final de animación");
        });
        */
    // $("#confirma").css({                 
    //             "z-index": 1000,
    //             "left":'250px',                
    //             "height":'400px',
    //             "width": '300px',
    //             "top": alutraPantalla/2 +"px",
    //             "left": anchoPantalla/3+ "px",
    //             "position": "absolute"
    //             })
    //     .slideDown(5000)
    //     .delay(2000)
    //     .slideUp(3000);




    
