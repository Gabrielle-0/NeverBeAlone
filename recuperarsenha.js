
/**
 * Exibe uma notificação toast temporária.
 * @param {string} mensagem O texto a ser exibido no toast.
 * @param {number} [duracao=3000] Duração em milissegundos.
 */
function mostrarToast(mensagem, duracao = 3000) {
    if (document.querySelector(".toast-notificacao")) {
        // Remove toasts antigos se houver
        document.querySelector(".toast-notificacao").remove();
    }

    const toast = document.createElement("div");
    toast.classList.add("toast-notificacao");
    toast.textContent = mensagem;

    document.body.appendChild(toast);
    void toast.offsetWidth; // Força reflow
    toast.classList.add("ativo");

    setTimeout(() => {
        // Inicia a animação de saída
        toast.classList.remove("ativo");

        // Remove o elemento do DOM após a animação de saída
        toast.addEventListener('transitionend', () => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, { once: true });
        
        // Timeout de segurança (fallback)
        setTimeout(() => {
             if (toast.parentElement) toast.remove();
        }, 500); 
    }, duracao);
}

// -----------------------------
// LÓGICA DE RECUPERAÇÃO 
// -----------------------------
document.getElementById("recuperarForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    // Verifica se o campo email existe antes de tentar pegá-lo
    const emailInput = document.getElementById("email");
    if (!emailInput) return; 
    
    const email = emailInput.value.trim();

    // Regex básica para validar formato de e-mail
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailValido) {
        // Toast de erro
        mostrarToast("Por favor, digite um endereço de e-mail válido!", 4000); 
        return;
    }

    // Toast de sucesso. Duração da mensagem é de 3.5 segundos.
    mostrarToast("Se o e-mail existir em nossa base, enviaremos um link de recuperação.", 3500);
    
    // Atraso de 1.5 segundo (1500ms) para limpar o formulário.
    // Isso garante que o usuário veja a mensagem antes do reset acontecer.
    setTimeout(() => {
        this.reset(); 
    }, 1500);
});