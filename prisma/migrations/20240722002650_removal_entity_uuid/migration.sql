/*
  Warnings:

  - You are about to drop the column `entityUuid` on the `audits` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "audits" DROP COLUMN "entityUuid";
