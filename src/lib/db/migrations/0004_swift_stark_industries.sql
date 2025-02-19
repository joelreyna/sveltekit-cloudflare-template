ALTER TABLE `account` ADD `accessToken` text;--> statement-breakpoint
ALTER TABLE `account` ADD `refreshToken` text;--> statement-breakpoint
ALTER TABLE `account` ADD `accessTokenExpiresAt` integer;--> statement-breakpoint
ALTER TABLE `account` ADD `refreshTokenExpiresAt` integer;--> statement-breakpoint
ALTER TABLE `account` ADD `scope` text;--> statement-breakpoint
ALTER TABLE `account` ADD `idToken` text;--> statement-breakpoint
ALTER TABLE `account` ADD `password` text;--> statement-breakpoint
ALTER TABLE `session` ADD `ipAddress` text;--> statement-breakpoint
ALTER TABLE `session` ADD `userAgent` text;--> statement-breakpoint
ALTER TABLE `user` ADD `image` text;