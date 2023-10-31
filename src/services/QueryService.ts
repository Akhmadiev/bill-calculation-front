import axios from "axios";
import { Room, Group } from "../models/Entities";

const API_URL = process.env.BACK_URL || 'http://37.46.130.135:5000/';
const Controller = "Bill"

axios.defaults.baseURL = API_URL;


export const QueryService = {
    async createRoom(name: string) {
        const room = await axios.post<Room>(`/${Controller}/CreateRoom?name=${name}`);
        return room.data.id;
    },
    async addGroup(roomId: string, name: string) {
        await axios.post<Group>(`/${Controller}/AddGroup?roomId=${roomId}&name=${name}`);
    },
    async addRoomPerson(roomId: string, name: string) {
        await axios.post<Group>(`/${Controller}/addRoomPerson?roomId=${roomId}&name=${name}`);
    },
    async addGroupPerson(groupId: string, personId: string) {
        await axios.post(`/${Controller}/addGroupPerson?groupId=${groupId}&personId=${personId}`);
    },
    async addGroupPersons(groupId: string, personIds: string[]) {
        await axios.post(`/${Controller}/addGroupPersons?groupId=${groupId}`, personIds, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
    },
    async deleteGroupPerson(groupId: string, personId: string) {
        await axios.post(`/${Controller}/deleteGroupPerson?groupId=${groupId}&personId=${personId}`);
    },
    async deleteGroup(groupId: string) {
        await axios.post(`/${Controller}/deleteGroup?groupId=${groupId}`);
    },
    async copyGroup(groupId: string) {
        await axios.post(`/${Controller}/copyGroup?groupId=${groupId}`);
    },
    async changeGroupCount(groupId: string, count: number) {
        await axios.post(`/${Controller}/changeGroupCount?groupId=${groupId}&count=${count}`)
    },
    async changeGroupPrice(groupId: string, price: number) {
        await axios.post(`/${Controller}/changeGroupPrice?groupId=${groupId}&price=${price}`)
    },
    async changeGroupName(groupId: string, name: string) {
        await axios.post(`/${Controller}/changeGroupName?groupId=${groupId}&name=${name}`)
    },
    async getRooms() {
		return await axios.get<Room[]>(`/${Controller}/GetRooms`)
    },
    async getRoomGroups(roomId: string) {
        return await axios.get<Group[]>(`${Controller}/GetRoomGroups?roomId=${roomId}`)
    },
    async getRoomPersons(roomId: string) {
        return await axios.get<Group[]>(`${Controller}/GetRoomPersons?roomId=${roomId}`)
    },
    async getGroupPersons(groupId: string) {
        return await axios.get<Group[]>(`${Controller}/GetGroupPersons?groupId=${groupId}`)
    },
    async calculate(roomId: string) {
        return await axios.get<string>(`${Controller}/Calculate?roomId=${roomId}`)
    },
    async sendToTelegram(text: string) {
        await axios.post(`${Controller}/sendToTelegram`, text, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
}