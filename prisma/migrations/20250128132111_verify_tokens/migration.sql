/*
  Warnings:

  - You are about to drop the column `verify_token` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[verify_token_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `verify_token_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "verify_token",
ADD COLUMN     "verify_token_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "verify_token" (
    "verify_token_id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verify_token_pkey" PRIMARY KEY ("verify_token_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "verify_token_token_key" ON "verify_token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "users_verify_token_id_key" ON "users"("verify_token_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_verify_token_id_fkey" FOREIGN KEY ("verify_token_id") REFERENCES "verify_token"("verify_token_id") ON DELETE RESTRICT ON UPDATE CASCADE;
