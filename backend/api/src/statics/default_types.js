exports.SystemMessages = {
    GENERIC_ERROR : 'Something went wrong, we are working on it, please try again later'    
}

exports.DefaultSchema = [
    {
        "name": "name",
        "min": 3,
        "max": 10,
        "type": "str",
        "has_blank": true
    },
    {
        "name": "contact",
        "type": "email"
    },
    {
        "name": "ttl",
        "min": 0,
        "max": 1,
        "type": "int"
    },
    {
        "name": "supports",
        "min": 1,
        "max": 11,
        "type": "list",
        "model": {
            "min": 2,
            "max": 3,
            "type": "str",
            "has_blank": false
        }
    },
    {
        "name": "description",
        "min": 3,
        "max": 65,
        "type": "str",
        "has_blank": true
    },
    {
        "name": "isFree",
        "type": "bool"
    },
    {
        "name": "website",
        "type": "url"
    },
    {
        "name": "localhost",
        "type": "ip"
    },
    {
        "name": "time",
        "min": -1551796200000,
        "max": -1551191400000,
        "type": "date",
        "isText": true
    },
    {
        "name": "technologies",
        "min": 1,
        "max": 1,
        "type": "model",
        "model": [
            {
                "name": "backend",
                "type": "url"
            },
            {
                "name": "frontend",
                "min": 3,
                "max": 9,
                "type": "str",
                "has_blank": false
            },
            {
                "name": "database",
                "min": 3,
                "max": 5,
                "type": "str",
                "has_blank": false
            }
        ]
    }
];