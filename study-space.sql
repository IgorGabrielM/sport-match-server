-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 05/05/2024 às 23:32
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
-- Banco de dados: `study-space`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `interest`
--

CREATE TABLE `interest` (
  `idInterest` int(11) NOT NULL,
  `text` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `interest`
--

INSERT INTO `interest` (`idInterest`, `text`) VALUES
(1, 'Programação'),
(2, 'Cybersegurança'),
(3, 'Design'),
(4, 'UI'),
(5, 'UX'),
(6, 'UI/UX'),
(7, 'Geografia'),
(8, 'Sistemas embarcados'),
(9, 'Programação competitiva'),
(10, 'Física'),
(11, 'Biologia'),
(12, 'Biomedicina'),
(13, 'Idiomas'),
(14, 'Inglês'),
(15, 'Japônes'),
(16, 'Alemão'),
(17, 'Russo'),
(18, 'Espanhol'),
(19, 'Algoritmos'),
(20, 'Medicina'),
(21, 'IA'),
(22, 'Deep Learning'),
(23, 'Machine Learning'),
(24, 'Redes neurais'),
(25, 'Automação'),
(26, 'Criptografia'),
(27, 'OS'),
(28, 'Python'),
(29, 'Java'),
(30, 'go'),
(31, 'Javascript'),
(32, 'Node,js'),
(33, 'React'),
(34, 'Angular'),
(35, 'Vue.js'),
(36, 'Spring Boot'),
(37, 'Front-end'),
(38, 'Back-end'),
(39, 'Cloud'),
(40, 'DevOps'),
(41, 'Full Stack'),
(42, 'Redes'),
(43, 'Tradução'),
(44, 'Eletrônica'),
(45, 'Eletroeletrônica'),
(46, 'Figma');

-- --------------------------------------------------------

--
-- Estrutura para tabela `interest_media`
--

CREATE TABLE `interest_media` (
  `idInterest` int(11) NOT NULL,
  `idMedia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `media`
--

CREATE TABLE `media` (
  `idMedia` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `imageUrl` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `post`
--

CREATE TABLE `post` (
  `idPost` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `text` varchar(255) NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `likesCount` int(11) NOT NULL,
  `commentsCount` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `userIdUser` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `post`
--

INSERT INTO `post` (`idPost`, `title`, `text`, `imageUrl`, `likesCount`, `commentsCount`, `createdAt`, `updatedAt`, `userIdUser`) VALUES
(1, 'The AI Revolution: The Road to Superintelligence', '', 'https://imgv3.fotor.com/images/share/wonderland-girl-generated-by-Fotor-ai-art-generator.jpg', 0, 0, '2021-06-01 00:00:00', '2021-06-01 00:00:00', 11),
(2, 'The AI Revolution: The Road to Superintelligence', '', 'https://imgv3.fotor.com/images/share/wonderland-girl-generated-by-Fotor-ai-art-generator.jpg', 0, 0, '2021-06-01 00:00:00', '2021-06-01 00:00:00', 11),
(3, 'The AI Revolution: The Road to Superintelligence', '', 'https://imgv3.fotor.com/images/share/wonderland-girl-generated-by-Fotor-ai-art-generator.jpg', 0, 0, '2021-06-01 00:00:00', '2021-06-01 00:00:00', 11),
(4, 'The AI Revolution: The Road to Superintelligence', '', 'https://imgv3.fotor.com/images/share/wonderland-girl-generated-by-Fotor-ai-art-generator.jpg', 0, 0, '2021-06-01 00:00:00', '2021-06-01 00:00:00', 11),
(5, 'The AI Revolution: The Road to Superintelligence', '', 'https://imgv3.fotor.com/images/share/wonderland-girl-generated-by-Fotor-ai-art-generator.jpg', 0, 0, '2021-06-01 00:00:00', '2021-06-01 00:00:00', 11),
(6, 'The AI Revolution: The Road to Superintelligence', '', 'https://imgv3.fotor.com/images/share/wonderland-girl-generated-by-Fotor-ai-art-generator.jpg', 0, 0, '2021-06-01 00:00:00', '2021-06-01 00:00:00', 11),
(7, 'The AI Revolution: The Road to Superintelligence', '', 'https://imgv3.fotor.com/images/share/wonderland-girl-generated-by-Fotor-ai-art-generator.jpg', 0, 0, '2021-06-01 00:00:00', '2021-06-01 00:00:00', 11);

-- --------------------------------------------------------

--
-- Estrutura para tabela `post_comment`
--

CREATE TABLE `post_comment` (
  `idPostComment` int(11) NOT NULL,
  `text` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `postIdPost` int(11) DEFAULT NULL,
  `userIdUser` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `post_interest`
--

CREATE TABLE `post_interest` (
  `idInterest` int(11) NOT NULL,
  `idPost` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `post_interest`
--

INSERT INTO `post_interest` (`idInterest`, `idPost`) VALUES
(21, 7),
(22, 7),
(23, 7);

-- --------------------------------------------------------

--
-- Estrutura para tabela `user`
--

CREATE TABLE `user` (
  `idUser` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `bio` varchar(255) NOT NULL,
  `birthdate` datetime NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `idRole` int(11) NOT NULL,
  `gender` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `user`
--

INSERT INTO `user` (`idUser`, `name`, `email`, `password`, `imageUrl`, `bio`, `birthdate`, `createdAt`, `idRole`, `gender`) VALUES
(10, 'Nailton', 'nailton@studyspace.com', '123456', 'https://images.ctfassets.net/sfnkq8lmu5d7/3hILT7sEt4cwqwO4Yfzieo/20c6cefed24161bfd6828742c2728540/The-Wildest_Editorial_Get_Your_Puppy_Off_to_a_Good_Start_Hero.jpg?w=1000&h=750&fl=progressive&q=70&fm=jpg', 'Estudante de Engenharia de Software', '0000-00-00 00:00:00', '2024-05-05 20:45:48', 0, 'Masculino'),
(11, 'Nailton', 'nailton@studyspace.com', '123456', 'https://images.ctfassets.net/sfnkq8lmu5d7/3hILT7sEt4cwqwO4Yfzieo/20c6cefed24161bfd6828742c2728540/The-Wildest_Editorial_Get_Your_Puppy_Off_to_a_Good_Start_Hero.jpg?w=1000&h=750&fl=progressive&q=70&fm=jpg', 'Estudante de Engenharia de Software', '0000-00-00 00:00:00', '2024-05-05 20:48:24', 0, 'Masculino');

-- --------------------------------------------------------

--
-- Estrutura para tabela `user_interest`
--

CREATE TABLE `user_interest` (
  `idUser` int(11) NOT NULL,
  `idInterest` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `user_interest`
--

INSERT INTO `user_interest` (`idUser`, `idInterest`) VALUES
(11, 5),
(11, 7),
(11, 46);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `interest`
--
ALTER TABLE `interest`
  ADD PRIMARY KEY (`idInterest`);

--
-- Índices de tabela `interest_media`
--
ALTER TABLE `interest_media`
  ADD PRIMARY KEY (`idInterest`,`idMedia`),
  ADD KEY `IDX_b551d7dbaf248441457da0cefa` (`idInterest`),
  ADD KEY `IDX_d10455020f9200fedc1b6b24ab` (`idMedia`);

--
-- Índices de tabela `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`idMedia`);

--
-- Índices de tabela `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`idPost`),
  ADD KEY `FK_543ab9a991e4a64b0124d9dc3e4` (`userIdUser`);

--
-- Índices de tabela `post_comment`
--
ALTER TABLE `post_comment`
  ADD PRIMARY KEY (`idPostComment`),
  ADD KEY `FK_7788dffa8e2e1fa006a97bac357` (`postIdPost`),
  ADD KEY `FK_0835bf0ea5b3496c7872023b15f` (`userIdUser`);

--
-- Índices de tabela `post_interest`
--
ALTER TABLE `post_interest`
  ADD PRIMARY KEY (`idInterest`,`idPost`),
  ADD KEY `IDX_be7b708cef9129e551abca30fc` (`idInterest`),
  ADD KEY `IDX_cbf2264090d82a18c0d5c025d0` (`idPost`);

--
-- Índices de tabela `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`idUser`);

