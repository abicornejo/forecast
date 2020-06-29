export default (state = {}, action) => {
    switch (action.type) {
        case 'SIMPLE_ACTION':
            console.log('action', action);

            return {
                search: action.search
            }
        default:
            return state
    }
}
