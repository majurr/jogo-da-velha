window.onload = () => {
    new JogoVelha();
}

class JogoVelha {
    constructor(){
        this.initElements();
        this.initState();
    }

    initState() {
        this.player = true;
        this.played = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.end = false;
        this.wins = [448, 54, 7, 292, 146, 73, 273, 84];
    }


    initElements(){
        this.playx = document.querySelector('#play-x');
        this.play0 = document.querySelector('#play-0');

        this.saving = document.querySelector('#save');
        this.saving.addEventListener('click', this.save.bind(this));

        this.loading = document.querySelector('#load');
        this.loading.addEventListener('click', this.load.bind(this));

        this.cleaning = document.querySelector('#clear');
        this.cleaning.addEventListener('click', this.clear.bind(this));

        this.velha = document.querySelector('#velha');
        this.velha.addEventListener('click', (event) => {
            this.performPlay(event);
            this.toRender();
        });
    }

    
    save(){        
        const data_ = {
            playx: this.playx.value,
            play0: this.play0.value,
            played: this.played
        }

        localStorage.setItem('game', JSON.stringify(data_));

    }


    load(){
        const data_ = JSON.parse(localStorage.getItem('game'));
        this.playx.value = data_.playx;
        this.play0.value = data_.play0;
        this.played = data_.played;

        this.toRender();
    }


    clear(){
        localStorage.removeItem('game');
        this.play0.value = '';
        this.playx.value = '';
        this.initState();

        this.toRender();
    }

    
    performPlay(event){
        const id = event.target.dataset.id;

        if(this.end){
            this.modal('Partida terminada');
            return;
        }

        if(!event.target.dataset.id){
            this.modal("Você precisa clicar em uma casa");
            return;
        }

        if(this.played[id] != 0){
            this.modal("Esta posição já foi escolhida");
            return;
        }
        
        this.played[id] = this.player ? 'X' : 'O';
        this.player = !this.player;
    }


    toRender(){
        const winner = this.checkWinner();

        if(winner == 'X' || winner == 'O'){
            this.end = true;
            this.modal(`O jogador ${winner} venceu!`);
        }

        const velhaBoard = document.querySelectorAll('[data-id]');
        for (let i=0; i<9; i++){
            velhaBoard[i].innerHTML = this.played[i] == 0 ? "" : this.played[i];
        }

    }


    checkWinner(){
        // retrieve decimal sequence play-x 
        const valueX = parseInt(this.played.map(value => value == 'X' ? 1 : 0).join(''), 2);
        // retrieve decimal sequence play-0
        const valueO = parseInt(this.played.map(value => value == 'O' ? 1 : 0).join(''), 2);
        
        // check winner in win array
        for(const winning of this.wins){
            if((winning & valueX) == winning){
                return 'X';
            }
            if((winning & valueO) == winning){
                return 'O';
            }
        }

        return "";
    }


    modal(message){
        const modal = document.querySelector('#modal');
        const posts = document.createElement('div');
        
        posts.innerHTML = message;
        posts.classList.add("posts");
        modal.appendChild(posts);

        // remove modal last 2s
        setTimeout(() => {
            posts.classList.add('remove');

            setTimeout(() => {
                modal.removeChild(posts);
            }, 2000);
        }, 3000);
    }
}