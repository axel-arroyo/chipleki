export const ACTION_FETCH = 'ACTION_FETCH';
export const ACTION_UPDATE = 'ACTION_UPDATE';
export const ACTION_CREATE = 'ACTION_CREATE';

export const fetchProjects = (projects) => {
	return {
		type: ACTION_FETCH,
		payload: {
			projects: projects,
		}
	}
}

export const createProject = (project) => {
	return {
		type: ACTION_CREATE,
		payload: {
			project: project,
		}
	}
}

export const updateProject = (projectId, finished) => {
	return {
		type: ACTION_UPDATE,
		payload:{
			id: projectId,
			finished: finished,
		}
	}
}