import {map} from '../functions/util.js';

const talentList = [
  {
    // 智商+3，且有可能找到更好的工作
    id: 1001,
    name: "名校大神",
    description: "全球知名学校计算机系毕业",
    grade: 2,
    effect: {
      INT: 3
    }
  }, {
    // 没什么作用
    id: 1002,
    name: "闷骚",
    description: "大部分程序员的特征",
    grade: 0
  }, {
    id: 1003,
    name: "程序猿",
    description: "性别为男",
    grade: 1,
    exclusive: [
      1004,
      1047
    ]
  }, {
    id: 1004,
    name: "程序媛",
    description: "性别为女",
    grade: 1,
    exclusive: [
      1003,
      1054, // 程序媛不能是IT直男
      2024  // 程序媛不能是女装大佬
    ]
  }, {
    id: 1047,
    name: "独立女性",
    description: "心态+1，颜值+1，智商+1",
    grade: 2,
    exclusive: [
      1003,
      1054,
      2024,
    ],
    effect: {
      INT: 1,
      SPR: 1,
      CHR: 1,
    }
  }, {
    id: 2024,
    name: "女装大佬",
    description: "颜值+2，快乐+4，可能被男同事追求",
    grade: 3,
    exclusive: [
      1004,  // 程序媛不能是女装大佬
      1047  // 独立女性不能是女装大佬
    ],
    effect: {
        SPR: 4,
        CHR: 2
    }
  }, {
    // 不懂得怜香惜玉
    id: 1054,
    name: "IT直男",
    description: "传说中的IT直男",
    grade: 1,
    exclusive: [
      1004,
    ],
  }, {
    id: 1005,
    name: "黑客精神",
    description: "发现程序漏洞的几率增加",
    grade: 0
  }, {
    id: 1006,
    name: "好奇宝宝",
    description: "心态+1, 倾向于使用新技术",
    grade: 1,
    exclusive: [
      1025,
    ],
    effect: {
      SPR: 1
    }
  }, {
    // 你不会参与抢月饼
    id: 1007,
    name: "乖孩子",
    description: "不喜欢破坏规则",
    grade: 0,
  }, {
    id: 1008,
    name: "大器晚成",
    description: "35岁才找到工作，心态+1",
    grade: 0,
    effect: {
      SPR: 1
    }
  }, {
    id: 1009,
    name: "家庭富裕，爱好搬砖",
    description: "心态+2",
    grade: 1,
    effect: {
      SPR: 2
    }
  }, {
    id: 1010,
    name: "富二代",
    description: "你是富二代，不差钱，财富+2，心态+2",
    grade: 2,
    exclusive: [
      1011,
    ],
    effect: {
      SPR: 2,
      MNY: 2,
    }
  }, {
    id: 1011,
    name: "养家糊口",
    description: "你有家庭负担，财富-1",
    exclusive: [
      1010,
    ],
    grade: 0,
    effect: {
      MNY: -1
    }
  }, {
    id: 1012,
    name: "租房一族",
    description: "你不买房",
    exclusive: [
      1050,
    ],
    grade: 0
  }, {
    id: 1013,
    name: "操盘手",
    description: "你喜欢炒股",
    grade: 1,
    exclusive: [
      1015
    ]
  }, {
    id: 1014,
    name: "理财达人",
    description: "炒股赚钱的几率增加",
    grade: 1,
  }, {
    id: 1015,
    name: "稳如狗",
    description: "你不做任何风险投资",
    grade: 1,
    exclusive: [
      1013
    ]
  }, {
    id: 1016,
    name: "普通话不好",
    description: "说方言",
    grade: 0
  }, {
    id: 1017,
    name: "头发茂密",
    description: "你不会秃头",
    grade: 2
  }, {
    id: 1018,
    name: "天生猿分",
    description: "所有属性+1",
    grade: 2,
    effect: {
        SPR: 1,
        MNY: 1,
        CHR: 1,
        STR: 1,
        INT: 1
    }
  }, {
    id: 1019,
    name: "金手指",
    description: "初始可用属性点+2",
    grade: 1,
    status: 2
  }, {
    id: 1020,
    name: "书香门第",
    description: "智力+2",
    grade: 1,
    effect: {
        INT: 2
    }
  }, {
    id: 1021,
    name: "红颜薄命",
    description: "颜值+2，健康-2",
    grade: 0,
    effect: {
        CHR: 2,
        STR: -2
    }
  }, {
    id: 1022,
    name: "能吃能睡",
    description: "心态+1，容易肥胖",
    effect: {
      SPR: 1,
    },
    exclusive: [
      1122,
    ],
    grade: 0
  }, {
    id: 1122,
    name: "坚持锻炼",
    description: "健康+1，你不会过于肥胖",
    effect: {
      STR: 1,
    },
    exclusive: [
      1022,
    ],
    grade: 0
  }, {
    id: 1023,
    name: "诸神眷顾",
    description: "所有属性+2",
    grade: 3,
    effect: {
        SPR: 2,
        MNY: 2,
        CHR: 2,
        STR: 2,
        INT: 2
    }
  }, {
    id: 1025,
    name: "保守党",
    description: "倾向于使用老旧技术",
    grade: 0,
    exclusive: [
      1006
    ]
  }, {
    id: 1026,
    name: "鼓励师",
    description: "你可能会成为程序员鼓励师",
    grade: 0
  }, {
    id: 1027,
    name: "疑似作弊",
    description: "初始可用属性点+4",
    grade: 2,
    status: 4,
  }, {
    id: 1028,
    name: "桃花连连",
    description: "办公室恋爱机会提升",
    grade: 2
  }, {
    id: 1029,
    name: "背锅侠",
    description: "被甩锅可能性增大",
    exclusive: [
      1030,
    ],
    grade: 0
  }, {
    id: 1030,
    name: "老好人",
    description: "不容易被甩锅，但容易被发好人卡",
    exclusive: [
      1029,
    ],
    grade: 0
  }, {
      id: 1031,
      name: "天生残疾",
      description: "健康-2",
      grade: 0,
      effect: {
          STR: -2
      }
  }, {
    id: 1032,
    name: "学渣毕业",
    description: "所有属性-1",
    grade: 0,
    effect: {
        SPR: -1,
        MNY: -1,
        CHR: -1,
        STR: -1,
        INT: -1
    }
  }, {
    id: 1033,
    name: "肥宅从不锻炼",
    description: "体质-10",
    grade: 0,
    effect: {
        STR: -10
    }
  }, {
    id: 1034,
    name: "家运不顺",
    description: "财富-2",
    grade: 0,
    effect: {
        MNY: -2
    }
  }, {
    id: 1035,
    name: "大智若愚",
    description: "智商-1，初始可用属性点+3",
    grade: 1,
    effect: {
        INT: -1
    },
    status: 3
  }, {
    id: 1036,
    name: "砖家",
    description: "智力-1",
    grade: 0,
    effect: {
        INT: -1
    }
  }, {
    id: 1037,
    name: "八面玲珑",
    description: "和同事容易处好关系",
    grade: 0
  }, {
    id: 1038,
    name: "骑士",
    description: "退休后选择去送外卖",
    grade: 0
  }, {
    id: 1039,
    name: "永远的神",
    description: "电竞天才",
    grade: 1
  }, {
    id: 1040,
    name: "洒脱",
    description: "心态+1",
    grade: 1,
    effect: {
      SPR: 1
    }
  }, {
    id: 1041,
    name: "掉发体质",
    description: "容易掉头发",
    grade: 0
  }, {
    id: 1042,
    name: "外籍员工",
    description: "不会说中文",
    grade: 0
  }, {
    id: 1043,
    name: "老司机",
    description: "一言不合就开车",
    grade: 0
  }, {
    id: 1044,
    name: "铁颈椎",
    description: "你不会得颈椎病",
    grade: 1
  }, {
    id: 1045,
    name: "大红人",
    description: "你容易通过晋升",
    grade: 2
  }, {
    id: 1046,
    name: "雍正附体",
    description: "你很少写bug",
    grade: 1
  }, {
    id: 1048,
    name: "平行世界",
    description: "科学家可能会发现平行世界",
    grade: 3
  }, {
    id: 1049,
    name: "一年一跳",
    description: "每年都要跳槽",
    grade: 1
  }, {
    id: 1050,
    name: "房奴一族",
    description: "拼尽全力贷款买房",
    exclusive: [
      1012
    ],
    grade: 0,
  }, {
    id: 1051,
    name: "傻人傻福",
    description: "智力-2，财富+2",
    grade: 0,
    effect: {
        INT: -2,
        MNY: 2
    }
  }, {
    id: 1052,
    name: "佛系青年",
    description: "心态+2",
    grade: 1,
    effect: {
        SPR: 2
    }
  }, {
    id: 1053,
    name: "面霸",
    description: "容易找到好工作",
    grade: 2
  }, {
    id: 1055,
    name: "聪明绝顶",
    description: "智商高地，发量堪忧",
    grade: 0,
    effect: {
      INT: 1,
      CHR: -1,
    }
  }, {
    id: 1056,
    name: "工作狂",
    description: "你愿意连续加班",
    grade: 1,
  }, {
    id: 1057,
    name: "BUG体质",
    description: "代码容易出bug",
    grade: 0,
  }, {
    id: 1058,
    name: "啃老族",
    description: "即使财富低也能保持好心态",
    grade: 0,
  }, {
    id: 1059,
    name: "自由青年",
    description: "你不去国企和大公司",
    grade: 1,
  }, {
    id: 1060,
    name: "天选之人",
    description: "你的运气比他人好",
    grade: 2,
    effect: {
      LCK: 2
    }
  }, {
    id: 1061,
    name: '老油条',
    description: '你被PUA不会影响心态',
    grade: 1,
  }, {
    id: 1062,
    name: '职业规划',
    condition: "AGE?[36]",
    description: '毕业3年时智力、心态+1',
    effect: {
      INT: 1,
      SPR: 1,
    },
    grade: 1,
  }, {
    id: 1063,
    name: '八卦之神',
    description: '能够打听到一些有用的小道消息。',
    grade: 2,
  },
  {
    id: 1064,
    name: '好学青年',
    description: '即使在国企里，也能持续学习。',
    grade: 1,
  },
  {
    id: 1065,
    name: '学富五车',
    description: '智力+3',
    grade: 2,
  },
  {
    id: 1066,
    name: '长线投资',
    description: '在一家公司工作超过5年，智力、心态+1',
    effect: {
      INT: 1,
      SPR: 1,
    },
    grade: 1,
  },
  {
    id: 1067,
    name: '悟道',
    grade: 1,
    description: '智力>10时心态+3',
    condition: 'INT>10',
    effect: {
      SPR: 3,
    }
  },
  {
    id: 1068,
    name: '驻颜',
    grade: 1,
    description: '健康>10时颜值+3',
    condition: 'STR>10',
    effect: {
      CHR: 3,
    }
  },
  {
    id: 1069,
    name: '洛神',
    grade: 1,
    description: '颜值>10时健康+3',
    condition: 'CHR>10',
    effect: {
      STR: 3,
    }
  },
  {
    id: 1070,
    name: '智可生财',
    grade: 1,
    description: '智力>10时财富+3',
    condition: 'INT>10',
    effect: {
      MNY: 3,
    }
  },
  {
    id: 1071,
    name: '进修',
    grade: 1,
    description: '财富>10时智力+3',
    condition: 'MNY>10',
    effect: {
      INT: 3,
    }
  },
  {
    id: 1072,
    name: '相由心生',
    grade: 1,
    description: '智力>10时颜值+3',
    condition: 'INT>10',
    effect: {
      CHR: 3,
    }
  },
  {
    id: 1073,
    name: '整容',
    grade: 1,
    description: '财富>10时颜值+3',
    condition: 'MNY>10',
    effect: {
      CHR: 3,
    }
  },
  {
    id: 1074,
    name: '钻石健身卡',
    grade: 1,
    description: '财富>10时健康+3',
    condition: 'MNY>10',
    effect: {
      STR: 3,
    }
  },
  {
    id: 1075,
    name: '献祭',
    grade: 0,
    description: '初始属性-2，幸运+3',
    effect: {
      BLCK: 3,
    },
    status: -2,
  },
  {
    id: 1076,
    name: '起死回生',
    grade: 2,
    description: '健康<-3时，健康为0',
    condition: 'STR<-3',
    effect: {
      STR: '0!',
    },
  },
  {
    id: 1077,
    name: '矢志不渝',
    description: '你不会出轨',
    grade: 0,
  },
  {
    id: 1078,
    name: '生财有道',
    description: '心态>10时财富+3',
    grade: 1,
    condition: 'SPR>10',
    effect: {
      MNY: 3,
    }
  },
  {
    id: 1079,
    name: '柳暗花明',
    description: '心态<-4时，心态为1',
    grade: 3,
    condition: 'SPR<-4',
    effect: {
      SPR: '1!',
    }
  },
  {
    id: 1080,
    name: '满血复活',
    description: '你有两条命',
    grade: 3,
    effect: {
      LIF: 2,
    }
  },
  {
    id: 1081,
    name: '喵星人',
    description: '你是只喵星人',
    grade: 3,
    // effect: {
    //   LIF: 2,
    // }
  },
];

export const talents = map(talentList);