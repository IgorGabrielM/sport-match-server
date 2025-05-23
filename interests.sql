-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 05/05/2024 às 17:45
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `studyspace`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `interests`
--

CREATE TABLE `interests` (
  `idInterest` int(11) NOT NULL,
  `text` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `interests`
--

INSERT INTO `interests` (`idInterest`, `text`) VALUES
(1, 'Programação'),
(2, 'Cybersegurança'),
(5, 'Design'),
(6, 'UI'),
(7, 'UX'),
(8, 'UI/UX'),
(9, 'Geografia'),
(10, 'Sistemas embarcados'),
(11, 'Programação competitiva'),
(12, 'Física'),
(13, 'Biologia'),
(14, 'Biomedicina'),
(15, 'Idiomas'),
(16, 'Inglês'),
(17, 'Japônes'),
(18, 'Alemão'),
(19, 'Russo'),
(20, 'Espanhol'),
(21, 'Algoritmos'),
(22, 'Medicina'),
(23, 'IA'),
(24, 'Deep Learning'),
(25, 'Machine Learning'),
(26, 'Redes neurais'),
(27, 'Automação'),
(28, 'Criptografia'),
(29, 'OS'),
(30, 'Python'),
(31, 'Java'),
(32, 'go'),
(33, 'Javascript'),
(34, 'Node,js'),
(35, 'React'),
(36, 'Angular'),
(37, 'Vue.js'),
(38, 'Spring Boot'),
(39, 'Front-end'),
(40, 'Back-end'),
(41, 'Cloud'),
(42, 'DevOps'),
(43, 'Full Stack'),
(44, 'Redes'),
(45, 'Tradução'),
(46, 'Eletrônica'),
(47, 'Eletroeletrônica');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `interests`
--
ALTER TABLE `interests`
  ADD PRIMARY KEY (`idInterest`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `interests`
--
ALTER TABLE `interests`
  MODIFY `idInterest` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
