import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  // Insertar usuarios
  await prisma.users.createMany({
    data: [
      {
        email: "admin@example.com",
        password: await bcrypt.hash("admin12345678", 10),
        role: "admin",
        verified: true,
        verify_token: "token_admin",
      },
      {
        email: "user@example.com",
        password: await bcrypt.hash("user12345678", 10),
        role: "user",
        verified: true,
        verify_token: "token_user",
      },
    ],
  });

  // Insertar países
  await prisma.countries.createMany({
    data: [{ name: "United States" }, { name: "Canada" }, { name: "Mexico" }],
  });

  // Insertar zonas horarias
  await prisma.time_zone.createMany({
    data: [{ name: "UTC-5" }, { name: "UTC-6" }, { name: "UTC-7" }],
  });

  // Insertar lenguajes
  await prisma.languages.createMany({
    data: [{ name: "English" }, { name: "Spanish" }, { name: "French" }],
  });

  // Insertar tecnologías
  await prisma.technologies.createMany({
    data: [{ name: "React" }, { name: "Node.js" }, { name: "TypeScript" }],
  });

  // Insertar institutos
  await prisma.institute.createMany({
    data: [
      { name: "Harvard University" },
      { name: "Stanford University" },
      { name: "MIT" },
    ],
  });

  // Insertar candidatos
  const users = await prisma.users.findMany();
  const countries = await prisma.countries.findMany();
  const timeZones = await prisma.time_zone.findMany();
  await prisma.languages.findMany();
  await prisma.technologies.findMany();
  const institutes = await prisma.institute.findMany();

  await prisma.candidate.createMany({
    data: [
      {
        birth_day: new Date("1990-01-01"),
        country_id: countries[0].time_zone_id, // Usar el ID del primer país
        time_zone_id: timeZones[0].time_zone_id, // Usar el ID de la primera zona horaria
        motivation_text: "I love coding!",
        image: "https://example.com/image1.jpg",
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        user_id: users[0].user_id, // Asociar al primer usuario
      },
      {
        birth_day: new Date("1995-05-15"),
        country_id: countries[1].time_zone_id, // Usar el ID del segundo país
        time_zone_id: timeZones[1].time_zone_id, // Usar el ID de la segunda zona horaria
        motivation_text: "Passionate about technology!",
        image: "https://example.com/image2.jpg",
        firstname: "Jane",
        lastname: "Smith",
        email: "jane.smith@example.com",
        user_id: users[1].user_id, // Asociar al segundo usuario
      },
    ],
  });

  // Insertar proyectos educativos
  const candidates = await prisma.candidate.findMany();
  await prisma.educational_projects.createMany({
    data: [
      {
        institute_id: institutes[0].institute_id, // Usar el ID del primer instituto
        position: "Student",
        time_in_position: "4 years",
        description: "Studied Computer Science",
        candidate_id: candidates[0].candidate_id, // Asociar al primer candidato
      },
      {
        institute_id: institutes[1].institute_id, // Usar el ID del segundo instituto
        position: "Researcher",
        time_in_position: "2 years",
        description: "Conducted AI research",
        candidate_id: candidates[1].candidate_id, // Asociar al segundo candidato
      },
    ],
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
