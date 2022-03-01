const { Pool } = require('pg');
class Orm {
    #poolConnection;
    constructor(config) {
        this.config = config
       this.connect()
    }
    
  async connect() {
        this.#poolConnection=new Pool(this.config);
        return  this.#poolConnection
    }

  async  save(data,tableName){
        let part1 = `INSERT INTO ${tableName} (`;
        let part2 = ")",
            part3 = "VALUES (",
            part4 = ")";
        let tableKeys = "",
            tableValues = "";
        for (let key in data) {
            tableKeys += `${key},`;
            tableValues += `'${data[key]}',`
        }
    
        tableKeys = tableKeys.slice(0, -1);
        tableValues = tableValues.slice(0, -1);
        let query = `${part1}${tableKeys}${part2} ${part3}${tableValues}${part4}`;
        return(await this.#poolConnection.query(query))
    }
}


module.exports=Orm