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

const fastify = Fastify({logger: true});
await fastify.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
})

// articles route
fastify.register(articles);

// Declare a route
fastify.get('/', function (request, reply) {
    reply.send({hello: 'world'})
})

// Run the server!
fastify.listen({port: 3000}, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    // Server is now listening on ${address}
})