import React from "react";
import WorkerItem from "./WorkerItem";

export default function WorkerList({workers, onActive}) {
    return (
        <table className="table table-hover">
            <thead className="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">ФИО</th>
                <th scope="col">Должность</th>
                <th scope="col">Пол</th>
                <th scope="col">Дата рождения</th>
                <th scope="col">Уволен</th>
            </tr>
            </thead>
            <tbody>
                {workers.map((worker, index) => {
                    return <WorkerItem
                        worker={worker}
                        key={worker.id}
                        index={index}
                        onActive={onActive}
                    />
                })}
            </tbody>
        </table>
    )
}