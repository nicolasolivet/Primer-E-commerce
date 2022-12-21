let productosEnCarrito = localStorage.getItem("productos-en-carrito");
 
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const total = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar"); 


function cargarProductosCarrito() { 
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
        
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            contenedorCarritoProductos.append(div);

            const boton = document.getElementById(`${producto.id}`);
                boton.addEventListener('click', () => {
                    eliminarDelCarrito(productosEnCarrito, producto.id);
                });
        })
    
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

    montoTotal();
}

cargarProductosCarrito();

function eliminarDelCarrito (productosEnCarrito, id) {
    
    const productoEliminado = productosEnCarrito.find(producto => producto.id === id)
    console.log(productoEliminado);
    const index = productosEnCarrito.findIndex(producto => producto.id === id)
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

botonVaciar.addEventListener("click", vaciarCarrito); 
function vaciarCarrito() {

    Swal.fire({
        icon: 'warning',
        iconColor: '#dc3545', 
        title: 'Seguro/a queres vaciar el carrito?',
        text: 'Se eliminaran todos los productos cargados.',
        showDenyButton: true,
        showCloseButton: true, 
        confirmButtonText: 'Si, vaciar',
        denyButtonText: 'No, seguir comprando',
        confirmButtonColor: '#7066e0',
        denyButtonColor: '#333333',
        // timer: 1500
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Se ha vaciado el carrito con éxito!', '', 'success');
          productosEnCarrito.length = 0;
          localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
          cargarProductosCarrito();
        } 
      })
}

function montoTotal() {
    const precioTotal = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${precioTotal}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {
    
    Swal.fire({
        icon: 'success',
        title: 'Muchas gracias por tu compra.',
        text: 'Su compra se realizó con éxito.',
        timer: 3000,
    })

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    contenedorCarritoVacio.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    // contenedorCarritoComprado.classList.remove("disabled");

}



    