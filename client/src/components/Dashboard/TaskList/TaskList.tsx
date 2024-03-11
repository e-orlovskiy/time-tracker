import cn from 'classnames'
import { FaPlus, FaSearch } from 'react-icons/fa'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../store/store'
import { addTasks, tasksActions } from '../../../store/tasks.slice'
import { Task } from '../Task/Task'
import styles from './TaskList.module.css'

export const TaskList = () => {
	const dispatch = useDispatch<AppDispatch>()
	const allTasks = useSelector((state: RootState) => state.tasks.tasks)

	const addTask = () => {
		const name = prompt('Enter task name')
		const time = prompt('Enter task time')

		if (name && time) {
			dispatch(tasksActions.addTask({ name, time }))
			dispatch(addTasks({ name, time }))
		}
	}

	return (
		<div className={cn(styles['tasklist-page'])}>
			<div className={cn(styles['tasklist-container'])}>
				<div className={cn(styles['header'])}>
					<h2 className={cn(styles['header-text'])}>TimeTracker</h2>
					<div className={cn(styles['user-container'])}>
						<img src='/avatar.avif' alt='' />
						<div className={cn(styles['user-text-info'])}>
							<p className={cn(styles['user-login'])}>username</p>
							<p className={cn(styles['user-email'])}>email@mail.ru</p>
						</div>
					</div>
				</div>
				<div className={cn(styles['search-container'])}>
					<FaSearch className={cn(styles['search-icon'])} />
					<input type='search' placeholder='Search' />
				</div>
				<ul className={cn(styles['list'])}>
					{allTasks.map(task => (
						<Task
							key={task.name}
							name={task.name}
							time={task.time ? task.time : '0s'}
						/>
					))}
				</ul>
				<button className={cn(styles['add-task'])}>
					<FaPlus onClick={addTask} />
				</button>
			</div>
		</div>
	)
}
