import React, {useState, useEffect} from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import Block from '../components/Block';
import { Grid, Container, Input, Button } from 'semantic-ui-react';

const Search = () => {
    const [hash,setHash] = useState('');
    const [number, setNumber] = useState('');
    const [parentHash,setParentHash] = useState('');
    const [stateRoot,setStateRoot] = useState('');
    const [extrinsicsRoot,setExtrinsicsRoot] = useState('');
    const [hash2,setHash2] = useState('');
    const [number2, setNumber2] = useState('');
    const [parentHash2,setParentHash2] = useState('');
    const [stateRoot2,setStateRoot2] = useState('');
    const [extrinsicsRoot2,setExtrinsicsRoot2] = useState('');
    const [showHCard,setShowHCard] = useState(false);
    const [showNCard,setShowNCard] = useState(false);
    const [snumber, setSNumber] = useState();
    const [shash, setSHash] = useState();

    const searchNumber = async () => {
        const wsProvider = new WsProvider('wss://rpc.polkadot.io');
        const api = await ApiPromise.create({ provider: wsProvider });

        const hash = await api.rpc.chain.getBlockHash(snumber);
        const lastHeader = await api.rpc.chain.getHeader(hash);

        setNumber(lastHeader.number.toString());
        setHash(lastHeader.hash.toString());
        setParentHash(lastHeader.parentHash.toString());
        setStateRoot(lastHeader.stateRoot.toString());
        setExtrinsicsRoot(lastHeader.extrinsicsRoot.toString());
        setShowNCard(true);
    }

    const searchHash = async () => {
        const wsProvider = new WsProvider('wss://rpc.polkadot.io');
        const api = await ApiPromise.create({ provider: wsProvider });

        const lastHeader = await api.rpc.chain.getHeader(shash);

        setNumber2(lastHeader.number.toString());
        setHash2(lastHeader.hash.toString());
        setParentHash2(lastHeader.parentHash.toString());
        setStateRoot2(lastHeader.stateRoot.toString());
        setExtrinsicsRoot2(lastHeader.extrinsicsRoot.toString());
        setShowHCard(true);
    }

    const numberSet = (e,d) => {
        setSNumber(d.value);
    }

    const hashSet = (e,d) => {
        setSHash(d.value);
    }

    return (
        <Grid textAlign='center' columns={2}>
            <Grid.Column>
                <Grid.Row>
                    <h2>Search By Block Number</h2>
                </Grid.Row>
                <Grid.Row>
                    <Input
                     placeholder='Search By Block Number'
                     type='number' 
                     onChange={numberSet}
                     />
                     <Button primary onClick={async () => searchNumber()}>
                         SEARCH
                     </Button>
                </Grid.Row>
                <Grid.Row>
                    {showNCard ? 
                        <Container textAlign='center'>
                            <Block 
                            number={number}
                            hash={hash}
                            parentHash={parentHash}
                            stateRoot={stateRoot}
                            extrinsicsRoot={extrinsicsRoot}
                            />
                        </Container> :
                        <Container>
                            <div></div>
                        </Container>
                }
                </Grid.Row>
            </Grid.Column>
            <Grid.Column>
                <Grid.Row>
                    <h2>Search By Block Hash</h2>
                </Grid.Row>
                <Grid.Row>
                    <Input 
                    placeholder='Search By Block Hash'
                    onChange={hashSet} />
                    <Button primary onClick={async () => searchHash()}>
                         SEARCH
                     </Button>
                </Grid.Row>
                <Grid.Row>
                    {showHCard ? 
                        <Container textAlign='center'>
                            <Block 
                            number={number2}
                            hash={hash2}
                            parentHash={parentHash2}
                            stateRoot={stateRoot2}
                            extrinsicsRoot={extrinsicsRoot2}
                            />
                        </Container> :
                        <Container>
                            <div></div>
                        </Container>
                }
                </Grid.Row>
            </Grid.Column>
        </Grid>
    )
}

export default Search;