import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import { Alchemy, Network } from "alchemy-sdk";


function History() {
    const [history, setHistory] = useState([])

    useEffect(() => {
        const config = {
            apiKey: "zBso5VaCDfXiyBQlZ5J9RvJdEm2NGa1l",
            network: Network.ETH_GOERLI,
        };
        const alchemy = new Alchemy(config);

        const getHistory = async () => {
            const historyData = await alchemy.core.getAssetTransfers({
                fromBlock: "0x0",
                  fromAddress: "0x921824BBBeee107c8DAc750163f673519AA364Aa",
                // fromAddress: "0x14CE4c8E705531c3CbDDa925b9DeE6Df37aEE48e",
                category: ["erc20"],
            });
            setHistory(historyData.transfers)
            console.log(historyData.transfers[0].rawContract.value);
        }
        getHistory()
    }, [])
    return (
        <div>

            <div className='flex place-content-between w-screen bg-black py-8 text-red-500'>
                <p className='mx-4 font-normal text-2xl'>BONUS DAPP TRANSACTION HISTORY</p>
                <Link to='/pay'>
                    <p className='mx-4'> back</p>
                </Link>
            </div>
            <Table striped bordered hover >
                <thead>
                    <tr>

                        <th>Transaction hash</th>
                        <th>Wallet ddress</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody className='text-sm '>
                    {history.map((tranx) => (
                        <tr key={tranx.hash}>
                            <td>{tranx.hash}</td>
                            <td>{tranx.to}</td>
                            <td>{ethers.utils.formatEther(tranx.rawContract.value)}</td>
                        </tr>
                    ))}

                </tbody>
            </Table>
        </div>
    )
}

export default History