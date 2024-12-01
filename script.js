document.addEventListener("DOMContentLoaded", () => {
    // Funcionalidad del Carrusel
    const images = document.querySelectorAll("#quienes-somos .image-carousel img");
    let currentIndex = 0;

    if (images.length > 0) {
        // Inicializa la primera imagen como activa
        images[currentIndex].classList.add("active");

        setInterval(() => {
            // Quitar la clase 'active' de la imagen actual
            images[currentIndex].classList.remove("active");

            // Calcular el índice de la siguiente imagen
            currentIndex = (currentIndex + 1) % images.length;

            // Agregar la clase 'active' a la nueva imagen
            images[currentIndex].classList.add("active");
        }, 3000); // Cambia la imagen cada 3 segundos
    }

    // Funcionalidad de las Pestañas
    const tabs = document.querySelectorAll(".tab-link");
    const contents = document.querySelectorAll(".tab-content");

    if (tabs.length > 0 && contents.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                // Remover la clase activa de todas las pestañas
                tabs.forEach(t => t.classList.remove("active"));
                contents.forEach(content => (content.style.display = "none"));

                // Activar la pestaña actual
                tab.classList.add("active");
                const activeTab = document.getElementById(tab.dataset.tab);
                if (activeTab) activeTab.style.display = "block";
            });
        });

        // Activar la primera pestaña por defecto
        tabs[0].click();
    }

    // Funcionalidad del Listado Desplegable (Acordeón)
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    if (accordionHeaders.length > 0) {
        accordionHeaders.forEach(header => {
            header.addEventListener("click", () => {
                const content = header.nextElementSibling;

                if (content) {
                    // Alternar la visibilidad del contenido
                    const isVisible = content.style.display === "block";
                    document.querySelectorAll(".accordion-content").forEach(otherContent => {
                        otherContent.style.display = "none"; // Cierra otros acordeones
                    });

                    content.style.display = isVisible ? "none" : "block"; // Mostrar/ocultar el actual
                }
            });
        });
    }

    // Funcionalidad de las pestañas en los integrantes del comité
    const integrantesTabs = document.querySelectorAll(".integrantes-tabs button");
    const integrantesColumns = document.querySelectorAll(".integrantes-columns .column");

    if (integrantesTabs.length > 0 && integrantesColumns.length > 0) {
        // Activar la primera pestaña y mostrar ambas columnas por defecto
        integrantesTabs[0].classList.add("active");
        integrantesColumns.forEach((column, index) => {
            column.style.display = "block"; // Mostrar ambas columnas
        });

        // Evento para alternar entre pestañas (si decides ocultar por defecto)
        integrantesTabs.forEach((tab, index) => {
            tab.addEventListener("click", () => {
                // Remover la clase activa de todos los botones
                integrantesTabs.forEach(t => t.classList.remove("active"));
                tab.classList.add("active");

                // Alternar visibilidad de columnas (si se requiere)
                integrantesColumns.forEach((column, colIndex) => {
                    column.style.display = colIndex === index ? "block" : "none";
                });
            });
        });
    }

    // Limitar las listas de integrantes y agregar barra de desplazamiento
    const integrantesLists = document.querySelectorAll(".column ul");
    integrantesLists.forEach(list => {
        list.style.overflowY = "auto"; // Barra de desplazamiento vertical
        list.style.maxHeight = "200px"; // Altura máxima visible
    });

    // Funcionalidad del Slider en Proyectos con Desplazamiento Manual
    const sliderWrapper = document.querySelector(".slider-wrapper");
    const slider = document.querySelector(".slider");
    let isDragging = false;
    let startX;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;

    if (sliderWrapper && slider) {
        // Manejadores de eventos para arrastrar
        slider.addEventListener("mousedown", startDrag);
        slider.addEventListener("touchstart", startDrag);
        slider.addEventListener("mousemove", drag);
        slider.addEventListener("touchmove", drag);
        slider.addEventListener("mouseup", endDrag);
        slider.addEventListener("mouseleave", endDrag);
        slider.addEventListener("touchend", endDrag);

        function startDrag(e) {
            isDragging = true;
            startX = getPositionX(e);
            sliderWrapper.style.transition = "none"; // Deshabilita la transición al arrastrar
            animationID = requestAnimationFrame(animation);
        }

        function drag(e) {
            if (!isDragging) return;
            const currentX = getPositionX(e);
            currentTranslate = prevTranslate + currentX - startX;
        }

        function endDrag() {
            isDragging = false;
            cancelAnimationFrame(animationID);
            prevTranslate = currentTranslate; // Actualiza la posición previa
        }

        function getPositionX(e) {
            return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
        }

        function animation() {
            sliderWrapper.style.transform = `translateX(${currentTranslate}px)`;
            if (isDragging) requestAnimationFrame(animation);
        }
    }
});
