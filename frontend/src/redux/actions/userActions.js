export const ACTION_FETCH = 'ACTION_FETCH';

export const fetchUsers = (users) => {
	return {
		type: ACTION_FETCH,
		payload: {
			users: users,
		}
	}
}
