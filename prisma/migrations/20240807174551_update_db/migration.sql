/*
  Warnings:

  - You are about to drop the `PostImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PostImage" DROP CONSTRAINT "PostImage_postId_fkey";

-- DropForeignKey
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_parentId_fkey";

-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "image" TEXT;

-- DropTable
DROP TABLE "PostImage";
