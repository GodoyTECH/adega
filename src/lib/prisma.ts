let prismaInstance: any;

export function getPrisma() {
  if (!prismaInstance) {
    // dynamic require avoids importing Prisma client during static build analysis
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { PrismaClient } = require('@prisma/client');
    prismaInstance = new PrismaClient();
  }
  return prismaInstance;
}
