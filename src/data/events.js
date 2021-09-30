import {map} from '../functions/util.js';

//const conAlreadyHaveJob = 'EVT?[100003,100004,100005,100006,100007,100008,100009,100010,100011,100012,100021]';
const conAlreadyHaveJob = 'ENV>0';
const conFemale = 'EVT?[100002,150023, 510004]'; // 妹纸
const conFemale2 = 'EVT?[100002,150023, 510004, 150024]'; // 妹纸和女装大佬
const conMale = 'EVT?[100001]';

// 跳槽分支
const jump1 = [
  "(LCK>3)&(TLT?[1059]):241002",
  "(LCK>0)&(TLT?[1053]):241000", // 面霸
  "LCK>7:241000", // 大公司
  "LCK>5:241001", // 国企
  "LCK>3:241002", // C轮
  "(INT>5)&(LCK>0):241009", // 老板挽留
  "LCK>0:241003", // 不加薪
  "(LCK>-3)&(TLT?[1059]):241005",
  "LCK>-3:241004",  // 降薪大公司
  "LCK>-5:241005",  // 降薪
  "(INT<4)&(LCK>-7):241006",  // 降薪
  "(INT<4)&(LCK<-6):241007", // 找不到工作
  "LCK<-4:241008",  // 不跳槽
];

const jump2 = [
  "(LCK>3)&(TLT?[1059]):231002",
  "(LCK>0)&(TLT?[1053]):231000", // 面霸
  "LCK>7:231000", // 大公司
  "LCK>5:231001", // 国企
  "LCK>3:231002", // C轮
  "(INT>5)&(LCK>0):231009", // 老板挽留
  "LCK>0:231003",
  "(LCK>-3)&(TLT?[1059]):231005",
  "LCK>-3:231004",
  "LCK>-5:231005",
  "(INT<4)(LCK>-7):231006",  // 降薪
  "(INT<4)&(LCK<-6):231007", // 找不到工作
  "LCK<-4:241008",  // 不跳槽
];

// 结局分支
const gameOver = [
  "TLT?[1038]:999115", // 送外卖
  "STR<-3:900008", // 猝死
  "SPR<-5:900011", // 抑郁自杀
  "(CHR>6)&(MNY<-7):900016", // 举债结局2
  "MNY<-3:900015", // 举债结局
  "(EVT?[150024])&(EVT?[150023]):900006", // 女装大佬真爱结局
  "(EVT?[150024])&(EVT?[150020]):900007", // 女装大佬真爱结局2
  "(MNY>7)&(LCK>5)&(SPR>5):900002", // 意外继承了一大笔遗产
  "(MNY>7)&(LCK>5):900003", // 意外继承了一大笔遗产2
  `(CHR>12)&(${conFemale}):900013`, // 霸道总裁结局1
  `(CHR>12)&(EVT?[150024]):900014`, // 霸道总裁结局2
  "(CHR>7)&(EVT?[150009]):900005", //主播结局
  "(CHR>7):900012", // 明星结局
  "(MNY>7)&(CHR>5):900004", // 演艺圈结局
  "INT>9:900009", // 博士结局
  "INT>7:900010", // 老师结局
  "STR<0:900001", // 工地搬砖累死
  "LCK<1000:900000", // 普通结局，去工地搬砖
];

// 退休结局分支
const retireGameOver = [
  "TLT?[1038]:999115", // 送外卖
  "INT>10:999100", // 科学家
  "INT>8:999101", // 特聘教授
  "INT>5:999102", // 网络作家
  "(MNY>10&SPR>8):999106",  // 创业
  "SPR>10:999103", // 哲学家
  "SPR>8:999104", // 社区红人
  "(SPR>5&MNY>5):999105", // 旅游
  "SPR>-10:999107"  // 安享晚年
];

const retireGameOver2 = [
  "STR>10:999108", // 身体好，活到了101岁
  "STR>7:999109", // 身体不错，90多岁无疾而终
  "STR>4:999110", // 身体不错，80多岁摔跤死亡
  "STR>0:999111", // 身体还可以，80多岁
  "STR>-3:999112", // 小病不断，活到79岁
  "STR>-6:999113", // 5年后查出癌症，2年后去世
  "STR>-20:999114", // 身体很差，很快就离世
];

