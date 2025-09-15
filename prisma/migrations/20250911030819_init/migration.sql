-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('admin', 'guru', 'murid');

-- CreateEnum
CREATE TYPE "public"."StatusContent" AS ENUM ('draft', 'locked', 'published');

-- CreateEnum
CREATE TYPE "public"."QuestionType" AS ENUM ('multiple', 'voice');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'murid',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."contents" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "status" "public"."StatusContent" NOT NULL DEFAULT 'draft',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sub_contents" (
    "id" SERIAL NOT NULL,
    "contentId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "materi" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sub_contents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."progresses" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "contentId" INTEGER NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "progresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."quises" (
    "id" SERIAL NOT NULL,
    "contentId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."quis_questions" (
    "id" SERIAL NOT NULL,
    "quisId" INTEGER NOT NULL,
    "type" "public"."QuestionType" NOT NULL,
    "question" TEXT NOT NULL,
    "optionA" TEXT NOT NULL,
    "optionB" TEXT NOT NULL,
    "optionC" TEXT NOT NULL,
    "optionD" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quis_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."quis_answers" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    "textAnswer" TEXT,
    "selectedOption" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quis_answers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "public"."users"("username");

-- AddForeignKey
ALTER TABLE "public"."sub_contents" ADD CONSTRAINT "sub_contents_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "public"."contents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."progresses" ADD CONSTRAINT "progresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."progresses" ADD CONSTRAINT "progresses_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "public"."contents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."quises" ADD CONSTRAINT "quises_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "public"."contents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."quis_questions" ADD CONSTRAINT "quis_questions_quisId_fkey" FOREIGN KEY ("quisId") REFERENCES "public"."quises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."quis_answers" ADD CONSTRAINT "quis_answers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."quis_answers" ADD CONSTRAINT "quis_answers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."quis_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
