import { summary } from './functions/summary.js';
import { getGrade } from './functions/addition.js';
import { specialthanks } from './data/specialthanks.js';
import Life from './life.js';
import svgNumber from './svgNumber.js';

const numberToSvg = (number) => {
    return number.toString().split('').map(num => svgNumber['svg' + num]);
}

const DATA = [[1,'红砖级','霉霉','码农'],
    [11,'红砖级','懒懒','码农'],
    [21,'红砖级','丧丧','码农'],
    [41,'青铜级','躺躺','码工'],
    [61,'青铜级','平平','码工'],
    [81,'青铜级','呆呆','码工'],
    [111,'白银级','乐乐','程序猿'],
    [141,'白银级','忙忙','程序猿'],
    [171,'白银级','卷卷','程序猿'],
    [211,'黄金级','艰苦','攻城师'],
    [251,'黄金级','奋斗','攻城师'],
    [291,'黄金级','不懈','攻城师'],
    [341,'铂金级','勇敢','CXO'],
    [391,'铂金级','蓬勃','CXO'],
    [441,'铂金级','顶尖','CXO'],
    [501,'宝钻级','淡然','码神'],
    [561,'宝钻级','无敌','码神'],
    [621,'宝钻级','寂寞','码神']];
const getTitle = (grade) => {
    const len = DATA.length;
    for(let i = 0; i < len; i++){
        if(grade >= DATA[i][0] && !DATA[i+1]){
            const data = DATA[i];
            return `我已获「${data[1]}${data[2]}${data[3]}」称号!`
        }else if(grade >= DATA[i][0] && grade < DATA[i + 1][0]){
            const data = DATA[i];
            return `我已获「${data[1]}${data[2]}${data[3]}」称号!`
        }else if(grade > DATA[i][0] && grade > DATA[i + 1][0]){
            continue;
        }
    }
}

class App{
    constructor(){
        this.#life = new Life();
    }

    #life;
    #pages;
    #currentPage;
    #talentSelected = new Set();
    #totalMax=20;
    #isEnd = false;
    #selectedExtendTalent = null;
    #hintTimeout;
    #specialthanks;

    async initial() {
        this.initPages();
        this.switch('loading');
        await this.#life.initial();
        this.#specialthanks = specialthanks;
        this.switch('index');
        // this.switch('share')
        globalThis.onerror = (event, source, lineno, colno, error) => {
            this.hint(`[ERROR] at (${source}:${lineno}:${colno})\n\n${error?.stack||error||'unknow Error'}`, 'error');
        }
        const keyDownCallback = (keyboardEvent) => {
            if (keyboardEvent.which === 13 || keyboardEvent.keyCode === 13 ||
                keyboardEvent.which === 32 || keyboardEvent.keyCode === 32) {
                const pressEnterFunc = this.#pages[this.#currentPage]?.pressEnter;
                pressEnterFunc && typeof pressEnterFunc === 'function' && pressEnterFunc();
            }
        }
        globalThis.removeEventListener('keydown', keyDownCallback);
        globalThis.addEventListener('keydown', keyDownCallback);
    }

