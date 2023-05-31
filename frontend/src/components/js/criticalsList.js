import { GiElectric, GiFlamer, GiRaggedWound, GiBangingGavel, GiHighKick } from "react-icons/gi";

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

const icons = {
	E: <GiElectric/>,
	F: <GiFlamer/>,
	H: '',
	I: '',
	K: <GiBangingGavel/>,
	P: '',
	S: <GiRaggedWound/>,
	T: '',
	X: <GiHighKick/>,

}

const specials = {
	'Proyectil de hielo': {
		'F': [{severity: 'A', type: 'H'}],
		'G': [{severity: 'C', type: 'H'}],
	},
	'Proyectil de luz': {
		'F': [{severity: 'A', type: 'I'}],
		'G': [{severity: 'B', type: 'I'}],
		'H': [{severity: 'C', type: 'I'}, {severity: 'A', type: 'F'}],
		'I': [{severity: 'D', type: 'I'}, {severity: 'B', type: 'F'}],
		'J': [{severity: 'D', type: 'I'}, {severity: 'C', type: 'F'}],
	},
	'Cuernos y colmillos': {
		'F': [{severity: 'C', type: 'U'}],
	},
	'Mordedura': {
		'F': [{severity: 'C', type: 'S'}],
	},
	'Garras y uñas': {
		'F': [{severity: 'C', type: 'S'}],
	},
	'Picos/Pinzas': {
		'F': [{severity: 'C', type: 'K'}],
	}
}

 
const destructureCriticals = (attack, weapon) => {

		const attacks = destructure(attack)	
		const isSecundaryCritical = 'FGHIJ'.includes(attacks.severity)
		let secundaryCriticals = ''

		for (const skill in specials) {
			if (specials[skill][attacks.severity]) {
			 secundaryCriticals = specials[skill][attacks.severity];
			}
		}

	
		return({
			critical: {
				type: criticals[attacks.critical],
				severity: isSecundaryCritical ? 'E' : attacks.severity,
				icon: icons[attacks.critical]
			}, 
			 critical2: {
				type: criticals[secundaryCriticals[0]?.type] ?? null,
				severity: secundaryCriticals[0]?.severity ?? null, 
				icon: icons[secundaryCriticals[0]?.type] ?? null
			},
			critical3: {
				type: criticals[secundaryCriticals[1]?.type] ?? null,
				severity: secundaryCriticals[1]?.severity ?? null,
				icon: icons[secundaryCriticals[1]?.type] ?? null
			} 
		})

	}


	export default destructureCriticals;


	
