// gkc_hash_code : 01E7J182PMWQBNM0GN3DE8TS7F
export default value => {
  if (typeof value !== 'string') {
    throw new Error('Invalid data type.');
  }

  return value.length === 0;
};
