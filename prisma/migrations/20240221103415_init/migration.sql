-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Layout" (
    "layout_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "layout_name" TEXT NOT NULL,

    CONSTRAINT "Layout_pkey" PRIMARY KEY ("layout_id")
);

-- CreateTable
CREATE TABLE "Widget" (
    "widget_id" SERIAL NOT NULL,
    "widget_name" TEXT NOT NULL,
    "widget_description" TEXT,
    "widget_config" JSONB,

    CONSTRAINT "Widget_pkey" PRIMARY KEY ("widget_id")
);

-- CreateTable
CREATE TABLE "LayoutWidget" (
    "layout_id" INTEGER NOT NULL,
    "widget_id" INTEGER NOT NULL,

    CONSTRAINT "LayoutWidget_pkey" PRIMARY KEY ("layout_id","widget_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");

-- CreateIndex
CREATE INDEX "address_index" ON "User"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Layout_user_id_key" ON "Layout"("user_id");

-- CreateIndex
CREATE INDEX "user_id_index" ON "Layout"("user_id");

-- CreateIndex
CREATE INDEX "widget_name_index" ON "Widget"("widget_name");

-- CreateIndex
CREATE INDEX "layout_id_index" ON "LayoutWidget"("layout_id");

-- CreateIndex
CREATE INDEX "widget_id_index" ON "LayoutWidget"("widget_id");

-- AddForeignKey
ALTER TABLE "Layout" ADD CONSTRAINT "Layout_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LayoutWidget" ADD CONSTRAINT "LayoutWidget_layout_id_fkey" FOREIGN KEY ("layout_id") REFERENCES "Layout"("layout_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LayoutWidget" ADD CONSTRAINT "LayoutWidget_widget_id_fkey" FOREIGN KEY ("widget_id") REFERENCES "Widget"("widget_id") ON DELETE RESTRICT ON UPDATE CASCADE;
