-- CreateTable
CREATE TABLE "audits" (
    "Uuid" UUID NOT NULL,
    "action" TEXT NOT NULL,
    "entityName" TEXT NOT NULL,
    "entityUuid" TEXT NOT NULL,
    "oldValue" TEXT,
    "newValue" TEXT,
    "userUuid" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audits_pkey" PRIMARY KEY ("Uuid")
);
