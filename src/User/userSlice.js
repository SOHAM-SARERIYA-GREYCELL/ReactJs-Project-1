import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: []
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users = [...action.payload];
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter((user) => user.id !== action.payload)
        },
        editUser: (state, action) => {
            state.users = state.users
        }
    }
})

export const { addUser, deleteUser } = userSlice.actions

export default userSlice.reducer

// async componentDidMount() {
//     const { id, initialize } = this.props;
//     if (id) {
//         const userDetails = await service.fetchUserDetails("http://localhost:3000/users", id);
//         initialize({
//             id: userDetails.id,
//             userName: userDetails.name,
//             email: userDetails.email,
//             phoneNo: userDetails.phoneNo,
//             maths: userDetails.maths,
//             physics: userDetails.physics,
//             chemistry: userDetails.chemistry,
//         });
//     }
// }


// addUserDetail = async (user) => {
//     try {
//         await service.addUserDetails(user, this.state.url);
//         this.state.navigate('/')
//     } catch (error) {
//         console.error("Error submitting user data:", error);
//     }
// }

// handleInputChange = (e) => {
//     const { name, value } = e.target;
//     this.setState({
//         user: {
//             ...this.state.user,
//             [name]: value
//         }
//     });
// };
