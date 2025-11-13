CREATE TABLE `exchangeRates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`baseCurrency` varchar(3) NOT NULL,
	`targetCurrency` varchar(3) NOT NULL,
	`rate` decimal(10,6) NOT NULL,
	`lastUpdated` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `exchangeRates_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `projects` ADD `titleFr` varchar(255);--> statement-breakpoint
ALTER TABLE `projects` ADD `titleDe` varchar(255);--> statement-breakpoint
ALTER TABLE `projects` ADD `descriptionFr` text;--> statement-breakpoint
ALTER TABLE `projects` ADD `descriptionDe` text;--> statement-breakpoint
ALTER TABLE `properties` ADD `titleFr` varchar(255);--> statement-breakpoint
ALTER TABLE `properties` ADD `titleDe` varchar(255);--> statement-breakpoint
ALTER TABLE `properties` ADD `descriptionFr` text;--> statement-breakpoint
ALTER TABLE `properties` ADD `descriptionDe` text;--> statement-breakpoint
ALTER TABLE `properties` ADD `squareFeet` int;--> statement-breakpoint
ALTER TABLE `properties` ADD `yearBuilt` int;--> statement-breakpoint
ALTER TABLE `properties` ADD `propertyType` varchar(100);--> statement-breakpoint
ALTER TABLE `testimonials` ADD `contentFr` text;--> statement-breakpoint
ALTER TABLE `testimonials` ADD `contentDe` text;