    initPages() {

        // Loading
        const loadingPage = $(`
        <div id="main">
            <div id="title">
                码农搬砖模拟器<br>
                <div style="font-size:1.5rem; font-weight:normal;">加载中...</div>
            </div>
        </div>
        `);

        // Index
        const indexPage = $(`
        <div id="main">
            <button id="specialthanks">特别感谢</button>
            <button id="themeToggleBtn">黑</button>
            <div id="title">
                码农搬砖模拟器<br>
                <div style="font-size:1.5rem; font-weight:normal;">如果不是家里穷，我也不想当码农</div>
            </div>
            <div style="width:100%;position:fixed;top:65%;left:50%;display:flex;max-width:800px;transform:translate(-50%,0);">
                <button id="restart" class="mainbtn" style="flex:1;"><span class="iconfont">&#xe6a7;</span>立即重开</button>
                <button id="achievement" class="mainbtn" style="flex:1;">已解锁成就</button>
            </div>
            <a id="discord" href="https://juejin.cn/pin/club/7009157550285258766" style="z-index: 9999;" aria-label="Chat on Discord"><button class="discord-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" viewBox="0 0 94.011 74.831">
            <g transform="scale(0.9,0.9) translate(-297.913 -2489.466)">
              <path d="M344.918,2535.954l0,0h0l29.2-23.04-7.917-6.357-21.283,16.793,0,0-.009.007-21.278-16.788-7.915,6.359,29.194,23.033Z" fill="#fff"/>
              <path d="M344.913,2507.564l.005,0,11.313-9-11.313-9.083-.015-.012-11.3,9.076,11.3,9.014Z" fill="#fff"/>
              <path d="M344.918,2551.693h0l-.012.01-39.078-30.833-7.915,6.358.761.6,46.244,36.468h0l29.223-23.056,17.782-14.03-7.917-6.357Z" fill="#fff"/>
            </g>
            </svg>
            CHAT</button><style>.discord-btn {position: fixed;bottom: 3.2rem;left: 0.5rem;background-color: #5865F2;padding: 0.7rem;height: auto;color: white;text-align: right;vertical-align: middle;border: none;width: 6.5rem;font-size: 1rem;border-radius: 4px;}.discord-btn svg {height: 1.5rem;position: absolute;top: 50%;left: 0;transform: translateY(-50%);}.discord-btn:hover svg{animation:discord-wave 560ms ease-in-out;}@keyframes discord-wave{0%,100%{transform:translateY(-50%) rotate(0)}20%,60%{transform:translateY(-50%) rotate(-25deg)}40%,80%{transform:translateY(-50%) rotate(10deg)}}@media (max-width:500px){.discord-btn:hover svg{animation:none}.discord-btn svg{animation:discord-wave 560ms ease-in-out}}</style></a>
        </div>
        `);

        // Init theme
        this.setTheme(localStorage.getItem('theme'))

        indexPage
            .find('#restart')
            .click(()=>this.switch('talent'));

        indexPage
            .find('#achievement')
            .click(()=>this.switch('achievement'));

        if(localStorage.getItem('theme') == 'light') {
            indexPage.find('#themeToggleBtn').text('黑')
        } else{
            indexPage.find('#themeToggleBtn').text('白')
        }

        indexPage
            .find("#themeToggleBtn")
            .click(() => {
                if(localStorage.getItem('theme') == 'light') {
                    localStorage.setItem('theme', 'dark');
                    indexPage.find('#themeToggleBtn').text('白')
                } else {
                    localStorage.setItem('theme', 'light');
                    indexPage.find('#themeToggleBtn').text('黑')
                }

                this.setTheme(localStorage.getItem('theme'))
            });

        indexPage
            .find('#specialthanks')
            .click(()=>this.switch('specialthanks'));

        const specialThanksPage = $(`
        <div id="main">
            <button id="specialthanks">返回</button>
            <div id="spthx">
                <ul class="g1"></ul>
                <ul class="g2"></ul>
            </div>
            <button class="sponsor" onclick="globalThis.open('https://afdian.net/@LifeRestart')" style="background: linear-gradient(90deg,#946ce6,#7e5fd9); left:auto; right:50%; transform: translate(-2rem,-50%);">打赏策划(爱发电)</button>
            <button class="sponsor" onclick="globalThis.open('https://dun.mianbaoduo.com/@vickscarlet')" style="background-color:#c69; left:50%; right:auto; transform: translate(2rem,-50%);">打赏程序(顿顿饭)</button>
        </div>
        `);

        specialThanksPage
            .find('#specialthanks')
            .click(()=>this.switch('index'));

        const achievementPage = $(`
        <div id="main">
            <button id="specialthanks">返回</button>
            <span class="title">统计</span>
            <ul id="total"></ul>
            <span style="padding:0.25rem; margin: 0.5rem 0; border: none; background: #ccc;"></span>
            <span class="title">成就</span>
            <ul id="achievements"></ul>
        `)

        achievementPage
            .find('#specialthanks')
            .click(()=>this.switch('index'));

        // Talent
        const talentPage = $(`
        <div id="main">
            <div class="head" style="font-size: 1.6rem">天赋抽卡</div>
            <button id="random" class="mainbtn" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);"">10连抽！</button>
            <ul id="talents" class="selectlist"></ul>
            <button id="next" class="mainbtn">请选择3个</button>
        </div>
        `);

        const createTalent = ({ grade, name, description }) => {
            return $(`<li class="grade${grade}b">${name}（${description}）</li>`)
        };

        talentPage
            .find('#random')
            .click(()=>{
                talentPage.find('#random').hide();
                const ul = talentPage.find('#talents');
                this.#life.talentRandom()
                    .forEach(talent=>{
                        const li = createTalent(talent);
                        ul.append(li);
                        li.click(()=>{
                            if(li.hasClass('selected')) {
                                li.removeClass('selected')
                                this.#talentSelected.delete(talent);
                                if(this.#talentSelected.size<3) {
                                    talentPage.find('#next').text('请选择3个')
                                }
                            } else {
                                if(this.#talentSelected.size==3) {
                                    this.hint('只能选3个天赋');
                                    return;
                                }

                                const exclusive = this.#life.exclusive(
                                    Array.from(this.#talentSelected).map(({id})=>id),
                                    talent.id
                                );
                                if(exclusive != null) {
                                    for(const { name, id } of this.#talentSelected) {
                                        if(id == exclusive) {
                                            this.hint(`与已选择的天赋【${name}】冲突`);
                                            return;
                                        }
                                    }
                                    return;
                                }
                                li.addClass('selected');
                                this.#talentSelected.add(talent);
                                if(this.#talentSelected.size==3) {
                                    talentPage.find('#next').text('开启搬砖人生')
                                }
                            }
                        });
                    });
                talentPage.find('#next').show()
            });

        talentPage
            .find('#next')
            .click(()=>{
                if(this.#talentSelected.size!=3) {
                    this.hint('请选择3个天赋');
                    return;
                }
                talentPage.find('#next').hide()
                this.#totalMax = 20 + this.#life.getTalentAllocationAddition(Array.from(this.#talentSelected).map(({id})=>id));
                this.switch('property');
            })

        // Property
        // hint of extension tobermory.es6-string-html
        const propertyPage = $(/*html*/`
        <div id="main">
            <div class="head" style="font-size: 1.6rem">
                <div>调整初始属性</div>
                <div id="total" style="font-size:1rem; font-weight:normal;">可用属性点：0</div>
            </div>
            <ul id="propertyAllocation" class="propinitial"></ul>
            <ul class="selectlist" id="talentSelectedView"></ul>
            <div class="btn-area">
                <button id="random" class="mainbtn">随机分配</button>
                <button id="start" class="mainbtn">开始新人生</button>
            </div>
        </div>
        `);
        propertyPage.mounted = ()=>{
            propertyPage
            .find('#talentSelectedView').append(
                `<li>已选天赋</li>` +
                Array.from(this.#talentSelected)
                .map(({name,description})=>`<li class="grade0b">${name}(${description})</li>`)
                .join('')
            )
        }
        const groups = {};
        const total = ()=>{
            let t = 0;
            for(const type in groups)
                t += groups[type].get();
            return t;
        }
        const freshTotal = ()=>{
            propertyPage.find('#total').text(`可用属性点：${this.#totalMax - total()}`);
        }
        const getBtnGroups = (name, min, max)=>{
            const group = $(`<li>${name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>`);
            const btnSub = $(`<span class="iconfont propbtn">&#xe6a5;</span>`);
            const inputBox = $(`<input value="0">`);
            const btnAdd = $(`<span class="iconfont propbtn">&#xe6a6;</span>`);
            group.append(btnSub);
            group.append(inputBox);
            group.append(btnAdd);

            const limit = v=>{
                v = Number(v)||0;
                v = Math.round(v);
                return v < min ? min : (
                    v > max ? max : v
                )
            }
            const get = ()=>Number(inputBox.val());
            const set = v=>{
                inputBox.val(limit(v));
                freshTotal();
            }
            btnAdd.click(()=>{
                if(total() >= this.#totalMax) {
                    this.hint('没有可分配的点数了');
                    return;
                }
                set(get()+1);
            });
            btnSub.click(()=>set(get()-1));
            inputBox.on('input', ()=>{
                const t = total();
                let val = get();
                if(t > this.#totalMax) {
                    val -= t - this.#totalMax;
                }
                val = limit(val);
                if(val != inputBox.val()) {
                    set(val);
                }
                freshTotal();
            });
            return {group, get, set};
        }

        groups.CHR = getBtnGroups("颜值", 0, 10); // 颜值 charm CHR
        groups.INT = getBtnGroups("智商", 0, 10); // 智力 intelligence INT
        groups.STR = getBtnGroups("健康", 0, 10); // 体质 strength STR
        groups.SPR = getBtnGroups("心态", 0, 10); // 心态

        const ul = propertyPage.find('#propertyAllocation');

        for(const type in groups) {
            ul.append(groups[type].group);
        }

        propertyPage
            .find('#random')
            .click(()=>{
                let t = this.#totalMax;
                const arr = [10, 10, 10, 10];
                while(t>0) {
                    const sub = Math.round(Math.random() * (Math.min(t, 10) - 1)) + 1;
                    while(true) {
                        const select = Math.floor(Math.random() * 4) % 4;
                        if(arr[select] - sub <0) continue;
                        arr[select] -= sub;
                        t -= sub;
                        break;
                    }
                }
                groups.CHR.set(10 - arr[0]);
                groups.INT.set(10 - arr[1]);
                groups.STR.set(10 - arr[2]);
                groups.SPR.set(10 - arr[3]);
            });

        propertyPage
            .find('#start')
            .click(()=>{
                if(total() < this.#totalMax) {
                    this.hint(`你还有${this.#totalMax-total()}属性点没有分配完`);
                    return;
                } else if (total() > this.#totalMax) {
                    this.hint(`你多使用了${total() - this.#totalMax}属性点`);
                    return;
                }
                this.#life.restart({
                    CHR: groups.CHR.get(),
                    INT: groups.INT.get(),
                    STR: groups.STR.get(),
                    MNY: 0,
                    SPR: groups.SPR.get(),
                    TLT: Array.from(this.#talentSelected).map(({id})=>id),
                });
                this.switch('trajectory');
                this.#pages.trajectory.born();
                // $(document).keydown(function(event){
                //     if(event.which == 32 || event.which == 13){
                //         $('#lifeTrajectory').click();
                //     }
                // })
            });

        // Trajectory
        const trajectoryPage = $(`
        <div id="main">
            <ul id="lifeProperty" class="lifeProperty"></ul>
            <ul id="lifeTrajectory" class="lifeTrajectory"></ul>
            <div class="btn-area">
                <button id="summary" class="mainbtn">搬砖生涯总结</button>
                <button id="domToImage" class="mainbtn">人生回放</button>
            </div>
            <div class="domToImage2wx">
                <img src="" id="endImage" />
            </div>
        </div>
        `);

        trajectoryPage
            .find('#lifeTrajectory')
            .click(()=>{
                if(this.#isEnd) return;
                const trajectory = this.#life.next();
                const { age, content, isEnd } = trajectory;
                const li = $(`<li><span>${age}个月：</span><span>${
                    content.map(
                        ({type, description, grade, name, postEvent}) => {
                            switch(type) {
                                case 'TLT':
                                    return `天赋【${name}】发动：${description}`;
                                case 'EVT':
                                    return description + (postEvent?`<br>${postEvent}`:'');
                            }
                        }
                    ).join('<br>')
                }</span></li>`);
                li.appendTo('#lifeTrajectory');
                $("#lifeTrajectory").scrollTop($("#lifeTrajectory")[0].scrollHeight);
                if(isEnd) {
                    $(document).unbind("keydown");
                    this.#isEnd = true;
                    trajectoryPage.find('#summary').show();
                    // trajectoryPage.find('#domToImage').show();
                } else {
                    // 如未死亡，更新数值
                    // Update properties if not die yet
                    const property = this.#life.getLastRecord();
                    $("#lifeProperty").html(`
                    <li><span>颜值</span><span>${property.CHR}</span></li>
                    <li><span>智商</span><span>${property.INT}</span></li>
                    <li><span>健康</span><span>${property.STR}</span></li>
                    <li><span>财富</span><span>${property.MNY}</span></li>
                    <li><span>心态</span><span>${property.SPR}</span></li>
                    `);
                }
            });
        // html2canvas
        trajectoryPage
            .find('#domToImage')
            .click(()=>{
                $("#lifeTrajectory").addClass("deleteFixed");
                const ua = navigator.userAgent.toLowerCase();
                domtoimage.toJpeg(document.getElementById('lifeTrajectory'))
                    .then(function (dataUrl) {
                        let link = document.createElement('a');
                        link.download = '我的人生回放.jpeg';
                        link.href = dataUrl;
                        link.click();
                        $("#lifeTrajectory").removeClass("deleteFixed");
                        // 微信内置浏览器，显示图片，需要用户单独保存
                        if(ua.match(/MicroMessenger/i)=="micromessenger") {
                            $('#endImage').attr('src', dataUrl);
                        }

                    });
            })
            .hide();

        trajectoryPage
            .find('#summary')
            .click(()=>{
                this.switch('summary');
            });

        const playAgain = ()=>{
            this.times ++;
            this.#life.talentExtend(this.#selectedExtendTalent);
            this.#selectedExtendTalent = null;
            this.#talentSelected.clear();
            this.#totalMax = 20;
            this.#isEnd = false;
            this.switch('index');
        }
        // 分享结果页
        const sharePage = $(`
        <div id="main" class="share">
            <div class="content" style="margin-top:35px;">
                <div class="logo">
                    <img
                        src="https://lf9-static.bytednsdoc.com/obj/eden-cn/wthJoabvf_lm_tyvmahsWgpi/ljhwZthlaukjlkulzlp/coding_life/logo.png" />
                </div>
                <div class="bannerImg">
                    <img
                        src="https://lf9-static.bytednsdoc.com/obj/eden-cn/wthJoabvf_lm_tyvmahsWgpi/ljhwZthlaukjlkulzlp/coding_life/banner.png" />
                </div>
                <div class="slogan" style="color: #595959;">////////////////如果不是家里穷·我也不想当码农</div>
                <div class="result">
                    <div class="scope">
                        <img
                            src="https://lf9-static.bytednsdoc.com/obj/eden-cn/wthJoabvf_lm_tyvmahsWgpi/ljhwZthlaukjlkulzlp/coding_life/result.png" />
                    </div>
                    <div class="text">
               
                    </div>
                </div>
                <div class="talents">
                    <div class="header">{此生天赋.}</div>
                    <div class="list"></div>
                </div>
                <div class="index">
                    <div class="header">{各项指标.}</div>
                    <div class="summary">
                        <div class="desc">我已获「红砖级霉霉码农」称号!</div>
                        <div class="desc">此生总评<span class="grade">120</span>分</div>
                    </div>
                    <div class="cont">
                        <div class="left">
                            <div class="item zhili">
                                <img class="bg" src="https://lf9-static.bytednsdoc.com/obj/eden-cn/wthJoabvf_lm_tyvmahsWgpi/ljhwZthlaukjlkulzlp/coding_life/zhili.png" />
                                <span class="text desc">是否</span>
                                <span class="text count"></span>
                            </div>
                            <div class="item tizhi">
                                <img class="bg" src="https://lf9-static.bytednsdoc.com/obj/eden-cn/wthJoabvf_lm_tyvmahsWgpi/ljhwZthlaukjlkulzlp/coding_life/tizhi.png" />
                                <span class="text desc purple">是否</span>
                                <span class="text count"></span>
                            </div>
                            <div class="item xintai">
                                <img class="bg" src="https://lf9-static.bytednsdoc.com/obj/eden-cn/wthJoabvf_lm_tyvmahsWgpi/ljhwZthlaukjlkulzlp/coding_life/xintai.png" />
                                <span class="text desc">是否</span>
                                <span class="text count"></span>
                            </div>
                        </div>
                        <div class="right">
                            <div class="item yanzhi">
                                <img class="bg" src="https://lf9-static.bytednsdoc.com/obj/eden-cn/wthJoabvf_lm_tyvmahsWgpi/ljhwZthlaukjlkulzlp/coding_life/yanzhi.png" />
                                <span class="text desc purple">水电</span>
                                <span class="text count"></span>
                            </div>
                            <div class="item caifu">
                                <img class="bg" src="https://lf9-static.bytednsdoc.com/obj/eden-cn/wthJoabvf_lm_tyvmahsWgpi/ljhwZthlaukjlkulzlp/coding_life/caifu.png" />
                                <span class="text desc">是否</span>
                                <span class="text count"></span>
                            </div>
                            <div class="item gongling">
                                <img class="bg" src="https://lf9-static.bytednsdoc.com/obj/eden-cn/wthJoabvf_lm_tyvmahsWgpi/ljhwZthlaukjlkulzlp/coding_life/gongling.png" />
                                <span class="text desc">切我</span>
                                <span class="text count"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="highlight">
                    <p>你毕业了，成为一名程序猿</p>
                    <p>你走在上班路上，天上忽然骗来一张小纸条，你捡起来，之间上面写着<br/>【号外】掘金大会开始了</p>
                    <p>同时为1=2等于几</p>
                    <p>LD夸你张的好看<br/>对你说，你那么好看，为什么不转前端</p>
                    <p>你作为程序猿工作了10多年，觉的自己不喜欢这个职业</p>
                </div>
                <div class="divide">//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////</div>
                <div class="erweima">
                    <div class="item">
                        <div class="image">
                            <img src="https://lf9-static.bytednsdoc.com/obj/eden-cn/wthJoabvf_lm_tyvmahsWgpi/ljhwZthlaukjlkulzlp/coding_life/dashen.png" />
                        </div>
                        围观大神
                    </div>
                    <div class="item">
                        <div class="image">
                            <img src="https://lf9-static.bytednsdoc.com/obj/eden-cn/wthJoabvf_lm_tyvmahsWgpi/ljhwZthlaukjlkulzlp/coding_life/banzhuan.png" />
                        </div>
                        模拟搬砖
                    </div>
                </div>
                <div class="footer">电脑端请登录_ https://juejin.cn/game/coding-life</div>
                <div id="moreBtn" style="display:flex;">
                    <button id="save" class="mainbtn" style="flex:1;">保存图片</button>
                    <button id="goRestart" class="mainbtn" style="flex:1;">返回游戏</button>
                </div>
            </div>
        </div>
        
        <div class="domToImage2wx" style="top:0;display:none; box-sizing:border-box;overflow:scroll;height:100%;">
            <p style="position:absolute;color:#de4141;width:100%;text-align:center;font-size:1.6rem;">长按图片保存</p>
            <span class="close" style="position:fixed;top:0.3rem;right:0.3rem;z-index:10;">
                <svg style="font-size:2rem;color:#666;" viewBox="64 64 896 896" focusable="false" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"></path><path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
            </span>
            <img src="" id="endImage" />
        </div>
        `);
        sharePage
            .find('#save')
            .click(()=>{
                $("#moreBtn").hide();
                // $("#lifeTrajectory").addClass("deleteFixed");
                const ua = navigator.userAgent.toLowerCase();
                domtoimage.toJpeg(document.getElementById('main'))
                    .then(function (dataUrl) {


                        $("#moreBtn").show();
                        // $("#lifeTrajectory").removeClass("deleteFixed");

                        const isWeixin = ua.match(/MicroMessenger/i)=="micromessenger";
                        const isMobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);


                        // 微信内置浏览器，显示图片，需要用户单独保存
                        if(isWeixin || isMobile) {
                            // $('.domToImage2wx').css({'border':'solid 5px yellow','background':'red', height: '100%', 'overflow':'scroll', 'box-sizing':'border-box'})
                            $('#endImage').attr('src', dataUrl);
                            $('.domToImage2wx').show();
                        }else{
                            download(dataUrl, "coding-life.png", "image/png");
                        }

                    });
            })
        sharePage
            .find('#goRestart')
            .click(()=>{
                playAgain();
                $('.github-corner').show();
                $('body').css({'height': '100%'})
            })
        sharePage
            .find('.close')
            .click(()=>{
                $('.domToImage2wx').hide();
            })

        // Summary
        const summaryPage = $(`
        <div id="main">
            <div class="head">搬砖生涯总结</div>
            <ul id="judge" class="judge">
                <li class="grade2"><span>颜值：</span><span>9级 美若天仙</span></li>
                <li class="grade0"><span>智商：</span><span>4级 智力一般</span></li>
                <li class="grade0"><span>健康：</span><span>1级 极度虚弱</span></li>
                <li class="grade0"><span>财富：</span><span>6级 小康之家</span></li>
                <li class="grade0"><span>司龄：</span><span>3岁 早夭</span></li>
                <li class="grade0"><span>心态：</span><span></span>3级 不太幸福的人生</li>
            </ul>
            <div class="head" style="height:auto;">天赋，你可以选一个，下辈子还能抽到</div>
            <ul id="talents" class="selectlist" style="flex: 0 1 auto;">
                <li class="grade2b">黑幕（面试一定成功）</li>
            </ul>
            <div style="display:flex;">
                <button id="again" class="mainbtn" style="flex:1;"><span class="iconfont">&#xe6a7;</span>再次重开</button>
                <button id="share" class="mainbtn" style="flex:1;"><span class="iconfont">&#xe6a7;</span>分享</button>        
            </div>
            <div style="margin:0 1rem 1rem;">
                <a target="_blank" href="https://conf.juejin.cn/xdc2021?utm_source=life" style="color: #fff;text-decoration: none;border: solid 0.2rem;display: block;border-radius: 0.2rem;">围观大神搬砖</a>
            </div>
        </div>
        `);

        summaryPage
            .find('#again')
            .click(()=>{
                playAgain();
            });

        summaryPage
            .find('#share')
            .click(()=>{
                this.switch('share');
                $('.github-corner').hide();
                $('body').css({'height': 'auto'})

                const talents = this.#talentSelected;
                const summaryData = this.#life.getSummary();
                // console.log(talents, summaryData)

                const arrTalentHtml = [];
                [...talents].forEach((talent, index) => {
                    arrTalentHtml.push(`
                        <div class="item">
                            <div class="name">${talent.name}</div>
                            <div class="desc">${talent.description}</div>
                        </div>
                    `)
                })
                sharePage.find('.talents .list').html(arrTalentHtml.join(''))
                
                const arrResultSvg = numberToSvg(summaryData.AGE)
                sharePage.find('.result .text').html(arrResultSvg.join(''));

                const arrSummarySvg = numberToSvg(summaryData.SUM);
                sharePage.find('.index .summary .desc').eq(0).html(getTitle(summaryData.SUM))
                sharePage.find('.index .summary .grade').html(arrSummarySvg.join(''));

                const obj = {
                    'CHR': 'yanzhi',
                    'INT': 'zhili', 
                    'STR': 'tizhi', 
                    'MNY': 'caifu', 
                    'SPR': 'xintai', 
                    'AGE': 'gongling'
                }
                Object.keys(obj).forEach(item => {
                    const {judge} = summary(item, summaryData[item]);
                    const $el = sharePage.find('.index .' + obj[item]);

                    $el.find('.desc').html(judge);
                    $el.find('.count').html(numberToSvg(summaryData[item]));
                })

                const highlights = this.highlight();
                console.log(highlights);
                const highlightHtml = [];
                highlights.forEach(item => {
                    // highlightHtml.push(`<p>第${item[0]}个月：${item[1].replace(/<br\s*\/*\s*>/g, '')}</p>`)
                    highlightHtml.push(`<div class="item"><span>${item[0]}个月：</span><p>${item[1].replace(/<br\s*\/*\s*>/g, '')}</p></div>`)
                })
                sharePage.find('.highlight').html(highlightHtml.join(''))

            })

        this.#pages = {
            loading: {
                page: loadingPage,
                clear: ()=>{
                    this.#currentPage = 'loading';
                },
            },
            index: {
                page: indexPage,
                btnAchievement: indexPage.find('#achievement'),
                btnRestart: indexPage.find('#restart'),
                hint: indexPage.find('.hint'),
                pressEnter: ()=>{
                    this.#pages.index.btnRestart.click();
                },
                clear: ()=>{
                    this.#currentPage = 'index';
                    indexPage.find('.hint').hide();

                    const times = this.times;
                    const achievement = indexPage.find('#achievement');
                    const discord = indexPage.find('#discord');
                    const specialthanks = indexPage.find('#specialthanks');

                    if(times > 0) {
                        achievement.show();
                        // discord.show();
                        // specialthanks.show();
                        return;
                    }

                    achievement.hide();
                    // discord.hide();
                    // specialthanks.hide();
                },
            },
            specialthanks: {
                page: specialThanksPage,
                clear: () => {
                    const groups = [
                        specialThanksPage.find('#spthx > ul.g1'),
                        specialThanksPage.find('#spthx > ul.g2'),
                    ];
                    groups.forEach(g=>g.empty());
                    this.#specialthanks
                        .sort(()=>0.5-Math.random())
                        .forEach(({group, name, comment, color})=>groups[--group].append(`
                            <li>
                                <span class="name" ${color?('style="color:'+color+'"'):''}>${name}</span>
                                <span class="comment">${comment||''}</span>
                            </li>
                        `))
                }
            },
            achievement: {
                page: achievementPage,
                clear: () => {
                    const total = achievementPage.find("ul#total");
                    const achievements = achievementPage.find("ul#achievements");
                    total.empty();
                    achievements.empty();

                    `<li><span class="achievementtitle">重开次数</span>紫色几率翻倍</li>`

                    const { times, achievement, talentRate, eventRate } = this.#life.getTotal();
                    total.append(`
                        <li class="achvg${getGrade('times', times)}"><span class="achievementtitle">已重开${times}次</span>抽到紫色几率不变</li>
                        <li class="achvg${getGrade('achievement', achievement)}"><span class="achievementtitle">成就达成${achievement}个</span>抽到橙色几率翻倍</li>
                        <li class="achvg${getGrade('talentRate', talentRate)}"><span class="achievementtitle">事件收集率</span>${Math.floor(talentRate * 100)}%</li>
                        <li class="achvg${getGrade('eventRate', eventRate)}"><span class="achievementtitle">天赋选择率</span>${Math.floor(eventRate * 100)}%</li>
                    `);

                    const achievementsData = this.#life.getAchievements();
                    achievementsData.forEach(({
                        name, description, hide,
                        grade, isAchieved
                    })=>{
                        if(hide && !isAchieved) name = description = '???';
                        achievements.append(
                            `<li class="achvg${grade} ${isAchieved?'':'mask'}"><span class="achievementtitle">${name}</span>${description}</li>`
                        );
                    })

                }
            },
            talent: {
                page: talentPage,
                talentList: talentPage.find('#talents'),
                btnRandom: talentPage.find('#random'),
                btnNext: talentPage.find('#next'),
                pressEnter: ()=>{
                    const talentList = this.#pages.talent.talentList;
                    const btnRandom = this.#pages.talent.btnRandom;
                    const btnNext = this.#pages.talent.btnNext;
                    if (talentList.children().length) {
                        btnNext.click();
                    } else {
                        btnRandom.click();
                    }
                },
                clear: ()=>{
                    this.#currentPage = 'talent';
                    talentPage.find('ul.selectlist').empty();
                    talentPage.find('#random').show();
                    this.#totalMax = 20;
                },
            },
            property: {
                page: propertyPage,
                btnStart: propertyPage.find('#start'),
                pressEnter: ()=>{
                    this.#pages.property.btnStart.click();
                },
                clear: ()=>{
                    this.#currentPage = 'property';
                    freshTotal();
                    propertyPage
                        .find('#talentSelectedView')
                        .empty();
                },
            },
            trajectory: {
                page: trajectoryPage,
                lifeTrajectory: trajectoryPage.find('#lifeTrajectory'),
                pressEnter: ()=>{
                    this.#pages.trajectory.lifeTrajectory.click();
                },
                clear: ()=>{
                    this.#currentPage = 'trajectory';
                    trajectoryPage.find('#lifeTrajectory').empty();
                    trajectoryPage.find('#summary').hide();
                    this.#isEnd = false;
                },
                born: ()=>{
                    trajectoryPage.find('#lifeTrajectory').trigger("click");
                }
            },
            summary: {
                page: summaryPage,
                clear: ()=>{
                    this.#currentPage = 'summary';
                    const judge = summaryPage.find('#judge');
                    const talents = summaryPage.find('#talents');
                    judge.empty();
                    talents.empty();
                    this.#talentSelected.forEach(talent=>{
                        const li = createTalent(talent);
                        talents.append(li);
                        li.click(()=>{
                            if(li.hasClass('selected')) {
                                this.#selectedExtendTalent = null;
                                li.removeClass('selected');
                            } else if(this.#selectedExtendTalent != null) {
                                this.hint('只能继承一个天赋');
                                return;
                            } else {
                                this.#selectedExtendTalent = talent.id;
                                li.addClass('selected');
                            }
                        });
                    });

                    const summaryData = this.#life.getSummary();
                    const format = (discription, type)=>{
                        const value = summaryData[type];
                        const { judge, grade } = summary(type, value);
                        return `<li class="grade${grade}"><span>${discription}：</span><span>${value} ${judge}</span></li>`;
                    };

                    judge.append(`
                        ${format('颜值', 'CHR')}
                        ${format('智力', 'INT')}
                        ${format('体质', 'STR')}
                        ${format('财富', 'MNY')}
                        ${format('心态', 'SPR')}
                        ${format('工龄', 'AGE')}
                        ${format('总搬砖力', 'SUM')}
                    `);
                }
            },
            share: {
                page: sharePage,
                clear: ()=>{
                    
                }
            }
        }

        $$on('achievement', ({name})=>{
            this.hint(`解锁成就【${name}】`, 'success');
        })
    }

    switch(page) {
        const p = this.#pages[page];
        if(!p) return;
        $('#main').detach();
        p.clear();
        p.page.appendTo('body');
        if(typeof p.page.mounted === 'function'){
            p.page.mounted()
        }
    }

    hint(message, type='info') {
        if(this.#hintTimeout) {
            clearTimeout(this.#hintTimeout);
            this.#hintTimeout = null;
        }
        hideBanners();
        requestAnimationFrame(() => {
            const banner = $(`.banner.${type}`);
            banner.addClass('visible');
            banner.find('.banner-message').text(message);
            if(type != 'error') {
                this.#hintTimeout = setTimeout(hideBanners, 3000);
            }
        });
    }

    highlight() {
        const highlightContents = this.#life.getHighLightContents(5);
        return highlightContents.map(({age, content}) => [age, content.map(
            ({type, description, name, postEvent}) => {
                switch(type) {
                    case 'TLT':
                        return `天赋【${name}】发动：${description}`;
                    case 'EVT':
                        return description + (postEvent?`<br>${postEvent}`:'');
                }
            }).join('<br>')]
        );
    }

    setTheme(theme) {
        const themeLink = $(document).find('#themeLink');

        if(theme == 'light') {
            themeLink.attr('href', LIGHT_CSS);
        } else {
            themeLink.attr('href', DARK_CSS);
        }
    }

    get times() {return this.#life?.times || 0;}
    set times(v) { if(this.#life) this.#life.times = v };

}

export default App;
