export interface ITask {
	id?: string
	name: string
	time: string | null
	image?: string | null
}

export interface IUserTasks {
	tasks: ITask[]
}
