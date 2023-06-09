USE matcoteletext;

-- SELECT ukazi za potrebe testa ...
SELECT * FROM novica; 
SELECT * FROM kategorija;
SELECT * FROM kontakt;

-- CREATE ukazi ...
CREATE TABLE novica (
stevilkanovice INT NOT NULL PRIMARY KEY,
nazivnovice varchar(40) NOT NULL,
opisnovice varchar(80) NOT NULL,
oznakakategorije varchar(20) NOT NULL,
datumoblikovanja datetime
);

CREATE TABLE kategorija (
oznakakategorije VARCHAR(20) NOT NULL PRIMARY KEY,
opiskategorije VARCHAR(80) NOT NULL,
stevilkakategorije INT NOT NULL
);

INSERT INTO novica VALUES (100, 'Hujša nevihta v Mariboru', 'Na Štajerskem, predvsem na širšem območju Maribora se je popoldne razvila hujša nevihta, ponekod je padala toča', 'Novica');
INSERT INTO novica VALUES (111, '25 let od potresa v posočju', 'Zgornje Posočje je na velikonočno nedeljo pred 25 leti stresel najmočnejši potres.', 'Novica');
INSERT INTO novica VALUES (112, 'Najnižja rast števila upokojencev', 'Lani je bilo prejemnikov pokojnin v povprečju malenkost več kot 628 tisoč.', 'Novica');
INSERT INTO novica VALUES (144, 'Posli največjega orožarja cvetijo', 'Posel podjetij, ki proizvajajo vojaško in obrambno opremo, cvetijo.', 'Novica');
INSERT INTO novica VALUES (161, 'Napoved za Slovenijo', 'Popoldne bo povečini sončno.', 'Vreme');
INSERT INTO novica VALUES (503, 'NBA sprožil preiskavo Dallasa', 'Liga NBA je začela preiskavo srečanja z Dallasom in Chicagom.', 'Šport');
INSERT INTO novica (stevilkanovice, nazivnovice, opisnovice, oznakakategorije) VALUES (801, 'Torek, 6.6.2023', '6:05 Odmevi, ponovitev\r6:30 Šport, ponovitev', 'TV spored');
INSERT INTO novica (stevilkanovice, nazivnovice, opisnovice, oznakakategorije) VALUES (082, 'Sreda, 7.6.2023', '6:05 Odmevi, ponovitev\r 6:30 Šport, ponovitev\r 6:45 Superjelen Jani', 'TV spored');

INSERT INTO kategorija (oznakakategorije, opiskategorije, stevilkakategorije) VALUES ('Novica', 'Splošne novice', 100);
INSERT INTO kategorija (oznakakategorije, opiskategorije, stevilkakategorije) VALUES ('Vreme', 'Vremenske novice', 200);
INSERT INTO kategorija (oznakakategorije, opiskategorije, stevilkakategorije) VALUES ('Kultura', 'Kulturne novice', 400);
INSERT INTO kategorija (oznakakategorije, opiskategorije, stevilkakategorije) VALUES ('Šport', 'Športne novice', 500);
INSERT INTO kategorija (oznakakategorije, opiskategorije, stevilkakategorije) VALUES ('Zabava', 'Zabava, vici', 600);
INSERT INTO kategorija (oznakakategorije, opiskategorije, stevilkakategorije) VALUES ('TV', 'TV spored', 700);
INSERT INTO kategorija (oznakakategorije, opiskategorije, stevilkakategorije) VALUES ('Radio', 'Radijski spored', 800);

DELETE FROM novica WHERE 1 = 1;
DELETE FROM kategorija WHERE oznakakategorije = 'Vreme';
SELECT * FROM novica;
SELECT * FROM kategorija;

-- Poišči novico, ki je večja od trenutne
SELECT * FROM novica WHERE stevilkanovice > 100 LIMIT 1;