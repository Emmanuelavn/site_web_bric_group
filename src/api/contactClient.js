// Simple client wrapper for sending contact messages from the front-end
export async function sendContact(data) {
  const endpoint = process.env.REACT_APP_CONTACT_ENDPOINT || '/api/contact';

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Erreur serveur lors de l\'envoi du message');
  }

  return res.json();
}
