/*
  Warnings:

  - You are about to drop the column `widget_config` on the `Widget` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "widget_name_index";

-- AlterTable
ALTER TABLE "LayoutWidget" ADD COLUMN     "widget_config" JSONB;

-- AlterTable
ALTER TABLE "Widget" DROP COLUMN "widget_config";

-- CreateIndex
CREATE INDEX "widget_id" ON "Widget"("widget_id");
