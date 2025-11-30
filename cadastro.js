// -----------------------------
// FUNÇÃO DE NOTIFICAÇÃO 
// -----------------------------
/**
 * @param {string} mensagem O texto a ser exibido no toast.
 * @param {number} [duracao=3000] Duração em milissegundos.
 */
function mostrarToast(mensagem, duracao = 3000) {
    const toast = document.createElement("div");
    toast.classList.add("toast-notificacao");
    toast.textContent = mensagem;

    document.body.appendChild(toast);
    void toast.offsetWidth; 
    toast.classList.add("ativo");

    setTimeout(() => {
        toast.classList.remove("ativo");
        toast.addEventListener('transitionend', () => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, { once: true });
        
        // Timeout de segurança
        setTimeout(() => {
             if (toast.parentElement) toast.remove();
        }, 500); 
    }, duracao);
}

// -----------------------------
// MÁSCARA CPF
// -----------------------------
document.getElementById("cpf").addEventListener("input", function () {
    let valor = this.value.replace(/\D/g, ""); 
    if (valor.length > 11) valor = valor.slice(0, 11);

    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{2})$/, "$1-$2");

    this.value = valor;
});

// -----------------------------
// MÁSCARA CELULAR
// -----------------------------
document.getElementById("celular").addEventListener("input", function () {
    let valor = this.value.replace(/\D/g, "");
    if (valor.length > 11) valor = valor.slice(0, 11);

    if (valor.length >= 1) valor = "(" + valor;
    if (valor.length >= 3) valor = valor.slice(0, 3) + ") " + valor.slice(3);
    if (valor.length >= 9) valor = valor.slice(0, 10) + "-" + valor.slice(10);

    this.value = valor;
});

// -----------------------------
// VALIDAÇÃO DO FORM 
// -----------------------------
document.getElementById("cadastroForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let cpf = document.getElementById("cpf").value.replace(/\D/g, "");
    let cel = document.getElementById("celular").value.replace(/\D/g, "");

    if (cpf.length !== 11) {
        mostrarToast("CPF inválido! Deve ter exatamente 11 números.", 4000);
        return;
    }

    if (cel.length !== 11) {
        mostrarToast("Celular inválido! Deve ter exatamente 11 números.", 4000);
        return;
    }

    //  Exibe o toast de sucesso 
    mostrarToast("Cadastro enviado com sucesso!", 2000);
    
    //  1 segundo (1000ms) para garantir que o usuário veja a mensagem
    // antes de o formulário ser submetido (o que causa o redirecionamento/navegação)
    setTimeout(() => {
        this.submit(); 
    }, 1000); 
});