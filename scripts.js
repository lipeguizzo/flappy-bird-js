const bird = document.getElementById('bird');
const pipeTop = document.getElementById('pipeTop');
const pipeBottom = document.getElementById('pipeBottom');
const base = document.getElementById('base');
const score = document.getElementById('score');

const death = 425; 
const jump = 100;

function addAnimations(){
    this.bird.classList.add('bird-animate');
    this.pipeTop.classList.add('pipe-top-animate');
    this.pipeBottom.classList.add('pipe-bottom-animate');
    this.base.classList.add('base-animate');
}

function removeAnimations(){
    this.bird.classList.remove('bird-animate');
    this.pipeTop.classList.remove('pipe-top-animate');
    this.pipeBottom.classList.remove('pipe-bottom-animate');
    this.base.classList.remove('base-animate');
}

function addClickAnimation(){
    const birdPos = this.bird.getBoundingClientRect();
    this.bird.style.top = (birdPos.top - jump) + 'px'  ;

    this.bird.classList.add('bird-fly');
    setTimeout(()=>{
        this.bird.classList.remove('bird-fly');
        this.bird.style.top = death + 'px';
    }, 500)
}

function checkCollision(firstElement, lastElement) {
    const rectFirst = firstElement.getBoundingClientRect();
    const rectLast = lastElement.getBoundingClientRect();
    const collision = !(rectFirst.right < rectLast.left || 
        rectFirst.left > rectLast.right || 
        rectFirst.bottom < rectLast.top || 
        rectFirst.top > rectLast.bottom);

    return collision;
}

function gameInterval(){
    const pipesTop = [ -150, -200, -100];
    const pipesBottom = [ 350, 400, 330];

    const intervalPipe = setInterval(()=>{
        const randomPipeTop = pipesTop[Math.floor(Math.random() * pipesTop.length)];
        const randomPipeBottom = pipesBottom[Math.floor(Math.random() * pipesBottom.length)];
        
        this.pipeTop.style.top = randomPipeTop + 'px';
        this.pipeBottom.style.top = randomPipeBottom + 'px';

        if (this.bird.classList.contains('bird-animate')){
            const count = parseInt(this.score.innerText)
            this.score.innerText = count + 1;
        };


    },10000)

    const intervalGame =  setInterval(()=>{
        const birdPos = this.bird.getBoundingClientRect();

        if( birdPos.top === death ) {
            reset();
            stopInterval(intervalPipe);
            stopInterval(intervalGame);
            return;
        }

        if( checkCollision(this.bird, this.pipeBottom) || checkCollision(this.bird, this.pipeTop) ){
            reset();
            stopInterval(intervalPipe);
            stopInterval(intervalGame);
            return;
        }

    },50)

}

function stopInterval(interval){
    clearInterval(interval);
}

function reset(){
    alert('FIM DE JOGO, TENTE NOVAMENTE');
    window.location.reload();
}

window.addEventListener('load', (_event) => {
    gameInterval();
});

window.addEventListener('click', (event) => {
    addAnimations();
    addClickAnimation();
});