// Se estandariza el array para que cada objeto tenga las propiedades 'detalles' y 'imagenes'
const productos = [
    {
        nombre: "Nuestro producto estrella: Brookies",
        descripcion: "Es una fusión de brownies y galletas de chispas de chocolate.",
        detalles: "Una combinación perfecta de brownie y galleta de chocolate. Ideal para los amantes del chocolate en su máxima expresión.",
        imagenes: ["Brookies.jpg.jpg"]
    },
    {
        nombre: "Mostachón",
        descripcion: "Delicioso postre a base de galleta, nuez y una capa de queso crema adornado con frutos frescos.",
        detalles: "Hecho con galleta, nuez, queso crema y frutas al gusto. Un postre clásico con un toque fresco y natural.",
        imagenes: ["Mostachon.jpg", "Mostachon 2.jpg"]
    },
    {
        nombre: "Mini mostachón",
        descripcion: "Mini postre a base de galleta, nuez y una cubierta de queso crema decorada con deliciosas frutas frescas.",
        detalles: "La versión individual de nuestro clásico mostachón, perfecto para eventos y mesas de postres. Sabor y elegancia en un bocado.",
        imagenes: ["Mini mostachon.jpg", "Mesa 3.jpg", "Mesa 4.jpg"]
    },
    {
        nombre: "Mini Brownies",
        descripcion: "Mini postre de brownie con chocolate y espolvoreado con azúcar glass.",
        detalles: "Pequeñas porciones de nuestro brownie clásico, perfectas para compartir. Suave por dentro, con una capa crujiente por fuera.",
        imagenes: ["Mini brownie 2.0.jpg"]
    },
   
];

const servicios = [
    {
        nombre: "Mesa de Postres",
        descripcion: "Montaje de mesa con diversos mini postres, bases y decoración.",
        detalles: "Ofrecemos mesas temáticas personalizadas con nuestros mejores postres. Ideal para eventos grandes o pequeños.",
        imagenes: ["Mesa de postres.jpg", "Mesa 1.jpg", "Mesa 2.jpg", "Mesa 3.jpg", "Mesa 4.jpg"]
    }
];

// Nuevas variables para el modal y las secciones
const productGrid = document.getElementById('product-grid');
const searchInput = document.getElementById('searchInput');
const servicesGrid = document.getElementById('services-grid');
const productModal = document.getElementById('product-modal');
const modalContent = document.getElementById('modal-content');
const modalCloseBtn = document.querySelector('.modal-close-btn');

let currentImageIndex = 0;
let currentProduct = null;

// La función 'generarProductos' ahora acepta dos parámetros
function generarProductos(productosAMostrar, gridElement) {
    gridElement.innerHTML = '';
    productosAMostrar.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'product-card';
        const imageUrl = Array.isArray(producto.imagenes) ? producto.imagenes[0] : producto.imagen;
        const fallbackImage = 'placeholder.jpg'; // Asegúrate de tener una imagen de respaldo
        const finalImageUrl = imageUrl || fallbackImage;

        card.innerHTML = `
            <img src="${finalImageUrl}" alt="${producto.nombre}" class="product-image">
            <div class="product-info">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
            </div>
        `;
        card.addEventListener('click', () => {
            mostrarModal(producto);
        });
        gridElement.appendChild(card);
    });
}

function filtrarProductos() {
    const searchTerm = searchInput.value.toLowerCase();
    const productosFiltrados = productos.filter(producto => {
        const nombre = producto.nombre ? producto.nombre.toLowerCase() : '';
        const descripcion = producto.descripcion ? producto.descripcion.toLowerCase() : '';
        return nombre.includes(searchTerm) || descripcion.includes(searchTerm);
    });
    // Solo filtra y muestra los productos, no los servicios
    generarProductos(productosFiltrados, productGrid);
}

function updateModalImage(product, index) {
    const mainImage = document.querySelector('.modal-main-image');
    mainImage.src = product.imagenes[index];
    mainImage.alt = product.nombre;
}

function mostrarModal(producto) {
    currentProduct = producto;
    currentImageIndex = 0;

    modalContent.innerHTML = `
        <div class="modal-carousel-container">
            <img src="${producto.imagenes[0]}" alt="${producto.nombre}" class="modal-main-image">
            <div class="carousel-nav">
                <button class="prev-btn">&larr;</button>
                <button class="next-btn">&rarr;</button>
            </div>
        </div>
        <h3>${producto.nombre}</h3>
        <p class="modal-description">${producto.descripcion}</p>
        <p class="modal-details">${producto.detalles || ''}</p>
    `;

    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (producto.imagenes && producto.imagenes.length > 1) {
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
        
        prevBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + producto.imagenes.length) % producto.imagenes.length;
            updateModalImage(producto, currentImageIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % producto.imagenes.length;
            updateModalImage(producto, currentImageIndex);
        });
    } else {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    }

    productModal.classList.add('active');
}

modalCloseBtn.addEventListener('click', () => {
    productModal.classList.remove('active');
});

productModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        productModal.classList.remove('active');
    }
});

searchInput.addEventListener('input', filtrarProductos);

document.addEventListener('DOMContentLoaded', () => {
    generarProductos(productos, productGrid);
    generarProductos(servicios, servicesGrid);
});