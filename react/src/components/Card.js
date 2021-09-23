import { useState, useEffect } from "react";

function Card(props) {
    const [ currency, setCurrency ] = useState('Ether');
    const [OriginalBalance, setOriginalBalance] = useState(props.wallet.balance);
    const [showBalance, setShowBalance] = useState(props.wallet.balance);

    
    useEffect(()=>{
        formatCurrency(currency);

    }, [])

    const formatCurrency = (key) =>{
        switch (key) {
            case 'Ether':
                formatToEther();
                break;
            case 'USD':
                formatToUsd();
                break;
            case 'Euro':
                formatToEuro();
                break;
        }
    }
    
    const formatToEther = () =>{
        let balanceArray = OriginalBalance.split('');
        let last18 = balanceArray.splice(balanceArray.length - 18, 18);
        if (balanceArray.length === 0) {
            setShowBalance([0, last18.join('')])
        }else if(balanceArray.length >= 4){
            balanceArray.splice(balanceArray.length - 3 ,0 ,',')
            setShowBalance(balanceArray.join('') +'.'+ last18.join(''))
        }
    }

    const formatToEuro = async ()=> {
        const ethUsdFee = props.ethPrice;
        let euroFee = props.euroFee;
        let balanceArray = OriginalBalance.split('');
        balanceArray.splice(balanceArray.length - 18, 0, '.');
        let formatBalance = balanceArray.join('');
        let result = parseFloat(formatBalance) * parseFloat(euroFee);
        result = props.convertTo(result, 'EUR');
        setShowBalance(result);
    }

    const formatToUsd = async ()=> {
        const ethUsdFee = props.ethPrice;
        let balanceArray = OriginalBalance.split('');
        balanceArray.splice(balanceArray.length - 18, 0, '.');
        let formatBalance = balanceArray.join('');
        let result = parseFloat(formatBalance) * parseFloat(ethUsdFee);
        result = props.convertTo(result, 'USD');
        console.log(parseFloat(formatBalance), parseFloat(ethUsdFee));
        setShowBalance(result);
    }

    const changeFee = () => {
        const re = /^[0-9\b]+$/;
    }

    const newCurrency = (c) => {
        setCurrency(c)
        formatCurrency(c)
    }

        return (
            <div className="col-md-12 mb-4">
                <div className={"card border-left-primary shadow h-100 py-2"}>
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-s font-weight-bold text-primary text-uppercase mb-1">Contract: {props.wallet.address} </div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">Balance: {showBalance + ' ' + currency}</div>
                            </div>
                            <div className="col-auto">
                                {props.wallet.old ?<div><span className="badge badge-warning">OLD</span></div> : '' }
                                
                                <i className="fas fa-wallet fa-2x text-gray-300"></i>
                            </div>
                        </div>
                         <div className="row no-gutters align-items-center justify-content-between">
                             <div className="col-md-3">
                                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                    <label className={currency === 'Ether' ? 'btn btn-secondary active' : 'btn btn-secondary' }>
                                        <input onClick={()=>newCurrency('Ether')} type="radio" name="options" id="option1" autoComplete="off"/> Ether
                                    </label>
                                    <label className={currency === 'USD' ? 'btn btn-secondary active' : 'btn btn-secondary' }>
                                        <input onClick={()=>newCurrency('USD')} type="radio" name="options" id="option2" autoComplete="off"/> USD
                                    </label>
                                    <label className={currency === 'Euro' ? 'btn btn-secondary active' : 'btn btn-secondary' }>
                                        <input onClick={()=>newCurrency('Euro')} type="radio" name="options" id="option3" autoComplete="off"/> Euro
                                    </label>
                                </div>
                            </div>
                             <div className="col-md-2">
                                <div className="btn-group btn-group-toggle text-center" data-toggle="buttons">

                                       <input  type="text" pattern="[0-9]*" className="form-control text-center" id="inputPassword2"  defaultValue={props.ethPrice} onChange={()=> changeFee()}/>

                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
    
        );
    }



export default Card;