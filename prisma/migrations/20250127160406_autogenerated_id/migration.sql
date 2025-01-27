/*
  Warnings:

  - The primary key for the `technologies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `technologies` on the `technologies` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CandidateTechnologies" DROP CONSTRAINT "_CandidateTechnologies_B_fkey";

-- AlterTable
CREATE SEQUENCE countries_time_zone_id_seq;
ALTER TABLE "countries" ALTER COLUMN "time_zone_id" SET DEFAULT nextval('countries_time_zone_id_seq');
ALTER SEQUENCE countries_time_zone_id_seq OWNED BY "countries"."time_zone_id";

-- AlterTable
CREATE SEQUENCE languages_time_zone_id_seq;
ALTER TABLE "languages" ALTER COLUMN "time_zone_id" SET DEFAULT nextval('languages_time_zone_id_seq');
ALTER SEQUENCE languages_time_zone_id_seq OWNED BY "languages"."time_zone_id";

-- AlterTable
ALTER TABLE "technologies" DROP CONSTRAINT "technologies_pkey",
DROP COLUMN "technologies",
ADD COLUMN     "technologies_id" SERIAL NOT NULL,
ADD CONSTRAINT "technologies_pkey" PRIMARY KEY ("technologies_id");

-- AlterTable
CREATE SEQUENCE time_zone_time_zone_id_seq;
ALTER TABLE "time_zone" ALTER COLUMN "time_zone_id" SET DEFAULT nextval('time_zone_time_zone_id_seq');
ALTER SEQUENCE time_zone_time_zone_id_seq OWNED BY "time_zone"."time_zone_id";

-- AddForeignKey
ALTER TABLE "_CandidateTechnologies" ADD CONSTRAINT "_CandidateTechnologies_B_fkey" FOREIGN KEY ("B") REFERENCES "technologies"("technologies_id") ON DELETE CASCADE ON UPDATE CASCADE;
