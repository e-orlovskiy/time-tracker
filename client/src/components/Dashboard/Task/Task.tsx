import cn from 'classnames'
import React, { useState } from 'react'
import { FaPause, FaPlay, FaTrash } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { formatDuration } from '../../../helpers/formatTime'
import { AppDispatch } from '../../../store/store'
import {
	deleteTasks,
	tasksActions,
	updateTasks
} from '../../../store/tasks.slice'
import styles from './Task.module.css'

interface TaskProps {
	name: string
	time: string
}

export const Task: React.FC<TaskProps> = ({ name, time }) => {
	const dispatch = useDispatch<AppDispatch>()
	const [taskTime, setTaskTime] = useState<number>(+time)
	const [intervalId, setIntervalId] = useState<number | null>(null)

	const timer = () => {
		const intervalId = setInterval(() => {
			setTaskTime(prev => {
				return prev + 1
			})
		}, 1000)

		setIntervalId(intervalId)
	}

	const updateTask = (taskName: string) => {
		if (intervalId !== null) {
			clearInterval(intervalId)
			dispatch(
				tasksActions.updateTask({ name: taskName, time: taskTime.toString() })
			)
			dispatch(updateTasks({ name: taskName, time: taskTime.toString() }))
		}
	}

	const removeTask = (taskName: string) => {
		// Остановка таймера перед удалением задачи
		if (intervalId !== null) {
			clearInterval(intervalId)
		}

		dispatch(tasksActions.removeTask(taskName))
		dispatch(deleteTasks(taskName))
	}

	return (
		<li className={cn(styles['task'])}>
			<p className={cn(styles['task-name'])}>{name}</p>
			<p className={cn(styles['task-time'])}>{formatDuration(taskTime)}</p>
			<div className={cn(styles['task-buttons'])}>
				<button className={cn(styles['start-btn'])}>
					<FaPlay
						onClick={() => {
							timer()
						}}
					/>
				</button>
				<button className={cn(styles['stop-btn'])}>
					<FaPause
						onClick={() => {
							updateTask(name)
						}}
					/>
				</button>
				<button className={cn(styles['stop-btn'])}>
					<FaTrash
						onClick={() => {
							removeTask(name)
						}}
					/>
				</button>
			</div>
		</li>
	)
}
