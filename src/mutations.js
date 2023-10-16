import { gql } from "@apollo/client";

export const INCREASE_THUMBS_UP = gql`
mutation ThumbsUp($id: ID!) {
    thumbsUp(ID: $id) {
      _id
      createdAt
      description
      image
      name
      thumbsDown
      thumbsUp
    }
  }
`;

export const INCREASE_THUMBS_DOWN = gql`
mutation Mutation($id: ID!) {
    thumbsDown(ID: $id) {
      _id
      thumbsDown
    }
  }
`;

export const CREATE_RECIPE = gql`
mutation Mutation($recipeInput: RecipeInput) {
    createRecipe(RecipeInput: $recipeInput) {
      name
      image
      description
    }
  }
`;
export const EDIT_RECIPE = gql`
mutation Mutation($id: ID!, $recipeInput: RecipeInput) {
    editRecipe(ID: $id, RecipeInput: $recipeInput)
  }
`;