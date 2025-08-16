const { PrismaClient } = require('@prisma/client');

const host = process.env.DB_HOST || 'localhost';
const database = process.env.DB_DATABASE || '';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `postgresql://postgres@${host}/${database}`,
    },
  },
});

module.exports = prisma;
