export async function onRequest(context) {
  const hash = context.params.hash;
  
  // Redireciona para o VPS onde está o banco
  const apiUrl = `http://161.97.83.44:5001/r/${hash}`;
  
  try {
    // Faz request pro VPS e pega a URL de destino
    const response = await fetch(apiUrl);
    
    if (response.redirected) {
      return Response.redirect(response.url, 302);
    }
    
    return new Response('Link não encontrado', { status: 404 });
  } catch (error) {
    return new Response('Erro ao processar redirect', { status: 500 });
  }
}
