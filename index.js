exports.ParseSolidityStruct = (struct) => {
    function removeNumberValues(obj) {
        let numKeys = []
        Object.keys(obj).forEach((key) => {
            let isnum = /^\d+$/.test(key);
            if (isnum) delete obj[key];
  
            try {
                let isarray = Array.isArray(obj[key]);
                // this should be a bigint, so we cast it to string
                if (!isarray) {
                    obj[key] = JSON.parse(obj[key].toString())
                }
            } catch(e) {}
        })
  
        Object.keys(obj).forEach((key) => {
            let isarray = Array.isArray(obj[key]);
            if (isarray) {
                obj[key] = obj[key].map((e) => {
  
                    if (typeof e === 'object') {
                      const contractObj = {...e}
                      return removeNumberValues(contractObj)
                    } else {
                      return e;
                    }
                })
            }
        })
  
        return obj;
    }
  
    return struct.map((entry) => {
        const contractObj = {...entry}
        // remove keys in the object that are stringified numbers. Solidity auto includes them
        return removeNumberValues(contractObj)
    })
   
  }