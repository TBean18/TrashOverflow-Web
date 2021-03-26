import React from 'react'
import '../css/GroupCardBack.css';

import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-blue.css';
import '../css/GroupCardBackButton.css';

function GroupCardBack({ profilePic, groupname, timestamp, message }) {
    return (
        <div className="groupCardBack">
        <div className="groupCardBack__top">
            <div className="groupCardBack__topInfo" >
                <h3>{groupname}</h3>
            </div>            
        </div>
        <div className="groupCardBack__body">
            <div className="groupCardBack__member">
                <ul>Jason Terry: 31</ul>
            </div>
            <div className="groupCardBack__member">
                <ul>Pau Gasol: 16</ul>
            </div>
            <div className="groupCardBack__member">
                <ul>Dirk Nowitzki: 41</ul>
            </div>
            <div className="groupCardBack__member">
                <ul>Paul Pierce: 34</ul>
            </div>
            <div className="groupCardBack__member">
                <ul>Mike Miller: 13</ul>
            </div>
            <div className="groupCardBack__member">
                <ul>Bertram Gilfoyle: 100</ul>
            </div>
            <div className="groupCardBack__member">
                <ul>Evan Fournier: 10</ul>
            </div>
            <div className="groupCardBack__member">
                <ul>Brook Lopez: 11</ul>
            </div>
            <div className="groupCardBack__member">
                <ul>Tyrese Haliburton: 0</ul>
            </div>
            <div className="groupCardBack__member">
                <ul>Lou Williams: 23</ul>
            </div>
        </div>
        <div className="groupCardBack__bottom">
            <div className="groupCardBack__bottomButton">
                <AwesomeButton size="medium" type="primary">Select</AwesomeButton>
            </div>
        </div>
    </div>
    )
}

export default GroupCardBack
