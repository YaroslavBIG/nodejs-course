/* eslint-disable func-names */
/* eslint-disable prettier/prettier */
const addSchemaMethod = schema => {
  schema.method('toResponse', function () {
    const { _id, columns, ...params } = this.toJSON();
    delete params.password;
    delete params.__v;
    if (columns) {
      columns.map(column => {
        column.id = column._id;
        delete column._id;
        return column;
      });
    }
    return { id: _id, columns, ...params };
  });
};

module.exports = addSchemaMethod;
