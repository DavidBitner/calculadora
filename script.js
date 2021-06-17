"use strict";

// Ripple effect
function create_ripple(event) {
  const btn = event.currentTarget;

  const circle = document.createElement("span");
  const diameter = Math.max(btn.clientWidth, btn.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - (btn.offsetLeft + radius)}px`;
  circle.style.top = `${event.clientY - (btn.offsetTop + radius)}px`;
  circle.classList.add("ripple");

  const ripple = btn.getElementsByClassName("ripple")[0];
  if (ripple) {
    ripple.remove();
  }

  btn.appendChild(circle);
}

const btns = document.getElementsByTagName("a");
for (const btn of btns) {
  btn.addEventListener("click", create_ripple);
}

// Variaveis
const view = document.querySelector("#view");
const main_view = document.querySelector("#main-view");

const clear = document.querySelector("#clear");
const clear_all = document.querySelector("#clear-all");
const backspace = document.querySelector("#backspace");
const negativo = document.querySelector("#negativo");
const virgula = document.querySelector("#virgula");

const divisao = document.querySelector("#divisao");
const multiplicacao = document.querySelector("#multiplicacao");
const subtracao = document.querySelector("#subtracao");
const adicao = document.querySelector("#adicao");
const igual = document.querySelector("#igual");

const numeros = document.getElementsByClassName("btn-numero");

let operacao = "none";

// Função de limpeza
function limpar(main = 0, sec = false, txt = "") {
  if (sec) {
    view.innerHTML = txt;
  }

  main_view.innerHTML = main;
}

// Função para transferir numero do visor de baixo para o de cima
function transferir(op = "none") {
  let main = main_view.textContent;

  if (main.slice(-1) == ",") {
    main = main.replace(",", "");
  }

  limpar(0, true, main + ` ${op}`);
}

// Função de resolução da conta
function resolucao(igual = false) {
  let primeiro = view.textContent.slice(0, -2);
  let segundo = main_view.textContent;
  let resultado = 0;

  if (primeiro.includes(",")) {
    primeiro = primeiro.replace(",", ".");
  }
  if (segundo.includes(",")) {
    segundo = segundo.replace(",", ".");
  }

  primeiro = Number(primeiro);
  segundo = Number(segundo);

  if (operacao == "÷") {
    resultado = primeiro / segundo;
  } else if (operacao == "*") {
    resultado = primeiro * segundo;
  } else if (operacao == "-") {
    resultado = primeiro - segundo;
  } else if (operacao == "+") {
    resultado = primeiro + segundo;
  }

  resultado = String(resultado);

  if (resultado.includes(".")) {
    resultado = resultado.replace(".", ",");
  }

  if (view.textContent != 0 && main_view.textContent != 0) {
    if (igual) {
      limpar(resultado, true, 0);
      operacao = "none";
    } else {
      limpar(0, true, resultado + ` ${operacao}`);
    }
  }
}

// Função de quando os botões das operações da conta forem clicados
/* Essa função serve para garantir que a calculadora fara a operação 
certa depois de clicar em um botão da operação, sem essa função a 
calculadora não muda a operação caso já exista uma conta sendo feita. */
function operador(operador = "") {
  if (operacao == "none") {
    operacao = operador;
    transferir(operacao);
  } else {
    resolucao();
    operacao = operador;
    limpar(0, true, view.textContent.slice(0, -1) + operacao);
  }
}

// Botão limpar tudo
clear.addEventListener("click", function () {
  limpar();
});

// Botão limpar atual
clear_all.addEventListener("click", function () {
  limpar(0, true, 0);
  operacao = "none";
});

// Botão backspace
backspace.addEventListener("click", function () {
  if (main_view.textContent.length > 1) {
    let txt = main_view.textContent.slice(0, -1);
    limpar(txt);
  } else {
    limpar();
  }
});

// Botões dos numeros
for (const numero of numeros) {
  numero.addEventListener("click", function () {
    if (main_view.textContent == 0) {
      limpar(numero.textContent);
    } else {
      main_view.innerHTML += numero.textContent;
    }
  });
}

// Botões das operações
divisao.addEventListener("click", function () {
  operador("÷");
});

multiplicacao.addEventListener("click", function () {
  operador("*");
});

subtracao.addEventListener("click", function () {
  operador("-");
});

adicao.addEventListener("click", function () {
  operador("+");
});

igual.addEventListener("click", function () {
  resolucao(true);
});

// Botão negativo
negativo.addEventListener("click", function () {
  let n = main_view.textContent;

  if (n.includes(",")) {
    n = n.replace(",", ".");
  }

  n = Number(n);

  if (n > 0 || n < 0) {
    n *= -1;
  }

  n = String(n);

  if (n.includes(".")) {
    n = n.replace(".", ",");
  }

  limpar(n);
});

// Botão virgula
virgula.addEventListener("click", function () {
  let n = main_view.textContent;
  if (!n.includes(",")) {
    n += ",";
  }
  limpar(n);
});
