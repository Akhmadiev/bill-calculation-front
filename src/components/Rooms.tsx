import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { QueryService } from "../services/QueryService";
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Rooms.css'
import { Room } from '../models/Entities';
import NewRoom from './NewRoom';
import { Link } from 'react-router-dom';

function Rooms() {
    const [data, setData] = useState({});
    const roomQuery = useQuery('rooms', () => QueryService.getRooms(), {
        onSuccess(response) {
            setData(response.data);
        }
    });
    if (roomQuery.isLoading) {
        return <div className='container'><div className='loading'></div></div>
    }

    const roomData = data as Room[];

    return (
        <React.StrictMode>
            <NewRoom/>
            <div className='rooms'>
                {roomData.map(room => <div className='rooms-el' key={room.id}><Link to={`/${room.id}`}>{room.name}</Link><br/></div>)}
            </div>
        </React.StrictMode>);
}

export default Rooms;