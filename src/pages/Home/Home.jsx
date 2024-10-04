import React, { useContext, useEffect, useState } from 'react'
import "./Home.css"
import { CoinContext } from '../../context/Coincontext'
import { Link } from 'react-router-dom'

const Home = () => {

    const { allcoin, currency } = useContext(CoinContext);
    const [displaycoin, setDisplaycoin] = useState([]);
    const [input, setInput] = useState('');

    const inputhandler = (event) => {
        setInput(event.target.value);
        if (event.target.value === "") {
            setDisplaycoin(allcoin)
        }
    }

    const searchhandler = async (event) => {
        event.preventDefault();
        const coins = await allcoin.filter((item) => {
            return item.name.toLowerCase().includes(input.toLowerCase())
        })
        setDisplaycoin(coins);
    }

    useEffect(() => {
        setDisplaycoin(allcoin);
    }, [allcoin])

    return (
        <div className='home'>
            <div className="hero">
                <h1>Largest Crypto Marketplace</h1>
                <p>Welcome to the world's largest cryptocurrency
                    marketplace. Sign up to explore more about cryptos.
                </p>
                <form onSubmit={searchhandler}>
                    <input onChange={inputhandler} list='coinlist' type="text" placeholder='Search Crypto .....'
                        value={input} required />

                    <datalist id='coinlist'>
                        {allcoin.map((item, index) => (<option key={index} value={item.name} />))}
                    </datalist>

                    <button type='Submit'>Search</button>
                </form>
            </div>
            <div className='crypto-table'>
                <div className="table-layout">
                    <p>#</p>
                    <p>Coins</p>
                    <p>Price</p>
                    <p style={{ textAlign: 'center' }}>24H Change</p>
                    <p className='market-cap'>Market Cap</p>
                </div>
                {
                    displaycoin.slice(0, 10).map((item, index) => (
                        <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
                            <p>{item.market_cap_rank}</p>
                            <div>
                                <img src={item.image} alt="" />
                                <p>{item.name + "-" + item.symbol}</p>
                            </div>
                            <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
                            <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>
                                {Math.floor(item.price_change_percentage_24h * 100) / 100}
                            </p>
                            <p className='market-cap'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Home
