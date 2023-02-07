// GEt saved user informations
const connectedUser = JSON.parse( localStorage.getItem('click-score') );

// Define and export
export default function( state = connectedUser, action ){
    // Check action type
    switch( action.type ){
        case 'USER-SCORE':
            // Save value in localStorage
            localStorage.setItem('click-score', JSON.stringify( action.value ));

            // Return state value
            return state = action.value;

        default:
            return state = state;
    }
}