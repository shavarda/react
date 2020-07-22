import React from 'react';

import {connect} from 'react-redux';
import { toggleActiveWorker } from '../redux';

import WorkerList from "../worker/WorkerList";

const Worker = (props) => {
    const {workers} = props;
    const {activeWorkerId} = props;

    function activeWorker(workerId) {
        if (activeWorkerId !== workerId) {
            props.toggleActiveWorker(workerId, workerId)
        } else {
            props.toggleActiveWorker(workerId, false)
        }
    }

    return (
        <div className="col-7">
            {workers.length ? (
                <WorkerList workers={workers} onActive={activeWorker} />
            ) : (
                <div>Записей нет</div>
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({
    workers: state.workers,
    activeWorkerId: state.activeWorkerId
});

export default connect(
    mapStateToProps,
    { toggleActiveWorker }
)(Worker);
