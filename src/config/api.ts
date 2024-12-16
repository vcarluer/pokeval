const getEnvVar = (key: string): string => {
  const value = import.meta.env[key];
  if (!value) {
    console.warn(`La variable d'environnement ${key} n'est pas définie`);
    return '';
  }
  return value;
};

export const API_CONFIG = {
  TCG_API_KEY: getEnvVar('VITE_TCG_API_KEY'),
  OPENAI_API_KEY: getEnvVar('VITE_OPENAI_API_KEY')
};