const eventList = [
  {
    id: 999100,
    event: "你退休了，在学术上深入研究，成为了科学家。",
    branch: retireGameOver2,
    highlight: 1,
  },
  {
    id: 999101,
    event: "你退休了，一所民办学校返聘你为教授。",
    branch: retireGameOver2,
    highlight: 1,
  },
  {
    id: 999102,
    event: "你退休了，因为对创作感兴趣，成为了网络作家。",
    branch: retireGameOver2,
    highlight: 1,
  },
  {
    id: 999103,
    event: "你退休了，研究哲学，成为了哲学家。",
    branch: retireGameOver2,
    highlight: 1,
  },
  {
    id: 999104,
    event: "你退休了，依然活跃在网络上，成为了社交平台的红人。",
    branch: retireGameOver2,
    highlight: 1,
  },
  {
    id: 999105,
    event: "你退休了，去到处旅游，见识大好河山。",
    branch: retireGameOver2,
    highlight: 1,
  },
  {
    id: 999106,
    event: "你退休了，但是闲不住，自己创立了一家公司，成为老板。",
    branch: retireGameOver2,
    highlight: 1,
  },
  {
    id: 999107,
    event: "你退休了，在家安享晚年。",
    branch: retireGameOver2,
    highlight: 1,
  }, {
    id: 999108,
    event: "你的身体很好，活到了101岁，无疾而终。",
    NoRandom: 1,
    effect: {
      LIF: -1,
    },
  },{
    id: 999109,
    event: "你的身体不错，活到了90多岁，在梦中平静离世。",
    NoRandom: 1,
    effect: {
      LIF: -1,
    },
  },{
    id: 999110,
    event: "你的身体不错，80岁时不小心摔了一跤，之后身体不好，一年多后离世。",
    NoRandom: 1,
    effect: {
      LIF: -1,
    },
  },{
    id: 999111,
    event: "你的身体还可以，活到了79岁。",
    NoRandom: 1,
    effect: {
      LIF: -1,
    },
  },{
    id: 999112,
    event: "你小病不断，77岁后离世。",
    NoRandom: 1,
    effect: {
      LIF: -1,
    },
  },{
    id: 999113,
    event: "退休5年体检，你查出了癌症，2年后医治无效去世。",
    NoRandom: 1,
    effect: {
      LIF: -1,
    },
  },{
    id: 999114,
    event: "退休后身体不好，留下顽疾，不久之后就去世了。",
    NoRandom: 1,
    effect: {
      LIF: -1,
    },
  },{
    id: 999115,
    event: "离开软件行业后，你闲不住，成为开水团外卖的骑手，送外卖去了。",
    branch: retireGameOver2,
    highlight: 1,
  },
  {
    id: 700000,
    event: "你在好心人的帮助下从传销组织脱身，进了家小公司。",
  },
  {
    id: 700001,
    event: "生活开销有点大，你觉得手头拮据",
    effect: {
      MNY: -1,
    }
  },
  {
    id: 700002,
    event: "你一边打工，一边继续投简历",
    effect: {
      MNY: 1,
    }
  },{
    id: 700003,
    event: "迟迟找不到工作，你觉得有点丧",
    effect: {
      SPR: -2,
    }
  },{
    id: 700004,
    event: "你放弃了，决定去工地搬砖",
    NoRandom: 1,
    effect: {
      LIF: -1,
    },
    branch: [
      "STR<4:800000"
    ]
  },
  {
    id: 800000,
    event: "身体不好，搬砖时出了意外，死了",
    NoRandom: 1,
  },
  {
    id: 800001,
    event: "刚办完入职手续，警察来了，公司涉及非法贷款，所有人都被带走了，包括你。",
    effect: {
      LIF: -1,
    },
    NoRandom: 1,
    highlight: 1,
  },
  {
    id: 900000,
    event: "为了生活，你去工地搬砖了。",
    effect : {
        LIF: -1
    },
    NoRandom: 1,
    highlight: 1,
  }, {
    id: 900001,
    event: "为了生活，你在工地搬砖，但是身体不好，出意外死了。",
    effect : {
        LIF: -1
    },
    NoRandom: 1,
    highlight: 1,
  }, {
    id: 900002,
    event: "你意外继承了一大笔遗产，潇洒去了。",
    effect : {
        LIF: -1
    },
    NoRandom: 1,
    highlight: 1,
  }, {
    id: 900003,
    event: "你意外继承了一大笔遗产，收购了公司，天天PUA你原来的LD。",
    effect : {
        LIF: -1
    },
    NoRandom: 1,
    highlight: 1,
  }, {
    id: 900004,
    event: "你离职后用钱整容，进军演艺界，成为了三线明星。",
    effect : {
        LIF: -1
    },
    NoRandom: 1,
    highlight: 1,
  }, {
    id: 900005,
    event: "你离职后，继续做主播，成为了著名网红。",
    effect : {
        LIF: -1
    },
    NoRandom: 1,
    highlight: 1,
  }, {
    id: 900006,
    event: "你辞去工作，陪伴着深爱的他，一边做美妆主播，一边做家庭主妇。",
    effect : {
        LIF: -1
    },
    NoRandom: 1,
    highlight: 1,
  }, {
    id: 900007,
    event: "你离职后，日夜思念那个你放不下的男人，最终为了爱情，你义无反顾地去了泰国，成为真正的女人，嫁给了他，婚后过上了幸福的生活。",
    effect : {
        LIF: -1
    },
    NoRandom: 1,
    highlight: 1,
  }, {
    id: 900008,
    event: "还没等离职流程走完，就猝死在了公司。",
    effect : {
        LIF: -1
    },
    NoRandom: 1,
    highlight: 1,
  }, {
    id: 900009,
    event: "你回学校去继续深造，攻读了博士学位，成为了科学家。",
    effect : {
        LIF: -1
    },
    NoRandom: 1,
    highlight: 1,
  }, {
    id: 900010,
    event: "家里人托关系，介绍你去一所民办学校当了老师。",
    effect : {
        LIF: -1
    },
    NoRandom: 1,
    highlight: 1,
  }, {
    id: 900011,
    event: "离开公司，你挣扎了几个月，抑郁症越来越严重，自杀了。",
    effect : {
        LIF: -1
    },
    NoRandom: 1,
    highlight: 1,
  }, {
    id: 900012,
    event: "你凭借着高颜值，通过明星选秀，成为了影视明星。",
    effect : {
        LIF: -1
    },
    NoRandom: 1,
    highlight: 1,
  }, {
    id: 900013,
    event: "你的颜值实在太高了，一位霸道总裁看上你，在他猛烈追求下，你最终以身相许。",
    effect : {
        LIF: -1
    },
    NoRandom: 1,
    highlight: 1,
  },{
    id: 900014,
    event: "你的颜值实在太高了，一位霸道总裁看上你，在他猛烈追求下，你做了手术，最终以身相许。",
    effect : {
        LIF: -1
    },
    NoRandom: 1,
    highlight: 1,
  }, {
    id: 900015,
    event: "你欠了一堆外债，只能去给债主打工偿还。",
    effect : {
      LIF: -1
    },
    NoRandom: 1,
    highlight: 1,
  }, {
    id: 900016,
    event: "你欠下了这辈子都还不起的外债，只能靠颜值肉偿了。",
    effect : {
      LIF: -1
    },
    NoRandom: 1,
    highlight: 1,
  }, {
    id: 100000,
    event: "你离开了程序员这个行业，成为一名快递员。",
    effect : {
        LIF: -1
    },
    NoRandom: 1
  }, {
    id: 100001,
    event: "你毕业了，成为一名程序猿。",
    highlight: 1,
    exclude: "TLT?[1004, 1047]",
    // effect: {
    //   SPR: '1000!',
    // },
  }, {
    id: 100002,
    event: "你毕业了，成为一名程序媛。",
    highlight: 1,
    exclude:  "TLT?[1003,2024,1054]",
    // hook(property) {
    //   console.log(property);
    // }
  }, {
    id: 100003,
    event: "你加入了一家preA轮创业公司。",
    postEvent: "开始适应快节奏的工作。",
    include: "SPR>7", // 心态>7 才能加入
    effect: {
        MNY: 0,
        ENV: "2!",
    },
    exclude: conAlreadyHaveJob,
  }, {
    id: 100004,
    event: "你加入了一家A轮创业公司。",
    postEvent: "开始适应快节奏的工作。",
    include: "SPR>7", // 心态>7 才能加入
    effect: {
      MNY: 1,
      ENV: "2!",
    },
    exclude: conAlreadyHaveJob,
  }, {
    id: 100005,
    event: "你加入了一家B轮创业公司。",
    postEvent: "开始适应快节奏的工作。",
    include: "SPR>6", // 心态>6 才能加入
    effect: {
      MNY: 1,
      ENV: "3!",
    },
    exclude: conAlreadyHaveJob,
  }, {
    id: 100006,
    event: "你加入了一家C轮创业公司。",
    postEvent: "开始适应快节奏的工作。",
    include: "(SPR>5)&(INT>4)", // 心态>5，智商>4 才能加入
    effect: {
      MNY: 2,
      ENV: "3!",
    },
    exclude: conAlreadyHaveJob,
  }, {
    // 大厂要求高智商
    id: 100007,
    event: "你加入了一家大型互联网公司。",
    postEvent: "开始适应快节奏的工作。",
    include: "INT>5",
    effect: {
      MNY: 3,
      ENV: "4!",
    },
    exclude: `(${conAlreadyHaveJob})|(TLT?[1059])`,
  }, {
    // 国企看智商和形象
    id: 100008,
    event: "你加入了一家大型国企。",
    postEvent: "开始工作。",
    include: "(INT>4)&(CHR>4)",
    effect: {
      MNY: 2,
      SPR: 1,
      ENV: "5!",
    },
    exclude: `(${conAlreadyHaveJob})|(TLT?[1059])`,
  }, {
    id: 100009,
    event: "你加入了一家小公司，给大厂做外包。",
    postEvent: "开始工作。",
    exclude: conAlreadyHaveJob,
    effect: {
      ENV: "1!",
    }
  }, {
    id: 100010,
    event: "你加入了一家小公司，给客户定制沙发。",
    postEvent: "开始工作。",
    exclude: conAlreadyHaveJob,
    effect: {
      ENV: "1!",
    },
    highlight: 1,
  }, {
    id: 100011,
    event: "你加入了一家私人作坊。",
    postEvent: "开始工作。",
    exclude: conAlreadyHaveJob,
    effect: {
      MNY: -1,
      SPR: -1,
      ENV: "1!",
    }
  }, {
    id: 100021,
    event: "你加入了一家小公司，做互联网金融。",
    postEvent: "开始工作。",
    exclude: conAlreadyHaveJob,
    effect: {
      MNY: 1,
      SPR: 1,
      ENV: "1!",
    },
    branch: [
      "LCK<-5:800001"
    ]
  }, {
    // 智商太低会被骗入传销组织
    id: 100012,
    event: "你被骗入了传销组织。",
    postEvent: "开始工作。",
    effect: {
      MNY: -1,
      SPR: -1,
    },
    exclude: `(INT>3)|(${conAlreadyHaveJob})`,
    branch: [
      "EVT?[100001,100002]:700000"
    ]
  }, {
    // 智商太低，无人问津
    id: 100013,
    event: "你投了简历，但是无人问津",
    exclude:  `(INT>3)|(${conAlreadyHaveJob})`,
    branch: [
      "(NMY<-3|SPR<0):700004",
      "EVT?[100001,100002]:700001",
    ],
    highlight: 1,
  }, {
    // 智商太低，无人问津
    id: 100014,
    event: "你投了简历，但是无人问津",
    exclude:  `(INT>3)|(${conAlreadyHaveJob})`,
    branch: [
      "(NMY<-3|SPR<0):700004",
      "EVT?[100001,100002]:700002",
    ],
    highlight: 1,
  }, {
    // 智商太低，无人问津
    id: 100015,
    event: "你投了简历，但是无人问津",
    exclude:  `(INT>3)|(${conAlreadyHaveJob})`,
    branch: [
      "(NMY<-3|SPR<0):700004",
      "EVT?[100001,100002]:700003",
    ],
    highlight: 1,
  }, {
    id: 800004,
    event: "这是测试结局，不是真实结局！",
    effect: {
        MNY: -1,
        SPR: -1
    },
    branch: gameOver
  }, {
    id: 999999,
    event: "工作强度太大，猝死了。",
    exclude: "STR>6",
    effect : {
        LIF: -1
    },
    NoRandom: 1
  }, {
    id: 110001,
    event: "你接受了新员工培训。",
    exclude: "EVT?[110001,110002]",
    include: conAlreadyHaveJob,
  }, {
    id: 110002,
    event: "你接受了新员工培训。",
    postEvent: "学会了新的技能。",
    effect : {
        INT: 1
    },
    exclude: "EVT?[110001,110002]",
    include: `(INT>4)&(${conAlreadyHaveJob})`,
  }, {
    id: 120001,
    event: "LD欣赏你的能力，夸你能干。",
    include: "INT>5",
    branch: [
      '(LCK>-2)&(ENV<3):121666',
    ],
  }, {
    id: 121666,
    event: '这个月给你涨了点工资',
    effect : {
      MNY: 1
    },
  },
  {
    id: 120002,
    event: "你努力工作"
  }, {
    id: 120003,
    event: "注册了稀土掘金社区账号。",
    postEvent: "学习掘金文章，能力提升了。",
    effect : {
      INT: 1
    },
    exclude: "EVT?[120003]"
  }, {
    id: 120004,
    event: "总结工作经验，你的能力提升了。",
    effect: {
      INT: 1,
    },
    exclude: "INT>5",
  }, {
    id: 120005,
    event: "你接了一个紧急需求，连续加班一个月。",
    effect: {
      STR: -1,
    },
  }, {
    id: 120006,
    event: "最近工作压力太大，你觉得自己的学习跟不上。",
    effect: {
      INT: -1,
    },
  }, {
    id: 120007,
    event: "你接到任务，开发一个叫快脚的产品。",
    highlight: 1,
  }, {
    id: 120008,
    event: "你接到任务，开发一个叫抖乐的产品。",
    highlight: 1,
  }, {
    id: 120009,
    event: "你接到任务，开发一个叫小信的产品。",
    highlight: 1,
  }, {
    id: 120010,
    event: "你接到任务，开发一个叫有啊的电商网站。",
    highlight: 1,
  }, {
    id: 120011,
    event: "你接到任务，开发一个叫并汐汐的产品。",
    highlight: 1,
  }, {
    id: 120012,
    event: "你接到任务，开发一个叫冬瓜视频的产品。",
    highlight: 1,
  }, {
    id: 120013,
    event: "你接到任务，开发一个叫扣扣的聊天工具。",
    highlight: 1,
  }, {
    id: 120014,
    event: "你接到任务，开发一个叫三体的游戏。",
    highlight: 1,
  }, {
    id: 120015,
    event: "你接到任务，开发一个叫哒哒的打车软件。",
    highlight: 1,
  }, {
    id: 120016,
    event: "你接到任务，开发一个叫嘿嘿的匿名社交软件。",
    highlight: 1,
  }, {
    id: 130000,
    event: "中秋节到了，你用代码抢了两盒月饼。",
    highlight: 1,
    effect : {
        MNY: 1
    },
    include: "INT>6",
    exclude: "TLT?[1007]",
    branch: [
        "CHR<7:130001",
        "CHR>6:130002"
    ]
  }, {
    // 特殊结局，抢月饼
    id: 130001,
    event: "你因为抢月饼，被开除了。",
    effect : {
        LIF: -1
    }
  }, {
    id: 130002,
    event: "公司决定要开除你，但因为你长得好看，被保下来了。"
  }, 
  // ----------- 一些比较无聊的事件 --------------
  {
    id: 140001,
    event: "新买的桶丢了。"
  }, {
    id: 140002,
    event: "你左眼不停地跳，觉得可能有财运降临。",
    effect: {
      BLCK: 1
    }
  }, {
    id: 140003,
    event: "你右眼不停地跳，最近可能得小心一些。",
    effect: {
      BLCK: -1,
    }
  }, {
    id: 140004,
    event: "你觉得有点无聊。",
  }, {
    id: 140005,
    event: "你买了一辆自行车。",
  }, {
    id: 140006,
    event: "你买了一条毛巾。",
  }, {
    id: 140007,
    event: "国家宣布加强个人隐私保护。",
    exclude: "EVT?[140007]",
  }, {
    id: 140008,
    event: "你听说新来的菜狗同事比你总包多5W。",
    effect: {
      SPR: -1
    }
  }, {
    id: 140009,
    event: "这个月一直下雨，你考虑买一条独木船。",
  }, {
    id: 140010,
    event: "月末了，没什么事，今天摸鱼。",
  }, {
    id: 140011,
    event: "需求延期了，但没什么关系，因为产品妹子离职了。",
  }, {
    id: 140012,
    event: "这个月经常上班迟到，被LD批评了好几次。",
    effect: {
      SPR: -1
    }
  }, {
    id: 140013,
    event: "你的LD似乎很看中你。",
    exclude: 'EVT?[140013]',
  }, {
    id: 140014,
    event: "大家都很喜欢你，除了一个人，你的LD",
    exclude: 'EVT?[140014]',
  }, {
    id: 140015,
    event: "你写的一个bug导致一个小的线上问题，幸好及时解决了",
  }, 
  // --------- 颜值事件 ----------------------
  {
    id: 150000,
    event: "你由于高颜值，在公司成为万众瞩目的焦点",
    include: "CHR>6",
  }, {
    id: 150001,
    event: "你今天精心画了一个仙女妆，心情超好。",
    include: `(CHR>6)&(${conFemale2})`,
    exclude: 'EVT?[150001]',
    branch: [
      "EVT?[150024]:153000"
    ],
    effect: {
      SPR: 1,
    }
  },
  {
    id: 153000,
    event: "身边的同事惊呆了。"
  },
  {
    id: 150002,
    event: "你的颜值让同性都忍不住多看几眼。",
    include: "CHR>7",
  }, {
    id: 150003,
    event: "你的同事夸你妆容好看。",
    include: `(CHR>5)&(${conFemale2})`,
  }, {
    id: 150004,
    event: "越来越多的同事把你当做女生来对待。",
    include: `(CHR>5)&(EVT?[150024])`,
    exclude: 'EVT?[150023]'
  }, {
    id: 150005,
    event: "你身边的同事开始怀疑并私下讨论你的真实性别。",
    include: `EVT?[150027]`,
    exclude: 'EVT?[150005,150023]'
  }, {
    id: 150006,
    event: "你身边的同事打赌你其实是女扮男装，据说赔率已经接近1比100。",
    include: `EVT?[150024]`,
    exclude: 'EVT?[150006,150023]'
  }, {
    id: 150007,
    event: "有男同事频频对你献殷勤。",
    include: `(CHR>7)&(EVT?[150024,100002])`,
  }, {
    id: 150008,
    event: "你的化妆技术越来越好了",
    include: conFemale2,
    exclude: "(CHR>7)|(EVT?[150008])",
    effect: {
      CHR: 1,
    }
  }, {
    id: 150009,
    event: "你开始兼职做颜值主播",
    include: "CHR>6",
    exclude: "EVT?[150009]"
  }, {
    id: 150010,
    event: "你做颜值主播粉丝增长迅速",
    include: "(CHR>7)&(EVT?[150009])",
  }, {
    id: 150011,
    event: "你觉得自己越来越喜欢颜值主播这个行业",
    include: "(CHR>7)&(EVT?[150009])",
    effect: {
      SPR: 1,
    }
  }, {
    id: 150012,
    event: "你是平台当红主播，粉丝打赏收入超过你的薪水",
    include: "(CHR>8)&(EVT?[150009])",
    exclude: "EVT?[150012]",
    effect: {
      MNY: 2,
    }
  }, {
    id: 150013,
    event: "你觉得自己更适合做主播，决定转行全职做主播",
    include: "(CHR>8)&(INT<5)&(EVT?[150012])",
    branch: [
      "EVT?[150012]: 900005"
    ]
  }, {
    id: 150014,
    event: "有女同事频频对你献殷勤。",
    include: `(CHR>7)&(${conMale})`,
    exclude: 'EVT?[150023]'
  }, {
    id: 150015,
    event: "你本来去理发，结果被黑心整容机构忽悠去做了微整形。",
    highlight: 1,
    postEvent: "花了一大笔钱，好在颜值有些提升。",
    exclude: 'EVT?[150015]',
    effect: {
      CHR: 1,
      MNY: -1,
    }
  }, {
    id: 150016,
    event: "你画了一个桃花妆，美美哒",
    include: `(CHR>4)&(${conFemale2})`,
    exclude: 'EVT?[150016]',
  }, {
    id: 150017,
    event: "你画了一个嫦娥妆，美美哒",
    include: `(CHR>4)&(${conFemale2})`,
    exclude: 'EVT?[150017]',
  }, {
    id: 150018,
    event: "因为你的高跟鞋磨脚，脚踝受了伤",
    include: `(CHR>4)&(${conFemale2})`,
    exclude: "EVT?[150018]",
    effect: {
      STR: -1,
    }
  },
  {
    id: 150019,
    event: "一位风度翩翩，家境优越的男子向你发起猛烈追求。",
    include: `(CHR>4)&(${conFemale2})`,
    exclude: "EVT?[150019, 510004]",
    branch: [
      "LCK>5:151002",
      "LCK>0:151001",
      "LCK<1:151000",
    ],
    // hook(prop) {
    //   console.log('>', prop.get('LCK'));
    // }
  },
  {
    id: 150020,
    event: "经过一段时间的交往，你和他的感情加深了。",
    include: "EVT?[151002]",
    exclude: "EVT?[150020,220000]",
  },
  {
    id: 150021,
    event: "你爱他已经爱得轰轰烈烈，难舍难分。",
    include: "EVT?[150020]",
    exclude: "EVT?[150021,220000]",
  },
  {
    id: 150022,
    event: "你还是难以下定决心，毕竟一旦决定了就再也无法回头。",
    include: "EVT?[150029]",
    exclude: "EVT?[150022]",
    branch: [
      'EVT?[220000]:152002',
      'LCK>-100:152001',
    ],
  },
  {
    id: 152001,
    event: '你询问你的闺蜜们，她们大部分支持你走出这一步，觉得你会是她们的好姐妹。',
  },
  {
    id: 152002,
    event: '你把苦恼告诉你的妻子，意外的是你的妻子完全支持你，她觉得就算和你做姐妹也很幸福。',
  },
  {
    id: 150023,
    event: "你终于义无反顾，请假去做了性别纠正手术，成为了真正的女人。",
    highlight: 1,
    postEvent: "你回来后，公司的同事、身边的朋友都接纳了你，你觉得获得了新生。",
    include: "EVT?[150022]",
    exclude: "EVT?[150023]",
    effect: {
      SPR: 2,
    },
  },
  {
    id: 151000,
    event: "不是你喜欢的类型，你婉拒了他。"
  },
  {
    id: 151001,
    event: "你有点心动，但还是拒绝了他。"
  },
  {
    id: 151002,
    event: "你有点小窃喜，打算交往一段时间看看。"
  },
  {
    id: 150024,
    event: "你决定出柜，日常穿女装上班。",
    highlight: 1,
    include: "(CHR>5)&(TLT?[2024])&(EVT?[150027])",
    exclude: "EVT?[150024]",
    effect: {
      SPR: 1,
    }
  },
  {
    id: 150025,
    event: "部门要聚会，因为你的颜值，同事让你穿女装，你嘴上说不愿意，心中却有些小窃喜。",
    include: "(CHR>5)&(TLT?[2024])",
    exclude: "EVT?[150025]",
  },
  {
    id: 150026,
    event: "聚会那天，你穿了一袭黑色长裙，脚踩红色高跟鞋，肤白貌美大长腿，惊艳了全场。",
    highlight: 1,
    include: "(CHR>5)&(TLT?[2024])&(EVT?[150025])",
    exclude: "EVT?[150026]",
  },
  {
    id: 150027,
    event: "穿女装只有第一次和无数次。",
    highlight: 1,
    postEvent: "你越来越喜欢穿女装了。",
    include: "(CHR>5)&(TLT?[2024])&(EVT?[150026])",
    exclude: "EVT?[150027]",
  },
  {
    id: 150028,
    event: "连你自己也开始怀疑自己的性别，不知道自己究竟是不是真的应该更适合做女孩子。",
    highlight: 1,
    postEvent: "你身边的同事基本上已经完全把你当做女人。",
    include: "(CHR>5)&(TLT?[2024])&(EVT?[150024])",
    exclude: "EVT?[150028]",
  },
  {
    id: 150029,
    event: "你最近性别焦虑有点严重。",
    postEvent: "你在想是不是该下最终决定了。",
    include: "(CHR>5)&(TLT?[2024])&(EVT?[150028])",
    exclude: "EVT?[150029]",
    effect: {
      SPR: -1,
    }
  },
  // ---- 智商事件 -----
  {
    id: 160000,
    event: "你的工作能力让同事感到敬佩。",
    exclude: "EVT?[160000]",
    include: "INT>6",
  },

  // ---- 收入事件 -----

  // ---- 健康事件 -----
  {
    id: 440000,
    event: '由于长时间坐着工作，你得了颈椎病。',
    include: 'AGE>60',
    exclude: '(TLT?[1044])|(EVT?[440000])',
    effect: {
      STR: -1,
    }
  },
  {
    id: 440001,
    event: '你的颈椎病越来越严重。',
    include: 'EVT?[440000]',
    exclude: '(TLT?[1044])|(EVT?[440001,440002])',
    effect: {
      STR: -1,
    }
  },
  {
    id: 440002,
    event: '同事送了你一本《颈椎康复指南》。',
    include: '(TLT?[1037])&(EVT?[440000,440001])',
    exclude: 'EVT?[440002]',
    effect: {
      STR: 1,
    }
  },

  // ---- 晋升事件 -----
  {
    id: 390001,
    event: 'LD看你工作努力，给你提名晋升。',
    highlight: 1,
    exclude: '(ENV<3)|(WRK<10)|(EVT?[1110000,391012])', // 小公司不配晋升 
    branch: [
      '(INT<5)&(LCK<5):391000',
      '(INT<4)&(LCK<6):391000',
      '(INT<3)&(LCK<7):391000',
      '(INT<2)&(LCK<8):391000',
      '(INT<1)&(LCK<9):391000',

      '(TLT?[1045])&(INT>9)&(LCK>0)&(EVT?[391011]):391012',
      '(TLT?[1045])&(INT>8)&(LCK>0)&(EVT?[391011]):391000',
      '(TLT?[1045])&(INT>8)&(LCK>0)&(EVT?[391010]):391011',
      '(TLT?[1045])&(INT>7)&(LCK>-1)&(EVT?[391010]):391000',
      '(TLT?[1045])&(INT>7)&(LCK>-1)&(EVT?[391009]):391010',
      '(TLT?[1045])&(INT>6)&(LCK>-1)&(EVT?[391009]):391000',
      '(TLT?[1045])&(INT>6)&(LCK>-1)&(EVT?[391008]):391009',
      '(TLT?[1045])&(INT>5)&(LCK>-3)&(EVT?[391008]):391000',
      '(TLT?[1045])&(INT>5)&(LCK>-3)&(EVT?[391007]):391008',
      '(TLT?[1045])&(INT>4)&(LCK>-3)&(EVT?[391007]):391000',
      '(TLT?[1045])&(INT>4)&(LCK>-3)&(EVT?[391006]):391007',
      '(TLT?[1045])&(INT>3)&(LCK>-5)&(EVT?[391006]):391000',  // 已经是P6
      '(TLT?[1045])&(INT>3)&(LCK>-5)&(EVT?[391005]):391006',
      '(TLT?[1045])&(INT>-100)&(LCK>-7)&(EVT?[391005]):391000',
      '(TLT?[1045])&(INT>-100)&(LCK>-7):391005',

      '(INT>9)&(LCK>3)&(EVT?[391011]):391012',
      '(INT>8)&(LCK>3)&(EVT?[391011]):391000',
      '(INT>8)&(LCK>3)&(EVT?[391010]):391011',
      '(INT>7)&(LCK>0)&(EVT?[391010]):391000',
      '(INT>7)&(LCK>0)&(EVT?[391009]):391010',
      '(INT>6)&(LCK>0)&(EVT?[391009]):391000',
      '(INT>6)&(LCK>0)&(EVT?[391008]):391009',
      '(INT>5)&(LCK>-1)&(EVT?[391008]):391000',
      '(INT>5)&(LCK>-1)&(EVT?[391007]):391008',
      '(INT>4)&(LCK>-1)&(EVT?[391007]):391000',
      '(INT>4)&(LCK>-1)&(EVT?[391006]):391007',
      '(INT>3)&(LCK>-2)&(EVT?[391006]):391000',
      '(INT>3)&(LCK>-2)&(EVT?[391005]):391006',
      '(INT>-100)&(LCK>-3)&(EVT?[391005]):391000',
      '(INT>-100)&(LCK>-3):391005',
      '(LCK<-2):391001',
      '(LCK<-4):391002',
      '(LCK<-6):391003',
      '(LCK<-8):391004',
      '(LCK>-100):391000',
    ],
  },
  {
    id: 391000,
    event: '很遗憾，你没有通过晋升评审，晋升失败。',
  },{
    id: 391001,
    event: '晋升答辩时，一个评委看你不顺眼，晋升失败。',
  },{
    id: 391002,
    event: '晋升答辩时，你做错了一道算法题，晋升失败。',
  },{
    id: 391003,
    event: '晋升答辩时，评委打起架来，晋升失败。',
  },{
    id: 391004,
    event: '晋升答辩时，一个评委请假了，没能约上时间，晋升失败。',
  },{
    id: 391005,
    event: '晋升成功，你升到P5。',
    branch: [
      'LCK>5:391013',
    ]
  },{
    id: 391006,
    event: '晋升成功，你升到P6。',
    branch: [
      'LCK>5:391013',
    ]
  },{
    id: 391007,
    event: '晋升成功，你升到P7。',
    branch: [
      'LCK>4:391013',
    ]
  },{
    id: 391008,
    event: '晋升成功，你升到P8。',
    branch: [
      'LCK>3:391013',
    ]
  },{
    id: 391009,
    event: '晋升成功，你升到P9。',
    branch: [
      'LCK>2:391013',
    ]
  },{
    id: 391010,
    event: '晋升成功，你升到P10。',
    branch: [
      'LCK>1:391013',
    ]
  },{
    id: 391011,
    event: '晋升成功，你升到P11。',
    branch: [
      'LCK>0:391013',
    ]
  },{
    id: 391012,
    event: '晋升成功，你升到P12。',
    branch: [
      'LCK>-1:391013',
    ]
  },{
    id: 391013,
    event: '工资也增加了。',
    effect: {
      MNY: 1,
    }
  },


  // ---- 心态事件 -----
  {
    id: 270000,
    event: '你觉得自己很丧，情绪低落。',
    include: 'SPR<1',
    branch: [
      "LCK>7:271000"
    ]
  },
  {
    id: 271000,
    event: '你请了几天假，调整了心情。',
    effect: {
      SPR: 1,
    }
  },
  {
    id: 271001,
    event: '你情绪低落，觉得很压抑。',
    effect: {
      SPR: -1,
    } 
  },
  {
    id: 271002,
    event: '恶劣心情让你气质不佳，颜值受损。',
    effect: {
      CHR: -1,
    }
  },
  {
    id:270001,
    event: '见你状态不佳，LD和HRBP给你约了心理咨询，帮你调节心情。',
    include: '(SPR<2)&(ENV>3)',
    effect: {
      SPR: 1,
    }
  },{
    id:270002,
    event: '和同事因为小事无缘无故大吵了一架。',
    include: 'SPR<4',
    branch: [
      "LCK<-3:271001",
    ]
  },{
    id:270003,
    event: '你愤世嫉俗，觉得整个世界都在和你作对。',
    include: 'SPR<0',
  },{
    id:270004,
    event: '你觉得上班如同上坟。',
    include: 'SPR<-1',
  },{
    id:270005,
    event: '你最近压力很大，总是掉头发。',
    include: 'SPR<-1',
    branch: [
      "LCK<-7:271002",
    ]
  },
  // -------- 婚姻，爱情 ----------------------
  {
    id: 220000,
    event: "你结婚了，有了自己的家庭。", 
    exclude: "EVT?[220000,150021]",
  }, {
    id: 220001,
    event: "你的妻子告诉你她怀孕了。",
    include: "(EVT?[100001])&(EVT?[220000])",
    exclude: "(PRG>0)|(PRG<0)|(EVT?[220001])|(EVT?[150023])|(EVT?[510004])",
    effect: {
      PRG: 1
    }
  }, {
    id: 220002,
    event: "你发现自己怀孕了。",
    include: "(EVT?[100002])&(EVT?[220000])",
    exclude: "(PRG>0)|(PRG<0)|(EVT?[220002])",
    effect: {
      PRG: 1
    }
  }, {
    id: 220003,
    event: "你的女儿出生了。",
    include: "(EVT?[220000])&(PRG>9)",
    exclude: "EVT?[220003, 220004]",
    effect: {
      PRG: "-2!",
      SPR: 1,
    }
  }, {
    id: 220004,
    event: "你的儿子出生了。",
    include: "(EVT?[220000])&(PRG>9)",
    exclude: "EVT?[220003, 220004]",
    effect: {
      PRG: "-2!",
      SPR: 1,
    }
  }, {
    id: 220005,
    event: "因为怀孕，你觉得有点累。",
    include: "(EVT?[100002])&(PRG>0)",
    effect: {
      STR: -1,
    }
  }, {
    id: 220006,
    event: "因为怀孕心情不好，你和另一半吵架了。",
    include: "(EVT?[100002])&(PRG>0)",
    effect: {
      SPR: -1,
    }
  }, {
    id: 220007,
    event: "因为怀孕，胃口有点差。",
    include: "(EVT?[100002])&(PRG>0)",
    effect: {
      STR: -1,
    }
  }, {
    id: 220008,
    event: "想到小生命即将出生，你觉得自己充满干劲。",
    include: "PRG>0",
    effect: {
      SPR: 1,
    }
  }, {
    id: 220009,
    event: "你向公司申请了产假。",
    include: "(EVT?[100002])&(PRG=8)",
  }, {
    id: 220010,
    event: "休产假中...",
    include: "(EVT?[100002])&(PRG>8|PRG<0)",
    exclude: "PRG>9",
    branch: [
      "LCK<0:221000"
    ]
  },
  {
    id: 220015,
    event: "工作不顺，你的家庭矛盾不断。",
    include: "(EVT?[220000])&(SPR<4)",
    effect: {
      SPR: -1
    }
  },{
    id: 220016,
    event: "你的另一半很爱你，你觉得很幸福。",
    include: "(EVT?[220000])&(SPR>5)",
    effect: {
      SPR: 1
    }
  },{
    id: 220017,
    event: "你的另一半非常尊重你，家里的大小事情都让你做主。",
    include: "(EVT?[220000])&(INT>5)",
  },
  {
    id: 221000,
    event: "你听说同事接手了原本你负责的比较重要的工作。",
    exclude: "EVT?[221000]",
    effect: {
      SPR: -1
    }
  },
  // 跳槽 && 结局
  {
    id: 230000,
    event: "你觉得在这家公司干得实在太累了，打算跳槽。",
    include: "(WRK>3)&(STR<3)",
    exclude: "EVT?[1110000]",
    branch: jump2,
  },
  {
    id: 230001,
    event: "你觉得在这家公司干得不开心，打算跳槽。",
    include: "(WRK>3)&(SPR<3)",
    exclude: "EVT?[1110000]",
    branch: jump1,
  },
  {
    id: 230002,
    event: "你入不敷出，干不下去了。",
    include: "(WRK>3)&(MNY<-3)",
    branch: gameOver,
  },
  {
    id: 230003,
    event: "你的身体实在受不了，干不下去了。",
    include: "(WRK>3)&(STR<-3)",
    branch: gameOver,
  },
  {
    id: 230004,
    event: "你精神抑郁，不想干了。",
    include: "(WRK>3)&(SPR<-3)",
    branch: gameOver,
  },
  {
    id: 230005,
    event: "你在这家公司呆久了，觉得无聊，准备跳槽。",
    include: "WRK>30",
    exclude: "EVT?[1110000]",
    branch: jump1,
  },
  {
    id: 230006,
    event: "你的颜值实在太逆天了，这家公司已经承受不起。",
    highlight: 1,
    include: "(WRK>30)&(CHR>12)",
    exclude: "EVT?[1110000]",
    branch: jump1,
  },
  {
    id: 231000,
    event: "你换到一家大公司，涨了薪水，也不那么累了。",
    effect: {
      STR: 2,
      MNY: 1,
      WRK: "0!",
      ENV: "3!",
      JMP: 1,
    }
  }, {
    id: 231001,
    event: "你换到一家国企，钱虽然少了，但轻松了不少。",
    effect: {
      STR: 3,
      MNY: -1,
      WRK: "0!",
      ENV: "5!",
      JMP: 1,
    }
  }, {
    id: 231002,
    event: "你换到一家C轮公司，涨了一点薪水。",
    effect: {
      STR: 1,
      MNY: 1,
      WRK: "0!",
      ENV: "3!",
      JMP: 1,
    }
  }, {
    id: 231003,
    event: "你换到一家B轮公司，薪水基本没涨。",
    effect: {
      STR: 1,
      WRK: "0!",
      ENV: "2!",
      JMP: 1,
    }
  }, {
    id: 231004,
    event: "为了发展，你降薪去了一家大公司。",
    effect: {
      STR: 1,
      MNY: -1,
      WRK: "0!",
      ENV: "3!",
      JMP: 1,
    }
  }, {
    id: 231005,
    event: "你发现工作没那么好找，你被迫降薪去了一家小公司。",
    effect: {
      STR: 1,
      MNY: -2,
      WRK: "0!",
      ENV: "1!",
      JMP: 1,
    }
  }, {
    id: 231006,
    event: "你没找到满意的工作，只好又回到原公司，还被降薪了。",
    effect: {
      STR: 1,
      MNY: -2,
      WRK: "0!",
      JMP: 1,
    }
  }, {
    id: 231007,
    event: "你找不到工作，原公司也不要你，无奈离开了软件行业。",
    branch: gameOver,
  },{
    id: 231008,
    event: "你没找到新工作，放弃跳槽。",
  }, {
    id: 231009,
    event: "听说你在找工作，老板给你加薪，挽留了你。",
    effect: {
      STR: 1,
      MNY: 1,
    }
  },
  {
    id: 241000,
    event: "你换到一家大公司，涨了薪水，也不那么累了。",
    effect: {
      SPR: 2,
      MNY: 1,
      WRK: "0!",
      ENV: "4!",
      JMP: 1,
    }
  }, {
    id: 241001,
    event: "你换到一家国企，钱虽然少了，但轻松了不少。",
    effect: {
      SPR: 3,
      MNY: -1,
      WRK: "0!",
      ENV: "5!",
      JMP: 1,
    }
  }, {
    id: 241002,
    event: "你换到一家C轮公司，涨了一点薪水。",
    effect: {
      SPR: 1,
      MNY: 1,
      WRK: "0!",
      ENV: "3!",
      JMP: 1,
    }
  }, {
    id: 241003,
    event: "你换到一家B轮公司，薪水基本没涨。",
    effect: {
      SPR: 1,
      WRK: "0!",
      ENV: "2!",
      JMP: 1,
    }
  }, {
    id: 241004,
    event: "为了发展，你降薪去了一家大公司。",
    effect: {
      SPR: 1,
      MNY: -1,
      WRK: "0!",
      ENV: "3!",
      JMP: 1,
    }
  }, {
    id: 241005,
    event: "你发现工作没那么好找，你被迫降薪去了一家小公司。",
    effect: {
      SPR: 1,
      MNY: -2,
      WRK: "0!",
      ENV: "1!",
      JMP: 1,
    }
  }, {
    id: 241006,
    event: "你没找到满意的工作，只好又回到原公司，还被降薪了。",
    effect: {
      SPR: 1,
      MNY: -2,
      WRK: "0!",
      JMP: 1,
    }
  }, {
    id: 241007,
    event: "你找不到工作，原公司也不要你，无奈离开了软件行业。",
    branch: gameOver
  }, {
    id: 241008,
    event: "你没找到新工作，放弃跳槽。",
  }, {
    id: 241009,
    event: "听说你在找工作，老板给你加薪，挽留了你。",
    effect: {
      SPR: 1,
      MNY: 1,
    }
  },
  // --------------- 工作相关 ---------------
  {
    id: 300000,
    event: "LD通知你周六加班。",
    exclude: "ENV=5",
    effect: {
      SPR: -1,
    }
  }, {
    id: 300001,
    event: "连续通宵了三个晚上，身体有些吃不消。",
    exclude: "ENV=5",
    effect: {
      STR: -1,
    }
  }, {
    id: 300002,
    event: "工作之余去健身。",
    exclude: "ENV=1",
    effect: {
      STR: 1,
    }
  }, {
    id: 300003,
    event: "LD组织团建，去做了全套SPA。",
    exclude: "ENV=1",
    effect: {
      SPR: 1,
    }
  }, {
    id: 300004,
    event: "公司里有许多好看的妹纸，每天工作心情愉悦。",
    effect: {
      SPR: 1,
    }
  }, {
    id: 300005,
    event: "和PM大吵了一架。",
    effect: {
      SPR: -1,
    }
  },  {
    id: 300006,
    event: "新需求的文档乱得很，看得你头昏脑胀。",
    exclude: "ENV>3",
    effect: {
      SPR: -1,
    }
  }, {
    id: 300007,
    event: "这周要集体加班，你推掉了周末的约会。",
    exclude: "ENV=5",
    effect: {
      SPR: -1,
    }
  }, {
    id: 300008,
    event: "你写出了一个严重bug，被扣掉了一部分奖金。",
    exclude: "TLT?[1046]",
    effect: {
      MNY: -1,
    }
  }, {
    id: 300009,
    event: "这个月项目完成得不错，LD给了你额外奖金。",
    effect: {
      MNY: 1,
    }
  }, {
    id: 300010,
    event: "你写错了一个逻辑分支，歪打正着解决了一个陈年的bug。",
    effect: {
      SPR: 1,
    }
  }, {
    id: 300011,
    event: "每天有开不完的会，你觉得很烦。",
    include: "ENV>3",
    effect: {
      SPR: -1,
    }
  }, {
    id: 300012,
    event: "你的LD没什么本事，却经常PUA你。",
    exclude: "TLT?[1061]",
    effect: {
      SPR: -1,
    }
  }, {
    id: 300013,
    event: "你的LD没什么本事，却经常PUA你。",
    include: "TLT?[1061]",
  }, {
    id: 300014,
    event: "你觉得在这家公司里学不到什么东西了。",
    include: "WRK>15",
    effect: {
      SPR: -1,
    }
  },

  // 健康、头发量
  {
    id: 500000,
    event: "你拼命工作，经常觉得睡眠不足。",
    exclude: "(ENV=5)|(EVT?[510001])",
    include: "AGE>12",
    branch: [
      `(${conMale})&(LCK<3)&(AGE>18)&(EVT?[510000]):510001`,
      `(${conFemale2})&(LCK<-5)&(AGE>18)&(EVT?[510000]):510001`,
      `(${conMale})&(LCK<3)&(AGE>18):510000`,
      `(${conFemale2})&(LCK<-5)&(AGE>18):510000`, // 女性掉发的情况少一些
    ]
  },
  {
    id: 510000,
    event: "你的发际线越来越高，颜值不再。",
    effect: {
      CHR: -1,
    }
  },
  {
    id: 510001,
    event: "你的头发越来越少了",
    effect: {
      CHR: -1
    }
  },
  {
    id: 500001,
    event: "你花大笔钱去植发，以拯救有点绷不住的颜值。",
    include: "(EVT?[510001])&(MNY>4)",
    exclude: "EVT?[500002]",
    effect: {
      CHR: 1,
      MNY: -2,
    }
  }, {
    id: 500002,
    event: "你谢顶了。",
    include: "EVT?[510001]",
    exclude: "(TLT?[1017])|(EVT?[500002])",
    effect: {
      CHR: -2,
    },
    branch: [
      `${conFemale2}:510002`,
    ]
  },
  {
    id: 510002,
    event: "不得不戴假发上班。",
    effect: {
      SPR: -1,
      CHR: 1,
    }
  }, {
    id: 500003,
    event: "自媒体的砖家说，服用雌激素可以增加发量。",
    include: "EVT?[500002]",
    exclude: "EVT?[500003]",
    branch: [
      `(INT<5)&(${conFemale2}):510003`
    ]
  },
  {
    id: 510003,
    event: "你决定试一试效果。",
  },
  {
    id: 500004,
    event: "雌激素果然有效果。",
    postEvent: "你加大了药量。",
    include: "EVT?[510003]",
    exclude: "EVT?[500004]",
    effect: {
      CHR: 1,
    }
  }, {
    id: 500005,
    event: "外来激素破坏了身体的内分泌平衡。",
    postEvent: "你觉得自己身体越来越差。",
    include: "EVT?[500004]",
    exclude: "EVT?[500005]",
    effect: {
      STR: -2,
    },
    branch: [
      `EVT?[150024]:510004`
    ]
  },
  {
    id: 510004,
    event: "医生说激素破坏了你的男性功能，建议你做手术。",
    postEvent: "你无奈做了性别纠正手术，成为了女性。",
    highlight: 1,
  },
  // 周年 
  {
    id: 600000,
    event: "今天是你入职一周年，周围同事向你表示了祝贺。",
    exclude: "ENV<2",
    include: "WRK=13",
  },
  {
    id: 600001,
    event: "今天是你入职两周年，周围同事向你表示了祝贺。",
    exclude: "ENV<2",
    include: "WRK=25",
  },
  {
    id: 600002,
    event: "今天是你入职三周年，公司为你准备了一份礼物。",
    exclude: "ENV<2",
    include: "WRK=37",
    effect: {
      SPR: 1,
    }
  },
  {
    id: 600003,
    event: "今天是你入职四周年，公司为你准备了一份礼物。",
    exclude: "ENV<2",
    include: "WRK=49",
  },
  {
    id: 600004,
    event: "今天是你入职五周年，公司为你准备了一份礼物。",
    exclude: "ENV<2",
    include: "WRK=61",
  },
  // 晋升

  // 工资、经济
  {
    id: 400000,
    event: "公司普调，给你涨了一点薪水。",
    exclude: "(WRK<6)|(ENV<3)|(EVT?[1110000])",
    branch: [
      "LCK>6:410006",
      "LCK>3:410001",
      "LCK>1:410002",
      "LCK>-1:410003",
      "LCK>-4:410004",
      "LCK<-3:410005",
    ],
  }, {
    id: 400001,
    event: "你今年的绩效不错，公司给你涨了许多薪水。",
    exclude: "(WRK<6)|(ENV<3)|(INT<4)|(EVT?[1110000])",
    effect: {
      MNY: 2,
    },
  }, {
    id: 400002,
    event: "你今年的绩效不理想，但是公司还是你涨了一点薪水。",
    exclude: "(WRK<6)|(ENV<3)|(EVT?[1110000])",
    branch: [
      "LCK>6:410006",
      "(LCK>3)&(EVT?[400005,400105]):410006",
      "LCK>3:410001",
      "LCK>1:410002",
      "LCK>-1:410003",
      "LCK>-4:410004",
      "LCK<-3:410005",
    ],
  }, {
    id: 400003,
    event: "你今年的绩效不理想，公司没有给你涨薪水。",
    exclude: "(WRK<6)|(ENV<3)|(EVT?[1110000])",
  },
  {
    id: 410001,
    event: "你的房东把房租提高了，基本上等于没涨。",
  },
  {
    id: 410002,
    event: "扣完税，基本上等于没涨。",
  },
  {
    id: 410003,
    event: "但你养了一只猫，开支增大了。",
  },
  {
    id: 410004,
    event: "物价上涨了，基本上等于没涨。",
  },
  {
    id: 410005,
    event: "你购买了懒投资，结果被坑惨了。",
    highlight: 1,
    exclude: 'TLT?[1015]',
    effect: {
      MNY: -1,
    }
  },{
    id: 410006,
    event: "你到手的钱稍微多了一些，手头宽裕了。",
    effect: {
      MNY: 1,
    }
  },
  {
    id: 400004,
    event: "你觉得房价迟早还要涨，考虑买房。",
    include: '(MNY>3)|(TLT?[1050])',
    exclude: '(EVT?[400004])|(TLT?[1012])',
  },
  {
    id: 400005,
    event: '你终于挑好了中意的房子，办理贷款买了房。',
    postEvent: '每个月开始还房贷',
    include: 'EVT?[400004]',
    exclude: '(EVT?[400005,400105])|(MNY>5)',
    effect: {
      MNY: -2,
    }
  },
  {
    id: 400105,
    event: '你终于挑好了中意的房子，付了全款。',
    include: 'EVT?[400004]',
    exclude: '(EVT?[400005,400105])|(MNY<6)',
  },
  {
    id: 400006,
    event: '经济状况不好，每个月还要还房贷，你觉得压力有点大。',
    include: '(EVT?[400005])&(MNY<3)',
    exclude: '(EVT?[400006])|(TLT?[1058])',
    effect: {
      SPR: -1,
    }
  },
  {
    id: 400007,
    event: '房价上涨了，虽然你的生活没什么实际的改变，但是资产增加了，还是有点开心。',
    include: 'EVT?[400005,400015]',
    exclude: 'EVT?[400007]',
    effect: {
      SPR: 1,
    }
  },
  {
    id: 400008,
    event: '房价不断上涨，工资不涨，你有点焦虑。',
    exclude: '(EVT?[400005,400105])|(TLT?[1012,1058])',
    effect: {
      SPR: -1,
    }
  },
  {
    id: 400009,
    event: '你觉得最近股市还不错，投了点小钱进去。',
    include: '(MNY>3)|(TLT?[1013])',
    exclude: '(EVT?[400009])|(TLT?[1015])',
    effect: {
      MNY: -1,
    }
  },
  {
    id: 400010,
    event: '你在股市一路高抛低吸，一顿折腾。。。',
    include: 'EVT?[400009]',
    exclude: 'EVT?[400010]',
    branch: [
      'LCK>5:420003',
      '(LCK>2)&(TLT?[1014]):420003',
      'LCK>1:420002',
      '(LCK>-2)&(TLT?[1014]):420002',
      'LCK>-3:420000',
      'LCK>-6:420001',
      'LCK>-100:420004'
    ]
  }, {
    id: 420000,
    event: '你亏了钱，幸好不算太多，只是本金没了。',
  },
  {
    id: 420001,
    event: '由于加了杠杠，你亏了一大笔钱。',
    effect: {
      MNY: -2,
      SPR: -1,
    }
  },
  {
    id: 420002,
    event: '你小赚一笔',
    effect: {
      MNY: 2,
    }
  },
  {
    id: 420003,
    event: '你赚到了钱，本金翻了好几倍',
    effect: {
      MNY: 3,
      SPR: 1,
    }
  },
  {
    id: 420004,
    event: '你重仓买的股票扇贝跑了，业绩变脸，面临退市。',
    highlight: 1,
    effect: {
      MNY: -1,
    }
  },
  {
    id: 400011,
    event: '你心灰意冷，决定此生不再碰股市。',
    include: 'EVT?[420004, 420001]',
    exclude: '(TLT?[1013])|(EVT?[400011,400012])',
  },
  {
    id: 400012,
    event: '你继续投钱进股市。',
    include: 'EVT?[400010]',
    exclude: 'EVT?[400011,400012]',
    effect: {
      MNY: -2
    }
  },
  {
    id: 400013,
    event: '你在股市一顿操作猛如虎。',
    include: 'EVT?[400012]',
    exclude: 'EVT?[400013]',
    branch: [
      'LCK>5:420006',
      '(LCK>2)&(TLT?[1014]):420006',
      'LCK>1:420005',
      '(LCK>-2)&(TLT?[1014]):420005',
      'LCK>-3:420000',
      'LCK>-6:420001',
      'LCK>-100:420004'
    ],
  },
  {
    id: 420005,
    event: '你小赚一笔。',
    effect: {
      MNY: 3,
    }
  },
  {
    id: 420006,
    event: '你赚到了钱，本金翻了好几倍。',
    effect: {
      MNY: 5,
      SPR: 1,
    }
  },
  {
    id: 400014,
    event: '你继续投钱进股市。',
    include: 'EVT?[400013]',
    exclude: 'EVT?[400011,400014]',
    effect: {
      MNY: -3
    }
  },
  {
    id: 400015,
    event: '你在股市一顿操作猛如虎。',
    include: 'EVT?[400014]',
    exclude: 'EVT?[400015]',
    branch: [
      'LCK>5:420008',
      '(LCK>2)&(TLT?[1014]):420008',
      'LCK>1:420007',
      '(LCK>-2)&(TLT?[1014]):420007',
      'LCK>-3:420000',
      'LCK>-6:420001',
      'LCK<-8:420009',
      'LCK>-100:420004'
    ],
  },
  {
    id: 400016,
    event: '你在股市折腾的头破血流，最终跳楼自杀了。',
    include: '(EVT?[420009])&(MNY<-3)&(SPR<-1)',
    effect: {
      LIF: -1,
    }
  },
  {
    id: 420007,
    event: '你小赚一笔。',
    effect: {
      MNY: 4,
    }
  },
  {
    id: 420008,
    event: '你赚到了钱，本金翻了好几倍。',
    effect: {
      MNY: 7,
      SPR: 1,
    }
  },
  {
    id: 420009,
    event: '你遇上股市黑天鹅，血本无归，负债累累。',
    effect: {
      MNY: -7,
      SPR: -3,
    }
  },
  {
    id: 400017,
    event: '你考了驾照，买了辆宝马。',
    include: 'MNY>4',
    exclude: 'EVT?[400017]',
  },
  // TODO: 结婚后开销越来越大，有孩子后开销越来越大
  // 趣味---
  {
    id: 850000,
    event: 'LD夸你长得好看。',
    postEvent: '对你说，你那么好看，为什么不转前端？',
    highlight: 1,
    exclude: 'CHR<6',
  },
  {
    id: 850001,
    event: 'LD夸你长得好看。',
    postEvent: '对你说，你那么好看，为什么不转后端？',
    highlight: 1,
    exclude: 'CHR<6',
  },
  {
    id: 850002,
    event: '你参与了一个大型项目，用火星文写一个论坛。',
  },
  {
    id: 850003,
    event: 'LD对你说，上一个不写需求文档的产品经理被枪毙了。',
  },
  {
    id: 850004,
    event: '同事对你说，写代码不写注释会倒霉的。',
  },
  {
    id: 850005,
    event: '听说隔壁小公司把人骗去东南亚，',
    postEvent: '程序员被枪顶着头开发菠菜网站。'
  },
  {
    id: 850006,
    event: '你接了一个秘密项目，给钢铁侠开发一款战衣。',
    exclude: 'ENV<3'
  }, {
    id: 850007,
    event: '同事找你合代码，合进去6个bug。',
  }, {
    id: 850008,
    event: '睡觉没接到报警电话，但组长、LD、LD+1全被叫醒了。',
    highlight: 1,
  }, {
    id: 850009,
    event: '你在Review代码时痛骂作者，但发现作者是去年的自己。',
    exclude: 'AGE<13',
  }, {
    id: 850010,
    event: '你成为了A-SOUL第六人。',
    exclude: 'EVT?[850010]',
  }, {
    id: 850011,
    event: '你打王者农药的时候和人对骂。',
  }, {
    id: 850012,
    event: '你梦见了小时候的自己。',
  }, {
    id: 850013,
    event: '领导让你开发页面，键盘cv还不好用。',
  }, {
    id: 850014,
    event: '隔壁公司小张听说因为抢月饼被公司开除了。',
  }, {
    id: 850015,
    event: '每天给用户发钱，但是自己账号被风控了。',
  }, {
    id: 850016,
    event: '你发现领导头发比你多。',
    highlight: 1,
  }, {
    id: 850017,
    event: '接了个紧急项目的，你坐在工位上一个月没有和人说话。'
  }, {
    id: 850018,
    event: '这个月每天只睡4个小时。',
    exclude: 'ENV=5',
  }, {
    id: 850019,
    event: '你发现别人都是16寸mbp，到你这只剩13寸。',
    exclude: 'WRK>4',
  }, {
    id: 850020,
    event: '你入职了新公司，认识了可爱的同事们，于是吟诗一首。',
    include: 'WRK=1',
  }, {
    id: 850021,
    event: '这个月前后改了10次需求，最后项目关停了。'
  }, {
    id: 850022,
    event: '你好喜欢嘉然啊，为了嘉然，你要看《机器学习：从入门到精通》。',
  }, {
    id: 850023,
    event: '你在看传说中的SICP，但是发现看不懂。',
  }, {
    id: 850024,
    event: '你在津津有味地看犀牛书，但是忽然想起自己并不是前端。',
    exclude: 'EVT?[850024]',
  }, {
    id: 850025,
    event: '同事问你0.1+0.2是多少，',
    postEvent: '果断回答是0.30000000000000004。',
    highlight: 1,
    exclude: 'EVT?[850025]'
  }, {
    id: 850026,
    event: '你不小心把祖传的木雕树人给丢在家门口的河里了，那可是唐朝文物。',
    highlight: 1,
    exclude: 'EVT?[850026]',
  }, {
    id: 850027,
    event: '在家门口的河边，河神拿出三个树人，问你，',
    postEvent: '年轻的程序员哟~，你丢的是这个夏树人，还是这个商树人，还是这个鲁迅呢？',
    highlight: 1,
    include: 'EVT?[850026]',
    exclude: 'EVT?[850027]',
  }, {
    id: 850028,
    event: '因为疫情线下的技术大会都不开，你已经两年没新衣服穿了。',
    include: 'AGE>24',
  }, {
    id: 850029,
    event: '你从家里的旧书柜中找到了一本郑渊洁的《童话大王》，勾起了你年少时的回忆。',
    exclude: 'EVT?[850029]',
  }, {
    id: 850030,
    event: '你养了一缸金鱼，三天换一次水，七天换一次鱼。',
  }, {
    id: 850031,
    event: 'LD在会议上让你寄个土豆。',
    postEvent: '中午你出去买了土豆，问LD要寄给谁，他笑了半天，你才知道原来是让你记个TODO。',
    highlight: 1,
    exclude: 'EVT?[850031]',
  }, {
    id: 850032,
    event: '一直调试不通过的代码，莫名其妙就好了，迎着同事询问的目光，你也不好意思说自己什么也没做。',
    highlight: 1,
  }, {
    id: 850033,
    event: '你的VSCode突然打不开了，你被迫用Eclipse。',
    postEvent: '你打开Eclipse后去喝了一杯咖啡，回来时，项目还没加载出来。',
    highlight: 1,
  }, {
    id: 850034,
    event: '你和同事吵了一架，因为他竟然怀疑PHP不是世界上最好的语言。',
    highlight: 1,
  },
  {
    id: 850035,
    event: '你离开工位忘记锁屏，一位保洁阿姨在整理工区时顺手帮你改好了一个困扰你好几天的bug。',
    highlight: 1,
    effect: {
      LCK: 1,
    }
  },
  {
    id: 850036,
    event: '你老板记不住你的名字，总是喊你王涛。',
    exclude: 'EVT?[850036]',
  },
  {
    id: 850037,
    event: '你老板把你当成王涛骂了半天，你也不吱声，因为反正和你没关系。',
    highlight: 1,
    include: 'EVT?[850036]',
    exclude: 'EVT?[850037]',
  },
  {
    id: 850038,
    event: '你加入了奇舞团，很多人问你是不是会跳舞，尴尬的是你并不会。',
    highlight: 1,
    exclude: 'EVT?[850038]',
  },
  {
    id: 850039,
    event: '你组长王涛经常帮你改代码，你觉得他其实是在给你添乱。',
    postEvent: '你说他懂技术吧，这里有5个bug，你说他不懂吧？他改进去5个bug！',
    highlight: 1,
    exclude: 'EVT?[850039]',
  },
  {
    id: 850040,
    event: '你一口气喝了两斤白酒，写了两千行代码，零bug。',
    highlight: 1,
    postEvent: '醒了以后，发现看不懂。',
    exclude: 'EVT?[850040]',
  },
  {
    id: 850041,
    event: '你帮同事改了3个bug，同事很感激你。',
    postEvent: '不久之后，发现你给他改进去7个新bug。',
    highlight: 1,
    exclude: 'EVT?[850041]',
  },
  {
    id: 850042,
    event: '组长背着你把他的代码偷偷合给你，包括3个bug。',
    exclude: 'EVT?[850042]',
  },
  {
    id: 850043,
    event: 'LD公开表扬你，说你的代码写得像他。',
    exclude: 'EVT?[850043]',
  },
  {
    id: 850044,
    event: '你在会议室偷吃零食，LD没有发现。',
    exclude: 'EVT?[850044]',
  },
  // 工作分支
  {
    // 国企
    id: 850045,
    event: '你觉得工作实在太清闲，技术都有点生疏了。',
    include: '(WRK>24)&(ENV=5)',
    exclude: '(WRK>36)|(TLT?[1064])',
    effect: {
      INT: -1,
    }
  },
  {
    // 国企
    id: 850046,
    event: '每天的工作只要一个小时，剩下的时间你觉得无所事事。',
    include: '(WRK>36)&(ENV=5)',
    exclude: '(WRK>48)|(TLT?[1064])',
    effect: {
      INT: -1,
    }
  },
  {
    // 国企
    id: 850047,
    event: '你觉得自己再待下去，就彻底废了。',
    postEvent: '但你又感觉自己离不开这个舒适环境。',
    include: '(WRK>48)&(ENV=5)',
    exclude: '(WRK>60)|(TLT?[1064])',
    effect: {
      INT: -1,
      SPR: -1,
    }
  },
  {
    id: 850048,
    event: '公司管理混乱，一封重要的邮件被误删。',
    include: '(WRK>12)&(ENV<3)',
    exclude: '(WRK>24)',
    branch: [
      'LCK>-100:851000',
    ],
  },
  {
    id: 850049,
    event: 'LD让大家加班，你明明没有什么事情，到了晚上11点，还得留在公司。',
    include: '(WRK>24)&(ENV<3)',
    exclude: '(WRK>24)',
    branch: [
      'TLT?[1056]:851001',
      '(LCK>-100):851000',
    ],
  },
  {
    id: 851000,
    event: '你情绪低落。',
    effect: {
      SPR: -1,
    }
  },
  {
    id: 851001,
    event: '你努力工作。',
  },
  {
    id: 850050,
    event: 'LD对你说，跟着我，你要多努力，加班好好干。',
    postEvent: '你点点头，心情一言难尽。',
    exclude: 'ENV=5',
  },
  {
    id: 850051,
    event: '这个月你天天拉着LD和整个团队加班。',
    include: 'TLT?[1056]',
  },
  {
    id: 850052,
    event: 'LD流着泪对你说，你这样疯狂加班是不人道的。',
    include: 'EVT?[850051]',
  },
  {
    id: 850053,
    event: '在国企你无班可加，非常不开心。',
    include: '(TLT?[1056])&(ENV=5)',
    exclude: 'EVT?[850053]',
    effect: {
      SPR: -1,
    }
  },
  {
    id: 850054,
    event: '老板对领导说，给你一年时间，把我们的产品做成华夏国的油管。',
    postEvent: '领导对你说，给你一个月时间，照着油管抄一下。',
    highlight: 1,
  },
  {
    id: 850055,
    event: '产品经理让你对着竞品抄功能。',
    postEvent: '做着做着，结果竞品改版了。',
  },
  {
    id: 850056,
    event: '没有理由地，你就是觉得最近很开心。',
    exclude: '(SPR<0)|(SPR>5)|(ENV<2)',
    effect: {
      SPR: 1,
    }
  },
  // 干黄一家公司
  {
    id: 850057,
    event: '由于你写的bug，公司亏损了2000000元。',
    exclude: 'TLT?[1046]'
  },
  {
    id: 850058,
    event: '老板冲你发火，警告如果你再写bug，公司就要关门大吉了。',
    exclude: '(INT>6)|(ENV>2)|(EVT?[850058])',
    include: 'EVT?[850057]',
  },
  {
    id: 850059,
    event: '由于你写了太多bug，公司被你干倒闭了。',
    include: 'EVT?[850058]',
    exclude: '(ENV>2)|(EVT?[850059])',
    branch: jump1,
  },
  // 又干黄一家公司
  {
    id: 850060,
    event: '由于你写的bug，公司亏损了5000000元。',
    include: 'EVT?[850059]',
  },
  {
    id: 850061,
    event: '听说老板娘劝老板开除你，因为算命先生说你命里克公司。',
    highlight: 1,
    exclude: '(INT>5)|(ENV>2)|(EVT?[850061])',
    include: 'EVT?[850060]',
  },
  {
    id: 850062,
    event: '由于你加班加点地写bug，公司又被你干倒闭了。',
    include: 'EVT?[850061]',
    exclude: '(ENV>2)|(EVT?[850062])',
    branch: jump1,
  },
  // 再干黄一家公司
  {
    id: 850063,
    event: '由于你写的bug，公司亏损了15000000元。',
    include: 'EVT?[850062]',
  },
  {
    id: 850064,
    event: '由于你孜孜不倦地写bug，公司摇摇欲坠。',
    postEvent: '同事偷偷改了你电脑的密码，试图阻止你写bug，然而这并没有什么用。',
    highlight: 1,
    exclude: '(INT>4)|(ENV>2)|(EVT?[850064])',
    include: 'EVT?[850063]',
  },
  {
    id: 850065,
    event: '由于你bug实在太多，老板被你逼疯，公司倒闭。',
    include: 'EVT?[850064]',
    exclude: '(ENV>2)|EVT?[850065]',
    branch: jump1,
  },
  {
    id: 850066,
    event: '老板带着小姨子跑路了，你只好重新找工作。',
    include: 'ENV<2',
    branch: jump1,
  },
  {
    id: 850067,
    event: '你当了面试官，因为你的普通话不好，把来面试的小姑娘急哭了。',
    highlight: 1,
    postEvent: '她听不懂你提的问题。',
    include: 'TLT?[1016]',
    exclude: 'EVT?[850067]',
    branch: jump1,
  },
  {
    id: 850068,
    event: '系统里发现一个重大漏洞。',
    branch: [
      'TLT?[1037]:853000',  // 八面玲珑
      '(TLT?[1029])&(LCK<7):853001',  // 背锅侠
      '(TLT?[1030])&(LCK>-5):853000', // 老好人
      'LCK<0:853001',
      'LCK>-100:853000',
    ],
  },
  {
    id: 853000,
    event: '可能和你有关，但是同事和LD都没有为难你。',
  },
  {
    id: 853001,
    event: '同事把锅甩给你，你被LD扣了奖金。',
    effect: {
      MNY: -1,
    }
  },
  {
    id: 850069,
    event: '食堂里伙食太好了，你的体重增加了。',
    exclude: 'EVT?[850069]',
    include: 'ENV>2',
  },
  {
    id: 850070,
    event: '你最近由于体重显著增加，颜值下降。',
    include: '(ENV>2)&(EVT?[850069])',
    exclude: '(EVT?[850070])|(TLT?[1122])',
    effect: {
      CHR: -1,
    }
  },
  {
    id: 850071,
    event: '你最近由于体重显著增加，感觉体力有所下降。',
    include: '(ENV>2)&(EVT?[850069])',
    exclude: '(EVT?[850071])|(TLT?[1122])',
    effect: {
      STR: -1,
    }
  },
  {
    id: 850072,
    event: '你看着自己小腹上日渐增多的赘肉，陷入焦虑。',
    include: `(ENV>2)&(EVT?[850069])&(${conFemale2})`,
    exclude: '(EVT?[850072])|(TLT?[1122])',
    effect: {
      SPR: -1,
    }
  },
  {
    id: 850073,
    event: '你加强了锻炼，重新变得健康，也恢复了颜值和自信。',
    include: `(ENV>2)&(EVT?[850069])&(${conFemale2})`,
    exclude: '(EVT?[850073])|(TLT?[1022])',
    effect: {
      SPR: 1,
      CHR: 1,
      STR: 1,
    }
  },
  // --- 女生 ---
  {
    id: 870000,
    include: conFemale,
    event: '你发现身边有个男同事是个精致Boy。'
  },
  {
    id: 870001,
    include: `(CHR>6)&(${conFemale2})`,
    event: '你以一己之力拉高了整个部门的颜值',
  },
  {
    id: 870002,
    include: conFemale2,
    event: 'PM给你分了一个需求，要求一周内完成。',
    postEvent: '你卖个萌，完成时间变成两周。',
    highlight: 1,
  },
  {
    id: 870003,
    include: conFemale,
    event: '对面有个女生身上的香水味道好好闻。',
  },
  {
    id: 870004,
    include: conFemale2,
    event: '你买了一副精致的耳环。',
  },
  {
    id: 870005,
    include: conFemale2,
    event: '部门聚会，你穿了一袭白色长裙，惊艳全场。',
    highlight: 1,
  },
  {
    id: 870006,
    include: conFemale,
    event: '男票送了你一支圣罗兰，给了你惊喜。',
    exclude: 'EVT?[220000]',
    effect: {
      SPR: 1,
    }
  },
  {
    id: 870007,
    include: conFemale,
    event: '新换的发型被同事嘲笑不好看，你情绪有点低落。',
    effect: {
      SPR: -1,
    }
  },
  {
    id: 870008,
    include: `${conFemale2}&(TLT?[1026])&(CHR>4)`,
    event: '你成了团队里的程序员鼓励师，同事们都宠着你。',
    highlight: 1,
    exclude: 'EVT?[870008]',
    effect: {
      SPR: 1,
    }
  },
  {
    id: 870009,
    include: `(${conFemale})&(EVT?[220000])`,
    event: '老公送了你一支迪奥，给了你惊喜。',
    effect: {
      SPR: 1,
    }
  },
  {
    id: 870010,
    include: `(${conFemale})&(STR>4)`,
    event: '公司组织员工运动会，你报名参加了女子400米接力赛，获得了亚军。',
  },
  {
    id: 870011,
    include: `(${conFemale2})&(CHR>6)&(SPR>6)`,
    event: '早早起来化了淡妆，对着镜子拍拍脸蛋，自言自语。',
    postEvent: '今天继续好好努力，不然对不起自己这副倾城容颜。',
    highlight: 1,
  },
  {
    id: 870012,
    event: '你跟男票说，你想要一支MAC。',
    postEvent: '你男票给你买了一台Macbook Pro。',
    include: `${conFemale2}`,
    exclude: 'EVT?[850012,850013,220000]',
    highlight: 1,
  },
  {
    id: 870013,
    event: '你跟老公说，你想要一支MAC。',
    postEvent: '他给你买来一台Macbook Pro。',
    include: `(${conFemale2})&(EVT?[220000])`,
    exclude: 'EVT?[850012,850013]',
    highlight: 1,
  },
  // --- 男生 ---
  {
    id: 880000,
    include: conMale,
    exclude: `(${conFemale2})|(EVT?[220000])`,
    event: '逛购物网站时，你想给女朋友买一条围巾。',
    postEvent: '突然想起来你没有女朋友。',
    highlight: 1,
  },
  {
    id: 880001,
    include: conMale,
    exclude: conFemale2,
    event: '下班去踢球，一脚开球把LD家的窗户玻璃砸碎了。',
    postEvent: '趁LD在加班，赶快溜走。',
    highlight: 1,
  },
  {
    id: 880002,
    include: conMale,
    exclude: conFemale2,
    event: '上班路上遇到小偷，你见义勇为抓住小偷，结果上班迟到被批评了一顿。',
  },
  {
    id: 880003,
    include: conMale,
    exclude: conFemale2,
    event: '你买了一双拖鞋，在办公区穿。',
  },
  {
    id: 880004,
    include: conMale,
    exclude: conFemale2,
    event: '你觉得自己有一天会成为救世主。',
  },
  {
    id: 880005,
    include: `(${conMale})&(CHR>6)&(SPR>6)`,
    exclude: conFemale2,
    event: '你在路上发现一枚帅哥，仔细一看，原来是镜子里的自己。',
    highlight: 1,
  },
  {
    id: 880006,
    include: `(${conMale})&(TLT?[1026])`,
    exclude: conFemale2,
    event: '你想成为程序员鼓励师，结果发现他们不招男生。',
    highlight: 1,
    exclude: 'EVT?[880006]',
  },
  {
    id: 880007,
    include: `(${conMale})&(TLT?[1026])&(EVT?[880006])`,
    exclude: `(EVT?[880007])|(${conFemale2})`,
    event: '隔壁部门的女装大佬成为了程序员鼓励师。',
    postEvent: `你去询问LD，LD告诉你，性别不重要，重要的是要长得好看且会打扮。`,
    highlight: 1,
  },
  {
    id: 880008,
    include: `(${conMale})&(STR>4)`,
    exclude: `(${conFemale2})`,
    event: '公司组织员工运动会，你报名参加了男子1500米长跑，获得了亚军。',
  },
  {
    id: 880009,
    event: '你女友对你说，她想要一支MAC。',
    postEvent: '你给她买了一台Macbook Pro。',
    include: `${conMale}`,
    exclude: `(EVT?[870009,870010,220000])|(${conFemale2})`,
    highlight: 1,
  },
  {
    id: 880010,
    event: '你妻子对你说，她想要一支MAC。',
    postEvent: '你给她买了一台Macbook Pro。',
    include: `(${conMale})&(EVT?[220000])`,
    exclude: `(EVT?[870009,870010])|(${conFemale2})`,
    highlight: 1,
  },
  // ---- 掘金 ----
  {
    id: 860000,
    event: '你在掘金读到了一篇讲前端的好文章。',
    include: "EVT?[120003]",
    branch: [
      'LCK>7:861001',
    ],
    highlight: 1,
  },
  {
    id: 860001,
    event: '你在掘金读到了一篇讲后端的好文章。',
    include: "EVT?[120003]",
    branch: [
      'LCK>7:861001',
    ],
    highlight: 1,
  },
  {
    id: 860002,
    event: '你在掘金读到了一篇讲算法的好文章。',
    include: "EVT?[120003]",
    branch: [
      'LCK>7:861001',
    ],
    highlight: 1,
  },
  {
    id: 860003,
    event: '你在掘金沸点上班摸鱼。',
    include: "EVT?[120003]",
    branch: [
      'LCK>2:861002',
    ],
    highlight: 1,
  },
  {
    id: 861001,
    event: '你的能力提升了。',
    effect: {
      INT: 1,
    }
  },
  {
    id: 861002,
    event: '你的沸点被点了超过100个赞，很开心。',
    effect: {
      SPR: 1,
    },
    highlight: 1,
  },
  {
    id: 860004,
    event: '你走在上班路上，天上忽然飘来一张小纸条，你捡起来，只见上面写着：',
    postEvent: "【号外！号外！】掘金社区主办的第一届稀土开发者大会将于2021年10月27日线上开启~",
    exclude: "EVT?[860004]",
    effect: {
      SPR:1,
    },
    highlight: 1,
  },

  // 退休事件
  {
    id: 999000,
    event: '一晃50年过去了，你把最好的时光都献给了软件开发事业，现在你光荣退休了。',
    include: 'AGE>599',
    branch: retireGameOver,
  },
  {
    id: 999001,
    event: '你作为程序员工作了10多年，觉得自己的生活没什么起色，你不打算干下去了。',
    include: '(AGE>120)&(MNY<2)',
    exclude: "EVT?[1110000]",
    branch: gameOver,
  },
  {
    id: 999002,
    event: '你作为程序员工作了10多年，觉得自己不喜欢这个职业，你不打算干下去了。',
    include: '(AGE>120)&(SPR<1)',
    exclude: "EVT?[1110000]",
    branch: gameOver,
  },
  {
    id: 999003,
    event: '你作为程序员工作了10多年，觉得自己干不动了。',
    include: '(AGE>120)&(STR<1)',
    exclude: "EVT?[1110000]",
    branch: gameOver,
  },
  {
    id: 999004,
    event: '你作为程序员工作了20多年，觉得自己的生活没什么起色，你不打算干下去了。',
    include: '(AGE>240)&(MNY<4)',
    exclude: "EVT?[1110000]",
    branch: gameOver,
  },
  {
    id: 999005,
    event: '你作为程序员工作了20多年，觉得自己不喜欢这个职业，你不打算干下去了。',
    include: '(AGE>240)&(SPR<3)',
    exclude: "EVT?[1110000]",
    branch: gameOver,
  },
  {
    id: 999006,
    event: '你作为程序员工作了20多年，觉得自己干不动了。',
    include: '(AGE>240)&(STR<3)',
    exclude: "EVT?[1110000]",
    branch: gameOver,
  },
  {
    id: 999007,
    event: '你作为程序员工作了30多年，觉得自己的生活没什么起色，你不打算干下去了。',
    include: '(AGE>360)&(MNY<5)',
    exclude: "EVT?[1110000]",
    branch: gameOver,
  },
  {
    id: 999008,
    event: '你作为程序员工作了30多年，觉得自己不喜欢这个职业，你不打算干下去了。',
    include: '(AGE>360)&(SPR<4)',
    exclude: "EVT?[1110000]",
    branch: gameOver,
  },
  {
    id: 999009,
    event: '你作为程序员工作了30多年，觉得自己干不动了。',
    include: '(AGE>360)&(STR<4)',
    exclude: "EVT?[1110000]",
    branch: gameOver,
  },
  {
    id: 999010,
    event: '你财务自由了，不想再做程序员了。',
    include: '(AGE>120)&(SPR>6)&(MNY>15)',
    exclude: "EVT?[1110000]",
    branch: gameOver,
  },
  // ---- 天赋 -----
  {
    id: 131000,
    event: '你耐不住寂寞，打算跳槽',
    include: '(TLT?[1049])&(WRK>11)',
    exclude: "EVT?[1110000]",
    branch: jump1,
  },
  // 天赋 1054：IT直男、桃花连连，1028
  {
    id: 132000,
    event: '你很有异性缘。',
    exclude: `(${conFemale})|(EVT?[132000,131001])`,
    include: 'TLT?[1028]',
    branch: [
      'LCK>-7:131001',
    ],
  },
  {
    id: 131001,
    event: '有女同事对你表示好感。',
    include: `(CHR>4)|(INT>5)`,
    exclude: `(${conFemale})|(EVT?[131001])`,
    branch: [
      'TLT?[1054]:131101',
      'LCK>-5:131100',
      'LCK>-100:131101',
    ],
  },
  {
    id: 131100,
    event: '你有点心动。',
  },
  {
    id: 131101,
    event: '你忙于工作，无动于衷。',
  },
  {
    id: 131002,
    include: 'EVT?[131100]',
    event: '你和女同事感情加深了，同事开始说你们很有默契。',
    exclude: `(${conFemale2})|(EVT?[131002])`
  },
  {
    id: 131003,
    include: 'EVT?[131002]',
    event: '你觉得和她一起工作很愉快，你们之间有一种道不清说不明的关系。',
    postEvent: '也许这就是爱情。',
    exclude: `(${conFemale2})|(EVT?[131003])`,
    effect: {
      SPR: 1,
    },
  },
  {
    id: 131004,
    include: 'EVT?[131003]',
    event: '你确定自己已经坠入爱河。',
    exclude: `(${conFemale2})|(EVT?[131004])|(TLT?[1077])`,
    effect: {
      SPR: 1,
    },
    branch: [
      'EVT?[220000]:131102',
      'LCK>-100:131103'
    ],
  },
  {
    id: 131102,
    event: '你出轨了，但你已无法回头。',
    highlight: 1,
  },
  {
    id: 131103,
    event: '你向她求婚了，同事祝你们幸福。',
  },
  // 黑客 1005、好奇宝宝 1006
  {
    id: 131005,
    event: '你发现了一个代码漏洞，打算下次中秋节利用它来抢月饼。',
    include: 'TLT?[1005]',
    exclude: 'EVT?[131005]',
    highlight: 1,
  },
  {
    id: 131006,
    event: '你报告并修复了项目中一个潜在的安全漏洞。',
    postEvent: '老板很满意，给你发了额外奖金。',
    include: 'TLT?[1005]',
    exclude: 'EVT?[131006]',
    effect: {
      MNY: 1,
    },
  },
  {
    id: 131007,
    event: '你在项目中使用了一项新技术，造成严重的安全问题，被扣了奖金。',
    include: 'TLT?[1006]',
    exclude: '(EVT?[131007])|(TLT?[1025])',
    effect: {
      MNY: -1,
    },
  },
  {
    id: 131008,
    event: '你在项目中使用了一项新技术，获得了不错的效果，受到老板的夸奖。',
    include: 'TLT?[1006]',
    exclude: '(EVT?[131008])|(TLT?[1025])',
    effect: {
      SPR: 1,
    }
  },
  {
    id: 131009,
    event: '你在项目中使用了一个开源框架，该项目的作者三个月后跑路，无人维护。',
    highlight: 1,
    postEvent: '你和同事连续加班了半个月，把项目迁回老框架。',
    exclude: 'EVT?[131009]',
    effect: {
      SPR: -1,
    },
  },
  {
    id: 131010,
    event: '你在GayHub平台上发现一个有趣的新项目，你研究了一个月，发现这个项目其实是用来摸鱼的。',
    highlight: 1,
    exclude: 'EVT?[131010]',
  },
  {
    id: 131011,
    event: '你在GayHub平台上发现一个有趣的新项目，你研究了一个月，发现这个项目其实只是个广告。',
    exclude: 'EVT?[131011]',
  },
  {
    id: 131012,
    event: '你在GayHub平台上发现一个有趣的新项目，你研究了一个月，发现这个项目其实你自己十年前写的。',
    highlight: 1,
    exclude: 'EVT?[131012]',
  },
  {
    id: 131013,
    event: '你在GayHub平台上发现一个有趣的新项目，你研究了一个月，完全看不懂这个项目是用来干嘛的。',
    exclude: 'EVT?[131013]',
  },
  {
    id: 131014,
    event: '你在GayHub平台上发现了一个有趣的新项目，你研究了一个月，发现这是个程序员同性交友网站。',
    highlight: 1,
    exclude: 'EVT?[131014]',
  },
  // ---- 八卦 -----
  {
    id: 988000,
    event: '【小道消息】平行世界是开启更丰富人生的钥匙。',
    exclude: 'EVT?[988000]',
    include: 'TLT?[1063]'
  },{
    id: 988001,
    event: '【小道消息】女装大佬也是有嫁人的可能的。',
    exclude: 'EVT?[988001]',
    include: 'TLT?[1063]'
  },{
    id: 988002,
    event: '【小道消息】小公司没有年度普调，但是你的智商高，有机会经常涨薪水。',
    exclude: 'EVT?[988002]',
    include: 'TLT?[1063]'
  },{
    id: 988003,
    event: '【小道消息】国企员工朝九晚五，身体健康。',
    exclude: 'EVT?[988003]',
    include: 'TLT?[1063]'
  },{
    id: 988004,
    event: '【小道消息】掘金社区是个人成长的很棒的平台。',
    exclude: 'EVT?[988004]',
    include: 'TLT?[1063]'
  },
  // ---- 平行世界 ----
  {
    id: 1110000,
    event: '【重要信息！！！】科学家发现平行宇宙学说是正确的。',
    include: '(TLT?[1048])&(ENV>2)',
    exclude: 'EVT?[1110000]',
  },
  {
    id: 1110001,
    event: '一个老爷爷在山上发现一个葫芦种子，种出七色葫芦，成熟后变成几个小人。',
    highlight: 1,
    include: 'EVT?[1110000]',
    exclude: 'EVT?[1110001]',
  },
  // 超神学院分支
  {
    id: 1110002,
    event: '天使国际集团的美女总裁宣称自己真的是天使，来自天使星云。',
    include: 'EVT?[1110000]',
    exclude: 'EVT?[1110002]',
  },
  {
    id: 1110003,
    event: '一只人形鳄鱼从巨峡市上空降落，',
    include: 'EVT?[1110000]',
    exclude: 'EVT?[1110003]',
  },
  {
    id: 1110004,
    event: '你接到一个秘密项目，给国防部开发一套黑色的机甲。',
    highlight: 1,
    include: 'EVT?[1110000]',
    exclude: 'EVT?[1110004]',
  },
  {
    id: 1110005,
    event: '机甲项目开发到了关键的时刻，你发现一些同事莫名失踪。',
    highlight: 1,
    include: 'EVT?[1110004]',
    exclude: 'EVT?[1110005]',
  },
  {
    id: 1110006,
    event: '下班途中，你遭到黑衣人冷枪袭击。',
    highlight: 1,
    include: 'EVT?[1110005]',
    exclude: 'EVT?[1110006]',
    branch: [
      'EVT?[1110000]:1111000',
    ]
  },
  {
    id: 1111000,
    event: '你头部中弹了，倒在了黑衣人的枪下。',
    highlight: 1,
    branch: [
      "STR<5:1111001",
      "STR>4:1111002",
    ]
  },
  {
    id: 1111001,
    event: '你死了。',
    effect: {
      LIF: -1,
    }
  },
  {
    id: 1111002,
    event: '你失去意识，最后一眼，你看到一个身着黑甲的美女。',
    highlight: 1,
  },
  {
    id: 1110007,
    event: '你醒了，你十分惊讶，不明白自己明明被爆头，怎么能活下来。',
    postEvent: '你检查全身上下，奇怪的是竟然没有一点伤痕。',
    highlight: 1,
    include: 'EVT?[1110006]',
    exclude: 'EVT?[1110007]',
  },
  {
    id:1110008,
    event: '你回到了公司，继续工作，那段经历成为永远埋藏在心中的秘密。',
    include: '(EVT?[1110007])&(INT<8)',
    exclude: 'EVT?[1110008]',
  },
  {
    id:1110009,
    event: '一位穿着军装的部队首长找到你，让你到一个秘密基地去工作。',
    highlight: 1,
    include: '(INT>7)&(EVT?[1110007])',
    exclude: 'EVT?[1110009]',
    effect: {
      MNY: 1,
      ENV: "6!",
      WRK: "0!",
    }
  },{
    id:1110010,
    event: '你在秘密基地接受军事训练。',
    include: 'EVT?[1110009]',
    effect: {
      STR: 2,
      SPR: 1,
    }
  },{
    id:1110011,
    event: '你了解了自己继承了神河文明的超神基因，所以才能够被子弹爆头而不死。',
    highlight: 1,
    exclude: 'EVT?[1110011]',
    include: 'EVT?[1110009]',
  },{
    id:1110012,
    event: '秘密基地的教官是一位美女，自称蔷薇。',
    highlight: 1,
    include: 'EVT?[1110009]',
    exclude: 'EVT?[1110012]',
  },{
    id:1110013,
    event: '今天听到一则令人震惊的消息，孙悟空是真实存在的，是第二代超级基因战士。',
    highlight: 1,
    include: 'EVT?[1110009]',
    exclude: 'EVT?[1110013]',
  },{
    id:1110014,
    event: '除了军事训练，你学习各种数学和物理知识。',
    include: 'EVT?[1110009]',
    effect: {
      INT: 2,
    }
  }, {
    id: 1110015,
    event: '你领悟了微虫洞搬运技术，能力大幅增加。',
    include: '(EVT?[1110010])&(WRK>10)',
    exclude: 'EVT?[1110015]',
    effect: {
      STR: 5,
      INT: 5,
    }
  }, {
    id: 1110016,
    event: '你奉命带小队出战。',
    include: '(EVT?[1110010])&(WRK>10)',
    branch: [
      "LCK>5:1111003",
      "LCK>-2:1111004",
      "LCK>-5:1111005",
      "LCK>-100:1111006",
    ],
  }, {
    id: 1111003,
    event: '大获全胜。',
    effect: {
      SPR: 2,
    }
  }, {
    id: 1111004,
    event: '小胜一场。',
    effect: {
      SPR: 1,
    }
  },  {
    id: 1111005,
    event: '小败收场。',
    effect: {
      SPR: -1,
    }
  }, {
    id: 1111006,
    event: '中了埋伏，大败。',
    effect: {
      SPR: -2,
      STR: -2,
    }
  },
  {
    id: 1110017,
    event: '经过锻炼和实战打磨，你进化成了二代神体',
    highlight: 1,
    include: '(EVT?[1110010])&(STR>50)',
    exclude: 'EVT?[1110017]',
    effect: {
      SPR: 10,
      STR: 20,
    }
  },
  {
    id: 1110018,
    event: '经过锻炼和实战打磨，你进化成了三代神体',
    highlight: 1,
    include: '(EVT?[1110017])&(STR>120)',
    exclude: 'EVT?[1110018]',
    effect: {
      SPR: 10,
      STR: 20,
    }
  }, {
    id: 1110019,
    event: '你们出发去云焱森林找孙悟空。',
    highlight: 1,
    postEvent: '你们和孙悟空爆发了大战。',
    include: '(WRK>120)&(EVT?[1110010])',
    exclude: 'EVT?[1110019]',
    branch: [
      "STR>120:1111009",
      "STR>50:1111008",
      "STR>-100:1111007"
    ],
  }, {
    id: 1111007,
    event: "你们失败了，孙悟空不肯加入。",
  }, {
    id: 1111008,
    event: "你们小败给孙悟空，孙悟空加入",
  }, {
    id: 1111009,
    event: "你们战胜了孙悟空，孙悟空认可了你的领导能力，加入了你们。",
  }, {
    id: 1110020,
    event: '被称为饕餮文明的外星人入侵了地球。',
    highlight: 1,
    include: 'EVT?[1110019]',
    exclude: 'EVT?[1110020]',
  }, {
    id: 1110021,
    event: '华夏成为了对抗外星人入侵的核心力量，北之星、巨峡市、天河市先后陷入战火。',
    highlight: 1,
    include: 'EVT?[1110020]',
    exclude: 'EVT?[1110021]',
  }, {
    id: 1110022,
    event: '外星人袭击了守护巨峡市的航母，狙击手用弑神武射杀了杜将军。',
    highlight: 1,
    postEvent: '巨峡战役爆发，你奉命带队迎战。',
    include: 'EVT?[1110021]',
    exclude: 'EVT?[1110022]',
  }, {
    id: 1110023,
    event: '天使文明、恶魔文明的飞船出现在巨峡号上空。',
    highlight: 1,
    postEvent: '大战一触即发。',
    include: 'EVT?[1110022]',
    exclude: 'EVT?[1110023]',
    branch: [
      "(STR>150)&(INT>70):1111012",
      "(STR>100)&(INT>40):1111011",
      "(STR>-100):1111010",
    ],
  },
  {
    id: 1111010,
    event: "你的小队战败了，你阵亡了，虽然巨峡号和华夏军队进行了最后的抵抗，但地球文明还是不可避免地渐渐毁于战火……",
    highlight: 1,
    effect: {
      LIF: -1
    }
  },
  {
    id: 1111011,
    event: "你和孙悟空、杜蔷薇等同伴并肩作战，成功抵抗了饕餮军团，天使也成功驱逐了恶魔，地球暂时获得了和平。",
    postEvent: "你和团队返回基地，你们继续投身到长期的艰苦作战中，你们小队有了一个响亮的名字：雄兵连。",
    highlight: 1,
    effect: {
      LIF: -1
    }
  },
  {
    id: 1111012,
    event: "你和孙悟空、杜蔷薇等同伴并肩作战，打败了饕餮军团，你们和天使结盟，天使王神圣凯撒让天使炙心来帮祝你们。",
    postEvent: "你和团队返回基地，你们继续投身到长期的艰苦作战中，你和天使们一起在太阳系外构筑了钢铁长城，你们守护者地球的和平。",
    highlight: 1,
    effect: {
      LIF: -1
    }
  },
  {
    id:1110024,
    event: '你训练刻苦，能力大幅提升。',
    include: 'EVT?[1110009]',
    effect: {
      STR: 10,
      SPR: 10,
    }
  },
  {
    id: 999888,
    event: '天赋【满血复活】发动：你醒了过来，在校园草坪上，好像做了个长长的梦。你记起今天刚和同学们拍完毕业照，你们这一届同学即将离开校园，走上社会。',
    include: 'LIF=2',
    postEvent: '你努力回想刚才做的梦，好像很真实，但又记不清。你隐约觉得有些东西不一样，但又似乎什么都没变。。。',
    highlight: 1,
    effect: {
      LIF: -1,
      AGE: '-1!',
      WRK: '0!',
      JMP: '0!',
      PRG: '0!',
      ENV: '0!',
    },
    hook(property) {
      let events = property.get('EVT');
      events = events.filter((e) => e === 999888 || e === 888726);
      property.set('EVT', events);
    }
  },
  {
    id: 888700,
    event: '你成年了，是只喵星人。',
    highlight: 1,
    include: 'TLT?[1081]',
    exclude: 'EVT?[999888]',
  },
  {
    id: 888701,
    event: '一位小哥哥把你捡到他的公司里喂养。',
    include: 'EVT?[888700]',
    postEvent: '这是一家大公司',
  },
  {
    id: 888702,
    event: '一位小哥哥把你捡到他的公司里喂养。',
    postEvent: '这是一家小公司',
    include: 'EVT?[888700]',
  },
  {
    id: 888703,
    event: '一位小姐姐把你捡到她的公司里喂养。',
    postEvent: '这是一家大公司',
    include: 'EVT?[888700]',
  },
  {
    id: 888704,
    event: '一位小姐姐把你捡到她的公司里喂养。',
    postEvent: '这是一家小公司',
    include: 'EVT?[888700]',
  },
  {
    id: 888705,
    event: '你：喵喵喵，喵喵喵喵',
    include: 'EVT?[888700]',
  },
  {
    id: 888706,
    event: '你：喵~喵~喵，喵~喵~喵~喵~',
    include: 'EVT?[888700]',
  },
  {
    id: 888707,
    event: '你：喵~喵~喵，喵喵~喵喵~',
    include: 'EVT?[888700]',
  },
  {
    id: 888708,
    event: '同事们都很喜欢你，经常喂你小鱼干。',
    highlight: 1,
    include: 'EVT?[888700]',
    effect: {
      STR: 1,
    }
  },
  {
    id: 888709,
    event: '公司环境很好，天气好的时候，你在屋顶晒太阳、玩耍。',
    highlight: 1,
    postEvent: '你过得很健康。',
    include: 'EVT?[888700]',
    effect: {
      STR: 1,
    }
  },
  {
    id: 888710,
    event: '一位粗心的同事不小心把你锁在阁楼上，你从楼顶跳下来的时候受了一点伤。',
    highlight: 1,
    include: 'EVT?[888700]',
    effect: {
      STR: -1,
    }
  },
  {
    id: 888711,
    event: '公司的访客给你乱喂垃圾食品。',
    highlight: 1,
    include: 'EVT?[888700]',
    effect: {
      STR: -1,
    }
  },
  {
    id: 888712,
    event: '你抓了一只麻雀。',
    highlight: 1,
    include: 'EVT?[888700]',
  },
  {
    id: 888713,
    event: '你抓了一只老鼠。',
    highlight: 1,
    include: 'EVT?[888700]',
  },
  {
    id: 888714,
    event: '你把同事鱼缸里的鱼给偷了。',
    highlight: 1,
    include: 'EVT?[888700]',
  },
  {
    id: 888715,
    event: '你追自己尾巴玩。',
    highlight: 1,
    include: 'EVT?[888700]',
    effect: {
      SPR: 1,
    }
  },
  {
    id: 888716,
    event: '同事给你铲屎，帮你撸毛，你舒服地躺在地上。',
    highlight: 1,
    include: 'EVT?[888700]',
    effect: {
      SPR: 1,
    }
  },
  {
    id: 888717,
    event: '你今天淘气地把一个同事吓了一跳，被训了一顿。',
    highlight: 1,
    include: 'EVT?[888700]',
    effect: {
      SPR: -1,
    }
  },
  {
    id: 888718,
    event: '你发情了，喵喵叫，太吵了，同事把你带去宠物医院做了绝育手术。',
    highlight: 1,
    include: 'EVT?[888700]',
    exclude: 'EVT?[888718]',
    effect: {
      SPR: -1,
    }
  },
  {
    id: 888719,
    event: '你踩在一位同事的键盘上，帮她修好了一个bug。',
    highlight: 1,
    include: 'EVT?[888700]',
  },
  {
    id: 888720,
    event: '你的年龄不小了，感觉身体不如从前。',
    postEvent: '同事格外照顾你。',
    include: '(EVT?[888700])&(AGE>59)',
    exclude: 'EVT?[888720]',
    effect: {
      STR: -1,
    }
  },
  {
    id: 888721,
    event: '你生病了，一位同事带你去看兽医。',
    include: '(EVT?[888700])&(AGE>23)',
    exclude: 'EVT?[888721]',
    effect: {
      STR: -1,
    }
  },
  {
    id: 888722,
    event: '你恢复得还不错。',
    include: '(EVT?[888700])&(EVT?[888721])',
    exclude: 'EVT?[888722]',
    effect: {
      STR: 1,
    }
  },
  {
    id: 888723,
    event: '你的反应下降了，也不爱吃猫粮了。',
    include: '(EVT?[888700])&(AGE>83)',
    exclude: 'EVT?[888723]',
    effect: {
      STR: -1,
    },
  },
  {
    id: 888724,
    event: '你身体灵敏度下降，不小心摔了一跤。',
    include: '(EVT?[888700])&(AGE>83)',
    effect: {
      STR: -1,
    },
  },
  {
    id: 888725,
    event: '你的食量越来越小。',
    include: '(EVT?[888700])&(AGE>83)',
    effect: {
      STR: -1,
    },
  },
  {
    id: 888726,
    event: '你离开了这个世界。',
    postEvent: '公司的同事都很难过，他们把你葬在院子里，给你立了一个小墓碑，感谢你这些年给他们带去的欢乐。',
    highlight: 1,
    include: '(EVT?[888700])',
    exclude: '(STR>0)&(AGE<120)',
    effect: {
      LIF: -1,
    },
    branch: [
      'LIF>1:999888',
    ]
  },
];

export const events = map(eventList);