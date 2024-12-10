/*
  Warnings:

  - You are about to drop the column `status` on the `Connection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Connection" DROP COLUMN "status";

-- DropEnum
DROP TYPE "Status";
