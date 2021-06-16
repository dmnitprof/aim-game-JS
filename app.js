import './styles.css'

const app = document.querySelector('#app')
const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const restartBtn = document.querySelector('.start-over')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const screen = document.querySelector('.screen')

let time = 0
let score = 0
const colors = ['#f80505', '#06f1ca', '#33f305', '#f7d305', '#f542dd', '#07f5ed', '#0717f5', '#f2f9fc']

startBtn.addEventListener('click', (e) => {
    e.preventDefault()

    screens[0].classList.add('up')
})

restartBtn.addEventListener('click', (e) => {

    document.location.reload()

})

timeList.addEventListener('click', e => {
    if (e.target.classList.contains('time-btn')) {
        time = parseInt(e.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', e => {
    if (e.target.classList.contains('circle')) {
        score++
        e.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }

}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Cчет :<span class="primary">&nbsp;${score}</span></h1><br>
`
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    setColor(circle)

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function setColor(element) {
    const color = getRandomColor()
    element.style.background = color
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]

}
