interface Connection {
    [K: Condition]: Db
}
interface Condition {
    tableName: string
    query: Query
}

interface Query {
    [K: string] : string
}

const ConnectionPool: Connection = {
    "Key1": {
        price: 1,
        remaining: 2,
    },
    "Key2": {
        price: 1,
        remaining: 2,
    }
}
