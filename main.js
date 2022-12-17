const productos = [
    //* Notebooks
    {
        id: "notebook-01",
        titulo: "Notebook 01",
        imagen: "./images/notebooks/mac1.jpeg",
        categoria: {
            nombre: "Notebooks",
            id: "notebooks"
        },
        precio: 250000
    },
    {
        id: "notebook-02",
        titulo: "Notebook 02",
        imagen: "./images/notebooks/mac1.jpeg",
        categoria: {
            nombre: "Notebooks",
            id: "notebooks"
        },
        precio: 250000
    },
    {
        id: "notebook-03",
        titulo: "Notebook 03",
        imagen: "./images/notebooks/mac1.jpeg",
        categoria: {
            nombre: "Notebooks",
            id: "notebooks"
        },
        precio: 250000
    },
    {
        id: "notebook-04",
        titulo: "Notebook 04",
        imagen: "./images/notebooks/mac1.jpeg",
        categoria: {
            nombre: "Notebooks",
            id: "notebooks"
        },
        precio: 250000
    },
    {
        id: "notebook-05",
        titulo: "Notebook 05",
        imagen: "./images/notebooks/mac1.jpeg",
        categoria: {
            nombre: "Notebooks",
            id: "notebooks"
        },
        precio: 250000
    },
    {
        id:"notebook-06",
        titulo: "Notebook 06",
        imagen: "./images/notebooks/mac1.jpeg",
        categoria: {
            nombre: "Notebooks",
            id:"notebooks"
        },
        precio: 250000
    },
    //* Celulares
    {
        id: "celular-01",
        titulo: "Celular 01",
        imagen: "./images/celulares/samsung1.png",
        categoria: {
            nombre: "Celulares",
            id: "celulares"
        },
        precio: 60000
    },
    {
        id: "celular-02",
        titulo: "Celular 02",
        imagen: "./images/celulares/samsung1.png",
        categoria: {
            nombre: "Celulares",
            id: "celulares"
        },
        precio: 60000
    },
    {
        id: "celular-03",
        titulo: "Celular 03",
        imagen: "./images/celulares/samsung1.png",
        categoria: {
            nombre: "Celulares",
            id: "celulares"
        },
        precio: 60000
    },
    {
        id: "celular-04",
        titulo: "Celular 04",
        imagen: "./images/celulares/samsung1.png",
        categoria: {
            nombre: "Celulares",
            id: "celulares"
        },
        precio: 60000
    },
    {
        id: "celular-05",
        titulo: "Celular 05",
        imagen: "./images/celulares/samsung1.png",
        categoria: {
            nombre: "Celulares",
            id: "celulares"
        },
        precio: 60000
    },
    {
        id: "celular-06",
        titulo: "Celular 06",
        imagen: "./images/celulares/samsung1.png",
        categoria: {
            nombre: "Celulares",
            id: "celulares"
        },
        precio: 60000
    },
    {
        id: "celular-07",
        titulo: "Celular 07",
        imagen: "./images/celulares/samsung1.png",
        categoria: {
            nombre: "Celulares",
            id: "celulares"
        },
        precio: 60000
    },
    {
        id: "celular-08",
        titulo: "Celular 08",
        imagen: "./images/celulares/samsung1.png",
        categoria: {
            nombre: "Celulares",
            id: "celulares"
        },
        precio: 60000
    },
    //* Auriculares
    {
        id: "auricular-01",
        titulo: "Auricular 01",
        imagen: "./images/auriculares/auricular1.png",
        categoria: {
            nombre: "Auriculares",
            id: "auriculares"
        },
        precio: 15000
    },
    {
        id: "auricular-02",
        titulo: "Auricular 02",
        imagen: "./images/auriculares/auricular1.png",
        categoria: {
            nombre: "Auriculares",
            id: "auriculares"
        },
        precio: 15000
    },
    {
        id: "auricular-03",
        titulo: "Auricular 03",
        imagen: "./images/auriculares/auricular1.png",
        categoria: {
            nombre: "Auriculares",
            id: "auriculares"
        },
        precio: 15000
    },
    {
        id: "auricular-04",
        titulo: "Auricular 04",
        imagen: "./images/auriculares/auricular1.png",
        categoria: {
            nombre: "Auriculares",
            id: "auriculares"
        },
        precio: 15000
    },
    {
        id: "auricular-05",
        titulo: "Auricular 05",
        imagen: "./images/auriculares/auricular1.png",
        categoria: {
            nombre: "Auriculares",
            id: "auriculares"
        },
        precio: 15000
    },
    {
        id: "auricular-06",
        titulo: "Auricular 06",
        imagen: "./images/auriculares/auricular1.png",
        categoria: {
            nombre: "Auriculares",
            id: "auriculares"
        },
        precio: 15000
    }

];


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategoria = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

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
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategoria.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategoria.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBtn = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBtn);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach((boton => {
        boton.addEventListener("click", agregarAlCarrito);
    }))
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
