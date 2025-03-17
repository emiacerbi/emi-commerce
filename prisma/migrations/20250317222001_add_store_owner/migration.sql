-- CreateTable
CREATE TABLE "StoreOwner" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "storeName" TEXT NOT NULL,

    CONSTRAINT "StoreOwner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StoreOwner_email_key" ON "StoreOwner"("email");
