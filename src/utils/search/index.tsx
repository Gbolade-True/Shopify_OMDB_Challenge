import React, { FC } from 'react';
import './index.scss';

interface IProps {
    defaultValue?: string;
    value?: ReadonlyArray<string> | string | number;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    style?: React.CSSProperties;
    hideSearch?: boolean;
    onClose?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    valueIn: boolean;
};

const Search: FC<IProps> = (props) => {
    const { defaultValue, className, onChange, onClick, onClose, value, hideSearch, valueIn } = props;

    return (
        <div style={{ transition : "all .3s ease" }}>
            <div style={{display:"flex"}} >
                <div className='search'>
                    <input
                        defaultValue={defaultValue}
                        className={className}
                        onChange={onChange}
                        value={value}
                        placeholder="Search…"
                    />
                </div>
                {!hideSearch && 
                <button onClick={onClick} className='button'>
                    Search
                </button>}
            </div>
            {
                valueIn ?
                <button className={`close-section btn`}  onClick={ onClose }>
                    <i className="far fa-window-close"></i>&nbsp;Clear Search
                </button>
                : ''
            }
        </div>
    )
}

export default Search;