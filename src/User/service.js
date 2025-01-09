export class Service {

    addUserDetails = async (user, url) => {
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
                    chemistry: parseFloat(user.chemistry)
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit form data');
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };


    fetchUserDetails = async (url, id = 0) => {
        try {
            let response;
            if (id == 0) {
                response = await fetch(url);
            } else {
                response = await fetch(`${url}/${id}`)
            }
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    deleteData = async (url, id) => {
        const result = confirm("Want to delete?");
        if (result) {
            try {
                const response = await fetch(`${url}/${id}`, {
                    method: 'DELETE'
                })
                if (!response.ok) {
                    throw new Error("Failed to post data");
                }
                return true
            } catch (error) {
                console.error("Error: ", error.message);
                return false;
            }
        }
    }

}
const service = new Service();
export default service;