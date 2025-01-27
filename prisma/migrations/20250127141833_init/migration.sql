-- CreateTable
CREATE TABLE "countries" (
    "time_zone_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("time_zone_id")
);

-- CreateTable
CREATE TABLE "languages" (
    "time_zone_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "languages_pkey" PRIMARY KEY ("time_zone_id")
);

-- CreateTable
CREATE TABLE "technologies" (
    "time_zone_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "technologies_pkey" PRIMARY KEY ("time_zone_id")
);

-- CreateTable
CREATE TABLE "time_zone" (
    "time_zone_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "time_zone_pkey" PRIMARY KEY ("time_zone_id")
);

-- CreateTable
CREATE TABLE "workers" (
    "workers_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workers_pkey" PRIMARY KEY ("workers_id")
);

-- CreateTable
CREATE TABLE "candidate" (
    "candidate_id" INTEGER NOT NULL,
    "birth_day" TIMESTAMP(3) NOT NULL,
    "country_id" INTEGER NOT NULL,
    "time_zone_id" INTEGER NOT NULL,
    "motivation_text" TEXT NOT NULL,
    "languages_id" INTEGER NOT NULL,
    "technologies_id" INTEGER NOT NULL,
    "career_timeline" TEXT NOT NULL,
    "educational_projects" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "candidate_pkey" PRIMARY KEY ("candidate_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "workers_email_key" ON "workers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "candidate_email_key" ON "candidate"("email");
