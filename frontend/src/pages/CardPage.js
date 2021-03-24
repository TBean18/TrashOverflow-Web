import React from 'react';

import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import CardUI from '../components/CardUI';
import GroupList from '../components/GroupList';
import JoinGroup from '../components/JoinGroup';

const CardPage = () =>
{
    return(
        <div>
            <PageTitle />
            <LoggedInName />
            <CardUI />
            <JoinGroup></JoinGroup>
            <GroupList />
        </div>
    );
}

export default CardPage;
