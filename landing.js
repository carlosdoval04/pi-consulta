// Elementos do DOM
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeLoginModal = document.getElementById('closeLoginModal');
const loginForm = document.getElementById('loginForm');
const loginSubmitBtn = document.getElementById('loginSubmitBtn');

// Função para abrir o modal de login
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

// Fechar o modal
closeLoginModal.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

// Validar e fazer o redirecionamento após login
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Verificação simples de login (usuário admin)
    if (email === 'admin@dentvida.com' && password === 'admin') {
        // Redirecionar para a página de consultas
        window.location.href = './pages/consulta/consultas.html';
    } else {
        alert('E-mail ou senha inválidos');
    }
});
