import React from 'react';
import './style.css';
import { Offline, Online } from 'react-detect-offline';
import userLight from "../../assets/images/userLight.svg";
import userDark from "../../assets/images/userDark.svg";
export default function OnOffLineUser({ toggle }) {
    return (
        <div className="on-off-cont">
            <div className="on-off-text">
                <Online>Connected</Online>
                <Offline>Working Offline</Offline>
            </div>
            <img src={toggle ? userLight : userDark} alt="" />
        </div>
    )
}
