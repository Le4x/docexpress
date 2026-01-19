// lib/prisma.ts
// Note: Run `npx prisma generate` after setting up the database

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let PrismaClientConstructor: any

try {
  // Essayer d'importer le client Prisma généré
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  PrismaClientConstructor = require('@prisma/client').PrismaClient
} catch {
  // Si Prisma n'est pas généré, créer un mock
  PrismaClientConstructor = class MockPrismaClient {
    user = {
      findUnique: async () => null,
      update: async () => null,
      create: async () => null,
    }
    subscription = {
      findUnique: async () => null,
      upsert: async () => null,
      updateMany: async () => ({ count: 0 }),
      create: async () => null,
    }
    document = {
      findMany: async () => [],
      create: async () => null,
      deleteMany: async () => ({ count: 0 }),
    }
    monthlyUsage = {
      upsert: async () => null,
    }
    account = {}
    session = {}
    verificationToken = {}
    organization = {}
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalForPrisma = globalThis as unknown as { prisma: any }

function createPrismaClient() {
  return new PrismaClientConstructor({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma
