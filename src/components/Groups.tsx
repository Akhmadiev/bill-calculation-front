import { QueryService } from "../services/QueryService";
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Groups.css';
import { Group } from '../models/Entities';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useMutation } from 'react-query';

function Groups(groups: Group[]) {
    const groupData = Object.values(groups);

    const deleteGroupPersonMutation = useMutation(async (data: [string, string]) => {
        await QueryService.deleteGroupPerson(data[0], data[1]);
        window.location.reload();
    });

    const deleteGroupMutation = useMutation(async (groupId: string) => {
        await QueryService.deleteGroup(groupId);
        window.location.reload();
    });

    const changeGroupCountMutation = useMutation(async (data: [string, number]) => {
        await QueryService.changeGroupCount(data[0], data[1]);
    });

    const changePriceCountMutation = useMutation(async (data: [string, number]) => {
        await QueryService.changeGroupPrice(data[0], data[1]);
    });

    const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
        userSelect: 'none',
        background: isDragging ? 'lightgreen' : 'rgb(119, 87, 117)',
        ...draggableStyle
    });

    const getListStyle = (isDraggingOver: boolean) => ({
        background: isDraggingOver ? 'rgb(119, 87, 117)' : 'rgb(119, 87, 117)',
        padding: '0.3vw',
        borderRadius: '5px',
        border: '1px solid #ccc'
    });

    const onCountChange = function (evt: any, groupId: string) {
        var value = evt.target.value;
        changeGroupCountMutation.mutate([groupId, value]);
    }

    const onPriceChange = function (evt: any, groupId: string) {
        var value = evt.target.value;
        changePriceCountMutation.mutate([groupId, value]);
    }

    const onFocus = function (evt: any) {
        evt.target.select();
    }

    return (
        <div className='block'>
            {groupData.map((group) => <div className='group' key={group.id}>
                <div className="group-top">
                    <label className='top-label'>{group.name}
                    <button className='groups-del' onClick={function () { deleteGroupMutation.mutate(group.id) }}>Del</button>
                        
                    </label>
                    <div className="groups-price">
                        <input
                            onChange={(evt) => onPriceChange(evt, group.id)}
                            defaultValue={group.price}
                            onFocus={onFocus}
                            type='number'
                            placeholder='price'
                            className="form-control" />
                        <label>₽</label>
                    </div>
                    <div className="groups-count">
                        <input
                            onChange={(evt) => onCountChange(evt, group.id)}
                            defaultValue={group.count}
                            onFocus={onFocus}
                            type='number'
                            placeholder='count'
                            className="form-control" />
                        <label>шт.</label>
                    </div>
                </div>
                <Droppable droppableId={group.id}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}>
                            {Object.values(group.persons ?? []).map((item, index) => (
                                <Draggable
                                    isDragDisabled={true}
                                    key={item.id}
                                    draggableId={item.id + group.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            className='group-el'
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}>
                                            {item.name}
                                            <button className='groups-del' onClick={function () { deleteGroupPersonMutation.mutate([group.id, item.id]) }}>Del</button>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>)}
        </div>
    );
}

export default Groups;