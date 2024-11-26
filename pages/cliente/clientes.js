// Dados mockados
let clientes = [
    { id: 1, nome: "Ana Souza", email: "ana.souza@gmail.com", telefone: "(11) 98765-4321", dataNascimento: "1990-05-01", sexo: "Feminino", endereco: "Rua A, 123" },
    { id: 2, nome: "Carlos Silva", email: "carlos.silva@gmail.com", telefone: "(11) 91234-5678", dataNascimento: "1985-10-15", sexo: "Masculino", endereco: "Av. B, 456" },
];

let nextIdCliente = clientes.length + 1;

// Função para carregar clientes
function loadClientes() {
    const tableBody = document.getElementById('clientesTable');
    tableBody.innerHTML = '';

    clientes.forEach(cliente => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cliente.id}</td>
            <td>${cliente.nome}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefone}</td>
            <td>${cliente.dataNascimento}</td>
            <td>${cliente.sexo}</td>
            <td>${cliente.endereco}</td>
            <td>
                <button onclick="editCliente(${cliente.id})">Editar</button>
                <button onclick="deleteCliente(${cliente.id})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Função para salvar cliente
function saveCliente(event) {
    event.preventDefault();

    const id = document.getElementById('clienteId').value;
    const cliente = {
        id: id ? parseInt(id) : nextIdCliente++,
        nome: document.getElementById('clienteNome').value,
        email: document.getElementById('clienteEmail').value,
        telefone: document.getElementById('clienteTelefone').value,
        dataNascimento: document.getElementById('clienteDataNascimento').value,
        sexo: document.getElementById('clienteSexo').value,
        endereco: document.getElementById('clienteEndereco').value,
    };

    if (id) {
        const index = clientes.findIndex(c => c.id === parseInt(id));
        if (index !== -1) clientes[index] = cliente;
    } else {
        clientes.push(cliente);
    }

    closeModalCliente();
    loadClientes();
}

// Função para editar cliente
function editCliente(id) {
    const cliente = clientes.find(c => c.id === id);
    if (!cliente) return alert('Cliente não encontrado!');

    document.getElementById('clienteId').value = cliente.id;
    document.getElementById('clienteNome').value = cliente.nome;
    document.getElementById('clienteEmail').value = cliente.email;
    document.getElementById('clienteTelefone').value = cliente.telefone;
    document.getElementById('clienteDataNascimento').value = cliente.dataNascimento;
    document.getElementById('clienteSexo').value = cliente.sexo;
    document.getElementById('clienteEndereco').value = cliente.endereco;

    openModalCliente();
}

// Função para excluir cliente
function deleteCliente(id) {
    if (!confirm('Tem certeza que deseja excluir este cliente?')) return;
    clientes = clientes.filter(c => c.id !== id);
    loadClientes();
}

// Funções para abrir/fechar modal
function openModalCliente() {
    document.getElementById('clienteModal').style.display = 'flex';
}

function closeModalCliente() {
    document.getElementById('clienteModal').style.display = 'none';
    document.getElementById('clienteForm').reset();
}

// Inicializar tabela de clientes
document.getElementById('addClienteBtn').addEventListener('click', openModalCliente);
document.getElementById('closeClienteModal').addEventListener('click', closeModalCliente);
document.getElementById('clienteForm').addEventListener('submit', saveCliente);

// Carregar clientes ao iniciar
loadClientes();
