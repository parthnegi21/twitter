/*
  Warnings:

  - Changed the type of `fromUserID` on the `Message` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `ToUserId` on the `Message` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "fromUserID",
ADD COLUMN     "fromUserID" INTEGER NOT NULL,
DROP COLUMN "ToUserId",
ADD COLUMN     "ToUserId" INTEGER NOT NULL;
