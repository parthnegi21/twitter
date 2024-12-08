-- CreateEnum
CREATE TYPE "Status" AS ENUM ('notfollowed', 'followed');

-- CreateTable
CREATE TABLE "Connect" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "toUser" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'notfollowed',

    CONSTRAINT "Connect_pkey" PRIMARY KEY ("id")
);
