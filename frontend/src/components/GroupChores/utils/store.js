const cards = [
    {
        id: 'card-1',
        title: 'Learning how to cook',
    },
    {
        id: 'card-2',
        title: 'Making a sandwich',
    },
    {
        id: 'card-3',
        title: 'Taking out the trash'
    },
]


const data = {
    lists: {
        'list-1': {
            id: 'list-1',
            title: 'Todo',
            cards,
        },
    },
    listIds: ['list-1'],
}

export default data