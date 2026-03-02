CREATE TABLE "users" (
	"name" varchar(255) NOT NULL,
	"email" varchar(155) NOT NULL,
	"pass" varchar,
	"role" varchar(10) DEFAULT 'user' NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
