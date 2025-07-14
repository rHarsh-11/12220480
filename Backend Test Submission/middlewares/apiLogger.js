import { Log } from 'logging-middleware/log';

export async function apiLogger(stack, level, pkg, message) {
  try {
    await Log(stack, level, pkg, message);   
  } catch (err) {
    process.stderr.write(`LogFailed: ${err.message}\n`);
  }
}