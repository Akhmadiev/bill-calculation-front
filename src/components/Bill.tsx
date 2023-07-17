import { useQuery } from "react-query";
import { QueryService } from "../services/QueryService";
import { useParams } from "react-router-dom";
import { useState } from "react";
import '../css/Bill.css';

function Bill() {
    const { id } = useParams();
    const [bill, setBill] = useState<any>({});

    const calculateQuery = useQuery('Calculate', () => QueryService.calculate(id as string), {
        onSuccess(response) {
            setBill(response.data);
        }
    });

    if (calculateQuery.isLoading) {
        return <div className='container'><div className='loading'></div></div>
    }
    return (<div className="bill">
        <label>Чек:</label>
        <textarea id="story" name="story" rows={30} cols={100} defaultValue={bill}>
        </textarea>
        <button onClick={() => { navigator.clipboard.writeText(bill) }}>Скопировать</button>
        
        {/* <button className="telegramBtn" onClick={() => {navigator.clipboard.writeText(bill)}}>Отправить в телегу</button> */}
    </div>);
}

export default Bill;