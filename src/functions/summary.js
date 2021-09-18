const data = {
    "CHR": [
        {"judge": "地狱", "grade": 0},
        {"min":1, "judge": "折磨", "grade": 0},
        {"min":2, "judge": "不佳", "grade": 0},
        {"min":4, "judge": "普通", "grade": 0},
        {"min":7, "judge": "优秀", "grade": 1},
        {"min":9, "judge": "罕见", "grade": 2},
        {"min":11, "judge": "逆天", "grade": 3},
    ],
    "MNY": [
        {"judge": "地狱", "grade": 0},
        {"min":1, "judge": "折磨", "grade": 0},
        {"min":2, "judge": "不佳", "grade": 0},
        {"min":4, "judge": "普通", "grade": 0},
        {"min":7, "judge": "优秀", "grade": 1},
        {"min":9, "judge": "罕见", "grade": 2},
        {"min":11, "judge": "逆天", "grade": 3},
    ],
    "SPR": [
        {"judge": "地狱", "grade": 0},
        {"min":1, "judge": "沮丧", "grade": 0},
        {"min":2, "judge": "不佳", "grade": 0},
        {"min":4, "judge": "普通", "grade": 0},
        {"min":7, "judge": "阳光", "grade": 1},
        {"min":9, "judge": "优秀", "grade": 2},
        {"min":11, "judge": "逆天", "grade": 3},
    ],
    "INT": [
        {"judge": "地狱", "grade": 0},
        {"min":1, "judge": "折磨", "grade": 0},
        {"min":2, "judge": "不佳", "grade": 0},
        {"min":4, "judge": "普通", "grade": 0},
        {"min":7, "judge": "优秀", "grade": 1},
        {"min":9, "judge": "罕见", "grade": 2},
        {"min":11, "judge": "逆天", "grade": 3},
        {"min":21, "judge": "超人", "grade": 3},
        {"min":131, "judge": "元神", "grade": 3},
        {"min":501, "judge": "超神", "grade": 3},
    ],
    "STR": [
        {"judge": "地狱", "grade": 0},
        {"min":1, "judge": "折磨", "grade": 0},
        {"min":2, "judge": "不佳", "grade": 0},
        {"min":4, "judge": "普通", "grade": 0},
        {"min":7, "judge": "优秀", "grade": 1},
        {"min":9, "judge": "罕见", "grade": 2},
        {"min":11, "judge": "逆天", "grade": 3},
        {"min":21, "judge": "凝气", "grade": 3},
        {"min":51, "judge": "神体", "grade": 3},
        {"min":101, "judge": "仙佛", "grade": 3},
    ],
    "AGE": [
        {"judge": "无法立足", "grade": 0},
        {"min":1, "judge": "早夭", "grade": 0},
        {"min":10, "judge": "挣扎", "grade": 0},
        {"min":18, "judge": "适应", "grade": 0},
        {"min":36, "judge": "努力", "grade": 0},
        {"min":60, "judge": "折腾", "grade": 1},
        {"min":120, "judge": "习惯", "grade": 1},
        {"min":240, "judge": "游刃", "grade": 2},
        {"min":360, "judge": "通达", "grade": 2},
        {"min":600, "judge": "圆满", "grade": 3},
    ],
    "SUM": [
        {"judge": "地狱", "grade": 0},
        {"min":41, "judge": "折磨", "grade": 0},
        {"min":60, "judge": "不佳", "grade": 0},
        {"min":110, "judge": "普通", "grade": 0},
        {"min":160, "judge": "优秀", "grade": 1},
        {"min":240, "judge": "罕见", "grade": 2},
        {"min":310, "judge": "逆天", "grade": 3},
        {"min":360, "judge": "传说", "grade": 3},
    ]
}

function summary(type, value) {
    let length = data[type].length;
    while(length--) {
        const {min, judge, grade} = data[type][length];
        if(min==void 0 || value >= min) return {judge, grade};
    }
}

export { summary };