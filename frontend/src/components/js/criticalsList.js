import { GiElectric, GiFlamer, GiRaggedWound, GiBangingGavel, GiHighKick, GiGooeyImpact, GiSnowflake1 } from "react-icons/gi";

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
	H: <GiSnowflake1/>,
	I: <GiGooeyImpact/>,
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
		let secondaryCriticals = ''

		for (const skill in specials) {
			if (skill === weapon && isSecundaryCritical) {
			 secondaryCriticals = specials[weapon][attacks.severity];
			}
		}

	
		return({
			critical: {
				type: criticals[attacks.critical],
				severity: isSecundaryCritical ? 'E' : attacks.severity,
				icon: icons[attacks.critical]
			}, 
			 critical2: {
				type: criticals[secondaryCriticals[0]?.type] ?? null,
				severity: secondaryCriticals[0]?.severity ?? null, 
				icon: icons[secondaryCriticals[0]?.type] ?? null
			},
			critical3: {
				type: criticals[secondaryCriticals[1]?.type] ?? null,
				severity: secondaryCriticals[1]?.severity ?? null,
				icon: icons[secondaryCriticals[1]?.type] ?? null
			} 
		})

	}


	export default destructureCriticals;


	
