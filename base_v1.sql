-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`tipoUsuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tipoUsuarios` (
  `ID` INT NOT NULL,
  `desc` VARCHAR(45) NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Usuarios` (
  `idUsuario` INT NOT NULL,
  `Nombre` VARCHAR(45) NULL,
  `Apellido` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `contraseña` INT NULL,
  `TipoUsuario` INT NULL,
  `Archivos_idArchivo` INT NOT NULL,
  `tipoUsuarios_ID` INT NOT NULL,
  PRIMARY KEY (`idUsuario`),
  INDEX `fk_Usuarios_tipoUsuarios1_idx` (`tipoUsuarios_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Usuarios_tipoUsuarios1`
    FOREIGN KEY (`tipoUsuarios_ID`)
    REFERENCES `mydb`.`tipoUsuarios` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tipoArchivo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tipoArchivo` (
  `ID` INT NOT NULL,
  `desc` VARCHAR(45) NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Permisos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Permisos` (
  `idArchivo` INT NOT NULL,
  `nombreArchivo` VARCHAR(45) NULL,
  `Dueño` VARCHAR(45) NULL,
  `Permisos` CHAR(2) NULL,
  `tipoArchivo` VARCHAR(45) NULL,
  `tipoArchivo_ID` INT NOT NULL,
  `Usuarios_idUsuario` INT NOT NULL,
  PRIMARY KEY (`idArchivo`),
  INDEX `fk_Archivos_tipoArchivo1_idx` (`tipoArchivo_ID` ASC) VISIBLE,
  INDEX `fk_Archivos_Usuarios1_idx` (`Usuarios_idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_Archivos_tipoArchivo1`
    FOREIGN KEY (`tipoArchivo_ID`)
    REFERENCES `mydb`.`tipoArchivo` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Archivos_Usuarios1`
    FOREIGN KEY (`Usuarios_idUsuario`)
    REFERENCES `mydb`.`Usuarios` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`table1`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`table1` (
  `ID` INT NOT NULL,
  `desc` VARCHAR(45) NULL,
  `Permisos_idArchivo` INT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `fk_table1_Permisos1_idx` (`Permisos_idArchivo` ASC) VISIBLE,
  CONSTRAINT `fk_table1_Permisos1`
    FOREIGN KEY (`Permisos_idArchivo`)
    REFERENCES `mydb`.`Permisos` (`idArchivo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
