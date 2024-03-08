-- CreateTable
CREATE TABLE "Food" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dateHours" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ItemOrder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quantity" INTEGER NOT NULL,
    "foodId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    CONSTRAINT "ItemOrder_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ItemOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Food_id_key" ON "Food"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_key" ON "Order"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ItemOrder_id_key" ON "ItemOrder"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ItemOrder_foodId_orderId_key" ON "ItemOrder"("foodId", "orderId");
