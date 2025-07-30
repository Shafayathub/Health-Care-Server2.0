/*
  Warnings:

  - You are about to drop the column `name` on the `Specialty` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Specialty` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Specialty` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Specialty_name_key";

-- AlterTable
ALTER TABLE "Specialty" DROP COLUMN "name",
ADD COLUMN     "icon" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Specialty_title_key" ON "Specialty"("title");
