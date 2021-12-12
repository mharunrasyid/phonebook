var { buildSchema } = require('graphql');
var service = require("../services/index")

var schema = buildSchema(`
  input PhonebookInput {
    name: String!
    phone: String!
  }

  input GetPhonebookInput {
    name: String!
    phone: String!
    limit: Int!
    offset: Int!
  }

  type Phonebook {
    id: String!
    name: String!
    phone: String!
  }

  type PhonebookGet {
    data: [Phonebook]!
    dataCount: Int
  }

  type Query {
    getPhonebooks(input: GetPhonebookInput): PhonebookGet
  }

  type Mutation {
    createPhonebook(input: PhonebookInput): Phonebook
    updatePhonebook(id: String!, input: PhonebookInput): Phonebook
    deletePhonebook(id: String!, input: PhonebookInput): Phonebook
  }
`);

const root = {
  getPhonebooks: async ({ input }) => {
    try {
      return await service.getPhonebooks(input)
    } catch (err) {
      throw err
    }
  },
  createPhonebook: async ({ input }) => {
    try {
      return await service.createPhonebook(input)
    } catch (err) {
      throw err
    }
  },
  updatePhonebook: async ({ id, input }) => {
    try {
      const data = {
        id,
        ...input
      }
      return await service.editPhonebook(data)
    } catch (err) {
      throw err
    }
  },
  deletePhonebook: async ({ id, input }) => {
    try {
      const data = {
        id,
        ...input
      }
      return await service.removePhonebook(data)
    } catch (err) {
      throw err
    }
  }
};

module.exports = { schema, root }