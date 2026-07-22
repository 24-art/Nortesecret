-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "nortesecret";

-- CreateEnum
CREATE TYPE "nortesecret"."Role" AS ENUM ('CUSTOMER', 'ADMIN');

-- CreateEnum
CREATE TYPE "nortesecret"."Brand" AS ENUM ('ESIKA', 'LBEL', 'CYZONE');

-- CreateTable
CREATE TABLE "nortesecret"."users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "nortesecret"."Role" NOT NULL DEFAULT 'CUSTOMER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nortesecret"."categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nortesecret"."products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "brand" "nortesecret"."Brand" NOT NULL,
    "description" TEXT,
    "content" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "image" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nortesecret"."sales" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nortesecret"."sale_details" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "saleId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "sale_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "nortesecret"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "nortesecret"."categories"("name");

-- AddForeignKey
ALTER TABLE "nortesecret"."products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "nortesecret"."categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nortesecret"."sales" ADD CONSTRAINT "sales_userId_fkey" FOREIGN KEY ("userId") REFERENCES "nortesecret"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nortesecret"."sale_details" ADD CONSTRAINT "sale_details_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "nortesecret"."sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nortesecret"."sale_details" ADD CONSTRAINT "sale_details_productId_fkey" FOREIGN KEY ("productId") REFERENCES "nortesecret"."products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
