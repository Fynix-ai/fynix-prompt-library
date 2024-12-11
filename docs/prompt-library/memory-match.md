---
id: memory-match
title: Memory Match Challenge
sidebar_label: Memory Match
---

# Memory Match Challenge

The **Memory Match Challenge** is a fully interactive card-flipping game implemented as a single HTML file. Players match pairs of cards while enjoying smooth animations and responsive design. The app includes various difficulty levels and accessible game mechanics.

---

##  **Prompt**

Write a fully complete web app as a single HTML file. The app should be a memory matching game where players flip cards to find matching pairs of images. The app should include the following features:


* Card Layout:
    * Display cards in a grid layout appropriate to the difficulty level:
        * Easy: 4x2 grid (8 cards, 4 pairs)
        * Medium: 4x4 grid (16 cards, 8 pairs)
        * Hard: 6x4 grid (24 cards, 12 pairs)
    * Ensure that each image has an exact matching pair (no more, no less).
* Images:
    * Use a set of placeholder images such as emojis or Font Awesome icons for the card faces.
    * Make sure that all pairs are correctly matched and no card is left without a matching pair.
* Card Appearance:
    * The face-down cards (before flipping) should be visible with a distinct color or design (e.g., a patterned background or an icon) so that players can see the cards on the grid.
    * When flipped, the card reveals its face image.
* Difficulty Levels:
    * Allow the player to select a difficulty level before starting the game.
    * Provide an option to return to the difficulty selection screen at any time.
* Game Mechanics:
    * Shuffle the cards randomly at the start of each game.
    * When a player clicks on a card, it flips to reveal the image.
    * Only two cards can be flipped face-up at the same time.
    * If the two flipped cards match, they remain face-up, and their appearance changes (e.g., fade out, change color) to indicate a successful match.
    * If they do not match, they flip back after a short delay (e.g., 1 second).
* Scoring and Timing:
    * Include a timer that starts when the first card is flipped and stops when all pairs are found.
    * Display a counter for the number of attempts (each attempt counts when two cards have been flipped).
* User Interface:
    * Provide a start/restart button.
    * Include a message or modal that congratulates the player upon completing the game, displaying the total time taken and the number of attempts.
    * Offer an option to play again or select a different difficulty level after the game ends.
    * Use Tailwind CSS for styling to create a visually appealing and responsive design.
    * Include smooth flip animations for the cards using CSS transitions.
    * Ensure the app is mobile-friendly and responsive on different screen sizes.
* Accessibility:
    * Use semantic HTML5 elements.
    * Ensure accessibility features such as ARIA labels for better screen reader support.

Please provide the complete HTML file with embedded JavaScript and Tailwind CSS styling, all contained within a single file. Ensure that all features work correctly, that the face-down cards are visible before flipping, and that there are no unmatched cards in any difficulty level.

---

##  **Expected Output**

Below is the **complete HTML file** implementing the Memory Match Challenge:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Memory Match Challenge</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    /* Flip card styles */
    .flip-card {
      perspective: 1000px;
      width: 100%;
      height: 100%;
    }
    .flip-card-inner {
      transition: transform 0.6s;
      transform-style: preserve-3d;
      position: relative;
      width: 100%;
      height: 100%;
    }
    .flipped .flip-card-inner {
      transform: rotateY(180deg);
    }
    .matched .flip-card-inner {
      opacity: 0.6; /* Fade-out effect */
    }
    .flip-card-front, .flip-card-back {
      backface-visibility: hidden;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      border-radius: 0.5rem;
    }
    .flip-card-back {
      transform: rotateY(180deg);
    }
    .card-container {
      height: 80px;
    }
  </style>
</head>
<body class="bg-gray-100 flex flex-col items-center justify-center min-h-screen">
  <div class="w-full max-w-md mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4 text-center">Memory Match Challenge</h1>
    <div id="start-screen" class="text-center">
      <p class="mb-4">Select Difficulty Level:</p>
      <button class="difficulty-btn bg-blue-500 text-white px-4 py-2 m-2 rounded" data-level="easy">Easy</button>
      <button class="difficulty-btn bg-yellow-500 text-white px-4 py-2 m-2 rounded" data-level="medium">Medium</button>
      <button class="difficulty-btn bg-red-500 text-white px-4 py-2 m-2 rounded" data-level="hard">Hard</button>
    </div>
    <div id="game-stats" class="hidden mb-4 flex justify-between items-center">
      <div>Time: <span id="timer">0</span>s</div>
      <div>Attempts: <span id="attempts">0</span></div>
      <button id="restart-btn" class="bg-gray-500 text-white px-2 py-1 rounded">Restart</button>
    </div>
    <div id="game-grid" class="grid gap-2"></div>
  </div>
  <script>
    const startScreen = document.getElementById('start-screen');
    const gameGrid = document.getElementById('game-grid');
    const timerEl = document.getElementById('timer');
    const attemptsEl = document.getElementById('attempts');
    const restartBtn = document.getElementById('restart-btn');

    let difficulty, cardSymbols, firstCard, secondCard, matchesFound, attempts, timer, timeElapsed;

    const symbols = ['🍎','🍌','🍒','🍇','🍉','🍓','🍍','🥝'];

    document.querySelectorAll('.difficulty-btn').forEach(button => {
      button.addEventListener('click', () => {
        difficulty = button.dataset.level;
        startGame();
      });
    });

    restartBtn.addEventListener('click', resetGame);

    function startGame() {
      startScreen.classList.add('hidden');
      resetGame();
    }

    function resetGame() {
      clearInterval(timer);
      [matchesFound, attempts, timeElapsed] = [0, 0, 0];
      timerEl.textContent = timeElapsed;
      attemptsEl.textContent = attempts;
      gameGrid.innerHTML = '';
      setupGame();
      startTimer();
    }

    function setupGame() {
      const pairs = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 8 : 12;
      cardSymbols = symbols.slice(0, pairs).concat(symbols.slice(0, pairs)).sort(() => 0.5 - Math.random());
      gameGrid.className = `grid gap-2 grid-cols-${difficulty === 'hard' ? 6 : 4}`;
      cardSymbols.forEach(symbol => gameGrid.appendChild(createCard(symbol)));
    }

    function createCard(symbol) {
      const card = document.createElement('div');
      card.className = 'flip-card bg-blue-500 text-white rounded flex items-center justify-center text-4xl';
      card.textContent = '❓';
      card.dataset.symbol = symbol;
      card.addEventListener('click', () => flipCard(card));
      return card;
    }

    function flipCard(card) {
      if (firstCard && secondCard) return;
      card.textContent = card.dataset.symbol;
      if (!firstCard) return firstCard = card;
      secondCard = card;
      attemptsEl.textContent = ++attempts;
      checkMatch();
    }

    function checkMatch() {
      if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        matchesFound++;
        [firstCard, secondCard] = [null, null];
        if (matchesFound === cardSymbols.length / 2) endGame();
      } else {
        setTimeout(() => {
          firstCard.textContent = secondCard.textContent = '❓';
          [firstCard, secondCard] = [null, null];
        }, 1000);
      }
    }

    function startTimer() {
      timer = setInterval(() => timerEl.textContent = ++timeElapsed, 1000);
    }

    function endGame() {
      clearInterval(timer);
      alert(`You won! Time: ${timeElapsed}s, Attempts: ${attempts}`);
      resetGame();
    }
  </script>
</body>
</html>