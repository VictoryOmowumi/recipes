import React, { useState, useEffect } from "react";
import "./App.css";
import { useQuery } from "@apollo/client";
import { GET_RECIPES } from "./queries";
import { INCREASE_THUMBS_UP, INCREASE_THUMBS_DOWN, CREATE_RECIPE, EDIT_RECIPE} from "./mutations";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import {IoMdAdd} from "react-icons/io";
import {BiEdit} from "react-icons/bi";
import client from "./apollo";
import Header from "./components/Header";
import NewRecipeModal from "./components/NewRecipeModal";
import EditModal from "./components/EditModal";
function App() {
  const [like, setLike] = useState({});
  const [dislike, setDislike] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [recipe, setRecipe] = useState("");
  const { loading, error, data } = useQuery(GET_RECIPES, {
    variables: { amount: 8 },
    client: client,
  });
  useEffect(() => {
    if (data && data.getRecipes) {
      // Initialize the like and dislike state for each recipe to false
      const initialLikeState = {};
      const initialDislikeState = {};
      data.getRecipes.forEach((recipe) => {
        initialLikeState[recipe._id] = false;
        initialDislikeState[recipe._id] = false;
      });
      setLike(initialLikeState);
      setDislike(initialDislikeState);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const recipes = data.getRecipes;

  const thumbsUp = async (id) => {
    await client.mutate({
      mutation: INCREASE_THUMBS_UP,
      variables: { id: id },
    });
    setLike({ ...like, [id]: true });
  };

  const thumbsDown = async (id) => {
    await client.mutate({
      mutation: INCREASE_THUMBS_DOWN,
      variables: { id: id },
    });
    setDislike({ ...dislike, [id]: true });
  };

 const addRecipe = async () => {
    await client.mutate({
      mutation: CREATE_RECIPE,
      variables: {recipeInput: {name: name, description: description, image: image}},
      refetchQueries: [{query: GET_RECIPES, variables: {amount: 7}}]
    });
    setShowModal(false);
    setName('');
    setDescription('');
    setImage('');
  }

  const openEditModal = (id) => {
    setShowEditModal(true);
    const recipe = recipes.find(recipe => recipe._id === id);
    setRecipe(recipe);
  console.log(recipe); 
  } 

  const editRecipe = async (id) => {
    await client.mutate({
      mutation: EDIT_RECIPE,
      variables: {id: id, recipeInput: {name: name, description: description, image: image}},
      refetchQueries: [{query: GET_RECIPES, variables: {amount: 7}}]
    });
    setShowEditModal(false);
    // setName('');
    // setDescription('');
    // setImage('');
  }



  return (
    <div className="w-4/5 mx-auto p-4">
      <Header />
      <div className="flex w-full justify-between items-center my-4">
        <h1 className="text-2xl font-bold">Recipes</h1>
        <button className="flex items-center gap-4 bg-transparent border border-teal-500 text-teal-500 px-4 py-2 rounded-md hover:bg-teal-500 hover:text-white transition-colors duration-300"
        onClick={() => setShowModal(true)}
        >
          Add Recipe
            <span className="bg-teal-500 text-teal-100 p-2 font-semibold rounded-md"><IoMdAdd /></span>
        </button>
      </ div>
      <div className="grid grid-cols-3 gap-8">
        {
          recipes && (
            
          recipes.map((recipe, index) => (
          <div className="recipe overflow-clip relative" key={index}>
            <div className="absolute top-0 right-0 p-2 hover:block">
              <div className="group">
                <button className="w-8 h-8 flex justify-center items-center rounded-full p-2 bg-teal-400 text-white hover:text-teal-600 transition-colors duration-300 button"
                    onClick={() => openEditModal(recipe._id)}
                >
                  <BiEdit className="text-xl" />
                </button>
              </div>
            </div>
            
            <div className="img">
              <img src={recipe.image} alt={recipe.name} />
            </div>
            <h2>{recipe.name}</h2>
            <p>{recipe.description}</p>
            <div className="like">
              <button
                className="flex gap-2 items-center "
                onClick={() => thumbsUp(recipe._id)}
              >
                {recipe.thumbsUp === 0 ? (
                  <AiOutlineLike
                    className={`${
                      like[recipe._id] ? "text-green-500" : "text-black"
                    }`}
                  />
                ) : (
                  <AiFillLike
                    className={`${
                      like[recipe._id] ? "text-green-500" : "text-black"
                    }`}
                  />
                )}
                {recipe.thumbsUp}
              </button>
              <button
                className="flex gap-2 items-center"
                onClick={() => thumbsDown(recipe._id)}
              >
                {recipe.thumbsDown === 0 ? (
                  <AiOutlineDislike
                    className={`${
                      dislike[recipe._id] ? "text-red-500" : "text-black"
                    }`}
                  />
                ) : (
                  <AiFillDislike
                    className={`${
                      dislike[recipe._id] ? "text-red-500" : "text-black"
                    }`}
                  />
                )}
                {recipe.thumbsDown}
              </button>
            </div>
          </div>
        ))
          )}
      </div>

      {
        showModal && <NewRecipeModal 
        showModal={showModal}
        setShowModal={setShowModal}
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        image={image}
        setImage={setImage}
        addRecipe={addRecipe}
         />
      }
     
      {
        showEditModal && <EditModal 
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        image={image}
        setImage={setImage}
        editRecipe={editRecipe}
      id={recipe._id} 
         />
      }


    </div>
  );
}

export default App;
