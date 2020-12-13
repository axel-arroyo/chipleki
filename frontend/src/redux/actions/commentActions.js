export const ACTION_FETCH = "ACTION_FETCH";
export const ACTION_CREATE = "ACTION_CREATE";

export const fetchComments = (comments) => {
  return {
    type: ACTION_FETCH,
    payload: {
      comments: comments,
    },
  };
};

export const createComment = (comment) => {
  return {
    type: ACTION_CREATE,
    payload: {
      comment: comment,
    },
  };
};
