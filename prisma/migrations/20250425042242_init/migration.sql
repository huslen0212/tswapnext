-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "last_name" TEXT,
    "first_name" TEXT,
    "phone_number" TEXT,
    "email" TEXT,
    "home_address" TEXT,
    "password" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "tickets" (
    "ticket_id" SERIAL NOT NULL,
    "ticket_title" TEXT,
    "ticket_type" TEXT,
    "ticket_category" TEXT,
    "place" TEXT,
    "description" TEXT,
    "date" TIMESTAMP(3),
    "ticket_price" DECIMAL(65,30),
    "ticket_image" TEXT,
    "ticket_status" TEXT,
    "user_id" INTEGER,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("ticket_id")
);

-- CreateTable
CREATE TABLE "wallet" (
    "user_id" INTEGER NOT NULL,
    "recharged_date" TIMESTAMP(3),
    "wallet_balance" DECIMAL(65,30),

    CONSTRAINT "wallet_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "orders" (
    "ticket_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "ordered_date" TIMESTAMP(3),

    CONSTRAINT "orders_pkey" PRIMARY KEY ("ticket_id","user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallet" ADD CONSTRAINT "wallet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("ticket_id") ON DELETE RESTRICT ON UPDATE CASCADE;
