// lib/auth.ts

import NextAuth from 'next-auth'
import type { NextAuthConfig } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Resend from 'next-auth/providers/resend'
import Google from 'next-auth/providers/google'
import { prisma } from './prisma'

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Magic link via email (Resend)
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: 'DocExpress <noreply@docexpress.fr>',
    }),
    // Google OAuth (optionnel)
    ...(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
      ? [
          Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
          }),
        ]
      : []),
  ],
  pages: {
    signIn: '/login',
    verifyRequest: '/verify-email',
    error: '/auth-error',
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
  events: {
    async createUser({ user }) {
      // Créer automatiquement un abonnement gratuit pour les nouveaux utilisateurs
      if (user.id) {
        await prisma.subscription.create({
          data: {
            userId: user.id,
            plan: 'free',
            status: 'active',
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 jours
          },
        })
      }
    },
  },
  session: {
    strategy: 'database',
  },
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)

// Helper pour obtenir la session côté serveur
export async function getServerSession() {
  return await auth()
}
