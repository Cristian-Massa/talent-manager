import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  // Ejemplo: Crear usuarios
  await prisma.workers.createMany({
    data: [
      {
        email: "admin@example.com",
        password: await bcrypt.hash("admin123", 10),
      },
      {
        email: "user@example.com",
        password: await bcrypt.hash("admin123", 10),
      },
    ],
  });

  // Ejemplo: Crear tecnologías
  await prisma.technologies.createMany({
    data: [{ name: "React" }, { name: "Node.js" }, { name: "TypeScript" }],
  });

  console.log("Seed data inserted successfully!");
}

main()
  .catch((e) => {
    console.error("Error running seed script:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
