import { useState, useEffect } from "react";

function Card(props) {
    const [currency, setCurrency] = useState('Ether');
    const [OriginalBalance] = useState(props.wallet.balance);
    const [showBalance, setShowBalance] = useState(props.wallet.balance);
    const [fee, setFee] = useState();
    const [originalFee, setOriginalFee] = useState();
    const [favorites, setFavorites] = useState();

    
    useEffect(()=>{
        formatCurrency(currency);
    }, [])

    const formatCurrency = (key, value) =>{
        switch (key) {
            case 'USD':
                formatToUsd(value);
                break;
            case 'Euro':
                formatToEuro(value);
                break;
            default:
                formatToEther();
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

    const formatToEuro = async (value)=> {
        let euroFee;
        if (value) {
            euroFee = value;
        }else{
            euroFee = parseFloat(props.euroFee).toFixed(2);
        }
        let balanceArray = OriginalBalance.split('');
        balanceArray.splice(balanceArray.length - 18, 0, '.');
        let formatBalance = balanceArray.join('');
        let result = parseFloat(formatBalance) * euroFee;
        result = props.convertTo(result, 'EUR');
        setFee(euroFee)
        setOriginalFee(parseFloat(props.euroFee).toFixed(2))
        setShowBalance(result);
    }

    const formatToUsd = async (value)=> {
        let ethUsdFee;
        if (value) {
            ethUsdFee = value;
        } else {
            ethUsdFee = props.ethPrice;
        }
        let balanceArray = OriginalBalance.split('');
        balanceArray.splice(balanceArray.length - 18, 0, '.');
        let formatBalance = balanceArray.join('');
        let result = parseFloat(formatBalance) * parseFloat(ethUsdFee);
        result = props.convertTo(result, 'USD');
        setFee(ethUsdFee)
        setOriginalFee(props.ethPrice)
        setShowBalance(result);
    }

    const changeFee = (e) => {
        const re = /^-?\d*[.]??\d*$/;
        if (re.test(e.target.value)) {
            setFee(e.target.value)
        }
    }

    const resetFee = ()=> setFee(originalFee);

    const applyFee = () =>{
        formatCurrency(currency, fee);
    }

    const newCurrency = (c) => {
        setCurrency(c)
        formatCurrency(c)
    }

    const newFavorite = () => {
        if (favorites) {
            setFavorites(false)
        } else {
            setFavorites(true)
        }
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
                            <div className=" text-center">
                               <i className={`fa-heart fa-2x ${favorites ? 'fas text-danger' : 'far'}`} onClick={()=>newFavorite()}></i>
                            </div>
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
                                        <input onClick={()=>newCurrency('USD', originalFee)} type="radio" name="options" id="option2" autoComplete="off"/> USD
                                    </label>
                                    <label className={currency === 'Euro' ? 'btn btn-secondary active' : 'btn btn-secondary' }>
                                        <input onClick={()=>newCurrency('Euro')} type="radio" name="options" id="option3" autoComplete="off"/> Euro
                                    </label>
                                </div>
                            </div>
                             <div className="col-md-2">
                                <div className=" text-center">
                                    <label className={currency === 'Ether' ? 'd-none' : ''}>Exchange rate:
                                        <input type="text" pattern="[0-9]*" className="form-control text-center" id="inputPassword2" value={fee} onChange={(e)=> changeFee(e)}/>
                                    </label>
                                    <div className={` justify-content-around ${currency === 'Ether' ? 'd-none' : 'd-flex'}`}>
                                        <span className="fas fa-check text-right text-success position-relative" onClick={()=>  applyFee()}></span>
                                        <span className="fas fa-undo-alt text-right text-gray-700 position-relative" onClick={()=> resetFee() }></span>
                                    </div>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
    
        );
    }



export default Card;