import React, {Component} from 'react';

import CatImage from './catImage'

export default function CatList (props) {
    if(props.cats.length ===0){
        return <div className="col"> No cats available </div>
    }
    return props.cats.map( (value,index) => <CatImage key={index} cat={value} />)
}