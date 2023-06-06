const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');  // Obvezna uporaba mysql2 zaradi avtentikacije.

 
const app = express();

const db = mysql.createPool({
    host: 'localhost',
    user: 'stefanmasic',
    database: 'matcoteletext',
    password: 'smasic1'
});

// Potreben Middleware.
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


// ----------------------------------
// NOVICE: novica, naslednja, predhodna.
// ----------------------------------
// Vrni vse novice
app.get('/api/novice', (req, res) => {
    const sqlStmt = "SELECT * FROM novica;";
    db.query(sqlStmt, (err, result) => {
        if (err) console.log("Napaka GET /api/novice/", err);
        res.send(result);
    });
});

// Poišči naslednjo novico. 
app.get('/api/naslednjanovica/:id', (req, res) => {
    const stNovice = req.params.id;
	
	const sqlStmt = "SELECT * FROM novica WHERE stevilkanovice > ? LIMIT 1;";
    db.query(sqlStmt, stNovice, (err, result) => {
        if (err) console.log("Napaka GET /api/naslednjanovica/", err);

		numRows = result.length;
		if (numRows === 1) {
			res.send(result);
		} else {
			console.log("Najdena ni nobena vrstica! Morda je to zadnja novica.");
		}
    });
});

// Poišči predhodno novico. Seznam moramo urediti padajoce.
// V kolikor je zadnja, je numRows = 0 in ne vrne nicesar.
app.get('/api/predhodnanovica/:id', (req, res) => {
    const stNovice = req.params.id;
	
	const sqlStmt = "SELECT * FROM novica WHERE stevilkanovice < ? ORDER BY stevilkanovice DESC LIMIT 1;";
    db.query(sqlStmt, stNovice, (err, result) => {
        if (err) console.log("Napaka GET /api/predhodnanovica/", err);

		numRows = result.length;
		if (numRows === 1) {
			res.send(result);
		} else {
			let ts = Date.now();
			console.log(`Najdena ni nobena vrstica! Morda je to prva novica. (TS: ${ts})`);
		}
    });
});


app.get("/api/novice/:id", (req, res) => {
    const stNovice = req.params.id;

    const sqlStmt = "SELECT * FROM novica WHERE stevilkanovice = ?";
    db.query(sqlStmt, stNovice, (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
});

app.post('/api/novica', (req, res) => {
    // Privzamemo vrednosti iz obrazca.
    const stevilkanovice = req.body.stevilkanovice;
    const nazivnovice = req.body.nazivnovice;
    const opisnovice = req.body.opisnovice;
    const oznakakategorije = req.body.oznakakategorije;

    const sqlStmt = "INSERT INTO novica (stevilkanovice, nazivnovice, opisnovice, oznakakategorije) VALUES (?, ?, ?, ?);";
    db.query(sqlStmt, [stevilkanovice, nazivnovice, opisnovice, oznakakategorije], (err, result) => {
        if (err) console.log(err);
    });
});
// ----------------------------------
// ----------------------------------



// ----------------------------------
// KONTAKTI.
// ----------------------------------
// GET zahteva za vse kontakte.
app.get('/api/kontakti', (req, res) => {
    const sqlStmt = "SELECT * FROM kontakt;";
    db.query(sqlStmt, (err, result) => {
        console.log(err);
        res.send(result);
    });
});

// POST zahteva za vpis kontata.
app.post('/api/kontakt', (req, res) => {
    // Privzamemo vrednosti iz obrazca.
    const elektronskaposta = req.body.elektronskaposta;
    const sporocilo = req.body.sporocilo;

    const sqlStmt = "INSERT INTO kontakt (elektronskaposta, sporocilo) VALUES (?, ?);";
    db.query(sqlStmt, [elektronskaposta, sporocilo], (err, result) => {
        if (err) console.log(err);
    });
});

app.put('/api/kontakt', (req, res) => {
    const oznaka = req.body.elektronskaposta;
    const sporocilo = req.body.sporocilo;

    const sqlStmt = "UPDATE kontakt SET sporocilo = ? WHERE elektronskaposta = ?";
    db.query(sqlStmt, [sporocilo, oznaka], (err, result) => {
        if (err) console.log(err);
    });
});

app.delete('/api/kontakt/:kontakt', (req, res) => {
    const oznaka = req.params.kontakt;

    const sqlStmt = "DELETE FROM kontakt WHERE elektronskaposta = ?";
    db.query(sqlStmt, oznaka, (err, result) => {
        if (err) console.log(err);
    });
});


app.listen(3001, (err) => {
    if (err) {
        console.log("MySQL napaka: ", err, "!");
    } else {
        console.log("Running on port 3001.");
    }
});