import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Rooms.css'
import Persons from './Persons';
import { DragDropContext } from 'react-beautiful-dnd';
import Groups from './Groups';
import { useQuery } from 'react-query';
import { QueryService } from "../services/QueryService";
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Group, Person } from '../models/Entities';
import NewPerson from './NewPerson';
import NewGroup from './NewGroup';
import { useMutation } from 'react-query';

function Roomq() {
    const { id } = useParams();
    const [persons, setPersons] = useState({});
    const [groups, setGroups] = useState({});
    const [selectedPersons, selectPerson] = useState({} as Person[]);

    const mutation = useMutation(async (data: [string, string[]]) => {
        await QueryService.addGroupPersons(data[0], data[1]);
    }, {
        onSuccess: function () {
            window.location.reload();
        }
    });

    const calculateMutation = useMutation(async () => {
        await QueryService.calculate(id as string);
    },{
        onSuccess: (response: any) => {
            window.open(`/${id}/bill`, '_blank');
        }
    })

    const personsQuery = useQuery('GetRoomPersons', () => QueryService.getRoomPersons(id as string), {
        onSuccess(response) {
            setPersons(response.data);
        }
    });

    const groupsQuery = useQuery('GetRoomGroups', () => QueryService.getRoomGroups(id as string), {
        onSuccess(response) {
            setGroups(response.data);
        }
    });

    if (personsQuery.isLoading || groupsQuery.isLoading) {
        return <div className='container'><div className='loading'></div></div>
    }

    return (
        <div>
            <div className='room-top'>
                <button type="button" className="btn btn-outline-info back" onClick={() => { window.open('/', '_self'); }}>Главная</button>
                <NewPerson />
                <NewGroup />
            <button className='btn btn-success calculate' onClick={() => calculateMutation.mutate()}>Рассчитать</button>
            </div>
            <DragDropContext onDragEnd={(result) => onDragEnd(result, selectedPersons, persons as Person[], groups as Group[], setGroups, mutation)}>
                <div className="block">
                    <div className="left_block">
                        <Persons persons={persons} selectedPersons={selectedPersons} selectPerson={selectPerson} />
                    </div>
                    <div className="right_block">
                        <Groups {...groups as Group[]} />
                    </div>
                </div>
            </DragDropContext>
        </div>
    );
}

async function onDragEnd(result: any, selectedPersons: Person[], persons: Person[], groups: Group[], setGroups: any, mutation: any) {
    const { source, destination, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) {
        return;
    }

    const group = groups.filter(x => x.id === destination.droppableId)[0];

    if (group.persons == null) {
        group.persons = [];
    }

    const groupPersons = group.persons.map(x => x.id);
    selectedPersons = selectedPersons.filter(x => !groupPersons.includes(x.id));
    var selectedPersonIds = selectedPersons.map(x => x.id);

    if (selectedPersonIds.length === 0 || group === null) {
        window.location.reload();
        return;
    }
    // group.persons.push(...selectedPersons);
    // setGroups(groups);

    await mutation.mutate([destination.droppableId, selectedPersonIds]);

    // const newPerson = persons.filter(x => x.id === draggableId)[0];

    // if (newPerson == null || group == null) {
    //     return;
    // }

    // if (group.persons == null) {
    //     group.persons = [];
    // }

    // if (group.persons.filter(x => x.id === draggableId).length > 0) {
    //     return;
    // }

    // group.persons.push(newPerson);
    // setGroups(groups);

    // await mutation.mutate([destination.droppableId, draggableId]);
}

export default Roomq;