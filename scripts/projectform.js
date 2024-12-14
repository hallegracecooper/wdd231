document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('feedbackForm');
    const feedbackCountDisplay = document.getElementById('feedbackCountDisplay');
    const feedbackData = JSON.parse(localStorage.getItem('feedbackData')) || [];

    let feedbackCount = feedbackData.length;
    feedbackCountDisplay.textContent = `You have submitted feedback ${feedbackCount} time(s).`;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!name || !email || !exerciseRating || !nutritionRating || !waterIntake) {
            alert('Please fill out all required fields.');
            return;
        }

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const exerciseRating = document.getElementById('exerciseRating').value;
        const nutritionRating = document.getElementById('nutritionRating').value;
        const waterIntake = document.getElementById('waterIntake').value;
        const successes = document.getElementById('successes').value;
        const improvements = document.getElementById('improvements').value;

        const feedbackEntry = {
            name,
            email,
            exerciseRating,
            nutritionRating,
            waterIntake,
            successes,
            improvements,
        };

        feedbackData.push(feedbackEntry);
        localStorage.setItem('feedbackData', JSON.stringify(feedbackData));

        feedbackCount++;
        localStorage.setItem('feedbackCount', feedbackCount);
        feedbackCountDisplay.textContent = `You have submitted feedback ${feedbackCount} time(s).`;

        alert(`Thank you, ${name}! Your feedback has been recorded.`);
        form.reset();
    });
});