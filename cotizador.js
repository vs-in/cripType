let monedaEl_one = document.getElementById("moneda-uno");
let monedaEl_two = document.getElementById("moneda-dos");
let cantidadEl_one = document.getElementById("cantidad-uno");
let cantidadEl_two = document.getElementById("cantidad-dos");
let cambioEl = document.getElementById("cambio");
let tazaEl = document.getElementById("taza");

//fetch
function calculate() {
  const moneda_one = monedaEl_one.value;
  const moneda_two = monedaEl_two.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${moneda_one}`)
    .then((res) => res.json())
    .then((data) => {
      const taza = data.rates[moneda_two];

      cambioEl.innerText = `1 ${moneda_one} = ${taza} ${moneda_two}`;

      cantidadEl_two.value = (cantidadEl_one.value * taza).toFixed(2);
    });
}

//eventos
monedaEl_one.addEventListener("change", calculate);
cantidadEl_one.addEventListener("input", calculate);
monedaEl_two.addEventListener("change", calculate);
cantidadEl_two.addEventListener("input", calculate);

taza.addEventListener("click", () => {
  const temp = monedaEl_one.value;
  monedaEl_one.value = monedaEl_two.value;
  monedaEl_two.value = temp;
  calculate();
});

calculate();
