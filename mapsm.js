
/*
 * Exibe uma notificação toast temporária.
 */
function mostrarToast(mensagem, duracao = 3000) {
    // Evita acúmulo de toasts
    if (document.querySelector(".toast-notificacao")) {
        document.querySelector(".toast-notificacao").remove();
    }

    const toast = document.createElement("div");
    toast.classList.add("toast-notificacao");
    toast.textContent = mensagem;

    document.body.appendChild(toast);
    void toast.offsetWidth; // Força reflow
    toast.classList.add("ativo");

    setTimeout(() => {
        toast.classList.remove("ativo");
        toast.addEventListener('transitionend', () => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, { once: true });
        
        setTimeout(() => {
             if (toast.parentElement) toast.remove();
        }, 500); 
    }, duracao);
}

// -----------------------------
// LÓGICA PRINCIPAL DO MAPSM.JS
// -----------------------------
document.addEventListener('DOMContentLoaded', () => {
    const filtroForm = document.getElementById('filtroForm');
    const cepInput = document.getElementById('cep');
    const todosCheckbox = document.getElementById('todosCheckbox');
    const tipoCheckboxes = document.querySelectorAll('.checkbox-group input[name="tipo"]:not(#todosCheckbox)');

    // 1. Limite de CEP e filtro para aceitar apenas números
    cepInput.addEventListener('input', (event) => {
        // Remove qualquer caractere que não seja dígito
        event.target.value = event.target.value.replace(/\D/g, '');
        
        // Limita a 8 dígitos (fallback para o atributo maxlength)
        if (event.target.value.length > 8) {
            event.target.value = event.target.value.slice(0, 8);
        }
    });

    // 2. Lógica para a opção "Todos" (Desmarcar/Marcar todas as opções de tipo)
    todosCheckbox.addEventListener('change', () => {
        const isChecked = todosCheckbox.checked;
        
        // Se "Todos" foi desmarcado, desmarca todos os outros.
        if (!isChecked) {
            tipoCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
        } 
        // Se "Todos" foi marcado, marca todos os outros.
        else {
             tipoCheckboxes.forEach(checkbox => {
                checkbox.checked = true;
            });
        }
    });

    // 3. Lógica para desmarcar "Todos" se uma opção individual for desmarcada
    tipoCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            // Se qualquer checkbox individual for desmarcado, desmarca o "Todos"
            if (!checkbox.checked) {
                todosCheckbox.checked = false;
            } else {
                // Se todas as opções individuais estiverem marcadas, marca o "Todos"
                let allChecked = true;
                tipoCheckboxes.forEach(cb => {
                    if (!cb.checked) {
                        allChecked = false;
                    }
                });
                todosCheckbox.checked = allChecked;
            }
        });
    });

    // 4. Evento de SUBMIT (alert substituído por mostrarToast)
    filtroForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        
        // Verifica se pelo menos um tipo foi selecionado (além do "Todos")
        const tiposSelecionados = document.querySelectorAll('.checkbox-group input[name="tipo"]:checked');
        if (tiposSelecionados.length === 0) {
            // SUBSTITUIÇÃO DO ALERT
            mostrarToast('Por favor, selecione pelo menos um "Tipo" de serviço ou marque "Todos".', 4000);
            return;
        }

        buscarLocalizacao();
    });

    // 5. Função de busca no Google Maps
    function buscarLocalizacao() {
        const estadoSelect = document.getElementById('estado');
        const estado = estadoSelect.value !== 'Todos' ? estadoSelect.value : '';

        const cidade = document.getElementById('cidade').value;
        const formato = document.getElementById('formato').value;
        const pagamento = document.getElementById('pagamento').value;

        // Coletar Tipos de serviço (excluindo 'Todos' da string de busca)
        const tiposSelecionados = [];
        const checkedBoxes = document.querySelectorAll('.checkbox-group input[name="tipo"]:checked');
        
        checkedBoxes.forEach(checkbox => {
            if (checkbox.value !== 'Todos') {
                tiposSelecionados.push(checkbox.value);
            }
        });

        // Montar a consulta
        let consulta = 'Serviços de Saúde Mental';

        if (tiposSelecionados.length > 0) {
            // Se houver tipos específicos, inclua-os
            consulta = tiposSelecionados.join(' OU ') + ' ';
        }
        
        consulta += ` ${formato} ${pagamento}`;
        

        // Montar a URL de localização
        let localizacao = `${consulta}`;
        
        // Adiciona cidade e estado (que são obrigatórios)
        localizacao += ` em ${cidade}, ${estado}`;
        
        // Adiciona o CEP se preenchido
        const cep = cepInput.value.trim();
        if (cep && cep.length === 8) { 
            localizacao += ` CEP ${cep}`;
        }

        // Codifica a string para a URL
        const queryParam = encodeURIComponent(localizacao.trim());

        // URL base de pesquisa do Google Maps
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${queryParam}`;

        // Abre o Google Maps em uma nova aba
        window.open(googleMapsUrl, '_blank');
    }
});