//Qui ho messo un addEventListener al click del bottone che si occupa di inviare i dati a db
//attraverso un POST
document.getElementById('btnSubmit').addEventListener('click', async() => {
    const textInput = document.getElementById('nomeInput').value + " " + document.getElementById('cognomeInput').value;
    ;

    // Make a POST request to the API
    try {
        const response = await fetch('http://localhost:5000/api/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: textInput }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log(data.message);
            alert('Salvato a db: ' + textInput);
        } else {
            console.error(data.message);
            alert('Errore: ' + data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Non ha salvato proprio niente');
    }
});