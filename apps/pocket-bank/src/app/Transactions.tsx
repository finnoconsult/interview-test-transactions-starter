import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { fetchHitelesitessel, logout } from "./AuthService";

function generateId(data: Array<any>) {
    const dataWithIds: Array<any> = data.map((item: Array<any>, index: number) => {
        const id = uuidv4().substring(0, 4); // Use only the first 4 characters
        return {
            id: id,
            ...item
        };
    })
    return dataWithIds
}

function groupItemsByYear(items: Array<any>) {
    const groups: {[key: string]: Array<any>} = {};
  
    items.map((item) => {
      const key = moment(item.date).year();
      if(!key){
        return;
      }
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
    });
    return groups;
}

function groupItemsByPeriod(items: Array<any>, groupType: string="weekly") {
    const groups: {[key: string]: Array<any>} = {};
  
    items.map((item) => {
      const key = groupType === 'weekly' ? moment(item.date).week() : moment(item.date).month();
      
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
    });
    
    return groups;
}

export function Transactions(){
    const [isPending, setIsPending] = useState(false);
    const [period, setPeriod] = useState("weekly");
    const [transactions, setTransactions] = useState<Array<any>>([]);
    const navigate = useNavigate();

    useEffect(() => {
        setIsPending(true);
        fetchHitelesitessel
            .get("http://localhost:3333/api/banking/transactions")
            .then((res) => {
                const sortedData = res.data
                    .filter((obj: any) => { //If the date was not right
                        const date = new Date(obj.date);
                        return !isNaN(date.getTime());
                    })
                    .sort((a: any, b: any) => {
                        return new Date(b.date).getTime() - new Date(a.date).getTime();
                    });             
                setTransactions(sortedData)
                setIsPending(false)              
            })
            .catch((err) => {
                setIsPending(false)
                alert(err)
            })
    }, [])

    if (isPending || !transactions.length) {
        return (<div className="spinner-border text-danger"></div>);
    }

    //set up the data structure
    const transactionsByYear = groupItemsByYear(generateId(transactions));
    const transactionsByPeriod:{[key: string]: any}={};
    Object.entries(transactionsByYear).map(([year, transactionsOfTheYear]) => {
        transactionsByPeriod[`${year}`] = groupItemsByPeriod(transactionsOfTheYear, period)
    })

    

    return (
        <div className="h-100 w-100 p-5">
            <div className="card h-100">
                <div className="card-header d-flex flex-column text-center">
                    <div className="w-100 d-flex align-items-center justify-content-between mb-3">
                        <h5 className="m-0">Transactions</h5>
                        <button className="btn btn-primary" onClick={() => {
                            navigate("/");
                            logout();
                            } }>Logout</button>
                    </div>
                    <select className="form-select" defaultValue={period === "weekly" ? "weekly" : "monthly"} onChange={(event) => setPeriod(event.target.value)}>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </div>
                <div className="card-body" style={{overflowY: "auto"}}>
                    <div className="d-felx flex-cloumn">
                        {Object.entries(transactionsByPeriod).reverse().map(([year, transactionsOfTheYear]) => {
                            return (
                                <div key={year} className="mb-5">
                                    <div className="w-100 d-flex justify-content-center"><span className="text-muted">{year}</span></div>
                                    {Object.entries(transactionsOfTheYear).reverse().map(([periodGroup, transactionsArray]) => {
                                        let periodText = "";
                                        if(period==="weekly"){
                                            const periodAsMoment = moment().week(parseInt(periodGroup));
                                            const startOfPeriod = periodAsMoment.startOf('week').format('DD');
                                            const endOfPeriod = periodAsMoment.endOf('week').format('DD. MMMM');
                                            periodText = `${startOfPeriod}-${endOfPeriod} (${parseInt(periodGroup)}. week)`;
                                        }else{
                                            const periodAsMoment = moment().month(parseInt(periodGroup));
                                            periodText = periodAsMoment.format('MMMM');
                                        }
                                        return (
                                            <div key={periodGroup}>
                                                <div className="w-100 d-flex justify-content-center"><small className="text-muted mt-3">{periodText}</small></div>
                                                {Array.isArray(transactionsArray) && transactionsArray.map((transaction) => {
                                                    return (
                                                        <div key={transaction.id} className={`w-100 d-flex pt-2 pb-2 justify-content-end ${transaction.amount<0 ? '' : 'flex-row-reverse'}`}>
                                                            <span>{transaction.title}</span>&nbsp;<span className={`fw-bold ${transaction.amount<0 ? 'text-danger' : 'text-success'}`}>{transaction.amount}</span>
                                                        </div>
                                                    );                           
                                                })}
                                            </div>
                                        ); 
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}