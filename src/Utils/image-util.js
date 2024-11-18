const getImageURL = (name) => {
  return require(`./../images/${name}`);
};

export { getImageURL };
