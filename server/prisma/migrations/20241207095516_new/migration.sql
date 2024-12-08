/*
  Warnings:

  - You are about to drop the `Connect` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Connect";

-- CreateTable
CREATE TABLE "Connection" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "fromUserID" INTEGER NOT NULL,
    "toUserId" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'notfollowed',

    CONSTRAINT "Connection_pkey" PRIMARY KEY ("id")
);
