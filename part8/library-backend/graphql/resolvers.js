const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');

const Book = require('../models/book');
const Author = require('../models/author');
const User = require('../models/user');

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.genre && args.author) {
        const author = await Author.findOne({ name: args.author });
        return Book.find({ author: author.id, genres: args.genre }).populate(
          'author'
        );
      }
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        return Book.find({ author: author }).populate('author');
      }
      if (args.genre) {
        return Book.find({ genres: args.genre }).populate('author');
      }
      return await Book.find({}).populate('author');
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
    recommendBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const favoriteGenre = currentUser.favoriteGenre;
      const books = await Book.find({ genres: favoriteGenre }).populate(
        'author'
      );
      return books;
    },
  },
  Author: {
    bookCount: async (root) => {
      const foundBooks = await Book.find({ author: root.id });
      return foundBooks.length;
    },
  },

  Mutation: {
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
    addBook: async (root, args, context) => {
      let author = await Author.findOne({ name: args.author });
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      if (!author) {
        author = new Author({ name: args.author, bookCount: 1 });
        try {
          await author.save();
          await currentUser.save();
        } catch (error) {
          throw new GraphQLError(error.message, {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
            },
          });
        }
      } else {
        author.bookCount += 1;
        await author.save();
      }

      let book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author,
      });

      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            invalidArgs: args,
          },
        });
      }

      return book;
    },
    editAuthor: async (root, args, context) => {
      const author = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        {
          new: true,
        }
      );
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }
      if (!author) {
        throw new GraphQLError('Author not found', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.author,
          },
        });
      }
      try {
        await author.save();
        await currentUser.save();
      } catch (error) {
        throw new GraphQLError(error.message, {
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

module.exports = resolvers;
