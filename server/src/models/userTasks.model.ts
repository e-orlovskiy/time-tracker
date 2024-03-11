import { Document, Schema, model } from 'mongoose'

export interface IUserTask extends Document {
	name: string
	time: string
	image: string
}

export interface IUserTasks extends Document {
	tasks: IUserTask[]
}

const TasksSchema = new Schema({
	tasks: [
		{
			name: { type: String, require: true },
			time: { type: String, require: false },
			image: { type: String, require: false }
		}
	]
})

const UserTasks = model<IUserTasks>('UserTasks', TasksSchema)

export default UserTasks
