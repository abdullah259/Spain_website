CREATE TABLE `projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`titleEs` varchar(255) NOT NULL,
	`titleEn` varchar(255) NOT NULL,
	`descriptionEs` text,
	`descriptionEn` text,
	`category` enum('interior_design','renovation','investment','passive_house') NOT NULL,
	`imageUrl` text,
	`imageKey` text,
	`featured` boolean DEFAULT false,
	`active` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `properties` (
	`id` int AUTO_INCREMENT NOT NULL,
	`titleEs` varchar(255) NOT NULL,
	`titleEn` varchar(255) NOT NULL,
	`descriptionEs` text,
	`descriptionEn` text,
	`type` enum('venta','alquiler','inversion') NOT NULL,
	`price` int,
	`currency` varchar(3) DEFAULT 'EUR',
	`location` varchar(255),
	`imageUrl` text,
	`imageKey` text,
	`bedrooms` int,
	`bathrooms` int,
	`squareMeters` int,
	`featured` boolean DEFAULT false,
	`active` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `properties_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`key` varchar(255) NOT NULL,
	`value` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `settings_id` PRIMARY KEY(`id`),
	CONSTRAINT `settings_key_unique` UNIQUE(`key`)
);
--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clientName` varchar(255) NOT NULL,
	`contentEs` text NOT NULL,
	`contentEn` text NOT NULL,
	`rating` int DEFAULT 5,
	`imageUrl` text,
	`imageKey` text,
	`featured` boolean DEFAULT false,
	`active` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `testimonials_id` PRIMARY KEY(`id`)
);
