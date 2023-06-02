-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "lastname" VARCHAR(40) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "birth" DATE NOT NULL,
    "password" VARCHAR(150) NOT NULL,
    "genderId" INTEGER,
    "roleId" INTEGER,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gender" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,

    CONSTRAINT "Gender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "refreshToken" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" UUID NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "banner" INTEGER NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "modelNameId" INTEGER,
    "equipmentId" INTEGER,
    "price" DECIMAL(38,2) NOT NULL,
    "transmission" VARCHAR(100) NOT NULL,
    "numberOfGears" VARCHAR(100) NOT NULL,
    "typeOfDrive" VARCHAR(100) NOT NULL,
    "clearance" VARCHAR(100) NOT NULL,
    "fuelTankVolume" VARCHAR(100) NOT NULL,
    "trunkVolume" VARCHAR(100) NOT NULL,
    "length" VARCHAR(100) NOT NULL,
    "width" VARCHAR(100) NOT NULL,
    "height" VARCHAR(100) NOT NULL,
    "payload" VARCHAR(100) NOT NULL,
    "maxSpeed" VARCHAR(100) NOT NULL,
    "accelerationUp" VARCHAR(100) NOT NULL,
    "fuelConsumption" VARCHAR(100) NOT NULL,
    "bannerId" INTEGER NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Option" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OptionsOnCar" (
    "carId" INTEGER NOT NULL,
    "optionId" INTEGER NOT NULL,

    CONSTRAINT "OptionsOnCar_pkey" PRIMARY KEY ("carId","optionId")
);

-- CreateTable
CREATE TABLE "ModelName" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "ModelName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Colors" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "code" VARCHAR(100) NOT NULL,

    CONSTRAINT "Colors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ColorsOnCars" (
    "carId" INTEGER NOT NULL,
    "colorsId" INTEGER NOT NULL,

    CONSTRAINT "ColorsOnCars_pkey" PRIMARY KEY ("carId","colorsId")
);

-- CreateTable
CREATE TABLE "Status" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(40) NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" UUID NOT NULL,
    "userId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "carId" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_phone_key" ON "Users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Gender_name_key" ON "Gender"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Roles_name_key" ON "Roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Token_userId_key" ON "Token"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Image_path_key" ON "Image"("path");

-- CreateIndex
CREATE UNIQUE INDEX "News_title_key" ON "News"("title");

-- CreateIndex
CREATE UNIQUE INDEX "News_banner_key" ON "News"("banner");

-- CreateIndex
CREATE UNIQUE INDEX "Equipment_name_key" ON "Equipment"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Option_name_key" ON "Option"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ModelName_name_key" ON "ModelName"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Colors_code_key" ON "Colors"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Status_name_key" ON "Status"("name");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "Gender"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_banner_fkey" FOREIGN KEY ("banner") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_modelNameId_fkey" FOREIGN KEY ("modelNameId") REFERENCES "ModelName"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_bannerId_fkey" FOREIGN KEY ("bannerId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptionsOnCar" ADD CONSTRAINT "OptionsOnCar_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptionsOnCar" ADD CONSTRAINT "OptionsOnCar_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ColorsOnCars" ADD CONSTRAINT "ColorsOnCars_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ColorsOnCars" ADD CONSTRAINT "ColorsOnCars_colorsId_fkey" FOREIGN KEY ("colorsId") REFERENCES "Colors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
