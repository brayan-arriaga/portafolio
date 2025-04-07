// Simulación de una base de datos
let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

// Función para guardar los clientes en el localStorage
function guardarClientes() {
    localStorage.setItem('clientes', JSON.stringify(clientes));
}

// Función para agregar un nuevo cliente
function agregarCliente(cliente) {
    clientes.push(cliente);
    guardarClientes();
}

// Función para actualizar un cliente existente
function actualizarCliente(index, clienteActualizado) {
    clientes[index] = clienteActualizado;
    guardarClientes();
}

// Función para eliminar un cliente
function eliminarCliente(index) {
    clientes.splice(index, 1);
    guardarClientes();
}

// Función para mostrar los clientes en la tabla
function mostrarClientes() {
    const tabla = document.getElementById('tablaRegistros');
    if (tabla) {
        const tbody = tabla.querySelector('tbody');
        tbody.innerHTML = '';
        clientes.forEach((cliente, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${cliente.nombreCompleto}</td>
                <td>${cliente.correoElectronico}</td>
                <td>${cliente.telefono}</td>
                <td>${cliente.descripcionApp}</td>
                <td>
                    <button onclick="editarCliente(${index})">Editar</button>
                    <button onclick="eliminarClienteConfirmacion(${index})">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }
}

// Función para manejar el envío del formulario de registro
function manejarEnvioRegistro(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const nuevoCliente = Object.fromEntries(formData.entries());
    agregarCliente(nuevoCliente);
    event.target.reset();
    alert('Cliente registrado con éxito');
}

// Función para editar un cliente
function editarCliente(index) {
    const cliente = clientes[index];
    const modal = document.getElementById('editModal');
    const form = document.getElementById('editForm');

    document.getElementById('editNombreCompleto').value = cliente.nombreCompleto;
    document.getElementById('editCorreoElectronico').value = cliente.correoElectronico;
    document.getElementById('editTelefono').value = cliente.telefono;
    document.getElementById('editDescripcionApp').value = cliente.descripcionApp;

    modal.style.display = 'block';

    form.onsubmit = function(e) {
        e.preventDefault();
        const clienteActualizado = {
            nombreCompleto: document.getElementById('editNombreCompleto').value,
            correoElectronico:  document.getElementById('editCorreoElectronico').value,
            telefono: document.getElementById('editTelefono').value,
            descripcionApp: document.getElementById('editDescripcionApp').value
        };
        actualizarCliente(index, clienteActualizado);
        modal.style.display = 'none';
        mostrarClientes();
    };
}

// Función para confirmar la eliminación de un cliente
function eliminarClienteConfirmacion(index) {
    if (confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
        eliminarCliente(index);
        mostrarClientes();
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    const registroForm = document.getElementById('registroForm');
    if (registroForm) {
        registroForm.addEventListener('submit', manejarEnvioRegistro);
    }

    const cancelEdit = document.getElementById('cancelEdit');
    if (cancelEdit) {
        cancelEdit.addEventListener('click', function() {
            document.getElementById('editModal').style.display = 'none';
        });
    }

    mostrarClientes();
});