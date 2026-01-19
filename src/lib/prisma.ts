// lib/prisma.ts
// Configuration pour Vercel Postgres avec Prisma Accelerate

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let PrismaClientConstructor: any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let withAccelerate: any

try {
  // Essayer d'importer le client Prisma généré
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  PrismaClientConstructor = require('@prisma/client').PrismaClient
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  withAccelerate = require('@prisma/extension-accelerate').withAccelerate
} catch {
  // Si Prisma n'est pas généré, créer un mock
  PrismaClientConstructor = class MockPrismaClient {
    $extends() {
      return this
    }
    user = {
      findUnique: async () => null,
      findMany: async () => [],
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
  withAccelerate = () => ({})
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalForPrisma = globalThis as unknown as { prisma: any }

function createPrismaClient() {
  const client = new PrismaClientConstructor({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })

  // Utiliser Prisma Accelerate en production pour de meilleures performances
  if (process.env.NODE_ENV === 'production' && withAccelerate) {
    return client.$extends(withAccelerate())
  }

  return client
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma
