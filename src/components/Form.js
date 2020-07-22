import React, { useState } from 'react';
import DatePicker from "react-datepicker";

import { connect } from 'react-redux';
import {
    addWorkerAction,
    removeWorkerAction,
    toggleActiveWorker,
    changeNameAction,
    changePostAction,
    changeBirthdayAction,
    changeSexAction,
    changeFiresAction,
    changeAlertAction
} from '../redux';

import Alert from "./Alert";

const Form = (props) => {
    const [name, setName] = useState("");
    const [post, setPost] = useState("none");
    const [birthday, setBirthday] = useState(new Date());
    const [sex, setSex] = useState({value: "male"});
    const [fired, setFired] = useState({checked: false});

    const {workers} = props;
    const {activeWorkerId} = props;
    const {postNames} = props;
    const {message} = props;

    const valueNameWorker = (workerId) => {
        let nameWorker = ''
        workers.map((worker) => {
            if (worker.id === workerId) {
                nameWorker = worker.name
            }
        })
        return nameWorker
    }

    const valuePostWorker = (workerId) => {
        let postWorker = ''
        workers.map((worker) => {
            if (worker.id === workerId) {
                postWorker = worker.post
            }
        })
        return postWorker.value
    }

    const valueBirthdayWorker = (workerId) => {
        let dayWorker = ''
        workers.map((worker) => {
            if (worker.id === workerId) {
                dayWorker = worker.day
            }
        })
        return dayWorker
    }

    const valueSexWorker = (workerId) => {
        let sex = ''
        workers.map((worker) => {
            if (worker.id === workerId) {
                sex = worker.sex
            }
        })
        return sex
    }

    const valueFiredWorker = (workerId) => {
        let fired = ''
        workers.map((worker) => {
            if (worker.id === workerId) {
                fired = worker.fired
            }
        })
        return fired
    }

    const defaultFrom = () => {
        setName("");
        setPost("none");
        setBirthday(new Date());
        setSex({value: "male"});
        setFired({checked: false});
    }

    const removeWorker = (workerId) => {
        props.removeWorkerAction(workerId)
        defaultFrom()
    }

    const submitHandler = e => {
        e.preventDefault();
        if (name.trim() && post !== "none") {
            const id = new Date()
            let job = postNames[0];
            postNames.map(postName => {
                if (postName.value === post) {
                    job = postName
                }
            });

            let mounth = birthday.getMonth();
            mounth < 9
                ? mounth = '0' + (mounth + 1)
                : mounth = mounth + 1
            let day = birthday.getDate() + '.' + mounth + '.' + birthday.getFullYear();

            props.addWorkerAction({
                id: id,
                name: name,
                post: job,
                birthday: day,
                sex: sex.value,
                fired: fired.checked,
                active: false,
                day: birthday
            })
            defaultFrom()
            props.toggleActiveWorker(id, id)
            props.changeAlertAction(false)
        } else {
            console.log("Введите имя и выберите должность")
            props.changeAlertAction(true)
        }
    };

    const handleChangeName = e => {
        setName(e.target.value)
        if(activeWorkerId) {
            let position = workers.map(
                function(worker) {
                    return worker.id;
                }).indexOf(activeWorkerId);
            props.changeNameAction(workers[position].id, e.target.value)
        }
    }

    const handleChangePost = e => {
        setPost(e.target.value)
        if(activeWorkerId) {
            let position = workers.map(
                function(worker) {
                    return worker.id;
                }).indexOf(activeWorkerId);
            let positionPost = postNames.map(
                function(post) {
                    return post.value;
                }).indexOf(e.target.value);
            props.changePostAction(workers[position].id, postNames[positionPost])
        }
    }

    const handleChangeBirthday = e => {
        let day = e;
        setBirthday(day)
        if(activeWorkerId) {
            let position = workers.map(
                function(worker) {
                    return worker.id;
                }).indexOf(activeWorkerId);

            let mounth = day.getMonth();
            mounth < 9
                ? mounth = '0' + (mounth + 1)
                : mounth = mounth + 1
            let birthday = day.getDate() + '.' + mounth + '.' + day.getFullYear();
            props.changeBirthdayAction(workers[position].id, birthday, day)
        }
    }

    const handleChangeSex = e => {
        setSex({value: e.target.value})
        if(activeWorkerId) {
            let position = workers.map(
                function(worker) {
                    return worker.id;
                }).indexOf(activeWorkerId);
            props.changeSexAction(workers[position].id, e.target.value)
        }
    }

    const handleChangeFired = e => {
        setFired({checked: !fired.checked})
        if(activeWorkerId) {
            let position = workers.map(
                function(worker) {
                    return worker.id;
                }).indexOf(activeWorkerId);
            props.changeFiresAction(workers[position].id, !fired.checked)
        }
    }

    return (
        <div className="col-5">
            <div className="row border border-secondary">
                <div className="col-12 text-right bg-light p-3">
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={removeWorker.bind(null, activeWorkerId)}
                        disabled={!activeWorkerId}
                    >
                        Удалить
                    </button>
                    <button
                        type="submit"
                        className="btn btn-success"
                        form="addWorker"
                        disabled={activeWorkerId}
                    >
                        Добавить
                    </button>
                </div>

                {message ? (
                    <Alert />
                ) : (
                    <div></div>
                )}

                <div className="col-12 p-3">
                    <form onSubmit={submitHandler} id="addWorker">
                        <div className="form-group">
                            <label>ФИО</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="ФИО"
                                value={activeWorkerId ? valueNameWorker(activeWorkerId) : name}
                                onChange={handleChangeName}
                            />
                        </div>

                        <div className="form-group">
                            <label>Должность</label>
                            <select
                                className="form-control"
                                value={activeWorkerId ? valuePostWorker(activeWorkerId) : post}
                                onChange={handleChangePost}
                            >
                                {postNames.map(postName => (
                                    <option value={postName.value} key={postName.value}>{postName.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Дата рождения</label>
                            <br/>
                            <DatePicker
                                dateFormat="dd.MM.yyyy"
                                selected={activeWorkerId ? valueBirthdayWorker(activeWorkerId) : birthday}
                                maxDate={new Date()}
                                onChange={handleChangeBirthday}
                            />
                        </div>

                        <div className="form-group">
                            <label>Пол</label>
                            <div className="form-check">
                                <input
                                    id="male"
                                    className="form-check-input"
                                    name="sex"
                                    type="radio"
                                    value="male"
                                    checked={"male" === (activeWorkerId ? valueSexWorker(activeWorkerId) : sex.value)}
                                    onChange={handleChangeSex}
                                />
                                <label className="form-check-label" htmlFor="male">
                                    Мужской
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    id="female"
                                    className="form-check-input"
                                    name="sex"
                                    type="radio"
                                    value="female"
                                    checked={"female" === (activeWorkerId ? valueSexWorker(activeWorkerId) : sex.value)}
                                    onChange={handleChangeSex}
                                />
                                <label className="form-check-label" htmlFor="female">
                                    Женский
                                </label>
                            </div>
                        </div>

                        <div className="form-check">
                            <input
                                id="fired"
                                className="form-check-input"
                                type="checkbox"
                                checked={activeWorkerId ? valueFiredWorker(activeWorkerId) : fired.checked}
                                onChange={handleChangeFired}
                            />
                            <label className="form-check-label" htmlFor="fired">Уволен</label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    workers: state.workers,
    activeWorkerId: state.activeWorkerId,
    postNames: state.postNames,
    message: state.message
});

export default connect(
    mapStateToProps,
    {
        addWorkerAction,
        removeWorkerAction,
        toggleActiveWorker,
        changeNameAction,
        changePostAction,
        changeBirthdayAction,
        changeSexAction,
        changeFiresAction,
        changeAlertAction
    }
)(Form);
