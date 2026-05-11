-- CreateEnum
CREATE TYPE "CaregiverType" AS ENUM ('guardian', 'professional', 'facility', 'hospital');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'other');

-- CreateTable
CREATE TABLE "Caregiver" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "type" "CaregiverType" NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL,
    "updateDate" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL,

    CONSTRAINT "Caregiver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "idCaregiver" TEXT NOT NULL,
    "contactCaregiver" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "lang" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL,
    "updateDate" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Record" (
    "id" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "heart_rate" INTEGER NOT NULL,
    "oxigen" INTEGER NOT NULL,
    "accel" INTEGER NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL,
    "updateDate" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bracelet" (
    "id" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    "fabrication_date" TIMESTAMP(3) NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL,
    "updateDate" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL,

    CONSTRAINT "Bracelet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_idCaregiver_fkey" FOREIGN KEY ("idCaregiver") REFERENCES "Caregiver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bracelet" ADD CONSTRAINT "Bracelet_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
