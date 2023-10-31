import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Persons.css'
import { Person } from '../models/Entities';
import { Droppable, Draggable } from 'react-beautiful-dnd';

function Persons(props: any) {
    // persons: Person[], selectPerson: any
    const personData = Object.values(props.persons) as Person[];
    const selectedPersons =  Object.values(props.selectedPersons) as Person[];
    const selectPerson = props.selectPerson as any;
    const getItemStyle = (isDragging: boolean, isChecked: boolean, draggableStyle: any) => ({
        userSelect: 'none',
        background: isDragging ? 'rgb(0, 50, 73)' : isChecked ? 'rgb(0, 50, 73)' : 'rgb(87, 97, 119)',
        ...draggableStyle
    });

    const getListStyle = (isDraggingOver: boolean) => ({
        background: isDraggingOver ? 'rgb(87, 97, 119)' : 'rgb(87, 97, 119)',
    });

    const onChangeSelectPerson = function (person: Person) {
        person.isChecked = !person.isChecked;

        var newPersons = selectedPersons.filter(x => x.id != person.id);
        newPersons.push(person);

        selectPerson(newPersons);
    }

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
                                        onClick={function () { onChangeSelectPerson(item) }}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            item.isChecked,
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