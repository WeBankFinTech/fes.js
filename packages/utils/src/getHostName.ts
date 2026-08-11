import process from 'node:process';

export default (userHost?: string): string => process.env.HOST || userHost || '0.0.0.0';
