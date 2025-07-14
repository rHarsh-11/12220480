export async function Log(stack, level, _package, message) {
  try {
    const response = await fetch('http://20.244.56.144/evaluation-service/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_LOG_TOKEN}`
      },
      body: JSON.stringify({ stack, level, package: _package, message })
    });
    return await response.json();
  } catch (err) {
    console.error('Failed to log (frontend)', err);
  }
}
