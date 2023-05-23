
import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({

    creator: {
        type: Schema.Types.ObjectId,
        ref: "User", //This create a 1 to many relationship. One user can create many prompts
    },
    prompt: {
        type: String,
        required: [true, "Esse campo é obrigatorio"],
    },
    tag: {
        type: String,
        required: [true, "Esse campo é obrigator"]
    },

});

const Prompt = models.Prompt || model('Prompt', PromptSchema)
export default Prompt;