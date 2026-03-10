const canvas = document.getElementById("snakeGame");
        const ctx = canvas.getContext("2d");
        const scoreElement = document.getElementById("scoreVal");
        let gameLoop;

        let box = 20;
        let score = 0;
        let d = "RIGHT";
        let snake = [{ x: 10 * box, y: 10 * box }];
        let food = { x: Math.floor(Math.random() * 19) * box, y: Math.floor(Math.random() * 19) * box };

        // Fonction pour lancer le jeu
        function startGame() {
            document.getElementById("startScreen").style.display = "none";
            document.getElementById("gameContainer").style.display = "block";
            gameLoop = setInterval(draw, 100);
        }

        document.addEventListener("keydown", (e) => {
            if(e.keyCode == 37 && d != "RIGHT") d = "LEFT";
            else if(e.keyCode == 38 && d != "DOWN") d = "UP";
            else if(e.keyCode == 39 && d != "LEFT") d = "RIGHT";
            else if(e.keyCode == 40 && d != "UP") d = "DOWN";
        });

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Serpent
            for(let i = 0; i < snake.length; i++) {
                ctx.fillStyle = (i == 0) ? "#008cff" : "#004a87"; // Bleu pour assortir au bouton
                ctx.beginPath();
                ctx.arc(snake[i].x + box/2, snake[i].y + box/2, box/2 - 1, 0, 2 * Math.PI);
                ctx.fill();
                if(i == 0) {
                    ctx.fillStyle = "white";
                    ctx.beginPath();
                    ctx.arc(snake[i].x + 6, snake[i].y + 6, 3, 0, 2 * Math.PI);
                    ctx.arc(snake[i].x + 14, snake[i].y + 6, 3, 0, 2 * Math.PI);
                    ctx.fill();
                }
            }

            // Nourriture
            ctx.fillStyle = "#ff004c";
            ctx.beginPath();
            ctx.arc(food.x + box/2, food.y + box/2, box/2 - 2, 0, 2 * Math.PI);
            ctx.fill();

            let snakeX = snake[0].x;
            let snakeY = snake[0].y;

            if(d == "LEFT") snakeX -= box;
            if(d == "UP") snakeY -= box;
            if(d == "RIGHT") snakeX += box;
            if(d == "DOWN") snakeY += box;

            if(snakeX == food.x && snakeY == food.y) {
                score++;
                scoreElement.innerHTML = score;
                food = { x: Math.floor(Math.random() * 19) * box, y: Math.floor(Math.random() * 19) * box };
            } else {
                snake.pop();
            }

            let newHead = { x: snakeX, y: snakeY };

            if(snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
                clearInterval(gameLoop);
                alert("Game Over ! Score : " + score);
                location.reload();
            }
            snake.unshift(newHead);
        }

        function collision(head, array) {
            for(let i = 0; i < array.length; i++) {
                if(head.x == array[i].x && head.y == array[i].y) return true;
            }
            return false;
        }
