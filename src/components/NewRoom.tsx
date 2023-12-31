import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { QueryService } from '../services/QueryService';
import '../css/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/NewRoom.css';

function NewRoom() {
    const navigate = useNavigate();
    const [roomData, setRoomData] = useState('');
    const { mutate } = useMutation(async () => {
        await QueryService.createRoom(roomData);
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
                    placeholder="Room name"
                    aria-label="Room name"
                    aria-describedby="basic-addon2" />
                <div className="input-group-append">
                    <button
                        onClick={() => mutate()}
                        className="btn btn-outline-secondary"
                        type="button"
                        style={{ backgroundColor: "#90EE90" }}>
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NewRoom;