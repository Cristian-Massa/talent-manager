/*
  Warnings:

  - The primary key for the `technologies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `time_zone_id` on the `technologies` table. All the data in the column will be lost.
  - Added the required column `technologies` to the `technologies` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CandidateTechnologies" DROP CONSTRAINT "_CandidateTechnologies_B_fkey";

-- AlterTable
ALTER TABLE "technologies" DROP CONSTRAINT "technologies_pkey",
DROP COLUMN "time_zone_id",
ADD COLUMN     "technologies" INTEGER NOT NULL,
ADD CONSTRAINT "technologies_pkey" PRIMARY KEY ("technologies");

-- AddForeignKey
ALTER TABLE "_CandidateTechnologies" ADD CONSTRAINT "_CandidateTechnologies_B_fkey" FOREIGN KEY ("B") REFERENCES "technologies"("technologies") ON DELETE CASCADE ON UPDATE CASCADE;
