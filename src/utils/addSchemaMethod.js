/* eslint-disable func-names */
/* eslint-disable prettier/prettier */
const addSchemaMethod = schema => {
  schema.method('toResponse', function () {
    const { _id, ...params } = this.toJSON();
    delete params.password;
    delete params.__v;
    return { id: _id, ...params };
  });
};

module.exports = addSchemaMethod;
