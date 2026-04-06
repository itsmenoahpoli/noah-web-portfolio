/**
 * Verifies Prisma can write to the configured database.
 * Usage: npm run db:test-write
 */
import "dotenv/config";
import { PrismaClient } from "@prisma/client";

if (!process.env.DATABASE_URL) {
  console.error("Set DATABASE_URL in .env");
  process.exit(1);
}

const prisma = new PrismaClient();

try {
  const project = await prisma.project.create({
    data: {
      title: "__db_write_test__",
      description: "Temporary row to verify Prisma + MongoDB",
      image: "/placeholder.svg",
      technologies: "test",
      githubUrl: "https://github.com",
      liveUrl: "https://github.com",
    },
  });
  console.log("Create OK, id:", project.id);
  await prisma.project.delete({ where: { id: project.id } });
  console.log("Delete OK — database writes work.");
} catch (e) {
  console.error(e.message || e);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
