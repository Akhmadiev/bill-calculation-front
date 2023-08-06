import React from 'react';
import { useQuery } from 'react-query';
import { QueryService } from "../services/QueryService";
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Rooms.css'
import { Room } from '../models/Entities';
import NewRoom from './NewRoom';
import { Link } from 'react-router-dom';

function Rooms() {
    const roomQuery = useQuery('rooms', () => QueryService.getRooms());
    if (roomQuery.isLoading) {
        return <div className='container'><div className='loading'></div></div>
    }
    var roomQueryData = roomQuery.data as any;
    const roomData = roomQueryData.data as Room[];

    return (
        <React.StrictMode>
            <NewRoom/>
            <div className='rooms'>
                {roomData.map(room => <div className='rooms-el' key={room.id}><Link to={`/${room.id}`}>{room.name}</Link><br/></div>)}
            </div>
        </React.StrictMode>);
}

export default Rooms;