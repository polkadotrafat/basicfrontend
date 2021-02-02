import React, { useState, useEffect } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { Container } from 'semantic-ui-react';
import Spinner from '../components/Spinner';
import Block from '../components/Block';

const Home = () => {
    const [hash,setHash] = useState('');
    const [number, setNumber] = useState('');
    const [parentHash,setParentHash] = useState('');
    const [stateRoot,setStateRoot] = useState('');
    const [extrinsicsRoot,setExtrinsicsRoot] = useState('');
    const [loading,setLoading] = useState(true);

    useEffect( () => {
        const chainState = async () => {
            const wsProvider = new WsProvider('wss://rpc.polkadot.io');
            const api = await ApiPromise.create({ provider: wsProvider });
            
            // Retrieve the latest header
            await api.rpc.chain.subscribeNewHeads( (lastHeader) => {
                setNumber(lastHeader.number.toString());
                setHash(lastHeader.hash.toString());
                setParentHash(lastHeader.parentHash.toString());
                setStateRoot(lastHeader.stateRoot.toString());
                setExtrinsicsRoot(lastHeader.extrinsicsRoot.toString());

                setLoading(false);
            });

        }

        chainState();
    });

    if (loading) {
        return (
            <Spinner />
        )
    } else {
        return (
            <Container textAlign='center'>
                <Block 
                number={number}
                hash={hash}
                parentHash={parentHash}
                stateRoot={stateRoot}
                extrinsicsRoot={extrinsicsRoot}
                />
            </Container>
        )
    }
}

export default Home;