// Dados mockados
let agendas = [
    { id: 1, date: "2024-12-01", cliente: "Ana Souza", dentista: "Dr. João Silva" },
    { id: 2, date: "2024-12-02", cliente: "Carlos Silva", dentista: "Dra. Maria Oliveira" },
];

let nextIdAgenda = agendas.length + 1;

// Função para carregar agendas
function loadAgendas() {
    const tableBody = document.getElementById('agendasTable');
    tableBody.innerHTML = '';

    agendas.forEach(agenda => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${agenda.id}</td>
            <td>${agenda.date}</td>
            <td>${agenda.cliente}</td>
            <td>${agenda.dentista}</td>
            <td>
                <button onclick="editAgenda(${agenda.id})">Editar</button>
                <button onclick="deleteAgenda(${agenda.id})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Função para salvar agenda
function saveAgenda(event) {
    event.preventDefault();

    const id = document.getElementById('agendaId').value;
    const agenda = {
        id: id ? parseInt(id) : nextIdAgenda++,
        date: document.getElementById('agendaDate').value,
        cliente: document.getElementById('agendaCliente').value,
        dentista: document.getElementById('agendaDentista').value,
    };

    if (id) {
        const index = agendas.findIndex(a => a.id === parseInt(id));
        if (index !== -1) agendas[index] = agenda;
    } else {
        agendas.push(agenda);
    }

    closeModalAgenda();
    loadAgendas();
}

// Função para editar agenda
function editAgenda(id) {
    const agenda = agendas.find(a => a.id === id);
    if (!agenda) return alert('Agenda não encontrada!');

    document.getElementById('agendaId').value = agenda.id;
    document.getElementById('agendaDate').value = agenda.date;
    document.getElementById('agendaCliente').value = agenda.cliente;
    document.getElementById('agendaDentista').value = agenda.dentista;

    openModalAgenda();
}

// Função para excluir agenda
function deleteAgenda(id) {
    if (!confirm('Tem certeza que deseja excluir esta agenda?')) return;
    agendas = agendas.filter(a => a.id !== id);
    loadAgendas();
}

// Funções para abrir/fechar modal
function openModalAgenda() {
    document.getElementById('agendaModal').style.display = 'flex';
}

function closeModalAgenda() {
    document.getElementById('agendaModal').style.display = 'none';
    document.getElementById('agendaForm').reset();
}

// Inicializar tabela de agendas
document.getElementById('addAgendaBtn').addEventListener('click', openModalAgenda);
document.getElementById('closeAgendaModal').addEventListener('click', closeModalAgenda);
document.getElementById('agendaForm').addEventListener('submit', saveAgenda);

// Carregar agendas ao iniciar
loadAgendas();
