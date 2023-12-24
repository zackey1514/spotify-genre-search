<script lang="ts">
	import type { ApiRoute } from '$lib/server';
	import type { Artist } from '@spotify/web-api-ts-sdk';
	import { hc } from 'hono/client';
	import {
		Badge,
		Button,
		Heading,
		Search,
		Spinner,
		Dropdown,
		DropdownItem,
	} from 'flowbite-svelte';
	import { SearchOutline, ChevronDownSolid } from 'flowbite-svelte-icons';
	import { z } from 'zod';
	import NoArtistMessage from '$lib/NoArtistMessage.svelte';
	import NotFoundArtistMessage from '$lib/NotFoundArtistMessage.svelte';
	import Link from '$lib/Link.svelte';
	
	const client = hc<ApiRoute>('/api');

	const items = [
		{
			label: 'Artist'
		},
		{
			label: 'Genre'
		}
	];

	let selectCategory = 'Artist';
	let isFirstSearch = true;
	let inputSearch = '';
	let inputArtistUri = '';
	let offset: number = 0;
	let isArtistSearch = false;
	let total = 0;
	let displayArtistCount = 0;
	let dropdownOpen = false;

	let artistsPromise: Promise<Artist[]> = Promise.resolve([]);

	$: hasMore = Boolean(offset);

	const getArtist = async (id: string): Promise<Artist[]> => {
		const res = await client.artists[':id'].$get({ param: { id } });
		if (!res.ok) {
			return [];
		}
		const artist = await res.json();
		return [artist];
	};

	const getArtists = async (name: string): Promise<Artist[]> => {
		if (name === '') return [];
		const limit = 50;
		const res = await client.artists.$get({ query: { artist: name, limit, offset } });
		if (!res.ok) {
			return [];
		}
		const artists = await res.json();

		const artistRegExp = new RegExp(`^${name}$`, 'i');
		const filteredArtists = artists.items.filter((item) => item.name.match(artistRegExp));
		return filteredArtists;
	};

	// const getGenreSeed = async () => {
	// 	const genres = await client['genre-seeds'].$url
	// };

	const searchArtistsByGenre = async (name: string): Promise<Artist[]> => {
		const res = await client.genres.$get({ query: { genre: name, offset } });
		if (!res.ok) {
			return [];
		}
		const artists = await res.json();

		total = artists.total;
		if (artists.next === null) {
			offset = 0;
			displayArtistCount = total;
		} else {
			offset = artists.offset + artists.limit;
			displayArtistCount = artists.offset + artists.limit;
		}

		return artists.items;
	};

	const handleSearch = () => {
		isFirstSearch = false;
		offset = 0;
		switch (selectCategory) {
			case 'Artist':
				isArtistSearch = true;
				handleSearchArtists();
				break;
			case 'Genre':
				isArtistSearch = false;
				handleSearchGenre();
				break;
		}
	};

	const handleSearchArtists = () => {
		artistsPromise = getArtists(inputSearch);
	};

	const handleSearchGenre = () => {
		artistsPromise = searchArtistsByGenre(inputSearch);
	};

	const handleMoreGenre = () => {
		document.body.scrollIntoView();
		artistsPromise = searchArtistsByGenre(inputSearch);
	};

	const handleGetArtist = () => {
		document.body.scrollIntoView();
		const validator = z.string().url().safeParse(inputArtistUri);
		if (validator.success) {
			const id = extractArtistId(inputArtistUri);
			artistsPromise = id === '' ? Promise.resolve([]) : getArtist(id);
		} else {
			artistsPromise = Promise.resolve([]);
		}
		inputArtistUri = '';
	};

	const extractArtistId = (uri: string): string => {
		const splitUrl = uri.split('/');
		const idIndex = splitUrl.findIndex((value) => value === 'artist') + 1;
		if (idIndex < 0) {
			return '';
		}
		return splitUrl[idIndex];
	};
</script>

<div>
	<div class="m-5">
		<!-- <Search bind:value={inputArtistName} placeholder="Enter your fav artist">
			<Button disabled={!inputArtistName} on:click={handleSearch}>Search</Button>
		</Search> -->
		<form class="flex">
			<div class="relative">
				<Button class="rounded-e-none whitespace-nowrap border border-e-0 border-primary-700">
					{selectCategory}
					<ChevronDownSolid class="w-2.5 h-2.5 ms-2.5" />
				</Button>
				<Dropdown bind:open={dropdownOpen}>
					{#each items as { label }}
						<DropdownItem
							on:click={() => {
								selectCategory = label;
								dropdownOpen = false;
							}}
							class={selectCategory === label ? 'underline' : ''}
						>
							{label}
						</DropdownItem>
					{/each}
				</Dropdown>
			</div>
			<Search
				size="md"
				class="rounded-none py-2.5"
				placeholder={'Enter your fav ' + selectCategory.toLowerCase()}
				bind:value={inputSearch}
			/>
			<Button disabled={!inputSearch} on:click={handleSearch} class="!p-2.5 rounded-s-none">
				<SearchOutline class="w-5 h-5" />
			</Button>
		</form>
	</div>
	<!-- <div class={visibleStatus}> -->
	{#if !isFirstSearch}
		{#await artistsPromise}
			<div class="m-6"><Spinner /></div>
		{:then items}
			{#if items.length < 1}
				<div class="m-5">
					<NoArtistMessage />
				</div>
				<div class="m-5">
					<Search bind:value={inputArtistUri} placeholder="https://open.spotify.com...">
						<Button disabled={!inputArtistUri} on:click={handleGetArtist}>Search</Button>
					</Search>
					<!-- <SearchForm
						value={inputArtistUri}
						placeholder="https://open.spotify.com..."
						on:click={handleGetArtist}
					/> -->
				</div>
			{:else}
				{#each items as item}
					<div class="m-5">
						<Heading tag="h4">{item.name}</Heading>
						{#if item.images.length > 0}
							<div class="flex justify-center items-center">
								<img src={item.images[0].url} width="50%" height="50%" alt={item.name} />
							</div>
						{:else}
							<p>No images.</p>
						{/if}
						<!-- <a href={item.uri} class="text-[#1d82b9]">spotify</a> -->
						<Link href={item.uri}>spotify</Link>
						{#if item.genres.length > 0}
							<div class="my-4">
								{#each item.genres as genre}
									<div class="m-1 inline-block">
										<Badge border large>{genre}</Badge>
									</div>
								{/each}
							</div>
						{:else}
							<div class="my-4">
								<p>Spotify did not set genres for this artist.</p>
							</div>
						{/if}
					</div>
				{/each}
				{#if !isArtistSearch}
					<div class="m-2">
						<p>{displayArtistCount} / {total}</p>
					</div>
				{/if}
				{#if hasMore}
					<div class="m-5">
						<Button on:click={handleMoreGenre}>More</Button>
					</div>
				{/if}
				{#if isArtistSearch}
					<div class="m-5">
						<NotFoundArtistMessage />
					</div>
					<div class="m-5">
						<Search bind:value={inputArtistUri} placeholder="https://open.spotify.com...">
							<Button disabled={!inputArtistUri} on:click={handleGetArtist}>Search</Button>
						</Search>
					</div>
				{/if}
			{/if}
		{:catch}
			<p style="color: red">Something went wrong! Please reload this page.</p>
		{/await}
	{/if}
</div>
