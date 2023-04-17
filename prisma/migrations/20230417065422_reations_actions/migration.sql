-- DropForeignKey
ALTER TABLE `HousesOnAmenities` DROP FOREIGN KEY `HousesOnAmenities_amenityId_fkey`;

-- DropForeignKey
ALTER TABLE `HousesOnAmenities` DROP FOREIGN KEY `HousesOnAmenities_houseId_fkey`;

-- DropForeignKey
ALTER TABLE `houses` DROP FOREIGN KEY `houses_owner_id_fkey`;

-- DropForeignKey
ALTER TABLE `reservations` DROP FOREIGN KEY `reservations_customerId_fkey`;

-- DropForeignKey
ALTER TABLE `reservations` DROP FOREIGN KEY `reservations_houseId_fkey`;

-- AddForeignKey
ALTER TABLE `houses` ADD CONSTRAINT `houses_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `owners`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_houseId_fkey` FOREIGN KEY (`houseId`) REFERENCES `houses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HousesOnAmenities` ADD CONSTRAINT `HousesOnAmenities_houseId_fkey` FOREIGN KEY (`houseId`) REFERENCES `houses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HousesOnAmenities` ADD CONSTRAINT `HousesOnAmenities_amenityId_fkey` FOREIGN KEY (`amenityId`) REFERENCES `amentities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
