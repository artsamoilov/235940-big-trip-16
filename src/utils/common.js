export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomSignedFloat = () => (0.5 - Math.random());

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);
  return (index === -1) ? items : [...items.slice(0, index), update, ...items.slice(index + 1)];
};
