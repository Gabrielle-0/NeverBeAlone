// -------- MÁSCARA CPF --------
document.getElementById("cpf").addEventListener("input", function () {
    let valor = this.value.replace(/\D/g, ""); 
    if (valor.length > 11) valor = valor.slice(0, 11);

    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{2})$/, "$1-$2");

    this.value = valor;
});

// -------- MÁSCARA CELULAR --------
document.getElementById("celular").addEventListener("input", function () {
    let valor = this.value.replace(/\D/g, "");
    if (valor.length > 11) valor = valor.slice(0, 11);

    if (valor.length >= 1) valor = "(" + valor;
    if (valor.length >= 3) valor = valor.slice(0, 3) + ") " + valor.slice(3);
    if (valor.length >= 9) valor = valor.slice(0, 10) + "-" + valor.slice(10);

    this.value = valor;
});

// -------- VALIDAÇÃO DO FORM --------
document.getElementById("cadastroForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let cpf = document.getElementById("cpf").value.replace(/\D/g, "");
    let cel = document.getElementById("celular").value.replace(/\D/g, "");

    if (cpf.length !== 11) {
        alert("CPF inválido! Deve ter exatamente 11 números.");
        return;
    }

    if (cel.length !== 11) {
        alert("Celular inválido! Deve ter exatamente 11 números.");
        return;
    }

    alert("Cadastro enviado com sucesso!");
    this.submit();
});

