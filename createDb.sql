/* MR: */
-- INSTRUCTIONS TO GET IT RUNNING ON AWS
-- wget http://repo.mysql.com/mysql-community-release-el7-5.noarch.rpm
-- sudo rpm -ivh mysql-community-release-el7-5.noarch.rpm
-- yum update
-- yum install mysql-server

-- sudo echo "lower_case_table_names=1" >> /etc/my.cnf

-- sudo service mysqld restart

-- create user 'nutri'@'localhost' IDENTIFIED BY 'YOUR-PASSWORD';
-- GRANT ALL PRIVILEGES ON *.* TO 'nutri'@'localhost';
-- ALTER USER 'nutri'@localhost IDENTIFIED WITH mysql_native_password BY 'YOUR-PASSWORD';

CREATE DATABASE nutri;
use nutri;

CREATE TABLE Usuario (
  id_usuario INTEGER PRIMARY KEY UNIQUE AUTO_INCREMENT,
  nome VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(100),
  adm BOOLEAN
);

CREATE TABLE Paciente (
  id_paciente INTEGER PRIMARY KEY UNIQUE AUTO_INCREMENT,
  nome VARCHAR(100),
  data_nascimento DATE,
  cpf VARCHAR(14),
  fk_endereco INTEGER
);

CREATE TABLE Plano (
  id_plano INTEGER PRIMARY KEY UNIQUE AUTO_INCREMENT,
  nome VARCHAR(100),
  descricao VARCHAR(1000)
);

CREATE TABLE PacientePlano (
  fk_plano INTEGER,
  fk_paciente INTEGER
);

--@TODO: Rever os tipos dos dados dessa coluna
CREATE TABLE Consulta (
  id_consulta INTEGER PRIMARY KEY UNIQUE AUTO_INCREMENT,
  peso FLOAT,
  altura FLOAT,
  percentual_gordura FLOAT,
  percentual_massa_magra FLOAT,
  tmb FLOAT,
  idade_metabolica FLOAT,
  gordura_visceral FLOAT,
  circunferencia_cervical FLOAT,
  circunferencia_cintura FLOAT,
  circunferencia_abdominal FLOAT,
  circunferencia_quadril FLOAT,
  vet FLOAT,
  ptn FLOAT,
  necessidade_hidrica FLOAT,
  classificacao FLOAT,
  peso_meta FLOAT,
  medicamento VARCHAR(100),
  tecnica_cirurgica VARCHAR(100),
  outras_cirurgias VARCHAR(100),
  atividade_fisica VARCHAR(100),
  frequencia_atividade_fisica VARCHAR(100),
  tipo_atividade_fisica VARCHAR(100),
  horario_atividade_fisica VARCHAR(100),
  funcionamento_intestino VARCHAR(100),
  distensao_abdominal VARCHAR(100),
  escala_bristol VARCHAR(100),
  fk_consultorio INTEGER,
  fk_plano INTEGER,
  fk_paciente INTEGER
);

CREATE TABLE Consultorio (
  id_consultorio INTEGER PRIMARY KEY UNIQUE AUTO_INCREMENT,
  nome VARCHAR(100)
);

CREATE TABLE Endereco (
  id_endereco INTEGER PRIMARY KEY UNIQUE AUTO_INCREMENT,
  rua VARCHAR(100),
  cep VARCHAR(9),
  numero INTEGER,
  bairro VARCHAR(50),
  cidade VARCHAR(50),
  uf VARCHAR(2)
);

CREATE TABLE Exame (
  id_exame INTEGER PRIMARY KEY UNIQUE AUTO_INCREMENT,
  descricao VARCHAR(1000),
  nome VARCHAR(100),
  fk_consulta INTEGER
);

CREATE TABLE Contrato (
  preco_consulta FLOAT,
  fk_plano INTEGER,
  fk_consultorio INTEGER
);

ALTER TABLE Paciente ADD CONSTRAINT FK_Paciente_2
  FOREIGN KEY (fk_endereco)
  REFERENCES Endereco (id_endereco)
  ON DELETE SET NULL;

ALTER TABLE PacientePlano ADD CONSTRAINT FK_PacientePlano_1
  FOREIGN KEY (fk_plano)
  REFERENCES Plano (id_plano);

ALTER TABLE PacientePlano ADD CONSTRAINT FK_PacientePlano_2
  FOREIGN KEY (fk_paciente)
  REFERENCES Paciente (id_paciente);

ALTER TABLE Consulta ADD CONSTRAINT FK_Consulta_1
  FOREIGN KEY (fk_consultorio)
  REFERENCES Consultorio (id_consultorio)
  ON DELETE CASCADE;

ALTER TABLE Consulta ADD CONSTRAINT FK_Consulta_2
  FOREIGN KEY (fk_plano)
  REFERENCES Plano (id_plano);

ALTER TABLE Consulta ADD CONSTRAINT FK_Consulta_3
  FOREIGN KEY (fk_paciente)
  REFERENCES Paciente (id_paciente);

ALTER TABLE Exame ADD CONSTRAINT FK_Exame_2
  FOREIGN KEY (fk_consulta)
  REFERENCES Consulta (id_consulta)
  ON DELETE CASCADE;

ALTER TABLE Contrato ADD CONSTRAINT FK_Contrato_1
  FOREIGN KEY (fk_plano)
  REFERENCES Plano (id_plano);

ALTER TABLE Contrato ADD CONSTRAINT FK_Contrato_2
  FOREIGN KEY (fk_consultorio)
  REFERENCES Consultorio (id_consultorio);
