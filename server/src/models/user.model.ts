import { Document, Schema, Types, model } from 'mongoose'
import UserTasks, { IUserTasks } from './userTasks.model'

export interface IUser extends Document {
	login: string
	email: string
	password: string
	tasks: IUserTasks
}

const userSchema: Schema = new Schema({
	login: { type: String, require: true },
	email: { type: String, require: true },
	password: { type: String, require: true },
	tasks: { type: Types.ObjectId, ref: 'UserTasks' }
})

userSchema.pre('save', async function (next) {
	const newTasks = new UserTasks({ tasks: [] })
	await newTasks.save()

	this.tasks = newTasks._id

	next()
})

const User = model<IUser>('User', userSchema)

export default User
