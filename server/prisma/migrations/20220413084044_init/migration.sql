-- CreateTable
CREATE TABLE "product" (
    "name" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "main_group" TEXT NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "nutrients" (
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,

    CONSTRAINT "nutrients_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "product_data" (
    "value" DECIMAL(65,30) NOT NULL,
    "weight_gram" INTEGER NOT NULL,
    "product_name" TEXT NOT NULL,
    "nutrients_name" TEXT NOT NULL,

    CONSTRAINT "product_data_pkey" PRIMARY KEY ("product_name","nutrients_name")
);

-- AddForeignKey
ALTER TABLE "product_data" ADD CONSTRAINT "product_data_product_name_fkey" FOREIGN KEY ("product_name") REFERENCES "product"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_data" ADD CONSTRAINT "product_data_nutrients_name_fkey" FOREIGN KEY ("nutrients_name") REFERENCES "nutrients"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
