function getEnvVar(key: string): string {
  const variable = process.env[key];

  if (!variable) {
    throw Error(`Environment variable ${key} not found`);
  }

  return variable;
}

export default getEnvVar;
