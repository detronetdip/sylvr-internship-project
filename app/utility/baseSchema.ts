import { Schema, SchemaDefinition } from 'mongoose';

export class BaseSchema extends Schema {
  constructor(schema: SchemaDefinition) {
    super(
      {
        ...schema,
        isDeleted: {
          type: Boolean,
          default: false,
        },
      },
      {
        timestamps: true,
      }
    );
  }
}
