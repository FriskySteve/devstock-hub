/*
  Warnings:

  - Added the required column `addedPrice` to the `cart_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."cart_items" ADD COLUMN     "addedPrice" DECIMAL(65,30) NOT NULL;
