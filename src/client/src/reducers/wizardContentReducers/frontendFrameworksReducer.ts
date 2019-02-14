import * as Actions from "../../actions/types";

/* State Shape
{
    frontendOptions: []
}
*/

const frontendOptions = (state = [], action: any) => {
    switch(action.type) {
        case Actions.GET_FRONTEND_FRAMEWORKS_SUCCESS:
            return action.payload;
        case Actions.GET_FRONTEND_FRAMEWORKS:
        default:
            return state;
    }
}

export default frontendOptions;
