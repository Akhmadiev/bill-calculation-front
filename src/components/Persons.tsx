import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Persons.css'
import { Person } from '../models/Entities';
import { Droppable, Draggable } from 'react-beautiful-dnd';

function Persons(persons: Person[]) {
    const personData = Object.values(persons);

    const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
        userSelect: 'none',
        background: isDragging ? 'lightgreen' : 'rgb(87, 97, 119)',
        ...draggableStyle
    });

    const getListStyle = (isDraggingOver: boolean) => ({
        background: isDraggingOver ? 'rgb(87, 97, 119)' : 'rgb(87, 97, 119)',
    });

    return (
        <Droppable droppableId="droppable2">
            {(provided, snapshot) => (
                    <div
                        className='persons'
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}>
                        {(personData as Person[]).map((item, index) => (
                            <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}>
                                {(provided, snapshot) => (
                                    <div className='person-el'
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}>
                                        {item.name}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
        </Droppable>
    );
}

export default Persons;