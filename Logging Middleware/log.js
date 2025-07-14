import fetch from 'node-fetch';
import { getToken } from './tokenManager.js';

export async function Log(stack, level, pkg, message) {
  try {
    const token = await getToken();

    const res = await fetch('http://20.244.56.144/evaluation-service/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        stack: stack.toLowerCase(),
        level: level.toLowerCase(),
        package: pkg.toLowerCase(),
        message
      })
    });

    const data = await res.json();
    if (!res.ok) {
      console.error(`Log failed: ${data.message}`);
    } else {
      console.info(`Log sent: ${data.logID}`);
    }
  } catch (err) {
    console.error(`Logging Error: ${err.message}`);
  }
}