--
-- Índices de tabela `user_interest`
--
ALTER TABLE `user_interest`
  ADD PRIMARY KEY (`idUser`,`idInterest`),
  ADD KEY `IDX_30f1c2c32a00053d7f505fd3fc` (`idUser`),
  ADD KEY `IDX_84e0eaed8bf676fd7ae97d70e1` (`idInterest`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `interest`
--
ALTER TABLE `interest`
  MODIFY `idInterest` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT de tabela `media`
--
ALTER TABLE `media`
  MODIFY `idMedia` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `post`
--
ALTER TABLE `post`
  MODIFY `idPost` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `post_comment`
--
ALTER TABLE `post_comment`
  MODIFY `idPostComment` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `user`
--
ALTER TABLE `user`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `interest_media`
--
ALTER TABLE `interest_media`
  ADD CONSTRAINT `FK_b551d7dbaf248441457da0cefa7` FOREIGN KEY (`idInterest`) REFERENCES `interest` (`idInterest`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_d10455020f9200fedc1b6b24abc` FOREIGN KEY (`idMedia`) REFERENCES `media` (`idMedia`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restrições para tabelas `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `FK_543ab9a991e4a64b0124d9dc3e4` FOREIGN KEY (`userIdUser`) REFERENCES `user` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `post_comment`
--
ALTER TABLE `post_comment`
  ADD CONSTRAINT `FK_0835bf0ea5b3496c7872023b15f` FOREIGN KEY (`userIdUser`) REFERENCES `user` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_7788dffa8e2e1fa006a97bac357` FOREIGN KEY (`postIdPost`) REFERENCES `post` (`idPost`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `post_interest`
--
ALTER TABLE `post_interest`
  ADD CONSTRAINT `FK_be7b708cef9129e551abca30fc3` FOREIGN KEY (`idInterest`) REFERENCES `interest` (`idInterest`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_cbf2264090d82a18c0d5c025d0a` FOREIGN KEY (`idPost`) REFERENCES `post` (`idPost`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `user_interest`
--
ALTER TABLE `user_interest`
  ADD CONSTRAINT `FK_30f1c2c32a00053d7f505fd3fc9` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_84e0eaed8bf676fd7ae97d70e16` FOREIGN KEY (`idInterest`) REFERENCES `interest` (`idInterest`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
