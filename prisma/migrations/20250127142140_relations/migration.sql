-- AddForeignKey
ALTER TABLE "candidate" ADD CONSTRAINT "candidate_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("time_zone_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate" ADD CONSTRAINT "candidate_time_zone_id_fkey" FOREIGN KEY ("time_zone_id") REFERENCES "time_zone"("time_zone_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate" ADD CONSTRAINT "candidate_languages_id_fkey" FOREIGN KEY ("languages_id") REFERENCES "languages"("time_zone_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate" ADD CONSTRAINT "candidate_technologies_id_fkey" FOREIGN KEY ("technologies_id") REFERENCES "technologies"("time_zone_id") ON DELETE RESTRICT ON UPDATE CASCADE;
