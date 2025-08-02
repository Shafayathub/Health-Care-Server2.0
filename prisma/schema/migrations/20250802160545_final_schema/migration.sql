/*
  Warnings:

  - The values [IN_PROGRESS] on the enum `AppointmentStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `slotId` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `videoCallId` on the `appointments` table. All the data in the column will be lost.
  - You are about to alter the column `appointmentFee` on the `doctors` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the column `bloodGroup` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `dietaryPreferences` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `hasAllergies` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `hasDiabetes` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `hasPastSurgeries` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `immunizationStatus` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `maritalStatus` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `occupation` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `pregnancyStatus` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `rawHistoryText` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `recentInjury` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `structuredMedicalHistory` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `paymentStatus` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `followUpOnDate` on the `prescriptions` table. All the data in the column will be lost.
  - You are about to drop the column `medications` on the `prescriptions` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `schedules` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `schedules` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `schedules` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `schedules` table. All the data in the column will be lost.
  - You are about to drop the `DoctorSpecialty` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Specialty` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `appointment_slots` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `medical_reports` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[scheduleId]` on the table `appointments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[appointmentId]` on the table `doctor_schedules` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `patients` will be added. If there are existing duplicate values, this will fail.
  - Made the column `contactNumber` on table `admins` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `scheduleId` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoCallingId` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `doctors` table without a default value. This is not possible if the table is not empty.
  - Made the column `contactNumber` on table `doctors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `currentWorkingPlace` on table `doctors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `designation` on table `doctors` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `patientId` to the `prescriptions` table without a default value. This is not possible if the table is not empty.
  - Made the column `instructions` on table `prescriptions` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Made the column `comment` on table `reviews` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `endDateTime` to the `schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDateTime` to the `schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `schedules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AppointmentStatus_new" AS ENUM ('SCHEDULED', 'INPROGRESS', 'COMPLETED', 'CANCELED');
ALTER TABLE "appointments" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "appointments" ALTER COLUMN "status" TYPE "AppointmentStatus_new" USING ("status"::text::"AppointmentStatus_new");
ALTER TYPE "AppointmentStatus" RENAME TO "AppointmentStatus_old";
ALTER TYPE "AppointmentStatus_new" RENAME TO "AppointmentStatus";
DROP TYPE "AppointmentStatus_old";
ALTER TABLE "appointments" ALTER COLUMN "status" SET DEFAULT 'SCHEDULED';
COMMIT;

-- DropForeignKey
ALTER TABLE "DoctorSpecialty" DROP CONSTRAINT "DoctorSpecialty_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "DoctorSpecialty" DROP CONSTRAINT "DoctorSpecialty_specialtyId_fkey";

-- DropForeignKey
ALTER TABLE "admins" DROP CONSTRAINT "admins_email_fkey";

-- DropForeignKey
ALTER TABLE "appointment_slots" DROP CONSTRAINT "appointment_slots_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_slotId_fkey";

-- DropForeignKey
ALTER TABLE "doctors" DROP CONSTRAINT "doctors_email_fkey";

-- DropForeignKey
ALTER TABLE "medical_reports" DROP CONSTRAINT "medical_reports_patientId_fkey";

-- DropForeignKey
ALTER TABLE "patients" DROP CONSTRAINT "patients_email_fkey";

-- DropIndex
DROP INDEX "appointments_slotId_idx";

-- DropIndex
DROP INDEX "appointments_slotId_key";

-- DropIndex
DROP INDEX "appointments_videoCallId_key";

-- DropIndex
DROP INDEX "doctors_registrationNumber_key";

-- AlterTable
ALTER TABLE "admins" ALTER COLUMN "contactNumber" SET NOT NULL;

-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "slotId",
DROP COLUMN "videoCallId",
ADD COLUMN     "scheduleId" TEXT NOT NULL,
ADD COLUMN     "videoCallingId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "doctor_schedules" ADD COLUMN     "appointmentId" TEXT,
ADD COLUMN     "isBooked" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "doctors" ADD COLUMN     "experience" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "gender" "Gender" NOT NULL,
ALTER COLUMN "contactNumber" SET NOT NULL,
ALTER COLUMN "appointmentFee" SET DATA TYPE INTEGER,
ALTER COLUMN "currentWorkingPlace" SET NOT NULL,
ALTER COLUMN "designation" SET NOT NULL;

-- AlterTable
ALTER TABLE "patients" DROP COLUMN "bloodGroup",
DROP COLUMN "dateOfBirth",
DROP COLUMN "dietaryPreferences",
DROP COLUMN "gender",
DROP COLUMN "hasAllergies",
DROP COLUMN "hasDiabetes",
DROP COLUMN "hasPastSurgeries",
DROP COLUMN "height",
DROP COLUMN "immunizationStatus",
DROP COLUMN "maritalStatus",
DROP COLUMN "occupation",
DROP COLUMN "pregnancyStatus",
DROP COLUMN "rawHistoryText",
DROP COLUMN "recentInjury",
DROP COLUMN "structuredMedicalHistory",
DROP COLUMN "weight",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "contactNumber" TEXT,
ADD COLUMN     "profilePhoto" TEXT;

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "paymentStatus",
ADD COLUMN     "status" "PaymentStatus" NOT NULL DEFAULT 'UNPAID';

-- AlterTable
ALTER TABLE "prescriptions" DROP COLUMN "followUpOnDate",
DROP COLUMN "medications",
ADD COLUMN     "followUpDate" TIMESTAMP(3),
ADD COLUMN     "patientId" TEXT NOT NULL,
ALTER COLUMN "instructions" SET NOT NULL;

-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "comment" SET NOT NULL;

-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "endDate",
DROP COLUMN "isDeleted",
DROP COLUMN "name",
DROP COLUMN "startDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "endDateTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDateTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "DoctorSpecialty";

-- DropTable
DROP TABLE "Specialty";

-- DropTable
DROP TABLE "appointment_slots";

-- DropTable
DROP TABLE "medical_reports";

-- CreateTable
CREATE TABLE "patient_health_datas" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "bloodGroup" "BloodGroup" NOT NULL,
    "hasAllergies" BOOLEAN DEFAULT false,
    "hasDiabetes" BOOLEAN DEFAULT false,
    "height" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "smokingStatus" BOOLEAN DEFAULT false,
    "dietaryPreferences" TEXT,
    "pregnancyStatus" BOOLEAN DEFAULT false,
    "mentalHealthHistory" TEXT,
    "immunizationStatus" TEXT,
    "hasPastSurgeries" BOOLEAN DEFAULT false,
    "recentAnxiety" BOOLEAN DEFAULT false,
    "recentDepression" BOOLEAN DEFAULT false,
    "maritalStatus" "MaritalStatus" NOT NULL DEFAULT 'UNMARRIED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patient_health_datas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "madical_reports" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "reportName" TEXT NOT NULL,
    "reportLink" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "madical_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specialties" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "specialties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctor_specialties" (
    "specialitiesId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,

    CONSTRAINT "doctor_specialties_pkey" PRIMARY KEY ("specialitiesId","doctorId")
);

-- CreateIndex
CREATE UNIQUE INDEX "patient_health_datas_patientId_key" ON "patient_health_datas"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "appointments_scheduleId_key" ON "appointments"("scheduleId");

-- CreateIndex
CREATE UNIQUE INDEX "doctor_schedules_appointmentId_key" ON "doctor_schedules"("appointmentId");

-- CreateIndex
CREATE UNIQUE INDEX "patients_id_key" ON "patients"("id");

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "schedules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prescriptions" ADD CONSTRAINT "prescriptions_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_health_datas" ADD CONSTRAINT "patient_health_datas_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "madical_reports" ADD CONSTRAINT "madical_reports_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_schedules" ADD CONSTRAINT "doctor_schedules_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "appointments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_specialties" ADD CONSTRAINT "doctor_specialties_specialitiesId_fkey" FOREIGN KEY ("specialitiesId") REFERENCES "specialties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_specialties" ADD CONSTRAINT "doctor_specialties_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_email_fkey" FOREIGN KEY ("email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_email_fkey" FOREIGN KEY ("email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_email_fkey" FOREIGN KEY ("email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
