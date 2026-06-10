const lenguajesData = [
    { nombre: 'JavaScript', cat: 'frontend' },
    { nombre: 'TypeScript', cat: 'frontend' },
    { nombre: 'Dart', cat: 'frontend' },
    { nombre: 'Python', cat: 'backend' },
    { nombre: 'PHP', cat: 'backend' },
    { nombre: 'Ruby', cat: 'backend' },
    { nombre: 'Java', cat: 'backend' },
    { nombre: 'Go', cat: 'backend' },
    { nombre: 'Rust', cat: 'backend' },
    { nombre: 'Zig', cat: 'backend' },
    { nombre: 'C#', cat: 'backend' },
    { nombre: 'C', cat: 'backend' },
    { nombre: 'C++', cat: 'backend' },
    { font: 'Elixir', cat: 'backend' },
    { nombre: 'Kotlin', cat: 'mobile' },
    { nombre: 'Swift', cat: 'mobile' },
    { nombre: 'SQL', cat: 'data' },
    { nombre: 'R', cat: 'data' },
    { nombre: 'Julia', cat: 'data' },
    { nombre: 'Scala', cat: 'data' },
    { nombre: 'MATLAB', cat: 'data' }
];

const scriptsRepositorio = {
    cryptoPy: {
        nombre: 'crypto_vault.py',
        codigo: `import hashlib
import os

def hash_password(password: str) -> str:
    """Aplica algoritmo SHA-256 criptográfico seguro con sal (Salt)."""
    salt = os.urandom(16)
    pw_hash = hashlib.pbkdf2_hmac(
        'sha256', 
        password.encode('utf-8'), 
        salt, 
        100000
    )
    return (salt + pw_hash).hex()

def verify_password(stored_hex: str, provided_password: str) -> bool:
    """Verifica de forma segura contraseñas contra hash almacenado."""
    stored_bytes = bytes.fromhex(stored_hex)
    salt = stored_bytes[:16]
    original_hash = stored_bytes[16:]
    new_hash = hashlib.pbkdf2_hmac(
        'sha256', 
        provided_password.encode('utf-8'), 
        salt, 
        100000
    )
    return new_hash == original_hash`
    },
    luhnJs: {
        nombre: 'luhn_validator.ts',
        codigo: `// Validador asíncrono de transacciones mediante Algoritmo de Luhn
async function validarTarjetaCredito(numeroTarjeta: string): Promise<boolean> {
    return new Promise((resolve) => {
        setTimeout(() => {
            let numLimpio = numeroTarjeta.replace(/\\D/g, '');
            let suma = 0;
            let jalarPar = false;

            for (let i = numLimpio.length - 1; i >= 0; i--) {
                let digito = parseInt(numLimpio.charAt(i), 10);
                if (jalarPar) {
                    digito *= 2;
                    if (digito > 9) digito -= 9;
                }
                suma += digito;
                jalarPar = !jalarPar;
            }
            resolve((suma % 10) === 0);
        }, 400); // Simulación de retraso de red de microservicio
    });
}`
    },
    metricsSql: {
        nombre: 'metrics_analytics.sql',
        codigo: `-- Query avanzada para análisis financiero de usuarios (LTV y Retención)
WITH metricas_usuario AS (
    SELECT 
        user_id,
        COUNT(id) AS total_ordenes,
        SUM(monto_total) AS ingresos_totales,
        MIN(fecha_compra) AS primera_compra,
        MAX(fecha_compra) AS ultima_compra
    FROM ventas.ordenes
    WHERE estado = 'completado'
    GROUP BY user_id
)
SELECT 
    user_id,
    total_ordenes,
    ingresos_totales,
    (ingresos_totales / total_ordenes) AS ticket_promedio,
    EXTRACT(DAY FROM (ultima_compra - primera_compra)) AS dias_activo
FROM metricas_usuario
WHERE ingresos_totales > 500
ORDER BY ingresos_totales DESC;`
    }
};

let activeKey = 'cryptoPy';

document.addEventListener('DOMContentLoaded', () => {
    generarBurbujasBackend();
    filtrarTecnologias('todos');
    cargarCodigoEnIDE('cryptoPy');
    configurarTerminal();
});

