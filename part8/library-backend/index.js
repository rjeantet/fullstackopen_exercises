const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { v1: uuid } = require('uuid');
const { GraphQLError } = require('graphql');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
require('dotenv').config();

const Book = require('./models/book');
const Author = require('./models/author');

const MONGODB_URI = process.env.MONGODB_URI;

console.log('connecting to', MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

let authors = [
  {
    name: 'Robert Martin',
    id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
    born: 1963,
  },
  {
    name: 'Fyodor Dostoevsky',
    id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    born: 1821,
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
  },
];
let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns'],
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime'],
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution'],
  },
];

const typeDefs = `
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author:String, genre:String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      //[TODO]: Fix this
      if (args.genre && args.author) {
        const author = await Author.findOne({ name: args.author });
        return Book.find({ author: author.id, genres: args.genre });
      }
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        return Book.find({ author: author.id });
      }
      if (args.genre) {
        return Book.find({ genres: args.genre });
      }
      return await Book.find({});
    },
    allAuthors: async () => Author.find({}),
  },
  Author: {
    bookCount: (root) =>
      //[TODO]: Fix this
      books.filter((book) => book.author === root.name).length,
  },
  Mutation: {
    addBook: async (root, args) => {
      if (await Book.findOne({ title: args.title })) {
        throw new GraphQLError('Book already exists', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
          },
        });
      }
      if (await !Author.findOne({ name: args.author })) {
        throw new GraphQLError('Please add author', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.author,
          },
        });
      }
      if (!args.title || !args.author || !args.published || !args.genres) {
        throw new GraphQLError('Missing required fields', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
          },
        });
      }
      const book = await new Book({
        title: args.title,
        author: args.author,
        published: args.published,
        genres: args.genres,
      }).save();

      return book;

      // if (books.find((b) => b.title === args.title)) {
      //   throw new GraphQLError('Book already exists', {
      //     extensions: {
      //       code: 'BAD_USER_INPUT',
      //       invalidArgs: args.title,
      //     },
      //   });
      // }
      // if (!authors.find((author) => author.name === args.author)) {
      //   const author = { name: args.author };
      //   authors = authors.concat(author);
      // }
      // if (!args.title || !args.author || !args.published || !args.genres) {
      //   throw new GraphQLError('Missing required fields', {
      //     extensions: {
      //       code: 'BAD_USER_INPUT',
      //       invalidArgs: args,
      //     },
      //   });
      // }
      // const book = { ...args };
      // books = books.concat(book);
      // const book = await new Book({
      //   title: args.title,
      //   author: args.author,
      //   published: args.published,
      //   genres: args.genres,
      //   ...args,
      // }).save();

      // return book;
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        {
          new: true,
        }
      );
      if (!author) {
        throw new GraphQLError('Author not found', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.author,
          },
        });
      }
      return author;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
