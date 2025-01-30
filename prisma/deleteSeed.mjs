import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function cleanup() {
  try {
    await prisma.educational_projects.deleteMany({});

    await prisma.candidate.deleteMany({});

    await prisma.institute.deleteMany({});

    await prisma.technologies.deleteMany({});

    await prisma.languages.deleteMany({});

    await prisma.time_zone.deleteMany({});

    await prisma.countries.deleteMany({});

    await prisma.users.deleteMany({});

    console.log("Cleanup completed successfully!");
  } catch (error) {
    console.error("Error during cleanup:", error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanup();
