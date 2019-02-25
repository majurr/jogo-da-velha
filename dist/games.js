window.onload = () => {
  new ShowGames()
}

class ShowGames {
  constructor () {
    this.divRender = document.querySelector('#render')

    axios
      .get('/all')
      .then(Response => {
        this.toRender(Response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  toRender (dados) {
    dados.forEach(element => {
      const players = `${element.playx}  vs  ${element.playo}`
      this.divRender.innerHTML += this.renderCard(players, element.img)
    })
  }

  renderCard (players, img) {
    return `
        <div class="card text-white bg-primary mb-3" style="max-width: 30rem;">
            <div class="card-header">${players}</div>
                <div class="card-body">                
                  <img src="${img}" alt="">
                </div>
        </div>
    `
  }
}
