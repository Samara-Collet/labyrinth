//mapa do labirinto
const map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWW W WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW",
];
//percorrer o array mapa para pegar as linhas
for (let i = 0; i < map.length; i++) {
    let div1 = document.createElement("div")
    div1.className = "linha";
    document.body.appendChild(div1);
    //percorrer a string da linha
    for (let j = 0; j < map[i].length; j++) {
        //criar divs celulas
        let cell = document.createElement("div")
            // colocar um numero para linha e coluna
        cell.id = `${i}:${j}`
        if (map[i][j] === "S") {
            cell.className = "cell";
            // criar div filho em 'S' para ser o jogador
            let jogador = document.createElement("div")
            jogador.className = "playerCell"
            cell.appendChild(jogador);
        } else if (map[i][j] === "W") { // div em 'W' é parede
            cell.className = "wall"
        } else if (map[i][j] === " ") { // div em ' ' é caminho
            cell.className = "caminho"
        } else if (map[i][j] === "F") { // div em 'F' é vitória
            cell.className = "vitoria"
        } else {
            cell.className = "cell"; // todas divs nas linhas são cell
        }
        div1.appendChild(cell);
    }
}

//mover jogador
document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    //pegar a classe da div do jogador
    let player = document.getElementsByClassName('playerCell')[0]
        //pegar o id da div pai da div jogador
    let idPlayer = player.parentElement.id
        //separar o id por ':' para poder somar ou diminuir os valores
    let idSplit = idPlayer.split(':')

    //somar ou diminuir valores p/ o jogador se mover
    if (keyName === 'ArrowDown') {
        idPlayer = (parseInt(idSplit[0]) + 1).toString() + ":" + idSplit[1]
    } else if (keyName === 'ArrowUp') {
        idPlayer = (parseInt(idSplit[0]) - 1).toString() + ":" + idSplit[1]
    } else if (keyName === 'ArrowLeft') {
        idPlayer = idSplit[0] + ":" + (parseInt(idSplit[1]) - 1).toString()
    } else if (keyName === 'ArrowRight') {
        idPlayer = idSplit[0] + ":" + (parseInt(idSplit[1]) + 1).toString()
    }

    let nextCell = document.getElementById(idPlayer)
    let classe = nextCell.className
        //declara vitória
    if (classe === "vitoria") {
        document.getElementById("result").innerText = "Você venceu, café é vidaaaaaa!!!"
    }
    //limita as paredes
    if (classe !== "wall") {
        nextCell.appendChild(player)
    }

});