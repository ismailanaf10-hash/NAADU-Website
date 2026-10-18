import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export function getDatabaseUrl(): string {
  const envUrl = process.env.DATABASE_URL?.trim();

  // If a custom cloud database URL (e.g. Postgres on Neon/Supabase) is provided, use it directly
  if (envUrl && !envUrl.startsWith('file:')) {
    return envUrl;
  }

  // Handle SQLite file paths
  const baseDir = process.cwd();
  const bundledDbPath = path.resolve(baseDir, 'prisma', 'dev.db');

  // When running on Vercel Serverless environment, filesystem is read-only except /tmp
  if (process.env.VERCEL === '1') {
    const tmpDbPath = path.join('/tmp', 'dev.db');
    try {
      if (!fs.existsSync(tmpDbPath) && fs.existsSync(bundledDbPath)) {
        fs.copyFileSync(bundledDbPath, tmpDbPath);
      }
      if (fs.existsSync(tmpDbPath)) {
        return `file:${tmpDbPath}`;
      }
    } catch (err) {
      console.warn('Could not copy SQLite database to /tmp, falling back to bundled path:', err);
    }
  }

  // If envUrl is explicitly provided as file:
  if (envUrl && envUrl.startsWith('file:')) {
    const rawPath = envUrl.replace(/^file:/, '');
    if (path.isAbsolute(rawPath)) {
      return `file:${rawPath}`;
    }
    const resolved = rawPath.includes('prisma')
      ? path.resolve(baseDir, rawPath)
      : path.resolve(baseDir, 'prisma', rawPath);
    return `file:${resolved}`;
  }

  return `file:${bundledDbPath}`;
}

function getPrismaClient(): PrismaClient {
  if (!globalForPrisma.prisma) {
    const dbUrl = getDatabaseUrl();
    globalForPrisma.prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
      datasources: {
        db: {
          url: dbUrl,
        },
      },
    });
  }
  return globalForPrisma.prisma;
}

export const db: PrismaClient = new Proxy({} as PrismaClient, {
  get(target, prop) {
    const client = getPrismaClient();
    return (client as any)[prop];
  },
});

export default db;
