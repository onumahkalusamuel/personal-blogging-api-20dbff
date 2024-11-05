import {Sequelize, DataTypes} from 'sequelize';

const sequelize = new Sequelize({dialect: 'sqlite', storage: ':memory:'});
const Article = sequelize.define('Article', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    author: DataTypes.STRING,
    tag: DataTypes.TEXT,
});

try {
    await sequelize.authenticate();
    await sequelize.sync({force: true});
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default function (fastify, options, done) {
    // Return a list of articles. You can add filters such as publishing date, or tags.
    fastify.get('/articles', async (request, reply) => {
        const {createdAt, tag} = request.query;

        // Set up filtering conditions
        const whereConditions = {};

        // Filter by createdAt date range if provided (e.g., '2024-11-01')
        if (createdAt) {
            const date = new Date(createdAt);
            whereConditions.createdAt = {
                [Sequelize.Op.gte]: new Date(date.setHours(0, 0, 0, 0)),
                [Sequelize.Op.lt]: new Date(date.setHours(23, 59, 59, 999))
            };
        }

        if (tag) {
            whereConditions.tag = {
                [Sequelize.Op.like]: `%${tag}%`
            };
        }

        // Fetch filtered articles
        const articles = await Article.findAll({where: whereConditions});

        reply.send(articles)
    });

    // Return a single article, specified by the ID of the article.
    fastify.get('/articles/:id', async (request, reply) => {
        const {id} = request.params;
        const article = await Article.findByPk(id);
        if (!article) return reply.code(404).send({message: "Article not found."});
        reply.send(article)
    });

    // Create a new article to be published.
    fastify.post('/articles', async (request, reply) => {
        // request.body;
        const article = await Article.create({
            title: request.body.title,
            content: request.body.content,
            author: request.body.author,
            tag: request.body.tag,
        });

        reply.send(article);
    });

    // Update a single article, again; you’d specify the article using its ID.
    fastify.put('/articles/:id', async (request, reply) => {
        const {id} = request.params;
        const article = await Article.findByPk(id);
        if (!article) reply.code(404).send({message: "Article not found."});

        article.title = request.body.title;
        article.content = request.body.content;
        article.author = request.body.author;
        article.tag = request.body.tag;

        await article.save();

        reply.send(article);
    });

    // Delete a single article, specified by the ID.
    fastify.delete('/articles/:id', async (request, reply) => {
        const {id} = request.params;
        const article = await Article.findByPk(id);
        if (!article) return reply.code(404).send({message: "Article not found."});
        await article.destroy();
        reply.code(204).send();
    });

    done();
}