// Correct answers for each question
const correctAnswers = {
    q1: "c",
    q2: "d",
    q3: "b",
    q4: "b",
    q5: "c",
    q6: "b",
    q7: "b",
    q8: "a",
    q9: "a",
    q10: "d"
};

// Function to calculate score
function calculateScore() {
    let score = 0;
    const form = document.getElementById("quiz-form");
    const result = document.getElementById("result");
    const scoreText = document.getElementById("score");

    // Loop through correctAnswers and check user's answers
    for (const [question, correctAnswer] of Object.entries(correctAnswers)) {
        const userAnswer = form.elements[question].value;
        if (userAnswer === correctAnswer) {
            score++;
        }
    }

    // Display score and thank you message
    scoreText.innerText = `Your score: ${score} / ${Object.keys(correctAnswers).length}`;
    result.style.display = "block";
}

app.post('/submit-survey', (req, res) => {
    const formData = req.body;

    // Save form data to a JSON file
    fs.readFile('survey_data.json', 'utf8', (err, data) => {
        if (err && err.code === 'ENOENT') {
            // If file does not exist, create an empty array
            data = '[]';
        } else if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        let surveys = JSON.parse(data);
        surveys.push(formData);
        fs.writeFile('survey_data.json', JSON.stringify(surveys, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            console.log('Survey data saved!');
            res.send('Thank you for your feedback!');
        });
    });
});
