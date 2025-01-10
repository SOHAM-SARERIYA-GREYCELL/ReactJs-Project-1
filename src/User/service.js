const url = "http://localhost:3000/users";

export const addUserDetails = async (user) => {
    try {
        const method = user.id ? 'PATCH' : 'POST';
        const apiUrl = user.id ? `${url}/${user.id}` : url;
        const response = await fetch(apiUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: user.userName,
                email: user.email,
                phoneNo: user.phoneNo,
                maths: parseFloat(user.maths),
                physics: parseFloat(user.physics),
                chemistry: parseFloat(user.chemistry),
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to submit form data');
        }
    } catch (error) {
        console.error('Error submitting data:', error);
    }
};

export const fetchUserDetails = async (dispatch, addUser, id = 0, setTotalPages, itemsPerPage, initialize) => {

    try {
        const response = id === 0 ? await fetch(url) : await fetch(`${url}/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (id === 0) {
            dispatch(addUser(data));
        }
        if (setTotalPages != null) {
            setTotalPages(Math.ceil(data.length / itemsPerPage));
        }
        if (initialize != null) {
            initialize({
                id: data.id,
                name: data.name,
                email: data.email,
                phoneNo: data.phoneNo,
                maths: data.maths,
                physics: data.physics,
                chemistry: data.chemistry,
            })
        }
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export const deleteData = async (id, userData, dispatch, deleteUser, itemsPerPage, page, setTotalPages, setPage) => {
    const result = confirm('Want to delete?');
    if (result) {
        try {
            const response = await fetch(`${url}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete data');
            }

            dispatch(deleteUser(id));

            const remainingUsers = userData.filter((user) => user.id !== id);
            const newTotalPages = Math.ceil(remainingUsers.length / itemsPerPage);
            setTotalPages(newTotalPages);
            if (page > newTotalPages && newTotalPages > 0) {
                setPage(newTotalPages);
            }

            return true;
        } catch (error) {
            console.error('Error:', error.message);
            return false;
        }
    }
};




