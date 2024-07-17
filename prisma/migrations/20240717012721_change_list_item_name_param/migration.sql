/*
  Warnings:

  - You are about to drop the column `shoppingListId` on the `ListItem` table. All the data in the column will be lost.
  - Added the required column `listId` to the `ListItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ListItem" DROP CONSTRAINT "ListItem_shoppingListId_fkey";

-- AlterTable
ALTER TABLE "ListItem" DROP COLUMN "shoppingListId",
ADD COLUMN     "listId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "ListItem" ADD CONSTRAINT "ListItem_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
