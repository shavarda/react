import {createStore} from 'redux';

const initialState = {
    workers: [
        {id: 1, name: "Мария", post: {name: "Директор", value: "director"}, birthday: "20.02.97", sex: "female", fired: false, active: false, day: 0},
        {id: 2, name: "Сергей", post: {name: "Менеджер", value: "manager"}, birthday: "20.02.97", sex: "male", fired: false, active: false, day: 0},
        {id: 3, name: "Лариса", post: {name: "Продавец", value: "seller"}, birthday: "20.02.97", sex: "female", fired: true, active: false, day: 0}
    ],
    activeWorkerId: false,
    postNames: [
        {name: "Выбрать должность", value: "none"},
        {name: "Директор", value: "director"},
        {name: "Менеджер", value: "manager"},
        {name: "Продавец", value: "seller"},
        {name: "Уборщик", value: "cleaner"}
    ],
    message: false
}

export const store = createStore(
    reducer,
    initialState
);

function reducer(state, action) {
    switch (action.type) {
        case 'ADD_WORKER':
            return {
                ...state,
                workers: [...state.workers, action.payload]
            };
        case 'REMOVE_WORKER':
            return {
                ...state,
                workers: state.workers.filter((worker) => worker.id !== action.payload),
                activeWorkerId: false
            };
        case 'TOGGLE_WORKER':
            return {
                ...state,
                workers: state.workers.map((worker) =>
                    worker.id === action.payload.workerId
                        ? { ...worker, active: !worker.active }
                        : { ...worker, active: false }
                ),
                activeWorkerId: action.payload.activeWorkerId
            };
        case 'CHANGE_WORKER_NAME':
            return {
                ...state,
                workers: state.workers.map((worker) =>
                    worker.id === action.payload.workerId
                        ? { ...worker, name: action.payload.name}
                        : { ...worker }
                ),
            };
        case 'CHANGE_WORKER_POST':
            return {
                ...state,
                workers: state.workers.map((worker) =>
                    worker.id === action.payload.workerId
                        ? { ...worker, post: action.payload.post}
                        : { ...worker }
                ),
            };
        case 'CHANGE_WORKER_BIRTHDAY':
            return {
                ...state,
                workers: state.workers.map((worker) =>
                    worker.id === action.payload.workerId
                        ? { ...worker, birthday: action.payload.birthday, day: action.payload.day}
                        : { ...worker }
                ),
            };
        case 'CHANGE_WORKER_SEX':
            return {
                ...state,
                workers: state.workers.map((worker) =>
                    worker.id === action.payload.workerId
                        ? { ...worker, sex: action.payload.sex}
                        : { ...worker }
                ),
            };
        case 'CHANGE_WORKER_FIRED':
            return {
                ...state,
                workers: state.workers.map((worker) =>
                    worker.id === action.payload.workerId
                        ? { ...worker, fired: action.payload.fired}
                        : { ...worker }
                ),
            };
        case 'CHANGE_ALERT':
            return {
                ...state,
                message: action.payload,
            };
        default:
            return state;
    }
}

// Actions
export const addWorkerAction = (worker) => ({
    type: 'ADD_WORKER',
    payload: worker
});

export const removeWorkerAction = (workerId) => ({
    type: 'REMOVE_WORKER',
    payload: workerId
});

export const toggleActiveWorker = (workerId, activeWorkerId) => ({
    type: 'TOGGLE_WORKER',
    payload: {
        workerId,
        activeWorkerId
    }
});

export const changeNameAction = (workerId, name) => ({
    type: 'CHANGE_WORKER_NAME',
    payload: {
        workerId,
        name
    }
});

export const changePostAction = (workerId, post) => ({
    type: 'CHANGE_WORKER_POST',
    payload: {
        workerId,
        post
    }
});

export const changeBirthdayAction = (workerId, birthday, day) => ({
    type: 'CHANGE_WORKER_BIRTHDAY',
    payload: {
        workerId,
        birthday,
        day
    }
});

export const changeSexAction = (workerId, sex) => ({
    type: 'CHANGE_WORKER_SEX',
    payload: {
        workerId,
        sex
    }
});

export const changeFiresAction = (workerId, fired) => ({
    type: 'CHANGE_WORKER_FIRED',
    payload: {
        workerId,
        fired
    }
});

export const changeAlertAction = (value) => ({
    type: 'CHANGE_ALERT',
    payload: value
});
