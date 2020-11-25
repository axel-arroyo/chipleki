export const ACTION_FETCH = 'ACTION_FETCH';
export const ACTION_UPDATE = 'ACTION_UPDATE';
export const ACTION_CREATE = 'ACTION_CREATE';

export const fetchRequirements = (requirements) => {
	return {
		type: ACTION_FETCH,
		payload: {
			requirements: requirements,
		}
	}
}

export const createRequirement = (requirement) => {
	return {
		type: ACTION_CREATE,
		payload: {
			requirement: requirement,
		}
	}
}

export const updateRequirement = (requirementId, finished) => {
	return {
		type: ACTION_UPDATE,
		payload:{
			id: requirementId,
			finished: finished,
		}
	}
}