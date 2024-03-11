import { Response } from 'express'
import { AuthRequest } from '../middleware/authMiddleware'
import User from '../models/user.model'
import UserTasks from '../models/userTasks.model'

export const addTask = async (req: AuthRequest, res: Response) => {
	const decoded = req.user
	try {
		if (typeof decoded === 'object' && 'id' in decoded) {
			const user = await User.findById(decoded.id)
			const userTasks = await UserTasks.findOne({ _id: user?.tasks })

			if (userTasks) {
				if (userTasks?.tasks.find(task => task.name == req.body.name)) {
					return res
						.status(400)
						.json({ message: 'task with this name already exists' })
				} else {
					userTasks?.tasks.push(req.body)
					await userTasks?.save()
				}
			}
		}
		return res.status(200).json({ message: 'task added' })
	} catch (err) {
		console.log(err)
		return res.status(400).json({ message: 'task not added' })
	}
}

export const deleteTask = async (req: AuthRequest, res: Response) => {
	const decoded = req.user
	try {
		if (typeof decoded === 'object' && 'id' in decoded) {
			const user = await User.findById(decoded.id)
			const userTasks = await UserTasks.findOne({ _id: user?.tasks })

			if (userTasks) {
				const task = userTasks.tasks.find(task => task.name == req.body.name)
				if (task) {
					userTasks.tasks = userTasks.tasks.filter(
						task => task.name != req.body.name
					)
					await userTasks.save()
				}
			}
		}
		return res.status(200).json({ message: 'task deleted' })
	} catch (err) {
		console.log(err)
		return res.status(400).json({ message: 'task not deleted' })
	}
}

export const updateTask = async (req: AuthRequest, res: Response) => {
	const decoded = req.user
	console.log(req.body)
	try {
		if (typeof decoded === 'object' && 'id' in decoded) {
			const user = await User.findById(decoded.id)
			const userTasks = await UserTasks.findOne({ _id: user?.tasks })
			if (userTasks) {
				const task = userTasks.tasks.find(task => task.name == req.body.name)
				if (task) {
					task.name = req.body.name
					task.time = req.body.time
					await userTasks.save()
				}
			}
		}
		return res.status(200).json({ message: 'task updated' })
	} catch (err) {
		console.log(err)
		return res.status(400).json({ message: 'task not updated' })
	}
}
