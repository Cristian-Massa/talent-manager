/*
  Warnings:

  - You are about to drop the column `career_timeline` on the `candidate` table. All the data in the column will be lost.
  - You are about to drop the column `educational_projects` on the `candidate` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `candidate` table. All the data in the column will be lost.
  - The primary key for the `countries` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `time_zone_id` on the `countries` table. All the data in the column will be lost.
  - The primary key for the `languages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `time_zone_id` on the `languages` table. All the data in the column will be lost.
  - You are about to drop the `workers` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `candidate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `career_timeline_id` to the `candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `educational_projects_id` to the `candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `candidate` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CandidateLanguages" DROP CONSTRAINT "_CandidateLanguages_B_fkey";

-- DropForeignKey
ALTER TABLE "candidate" DROP CONSTRAINT "candidate_country_id_fkey";

-- DropIndex
DROP INDEX "candidate_email_key";

-- AlterTable
CREATE SEQUENCE candidate_candidate_id_seq;
ALTER TABLE "candidate" DROP COLUMN "career_timeline",
DROP COLUMN "educational_projects",
DROP COLUMN "email",
ADD COLUMN     "career_timeline_id" INTEGER NOT NULL,
ADD COLUMN     "educational_projects_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ALTER COLUMN "candidate_id" SET DEFAULT nextval('candidate_candidate_id_seq');
ALTER SEQUENCE candidate_candidate_id_seq OWNED BY "candidate"."candidate_id";

-- AlterTable
ALTER TABLE "countries" DROP CONSTRAINT "countries_pkey",
DROP COLUMN "time_zone_id",
ADD COLUMN     "countries_id" SERIAL NOT NULL,
ADD CONSTRAINT "countries_pkey" PRIMARY KEY ("countries_id");

-- AlterTable
ALTER TABLE "languages" DROP CONSTRAINT "languages_pkey",
DROP COLUMN "time_zone_id",
ADD COLUMN     "languages_id" SERIAL NOT NULL,
ADD CONSTRAINT "languages_pkey" PRIMARY KEY ("languages_id");

-- DropTable
DROP TABLE "workers";

-- CreateTable
CREATE TABLE "career_timeline" (
    "career_timeline_id" SERIAL NOT NULL,
    "company_name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "time_in_position" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "career_timeline_pkey" PRIMARY KEY ("career_timeline_id")
);

-- CreateTable
CREATE TABLE "institute" (
    "institute_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "institute_pkey" PRIMARY KEY ("institute_id")
);

-- CreateTable
CREATE TABLE "educational_projects" (
    "career_timeline_id" SERIAL NOT NULL,
    "institute_id" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "time_in_position" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "educational_projects_pkey" PRIMARY KEY ("career_timeline_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "verify_token" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "_CandidateCareerTimeline" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CandidateCareerTimeline_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CandidateEducationalProjects" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CandidateEducationalProjects_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "_CandidateCareerTimeline_B_index" ON "_CandidateCareerTimeline"("B");

-- CreateIndex
CREATE INDEX "_CandidateEducationalProjects_B_index" ON "_CandidateEducationalProjects"("B");

-- CreateIndex
CREATE UNIQUE INDEX "candidate_user_id_key" ON "candidate"("user_id");

-- AddForeignKey
ALTER TABLE "educational_projects" ADD CONSTRAINT "educational_projects_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "institute"("institute_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate" ADD CONSTRAINT "candidate_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate" ADD CONSTRAINT "candidate_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("countries_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateLanguages" ADD CONSTRAINT "_CandidateLanguages_B_fkey" FOREIGN KEY ("B") REFERENCES "languages"("languages_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateCareerTimeline" ADD CONSTRAINT "_CandidateCareerTimeline_A_fkey" FOREIGN KEY ("A") REFERENCES "candidate"("candidate_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateCareerTimeline" ADD CONSTRAINT "_CandidateCareerTimeline_B_fkey" FOREIGN KEY ("B") REFERENCES "career_timeline"("career_timeline_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateEducationalProjects" ADD CONSTRAINT "_CandidateEducationalProjects_A_fkey" FOREIGN KEY ("A") REFERENCES "candidate"("candidate_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateEducationalProjects" ADD CONSTRAINT "_CandidateEducationalProjects_B_fkey" FOREIGN KEY ("B") REFERENCES "educational_projects"("career_timeline_id") ON DELETE CASCADE ON UPDATE CASCADE;
