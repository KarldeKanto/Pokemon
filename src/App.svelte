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

		//Creamos / modificamos al Pokemon

		let pokemonster = {
	
			numeropokedex: "",
			pokemon: "",
			categoria: "",
			habilidad: "",
			peso: "",
			altura: "",
			habitat: "",
			generacion: "",
			imagen: "",
			tipo: "",
	
		};

		//Creamos el tipo de Pokemon

		let types = {

			tipo: "",

		}	

		//Guardamos el objeto Pokemon

		let guardarPokemon = [];

		//Guardamos el objeto Tipo de Pokemon

		let guardarTipo = [];

		//Se encarga de cargarlo en la Base de Datos

		const loadData = async () => {
			const querySnapshot = await getDocs(collection(db, "pokemon"));
			let docs = [];
			querySnapshot.forEach((doc) => {
				docs.push({ ...doc.data(), id: doc.id });
			});
			guardarPokemon = [...docs];
		};
		loadData();

		const loadDate = async () => {
			const querySnapshot = await getDocs(collection(db, "tipos"));
			let docs = [];
			querySnapshot.forEach((doc) => {
				docs.push({ ...doc.data(), id: doc.id });
			});
			guardarTipo = [...docs];
		};
		loadDate();


		let editar = false;


		const vaciarForm = () => {

			pokemonster = {

				numeropokedex: "",
				pokemon: "",
				categoria: "",
				habilidad: "",
				peso: "",
				altura: "",
				habitat: "",
				generacion: "",
				imagen: "",
				tipo: "",

			}

			editar = false;

		}

		const vaciarTipo = () => {

			types = {

				tipo: "",

			}

			editar = false;

			}

		//Añadir el pokemon

		const addPokemon = async () => {
		await addDoc(collection(db, "pokemon"), pokemonster);
		await loadData();
		vaciarForm();
	};

	//Guardar el pokemon

		const savePokemon = async () => {
		await updateDoc(doc(db, "pokemon", pokemonster.id), pokemonster);
		await loadData();
		vaciarForm();
	};

	//Editar el pokemon

		const editarPokemon = (g) => {
		pokemonster = Object.assign({}, g);
		editar = true;
	};

	//Eliminar el Pokemon

		const eliminarPokemon = async (id) => {
		await deleteDoc(doc(db, "pokemon", id));
		await loadData();
	};

	//Un simple condicion para saber si estamos Editando o Creando
		
	const onSubmitHandler = (e) => {
		if(editar) {
		console.log("Guardando...");
		savePokemon();
	} else {
		addPokemon();
	}
	};

	//Añadir Tipo

	const addTipo = async () => {
		await addDoc(collection(db, "tipos"), types);
		await loadData();
		vaciarTipo();
	}

</script>

<main>

	<h1>La Pokedex De El De Kanto 🤙</h1>
	<br>
	<div id="formularios">
		<form on:submit|preventDefault={onSubmitHandler}>
			<input bind:value={pokemonster.numeropokedex} type="text" id="numeropokedex" placeholder="Numero de la Pokedex" required><br>
			<input bind:value={pokemonster.pokemon} type="text" id="pokemon" placeholder="pokemon" required><br>
			<input bind:value={pokemonster.categoria} type="text" id="categoria" placeholder="Categoria" required><br>
			<input bind:value={pokemonster.habilidad} type="text" id="habilidad" placeholder="Habilidad/es" required><br>
			<input bind:value={pokemonster.peso} type="text" id="peso" placeholder="Peso" required><br>
			<input bind:value={pokemonster.altura} type="text" id="altura" placeholder="Altura" required><br>
			<input bind:value={pokemonster.habitat} type="text" id="habitat" placeholder="Habitat" required><br>
			<input bind:value={pokemonster.generacion} type="text" id="generacion" placeholder="Generacion" required><br>
			<input bind:value={pokemonster.imagen} type="text" id="generacion" placeholder="Imagen (Url)" required><br>
			<br>
			{#if editar}
				<button>Editar Pokemon</button><br>

			{:else}
				<button>Añadir Pokemon</button>
			{/if}
			<br>
			<br>
			<p id="type">Tipo:</p><select bind:value={pokemonster.tipo}>
				{#each guardarTipo as gt, y}

					<option>{gt.tipo}</option>

				{/each}
			</select>
			
		</form>
		<br>
		<form on:submit|preventDefault={addTipo}>
			<input bind:value={types.tipo} type="text" placeholder="Añadir tipo"><br>
			<br>
			<button>Añadir Tipo</button>
		</form>
	</div>
	<br>
	<br>
	<div id="abuelo">
		{#each guardarPokemon as g, i}
			<div id="padre">
				<div id="hijo">
					{#if g.imagen}
						<img id="pokeimagen"
							src={g.imagen}
							alt="thumbnail"

						/>
						<button on:click={editarPokemon(g)}>Editar</button>
						<button on:click={eliminarPokemon(g.id)}>Borrar</button>
					{:else}
						<img
							src="https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
							alt="thumbnail"
						/>
					{/if}
				</div>
				<div id="nieto">
					<p> Numero Pokedex: {g.numeropokedex}</p>
					<p> Nombre: {g.pokemon}</p>
					<p> Categoria: {g.categoria}</p>
					<p> Habilidades: {g.habilidad}</p>
					<p> Peso: {g.peso}</p>
					<p> Altura: {g.altura}</p>
					<p> Habitat: {g.habitat}</p>
					<p> Generacion: {g.generacion}</p>
					<p> Tipo: {g.tipo}</p>
				</div>
			</div>
		{/each}
		</div>

</main>

<style>

</style>