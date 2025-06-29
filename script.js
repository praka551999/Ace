document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const birthdateInput = document.getElementById('birthdate');
    const resultSection = document.querySelector('.result-section');
    const shareSection = document.querySelector('.share-section');
    const yearsDisplay = document.getElementById('years');
    const monthsDisplay = document.getElementById('months');
    const daysDisplay = document.getElementById('days');
    const progress = document.getElementById('progress');

    calculateBtn.addEventListener('click', calculateAge);
    birthdateInput.addEventListener('change', calculateAge);

    function calculateAge() {
        const birthdate = new Date(birthdateInput.value);
        const currentDate = new Date();
        
        if (birthdate > currentDate) {
            alert('Birthdate cannot be in the future!');
            return;
        }

        // Calculate age
        const years = currentDate.getFullYear() - birthdate.getFullYear();
        const months = currentDate.getMonth() - birthdate.getMonth();
        const days = currentDate.getDate() - birthdate.getDate();

        // Adjust months and days if needed
        if (days < 0) {
            const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0);
            days += lastMonth.getDate();
            months--;
        }
        if (months < 0) {
            months += 12;
            years--;
        }

        // Update displays
        yearsDisplay.textContent = years;
        monthsDisplay.textContent = months;
        daysDisplay.textContent = days;

        // Calculate progress
        const totalDays = Math.floor((currentDate - birthdate) / (1000 * 60 * 60 * 24));
        const maxDays = Math.floor((new Date(2147483647000) - birthdate) / (1000 * 60 * 60 * 24)); // Max date
        const progressPercentage = (totalDays / maxDays) * 100;
        progress.style.width = `${progressPercentage}%`;

        // Show results
        resultSection.classList.remove('hidden');
        shareSection.classList.remove('hidden');

        // Easter egg for centenarians
        if (years >= 100) {
            celebrateCentenarian();
        }
    }

    // Share functionality
    const shareBtn = document.getElementById('shareBtn');
    shareBtn.addEventListener('click', () => {
        const age = yearsDisplay.textContent;
        const text = `I'm ${age} years old! Check out this cool age calculator: `;
        
        if (navigator.share) {
            navigator.share({
                title: 'Age Calculator',
                text: text,
                url: window.location.href
            });
        } else {
            // Fallback for browsers without Web Share API
            const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}${encodeURIComponent(window.location.href)}`;
            window.open(shareUrl, '_blank');
        }
    });

    // Easter egg animation for centenarians
    function celebrateCentenarian() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        document.body.appendChild(confetti);

        // Add confetti animation
        confetti.innerHTML = `
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
        `;

        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
});
