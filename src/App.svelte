<script>
	import { destroy_block } from "svelte/internal";
	import { db } from "./firebase";
	import {
		collection,
		getDocs,
		doc,
		addDoc,
		updateDoc,
		deleteDoc,
	} from "firebase/firestore";
	
		let pokemonster = {
	

			numeropokedex: "",
			pokemon: "",
			categoria: "",
			habilidad: "",
			peso: "",
			altura: "",
			habitat: "",
			generacion: "",
	
		};
	
		let guardarPokemon = [];
		const loadData = async () => {
		const querySnapshot = await getDocs(collection(db, "pokemon"));
		let docs = [];
		querySnapshot.forEach((doc) => {
			docs.push({ ...doc.data(), id: doc.id });
		});
		guardarPokemon = [...docs];
	
	};


		const addPokemon = async () => {
		await addDoc(collection(db, "pokemon"), pokemonster);
		await loadData();
		
	};


	function Poke() {
	
		addPokemon();
	
	}

	</script>

<main>

	<h1>Pokedex</h1>

	<form>
		<input bind:value={pokemonster.numeropokedex} type="text" id="numeropokedex" placeholder="Numero de la Pokedex" required><br>
		<input bind:value={pokemonster.pokemon} type="text" id="pokemon" placeholder="pokemon" required><br>
		<input bind:value={pokemonster.categoria} type="text" id="categoria" placeholder="Categoria" required><br>
		<input bind:value={pokemonster.habilidad} type="text" id="habilidad" placeholder="Habilidad/es" required><br>
		<input bind:value={pokemonster.peso} type="text" id="peso" placeholder="Peso" required><br>
		<input bind:value={pokemonster.altura} type="text" id="altura" placeholder="Altura" required><br>
		<input bind:value={pokemonster.habitat} type="text" id="habitat" placeholder="Habitat" required><br>
		<input bind:value={pokemonster.generacion} type="text" id="generacion" placeholder="Generacion" required><br>
		Tipo: <select>
			<option value="elegir"></option>
		</select>
	</form>
	<button on:click|once={Poke}>Añadir Pokemon</button><br>
	<form class="tipo">
		<input type="text" placeholder="Añadir tipo">
	</form>

</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>