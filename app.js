//append divs to .grid
for (let i = 0; i < 121; i++) {
    var divElement = document.createElement("Div");
    document.querySelector(".grid").appendChild(divElement);
}


document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.querySelector('span');
    const startBtn = document.querySelector('.start');
    const gameOver = document.querySelector('.game-over')


    const width = 11;
    let currentIndex = 0 //so first div in our grid
    let appleIndex = 0 //so first div in our grid
    let currentSnake = [2, 1, 0] //so the div in our grid being 2 (the HEAD), and 0 being the end (Tail) and 1s beeing the body
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0


    //to start, and restart the game
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake', 'eatenApple', 'upOpenMouth', 'downOpenMouth', 'leftOpenMouth', 'rightOpenMouth', 'snakeHead', "snake1", "snake2", "snake3", "snake4", "snake5", "snake6", "snake7", "snake8", "snake9", "snake10")); //remove snake, openMouths and eatenApple from last game
        squares[appleIndex].classList.remove('apple');
        gameOver.textContent = "..."
        clearInterval(interval);
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentSnake = [2, 1, 0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        squares[currentSnake[0]].classList.add("rightOpenMouth", 'snakeHead')
        interval = setInterval(moveOutcomes, intervalTime)
    }

    //function that deals with all the outcomes of the snake
    function moveOutcomes() {
        // deals with snake hitting border and snake hitting self


        if (
            //if snake hits bottom
            (currentSnake[0] + width >= (width * width) && direction === width) ||
            //if snake hits right wall
            (currentSnake[0] % width === width - 1 && direction === 1) ||
            //if snake hits left wall
            (currentSnake[0] % width === 0 && direction === -1) ||
            //if snake hits top
            (currentSnake[0] - width < 0 && direction === -width) ||
            //if snake touches itself
            squares[currentSnake[0] + direction].classList.contains('snake')
        ) {

            if (score <= 2) {
                gameOver.textContent = "Das war schwach. Ich glaube du meinst es nicht ernst."
            } else if (score <= 4) {
                gameOver.textContent = "Du solltest überlegen, ob du das wirklich willst."
            } else if (score <= 6) {
                gameOver.textContent = "Deine Genoss*Innen sind bestimmt sehr enttaeuscht von dir."
            } else if (score <= 8) {
                gameOver.textContent = "Vielleicht solltest du lieber stricken lernen."
            } else if (score <= 9) {
                gameOver.textContent = "Im Tv-Programm gibt es bestimmt etwas spannendes."
            } else if (score <= 11) {
                gameOver.textContent = "Das rote Licht am Ende des Tunnels könnte auch nur eine Rotlichtlampe sein."
            } else if (score <= 13) {
                gameOver.textContent = "Ich glaube andere können das besser als du."
            } else if (score <= 15) {
                gameOver.textContent = "Ich habe das Gefuehl man kann hier nur verlieren."
            } else if (score <= 16) {
                gameOver.textContent = "Quark lässt sich bestimmt nicht Kommunismus überzeugen."
            } else if (score <= 17) {
                gameOver.textContent = "Vielleicht ist Kommunismus doch nur eine Utopie."
            } else if (score >= 18) {
                gameOver.textContent = "Woher weiss ich, dass das jetzt schon der Kommunismus ist?"
            }


            return clearInterval(interval);

        }

        const tail = currentSnake.pop() //removes last item of the array
        squares[tail].classList.remove('snake') //removes class of snake from tail
        currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head

        squares[currentSnake[0]].classList.add('snake')


        // adds open mouth and direction of open mouth
        if (squares[currentSnake[0] + direction] && direction === -width) {
            squares[currentSnake[0]].classList.add("upOpenMouth")

        } else if (squares[currentSnake[0] + direction] && direction === width) {
            squares[currentSnake[0]].classList.add("downOpenMouth")

        } else if (squares[currentSnake[0] + direction] && direction === -1) {
            squares[currentSnake[0]].classList.add("leftOpenMouth")

        } else if (squares[currentSnake[0] + direction] && direction === 1) {
            squares[currentSnake[0]].classList.add("rightOpenMouth")

        }




        // adds snakeHead with different styling in css
        if (squares[currentSnake[0] + direction]) {
            squares[currentSnake[0]].classList.add("snakeHead")
        }


        //removes open mouth and snake head  of snake body, except head

        for (let i = 1; i < currentSnake.length; i++) {
            if (squares[currentSnake[0] + direction]) {
                squares[currentSnake[i]].classList.remove('upOpenMouth', 'downOpenMouth', 'leftOpenMouth', 'rightOpenMouth', 'snakeHead');
            }
        }


        //deals with snake eating apple
        if (squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple')
            squares[currentSnake[1]].classList.add('eatenApple') //digests apple
            squares[tail].classList.add('snake')
            currentSnake.push(tail)

            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
        }

        // remove digested apple
        if (squares[currentSnake[currentSnake.length - 1]].classList.contains('eatenApple')) {
            squares[currentSnake[currentSnake.length - 1]].classList.remove('eatenApple')
        }


        //change color depending on score, from grey to red
        for (let i = 1; i < currentSnake.length; i++) {
            if (score >= 1) {
                squares[tail].classList.remove('snake1')
                squares[currentSnake[1]].classList.add('snake1')
            }

            if (score >= 3) {
                squares[tail].classList.remove('snake2')
                squares[currentSnake[1]].classList.add('snake2')
            }

            if (score >= 5) {
                squares[tail].classList.remove('snake3')
                squares[currentSnake[1]].classList.add('snake3')
            }

            if (score >= 7) {
                squares[tail].classList.remove('snake4')
                squares[currentSnake[1]].classList.add('snake4')
            }

            if (score >= 9) {
                squares[tail].classList.remove('snake5')
                squares[currentSnake[1]].classList.add('snake5')
            }

            if (score >= 11) {
                squares[tail].classList.remove('snake6')
                squares[currentSnake[1]].classList.add('snake6')
            }

            if (score >= 13) {
                squares[tail].classList.remove('snake7')
                squares[currentSnake[1]].classList.add('snake7')
            }

            if (score >= 15) {
                squares[tail].classList.remove('snake8')
                squares[currentSnake[1]].classList.add('snake8')
            }

            if (score >= 17) {
                squares[tail].classList.remove('snake9')
                squares[currentSnake[1]].classList.add('snake9')
            }

            if (score >= 19) {
                squares[tail].classList.remove('snake10')
                squares[currentSnake[1]].classList.add('snake10')
            }


        }
    }

    //generate new apple once apple is eaten
    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * squares.length)
        } while (squares[appleIndex].classList.contains('snake'))
        squares[appleIndex].classList.add('apple')

    }




    //assign functions to keycode
    function control(e) {
        squares[currentIndex].classList.remove('snake')

        if (e.keyCode === 39) {
            direction = 1 //right arrow and keyboard, snake to right
        } else if (e.keyCode === 38) {
            direction = -width //up arrow, snake goes 1square up (meaning 10indexes in array)

        } else if (e.keyCode === 37) {
            direction = -1 //leftarrow on keyboard, snake to left

        } else if (e.keyCode === 40) {
            direction = +width //down arrow
        }

    }

    const btnRight = document.querySelector('.btn-right');
    const btnLeft = document.querySelector('.btn-left');
    const btnUp = document.querySelector('.btn-up');
    const btnDown = document.querySelector('.btn-down');

    //assign direction of snake to direction-buttons
    btnRight.addEventListener('click', function () {
        direction = 1;
    })

    btnLeft.addEventListener('click', function () {
        direction = -1;
    })

    btnUp.addEventListener('click', function () {
        direction = -width;
    })

    btnDown.addEventListener('click', function () {
        direction = +width;
    })

    document.addEventListener('keyup', control);
    startBtn.addEventListener('click', startGame);
});