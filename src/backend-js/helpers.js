const outputAsListItems = (arr) => {
  const listItems = arr.map((el) => `<li>${el}</li>`).join("");

  return `<ul class="list-unstyled mb-0">${listItems}</ul>`;
};

module.exports = {
  outputAsListItems,
};
