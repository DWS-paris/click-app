// GEt saved user informations
const connectedUser = JSON.parse( localStorage.getItem('click-user') );

// Define and export
export default function( state = connectedUser, action ){
    // Check action type
    switch( action.type ){
        case 'LOGIN-USER':
            // Save value in localStorage
            localStorage.setItem('click-user', JSON.stringify( action.value ));

            // Return state value
            return state = action.value;

        case 'LOGOUT-USER':
            // Clear localStorage
            localStorage.clear()

            // Clear state value
            return state = null;

        default:
            return state = state;
    }
}