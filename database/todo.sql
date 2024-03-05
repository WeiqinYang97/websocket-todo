-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1:3306
-- 生成日期： 2024-03-04 17:44:10
-- 服务器版本： 5.7.31
-- PHP 版本： 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `todo`
--

-- --------------------------------------------------------

--
-- 表的结构 `todos`
--

DROP TABLE IF EXISTS `todos`;
CREATE TABLE IF NOT EXISTS `todos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_done` tinyint(1) NOT NULL DEFAULT '0',
  `deadline` timestamp NULL DEFAULT NULL,
  `done_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Todos';

--
-- 转存表中的数据 `todos`
--

INSERT INTO `todos` (`id`, `name`, `is_done`, `deadline`, `done_at`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'This is a test task!', 1, NULL, '2024-03-04 17:36:20', '2024-03-04 10:57:09', '2024-03-04 17:36:20', NULL),
(4, 'qqq', 0, NULL, NULL, '2024-03-04 11:24:08', '2024-03-04 17:36:24', NULL),
(5, 'ttt', 0, NULL, NULL, '2024-03-04 11:25:10', '2024-03-04 17:37:30', NULL),
(6, 'sss', 0, NULL, NULL, '2024-03-04 11:26:15', '2024-03-04 11:26:15', '2024-03-04 12:22:48'),
(7, 'hhh', 0, NULL, NULL, '2024-03-04 11:31:30', '2024-03-04 17:37:32', NULL),
(8, 'ssss', 0, NULL, NULL, '2024-03-04 11:37:46', '2024-03-04 11:37:46', '2024-03-04 12:54:40'),
(9, 'Cohen test', 0, NULL, NULL, '2024-03-04 12:55:11', '2024-03-04 12:55:11', '2024-03-04 13:16:08'),
(10, 'Ok', 1, NULL, '2024-03-04 13:44:29', '2024-03-04 13:15:56', '2024-03-04 13:44:29', '2024-03-04 16:53:33'),
(11, 'yes', 0, NULL, NULL, '2024-03-04 13:15:59', '2024-03-04 13:15:59', '2024-03-04 13:16:09'),
(12, 'haha', 1, NULL, '2024-03-04 13:44:40', '2024-03-04 13:16:06', '2024-03-04 13:44:40', '2024-03-04 16:50:09'),
(13, 'test', 1, NULL, '2024-03-04 16:54:13', '2024-03-04 16:54:05', '2024-03-04 16:54:13', '2024-03-04 16:55:02'),
(14, 'a', 1, NULL, '2024-03-04 16:54:12', '2024-03-04 16:54:07', '2024-03-04 16:54:12', '2024-03-04 16:54:55'),
(15, 'b', 1, NULL, '2024-03-04 16:54:13', '2024-03-04 16:54:08', '2024-03-04 16:54:13', '2024-03-04 16:54:41'),
(16, 'cd', 0, NULL, NULL, '2024-03-04 16:54:09', '2024-03-04 16:54:09', '2024-03-04 16:55:00'),
(17, 'a', 0, NULL, NULL, '2024-03-04 16:56:56', '2024-03-04 16:56:56', '2024-03-04 16:57:02'),
(18, 'b', 0, NULL, NULL, '2024-03-04 16:56:57', '2024-03-04 16:56:57', '2024-03-04 16:57:20'),
(19, 'c', 0, NULL, NULL, '2024-03-04 16:56:58', '2024-03-04 16:56:58', '2024-03-04 16:57:06'),
(20, 'd', 0, NULL, NULL, '2024-03-04 16:56:59', '2024-03-04 16:56:59', '2024-03-04 16:58:05'),
(21, 'test', 0, NULL, NULL, '2024-03-04 17:00:06', '2024-03-04 17:00:06', '2024-03-04 17:00:09'),
(22, 'test', 0, NULL, NULL, '2024-03-04 17:00:08', '2024-03-04 17:00:08', '2024-03-04 17:04:42'),
(23, 'abcdefg', 0, NULL, NULL, '2024-03-04 17:05:47', '2024-03-04 17:05:47', '2024-03-04 17:28:50'),
(24, 'a', 0, NULL, NULL, '2024-03-04 17:05:48', '2024-03-04 17:05:48', '2024-03-04 17:16:00'),
(25, 'a', 1, NULL, '2024-03-04 17:34:14', '2024-03-04 17:05:48', '2024-03-04 17:34:14', '2024-03-04 17:34:20'),
(26, 'a', 0, NULL, NULL, '2024-03-04 17:05:49', '2024-03-04 17:05:49', '2024-03-04 17:05:55'),
(27, 'abc', 1, NULL, '2024-03-04 17:33:57', '2024-03-04 17:31:22', '2024-03-04 17:33:57', '2024-03-04 17:34:01'),
(28, 'ob', 1, NULL, '2024-03-04 17:33:59', '2024-03-04 17:32:37', '2024-03-04 17:33:59', '2024-03-04 17:34:01'),
(29, 'abcd', 0, NULL, NULL, '2024-03-04 17:33:53', '2024-03-04 17:37:36', NULL),
(30, 'abcd', 0, NULL, NULL, '2024-03-04 17:34:24', '2024-03-04 17:37:11', NULL);

-- --------------------------------------------------------

--
-- 表的结构 `todo_user`
--

DROP TABLE IF EXISTS `todo_user`;
CREATE TABLE IF NOT EXISTS `todo_user` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `todo_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `deleted_by` int(11) DEFAULT NULL,
  `done_by` int(11) DEFAULT NULL,
  `undo_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `todo_id` (`todo_id`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `todo_user`
--

INSERT INTO `todo_user` (`id`, `todo_id`, `created_by`, `updated_by`, `deleted_by`, `done_by`, `undo_by`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 8, 1, 1, 1, NULL, NULL, '2024-03-04 11:37:46', '2024-03-04 11:37:46', '2024-03-04 12:54:40'),
(2, 9, 1, 1, 1, NULL, NULL, '2024-03-04 12:55:11', '2024-03-04 12:55:11', '2024-03-04 13:16:08'),
(3, 10, 1, 1, 1, 1, NULL, '2024-03-04 13:15:56', '2024-03-04 13:44:29', '2024-03-04 16:53:33'),
(4, 11, 1, 1, 1, NULL, NULL, '2024-03-04 13:15:59', '2024-03-04 13:15:59', '2024-03-04 13:16:09'),
(5, 12, 1, 1, 1, 1, NULL, '2024-03-04 13:16:06', '2024-03-04 13:44:40', '2024-03-04 16:50:09'),
(6, 13, 1, 1, 1, 1, NULL, '2024-03-04 16:54:05', '2024-03-04 16:54:13', '2024-03-04 16:55:02'),
(7, 14, 1, 1, 1, 1, NULL, '2024-03-04 16:54:07', '2024-03-04 16:54:12', '2024-03-04 16:54:55'),
(8, 15, 1, 1, 1, 1, NULL, '2024-03-04 16:54:08', '2024-03-04 16:54:13', '2024-03-04 16:54:41'),
(9, 16, 1, 1, 1, NULL, NULL, '2024-03-04 16:54:09', '2024-03-04 16:54:09', '2024-03-04 16:55:00'),
(10, 17, 1, 1, 1, NULL, NULL, '2024-03-04 16:56:56', '2024-03-04 16:56:56', '2024-03-04 16:57:02'),
(11, 18, 1, 1, 1, NULL, NULL, '2024-03-04 16:56:57', '2024-03-04 16:56:57', '2024-03-04 16:57:20'),
(12, 19, 1, 1, 1, NULL, NULL, '2024-03-04 16:56:58', '2024-03-04 16:56:58', '2024-03-04 16:57:06'),
(13, 20, 1, 1, 1, NULL, NULL, '2024-03-04 16:56:59', '2024-03-04 16:56:59', '2024-03-04 16:58:05'),
(14, 21, 1, 1, 1, NULL, NULL, '2024-03-04 17:00:06', '2024-03-04 17:00:06', '2024-03-04 17:00:09'),
(15, 22, 1, 1, 1, NULL, NULL, '2024-03-04 17:00:08', '2024-03-04 17:00:08', '2024-03-04 17:04:42'),
(16, 23, 1, 1, 1, NULL, NULL, '2024-03-04 17:05:47', '2024-03-04 17:05:47', '2024-03-04 17:28:50'),
(17, 24, 1, 1, 1, NULL, NULL, '2024-03-04 17:05:48', '2024-03-04 17:05:48', '2024-03-04 17:16:00'),
(18, 25, 1, 2, 1, 2, NULL, '2024-03-04 17:05:48', '2024-03-04 17:34:14', '2024-03-04 17:34:20'),
(19, 26, 1, 1, 1, NULL, NULL, '2024-03-04 17:05:49', '2024-03-04 17:05:49', '2024-03-04 17:05:55'),
(20, 27, 2, 1, 2, 1, NULL, '2024-03-04 17:31:22', '2024-03-04 17:33:57', '2024-03-04 17:34:01'),
(21, 28, 2, 2, 2, 2, NULL, '2024-03-04 17:32:37', '2024-03-04 17:33:59', '2024-03-04 17:34:01'),
(22, 29, 2, 1, NULL, NULL, 1, '2024-03-04 17:33:53', '2024-03-04 17:37:36', NULL),
(23, 30, 2, 2, NULL, NULL, 2, '2024-03-04 17:34:24', '2024-03-04 17:37:11', NULL);

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `profile` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nickname` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `profile`, `nickname`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'test', '$2a$10$Ji83nF8fmMN2AdBEs5G5ueJi1a6y7Dyv6rLU6.XTlI4RqXu3KB8Lm', 'test@163.com', NULL, 'Bruce', '2024-03-04 10:47:55', '2024-03-04 10:47:55', NULL),
(2, 'test2', '$2a$10$Hc5Q8m4rtjcZMqZbBWxzverWXYnQvfPuW5e8vkSxBYOeijDdwWs3i', 'test2@163.com', NULL, NULL, '2024-03-04 16:49:39', '2024-03-04 16:49:39', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
