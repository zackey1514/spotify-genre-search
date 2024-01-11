import { Hono } from 'hono';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';
import { logger } from 'hono/logger';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '$env/static/private';
import { convertLimit, convertOffset } from '../util/util';

const spotifyClient = SpotifyApi.withClientCredentials(
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  []
);

export const apiApp = new Hono();

apiApp.use('*', logger());
apiApp.use('*', cors());

const apiRoute = apiApp
  .get('/artists/:id', async (c) => {
    const id = c.req.param('id');
    console.info({ id });
    const artist = await spotifyClient.artists.get(id).catch(() => {
      throw new HTTPException(400, { message: 'invalid request' });
    });

    return c.json(artist);
  })
  .get('/artists', async (c) => {
    const { artist, limit, offset } = c.req.query();
    console.info({ artist, limit, offset });
    const numLimit = convertLimit(limit);
    const numOffset = convertOffset(offset);
    const res = await spotifyClient
      .search(artist, ['artist'], undefined, numLimit, numOffset)
      .catch(() => {
        throw new HTTPException(400, { message: 'invalid request' });
      });

    return c.json(res.artists);
  })
  .get('/genres', async (c) => {
    const { genre, limit, offset } = c.req.query();
    console.info({ genre, limit, offset });
    const numLimit = convertLimit(limit);
    const numOffset = convertOffset(offset);
    const res = await spotifyClient
      .search(`genre:${genre.replace(/\s/g, '+')}`, ['artist'], undefined, numLimit, numOffset)
      .catch(() => {
        throw new HTTPException(400, { message: 'invalid request' });
      });
    return c.json(res.artists);
  });

export type ApiRoute = typeof apiRoute;
