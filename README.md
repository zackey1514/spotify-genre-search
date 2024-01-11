# spotify-genre-search

![build](https://github.com/zackey1514/spotify-genre-search/actions/workflows/deploy.yaml/badge.svg)

### Requirement

- [bun](https://bun.sh/docs/installation)

## Getting Started

### Installations

1. Clone the repo
   ```sh
   git clone git@github.com:zackey1514/spotify-genre-search.git && cd spotify-genre-search
   ```
1. Install packages
   ```sh
   bun i
   ```
1. Get a access token at [https://developer.spotify.com](https://developer.spotify.com/)
1. Create `.env`
   ```sh
   touch ./.env
   ```
1. Enter your access token in `.env`
   ```ini
   SPOTIFY_CLIENT_ID=<your client id>
   SPOTIFY_CLIENT_SECRET=<your client secret>
   ```

### Development

- Run
  ```sh
  bun run dev
  ```

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#spotify-genre-search">back to top</a>)</p>
