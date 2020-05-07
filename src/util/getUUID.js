const getUUID = (idLength = 16) => {
  const timestamp = new Date().getTime();
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const length = idLength || chars.length;
  const uuid = [];

  for (let i = 0; i < length; i += 1) {
    const random = Math.random();
    const index = Math.floor(random * length);
    uuid[i] = chars[index];
  }

  return uuid.join('') + timestamp;
};

export default getUUID;
