/* =========================================================
   🌿 UNCUCHA TA'PË
   JavaScript principal
   Identidad amazónica - Madre de Dios
   ========================================================= */


/* =========================================================
   1. SCROLL SUAVE
   ========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(enlace => {

    enlace.addEventListener("click", function (e) {

        const destino = document.querySelector(this.getAttribute("href"));

        if (!destino) return;

        e.preventDefault();

        destino.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   2. NAVBAR AL HACER SCROLL
   ========================================================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (!navbar) return;

    if (window.scrollY > 60) {

        navbar.classList.add("navbar-scrolled");

    } else {

        navbar.classList.remove("navbar-scrolled");

    }

});


/* =========================================================
   3. ANIMACIONES AL APARECER EN PANTALLA
   ========================================================= */

const elementosAnimados = document.querySelectorAll(
    ".card, " +
    ".product-card, " +
    ".process-card, " +
    ".differential-card, " +
    ".team-card, " +
    ".business-card, " +
    ".gallery-item, " +
    ".stats, " +
    ".impact, " +
    ".design-thinking-card"
);


const observer = new IntersectionObserver(

    (entradas) => {

        entradas.forEach((entrada) => {

            if (entrada.isIntersecting) {

                entrada.target.classList.add("visible");

                observer.unobserve(entrada.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


elementosAnimados.forEach(elemento => {

    elemento.classList.add("scroll-hidden");

    observer.observe(elemento);

});


/* =========================================================
   4. ANIMACIÓN ESCALONADA DE TARJETAS
   ========================================================= */

document.querySelectorAll(
    ".product-card, " +
    ".differential-card, " +
    ".team-card, " +
    ".business-card"
).forEach((card, index) => {

    card.style.transitionDelay = `${index * 0.08}s`;

});


/* =========================================================
   5. DESIGN THINKING INTERACTIVO
   ========================================================= */

const botonesDesign = document.querySelectorAll(
    ".design-thinking button"
);


const etapasDesign = document.querySelectorAll(
    ".design-thinking-card"
);


botonesDesign.forEach((boton, index) => {

    boton.addEventListener("click", () => {

        botonesDesign.forEach(btn => {
            btn.classList.remove("active");
        });

        boton.classList.add("active");


        etapasDesign.forEach(etapa => {
            etapa.classList.remove("active");
        });


        if (etapasDesign[index]) {

            etapasDesign[index].classList.add("active");

            etapasDesign[index].scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }

    });

});


/* =========================================================
   6. CONTADORES ANIMADOS
   ========================================================= */

const contadores = document.querySelectorAll(
    ".stat-number"
);


function animarContador(elemento) {

    const textoOriginal = elemento.textContent.trim();

    const numero = parseFloat(
        textoOriginal.replace(/[^\d.]/g, "")
    );

    if (isNaN(numero)) return;


    const tienePorcentaje =
        textoOriginal.includes("%");

    const tieneSoles =
        textoOriginal.includes("S/");


    let actual = 0;

    const duracion = 1400;

    const incremento =
        numero / (duracion / 16);


    function actualizar() {

        actual += incremento;

        if (actual >= numero) {

            actual = numero;

        }


        let resultado =
            Math.floor(actual);


        if (numero % 1 !== 0) {

            resultado =
                actual.toFixed(2);

        }


        if (tieneSoles) {

            elemento.textContent =
                `S/${resultado}`;

        } else if (tienePorcentaje) {

            elemento.textContent =
                `${resultado}%`;

        } else {

            elemento.textContent =
                resultado;

        }


        if (actual < numero) {

            requestAnimationFrame(actualizar);

        }

    }


    actualizar();

}


/* Activar contadores solo cuando entren en pantalla */

const observerContadores = new IntersectionObserver(

    (entradas, observer) => {

        entradas.forEach(entrada => {

            if (entrada.isIntersecting) {

                animarContador(entrada.target);

                observer.unobserve(entrada.target);

            }

        });

    },

    {
        threshold: 0.7
    }

);


contadores.forEach(contador => {

    observerContadores.observe(contador);

});


/* =========================================================
   7. EFECTO PARALLAX SUAVE EN EL HERO
   ========================================================= */

const hero = document.querySelector(".hero");
const heroContent = document.querySelector(".hero-content");


if (hero && heroContent) {

    window.addEventListener("mousemove", (e) => {

        const x =
            (window.innerWidth / 2 - e.clientX) / 80;

        const y =
            (window.innerHeight / 2 - e.clientY) / 80;


        heroContent.style.transform =
            `translate(${x}px, ${y}px)`;

    });

}


/* =========================================================
   8. EFECTO DE PROFUNDIDAD EN TARJETAS
   ========================================================= */

const tarjetas = document.querySelectorAll(
    ".product-card, " +
    ".differential-card, " +
    ".team-card"
);


tarjetas.forEach(tarjeta => {

    tarjeta.addEventListener("mousemove", (e) => {

        const rect =
            tarjeta.getBoundingClientRect();


        const x =
            e.clientX - rect.left;

        const y =
            e.clientY - rect.top;


        const centroX =
            rect.width / 2;

        const centroY =
            rect.height / 2;


        const rotacionX =
            ((y - centroY) / centroY) * -2;


        const rotacionY =
            ((x - centroX) / centroX) * 2;


        tarjeta.style.transform =
            `perspective(700px)
             rotateX(${rotacionX}deg)
             rotateY(${rotacionY}deg)
             translateY(-7px)`;

    });


    tarjeta.addEventListener("mouseleave", () => {

        tarjeta.style.transform = "";

    });

});


/* =========================================================
   9. BOTÓN "VOLVER ARRIBA"
   ========================================================= */

const botonArriba =
    document.createElement("button");


botonArriba.innerHTML = "↑";


botonArriba.className =
    "btn-arriba";


botonArriba.setAttribute(
    "aria-label",
    "Volver arriba"
);


document.body.appendChild(botonArriba);


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        botonArriba.classList.add("mostrar");

    } else {

        botonArriba.classList.remove("mostrar");

    }

});


botonArriba.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* =========================================================
   10. DETECTAR SECCIÓN ACTIVA
   ========================================================= */

const secciones =
    document.querySelectorAll("section[id]");


const enlacesNavbar =
    document.querySelectorAll(
        '.navbar a[href^="#"]'
    );


const observerSecciones =
    new IntersectionObserver(

        (entradas) => {

            entradas.forEach(entrada => {

                if (entrada.isIntersecting) {

                    const id =
                        entrada.target.getAttribute("id");


                    enlacesNavbar.forEach(enlace => {

                        enlace.classList.remove("active");

                    });


                    const enlaceActivo =
                        document.querySelector(
                            `.navbar a[href="#${id}"]`
                        );


                    if (enlaceActivo) {

                        enlaceActivo.classList.add("active");

                    }

                }

            });

        },

        {
            threshold: 0.35
        }

    );


secciones.forEach(seccion => {

    observerSecciones.observe(seccion);

});


/* =========================================================
   11. PEQUEÑO EFECTO AL PASAR POR EL LOGO
   ========================================================= */

const logo =
    document.querySelector(".logo");


if (logo) {

    logo.addEventListener("mouseenter", () => {

        logo.style.transform =
            "scale(1.04) rotate(-1deg)";

    });


    logo.addEventListener("mouseleave", () => {

        logo.style.transform = "";

    });

}


/* =========================================================
   12. MENSAJE DE BIENVENIDA
   ========================================================= */

console.log(
    "🌿 Uncucha Ta’pë | Madre de Dios, Perú 🇵🇪"
);

console.log(
    "🥔 Sabores amazónicos transformados en algo crujiente."
);

/* =========================================
   EFECTOS DE SONIDO PARA BOTONES
========================================= */

const sonidoClick = document.getElementById("sonidoClick");
const sonidoHover = document.getElementById("sonidoHover");


/* SONIDO AL HACER CLICK */

document.querySelectorAll("button, a").forEach(elemento => {

    elemento.addEventListener("click", () => {

        if (sonidoClick) {

            sonidoClick.currentTime = 0;
            sonidoClick.volume = 0.50;

            sonidoClick.play().catch(() => {});

        }

    });

});


/* SONIDO AL PASAR EL MOUSE */

document.querySelectorAll(
    "button, a, .galeria-card, .card, .product-card, .team-card"
).forEach(elemento => {

    elemento.addEventListener("mouseenter", () => {

        if (sonidoHover) {

            sonidoHover.currentTime = 0;
            sonidoHover.volume = 0.80;

            sonidoHover.play().catch(() => {});

        }

    });

});

/* =========================================
   MÚSICA DE FONDO
========================================= */

const musicaFondo = document.getElementById("musicaFondo");
const botonSonido = document.getElementById("botonSonido");

let musicaActiva = false;


/* CONFIGURACIÓN */

if (musicaFondo) {
    musicaFondo.volume = 0.30;
}


/* BOTÓN DE MÚSICA */

if (botonSonido) {

    botonSonido.addEventListener("click", () => {

        if (!musicaActiva) {

            musicaFondo.play()
                .then(() => {

                    musicaActiva = true;

                    botonSonido.textContent = "🔊";
                    botonSonido.setAttribute(
                        "aria-label",
                        "Desactivar sonido"
                    );

                })
                .catch(() => {

                    console.log("No se pudo reproducir la música.");

                });

        } else {

            musicaFondo.pause();

            musicaActiva = false;

            botonSonido.textContent = "🔇";

            botonSonido.setAttribute(
                "aria-label",
                "Activar sonido"
            );

        }

    });

}