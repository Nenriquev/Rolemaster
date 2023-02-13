const objeto = {
  name: "alfanje",
  tiradas: [
      {
       tirada: 150,
       armadura: [{TA01: "34ES"}, {TA02: "32ES"}]
      },
      {
        tirada: 149,
        armadura: [{TA01: "33ES"}, {TA02: "31ES"}]
       },
       {
        tirada: 148,
        armadura: [{TA01: "32ES"}, {TA02: "30ES"}]
       },
      
  ]
    
}

const tirada = 148
const ataque = 'TA01'
let valor

const filet = objeto.tiradas.find(element => {
  return element.tirada == tirada

})



const criticos = [
  {
    tipo: 'Aplastamiento',
    simbolo: 'K',
    serveridad: 'A',
    tirada: 1,
    daño: 'Nada'
  },
  {
    tipo: 'Aplastamiento',
    simbolo: 'K',
    serveridad: 'A',
    tirada: 2,
    daño: 'Nada'
  }
]
console.log(criticos[0].value(4))