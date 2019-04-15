import { observable, action, computed, toJS } from 'mobx';

import Task from './Models/Task';

interface ITasks {
	[id: string]: Task;
}

class RestrictionsEditorStore {
	@observable private tasksMap: ITasks;

	public constructor() {
		this.tasksMap = {} as ITasks;
	}

	@action public setTasks = (tasks: ITasks) => {
		this.tasksMap = tasks;
	};

	@action public clear = () => {
		this.tasksMap = {} as ITasks;
	};

	@computed public get tasks(): ITasks {
		return toJS(this.tasksMap);
	}
}

export default RestrictionsEditorStore;
