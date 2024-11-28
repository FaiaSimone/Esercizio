//Per l'utilizzo di queste librerie ho cercato come andavano inizializzate, era un po' che non utilizzavo mongoose
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Qua mi connetto a un db creato da me in locale 
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });

// Schema e modello del db molto semplici
const DataSchema = new mongoose.Schema({
    text: String,
});

const DataModel = mongoose.model('Data', DataSchema);

// Qua faccio la chiamata per salvare a db i dati
app.post('/api/data', async (req, res) => {
    const { text } = req.body;
    
    const newData = new DataModel({ text });
    
    try {
        await newData.save();
        res.status(201).send({ message: 'Salvato!' });
    } catch (error) {
        res.status(500).send({ message: 'Errore', error });
    }
});

// Il server lo si starta così 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});