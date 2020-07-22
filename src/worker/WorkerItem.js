import React from "react";

export default function WorkerItem({worker, index, onActive}) {
    const classes = []

    if (worker.active) {
        classes.push('active')
    }

    return (
        <tr
            onClick={() => onActive(worker.id)}
            className={classes.join(' ')}
        >
            <th scope="row">{index + 1}</th>

            <th>{worker.name}</th>

            <td>{worker.post.name}</td>

            {worker.sex === "male" ? (
                <td>Мужской</td>
            ) : (
                <td>Женский</td>
            )}

            <td>{worker.birthday}</td>

            {worker.fired ? (
                <td>Уволен</td>
            ) : (
                <td>Не уволен</td>
            )}
        </tr>
    )
}