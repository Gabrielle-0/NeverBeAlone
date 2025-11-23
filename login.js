document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let email = document.getElementById("email").value.trim();
    let senha = document.getElementById("senha").value.trim();

    if (email === "" || senha === "") {
        alert("Preencha todos os campos!");
        return;
    }

    if (senha.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres.");
        return;
    }

    alert("Login realizado com sucesso!");
    this.reset();
});

// Animação ao clicar nos botões
document.querySelectorAll("button, .btn-cadastro").forEach(btn => {
    btn.addEventListener("mousedown", () => btn.style.transform = "scale(0.95)");
    btn.addEventListener("mouseup", () => btn.style.transform = "scale(1)");
});


document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');

    // Escuta o evento de submissão do formulário
    form.addEventListener('submit', function(event) {
        // Remove esta linha se você já confia na validação HTML:
        event.preventDefault(); // Impede o envio padrão do formulário

        // Aqui você faria suas validações de JavaScript (ex: validar e-mail/senha)
        // ...
        
        // Se a validação for bem-sucedida, redirecione o usuário:
        // window.location.href é o comando para redirecionar a página.
        window.location.href = 'mapsm.html';
    });
});