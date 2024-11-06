/*
* This is a RESTful API that would power a personal blog.
* This implies that you’d have to create a backend API with the following responsibilities:

Return a list of articles. You can add filters such as publishing date, or tags.
Return a single article, specified by the ID of the article.
Create a new article to be published.
Delete a single article, specified by the ID.
Update a single article, again; you’d specify the article using its ID.
And with those endpoints, you’ve covered the basic CRUD operations (Create, Read, Update and Delete).
* */

// ESM
import Fastify from 'fastify'
import articles from './routes/articles.js';
import cors from '@fastify/cors';
import * as fastifyStatic from '@fastify/static';
import * as path from 'path';
import {fileURLToPath} from 'url';


const fastify = Fastify({logger: true});
const __dirname = path.dirname(fileURLToPath(import.meta.url));

await fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
})

// static setup for the frontend assets
fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'web/dist'),
  prefix: '/',
});

// articles route
fastify.register(articles);

fastify.get('/', (req, reply) => {
  reply.sendFile('index.html');
});

// Run the server!
fastify.listen({port: process.env.PORT || 3000}, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})
