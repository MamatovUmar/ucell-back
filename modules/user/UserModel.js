import {Schema, model} from 'mongoose'

export const USER_REF_NAME = 'User'

const userSchema = new Schema({
    login: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: String,
    role: {
        type: String,
        enum: ['user', 'moderator', 'admin'],
        default: 'user'
    }
},
{
    timestamps: true,
})

userSchema.index({ username: 'text' })
userSchema.set('toJSON', {
    virtuals: true
})

const Model = model(USER_REF_NAME, userSchema)

export async function getPublicFields(options) {
    return Model.findOne(options, '-password -__v')
}

export default Model