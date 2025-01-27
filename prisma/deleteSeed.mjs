import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function deleteSeedData() {
  try {
    // Borrar usuarios
    await prisma.workers.deleteMany({});

    // Borrar tecnologías
    await prisma.technologies.deleteMany({});

    console.log("Seed data deleted successfully!");
  } catch (e) {
    console.error("Error deleting seed data:", e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

deleteSeedData();
