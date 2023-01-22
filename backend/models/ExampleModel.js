import mongoose from "mongoose";

const { Schema, model } = mongoose

const ExampleSchema = new Schema({

    field1: { type: Number, required: true },

    field2: { type: String },

    field3: { type: [Boolean], default: [] }

}, { collection: "Example" })

export const ExampleModel = model('Example', ExampleSchema)