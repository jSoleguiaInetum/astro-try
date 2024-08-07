<script setup lang="">
	import { onMounted, ref, watch } from 'vue';
	import { getBooksList } from '../utils/api.js';

	import Card from './Card.vue';

	const props = defineProps({
		query: { type: String },
	});

	const loading = ref(true);

	const searchQuery = ref();

	const books = ref();

	const handleSearch = async () => {
		loading.value = true;
		books.value = await getBooksList(searchQuery.value);
		console.log(books.value);
		setTimeout(() => {
			loading.value = false;
		}, 5000);
	};

	onMounted(() => {
		searchQuery.value = props.query;
		handleSearch();
	});
</script>

<template>
	<template v-if="loading">
		<div class="loading">Cargando...</div>
	</template>
	<template v-else>
		<p class="instructions">
			<input v-model="searchQuery" type="text" />
			<button id="search" @click.stop="handleSearch">Buscar</button>
		</p>
		<ul role="list" class="link-card-grid">
			<template v-if="books">
				<template v-for="book in books" :key="book.key">
					<Card
						:href="`/book/${book.key}`"
						:title="book.title"
						:body="book?.author_name[0] || 'Unknown'" />
				</template>
			</template>
			<template v-else>
				<li>No hay libros para mostrar, busca alguno.</li>
			</template>
		</ul>
	</template>
</template>

<style>
	.loading {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0.75rem 1.2rem;
		width: calc(15ch + 1.5rem);
		aspect-ratio: 0.9/1;
	}
	.loading:before {
		content: '';
		position: absolute;
		inset: 0;
		border: 2px solid hsl(276, 95%, 62%);
		border-radius: 75% 40% 65% 62%/40% 50% 72% 47%;
		animation: spin 3s linear infinite;
	}
	.loading:after {
		content: '';
		position: absolute;
		inset: 0;
		border: 2px solid hsl(310, 93%, 43%);
		border-radius: 40% 50% 72% 47% / 65% 52% 37% 52%;
		animation: spin 5s linear infinite;
	}

	@keyframes spin {
		from {
			transform: rotateZ(0deg);
		}
		to {
			transform: rotateZ(360deg);
		}
	}

	.instructions {
		margin-bottom: 2rem;
		padding: 1.5rem;
		background: linear-gradient(rgba(var(--accent-dark), 66%), rgba(var(--accent-dark), 33%));
		border: 1px solid rgba(var(--accent-light), 25%);
		border-radius: 8px;
	}
	.instructions code {
		padding: 0.3em 0.4em;
		font-size: 0.8em;
		font-weight: bold;
		color: rgb(var(--accent-light));
		background: rgba(var(--accent-light), 12%);
		border-radius: 4px;
	}
	.instructions strong {
		color: rgb(var(--accent-light));
	}
	.link-card-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(24ch, 1fr));
		gap: 2rem;
		padding: 0;
	}
</style>
