function addIngredient() {
    const ingredients = document.querySelector("#new_ingredients");
    const fieldContainer = document.querySelectorAll(".new_ingredient");
  
    // Realiza um clone do último ingrediente adicionado
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);
  
    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.children[0].value == "") return false;
  
    // Deixa o valor do input vazio
    newField.children[0].value = "";
    ingredients.appendChild(newField);
}

function addStep() {
  const preparation = document.querySelector("#new_steps");
  const fieldContainer = document.querySelectorAll(".new_step");

  // Realiza um clone do último ingrediente adicionado
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  // Não adiciona um novo input se o último tem um valor vazio
  if (newField.children[0].value == "" || newField.children[1].value == "") return false;

  // Deixa o valor do input vazio
  newField.children[0].value = "";
  newField.children[1].value = "";
  preparation.appendChild(newField);
}

  
document
  .querySelector(".add-ingredient")
  .addEventListener("click", addIngredient);

document
  .querySelector(".add-preparation")
  .addEventListener("click", addStep);