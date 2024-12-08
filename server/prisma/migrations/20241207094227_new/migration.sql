/*
  Warnings:

  - You are about to drop the column `toUser` on the `Connect` table. All the data in the column will be lost.
  - Added the required column `fromUserID` to the `Connect` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toUserId` to the `Connect` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Connect" DROP COLUMN "toUser",
ADD COLUMN     "fromUserID" INTEGER NOT NULL,
ADD COLUMN     "toUserId" INTEGER NOT NULL;
