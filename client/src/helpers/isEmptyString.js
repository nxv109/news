export default value => {
  if (typeof value !== 'string') {
    throw new Error('Invalid data type.');
  }

  return value.length === 0;
};
