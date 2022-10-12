CREATE TABLE libro (
  idlibro INT NOT NULL AUTO_INCREMENT,
  libro VARCHAR(200) NOT NULL,
  anno INT,
  pais VARCHAR(100),
  genero VARCHAR(150),
  autor VARCHAR(150),
  PRIMARY KEY (idlibro));