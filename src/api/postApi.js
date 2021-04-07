import axiosClient from "./axiosClient";


const postApi = {
    getAll() {
        // const postList = await axiosClient.get('/posts');
        // console.log(postList);
        // return 

        const url = `/posts/`;
        return axiosClient.get(url);
    },

    get(id) {
        const url = `/posts/${id}`;
        return axiosClient.get(url);
    },

    add(data) {
        const url = '/posts';
        return axiosClient.post(url, data);
    },

    update(data) {
        const url = `/posts/${data.id}`;
        return axiosClient.patch(url, data);
    },

    remove(id) {
        const url = `/posts/${id}`;
        return axiosClient.delete(url);
    },
}

export default postApi;