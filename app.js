document.addEventListener("DOMContentLoaded", () => {
    // --- LÓGICA DEL MENÚ HAMBURGUESA ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }

    // --- LÓGICA DINÁMICA PARA EL LINK ACTIVO ---
    // Esta nueva sección soluciona el problema.
    const navLinks = document.querySelectorAll(".nav-link");
    // Obtenemos el nombre del archivo de la URL actual (ej: "delicias.html").
    // Si la ruta está vacía (página principal), la tratamos como "index.html".
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');

        // Comparamos el href del enlace con la página actual y agregamos la clase si coinciden.
        if (linkPage === currentPage) {
            link.classList.add('active-page');
        }
    });


    // --- LÓGICA DE LA PÁGINA DE PROPIEDADES ---
    const productsContainer = document.getElementById("products");
    const searchButton = document.getElementById("search");
    const nameInput = document.getElementById("search-input-name");
    const manzanaInput = document.getElementById("search-input-manzana");

    // Si no estamos en una página con contenedor de productos, no continuamos.
    if (!productsContainer) {
        return;
    }

    // Función para crear y mostrar las tarjetas de propiedades
    const renderProducts = (data) => {
        productsContainer.innerHTML = ""; // Limpiar contenedor
        if (data.length === 0) {
            productsContainer.innerHTML = "<p>No se encontraron resultados para su búsqueda.</p>";
            return;
        }

        for (let item of data) {
            let card = document.createElement("div");
            card.classList.add("card");

            let container = document.createElement("div");
            container.classList.add("container");

            let name = document.createElement("h5");
            name.classList.add("product-name");
            name.innerText = item.posesionario.toUpperCase();
            container.appendChild(name);

            let manzanaEjido = document.createElement("p");
            manzanaEjido.innerHTML = `<strong>Manzana Ejidal:</strong> ${item.manzanaEjido}`;
            container.appendChild(manzanaEjido);

            let manzanaRAN = document.createElement("p");
            manzanaRAN.innerHTML = `<strong>Manzana RAN:</strong> ${item.manzanaRAN}`;
            container.appendChild(manzanaRAN);

            let solarRAN = document.createElement("p");
            solarRAN.innerHTML = `<strong>Solar RAN:</strong> ${item.solarRAN}`;
            container.appendChild(solarRAN);

            let solarEjido = document.createElement("p");
            solarEjido.innerHTML = `<strong>Solar Ejidal:</strong> ${item.solarEjido}`;
            container.appendChild(solarEjido);
            
            let superficie = document.createElement("p");
            superficie.innerHTML = `<strong>Superficie:</strong> ${item.superficie}`;
            container.appendChild(superficie);

            let ubicacion = document.createElement("p");
            ubicacion.innerHTML = `<strong>Ubicación:</strong> ${item.ubicacion || "No disponible"}`;
            container.appendChild(ubicacion);

            let direccion = document.createElement("p");
            direccion.innerHTML = `<strong>Dirección:</strong> ${item.direccion || "No disponible"}`;
            container.appendChild(direccion);

            card.appendChild(container);
            productsContainer.appendChild(card);
        }
    };

    // Función de búsqueda
    const search = () => {
        const nameValue = nameInput.value.toUpperCase().trim();
        const manzanaValue = manzanaInput.value.toUpperCase().trim();

        const filteredData = propiedades.filter(item => {
            const nameMatch = item.posesionario.toUpperCase().includes(nameValue);
            const manzanaMatch = item.manzanaEjido.toUpperCase().includes(manzanaValue);
            return nameMatch && manzanaMatch;
        });

        renderProducts(filteredData);
    };

    // Event Listeners para la búsqueda
    if (searchButton) {
        searchButton.addEventListener("click", search);
        nameInput.addEventListener("keyup", (e) => { if (e.key === "Enter") search(); });
        manzanaInput.addEventListener("keyup", (e) => { if (e.key === "Enter") search(); });
    }

    // Carga inicial de todos los productos
    if (typeof propiedades !== 'undefined') {
        renderProducts(propiedades);
    }
});