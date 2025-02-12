import { pinoLogger } from 'hono-pino';
import pino from 'pino';
import pretty from 'pino-pretty';
import { LOG_LEVEL } from '$env/static/private';

const { MODE } = import.meta.env;

export function pinoLoggerMiddleware() {
    return pinoLogger({
        pino: pino({
            level: LOG_LEVEL || 'info'
        }, MODE === 'development' ? pretty() : undefined),
        http: {
            reqId: () => crypto.randomUUID()
        }
    });
}