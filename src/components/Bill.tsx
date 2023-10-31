import { useQuery } from "react-query";
import { QueryService } from "../services/QueryService";
import { useParams } from "react-router-dom";
import { useState } from "react";
import '../css/Bill.css';
import { useMutation } from 'react-query';

function Bill() {
    const { id } = useParams();
    const [bill, setBill] = useState<any>({});
    const [text, setText] = useState<string>("");

    const calculateQuery = useQuery('Calculate', () => QueryService.calculate(id as string), {
        onSuccess(response) {
            setBill(response.data);
            setText(response.data);
        }
    });

    const sendMessage = useMutation(async () => {
        await QueryService.sendToTelegram(text);
    });

    if (calculateQuery.isLoading) {
        return <div className='container'><div className='loading'></div></div>
    }

    return (<div className="bill">
        <label>Чек:</label>
        <textarea id="story" name="story" rows={30} cols={100} defaultValue={bill} onChange={function (evt: any) {
            var value = evt.target.value;
            setText(value);
         } }>
        </textarea>
        {/* <button onClick={() => { navigator.clipboard.writeText(bill) }}>Скопировать</button> */}
        
        <button className="telegramBtn" onClick={function () {
            sendMessage.mutate();
         }}>Отправить в чат "Нисы"</button>
    </div>);
}

export default Bill;