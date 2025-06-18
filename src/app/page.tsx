export default function Home() {
  return (
    <div style={{ 
      backgroundColor: 'red', 
      color: 'white', 
      padding: '50px', 
      textAlign: 'center', 
      fontSize: '40px',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1>🚨 TESTE DE DEPLOY - HOME VERMELHA 🚨</h1>
      <p>Se você vê esta página, o deploy do staging está funcionando!</p>
      <p>Data: {new Date().toLocaleString()}</p>
    </div>
  )
}