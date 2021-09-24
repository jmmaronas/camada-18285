class Productos{
    constructor(productos){
    this.productos = productos;
    }
    init(products) {
        this.productos=products;                
    }
    render(etiqueta){
        $(etiqueta).html("");
        for(const e of this.productos){
            $(etiqueta).append(`
                <div class="card text-center col-md-3 m-3 ">
                    <img src="${e.img}" class="card-img-top" >
                    <div class="card-body">            
                        <div class="card-title ">
                            <h3>${e.name}</h3>
                        </div>
                        <div class="card-tex">
                            <p>${e.description}</p>
                        </div>
                        <div class="card-title">
                            <h3>${e.precio}</h3>
                        </div>
                        <div class="row">    
                            <ul class="list-group list-group-horizontal m-2 ">
                                <li id="cantidadMenos${e.id}" class="list-group-item btn bg-success col-3 text-white restar"><i class="fas fa-minus"></i></li>
                                <li id="cantidad${e.id}" class="list-group-item col-6  fw-bolder">${e.cantidad}</li>
                                <li id="cantidadMas${e.id}" class="list-group-item btn bg-success col-3 text-white sumar"> <i class="fas fa-plus"></i> </li>
                            </ul>
                        </div>
                        <div id="nose${e.id}" class="card-text">
                            
                        </div> 
                        <div class="row">
                            <button href="#" id="${e.id}" class="btn btn-primary  agregar">Agregar</button>
                        </div>
                    </div>
                </div>
            `);          
        }
    }
    agrerar(id){
        let productoAgregar=this.productos.find(e=>e.id==id);     
        animacion(productoAgregar);
        let carrito= localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : [];
        carrito.push(productoAgregar);    
        localStorage.setItem("carrito",JSON.stringify(carrito));  
    }

}

class Carrito{
    constructor(){
        this.carrito=localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : [];
    }
    renderCarrito(etiqueta){
        $(etiqueta).html("");                
        for(const e of this.carrito){
            $(etiqueta).append(`
                <div id="card${e.id}" class="card text-center col-md-3 m-3">
                    <img src="../${e.img}" class="card-img-top">
                    <div class="card-body flex">     
                        <div class="card-title ">
                            <h3>${e.name}</h3>
                        </div>
                        <div class="card-tex ">
                            <p>${e.description}</p>
                        </div>
                        <div class="card-text">
                            <h5>${e.cantidad} x $${e.precio} = ${e.precio * e.cantidad}</h5>
                        </div> 
                        <div class="row">                   
                            <button href="#" class="btn btn-primary eliminar" id="${e.id}">Quitar</button>                    
                        </div>
                    </div>
                </div>
            `);
        }
    }
    
    eliminar(id){
        let productoQuitar= this.carrito.find(e=>e.id==id);    
        let indiceProducto= this.carrito.indexOf(productoQuitar);    
        this.carrito.splice(indiceProducto,1);
        localStorage.setItem("carrito", JSON.stringify(this.carrito));    
        this.removeElementWithAnimation(id); 
    }
    vaciar(){
        localStorage.clear();
        location.reload()
    }
    sumarPrecio(){
        this.total=0; 
        this.carrito.forEach(element  => this.total  += (element.precio*element.cantidad));
        console.log(this.total);
    }

    removeElementWithAnimation(id){
        console.log("card"+id);
        //$("#card"+id).remove();
        $("#card"+id).fadeOut(3000);
    }
}

class Compra{
    constructor(nombre, mail, moneda, carrito){
        this.nombre=nombre;
        this.mail=mail;
        this.moneda=moneda;
        this.carrito=carrito;
    }
}