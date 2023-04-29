-- CreateTable
CREATE TABLE "Colors" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "code" VARCHAR(100) NOT NULL,

    CONSTRAINT "Colors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ColorsOnCars" (
    "carId" UUID NOT NULL,
    "colorsId" INTEGER NOT NULL,

    CONSTRAINT "ColorsOnCars_pkey" PRIMARY KEY ("carId","colorsId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Colors_code_key" ON "Colors"("code");

-- AddForeignKey
ALTER TABLE "ColorsOnCars" ADD CONSTRAINT "ColorsOnCars_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ColorsOnCars" ADD CONSTRAINT "ColorsOnCars_colorsId_fkey" FOREIGN KEY ("colorsId") REFERENCES "Colors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
