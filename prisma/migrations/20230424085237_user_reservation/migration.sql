/*
  Warnings:

  - You are about to drop the column `customerId` on the `reservations` table. All the data in the column will be lost.
  - Added the required column `userId` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `reservations` DROP FOREIGN KEY `reservations_customerId_fkey`;

-- AlterTable
ALTER TABLE `reservations` DROP COLUMN `customerId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