function generarBurbujasBackend() {
    const ocean = document.getElementById('ocean-simulation');
    if (!ocean) return;
    for (let i = 0; i < 20; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'runtime-bubble';
        const size = Math.random() * 25 + 8;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}vw`;
        bubble.style.bottom = `-${size + 20}px`;
        bubble.style.animationDuration = `${Math.random() * 6 + 9}s`;
        bubble.style.animationDelay = `${Math.random() * 4}s`;
        ocean.appendChild(bubble);
    }
}

function filtrarTecnologias(categoria) {
    const contenedor = document.getElementById('tech-container');
    if (!contenedor) return;
    contenedor.innerHTML = '';
    
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    }

    const filtrados = categoria === 'todos' ? lenguajesData : lenguajesData.filter(l => l.cat === categoria);
    
    filtrados.forEach(lang => {
        if(lang.nombre) {
            contenedor.innerHTML += `<div class="tech-box"><span>${lang.nombre}</span></div>`;
        }
    });
}

function cargarCodigoEnIDE(key) {
    activeKey = key;
    const items = document.querySelectorAll('.project-item');
    items.forEach(item => item.classList.remove('active'));
    
    if(key === 'cryptoPy') items[0]?.classList.add('active');
    if(key === 'luhnJs') items[1]?.classList.add('active');
    if(key === 'metricsSql') items[2]?.classList.add('active');

    const script = scriptsRepositorio[key];
    document.getElementById('ide-filename').textContent = script.nombre;
    
    const display = document.getElementById('ide-code-display');
    display.textContent = script.codigo;

    const lineas = script.codigo.split('\n').length;
    const linesContainer = document.getElementById('ide-lines');
    linesContainer.innerHTML = '';
    for (let i = 1; i <= lineas; i++) {
        linesContainer.innerHTML += `<div>${i}</div>`;
    }
}

function copiarCodigoAlPortapapeles() {
    const codigo = scriptsRepositorio[activeKey].codigo;
    navigator.clipboard.writeText(codigo).then(() => {
        alert('¡Código copiado al portapapeles con éxito!');
    });
}

function descargarArchivoFuente() {
    const script = scriptsRepositorio[activeKey];
    const blob = new Blob([script.codigo], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = script.nombre;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function configurarTerminal() {
    const input = document.getElementById('cli-input');
    const pantalla = document.getElementById('terminal-screen');
    if (!input || !pantalla) return;
    
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const valor = input.value.trim();
            const comando = valor.toLowerCase();
            input.value = '';
            
            pantalla.innerHTML += `<div class="terminal-line"><span style="color: #4cc9f0;">guest@jfza.dev:~$</span> ${valor}</div>`;
            
            if (comando === 'help') {
                pantalla.innerHTML += `<div class="terminal-line">Comandos disponibles:</div>`;
                pantalla.innerHTML += `<div class="terminal-line">  <span class="highlight-text">skills</span>  - Muestra un resumen del perfil políglota</div>`;
                pantalla.innerHTML += `<div class="terminal-line">  <span class="highlight-text">status</span>  - Consulta el estado de los servidores de Jhon</div>`;
                pantalla.innerHTML += `<div class="terminal-line">  <span class="highlight-text">clear</span>   - Limpia la consola de comandos</div>`;
            } else if (comando === 'skills') {
                pantalla.innerHTML += `<div class="terminal-line">Cargando perfil técnico de Jhon... [OK]</div>`;
                pantalla.innerHTML += `<div class="terminal-line">Stack: 21 Lenguajes Core (Rust, Go, Python, Elixir, C++, JavaScript...)</div>`;
            } else if (comando === 'status') {
                pantalla.innerHTML += `<div class="terminal-line">SYSTEM STATUS: <span style="color: #52b788; font-weight: bold;">ONLINE</span></div>`;
                pantalla.innerHTML += `<div class="terminal-line">Seguridad del Entorno: Criptografía SHA-256 Activa.</div>`;
            } else if (comando === 'clear') {
                pantalla.innerHTML = '';
            } else if (comando !== '') {
                pantalla.innerHTML += `<div class="terminal-line" style="color: #ff5252;">Error: Comando '${valor}' no reconocido. Escribe 'help'.</div>`;
            }
            
            pantalla.scrollTop = pantalla.scrollHeight;
        }
    });
}
