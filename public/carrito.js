// Carrito simple con localStorage. Se comparte entre todas las páginas
// del sitio porque localStorage persiste mientras el navegador esté abierto.

const CLAVE = "arome_carrito";

function leerCarrito() {
  try {
    const raw = localStorage.getItem(CLAVE);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function guardarCarrito(items) {
  localStorage.setItem(CLAVE, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("carrito:actualizado", { detail: items }));
}

function formatCLP(valor) {
  return Number(valor).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });
}

function agregarAlCarrito(item) {
  const items = leerCarrito();
  const existente = items.find((i) => i.id === item.id);
  if (existente) {
    existente.cantidad += item.cantidad;
  } else {
    items.push(item);
  }
  guardarCarrito(items);
}

function quitarDelCarrito(id) {
  const items = leerCarrito().filter((i) => i.id !== id);
  guardarCarrito(items);
}

function renderPanel() {
  const items = leerCarrito();
  const lista = document.getElementById("carrito-lista");
  const vacio = document.getElementById("carrito-vacio");
  const totalEl = document.getElementById("carrito-total");
  const contador = document.getElementById("carrito-contador");
  const btnEnviar = document.getElementById("carrito-enviar");

  if (!lista || !totalEl || !contador || !btnEnviar || !vacio) return;

  const totalUnidades = items.reduce((sum, i) => sum + i.cantidad, 0);
  contador.textContent = String(totalUnidades);
  contador.classList.toggle("hidden", totalUnidades === 0);

  lista.innerHTML = "";
  vacio.classList.toggle("hidden", items.length > 0);

  let total = 0;
  items.forEach((item) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    const fila = document.createElement("div");
    fila.className = "flex items-center justify-between gap-3 py-2 border-b border-black/10";
    fila.innerHTML = `
      <div class="min-w-0">
        <p class="truncate text-sm text-ink">${item.nombre} ${item.cantidad > 1 ? `× ${item.cantidad}` : ""}</p>
        <p class="text-xs text-ink/50">${formatCLP(subtotal)}</p>
      </div>
      <button type="button" data-quitar="${item.id}" class="shrink-0 text-xs text-ink/50 hover:text-wine">Quitar</button>
    `;
    lista.appendChild(fila);
  });

  totalEl.textContent = formatCLP(total);
  btnEnviar.toggleAttribute("disabled", items.length === 0);

  lista.querySelectorAll("[data-quitar]").forEach((boton) => {
    boton.addEventListener("click", () => {
      quitarDelCarrito(boton.getAttribute("data-quitar"));
    });
  });
}

function inicializarBotonesAgregar() {
  document.querySelectorAll("[data-agregar-carrito]").forEach((boton) => {
    boton.addEventListener("click", () => {
      const cantidadInput = boton.getAttribute("data-cantidad-input");
      const cantidad = cantidadInput
        ? Number(document.getElementById(cantidadInput)?.value || 1)
        : 1;

      agregarAlCarrito({
        id: boton.getAttribute("data-id"),
        nombre: boton.getAttribute("data-nombre"),
        marca: boton.getAttribute("data-marca"),
        precio: Number(boton.getAttribute("data-precio")),
        cantidad,
      });
    });
  });
}

function inicializarPanel() {
  const abrirBtn = document.getElementById("carrito-abrir");
  const panel = document.getElementById("carrito-panel");
  const cerrarBtn = document.getElementById("carrito-cerrar");
  const fondo = document.getElementById("carrito-fondo");

  abrirBtn?.addEventListener("click", () => {
    renderPanel();
    panel?.classList.remove("translate-x-full");
    fondo?.classList.remove("hidden");
  });

  function cerrar() {
    panel?.classList.add("translate-x-full");
    fondo?.classList.add("hidden");
  }

  cerrarBtn?.addEventListener("click", cerrar);
  fondo?.addEventListener("click", cerrar);

  document.getElementById("carrito-enviar")?.addEventListener("click", () => {
    const items = leerCarrito();
    if (items.length === 0) return;
    const lineas = items.map(
      (item, i) =>
        `${i + 1}. ${item.nombre} (${item.marca}) x${item.cantidad} - ${formatCLP(item.precio * item.cantidad)}`
    );
    const total = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    const numero = document.body.dataset.whatsapp;
    const mensaje = encodeURIComponent(
      `Hola, me interesan estos perfumes:\n${lineas.join("\n")}\n\nTotal: ${formatCLP(total)}`
    );
    window.open(`https://wa.me/${numero}?text=${mensaje}`, "_blank");
  });
}

function inicializarStepper() {
  document.querySelectorAll("[data-stepper]").forEach((stepper) => {
    const input = stepper.querySelector("input");
    const menos = stepper.querySelector("[data-menos]");
    const mas = stepper.querySelector("[data-mas]");

    menos?.addEventListener("click", () => {
      const valor = Math.max(1, Number(input.value) - 1);
      input.value = String(valor);
    });

    mas?.addEventListener("click", () => {
      const valor = Number(input.value) + 1;
      input.value = String(valor);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  inicializarBotonesAgregar();
  inicializarPanel();
  inicializarStepper();
});

window.addEventListener("carrito:actualizado", renderPanel);
