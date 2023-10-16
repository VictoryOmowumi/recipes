import { gql } from "@apollo/client";

export const GET_RECIPES = gql`
query GetRecipes($amount: Int) {
    getRecipes(amount: $amount) {
     _id 
      createdAt
      description
      name
      thumbsDown
      thumbsUp
      image
    }
  }
`;  

export const GET_RECIPE = gql`
query Recipe($id: ID!) {
    recipe(ID: $id) {
      _id  
      createdAt
      description
      name
      thumbsDown
      thumbsUp
      image
    }
  }
`;