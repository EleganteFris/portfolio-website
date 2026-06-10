// Data y Lógica de Alta Fidelidad para Portafolio (Resumen)
const lenguajesData = [
    { nombre: 'JavaScript', cat: 'frontend' }, { nombre: 'Python', cat: 'backend' },
    { nombre: 'Swift', cat: 'mobile' }, { nombre: 'SQL', cat: 'data' }
];

const scriptsRepositorio = {
    cryptoPy: { nombre: 'crypto_vault.py', codigo: '# Motor Criptográfico...' },
    luhnJs: { nombre: 'luhn_validator.ts', codigo: '// Validador...' }
};

document.addEventListener('DOMContentLoaded', () => {
    filtrarTecnologias('todos');
    cargarCodigoEnIDE('cryptoPy');
    configurarTerminal();
});

// Filtro Dinámico del Stack
function filtrarTecnologias(categoria) {
    const contenedor = document.getElementById('tech-container');
    contenedor.innerHTML = '';
    const filtrados = categoria === 'todos' ? lenguajesData : lenguajesData.filter(l => l.cat === categoria);
    filtrados.forEach(lang => {
        contenedor.innerHTML += `<div class="tech-box"><span>${lang.nombre}</span></div>`;
    });
}

// Lógica del IDE: Carga de código y simulación de VS Code
function cargarCodigoEnIDE(key) {
    const objetoScript = scriptsRepositorio[key];
    document.getElementById('ide-filename').textContent = objetoScript.nombre;
    document.getElementById('ide-code-display').textContent = objetoScript.codigo;
}

// Simulador CLI: Interpreta comandos en la consola
function configurarTerminal() {
    const input = document.getElementById('cli-input');
    const pantalla = document.getElementById('terminal-screen');
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const comando = input.value.trim().toLowerCase();
            input.value = '';
            pantalla.innerHTML += `<div>guest@jfza.dev:~$ ${comando}</div>`;
            if (comando === 'help') pantalla.innerHTML += '<div>Comandos: help, status, clear</div>';
            pantalla.scrollTop = pantalla.scrollHeight;
        }
    });
}
