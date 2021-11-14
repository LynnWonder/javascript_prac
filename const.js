var MongoProxy = /** @class */ (function () {
    function MongoProxy(serviceId, tableName) {
        this.serviceId = serviceId;
        this.tableName = tableName;
        this.db = null;
    }
    MongoProxy.prototype.getDB = function () {
        if (!this.db) {
            console.info('=====>>>>');
            this.db = this.serviceId + "_" + this.tableName;
        }
        return this.db;
    };
    return MongoProxy;
}());
var aaa = new MongoProxy('tt123', 'test');
var aaaDb = aaa.getDB();
var bbb = new MongoProxy('tt123', 'test');
var bbbDb = bbb.getDB();
var ccc = new MongoProxy('tt456', 'test');
var cccDb = ccc.getDB();
console.info(aaa, bbb, ccc);
console.info(aaaDb, bbbDb, cccDb);
