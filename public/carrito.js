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

function cambiarCantidad(id, delta) {
  const items = leerCarrito();
  const item = items.find((i) => i.id === id);
  if (!item) return;

  item.cantidad += delta;

  if (item.cantidad <= 0) {
    guardarCarrito(items.filter((i) => i.id !== id));
  } else {
    guardarCarrito(items);
  }
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
    fila.className = "flex items-center justify-between gap-3 py-3 border-b border-black/10";
    fila.innerHTML = `
      <div class="min-w-0 flex-1">
        <p class="truncate text-sm text-ink">${item.nombre} — ${item.volumenMl}ml</p>
        <p class="text-xs text-ink/50">${formatCLP(item.precio)} c/u · ${formatCLP(subtotal)}</p>
      </div>
      <div class="flex shrink-0 items-center gap-2">
        <div class="flex items-center rounded-full border border-black/15">
          <button type="button" data-restar="${item.id}" aria-label="Restar" class="flex h-7 w-7 items-center justify-center text-ink/60 hover:text-ink">−</button>
          <span class="w-5 text-center text-sm text-ink">${item.cantidad}</span>
          <button type="button" data-sumar="${item.id}" aria-label="Sumar" class="flex h-7 w-7 items-center justify-center text-ink/60 hover:text-ink">+</button>
        </div>
        <button type="button" data-quitar="${item.id}" aria-label="Quitar por completo" class="text-ink/40 hover:text-wine">✕</button>
      </div>
    `;
    lista.appendChild(fila);
  });

  totalEl.textContent = formatCLP(total);
  btnEnviar.toggleAttribute("disabled", items.length === 0);

  lista.querySelectorAll("[data-restar]").forEach((boton) => {
    boton.addEventListener("click", () => cambiarCantidad(boton.getAttribute("data-restar"), -1));
  });
  lista.querySelectorAll("[data-sumar]").forEach((boton) => {
    boton.addEventListener("click", () => cambiarCantidad(boton.getAttribute("data-sumar"), 1));
  });
  lista.querySelectorAll("[data-quitar]").forEach((boton) => {
    boton.addEventListener("click", () => quitarDelCarrito(boton.getAttribute("data-quitar")));
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
        volumenMl: Number(boton.getAttribute("data-volumen")),
        cantidad,
      });
    });
  });
}

// Selector de presentaciones (ml) con precio propio por perfume.
function inicializarVariantes() {
  document.querySelectorAll("[data-variante-grupo]").forEach((grupo) => {
    const botonesVariante = grupo.querySelectorAll(".variante-btn");
    const precioDisplay = grupo.querySelector("[data-precio-display]");
    const agregarBtn = grupo.querySelector("[data-agregar-carrito]");

    botonesVariante.forEach((boton) => {
      boton.addEventListener("click", () => {
        botonesVariante.forEach((b) => {
          b.classList.remove("border-ink", "bg-ink", "text-white");
          b.classList.add("border-ink/20", "text-ink");
        });
        boton.classList.remove("border-ink/20", "text-ink");
        boton.classList.add("border-ink", "bg-ink", "text-white");

        const ml = boton.getAttribute("data-ml");
        const precio = boton.getAttribute("data-precio");

        if (precioDisplay) precioDisplay.textContent = formatCLP(precio);
        if (agregarBtn) {
          agregarBtn.setAttribute("data-precio", precio);
          agregarBtn.setAttribute("data-volumen", ml);
          const idBase = agregarBtn.getAttribute("data-id-base");
          agregarBtn.setAttribute("data-id", `${idBase}-${ml}`);
        }
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
        `${i + 1}. ${item.nombre} (${item.marca}) - ${item.volumenMl}ml x${item.cantidad} - ${formatCLP(item.precio * item.cantidad)}`
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
  inicializarVariantes();
  inicializarBotonesAgregar();
  inicializarPanel();
  inicializarStepper();
});

window.addEventListener("carrito:actualizado", renderPanel);
