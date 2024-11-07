// message BaseData {
//     int32 hp = 1;
//     int32 maxHp = 2;
//   }

class Base {
    constructor(maxHp) {
        this.hp = maxHp || 100;
        this.maxHp = maxHp || 100;
    }
}

export default Base;
