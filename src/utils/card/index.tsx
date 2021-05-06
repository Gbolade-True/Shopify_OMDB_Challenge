import React, { FC, useContext, useState } from 'react';
import { OMDBMoviesContext } from '../../context/OMDBMoviesContext';
import './index.scss';

interface ICardProps {
    cardObject: {[ key: string ]: any};
    cardImage: string;
    onClick? : React.MouseEventHandler<HTMLButtonElement>;
    remNom? : React.MouseEventHandler<HTMLButtonElement>;
    cardHeader?: string;
}

const GCard:FC<ICardProps> = ( props ) => {
    const value = useContext(OMDBMoviesContext);
    const { cardObject, cardImage, onClick, cardHeader, remNom } = props;
    const [ isNominated, setIsNominated ] = useState(false);

    return(
        <div className={isNominated || value.showNominees ? "card-container nominated" : "card-container"} >

            <div className='card-header'>
                <p className="card-label">{cardHeader}</p>
                {(isNominated || value.showNominees) && <i className="fa fa-star"/>}
            </div>

            <div className="image" style={{ cursor : "pointer" }}>
                <img src={ cardImage } alt="" />
            </div>
            <div className="card-body">
                {
                    Object.keys(cardObject).map((item, index) => {
                        return(
                            item !== 'Poster' &&
                                <div key={index} >
                                <div style={{marginRight: '10px'}}>
                                    <p className="card-label">{item}</p>
                                    <p className="card-text">{cardObject[ item ]}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div style={{textAlign: 'center'}}>
                {
                    value.showNominees ?
                    <button className='n-button' onClick={ remNom }>
                        Remove nominee
                    </button>
                    :
                    <button className='n-button' 
                    onClick={(e) =>{isNominated ?  remNom!(e) : onClick!(e); setIsNominated(!isNominated) }}>
                    {isNominated ? 'Remove nominee' : 'Add to Nominees'}
                    </button>
                }

            </div>
        </div>
    )
};

export default GCard;