import { PrismaClient } from '@prisma/client';

/**
 * Prisma client singleton.
 *
 * Using a single instance avoids the "Too many connections" problem in
 * environments where modules are re‑loaded (e.g., during hot‑reloading in
 * development). The client is lazily instantiated the first time it is
 * imported.
 */
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  // In production we create a new client for each request cycle to avoid
  // retaining connections across Lambda/edge executions. Adjust as needed.
  prisma = new PrismaClient();
} else {
  // In development we reuse the same instance.
  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient();
  }
  prisma = globalThis.prisma;
}

export default prisma;

