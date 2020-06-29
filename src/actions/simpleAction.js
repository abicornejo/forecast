export const simpleAction = (search) => dispatch => {
    console.log('searchACTION', search);

    dispatch({
        type: 'SIMPLE_ACTION',
        search
    })
}
