-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_carId_fkey";

-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "carId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE SET NULL ON UPDATE CASCADE;
