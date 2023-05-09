const destructure = (attack) => {
  const result = [];
  for (var i = attack?.length - 1; i >= 0; i--) {
    result.push(attack[i]);
  }

  const attackValues = {
    severity: result[1],
    critical: result[0],
  };

  return attackValues
}

const criticals = { 
	E: 'Electricidad',
	F: 'Calor',
	H: 'Frio',
	I: 'Impacto',
	K: 'Aplastamiento',
	P: 'Perforacion',
	S: 'Corte',
	T: 'Criaturas pequeñas',
	X: 'Golpes de artes marciales'
}

const specials = {
	'Proyectil de luz': {critical2: 'I', critical3: 'F'},
	'Proyectil de hielo': {critical2: 'H'},
	'Cuernos y colmillos': {critical2: 'U'},
	'Mordedura': {critical2: 'S'},
	'Garras y uñas': {critical2: 'S'},
	'Picos/Pinzas': {critical2: 'K'}
}

 
 const destructureCriticals = (attack, weapon) => {

		const attacks = destructure(attack)	
	
		return({
			critical: criticals[attacks.critical], 
			critical2: criticals[specials[weapon]?.critical2] ?? null, 
			critical3: criticals[specials[weapon]?.critical3] ?? null
		})

	}

	
export default destructureCriticals;