-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "itemID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Item_itemID_key" ON "Item"("itemID");
