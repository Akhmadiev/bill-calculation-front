import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { QueryService } from '../services/QueryService';
import '../css/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/NewRoom.css';

function NewGroup() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [roomData, setRoomData] = useState('');
    const { mutate } = useMutation(async () => {
        await QueryService.addGroup(id as string, roomData);
        window.location.reload();
    }, {
        onSuccess: (response: any) => {
            navigate(`/${response.data.id}`);
        }
    });

    const onChange = (evt: any) => {
        var value = evt.target.value;
        setRoomData(value);
    }

    return (
        <div>
            <div className="input-group mb-3 new-room">
                <input
                    onChange={(evt) => onChange(evt)}
                    type="text"
                    className="form-control"
                    placeholder="Название группы"
                    aria-label="Название группы"
                    aria-describedby="basic-addon2" />
                <div className="input-group-append">
                    <button
                        onClick={() => mutate()}
                        className="btn btn-outline-secondary"
                        type="button"
                        style={{ backgroundColor: "#90EE90" }}>
                        Добавить
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NewGroup;