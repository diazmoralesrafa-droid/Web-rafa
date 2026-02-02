// Ejecutar al cargar la página
window.onload = function() {
  mostrarTrabajadores();
  mostrarPresencias();
};

// Botones
document.getElementById('btnRegistrarTrabajador').addEventListener('click', registrarTrabajador);
document.getElementById('btnRegistrarPresencia').addEventListener('click', registrarPresencia);

// Función para registrar trabajador
function registrarTrabajador() {
  const dni = document.getElementById('dniTrabajador').value.trim();
  const nombre = document.getElementById('nombreTrabajador').value.trim();
  const telefono = document.getElementById('telefonoTrabajador').value.trim();
  const correo = document.getElementById('correoTrabajador').value.trim();

  if (!dni || !nombre || !telefono || !correo) {
    alert("Por favor completa todos los campos");
    return;
  }

  let trabajadores = JSON.parse(localStorage.getItem('trabajadores')) || [];

  if (trabajadores.some(t => t.dni === dni)) {
    alert("El trabajador con este DNI ya existe");
    return;
  }

  trabajadores.push({ dni, nombre, telefono, correo });
  localStorage.setItem('trabajadores', JSON.stringify(trabajadores));

  mostrarTrabajadores();
  alert("Trabajador registrado con éxito");

  document.getElementById('dniTrabajador').value = '';
  document.getElementById('nombreTrabajador').value = '';
  document.getElementById('telefonoTrabajador').value = '';
  document.getElementById('correoTrabajador').value = '';
}

// Mostrar lista de trabajadores
function mostrarTrabajadores() {
  const lista = document.getElementById('listaTrabajadores');
  const trabajadores = JSON.parse(localStorage.getItem('trabajadores')) || [];
  lista.innerHTML = '';
  trabajadores.forEach(t => {
    lista.innerHTML += `<div class="list-item">${t.dni} - ${t.nombre} - ${t.telefono} - ${t.correo}</div>`;
  });
}

// Función para registrar presencia
function registrarPresencia() {
  const dni = document.getElementById('dniPresencia').value.trim();
  const fecha = document.getElementById('fechaPresencia').value;
  const hora = document.getElementById('horaPresencia').value;

  if (!dni || !fecha || !hora) {
    alert("Completa todos los campos para registrar la presencia");
    return;
  }

  const trabajadores = JSON.parse(localStorage.getItem('trabajadores')) || [];
  if (!trabajadores.some(t => t.dni === dni)) {
    alert("El DNI no corresponde a ningún trabajador registrado");
    return;
  }

  let presencias = JSON.parse(localStorage.getItem('presencias')) || [];
  presencias.push({ dni, fecha, hora });
  localStorage.setItem('presencias', JSON.stringify(presencias));

  mostrarPresencias();
  alert("Presencia registrada");

  document.getElementById('dniPresencia').value = '';
  document.getElementById('fechaPresencia').value = '';
  document.getElementById('horaPresencia').value = '';
}

// Mostrar lista de presencias
function mostrarPresencias() {
  const lista = document.getElementById('listaPresencia');
  const presencias = JSON.parse(localStorage.getItem('presencias')) || [];
  lista.innerHTML = '';
  presencias.forEach(p => {
    lista.innerHTML += `<div class="list-item">${p.dni} - ${p.fecha} - ${p.hora}</div>`;
  });
}
