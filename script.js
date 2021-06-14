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
const view_all = document.querySelector("#main-view");

const clear_all = document.querySelector("#clear-all");
const clear = document.querySelector("#clear");
const backspace = document.querySelector("#backspace");
const negativo = document.querySelector("#negativo");
const virgula = document.querySelector("#virgula");

const divisao = document.querySelector("#divisao");
const multiplicacao = document.querySelector("#multiplicacao");
const subtracao = document.querySelector("#subtracao");
const adicao = document.querySelector("#adicao");
const igual = document.querySelector("#igual");

// Botão limpar tudo
clear_all.addEventListener("click", function () {
  view_all.innerHTML = "0";
});

// Botão limpar atual
clear.addEventListener("click", function () {
  view_all.innerHTML = "0";
  view.innerHTML = "0";
});
