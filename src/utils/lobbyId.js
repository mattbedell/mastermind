// https://stackoverflow.com/a/1349426
module.exports = function getId(idLength, existingIds) {
  const allLeters = 'abcdefghijklmnopqrstuvwkyz';
  let result = '';

  for (let i = 0; i < idLength; i += 1) {
    result += allLeters.charAt(Math.floor(Math.random() * allLeters.length));
  }

  if (existingIds.includes(result)) {
    return getId(idLength, existingIds);
  }

  return result.toUpperCase();
};
