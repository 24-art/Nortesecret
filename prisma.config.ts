import"dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: "postgresql://neondb_owner:npg_iBQbMS08NgOj@ep-wandering-heart-au8s5my4.c-10.us-east-1.aws.neon.tech/neondb?sslmode=require",
  },
});