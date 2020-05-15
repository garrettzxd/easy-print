const getTypeOfData = (data) => {
  const type = (typeof data).toLowerCase();

  if (type !== 'object') return type;

  const realType = Object.prototype.toString.call(data).toLowerCase();
  const typeObject = {
    '[object object]': 'object',
    '[object array]': 'object',
    '[object null]': 'object',
    '[object error]': 'object',
    '[object regexp]': 'object',
    '[object date]': 'object',
  };
  return typeObject[realType];
};

export default getTypeOfData;
