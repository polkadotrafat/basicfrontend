import React from 'react';
import { Segment } from 'semantic-ui-react';

const Block = ({number,hash,parentHash,stateRoot,extrinsicsRoot}) => {
    return (
        <Segment>
            <h3>Block     : {number}</h3>
            <h3>Hash             : {hash}</h3>
            <h3>Parent Hash      : {parentHash}</h3>
            <h3>State Root       : {stateRoot}</h3>
            <h3>Extrinsics Root  : {extrinsicsRoot}</h3>
        </Segment>
    )
}

export default Block;