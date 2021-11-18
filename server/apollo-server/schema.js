const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    users: [User]!
    getUser(id: ID!): User
    isUserAuth: User
    loginUser(email: String!, password: String): CreateUserResponse!
    getLanguageObj(userId: ID!): LanguageObject
    getNotebookObj(userId: ID!): NotebookObject
    getTimerObj(userId: ID!): TimerObject
    searchDictionary(userQuery: String): [DictionaryWord]
  }
  type Mutation {
    createUser(
      email: String!
      name: String!
      password: String
    ): CreateUserResponse!
    logoutUser(id: ID!): MessageResponse
    updateUser(
      id: ID!
      name: String
      email: String
      password: String
      native: String
      learn: String
    ): UpdateUser
    updateUserLanguage(id: ID!, native: String, learn: String): MessageResponse
    addWord(
      userId: ID!
      from: String
      to: String
      fromLang: String
      toLang: String
    ): MessageResponse
    addFlashcard(
      from: String
      to: String
      fromLang: String
      toLang: String
    ): MessageResponse
    removeWord(wordId: ID!): MessageResponse
    editWord(wordId: ID!, from: String, to: String): MessageResponse
    addIgnoreWord(word: String): MessageResponse
    removeIgnoreWord(word: String): MessageResponse
    addAndTranslateWords(words: [String]): MessageResponse
    removeFlashcard(flashcardId: ID!): MessageResponse
    editFlashcard(flashcardId: ID!, from: String, to: String): MessageResponse
    updateFlashcardStatus(flashcardId: ID!, iCan: Boolean): MessageResponse
    updateTimerStatus(status: Boolean): MessageResponse
    addNotebook(name: String): MessageResponse
    addNote(title: String, text: String, notebookId: String): MessageResponse
    removeNotebook(notebookId: ID!): MessageResponse
    removeNote(notebookId: ID, noteId: ID!): MessageResponse
    editNote(
      notebookId: ID
      noteId: ID!
      title: String
      text: String
    ): MessageResponse
  }
  type User {
    id: ID!
    name: String!
    email: String!
    language: Lan
  }
  type UpdateUser {
    id: ID!
    name: String
    email: String
    password: String
    language: Lan
  }
  type Lan {
    native: String
    learn: String
  }
  type CreateUserResponse {
    success: Boolean!
    message: String
    id: ID!
    token: String
  }
  type MessageResponse {
    status: Boolean!
    message: String!
  }
  type FlashCard {
    from: String
    fromLang: String
    to: String
    toLang: String
    iCan: Boolean
    id: String
  }

  type DictionaryWord {
    from: String
    to: String
    fromLang: String
    toLang: String
    id: ID
  }
  type Notes {
    title: String
    text: String
    date: String
    id: ID
  }
  type Notebook {
    name: String
    id: ID
    notes: [Notes]
  }

  type TimerElement {
    startAt: String
    endAt: String
    id: ID
  }
  type Timer {
    date: String
    id: ID
    focus: TimerElement
    break: TimerElement
  }

  type LanguageObject {
    userId: ID
    dictionary: [DictionaryWord]
    flashcards: [FlashCard]
    ignoreWords: [String]
  }
  type NotebookObject {
    userId: ID
    notebooks: [Notebook]
    id: ID
  }
  type TimerObject {
    userId: ID
    currentState: String
    timers: [Timer]
    id: ID
  }
`;

module.exports = typeDefs;
