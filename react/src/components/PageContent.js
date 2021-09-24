import React, { useState, useEffect } from 'react';
import Card from './Card';
import axios from 'axios';

function PageContent(props) {
	const [ wallets, setWallets ] = useState([]);
	const [ walletAddress, setWalletAddress ] = useState([]);
	const [ error, setError ] = useState([]);
	const [ ethPrice, setEthPrice ] = useState();
	const [ euroFee, setEuroFee ] = useState();

	useEffect(()=>{
		usdEthFee();
		async function fetchData() {
			const result = await axios('http://localhost:3000/wallets');
			setWallets(result.data);
		}
		fetchData();
	}, [])

	const usdEthFee = async () => {
		const price = await axios(`http://localhost:3000/walletsApi/price`);
		setEthPrice(price.data.result.ethusd)
		euroEthFee(price.data.result.ethusd);
	}

	const euroEthFee = async (ethUsdFee) => {
		let euroFee = await axios.get(`http://localhost:3000/walletsApi/euroPrice`);
		euroFee = euroFee.data.rates.USD;
		euroFee = ethUsdFee / euroFee;
		euroFee = '' + euroFee;
		setEuroFee(euroFee);
	}
	
	const convertTo = (number, currency) =>{
		const numberFormat = new Intl.NumberFormat('en-US', {style: 'currency', currency: currency});
		return numberFormat.format(number);
	}

	const searchWallet = async () => {
		for (const wallet of wallets) {
			if (wallet.address === walletAddress) {
				setError({type: 'address', message: 'Wallet is alredy on list'});
				return
			}
		}
		if(walletAddress){
			const response = await axios(`http://localhost:3000/walletsApi/${walletAddress}`);
			if(response.data.message === "OK"){
				const isOld = await walletFirstTransaction(walletAddress);
				const newWallet = {balance: response.data.result, address: walletAddress, old: isOld};
				setWallets([...wallets, newWallet]);
				setError('');
				saveWallet(newWallet);
			}else{
				setError({type: 'address', message:response.data.result})
			}
		}else{
			setError({type: 'address', message: 'Wallet address is required'})
		}
	}

	const saveWallet = async (wallet) => {
		const response = await axios.post(`http://localhost:3000/wallets/create`, wallet)
		if (response) {
			console.log('Wallet guardada ', wallet);
		}
	}

	const walletInput = (e) => {
		setWalletAddress(e.target.value.trim());
	}

	const walletFirstTransaction = async (walletAddress) => {
		const response = await axios(`http://localhost:3000/walletsApi/transaction/${walletAddress}`);
		const firstTransactionYear = new Date(response.data.result[0].timeStamp * 1000);
		const today = new Date();
		const diffDay = Math.ceil(Math.abs(today - firstTransactionYear) / 1000 * 60 * 60 * 24);
		let result;
		if (diffDay >= 365) {
			result = true
		}else{
			result = false
		}
		return result
	}

		return (
			<React.Fragment>

				
					<div className="container-fluid">

							<h1 className="text-center mb-0 text-gray-800">List of wallets</h1>

						<div className="row">
							<div className="col-lg-9 mb-4">
								{wallets.map((wallet, idx) => {
									return <Card key={idx} wallet={wallet} ethPrice={ethPrice} convertTo={convertTo} euroFee={euroFee}/>
								})}
								
							</div>	

					
							<div className="d-sm-flex flex-column col-lg-3 mb-4">
								
									<div className="mb-3 d-flex flex-column align-items-end">
										<label htmlFor="addressInput" className="form-label">Enter a wallet address to add:</label>
										<input  type="text" className="form-control" id="addressInput" name="address" placeholder="0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe" onChange ={ (e)=> walletInput(e) } />
										<div><span className="badge badge-danger">{ error  ? error.type === 'address' ? error.message : '' : '' }</span></div>									
										<button type="submit" className="btn btn-primary mt-2"  onClick={()=> searchWallet() }>Add</button>
									</div>
									
									<div className="mb-4">						
										<div className="card shadow mb-4">
											<div className="card-header py-3">
												<h6 className="m-0 font-weight-bold text-primary text-center">
													Ether Price 
													<span className="fas fa-sync-alt text-right text-gray-700 position-relative" style={{left: "30%"}} aria-hidden="true"></span>
												</h6>
											</div>
											<div className="card-body">
												<div className="d-flex flex-column align-items-center">
		
													<h6 className="m-0 font-weight-bold text-center">{convertTo(ethPrice, 'USD')} USD</h6>
													<h6 className="m-0 font-weight-bold text-center">{convertTo(euroFee, 'EUR')} Euro</h6>

												</div>
											</div>
										</div>
									</div>
							</div>
						

						</div>

					
					</div>
				
			

			</React.Fragment>
		);
	}


export default PageContent;