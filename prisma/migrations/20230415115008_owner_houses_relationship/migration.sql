/*
  Warnings:

  - Added the required column `image` to the `houses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_id` to the `houses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `houses` ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `owner_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `houses` ADD CONSTRAINT `houses_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `owners`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
