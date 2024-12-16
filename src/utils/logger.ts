type LogLevel = 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
}

const logs: LogEntry[] = [];

const formatTimestamp = (): string => {
  return new Date().toISOString();
};

const createLogEntry = (level: LogLevel, message: string, data?: any): LogEntry => {
  return {
    timestamp: formatTimestamp(),
    level,
    message,
    data
  };
};

export const logError = (message: string, data?: any) => {
  const entry = createLogEntry('error', message, data);
  logs.push(entry);
  console.error(`[${entry.timestamp}] ${message}`, data || '');
};

export const logWarning = (message: string, data?: any) => {
  const entry = createLogEntry('warn', message, data);
  logs.push(entry);
  console.warn(`[${entry.timestamp}] ${message}`, data || '');
};

export const logInfo = (message: string, data?: any) => {
  const entry = createLogEntry('info', message, data);
  logs.push(entry);
  console.log(`[${entry.timestamp}] ${message}`, data || '');
};

export const getLogs = (): LogEntry[] => {
  return [...logs];
};

export const clearLogs = () => {
  logs.length = 0;
};