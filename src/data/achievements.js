import {map} from '../functions/util.js';

const achievementList = [
  {
    id: 101,
    name: "既视感",
    description: "重开10次",
    grade: 0,
    condition: "TMS>9",
    hide: 0,
    opportunity: "END"
  },
  {
    id: 102,
    name: '渣男一枚',
    description: '出轨',
    grade: 1,
    condition: 'EVT?[131102]',
    hide: 0,
    opportunity: 'TRAJECTORY',
  },
  {
    id: 103,
    name: '出柜',
    description: '女装大佬出柜',
    grade: 0,
    condition: 'EVT?[150024]',
    hide: 0,
    opportunity: 'TRAJECTORY',
  },
  {
    id: 104,
    name: '跨性别',
    description: '女装大佬的不归路',
    grade: 2,
    condition: 'EVT?[150023]',
    hide: 1,
    opportunity: 'TRAJECTORY',
  },
  {
    id: 105,
    name: "契而不舍",
    description: "重开50次",
    grade: 1,
    condition: "TMS>49",
    hide: 0,
    opportunity: "END"
  },
  {
    id: 106,
    name: '钢铁直男',
    description: '拒绝恋爱...',
    grade: 1,
    condition: '(EVT?[131101])&(TLT?[1054])',
    hide: 0,
    opportunity: 'TRAJECTORY',
  },
  {
    id: 107,
    name: "码农强迫症",
    description: "重开200次",
    grade: 2,
    condition: "TMS>199",
    hide: 0,
    opportunity: "END"
  },
  {
    id: 108,
    name: "真爱不用说",
    description: "重开500次",
    grade: 3,
    condition: "TMS>499",
    hide: 0,
    opportunity: "END"
  },
  {
    id: 109,
    name: "高工",
    description: "晋升到P7",
    grade: 1,
    condition: "EVT?[391007]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 110,
    name: "技术专家",
    description: "晋升到P8",
    grade: 1,
    condition: "EVT?[391008]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 111,
    name: "架构师",
    description: "晋升到P9",
    grade: 2,
    condition: "EVT?[391009]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 112,
    name: "架构师II",
    description: "晋升到P10",
    grade: 2,
    condition: "EVT?[391010]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 113,
    name: "CTO-1",
    description: "晋升到P11",
    grade: 3,
    condition: "EVT?[391011]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 114,
    name: "CTO",
    description: "晋升到P12",
    grade: 3,
    condition: "EVT?[391012]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 115,
    name: "嫁给他",
    description: "性别而已，不要卡那么死~",
    grade: 2,
    condition: "EVT?[900007]",
    hide: 1,
    opportunity: "TRAJECTORY"
  },
  {
    id: 116,
    name: "颜如玉",
    description: "颜值>10",
    grade: 0,
    condition: "CHR>10",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 117,
    name: "天生我才",
    description: "智商>10",
    grade: 0,
    condition: "INT>10",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 118,
    name: "四肢发达",
    description: "健康>10",
    grade: 0,
    condition: "STR>10",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 119,
    name: "看破红尘",
    description: "心态>10",
    grade: 0,
    condition: "SPR>10",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 120,
    name: "福星高照",
    description: "幸运>3",
    grade: 1,
    condition: "BLCK>3",
    hide: 1,
    opportunity: "TRAJECTORY"
  },
  {
    id: 121,
    name: "天道之子",
    description: "幸运>4",
    grade: 2,
    condition: "BLCK>4",
    hide: 1,
    opportunity: "TRAJECTORY"
  },
  {
    id: 122,
    name: "位面之子",
    description: "幸运>5",
    grade: 3,
    condition: "BLCK>5",
    hide: 1,
    opportunity: "TRAJECTORY"
  },
  {
    id: 123,
    name: "平行宇宙",
    description: "原来平行宇宙是真的？？！",
    grade: 0,
    condition: "EVT?[1110000]",
    hide: 1,
    opportunity: "TRAJECTORY"
  },
  {
    id: 124,
    name: "葫芦娃",
    description: "葫芦娃，一根藤上七朵花。",
    grade: 1,
    condition: "EVT?[1110001]",
    hide: 1,
    opportunity: "TRAJECTORY"
  },
  {
    id: 125,
    name: "齐天大圣",
    description: "孙悟空加入。",
    grade: 3,
    condition: "EVT?[1111008,1111009]",
    hide: 1,
    opportunity: "TRAJECTORY"
  },
  {
    id: 126,
    name: "救世主",
    description: "你拯救了世界。",
    grade: 3,
    condition: "EVT?[1111011,1111012]",
    hide: 1,
    opportunity: "TRAJECTORY"
  },
  {
    id: 127,
    name: "末日英雄",
    description: "你试图拯救世界，但没有成功。",
    grade: 3,
    condition: "EVT?[1111010]",
    hide: 1,
    opportunity: "TRAJECTORY"
  },
  {
    id: 128,
    name: "受虐狂",
    description: "你因为不用加班而不开心。",
    grade: 2,
    condition: "EVT?[850053]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 129,
    name: "抢月饼",
    description: "抢月饼会发生什么呢？",
    grade: 1,
    condition: "EVT?[130000]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 130,
    name: "脑门闪亮",
    description: "秃头也挡不住你的颜值。",
    grade: 0,
    condition: "EVT?[500002]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 131,
    name: "为了颜值",
    description: "你用雌激素治疗脱发。",
    grade: 1,
    condition: "EVT?[510003]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 132,
    name: "美丽的代价",
    description: "用雌激素结果变性。",
    grade: 2,
    condition: "EVT?[510004]",
    hide: 1,
    opportunity: "TRAJECTORY"
  },
  {
    id: 133,
    name: "有房有车",
    description: "买了房也买了车。",
    grade: 1,
    condition: "(EVT?[400017])&(EVT?[400005,400105])",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 134,
    name: "五子登科",
    description: "有房、有车、结婚、有娃、有钱",
    grade: 2,
    condition: "(EVT?[400017])&(EVT?[400005,400105])&(EVT?[220003,220004])&(MNY>5)",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 135,
    name: "黄袍加身",
    description: "退休后去送外卖",
    grade: 1,
    condition: "EVT?[999115]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 136,
    name: "自恋狂",
    description: "喜欢照镜子",
    grade: 1,
    condition: "EVT?[880005,870011]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 137,
    name: "提桶跑路",
    description: "工作不到一年就离开了行业。",
    grade: 0,
    condition: "AGE<13",
    hide: 0,
    opportunity: "SUMMARY"
  },
  {
    id: 138,
    name: "光荣退休",
    description: "你在行业工作满50年。",
    grade: 3,
    condition: "AGE>599",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 139,
    name: "十年一梦",
    description: "坚持了十年，最终离开行业。",
    grade: 0,
    condition: "EVT?[999001,999002,999003]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 140,
    name: "廿年终悔",
    description: "坚持了二十年，最终离开行业。",
    grade: 1,
    condition: "EVT?[999004,999005,999006]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 141,
    name: "卅年人生",
    description: "坚持了三十年，最终离开行业。",
    grade: 2,
    condition: "EVT?[999007,999008,999009]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 142,
    name: "成功上岸",
    description: "你财务自由退休。",
    grade: 1,
    condition: "EVT?[999010]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 143,
    name: "跳槽一时爽",
    description: "跳槽达到5次。",
    grade: 1,
    condition: "JUMP>4",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 144,
    name: "白白胖胖",
    description: "你最可爱。",
    grade: 1,
    condition: "(EVT?[850070])&(EVT?[850071])&(EVT?[850072,850073])",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 145,
    name: '科学家',
    description: '你转行成为科学家。',
    grade: 1,
    condition: 'EVT?[999100,900009]',
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 146,
    name: '悲惨人生',
    description: '你在工作中死了。',
    grade: 1,
    condition: 'EVT?[900008,999999,800000,900001,900011,400016]',
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 147,
    name: '股票帝',
    description: '你在股票市场赚了大钱。',
    grade: 3,
    condition: '(EVT?[420006])&(EVT?[420008])',
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 148,
    name: '老韭菜',
    description: '老股民，在股票市场被收割。',
    grade: 2,
    condition: '(EVT?[400014])&(EVT?[420000,420001,420004,420009])',
    hide: 0,
    opportunity: "TRAJECTORY"
  }, 
  {
    id: 149,
    name: '笑到最后',
    description: '你收购了公司。',
    grade: 2,
    condition: 'EVT?[900003]',
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 150,
    name: '活得潇洒',
    description: '有钱有闲，潇洒人生。',
    grade: 1,
    condition: 'EVT?[900002]',
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 151,
    name: '萌新打击',
    description: '感受到这个社会对新人满满的恶意了。',
    grade: 1,
    condition: 'EVT?[800001]',
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 152,
    name: '去搬砖',
    description: '不说了，去搬砖。。。',
    grade: 0,
    condition: 'EVT?[900000,700004]',
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 153,
    name: '为人师表',
    description: '当老师，教书育人。',
    grade: 1,
    condition: 'EVT?[999101,900010]',
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 154,
    name: '写本小说',
    description: '当上网络写手。',
    grade: 0,
    condition: 'EVT?[999102]',
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 155,
    name: '哲学家',
    description: '当上哲学家。',
    grade: 1,
    condition: 'EVT?[999103]',
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 156,
    name: '大红人',
    description: '当上网红或明星。',
    grade: 1,
    condition: 'EVT?[999104,900004,900005,900012]',
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 157,
    name: '第二春',
    description: '退休后去旅游或当老板。',
    grade: 1,
    condition: 'EVT?[999105,999106]',
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 158,
    name: '家有贤妻',
    description: '退休后顾家。',
    grade: 1,
    condition: 'EVT?[900006]',
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 159,
    name: '值得吗？',
    description: '当女装大佬遇上霸道总裁。',
    grade: 2,
    condition: 'EVT?[900014]',
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 160,
    name: '爱上你',
    description: '霸道总裁爱上你。',
    grade: 2,
    condition: 'EVT?[900013]',
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 161,
    name: '负债累累',
    description: '欠下了巨额债务。',
    grade: 0,
    condition: 'EVT?[900015,900016]',
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 162,
    name: "小金人",
    description: "在一家公司待满十年。",
    grade: 3,
    condition: "WRK>119",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 163,
    name: "五年一日",
    description: "在一家公司待满五年。",
    grade: 2,
    condition: "WRK>59",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 164,
    name: "三年坚持",
    description: "在一家公司待满三年。",
    grade: 1,
    condition: "WRK>35",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 165,
    name: "扫帚星",
    description: "干黄一家公司。",
    grade: 1,
    condition: "EVT?[850059]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 166,
    name: "隔壁卧底？",
    description: "干黄两家公司。",
    grade: 2,
    condition: "EVT?[850062]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 167,
    name: "老板克星",
    description: "干黄三家公司。",
    grade: 3,
    condition: "EVT?[850065]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 168,
    name: "招谁惹谁？",
    description: "老板和小姨子跑路。",
    grade: 0,
    condition: "EVT?[850066]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 169,
    name: "涅槃",
    description: "你重生了。",
    grade: 1,
    condition: "EVT?[999888]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 170,
    name: "猫妖转世",
    description: "你上辈子是喵星人。",
    grade: 3,
    condition: "(EVT?[888726])&(EVT?[999888])",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
];

export const achievements = map(achievementList);