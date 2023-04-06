// ==UserScript==
// @name         网页繁简体转换 移动&桌面端通用✨
// @name:zh-CN   网页繁简体转换 移动&桌面端通用✨
// @name:zh-TW   網頁繁簡體轉換 移動&桌麵端通用✨
// @version      1.1.2
// @namespace    https://dev.ayouth.xyz/
// @description  网页繁简体转换，自动转换网页至用户环境对应中文或指定繁简体，快捷繁简体转换工具，右下方小组件，自定义配置。
// @description:zh-CN  网页繁简体转换，自动转换网页至用户环境对应中文或指定繁简体，快捷繁简体转换工具，右下方小组件，自定义配置。
// @description:zh-TW  網頁繁簡體轉換，自動轉換網頁至用戶環境對應中文或指定繁簡體，快捷繁簡體轉換工具，右下方小組件，自定義配置。
// @author       Ayouth
// @supportURL   https://dev.ayouth.xyz/msgboard/
// @match        *://*/*
// @icon         https://s1.ax1x.com/2022/06/17/Xq6j00.png
// @grant        GM_registerMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        unsafeWindow
// ==/UserScript==
(function () {
    "use strict";
    // 工具函数
    class Tool { constructor() { this._services = [], this.flags = { TEXT: "characterData", ATTR: "attributes", CHILD: "childList" }, this.observer = new MutationObserver(e => { const n = {}, t = new Set; for (const o of e) n[o.type] || (n[o.type] = []), t.add(o.type), n[o.type].push(o); for (const i of this._services) i.active && i.type.some(e => t.has(e)) && this.type(i.service, "function") && i.service(i.type.reduce((e, t) => (e[t] = n[t], e), {})) }), this.observer.observe(document.body, { attributes: !0, childList: !0, subtree: !0, characterData: !0 }) } delay(...e) { return setTimeout(...e) } tick(e, t, n = !1, ...o) { t = setInterval(e, t, ...o); return n && e(), t } open(e, t = "请点击前往") { if (!1 !== /macintosh|mac os x/i.test(navigator.userAgent)) { if (null === document.querySelector("style#Toolopen")) { const o = document.createElement("style"); o.id = "Toolopen", o.innerHTML = '#Topen:hover { background: #4d76f3; } @keyframes scale-in-center { 0% { transform: scale(0); opacity: 1; } 100% { transform: scale(1); opacity: 1; } } #Topen { font-family:Tahoma, Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;letter-spacing:1px;font-weight:bold;animation: scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both; transition: 0.15s; font-size: 20px; display: block; background: #6589f2; color: #efefef; text-decoration: underline; box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.35); border-radius: 4px; margin: auto; width: fit-content; height: fit-content; z-index: 9999999; position: fixed; top: 0; left: 0; right: 0; bottom: 0; padding: 12px; display: flex; align-items: center; justify-content: center }', this.injectStyleElement(o) } document.querySelectorAll("a#Topen").forEach(e => e.remove()); const n = document.createElement("a"); return n.target = "_blank", n.href = e, n.id = "Topen", n.textContent = t, n.onclick = () => { n.remove() }, document.documentElement.appendChild(n), this } window.open(e) } addService(e, t) { return this.type(e, "string") && (e = "*" === (e = e.trim()) ? [this.flags.ATTR, this.flags.TEXT, this.flags.CHILD] : [e]), this._services.push({ type: e, service: t, active: !0 }), this._services.length - 1 } removeService(e) { return e = Number(e), !isNaN(e) && e < this._services.length && 0 <= e && !(this._services[e].active = !1) } type(e, t = null) { return t ? typeof e === t.trim().toLowerCase() : typeof e } ready(t, n = 0) { if ("function" === T.type(t)) { const o = e => { document.removeEventListener("DOMContentLoaded", o), setTimeout(t, n || 0, e) }; "loading" != document.readyState ? o() : document.addEventListener("DOMContentLoaded", o) } } q(e) { try { return document.querySelector(e) } catch (e) { return null } } qs(e) { try { return [...document.querySelectorAll(e)] } catch (e) { return [] } } create(e) { return document.createElement(e) } before(e, t) { return e.insertAdjacentElement("beforebegin", t), this } after(e, t) { return e.insertAdjacentElement("afterend", t), this } injectStyleElement(e) { return document.head ? this.after(document.head, e) : document.body ? this.before(document.body, e) : document.documentElement.appendChild(e), this } import(o, i = "script", r = {}) { return new Promise(function (t, e) { const n = document.createElement(i);["href", "src"].forEach(e => { void 0 !== n[e] && (n[e] = o) }), Object.keys(r).forEach(e => n.setAttribute(e, r[e])), document.documentElement.appendChild(n), n.onload = function (e) { t({ evt: e, resource: n }) }, n.onerror = function () { e({ evt: evt, resource: n }) } }) } hide(e) { if (this.type(e, "string")) { const t = this.q("style#Toolhide") || this.create("style"); return t.id = "Toolhide", t.innerHTML += ` ${e}{display:none !important;} `, t.isConnected || this.injectStyleElement(t), this } return e.style.setProperty("display", "none", "important"), this } remove(e) { this.type(e, "string") && this.qs(e).forEach(e => e.remove()) } css(...n) { if (1 === n.length) return this.type(n[0], "string") && (n[0] = this.q(n[0])), window.getComputedStyle(n[0]); { let t; if (t = this.type(n[1], "string") ? n[1] : Object.entries(n[1]).reduce((e, t) => e + t[0] + ":" + t[1] + " !important;", ""), this.type(n[0], "string")) { let e = this.q("style#Toolcss") || this.create("style"); e.id = "Toolcss", e.innerHTML += ` ${n[0]}{${t};} `, e.isConnected || this.injectStyleElement(e) } else Object.keys(n[1]).forEach(e => { n[0].style.setProperty(e, n[1][e], "important") }) } } on(e, t, n, o = !1) { (e = this.type(e, "string") ? this.q(e) : e).addEventListener(t, n, o) } test(e = { host: [], path: [], strict: !1, callback: void 0 }) { const t = e.host instanceof Array ? e.host : [e.host || location.host], n = e.path instanceof Array ? e.path : [e.path || location.pathname]; let o, i = (e, t) => e instanceof RegExp ? e.test(t) : -1 < t.indexOf(e), r = (e, t) => e instanceof RegExp ? e.test(t) : t === e; return (o = e.strict ? t.every(e => r(e, location.host)) && n.every(e => r(e, location.pathname)) : t.some(e => i(e, location.host)) && n.some(e => i(e, location.pathname))) && e.callback && e.callback(), o } } const $log = { connector: " - ", levelColor: { error: "#f91b1b", warning: "#ffc107", success: "#4EE04E", info: "initial" }, getTimeString() { const e = new Date((new Date).getTime() + 60 * (new Date).getTimezoneOffset() * 1e3 + 288e5); return e.toLocaleString() }, _print(e, t) { t = this.levelColor[t], e = `%c${this.getTimeString()}${this.connector}%c` + e; console.log(e, "color:#1ce8e8", "color:" + t) }, err(e) { this._print(e, "error") }, info(e) { this._print(e, "info") }, suc(e) { this._print(e, "success") }, warn(e) { this._print(e, "warning") } }, $browser = { env: (() => { const e = { webview: /\(.+wv\)/i.test(navigator.userAgent), android: /Android/i.test(navigator.userAgent), linux: /Linux/i.test(navigator.userAgent), ios: /ios/i.test(navigator.userAgent), macos: /macOS/i.test(navigator.userAgent), windows: /win|Windows/i.test(navigator.userAgent), iphone: /iPhone/i.test(navigator.userAgent), ipad: /iPad/i.test(navigator.userAgent), mobile: /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(navigator.userAgent) }; return e.pc = !e.mobile, e })(), platform: navigator.platform, language: navigator.language, Chinese: { traditional: ["zh-TW", "zh-HK", "zh-Hant", "zh-MO"].some(e => e.toLowerCase() === String(navigator.language).toLowerCase()), simplified: ["zh-CN", "zh-Hans", "zh-SG", "zh-MY"].some(e => e.toLowerCase() === String(navigator.language).toLowerCase()) } }, T = new Tool;
    // Chinesejs核心库
    !function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).Clang={})}(this,(function(e){"use strict";const t="内匀吊户册泛丢亘凶夫咤污伫别占吴删吕兑囱壮夹妆决冲没秃灾贝车迤见两来并并仑亚协儿恤姗佛届冈东抛争殁况状卧珏纠芈轧系兖侠长门侣克则劲却侄奸奂尸帅恒彦后拐汹为栅抵杯纣红纪纫纥约苎计订讣贞负军轨俩页风飞们伥闩仿个韦幸伦仓冻刚员娱剥孙岛师宫库悦径峡耻挟书气时晋乌泾狭狈疱佩亩纷纺纱纹纯纽纰级纭胁纳纸脉兹刍荆记讦讨讧讪讯托训讫岂财贡钉针轩钊轫闪阵乃陕回只饥马斗干咱伪伟侦侧国哑坚垩务动问执念够区参娄衔妇张强峥昆雕仑从带帐专将屉凄怅舍扫败挂启扪叙抡斩挣采卷昼弃浅栀勖条枭杀氢杆凉渊捆凄泪狰沦净现璃众产牵朱毕异细绅组终钵荚习茎绊弦统庄扎绍唇绋脱绌贫处觅规访轭讶软诀这讷许设讼连讹术衮贩迳责贯货贪伧伞凯顶剀顷创钗鱼扣鸟劳钓胜钏麦勋闭家陈陆阴备杰围尧丧场寻报岚单壶帧哟几唤厕乔厢复换恶扬闷拣惬恻恼挥涌凑减枣钦残栋壳栈涡汤栖测珐发浑涣盗困无苏砚画秆税犹痉丝络烟给绚笔肃华笋庵莱肾绞胀结绒绝评贵词买证贬诂贸虚诏贷诅诈诋诉诊贮贴贰贻视贲轲注费轴咏贺轶闵闰开周闲间进闲队邮阶乡阳钞钙钮钠钧钝隽钤云韧项顺须饪饭饨饮饬冯驭黄乱佣债涂冢传吗仅倾啬伤块坞偬奥呜铲呛剿妈园媪势圆汇损抢栗摇干愠捣忾厦怆汇彷晖榨晕会业爱极烦炼杨沟桢灭炀枫湿焕温爷岁毁准狮沧琅烟禄珲睐万棱当睁禀痹节盏粤经绢莴捆脚绑肿绥虏脑号义羡荤圣苇蜕叶肠话诛补诡询装诠里诟袅较载诧轼该贼轾详资试贾农诗贿运诘赀游夸赁诙赂诣赅达诚迹违铀铅刨钩过铂铃闸邹陨电钴钳钹钚钾预顽顿顼颁颂饲饴饱饰驰驮驯鸠寿呕伙侥叹梦喽夺奁仆啧侨雇妪团图划尘匮厌宁垫堑尝实殷寝态对畅屡惯崭恸岖惭惨币荣帼杠构搂别折掴彻枪滞渐涨氲涟滚沪渔渗渍涤汉满尔荦狱瑶琐玛疟疡疯愈痪尽监笺筝硕祯绽祸绾种综称绰洼绫窝绿紧缀网纲绮绸绵彩纶维绪缁罚闻搜苍台与席蚀莅盖制荪诵志语诬认诫误说诰诲诱诳狸宾赈赊铰赵铐赶银局铜辅铭辄铢轻铬挽铨衔远阂闺逊闽阁遥阀递合际颇领飒台饺饼饵饷驳肮鸣鸢厉凤唠么齐亿哗仪嘘价喷侬侩啸俭叽凛剧刘坟剑坠堕娴婵妩娇宽审写层帜废厨庙厮广厂弹惮抚愤捻征敌庆挚数虑暂扑忧捞样戚撑椁怂拨桩欲挠枢标怜悯楼桨乐溃枞润疮欧涧皑殇皱盘殴浆热眯泼牦奖洁确浇莹潜码纬肤致缄谷缅缉莲编缘荫窑缐穷缎缓蒋缍范骂卜罢葱缔练胶虾课蜗诿虱谄调谁论卫诤冲竖复猪赔赏谊赋谅贱谈账谆赌诞贤请卖诸赐质碰践辉辆辍辈辇轮辎适锐锉锋闾迁阅邻郑邓腌巩锌颉锑刮销养铺饿锄馁铝余驼驻驷驶驽驾驹驸发闹鱿鲁鸩鸦麸齿尽俦傧剂当吨惫懔哝忆嗳战垦坛拥挡奋挞袅据学掳导择宪凭捡机担历烫历焖晓淀焰浓独朴泽桦浊玑横瓯树炽卢椭炖磷桥烧瞒灯缣砖萦缚御县积颖稣窥腻蓑筑笃兴箬舱筛缢荡萧芜蚂萤裤亲觎谛谚谏讳辐谋辑谍输谐谘办诺谒谓选讽迟谕辽遗猫赖锭表锯踊锰错钱钢锡录铮锥锦阎随险沾静䩄颊哄颈鲍频鸵颔鸪头鸯颓鸭颐鸰鸳馆饯馄龙馅龟骇骈优骆偿储励咛尝吓压婴嫔嬷尴屿岭岳帮弥档应恳检桧戏栉殓泞击滨济挤拧蒙涛拟滥搁敛涩毙浚暧营灿烛毁烩墙狞获环瑷痨疗荡粪了矫缩绩缪缕矶缧绷缝禅总纵缫篓声聪联耸脓胆脸脍临举艰姜褛蔷觊谜谤谦亏讲谎谣谢誊溪蝼赚赛蝈购趋亵辖辗毂辕舆还迈酝丑镀镁虽锚键炼锲韩锅颗锤飓钟喂锺骋锹骏锻鲜锾鲛阔鲔阕鸿阑鸽闱板隐点隶斋丛噜向圹垒婶懑扩掷扰撵摆擞熏断犷猎槟瓮柜槛疠柠愈棹欤归殡础泻礼沈穑滤秽渎窜溅窍箫浏箪篑简粮织缮绕缭绣坛翘职聂脐膑旧萨踪蓝躯转借辙迩蛲医蝉酱虫厘镕觐镑觞锁谟钨谨镍谬镇丰阖赘闯阗蹒杂双雏鸡秋额颜题颚颛飏馏馊馈骑松鲨怀鲤懒鲫鹃鹅拢鹄旷冬橱椟榈咽橹咙坏潇垄濑坜宠沥庞濒庐惩烁牍犊兽獭玺琼畴蒙碍祷获稳帘签檐系茧裆绎绳袄绘哗罗谱膻识证谭腊谲讥艺赠薮赞药蚁蝇蝎跷辚轿辞边镜镝铲镞链镗镘镖镙锵镂铿关陇离鹊难鹌鹏雾丽韬韵麹类愿劝颠飕嘤馒严骛骗胡鲸鲳宝鹑悬鹉忏拦搀胧澜弥炉牺献珑痒症矿砺矾砾窦竞筹蕴篮蚝褴辫觉缤触继议胪译舰赢赡蔼趸蔺芦跶苹释锈阐飘饶饥骞腾骚鳃鳅咸面党龃出龄苏钟铙俪嗫续啭嚣兰藓属蛎惧慑蜡摄袜携览樱谴栏护歼誉赃烂踌癞跃眬轰藤辩缠镰镭铁铛铎镯辟响顾驱骠蓦骡髅鳍鳏莺鹤鹞龇龈俨呓啰孪巅峦弯摊踯权辔欢铸洒鉴滩鉴猡霁叠瘾鞑癣缰笼颤籁骄聋须听鳖脏鲢袭鳔衬鳗读鹧赎鸥赝鼹龉龊龚苏岩恋挛搅窃签缨纤萝蛊变逦镳铄靥显餍惊驿验脏体鳝鳞鳜鸶霉嘱坝揽瘫癫羁蚕让谗谶赣酿雳灵霭鳄鲈黩艳凿鹦骊郁鸾吁颦骤鬓魇鹰鹭硷盐鳌龌龋厅榄湾篱箩蛮蹑衅镶钥颅馋滦瞩赞驴骥缆躏钻銮锣锕嫒谙铵骜鳌钯呗钣鸨龅钡鹎锛荜哔滗铋筚跸苄缏笾飑飙瘪摈镔髌饽鹁钸骖黪锸侪掺冁蒇骣觇镡苌阊砗谌榇碜龀枨柽铖痴鸱铳帱雠蹰鹚苁骢辏蹿撺鹾哒骀绐郸掸殚赕瘅谠砀焘镫籴绨觌钿铫鲷鲽铤铥岽鸫簖怼镦谔阏锇锷鹗诶铒鸸鲕钒钫鲂诽绯镄鲱偾沣凫绂赙鲋鳆钆擀绀岗戆镐睾缟锆镉颍赓绠鲠苟缑觏锢鹘剐鸹观诖掼鹳刽匦刿妫鲑辊绲鲧埚呙铪阚绗灏颢诃黉荭闳鲎浒鹕骅铧缳鲩鳇荟哕浍缋诨阍钬镬蓟荠哜齑虿跻鲚郏浃铗镓碱荐戋戬睑鹣笕鲣鞯绛缴挢峤鹪疖颌鲒烬卺荩馑缙赆净刭弪胫靓厩阄鹫讵屦榉钜锔窭锩镌皲垲恺铠锴龛闶钪骒缂钶锞抠喾郐哙狯髋诓邝纩贶岿馈蒉愦聩阃锟鲲蛴崃徕涞赉铼谰斓镧阆锒涝崂铑铹鳓诔郦苈蓠呖缡枥栎轹锂鹂粝跞鲡鳢蔹潋琏裢裣魉镣钌鹩廪檩棂蛏鲮骝绺镏鹨茏泷栊砻偻蒌嵝瘘耧卤垆撸泸渌栌轳辂辘氇鸬舻脔娈栾囵逻泺椤脶锊呒唛杩劢谩缦颡铆麽钔幂谧猕祢渑腼黾缈缗馍镆钼呐铌鲵鲶茑啮镊陧蘖颟聍钕傩沤讴怄罴铍谝缥钋镤镨蕲骐桤碛颀颃钎佥荨悭缱椠墙嫱樯戗炝锖镪羟跄诮谯荞缲硗箧锓揿鲭茕蛱巯赇虮诎阒觑鸲颧绻辁阙悫荛娆桡嵘蝾缛铷蚬毵糁铯刹铩晒酾陕骟钐墒垧厍滠畲诜谂渖湿谥埘莳弑贳铈鲥绶摅纾缌锶锼谡谇狲唢睃闼铊鳎钛鲐昙钽锬顸傥饧铴绦铽缇鹈粜龆鲦烃钭钍抟箨鼍娲腽纨辋潍帏沩涠玮韪炜阌挝邬庑怃鹜铣饩阋觋硖线苋莶岘猃鹇痫籼跹芗骧缃飨哓骁绡撷绁缬陉荥锈馐鸺诩谖铉镟谑泶鳕埙浔鲟垭娅桠氩阉艳厣谳恹闫酽轺鳐邺晔烨铱诒峄怿钇镒镱瘗舣铟荧茔蓥撄滢潆璎瘿颏罂痈镛莸铕伛俣谀蓣嵛饫阈纡钰鹆鹬橼鼋钺郧郓芸恽韫殒攒瓒趱錾驵赜帻箦谮缯铡毡谵蛰锗谪浈缜轸钲骘轵贽鸷蛳絷踬觯诌绉槠馔颞骓缒着诼眦锱鲻诹驺鲰钻缵躜鳟翱沉迭皋硅秸里凌么扦抬锨彝灶札于凋讠谫郄勐凼坂垅垴埯埝苘荬荮莜莼菰藁揸吒吣咔咝咴噘噼嚯幞岙嵴彷徼犸狍馀馇馓馕愣憷丬溆滟溷漤潴澹甯纟绔绱珉枧桊桉槔橥轱轷赍肷胨飚煳煅熘愍淼砜磙眍钚钷铘铞锃锍锎锏锘锝锪锫锿镅镎镢镥镩镲稆鹋鹛鹱疬疴痖癯裥襁耢颥螨麴鲅鲆鲇鲞鲴鲺鲼鳊鳋鳘鳙鞒鞴齄",n="內勻弔戶冊氾丟亙兇伕吒汙佇別佔吳刪呂兌囪壯夾妝決沖沒禿災貝車迆見兩來並併侖亞協兒卹姍彿屆岡東拋爭歿況狀臥玨糾羋軋係兗俠長門侶剋則勁卻姪姦奐屍帥恆彥後枴洶為柵牴盃紂紅紀紉紇約苧計訂訃貞負軍軌倆頁風飛們倀閂倣個韋倖倫倉凍剛員娛剝孫島師宮庫悅徑峽恥挾書氣時晉烏涇狹狽皰珮畝紛紡紗紋純紐紕級紜脅納紙脈茲芻荊記訐討訌訕訊託訓訖豈財貢釘針軒釗軔閃陣迺陝迴隻飢馬鬥乾偺偽偉偵側國啞堅堊務動問執唸夠區參婁啣婦張強崢崑彫崙從帶帳專將屜悽悵捨掃敗掛啟捫敘掄斬掙採捲晝棄淺梔勗條梟殺氫桿涼淵梱淒淚猙淪淨現琍眾產牽硃畢異細紳組終缽莢習莖絆絃統莊紮紹脣紼脫絀貧處覓規訪軛訝軟訣這訥許設訟連訛術袞販逕責貫貨貪傖傘凱頂剴頃創釵魚釦鳥勞釣勝釧麥勛閉傢陳陸陰備傑圍堯喪場尋報嵐單壺幀喲幾喚廁喬廂復換惡揚悶揀愜惻惱揮湧湊減棗欽殘棟殼棧渦湯棲測琺發渾渙盜睏無甦硯畫稈稅猶痙絲絡菸給絢筆肅華筍菴萊腎絞脹結絨絕評貴詞買証貶詁貿虛詔貸詛詐詆訴診貯貼貳貽視賁軻註費軸詠賀軼閔閏開週閑間進閒隊郵階鄉陽鈔鈣鈕鈉鈞鈍雋鈐雲韌項順須飪飯飩飲飭馮馭黃亂傭債塗塚傳嗎僅傾嗇傷塊塢傯奧嗚剷嗆勦媽園媼勢圓匯損搶慄搖幹慍搗愾廈愴彙徬暉搾暈會業愛極煩煉楊溝楨滅煬楓溼煥溫爺歲毀準獅滄瑯煙祿琿睞萬稜當睜稟痺節盞粵經絹萵綑腳綁腫綏虜腦號義羨葷聖葦蛻葉腸話誅補詭詢裝詮裡詬裊較載詫軾該賊輊詳資試賈農詩賄運詰貲遊誇賃詼賂詣賅達誠跡違鈾鉛鉋鉤過鉑鈴閘鄒隕電鈷鉗鈸鈽鉀預頑頓頊頒頌飼飴飽飾馳馱馴鳩壽嘔夥僥嘆夢嘍奪奩僕嘖僑僱嫗團圖劃塵匱厭寧墊塹嘗實慇寢態對暢屢慣嶄慟嶇慚慘幣榮幗槓構摟彆摺摑徹槍滯漸漲氳漣滾滬漁滲漬滌漢滿爾犖獄瑤瑣瑪瘧瘍瘋瘉瘓盡監箋箏碩禎綻禍綰種綜稱綽窪綾窩綠緊綴網綱綺綢綿綵綸維緒緇罰聞蒐蒼臺與蓆蝕蒞蓋製蓀誦誌語誣認誡誤說誥誨誘誑貍賓賑賒鉸趙銬趕銀跼銅輔銘輒銖輕鉻輓銓銜遠閡閨遜閩閣遙閥遞閤際頗領颯颱餃餅餌餉駁骯鳴鳶厲鳳嘮麼齊億嘩儀噓價噴儂儈嘯儉嘰凜劇劉墳劍墜墮嫻嬋嫵嬌寬審寫層幟廢廚廟廝廣廠彈憚撫憤撚徵敵慶摯數慮暫撲憂撈樣慼撐槨慫撥樁慾撓樞標憐憫樓槳樂潰樅潤瘡歐澗皚殤皺盤毆漿熱瞇潑犛獎潔確澆瑩潛碼緯膚緻緘穀緬緝蓮編緣蔭窯線窮緞緩蔣綞範罵蔔罷蔥締練膠蝦課蝸諉蝨諂調誰論衛諍衝豎複豬賠賞誼賦諒賤談賬諄賭誕賢請賣諸賜質踫踐輝輛輟輩輦輪輜適銳銼鋒閭遷閱鄰鄭鄧醃鞏鋅頡銻颳銷養鋪餓鋤餒鋁餘駝駐駟駛駑駕駒駙髮鬧魷魯鴆鴉麩齒儘儔儐劑噹噸憊懍噥憶噯戰墾壇擁擋奮撻嬝據學擄導擇憲憑撿機擔歷燙曆燜曉澱燄濃獨樸澤樺濁璣橫甌樹熾盧橢燉燐橋燒瞞燈縑磚縈縛禦縣積穎穌窺膩簑築篤興篛艙篩縊蕩蕭蕪螞螢褲親覦諦諺諫諱輻謀輯諜輸諧諮辦諾謁謂選諷遲諭遼遺貓賴錠錶鋸踴錳錯錢鋼錫錄錚錐錦閻隨險霑靜靦頰鬨頸鮑頻鴕頷鴣頭鴦頹鴨頤鴒鴛館餞餛龍餡龜駭駢優駱償儲勵嚀嚐嚇壓嬰嬪嬤尷嶼嶺嶽幫彌檔應懇檢檜戲櫛殮濘擊濱濟擠擰濛濤擬濫擱斂澀斃濬曖營燦燭燬燴牆獰獲環璦癆療盪糞瞭矯縮績繆縷磯縲繃縫禪總縱繅簍聲聰聯聳膿膽臉膾臨舉艱薑褸薔覬謎謗謙虧講謊謠謝謄谿螻賺賽蟈購趨褻轄輾轂轅輿還邁醞醜鍍鎂雖錨鍵鍊鍥韓鍋顆錘颶鍾餵鍾騁鍬駿鍛鮮鍰鮫闊鮪闋鴻闌鴿闈闆隱點隸齋叢嚕嚮壙壘嬸懣擴擲擾攆擺擻燻斷獷獵檳甕櫃檻癘檸癒櫂歟歸殯礎瀉禮瀋穡濾穢瀆竄濺竅簫瀏簞簣簡糧織繕繞繚繡罈翹職聶臍臏舊薩蹤藍軀轉藉轍邇蟯醫蟬醬蟲釐鎔覲鎊觴鎖謨鎢謹鎳謬鎮豐闔贅闖闐蹣雜雙雛雞鞦額顏題顎顓颺餾餿餽騎鬆鯊懷鯉懶鯽鵑鵝攏鵠曠鼕櫥櫝櫚嚥櫓嚨壞瀟壟瀨壢寵瀝龐瀕廬懲爍牘犢獸獺璽瓊疇矇礙禱穫穩簾簽簷繫繭襠繹繩襖繪譁羅譜羶識證譚臘譎譏藝贈藪贊藥蟻蠅蠍蹺轔轎辭邊鏡鏑鏟鏃鏈鏜鏝鏢鏍鏘鏤鏗關隴離鵲難鵪鵬霧麗韜韻麴類願勸顛颼嚶饅嚴騖騙鬍鯨鯧寶鶉懸鵡懺攔攙朧瀾瀰爐犧獻瓏癢癥礦礪礬礫竇競籌蘊籃蠔襤辮覺繽觸繼議臚譯艦贏贍藹躉藺蘆躂蘋釋鏽闡飄饒饑騫騰騷鰓鰍鹹麵黨齟齣齡蘇鐘鐃儷囁續囀囂蘭蘚屬蠣懼懾蠟攝襪攜覽櫻譴欄護殲譽贓爛躊癩躍矓轟籐辯纏鐮鐳鐵鐺鐸鐲闢響顧驅驃驀騾髏鰭鰥鶯鶴鷂齜齦儼囈囉孿巔巒彎攤躑權轡歡鑄灑鑑灘鑒玀霽疊癮韃癬韁籠顫籟驕聾鬚聽鱉臟鰱襲鰾襯鰻讀鷓贖鷗贗鼴齬齪龔囌巖戀攣攪竊籤纓纖蘿蠱變邐鑣鑠靨顯饜驚驛驗髒體鱔鱗鱖鷥黴囑壩攬癱癲羈蠶讓讒讖贛釀靂靈靄鱷鱸黷豔鑿鸚驪鬱鸞籲顰驟鬢魘鷹鷺鹼鹽鼇齷齲廳欖灣籬籮蠻躡釁鑲鑰顱饞灤矚讚驢驥纜躪鑽鑾鑼錒嬡諳銨驁鰲鈀唄鈑鴇齙鋇鵯錛蓽嗶潷鉍篳蹕芐緶籩颮飆癟擯鑌髕餑鵓鈽驂黲鍤儕摻囅蕆驏覘鐔萇閶硨諶櫬磣齔棖檉鋮癡鴟銃幬讎躕鶿蓯驄輳躥攛鹺噠駘紿鄲撣殫賧癉讜碭燾鐙糴綈覿鈿銚鯛鰈鋌銩崠鶇籪懟鐓諤閼鋨鍔鶚誒鉺鴯鮞釩鈁魴誹緋鐨鯡僨灃鳧紱賻鮒鰒釓搟紺崗戇鎬睪縞鋯鎘潁賡綆鯁茍緱覯錮鶻剮鴰觀詿摜鸛劊匭劌媯鮭輥緄鯀堝咼鉿闞絎灝顥訶黌葒閎鱟滸鶘驊鏵繯鯇鰉薈噦澮繢諢閽鈥鑊薊薺嚌齏蠆躋鱭郟浹鋏鎵堿薦戔戩瞼鶼筧鰹韉絳繳撟嶠鷦癤頜鮚燼巹藎饉縉贐凈剄弳脛靚廄鬮鷲詎屨櫸鉅鋦窶錈鐫皸塏愷鎧鍇龕閌鈧騍緙鈳錁摳嚳鄶噲獪髖誆鄺纊貺巋饋蕢憒聵閫錕鯤蠐崍徠淶賚錸讕斕鑭閬鋃澇嶗銠鐒鰳誄酈藶蘺嚦縭櫪櫟轢鋰鸝糲躒鱺鱧蘞瀲璉褳襝魎鐐釕鷯廩檁欞蟶鯪騮綹鎦鷚蘢瀧櫳礱僂蔞嶁瘺耬鹵壚擼瀘淥櫨轤輅轆氌鸕艫臠孌欒圇邏濼欏腡鋝嘸嘜榪勱謾縵顙鉚麼鍆冪謐獼禰澠靦黽緲緡饃鏌鉬吶鈮鯢鯰蔦嚙鑷隉蘗顢聹釹儺漚謳慪羆鈹諞縹釙鏷鐠蘄騏榿磧頎頏釬僉蕁慳繾槧墻嬙檣戧熗錆鏹羥蹌誚譙蕎繰磽篋鋟撳鯖煢蛺巰賕蟣詘闃覷鴝顴綣輇闕愨蕘嬈橈嶸蠑縟銣蜆毿糝銫剎鎩曬釃陜騸釤墑坰厙灄畬詵諗瀋濕謚塒蒔弒貰鈰鰣綬攄紓緦鍶鎪謖誶猻嗩脧闥鉈鰨鈦鮐曇鉭錟頇儻餳鐋絳鋱緹鵜糶齠鰷烴鈄釷摶籜鼉媧膃紈輞濰幃溈潿瑋韙煒閿撾鄔廡憮鶩銑餼鬩覡硤線莧薟峴獫鷴癇秈躚薌驤緗饗嘵驍綃擷紲纈陘滎銹饈鵂詡諼鉉鏇謔澩鱈塤潯鱘埡婭椏氬閹艷厴讞懨閆釅軺鰩鄴曄燁銥詒嶧懌釔鎰鐿瘞艤銦熒塋鎣攖瀅瀠瓔癭頦罌癰鏞蕕銪傴俁諛蕷崳飫閾紆鈺鵒鷸櫞黿鉞鄖鄆蕓惲韞殞攢瓚趲鏨駔賾幘簀譖繒鍘氈譫蟄鍺謫湞縝軫鉦騭軹贄鷙螄縶躓觶謅縐櫧饌顳騅縋著諑眥錙鯔諏騶鯫鉆纘躦鱒翺沈叠臯矽稭裏淩麽扡擡鍁彜竈劄於雕訁譾郤猛氹阪壟堖垵墊檾蕒葤蓧蒓菇槁摣咤唚哢噝噅撅劈謔襆嶴脊仿僥獁麅餘餷饊饢楞怵爿漵灩混濫瀦淡寧糸絝緔瑉梘棬案橰櫫軲軤賫膁腖飈糊煆溜湣渺碸滾瞘鈈鉕鋣銱鋥鋶鐦鐧鍩鍀鍃錇鎄鎇鎿鐝鑥鑹鑔穭鶓鶥鸌癧屙瘂臒襇繈耮顬蟎麯鮁鮃鮎鯗鯝鯴鱝鯿鰠鰵鱅鞽韝齇";var i;e.Character=void 0,(i=e.Character||(e.Character={}))[i.Simple=0]="Simple",i[i.Traditional=1]="Traditional";const a=t=>t===e.Character.Simple||t===e.Character.Traditional;function r(i,a){let r,o,l="",c=0;a==e.Character.Simple?(r=n,o=t):(r=t,o=n);for(let e of i){let t=r.indexOf(e);t>-1?(l+=o[t],c++):l+=e}return{result:l,count:c}}const o=Object.defineProperties({},{SIMPLE:{configurable:!1,get(){var e,t;return["zh-CN","zh-Hans","zh-SG","zh-MY"].includes(null===(t=null===(e=globalThis||window)||void 0===e?void 0:e.navigator)||void 0===t?void 0:t.language)}},TRADITIONAL:{configurable:!1,get(){var e,t;return["zh-TW","zh-HK","zh-Hant","zh-MO"].includes(null===(t=null===(e=globalThis||window)||void 0===e?void 0:e.navigator)||void 0===t?void 0:t.language)}},CHARACTER:{configurable:!1,get(){return this.SIMPLE?e.Character.Simple:this.TRADITIONAL?e.Character.Traditional:null}}});function l(e,t){"ChineseBackup"in e||(e.ChineseBackup=t)}function c(e){if("ChineseBackup"in e==0||"string"!=typeof e.ChineseBackup)return!1;let t=!1;return/input|textarea/i.test(e.nodeName||"")&&e.value.length===e.ChineseBackup.length?(e.value=e.ChineseBackup,t=!0):e.nodeType===Node.TEXT_NODE&&e.data.length===e.ChineseBackup.length&&(e.data=e.ChineseBackup,t=!0),delete e.ChineseBackup,t}function s(e=document){return new Promise((function(t,n){const i=new Date;let a=[...e.childNodes];0==a.length&&a.push(e);let r=0;for(;a.length>0;){let e=a.shift();!1===/style|script/i.test(e.nodeName||"")&&(c(e)&&r++,e.childNodes.forEach((function(e){a.unshift(e)})))}t({nodeCount:r,timeSpent:(new Date).getTime()-i.getTime()})}))}function u(e,t){return new Promise((function(n,i){const a=new Date;let o=[...e.childNodes];0==o.length&&o.push(e);let c=0,s=0;for(;o.length>0;){let e=o.shift();if(/input|textarea/i.test(e.nodeName||"")){const n=r(e.value,t);n.count>0&&(l(e,e.value),e.value=n.result,c++,s+=n.count)}else if(e.nodeType===Node.TEXT_NODE){const n=r(e.data,t);n.count>0&&(l(e,e.data),e.data=n.result,c++,s+=n.count)}else!1===/style|script/i.test(e.nodeName||"")&&e.childNodes.forEach((function(e){o.unshift(e)}))}n({nodeCount:c,charCount:s,timeSpent:(new Date).getTime()-a.getTime()})}))}e.autoTranslateDOM=function(e=document){return new Promise((function(t,n){let i=o.CHARACTER;a(i)?u(e,i).then((e=>{t(Object.assign(e,{current:i,failure:!1}))})):t({failure:!0})}))},e.enableLittleWidget=function({stayTime:t=3e3,targetNode:n=document,firstTranslateTo:i,translateBeforeShow:r,callback:o}){i=a(i)?i:e.Character.Simple,a(r)&&(u(n,r).then((e=>{o&&o(Object.assign(e,{current:r,failure:!1}))})),i=r===e.Character.Simple?e.Character.Traditional:e.Character.Simple);const l=t=>t===e.Character.Simple?"简":t===e.Character.Traditional?"繁":"原";t=t||3e3,n=n||document;const c=document.createElement("style");c.innerHTML=".clang-menu { z-index: 2022; --size: 50px; width: var(--size); height: var(--size); -webkit-tap-highlight-color: transparent; font-size: 18px; letter-spacing: 1px; box-sizing: border-box; border-radius: 50%; background-image: linear-gradient(120deg, #2dc6d1 0%, #5386ce 100%); box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.26); color: rgb(240, 240, 240); cursor: pointer; position: fixed; right: 16px; bottom: 28px; display: flex; align-items: center; justify-content: center; user-select: none; transition: 0.15s; }",document.head.appendChild(c);const d=document.createElement("div");d.className="clang-menu",d.textContent=l(i);const h=[e.Character.Simple,e.Character.Traditional,null];let p,f,g=h.indexOf(i);d.addEventListener("click",(()=>{if(a(h[g])){const e=g;u(n,h[g]).then((t=>{o&&o(Object.assign(t,{current:h[e],failure:!1}))}))}else s(n).then((e=>{o&&o(e)}));g=(g+1)%h.length,d.textContent=l(h[g])}));const m=()=>{p=setTimeout((()=>{d.style.setProperty("right",-1*parseInt(f.width)*.45+"px")}),t)};d.addEventListener("pointerenter",(()=>{clearTimeout(p),d.style.removeProperty("right")})),d.addEventListener("pointerleave",m),(document.body||document.documentElement).appendChild(d),f=window.getComputedStyle(d),m()},e.env=o,e.isCharacter=a,e.restoreDOM=s,e.transTo=function(e,t){return new Promise((function(n,i){n(r(e,t))}))},e.translate=r,e.translateDOM=u,Object.defineProperty(e,"__esModule",{value:!0})}));
    // 嵌入到真正的window对象中
    (typeof unsafeWindow !== "undefined" ? unsafeWindow : window).Clang = Clang;
    //注册菜单函数
    function register() {
        if (window !== window.top) {
            return;
        }
        if ("undefined" == typeof GM_registerMenuCommand || "undefined" == typeof GM_getValue || "undefined" == typeof GM_setValue) {
            $log.err("当前不处于脚本管理器环境，停止菜单注册");
            return;
        }
        if (!GM_getValue('config')) {
            GM_setValue("config", JSON.stringify(config))
        } else {
            let savedConfig = JSON.parse(GM_getValue("config"));
            //维护和更新已保存的config
            if (T.type(savedConfig.option, "object")) {
                Object.keys(config.option).forEach(key => {
                    if (!T.type(savedConfig.option[key], "undefined")) {
                        config.option[key] = savedConfig.option[key];
                    }
                })
            }
            GM_setValue("config", JSON.stringify(config));
        };
        GM_registerMenuCommand("1️⃣ 简", () => {
            Clang.translateDOM(document, Clang.Character.Simple).then(() => toast('简√'));
            transIframes(Clang.Character.SIMPLE);
        });
        GM_registerMenuCommand("2️⃣ 繁", () => {
            Clang.translateDOM(document, Clang.Character.Traditional).then(() => toast('繁√'));
            transIframes(Clang.Character.Traditional);
        });
        GM_registerMenuCommand("3️⃣ 原", () => {
            Clang.restoreDOM().then(() => toast('原√'));
            transIframes(null);
        });
        GM_registerMenuCommand("📃 便捷翻译", convenientTranslate);
        GM_registerMenuCommand("⚙️ 配置", configPanel);
        GM_registerMenuCommand("💬 给作者留言", () => {
            T.open("https://dev.ayouth.xyz/msgboard/");
        });
        GM_registerMenuCommand("💖 赞赏作者", () => {
            T.open("https://imurl.tk/am");
        });

    }
    // 消息提示
    function toast(msg, opt = { l: 'top', t: 3000 }) {
        // iframe不提示
        if (window.top !== window || !config.option.showToast) {
            return;
        }
        T.remove('.ay-userjs-toast');
        let l = opt.l == 'center' ? 'center' : 'top';
        let t = typeof opt.t == 'number' ? opt.t : 3000;
        let div = T.create('div');
        div.className = 'ay-userjs-toast';
        div.textContent = msg;
        let divStyle = 'box-sizing: border-box; letter-spacing: 0.5px; font-family: Tahoma, Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; -webkit-appearance: none; border: none; outline: none; -webkit-tap-highlight-color: transparent; font-size: 18px; color: rgb(31, 243, 154); margin: auto; padding: 15px; display: flex; align-items: center; justify-content: center; width: fit-content; text-align: justify; white-space: break-spaces; word-break: break-all; width: fit-content; height: fit-content; min-width: 60px; max-width: 85vw; min-height: 30px; background: rgba(0, 0, 0, 0.6); background-image: none; border-radius: 4px; transition: 0.3s ease-in-out; z-index: 2022000; overflow: hidden; position: fixed; top: 20px; right: 0; left: auto; bottom: auto; transform: translateX(100%);';
        divStyle += l == 'center' ? 'position: absolute; top: 0; right: 0; left: 0; bottom: 0; opacity: 0.4; transform: scale(0);' : '';
        div.setAttribute('style', divStyle)
        document.documentElement.appendChild(div);
        let tID = setTimeout(() => {
            if (tID == div.tID) {
                if (l == 'center') {
                    div.style.transform = 'scale(1)';
                } else {
                    div.style.transform = 'translateX(-20px)';
                }
                div.style.opacity = '1';
            }
        });
        div.tID = tID;
        let tID2 = setTimeout(() => {
            if (tID2 == div.tID2) {
                if (l == 'center') {
                    div.style.transform = 'scale(0)';
                } else {
                    div.style.transform = 'translateX(100%)';
                }
                div.style.opacity = '0';
            }
        }, t + 350)
        div.tID2 = tID2;
    }
    // 快捷翻译组件
    function convenientTranslate() {
        T.remove('.ay-quick-trans');
        const html = `<style>.ay-quick-trans button,.ay-quick-trans>div,.ay-quick-trans>textarea{margin:0;padding:0;box-sizing:border-box;letter-spacing:1px;font-family:Tahoma,Arial,"PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif;-webkit-appearance:none;border:none;outline:0;-webkit-tap-highlight-color:transparent;font-size:18px}.ay-quick-trans{border-radius:5px;z-index:202200;padding:20px;position:fixed;top:18px;right:18px;background-color:rgba(0,0,0,.55)}.ay-quick-trans>h1{font-size:22px;text-align:center;margin:12px auto;color:#fafafa}.ay-quick-trans>textarea{overflow:auto;width:400px;height:200px;max-width:85vw;max-height:62vh;font-size:18px;padding:15px!important;outline:0;border-radius:5px;color:#fafafa;background-color:#272928;outline-color:initial}.ay-quick-trans>div{display:flex;align-items:center;justify-content:space-evenly;margin:12px auto}.ay-quick-trans button{cursor:pointer;font-size:16px;padding:6px 10px;border-radius:3px;min-width:45px;color:#fafafa;background-color:#2569e9;transition:.15s}.ay-quick-trans button:hover{box-shadow:0 0 10px 0 rgba(255,255,255,.7)}</style><h1>繁简体快捷翻译</h1><textarea autocomplete=off spellcheck=false></textarea><div><button id=simple>简</button> <button id=traditional>繁</button> <button id=exit>离开</button></div>`;
        const div = T.create("div");
        div.className = "ay-quick-trans";
        div.innerHTML = html;
        const textarea = div.querySelector('textarea');
        document.documentElement.appendChild(div);
        T.on(div.querySelector('#exit'), "click", () => {
            div.remove();
        });
        T.on(div.querySelector('#simple'), "click", () => {
            Clang.translateDOM(textarea, Clang.Character.Simple).then(() => { toast('简√', 3000) });
        });
        T.on(div.querySelector("#traditional"), "click", () => {
            Clang.translateDOM(textarea, Clang.Character.Traditional).then(() => { toast('繁√', 3000) });
        });
    }
    // 配置面板
    function configPanel() {
        T.remove('.ay-panel');
        const html = `<style>.ay-panel button,.ay-panel input{-webkit-appearance:none;border:none;outline:0}.ay-panel input[type=checkbox]{display:inline-block;vertical-align:middle;min-width:18px;height:18px;border-radius:50%;border:3px solid #aaa;background-color:#efefef;position:relative}.ay-panel input[type=checkbox]:checked::before{content:'';display:block;position:absolute;top:0;left:0;bottom:0;right:0;margin:auto;width:8px;height:8px;border-radius:50%;background-color:#4a9eff}.ay-panel::before{content:'';display:block;width:100vw;height:100vh;position:fixed;top:0;left:0;background-color:rgba(0,0,0,.45);z-index:-1}.ay-panel{box-sizing:border-box;letter-spacing:1px;font-family:Tahoma,Arial,"PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif;-webkit-tap-highlight-color:transparent;z-index:202200;user-select:none;height:fit-content;width:fit-content;max-width:80vw;max-height:80vh;font-size:18px;border-radius:5px;padding:30px;position:absolute;top:0;left:0;bottom:0;right:0;margin:auto;background-color:rgba(0,0,0,.6);color:#efefef}.ay-panel>h1{margin:auto;color:#efefef;font-size:22px;text-align:center}.ay-panel>label{cursor:pointer;display:block;margin:15px auto;color:#efefef}.ay-panel input,select{background-color:#efefef;color:#1a1a1a;border:none;font-size:18px}.ay-panel button{margin-right:20px;cursor:pointer;font-size:16px;padding:5px;border-radius:2px;color:#efefef;background-color:#2569e9}.ay-panel button:hover{box-shadow:0 0 8px 0 rgba(255,255,255,.4)}.ay-panel #exit{background-color:#da2121}.ay-panel .footer a{font-size:16px;color:#7fffd4;text-decoration:underline}.ay-panel div{margin:10px auto}.ay-panel.footer{text-align:right}.ay-panel>h1>a{color:#2dc520;text-decoration:underline;font-size:18px}.ay-panel #exclude,.ay-panel #include{width:55%;min-width:200px}</style><h1>网页繁简体转换脚本配置<a href=https://greasyfork.org/scripts/443508#additional-info target=_blank>（查看配置说明）</a></h1><label for=autoTranslate>自动翻译每个网页 <input id=autoTranslate type=checkbox></label> <label for=include>允许自动翻译的网站 <input id=include type=input></label> <label for=exclude>禁止自动翻译的网站 <input id=exclude type=input></label> <label for=transInto>指定翻译成繁/简体（默认翻译至用户浏览器语言） <select id=transInto><option value=auto selected>auto<option value=繁>繁<option value=简>简</select></label> <label for=showWidget>开启小组件 <input id=showWidget type=checkbox></label> <label for=showToast>开启提示弹窗 <input id=showToast type=checkbox></label> <label for=stayTime>小组件无操作自动隐藏时间（单位/秒） <input id=stayTime type=number></label><div><button id=submit>更新配置</button> <button id=exit>离开</button></div><div class=footer><a href=https://github.com/tianluanchen/Chinesejs target=_blank>核心转换功能来自开源项目Chinesejs</a> <span style=color:#f59520>本脚本已停止维护更新</span></div>`;
        const div = T.create("div");
        div.className = "ay-panel";
        div.innerHTML = html;
        document.documentElement.appendChild(div);
        div.querySelector("#exclude").value = config.option.exclude;
        div.querySelector("#include").value = config.option.include;
        div.querySelector('#autoTranslate').checked = config.option.autoTranslate;
        div.querySelector('#stayTime').value = config.option.stayTime / 1000;
        div.querySelector('#showWidget').checked = config.option.showWidget;
        div.querySelector('#showToast').checked = config.option.showToast;
        let t = ['auto', '繁', '简'];
        div.querySelector('#transInto').selectedIndex = t.indexOf(config.option.transInto);
        T.on(div.querySelector('#exit'), "click", () => {
            div.remove();
        })
        T.on(div.querySelector('#submit'), "click", () => {
            config.option.autoTranslate = div.querySelector('#autoTranslate').checked;
            config.option.stayTime = parseInt(div.querySelector('#stayTime').value) * 1000;
            config.option.showWidget = div.querySelector('#showWidget').checked;
            config.option.showToast = div.querySelector('#showToast').checked;
            config.option.transInto = t[div.querySelector('#transInto').selectedIndex];
            config.option.exclude = div.querySelector("#exclude").value;
            config.option.include = div.querySelector("#include").value;
            GM_setValue("config", JSON.stringify(config));
            toast('即将刷新页面以重载配置');
            location.reload();
        });
    }
    // 所有iframe
    function transIframes(lang) {
        // 各个窗口都可以通过该函数的执行而设置记录
        setCurrentLang(lang);
        T.qs('iframe').forEach(iframe => {
            // iframe可能需要等待加载完成
            if (!iframe.addedLoadCallbakForCjs) {
                iframe.addEventListener("load", () => {
                    iframe.contentWindow.postMessage({
                        Chinesejs: lang
                    }, '*');
                });
                iframe.addedLoadCallbakForCjs = true;
            }
            iframe.contentWindow.postMessage({
                Chinesejs: lang
            }, '*');
        });
    }
    //匹配包含的返回boolean
    function matchRule(rule = "", domain = "") {
        rule = (rule || "").trim();
        let arr = rule.split(",");
        return arr.some(e => {
            e = e.trim();
            if (!e) {
                return false;
            }
            if (e === "*") {
                return true;
            }
            if (e[0] !== ".") {
                return domain === e;
            }
            if (domain.indexOf(e) > -1 && domain.indexOf(e) === domain.length - e.length) {
                return true;
            }
            return false;
        });
    }
    // 记录当前翻译到的语言
    var currentLang = null;
    // 添加监听服务 以争对插入的新数据
    T.addService(T.flags.CHILD, r => {
        if (Clang.isCharacter(currentLang)) {
            r.childList.forEach(e => {
                console.log(e, e.target);
                // 跳过自身元素
                if (!e.target.className || /ay-panel|ay-quick-trans|ay-userjs-toast|clang-menu/.test(e.target.className) === false) {
                    Clang.translateDOM(e.target, currentLang);
                }
            })
        }
    });
    function setCurrentLang(lang) {
        if (Clang.isCharacter(lang)) {
            currentLang = lang;
        } else {
            currentLang = null;
        }
    }
    // -------------------------- 以下为执行过程 -----------------------------
    if (window.top !== window) {
        // 若非顶层页面监听message事件 并结束
        window.addEventListener("message", (evt) => {
            // 判断数据是不是自己传的
            if (!evt.data || evt.data.Chinesejs === undefined) {
                return;
            }
            if (evt.data.Chinesejs == null) {
                Clang.restoreDOM();
            } else if (Clang.isCharacter(evt.data.Chinesejs)) {
                Clang.translateDOM(document, evt.data.Chinesejs);
            } else if (evt.data.Chinesejs === "auto") {
                Clang.autoTranslate(document);
            }
            transIframes(evt.data.Chinesejs);
        });
        return;
    }
    // 配置 warning 指打印警告信息
    var config = {
        "id": "443508",
        "version": "1.1.2",
        "option": {
            "exclude": "",
            "include": "*",
            "showToast": true, // 是否显示提示弹窗
            "showWidget": true, // 是否使用小组件按钮
            "autoTranslate": false, // 是否使用自动翻译
            "transInto": "auto", // 指定翻译目标
            "stayTime": 3000 // 小组件按钮自动隐藏的延时时间/ms
        }
    };
    const getText = (char) => {
        return char === Clang.Character.Simple ? "简" : (char === Clang.Character.Traditional ? "繁" : "原");
    }
    $log.suc(`网页繁简体转化脚本-${config['version']} 正在运行...`);
    //注册菜单
    register();
    // 页面加载后执行
    T.ready(() => {
        if (config.option.autoTranslate) {
            //匹配允许自动翻译 
            if (matchRule(config.option.exclude, location.host) || !matchRule(config.option.include, location.host)) {
                return;
            }
            //匹配include和exclude
            switch (config.option.transInto) {
                case '简':
                    Clang.translateDOM(document, Clang.Character.Simple).then((e) => toast('简√'));
                    transIframes(Clang.Character.Simple);
                    break;
                case '繁':
                    Clang.translateDOM(document, Clang.Character.Traditional).then((e) => toast('繁√'));
                    transIframes(Clang.Character.Traditional);
                    break;
                default:
                    Clang.autoTranslate(document).then((e) => {
                        toast(getText(e.current) + '√')
                    });
                    transIframes('auto');
            };
            $log.suc(`已自动翻译至${config.transInto}`);
        }
    });
    if (config.option.showWidget) {
        Clang.enableLittleWidget({
            stayTime: config.option.stayTime,
            firstTranslateTo: Clang.env.CHARACTER,
            callback(e) {
                transIframes(Clang.isCharacter(e.current) ? e.current : null);
                $log.suc('已转换为' + getText(e.current));
                toast(getText(e.current) + '√');
            }
        });
    }
})();
