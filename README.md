## MATCO Teletext
Spletna stran imenovana **MATCO Teletekst** predstavlja simulacijo znane rešitve avtorja John Adamsa (1970).

Podatki so shranjeni v RDBMS mySQL, ki teče (v razvojnem okolju) na naslovu: http://localhost:3001.

Podatkovno bazo zaženemo z ukazom `npm run devstart`.

## ER diagram
Tabele so oblikovane v RDBMS mySQL. Osnovni podatki so naslednji:
- host: localhost
- user: stefanmasic
- database: matcoteletext
- password: ********
- tabele: novica, kategorija, kontakti

![ER diagram](https://user-images.githubusercontent.com/101993285/229517590-6c8db453-a990-45d7-bee3-abcb6e058eea.png)
<br>

## API
GET /api/novice
GET /api/naslednjanovica/:id
GET /api/predhodnanovica/:id
GET /api/novica




>**MATCO logotip** predpona je dodano kot posvetilo priznanemu slovenskemu nožarju Mateju, umetniku med obrtniki njegovega stanu ter dolgoletnemu sponzorju avtorja.
