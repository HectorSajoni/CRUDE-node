
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema biblio
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema biblio
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `biblio` DEFAULT CHARACTER SET utf8 ;
USE `biblio` ;

-- -----------------------------------------------------
-- Table `biblio`.`libro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `biblio`.`libro` (
  `idlibro` INT NOT NULL AUTO_INCREMENT,
  `libro` VARCHAR(200) NOT NULL,
  `anno` INT,
  `pais` VARCHAR(100),
  `genero` VARCHAR(150),
  `autor` VARCHAR(150),
  PRIMARY KEY (`idlibro`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

insert into libro(libro,anno,pais,genero,autor) values("Rebeldes",2000,"gringlandia","ficción","Susan Hinton");
insert into libro(libro,anno,pais,genero,autor) values("El cerebro",2010,"México","educación","Roberto");
insert into libro(libro,anno,pais,genero,autor) values("Métodos de invetigación",1930,"México","Aburrido","Rosario");
insert into libro(libro,anno,pais,genero,autor) values("Luna de Plutón",2014,"Plonia","ficción","Dross");
insert into libro(libro,anno,pais,genero,autor) values("El principito",1920,"Francia","infantil","Antonio");
insert into libro(libro,anno,pais,genero,autor) values("La cabaña",2011,"Reino Unido","terror","Paul");





