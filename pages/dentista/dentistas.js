// Dados mockados
let dentistas = [
    { id: 1, name: "Dr. João Silva", cro: "12345", category: "Ortodontista", endereco: "Rua A, 123", telefone: "(11) 98765-4321" },
    { id: 2, name: "Dra. Maria Oliveira", cro: "54321", category: "Periodontista", endereco: "Av. B, 456", telefone: "(11) 91234-5678" },
];

// Gerador de ID para novos dentistas
let nextId = dentistas.length + 1;

// Função para carregar dentistas
function loadDentistas() {
    const tableBody = document.getElementById('dentistasTable');
    tableBody.innerHTML = ''; // Limpa tabela antes de popular

    dentistas.forEach(dentista => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${dentista.id}</td>
            <td>${dentista.name}</td>
            <td>${dentista.cro}</td>
            <td>${dentista.category}</td>
            <td>${dentista.endereco}</td>
            <td>${dentista.telefone}</td>
            <td>
                <button onclick="editDentista(${dentista.id})">Editar</button>
                <button onclick="deleteDentista(${dentista.id})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Função para salvar dentista
function saveDentista(event) {
    event.preventDefault();

    const id = document.getElementById('dentistaId').value;
    const dentista = {
        id: id ? parseInt(id) : nextId++, // Define ID existente ou próximo ID
        name: document.getElementById('dentistaName').value,
        cro: document.getElementById('dentistaCro').value,
        category: document.getElementById('dentistaCategory').value,
        endereco: document.getElementById('dentistaEndereco').value,
        telefone: document.getElementById('dentistaTelefone').value,
    };

    if (id) {
        // Atualiza dentista existente
        const index = dentistas.findIndex(d => d.id === parseInt(id));
        if (index !== -1) dentistas[index] = dentista;
    } else {
        // Adiciona novo dentista
        dentistas.push(dentista);
    }

    closeModal();
    loadDentistas();
}

// Função para editar dentista
function editDentista(id) {
    const dentista = dentistas.find(d => d.id === id);
    if (!dentista) return alert('Dentista não encontrado!');

    document.getElementById('dentistaId').value = dentista.id;
    document.getElementById('dentistaName').value = dentista.name;
    document.getElementById('dentistaCro').value = dentista.cro;
    document.getElementById('dentistaCategory').value = dentista.category;
    document.getElementById('dentistaEndereco').value = dentista.endereco;
    document.getElementById('dentistaTelefone').value = dentista.telefone;

    openModal();
}

// Função para excluir dentista
function deleteDentista(id) {
    if (!confirm('Tem certeza que deseja excluir este dentista?')) return;
    dentistas = dentistas.filter(d => d.id !== id);
    loadDentistas();
}

// Funções para abrir/fechar modal
function openModal() {
    document.getElementById('dentistaModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('dentistaModal').style.display = 'none';
    document.getElementById('dentistaForm').reset();
}

// Inicializar tabela de dentistas
document.getElementById('addDentistaBtn').addEventListener('click', openModal);
document.getElementById('closeDentistaModal').addEventListener('click', closeModal);
document.getElementById('dentistaForm').addEventListener('submit', saveDentista);

// Carregar dentistas ao iniciar
loadDentistas();
