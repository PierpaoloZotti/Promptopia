import { Schema, model, models } from 'mongoose';


const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email ja existente'],
        required: [true, 'Esse campo é obrigatório']
    },
    username: {
        type: String,
        required: [true, 'Esse campo é obrigatório'],
        //match: [/^(?=.{4,30}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalido, deve ter 8-20 caracteres alfanumericos e deve ser unico!"]
    },
    image: {
        type: String
    }
});

/* 
models.User is necessary when we create a model in NextJS
cause in NextJS backend isn't always running but just when needed
*/
const User = models.User || model('User', UserSchema);
export default User;