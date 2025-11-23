// -----------------------------
// 1. FIXAR MENU AO ROLAR
// -----------------------------
window.addEventListener("scroll", function () {
    const header = document.querySelector("header");

    if (window.scrollY > 50) {
        header.classList.add("fixo");
    } else {
        header.classList.remove("fixo");
    }
});

// -----------------------------
// 2. ROLAGEM SUAVE NOS LINKS
// -----------------------------
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const alvo = document.querySelector(this.getAttribute("href"));
        if (alvo) {
            alvo.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// -----------------------------
// 3. EFEITO FADE-IN AO ROLAR
// -----------------------------
const elementos = document.querySelectorAll("section, h1, h2, h3, h4, p, li");

function mostrarAoRolar() {
    elementos.forEach(el => {
        const posicao = el.getBoundingClientRect().top;
        const alturaJanela = window.innerHeight * 0.9;

        if (posicao < alturaJanela) {
            el.classList.add("mostrar");
        }
    });
}

window.addEventListener("scroll", mostrarAoRolar);
window.addEventListener("load", mostrarAoRolar);
