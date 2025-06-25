window.addEventListener('DOMContentLoaded', (event) => {
    const games = [
        { name: 'Dominoes', prizePool: 50, image: '...', genre: 'Strategy' },
        { name: 'Chess', prizePool: 30, image: '...', genre: 'Strategy' },
        { name: 'Football', prizePool: 100, image: '...', genre: 'Sports' },
        { name: 'Poker', prizePool: 100, image: '...', genre:   'Casino' },
        { name: 'Ludo', prizePool: 40, image: '...', genre: 'Board' },
        { name: 'Scrabble', prizePool: 60, image: '...', genre: 'Word' },   
        { name: 'Slot Machine', prizePool: 80, image: '...', genre: 'Casino' },
        { name: 'Roulette', prizePool: 120, image: '...', genre: 'Casino' },
        { name: 'Blackjack', prizePool: 90, image: '...', genre: 'Card' }      
    ]
    const gameList = document.querySelector('.games-container');
    const displayGames = (games) => {
        gameList.innerHTML = '';
        games.forEach(game => {
            const gameItem = document.createElement('div');
            //gameItem.className = 'game-item';
            gameItem.innerHTML = `
                <img src="${game.image}" alt="${game.name}">
                <h3>${game.name}</h3>
                <p>Prize Pool: $${game.prizePool}</p>
                <p>Genre: ${game.genre}</p>
            `;
            gameList.appendChild(gameItem);
        });
    };
    displayGames(games);

    const wheel = document.querySelector('#wheel');

    const spinButton = document.querySelector('#spin-btn');
    let isSpinning = false;
    let rotation = 0;
    spinButton.addEventListener('click', () => {
        if (isSpinning) return;
        isSpinning = true;
        
        rotation += 360; // Increment rotation by 360 degrees
        const randomRotation = 360 * (3 + Math.floor(Math.random() * 360));
        wheel.style.transition = 'transform 2s ease-out';
        wheel.style.transform = `rotate(${randomRotation}deg)`;
        setTimeout(() => {
           
            isSpinning = false;
        }, 2000);
        
    });
    


});
