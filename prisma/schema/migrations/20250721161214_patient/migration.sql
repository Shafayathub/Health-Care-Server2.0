-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "occupation" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "gender" "Gender",
    "maritalStatus" "MaritalStatus",
    "bloodGroup" "BloodGroup",
    "hasAllergies" BOOLEAN,
    "hasDiabetes" BOOLEAN,
    "height" TEXT,
    "weight" TEXT,
    "dietaryPreferences" TEXT,
    "pregnancyStatus" TEXT,
    "immunizationStatus" TEXT,
    "hasPastSurgeries" BOOLEAN,
    "recentInjury" BOOLEAN,
    "rawHistoryText" TEXT,
    "structuredMedicalHistory" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
