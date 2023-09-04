import axios from "axios";
const serverUrl = process.env.REACT_APP_JSON_SERVER_URL;

// Function to get the total number of posts
export const getNumberOfPosts = async () => {
    const url = `${serverUrl}/posts`
    const res = await axios.get(url, {
        'headers': {
            'Content-Type': 'application/json'
        },
    })

    return res.data.length;
}

// Function to get the number of posts of an specific author
export const getNumberOfPostsById = async (id) => {
    const url = `${serverUrl}/posts?author_id=${id}`
    const res = await axios.get(url, {
        'headers': {
            'Content-Type': 'application/json'
        },
    })

    return res.data.length;
}

// Function to get a paginated list of posts
export const getPosts = async page => {
    const url = `${serverUrl}/posts?_page=${page}&_limit=10&_sort=created_at&_order=desc`;
    const res = await axios.get(url, {
        'headers': {
            'Content-Type': 'application/json'
        },
    })

    return res;
}

// Function to get a paginated list of posts of an specific author
export const getPostsById = async ({ page, id }) => {
    const url = `${serverUrl}/posts?_page=${page}&limit=10&author_id=${id}&_sort=created_at&_order=desc`;
    const res = await axios.get(url, {
        'headers': {
            'Content-Type': 'application/json'
        },
    })

    return res;
}

// Function to get a specific post by id
export const getPost = async id => {
    const url = `${serverUrl}/posts/${id}`
    const res = await axios.get(url, {
        'headers': {
            'Content-Type': 'application/json'
        },
    })

    return res;
}

// Function to get the comments of a post
export const getCommentsById = id => {
    const url = `${serverUrl}/comments?post_id=${id}`
    return axios.get(url, {
        'headers': {
            'Content-Type': 'application/json'
        },
    })
}

// Function to get the likes of a post
export const getLikesById = id => {
    const url = `${serverUrl}/post_likes?post_id=${id}`
    return axios.get(url, {
        'headers': {
            'Content-Type': 'application/json'
        },
    })
}

// Function to get user details by id
export const getUser = id => {
    const url = `${serverUrl}/users/${id}`
    return axios.get(url, {
        'headers': {
            'Content-Type': 'application/json'
        },
    })
}

// Function to post a new like for a post
export const postPostLike = async data => {
    const url = `${serverUrl}/post_likes`
    const res = await axios.post(url, data, {
        'headers': {
            'Content-Type': 'application/json'
        },
    })

    return res

}

// Function to delete a like by id
export const deletePostLike = id => {
    const url = `${serverUrl}/post_likes/${id}`
    return axios.delete(url, {
        'headers': {
            'Content-Type': 'application/json'
        },
    })
}

// Function to verify if an email is allready registreted
const verifyEmail = async email => {
    const url = `${serverUrl}/users?email=${email}`
    const res = await axios.get(url, {
        'headers': {
            'Content-Type': 'application/json'
        },
    })

    return res.data.length > 0
}

// Function to register a new user
export const postRegister = async data => {
    const existentMail = await verifyEmail(data.email)
    if (existentMail) {
        throw new Error('El correo electrónico ya está registrado.');
    }
    const url = `${serverUrl}/users`
    const res = await axios.post(url, data, {
        'headers': {
            'Content-Type': 'application/json'
        },
    })
    return res
}

// Function to login a user
export const loginUser = async ({ email, password }) => {
    try {
        const url = `${serverUrl}/users?email=${email}`
        const res = await axios.get(url, {
            'headers': {
                'Content-Type': 'application/json'
            },
        });
        const user = res.data[0];
        if (!user) {
            throw new Error('El correo electrónico no está registrado');
        }

        if (user.password === password) {
            return res
        } else {
            throw new Error('Contraseña incorrecta');
        }

    } catch (error) {
        throw error
    }
};

// Function to create a new post
export const postNewPost = data => {
    const url = `${serverUrl}/posts`
    return axios.post(url, data, {
        'headers': {
            'Content-Type': 'application/json'
        },
    })
}

// Function to edit a post by id
export const putPost = ({ id, title, body, resume }) => {
    const newData = { title, body, resume }
    const url = `${serverUrl}/posts/${id}`
    return axios.patch(url, newData, {
        'headers': {
            'Content-Type': 'application/json'
        },
    })
}

// Function to delet a post by id
export const deletePost = id => {
    const url = `${serverUrl}/posts/${id}`
    return axios.delete(url, {
        'headers': {
            'Content-Type': 'application/json'
        },
    })
}