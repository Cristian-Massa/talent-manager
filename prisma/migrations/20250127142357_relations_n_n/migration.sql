-- DropForeignKey
ALTER TABLE "candidate" DROP CONSTRAINT "candidate_languages_id_fkey";

-- DropForeignKey
ALTER TABLE "candidate" DROP CONSTRAINT "candidate_technologies_id_fkey";

-- CreateTable
CREATE TABLE "_CandidateLanguages" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CandidateLanguages_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CandidateTechnologies" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CandidateTechnologies_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CandidateLanguages_B_index" ON "_CandidateLanguages"("B");

-- CreateIndex
CREATE INDEX "_CandidateTechnologies_B_index" ON "_CandidateTechnologies"("B");

-- AddForeignKey
ALTER TABLE "_CandidateLanguages" ADD CONSTRAINT "_CandidateLanguages_A_fkey" FOREIGN KEY ("A") REFERENCES "candidate"("candidate_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateLanguages" ADD CONSTRAINT "_CandidateLanguages_B_fkey" FOREIGN KEY ("B") REFERENCES "languages"("time_zone_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateTechnologies" ADD CONSTRAINT "_CandidateTechnologies_A_fkey" FOREIGN KEY ("A") REFERENCES "candidate"("candidate_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateTechnologies" ADD CONSTRAINT "_CandidateTechnologies_B_fkey" FOREIGN KEY ("B") REFERENCES "technologies"("time_zone_id") ON DELETE CASCADE ON UPDATE CASCADE;
