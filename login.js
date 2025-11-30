document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let email = document.getElementById("email").value.trim();
    let senha = document.getElementById("senha").value.trim();

    // Validação de Campos Vazios
    if (email === "" || senha === "") {
        mostrarToast("Preencha todos os campos!", 3000); 
        return;
    }

    // Validação de Comprimento da Senha
    if (senha.length < 6) {
        mostrarToast("A senha deve ter pelo menos 6 caracteres.", 3000); 
        return;
    }

    // Login Bem-Sucedido
    mostrarToast("Login realizado com sucesso!", 3000); 
    this.reset();
    
    
    setTimeout(() => {
        window.location.href = 'mapsm.html';
    }, 500); 
});