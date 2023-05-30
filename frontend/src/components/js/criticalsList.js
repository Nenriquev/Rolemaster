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
	'Proyectil de luz': {
		'H': [{critical: 'C', type: 'I'}, {critical: 'A', type: 'F'}],
		'I': {
			critical: 'D', type: 'I'
		}
	},
	'Proyectil de hielo': {critical2: 'H'},
	'Cuernos y colmillos': {critical2: 'U'},
	'Mordedura': {critical2: 'S'},
	'Garras y uñas': {critical2: 'S'},
	'Picos/Pinzas': {critical2: 'K'}
}

 
const destructureCriticals = (attack, weapon) => {

		const attacks = destructure(attack)	
		console.log(specials['Proyectil de luz']['H'])
	
		return({
			critical: {
				type: criticals[attacks.critical],
				icon: icons[attacks.critical]
			}, 
			critical2: {
				type: criticals[specials[weapon]?.critical2] ?? null,
				icon: icons[specials[weapon]?.critical2] ?? null
			},
			critical3: {
				type: criticals[specials[weapon]?.critical3] ?? null,
				icon: icons[specials[weapon]?.critical3] ?? null
			}
		})

	}


	export default destructureCriticals;


	
