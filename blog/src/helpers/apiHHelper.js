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

export const getPosts = async page => {
    const url = `${serverUrl}/posts?_page=${page}&limit=15`
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
    const { user_id, post_id } = data
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