const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Teste - Inglês pra Já</title>
        <style>
            body { 
                margin: 0; 
                padding: 40px; 
                background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
                color: white; 
                font-family: Arial, sans-serif;
                text-align: center;
            }
            .container { max-width: 600px; margin: 0 auto; }
            h1 { font-size: 3em; margin-bottom: 20px; }
            button { 
                background: #6b46c1; 
                color: white; 
                border: none; 
                padding: 15px 30px; 
                border-radius: 25px; 
                font-size: 18px; 
                cursor: pointer;
                margin: 10px;
            }
            button:hover { background: #553c9a; }
            #status { margin-top: 30px; padding: 20px; background: rgba(0,0,0,0.3); border-radius: 10px; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚀 Inglês pra Já</h1>
            <p>Página de teste para verificar se os botões estão funcionando</p>
            
            <button onclick="testMenu()">📱 Teste Menu Mobile</button>
            <button onclick="testLogin()">🔐 Teste Login</button>
            <button onclick="testModal()">📋 Teste Modal</button>
            
            <div id="status">
                <h3>Status dos Testes:</h3>
                <div id="results"></div>
            </div>
        </div>

        <script>
            function addResult(test, status) {
                const results = document.getElementById('results');
                results.innerHTML += '<div>' + test + ': ' + status + '</div>';
            }

            function testMenu() {
                addResult('Menu Mobile', '✅ Clique funcionando');
                alert('Menu mobile clicado! Isso simula abrir o menu.');
            }

            function testLogin() {
                addResult('Login Button', '✅ Clique funcionando');
                alert('Botão de login clicado! Isso abriria o modal de login.');
            }

            function testModal() {
                addResult('Modal Test', '✅ Simulando modal');
                if (confirm('Modal de teste. Quer "logar"?')) {
                    addResult('Modal Login', '✅ Login simulado com sucesso');
                    alert('Login simulado! Redirecionaria para /dashboard');
                }
            }

            // Teste automático ao carregar
            document.addEventListener('DOMContentLoaded', function() {
                addResult('Página', '✅ Carregada com sucesso');
                addResult('JavaScript', '✅ Funcionando');
                addResult('CSS', '✅ Estilos carregados');
            });
        </script>
    </body>
    </html>
  `);
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log('🌟 Servidor de teste funcionando em:');
  console.log('   http://localhost:' + PORT);
  console.log('\n🧪 Use esta página para testar se os botões funcionam');
  console.log('📱 Teste no mobile e desktop');
});