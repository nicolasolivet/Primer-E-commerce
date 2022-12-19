const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategoria = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const contador = document.querySelector("#contador");

const productos = "productos.json";

function cargarProductos() {

    fetch(productos)
        .then(respuesta => respuesta.json())
        .then(productos => {
            contenedorProductos.innerHTML = ""
            productos.forEach(producto => {

                const div = document.createElement("div");
                div.classList.add("producto");
                div.innerHTML = `
                <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
                </div>
            `;

                contenedorProductos.append(div);

                // actualizarBotonesAgregar();
                const boton = document.getElementById(`${producto.id}`);
                boton.addEventListener('click', () => {
                    agregarAlCarrito(productos, producto.id);
                });
            })
            mostrarCategoria(productos);
        })
    // actualizarBotonesAgregar();    
    
}

function mostrarCategoria(productos) {
    botonesCategoria.forEach(boton => {
        boton.addEventListener("click", (e) => {

            botonesCategoria.forEach(boton => boton.classList.remove("active"));
            e.currentTarget.classList.add("active");

            if (e.currentTarget.id != "todos") {
                const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
                tituloPrincipal.innerText = productoCategoria.categoria.nombre;
                const productosFiltrados = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
                
                contenedorProductos.innerHTML = ""
                
                productosFiltrados.forEach((producto) => {
                    const div = document.createElement("div");
                    div.classList.add("producto");

                    div.innerHTML += `
                    <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="producto-detalles">
                    <h3 class="producto-titulo">${producto.titulo}</h3>
                    <p class="producto-precio">$${producto.precio}</p>
                    <button class="producto-agregar" id="${producto.id}">Agregar</button>
                    </div>
                `;

                    contenedorProductos.append(div);
                    
                    
                    const boton = document.getElementById(`${producto.id}`);
                    boton.addEventListener('click', () => {
                        agregarAlCarrito(productos, producto.id);
                    });
                })
            
            } else {
                tituloPrincipal.innerText = "Todos los productos";
                cargarProductos();
            }
        })
    });
}

cargarProductos();

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito")


if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarContador();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(productos, id) {
   
    const productoAgregado = productos.find(producto => producto.id === id);
    console.log(productosEnCarrito)
    if (productosEnCarrito.some(producto => producto.id === id)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === id)
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1
        productosEnCarrito.push(productoAgregado);
    }
    actualizarContador();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
};

function actualizarContador() {
    let nuevoContador = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    contador.innerText = nuevoContador;
}


