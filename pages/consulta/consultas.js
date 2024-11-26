// Dados mockados
let consultas = [
    { id: 1, hora: "10:00", cliente: "Ana Souza", dentista: "Dr. João Silva", agenda: "2024-12-01" },
    { id: 2, hora: "11:00", cliente: "Carlos Silva", dentista: "Dra. Maria Oliveira", agenda: "2024-12-02" },
];

let nextIdConsulta = consultas.length + 1;

// Função para carregar consultas
function loadConsultas() {
    const tableBody = document.getElementById('consultasTable');
    tableBody.innerHTML = '';

    consultas.forEach(consulta => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${consulta.id}</td>
            <td>${consulta.hora}</td>
            <td>${consulta.cliente}</td>
            <td>${consulta.dentista}</td>
            <td>${consulta.agenda}</td>
            <td>
                <button onclick="editConsulta(${consulta.id})">Editar</button>
                <button onclick="deleteConsulta(${consulta.id})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Função para salvar consulta
function saveConsulta(event) {
    event.preventDefault();

    const id = document.getElementById('consultaId').value;
    const consulta = {
        id: id ? parseInt(id) : nextIdConsulta++,
        hora: document.getElementById('consultaHora').value,
        cliente: document.getElementById('consultaCliente').value,
        dentista: document.getElementById('consultaDentista').value,
        agenda: document.getElementById('consultaAgenda').value,
    };

    if (id) {
        const index = consultas.findIndex(c => c.id === parseInt(id));
        if (index !== -1) consultas[index] = consulta;
    } else {
        consultas.push(consulta);
    }

    closeModalConsulta();
    loadConsultas();
}

// Função para editar consulta
function editConsulta(id) {
    const consulta = consultas.find(c => c.id === id);
    if (!consulta) return alert('Consulta não encontrada!');

    document.getElementById('consultaId').value = consulta.id;
    document.getElementById('consultaHora').value = consulta.hora;
    document.getElementById('consultaCliente').value = consulta.cliente;
    document.getElementById('consultaDentista').value = consulta.dentista;
    document.getElementById('consultaAgenda').value = consulta.agenda;

    openModalConsulta();
}

// Função para excluir consulta
function deleteConsulta(id) {
    if (!confirm('Tem certeza que deseja excluir esta consulta?')) return;
    consultas = consultas.filter(c => c.id !== id);
    loadConsultas();
}

// Funções para abrir/fechar modal
function openModalConsulta() {
    document.getElementById('consultaModal').style.display = 'flex';
}

function closeModalConsulta() {
    document.getElementById('consultaModal').style.display = 'none';
    document.getElementById('consultaForm').reset();
}

// Inicializar tabela de consultas
document.getElementById('addConsultaBtn').addEventListener('click', openModalConsulta);
document.getElementById('closeConsultaModal').addEventListener('click', closeModalConsulta);
document.getElementById('consultaForm').addEventListener('submit', saveConsulta);

// Carregar consultas ao iniciar
loadConsultas();
