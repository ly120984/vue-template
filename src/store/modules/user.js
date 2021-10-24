export default {
    namespaced: true, // namespaced must be true in module app.
    state: {
        name: "张三",
        sex: "男",
        age: 15,
    },
    mutations: {
        changeLogin(state, data) {

        }
    },
    actions: {
        getSex(state, data) {
            return 'actions1'
        },
    },
};