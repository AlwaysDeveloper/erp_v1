module.exports = {
  up:
    'CREATE TABLE erp_v1.`user` (`iduser` INT NOT NULL,`username` VARCHAR(45) NOT NULL,`birthday` DATE NOT NULL,PRIMARY KEY (`username`),UNIQUE INDEX `iduser_UNIQUE` (`iduser` ASC) VISIBLE);',
  down: 'DROP TABLE user'
};
