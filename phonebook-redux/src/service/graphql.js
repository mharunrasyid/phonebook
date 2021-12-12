import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql'
});


export const loadPhonebooks = (name, phone, limit, offset) => {
    const GET_PHONEBOOKS = gql`
    query getPhonebooks($name: String!, $phone: String!, $limit: Int!, $offset: Int!) {
            getPhonebooks(input: {
                name: $name,
                phone: $phone
                limit: $limit,
                offset: $offset
            }) {
                data {
                    id,
                    name,
                    phone
                  },
                  dataCount
            }
        }`;

    return client.query({ query: GET_PHONEBOOKS, variables: { name, phone, limit, offset }, fetchPolicy: "no-cache" })
        .then(response => response.data.getPhonebooks).catch(err => {
            throw err
        })
}

export const addPhonebook = (name, phone) => {
    const ADD_PHONEBOOK = gql`
        mutation createPhonebook($name: String!, $phone: String!) {
            createPhonebook(input: {
                name: $name,
                phone: $phone
            }) {
                id
                name,
                phone
            }
        }`;

    return client.mutate({ mutation: ADD_PHONEBOOK, variables: { name, phone }, fetchPolicy: "no-cache" })
        .then(response => response.data.createPhonebook).catch(err => {
            throw err
        })
}

export const updatePhonebook = (id, name, phone) => {
    const UPDATE_PHONEBOOK = gql`
        mutation updatePhonebook($id: String!, $name: String!, $phone: String!) {
            updatePhonebook(id: $id, input: {
                name: $name,
                phone: $phone
            }) {
                id
                name,
                phone
            }
        }`;

    return client.mutate({ mutation: UPDATE_PHONEBOOK, variables: { id, name, phone }, fetchPolicy: "no-cache" })
        .then(response => response.data.updatePhonebook).catch(err => {
            throw err
        })
}

export const removePhonebook = (id, name, phone) => {
    const REMOVE_PHONEBOOK = gql`
        mutation removePhonebook($id: String!, $name: String!, $phone: String!) {
            deletePhonebook(id: $id, input: {
                name: $name,
                phone: $phone
            }) {
                id
                name,
                phone
            }
        }`;

    return client.mutate({ mutation: REMOVE_PHONEBOOK, variables: { id, name, phone }, fetchPolicy: "no-cache" })
        .then(response => response.data.deletePhonebook).catch(err => {
            throw err
        })
}