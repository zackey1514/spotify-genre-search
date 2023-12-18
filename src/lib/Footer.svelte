<script>
	import { PUBLIC_TWITTER_ID } from '$env/static/public';
	import { Footer, FooterCopyright, FooterIcon } from 'flowbite-svelte';
	import { GithubSolid, HeadphonesSolid, TwitterSolid } from 'flowbite-svelte-icons';
</script>

<Footer>
	<div class="py-6 px-4 md:flex md:items-center md:justify-between">
		<p class="text-gray-500 text-sm sm:text-center">Made by @zackey878</p>
		<div class="flex mt-4 space-x-6 rtl:space-x-reverse sm:justify-center md:mt-0">
			<FooterIcon
				href="https://github.com/zackey1514/spotify-genre-search"
				target="_blank"
				rel="noopener noreferrer"
			>
				<GithubSolid class="w-4 h-4 text-gray-500 dark:text-gray-500 hover:text-gray-900" />
			</FooterIcon>
			<FooterIcon href="https://twitter.com/{PUBLIC_TWITTER_ID}" target="_blank" rel="noopener noreferrer">
				<TwitterSolid class="w-4 h-4 text-gray-500 dark:text-gray-500 hover:text-gray-900" />
			</FooterIcon>
			<FooterIcon
				href="https://bytheendofsummer.bandcamp.com/"
				target="_blank"
				rel="noopener noreferrer"
			>
				<HeadphonesSolid class="w-4 h-4 text-gray-500 dark:text-gray-500 hover:text-gray-900" />
			</FooterIcon>
		</div>
	</div>
</Footer>
