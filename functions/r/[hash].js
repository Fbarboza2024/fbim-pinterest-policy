export async function onRequest(context) {
  const hash = context.params.hash;
  
  // Redireciona para o VPS onde está o url_redirect.py
  const redirectUrl = `http://161.97.83.44:5001/r/${hash}`;
  
  return Response.redirect(redirectUrl, 302);
}
