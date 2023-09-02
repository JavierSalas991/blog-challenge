import axios from "axios";
const serverUrl = process.env.REACT_APP_JSON_SERVER_URL;

export const getNumberOfPosts = async () => {
    const url = `${serverUrl}/posts`
    const res = await axios.get(url, {
        'headers': {
            'Content-Type': 'application/json'
        },
    })

    return res.data.length;
}
export const getNumberOfPostsById = async (id) => {
    const url = `${serverUrl}/posts?author_id=${id}`
    const res = await axios.get(url, {
        'headers': {
            'Content-Type': 'application/json'
        },
    })

    console.log(res.data.length);

    return res.data.length;
}

export const getPosts = async page => {
    const url = `${serverUrl}/posts?_page=${page}&_limit=10&_sort=created_at&_order=desc`;
    const res = await axios.get(url, {
        'headers': {
            'Content-Type': 'application/json'
        },
    })

    return res;
}
export const getPostsById = async ({ page, id }) => {
    const url = `${serverUrl}/posts?_page=${page}&limit=10&author_id=${id}&_sort=created_at&_order=desc`;
    const res = await axios.get(url, {
        'headers': {
            'Content-Type': 'application/json'
        },
    })

    return res;
}

export const getPost = async id => {
    const url = `${serverUrl}/posts/${id}`
    const res = await axios.get(url, {
        'headers': {
            'Content-Type': 'application/json'
        },
    })

    return res;
}

export const getCommentsById = id => {
    const url = `${serverUrl}/comments?post_id=${id}`
    return axios.get(url, {
        'headers': {
            'Content-Type': 'application/json'
        },
    })
}

export const getLikesById = id => {
    const url = `${serverUrl}/post_likes?post_id=${id}`
    return axios.get(url, {
        'headers': {
            'Content-Type': 'application/json'
        },
    })
}

export const getUser = id => {
    const url = `${serverUrl}/users/${id}`
    return axios.get(url, {
        'headers': {
            'Content-Type': 'application/json'
        },
    })
}

export const postPostLike = async data => {
    const url = `${serverUrl}/post_likes`
    const res = await axios.post(url, data, {
        'headers': {
            'Content-Type': 'application/json'
        },
    })

    return res

}

export const deletePostLike = id => {
    const url = `${serverUrl}/post_likes/${id}`
    return axios.delete(url, {
        'headers': {
            'Content-Type': 'application/json'
        },
    })
}

const verifyEmail = async email => {
    const url = `${serverUrl}/users?email=${email}`
    const res = await axios.get(url, {
        'headers': {
            'Content-Type': 'application/json'
        },
    })

    return res.data.length > 0
}

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
            console.log(res);
            return res
        } else {
            throw new Error('Contraseña incorrecta');
        }

    } catch (error) {
        throw error
    }
};

export const postNewPost = data => {
    const url = `${serverUrl}/posts`
    return axios.post(url, data, {
        'headers': {
            'Content-Type': 'application/json'
        },
    })
}

export const putPost = ({ id, title, body, resume }) => {
    const newData = { title, body, resume }
    const url = `${serverUrl}/posts/${id}`
    return axios.patch(url, newData, {
        'headers': {
            'Content-Type': 'application/json'
        },
    })
}