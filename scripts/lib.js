let db = {
    resources: [
        {id: 101, img: '12101.jpg', width: 1000, height: 725, title: 'تکه ای از چمن', description: '', link: ''},
        {id: 102, img: '12102.jpg', width: 1000, height: 725, title: 'شب پرستاره', description: '', link: ''},
        {id: 103, img: '12103.jpg', width: 725, height: 1000, title: 'گل رز', description: '', link: ''},
        {id: 104, img: '12104.jpg', width: 725, height: 1000, title: 'سلف پرتره', description: '', link: ''},
        {id: 105, img: '12105.jpg', width: 725, height: 1000, title: 'جاده روستایی در پروونس در شب', description: '', link: ''},
        {id: 106, img: '12106.jpg', width: 1000, height: 725, title: 'زنبق', description: '', link: ''},
        {id: 107, img: '12107.jpg', width: 725, height: 1000, title: 'گل آفتابگردان', description: '', link: ''},
        {id: 108, img: '12108.jpg', width: 725, height: 1000, title: 'گلدان زنبق', description: '', link: ''},
        {id: 109, img: '12109.jpg', width: 725, height: 1000, title: 'کافه تراس در شب', description: '', link: ''},
        {id: 110, img: '12110.jpg', width: 1000, height: 725, title: 'شکوفه های بادام', description: '', link: ''},
        {id: 111, img: '12111.jpg', width: 1000, height: 725, title: 'طبیعت بی جان با میوه های به', description: '', link: ''},
        {id: 112, img: '12112.jpg', width: 1000, height: 725, title: 'گندمزار با کلاغ ها', description: '', link: ''},
        {id: 113, img: '12113.jpg', width: 1000, height: 725, title: 'اتاق خواب آرل', description: '', link: ''},
        {id: 114, img: '12114.jpg', width: 1000, height: 725, title: 'باغ آرل', description: '', link: ''},
        {id: 115, img: '12115.jpg', width: 1000, height: 725, title: 'تنه درختان در چمن', description: '', link: ''},
    ]
}
$(document).ready(()=>{
    $('.menu').html(`
<strong></strong>
<label id="mnu-game"><i class="fad fa-joystick"></i><span>بازی</span></label>
<label id="mnu-user"><i class="fad fa-circle-user"></i><span>کاربری</span></label>
<label id="mnu-home"><i class="fad fa-home"></i><span>خانه</span></label>
<label id="mnu-shop"><i class="fad fa-shopping-basket-alt"></i><span>فروشگاه</span></label>
<label id="mnu-info"><i class="fad fa-circle-info"></i><span>درباره</span></label>
`);

    new Main().show();
    $('.menu label#mnu-home').click(()=>{ new Main().show(); });
    $('.menu label#mnu-game').click(()=>{ new Games().show(); });
    $('.menu label#mnu-user').click(()=>{ new User().show();});
    $('.menu label#mnu-info').click(()=>{ new Info().show();});
    $('.menu label#mnu-shop').click(()=>{ new Shop().show();});
    $('.menu label').click((e)=>{
        $('.menu label').removeClass('act');
        $(e.currentTarget).addClass('act');
        $(`.menu strong`).css({'left': $(e.currentTarget).position().left + 'px', 'width': $(e.currentTarget).width() + 'px'});
    });
    $('.menu label').eq(2).click();

    //new Board(101, {w:7, h:5}).show();
});    
class PublicApi{
    static Api = {
        toPersianNumber: (s) => {
            const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
            return s.toString().split('').map(c => '0123456789'.indexOf(c) >= 0 ? persianNumbers[Number(c)] : c).join('');
        },
        toEnglishNumber: (s) => {
            const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            return s.toString().split('').map(c => '۰۱۲۳۴۵۶۷۸۹'.indexOf(c) >= 0 ? englishNumbers['۰۱۲۳۴۵۶۷۸۹'.indexOf(c)] : c).join('');
        }
    }
    constructor() {
        this.Api = PublicApi.Api;
    }
}
class Page extends PublicApi{
    constructor(PageName) {
        super();
        this.PageName = PageName;
        this.root = undefined;
    }
    render(){
        this.root = $(``);
        return this.root;
    }
    show(){
        var _noBorder = 'noborder'
        if (this.PageName == 'main') { $('.page').addClass(_noBorder); }
        else { $('.page').removeClass(_noBorder); }
        //$('.page > .header').html('');
        let render = this.render();
        $('.page > .body').html('').append(render);
        render.addClass(['stino-page', String(this.PageName).toLowerCase()]);
        this.load && this.load();
    }
    
}
class Board extends Page{
    constructor(id , dificulity) { super('board'); this.id = id; this.dificulity = dificulity || {w:7, h:5};}
    createTemplate = (o) => {
        let timer = new Date();
        let w = this.dificulity[o.width > o.height ? 'w' : 'h'];
        let h = this.dificulity[o.width < o.height ? 'w' : 'h'];

        let img = o.img;
        let solveAll = () => {
            let es = table.find('.slice')
                .get()
                .map(m => ({
                    e: m,
                    s: 1000 + Number($(m).attr('data-s'))
                }))
                .sort((a, b) => a.s - b.s)
                .map(m => m.e);
            console.log(es);
            table.html(``).append(es);
            setTimeout(() => {
                cssPos();
            }, 1000);
        }
        let endGame = () => {
            alert('end');
        }
        let move = (a, b) => {
            var temp = $(`<div class="temp"></div>`).insertBefore(a);
            a.insertBefore(b);
            b.insertBefore(temp);
            temp.remove();
        }
        let log = () => {
            return {
                solved: table.find('.slice.correct').length,
                remain: table.find('.slice:not(.correct)').length,
                move: clicks
            };
        }
        let shuffle = () => {
            slices = slices.sort((a, b) => Math.random() - Math.random());
        }
        let setTime = () => {
            let totalSeconds = Math.floor((new Date() - timer) / 1000);
            let hours = Math.floor(totalSeconds / 3600);
            let minutes = Math.floor((totalSeconds % 3600) / 60);
            let seconds = totalSeconds % 60;
            let timeString = [hours.toString().padStart(2, '0'), minutes.toString().padStart(2, '0'),seconds.toString().padStart(2, '0')].join(' : ');
            logger.find('.time .value').html(this.Api.toPersianNumber(timeString));
        }
        let setTimer = () => {
            setTime();
            if (window['board-timer'] != undefined) clearInterval(window['board-timer']);
            window['board-timer'] = setInterval(() => { setTime(); }, 1000);
        }
        let cssPos = () => {
            table.find('.slice').get().forEach((s, ii) => {
                let i = ii % w;
                let j = Math.floor(ii / w);
                let x = i * _w;
                let y = j * _h;
                $(s).css({'left': `${x}%`,'top': `${y}%`});
                let di = $(s).attr('data-i');
                let dj = $(s).attr('data-j');
                if (String(di) == String(i) && String(dj) == String(j)) $(s).addClass('correct');
                $(s).attr('data-ii', i).attr('data-jj', j);
            })
            table.find('.slice:not(.correct)').off().click(e => {
                if (table.find('.selected').length > 0) {
                    if (table.find('.selected')[0] != e.currentTarget) {
                        let a = $(table.find('.selected')[0]);
                        let b = $(e.currentTarget);
                        clicks += 1;
                        move(a, b);
                        setTimeout(() => {
                            table.find('.slice').off();
                            cssPos();
                        }, 50);
                    }
                    table.find('.slice').removeClass('selected');
                } else {
                    $(e.currentTarget).addClass('selected');
                }
            });

            if (table.find('.slice:not(.correct)').length == 0) {
                setTimeout(() => {
                    endGame();
                }, 100);
            }
            let lg = log();
            logger.html(`
                <label class="solved"><span>حل شده ها</span><b>${this.Api.toPersianNumber(lg.solved)}</b></label>
                <label class="remain"><span>باقی مانده</span><b>${this.Api.toPersianNumber(lg.remain)}</b></label>
                <label class="move"><span>حرکت</span><b>${this.Api.toPersianNumber(lg.move)}</b></label>
                <label class="time"><span>زمان</span><b class="value"></b></label>
            `);
            setTime();

        }
        let _w = 100 / w;
        let _h = 100 / h;
        let clicks = 0;
        let slices = [];
        let game = $(`<div class="game" style="aspect-ratio:${w}/${h}; ${w > h ? 'width: 80%;' : 'height: 80%;'} "></div>`);
        let table = $(`<div class="puzzle-board" style="--bg:url('../images/${img}');"></div>`);
        table.append(game);
        let logger = $(`<div class="puzzle-log"></div>`);
        let ind = 0;
        for (let j = 0; j < h; j++) {
            for (let i = 0; i < w; i++) {
                let slice = $(`
                    <div class="slice" data-s="${ind++}" data-i="${i}" data-j="${j}" style="width:${_w.toFixed(3)}%; height:${_h.toFixed(3)}%;">
                        <div class="img" style="width: ${w*100}%; height: ${h*100}%; left: ${-i*100}%; top:${-j*100}%;"></div>
                    </div>`)
                slices.push({
                    e: slice,
                    w: _w,
                    h: _h
                });
            }
        }

        this.root.empty('').append(table, logger);
        const elem = this.root.find('.game').get()[0];
        const panzoom = Panzoom(elem, {
            startScale: 1
        })
        shuffle();
        slices.forEach(m => {
            game.append(m.e);
        })
        cssPos();
        setTimer();
    }
    load(){
        this.createTemplate(db.resources.filter(m=> m.id == this.id)[0]);
    }
    render(){
        this.root = $(`
<div class="board">
</div>
            `);
        return this.root;
    }
}
class Games extends Page{
    constructor() { super('games'); }
    render(){
        this.root = $(`<div></div>`);
        db.resources.forEach(m=> {
            let g = $(`
                <div class="game-item">
                    <div class="img" style="aspect-ratio:${m.width}/${m.height} ;background-image:url('./images/${m.img}')";></div>
                    <span>${m.title}</span>
                </div>
            `.trim());
            this.root.append(g);
            g.off().click(()=>{ new Dificulity(m.id).show(); });
        })
        return this.root;
    }
}
class Main extends Page{
    constructor() {
        super('main');
    }
    render(){
        this.root = $(`<div></div>`);
        return this.root;
    }
}
class Dificulity extends Page{
    static items = [
        { id: 1, w: 7,  h: 5  , title : `آسان`},
        { id: 2, w: 10, h: 7 , title : `عادی`},
        { id: 3, w: 14, h: 10 , title : `سخت`},
        { id: 4, w: 20, h: 14 , title : `حرفه ای`},
    ];
    constructor(gameid) {
        super('dificulity');
        this.gameid = gameid;
    }
    choose(did){
        console.log(did);
        new Board(this.gameid, Dificulity.items.find(x=>x.id == did))
            .show();
    }
    render(){
        this.root = $(`<div>${Dificulity.items.map(x=>`<label class="item" data-id="${x.id}"><span>${x.title}</span><b>${this.Api.toPersianNumber(x.w)} × ${this.Api.toPersianNumber(x.h)}</b></label>`).join(``)}</div>`);
        this.root.find('label').off().click(e => {
            let did = $(e.currentTarget).attr('data-id')
            this.choose(did);
        });
        return this.root;
    }
}
class User extends Page{
    constructor() {
        super('user');
    }
    render(){
        this.root = $(`<div>
<div class="header">
    <div class="user-icon"><i class="fad fa-circle-user"></i></div>
    <div class="user-title">کاربر میهمان</div>
</div>            
    <div class="message">
            <p>کاربر گرامی، نسخه فعلی نصب شده شما فاقد امکان ارتباط با سرور می باشد، مورد فوق در دست راه اندازیست، پیشاپیش از صبر و شکیبایی شما متشکریم</p>
    </div>
            </div>`);
        return this.root;
    }
}
class Info extends Page{
    constructor() {
        super('info');
    }
    render(){
        this.root = $(`<div>

<div class="intro">
      <strong>درباره ما</strong>
      <p style="margin-top:8px;color:#333">
        شرکت ما یک تولیدکننده تخصصی پازل با تمرکز بر کیفیت، طراحی خلاقانه و تولید صنعتی-هنری است. ما مجموعه‌ای از پازل‌های منحصر‌به‌فرد تولید می‌کنیم که مناسب فروشگاهی، هدایا، استفاده در دکوراسیون و پروژه‌های تبلیغاتی هستند. محصولات ما شامل انواع شیشه‌ای، فلزی، چوبی، آکریلیک و ترکیبی می‌باشند که هر کدام در خط تولید مخصوص خود طراحی و ساخته می‌شوند.
      </p>
    </div>

    <section>
      <h2>خدمات و زمینه‌های فعالیت</h2>
      <ul>
        <li>طراحی مفهومی و هنری پازل بر اساس طرح مشتری یا آثار اختصاصی.</li>
        <li>تولید نمونه (پروتوتایپ) و تولید انبوه صنعتی.</li>
        <li>سفارشی‌سازی اندازه، شکل، بسته‌بندی و چاپ لوگو برای کسب‌وکارها.</li>
        <li>مشاوره در انتخاب مواد، دوام و سازگار با محیط‌زیست.</li>
        <li>بسته‌بندی صادراتی و خدمات لجستیک برای بازارهای خارجی.</li>
      </ul>
    </section>

    <section>
      <h2>انواع پازل‌های تولیدی</h2>

      <div class="grid">
        <div class="card">
          <h3>پازل شیشه‌ای</h3>
          <p>
            پازل‌های ساخته شده از شیشه شامل انواع <strong>شیشه سکوریت (temper)</strong> برای ایمنی و مقاومت، <strong>شیشه رنگی / استین‌گلَس</strong> برای جلوه‌های هنری، <strong>آینه‌کاری</strong> برای افکت‌های بازتابی و <strong>موزاییک شیشه‌ای</strong> برای بافت‌های تزیینی است.
          </p>
          <ul>
            <li>مزایا: جلوه لوکس، سطح براق، مناسب برای دیزاین و هدایا.</li>
            <li>فرآیند: برش CNC یا واترجت، لبه‌گیری و پولیش، تمپرینگ (در صورت نیاز)، چاپ سرامیکی و لمینت حفاظتی.</li>
            <li>موارد استفاده: تابلوی دکور، هدیه‌های لوکس، قطعات نمایشگاهی.</li>
          </ul>
        </div>

        <div class="card">
          <h3>پازل فلزی</h3>
          <p>
            پازل‌های فلزی از ورق‌های فولاد ضدزنگ، آلومینیوم، برنج و فولاد کربنی ساخته می‌شوند. امکان استفاده از پوشش‌های مقاوم در برابر خوردگی، رنگ‌کاری پودری و حکاکی لیزر وجود دارد.
          </p>
          <ul>
            <li>مزایا: دوام بالا، حس صنعتی/لاکچری، مناسب برای قطعات مکانیکی و معماهای سه‌بعدی.</li>
            <li>فرآیند: برش لیزر یا واترجت، خم‌کاری، پرداخت سطح، رنگ‌کوره‌ای یا آنودایزینگ.</li>
            <li>موارد استفاده: پازل‌های مکانیکی، هدایا سازمانی، تابلوهای دیواری فلزی.</li>
          </ul>
        </div>

        <div class="card">
          <h3>پازل چوبی</h3>
          <p>
            پازل‌های چوبی با متریال‌های مختلف مانند ام‌دی‌اف، تخته چندلایی (plywood)، چوب سخت (مانند راش یا بلوط) و چوب‌های روکش‌دار ساخته می‌شوند. این پازل‌ها می‌توانند هم با تیغه‌های اره‌ی CNC و هم با برش لیزری تولید شوند.
          </p>
          <ul>
            <li>مزایا: حس طبیعی و گرم، قابلیت رنگ‌آمیزی، سبک و قابل‌حمل.</li>
            <li>فرآیند: برش CNC یا لیزر، سندبلاست/سنباده، لاک یا روغن‌کاری، چاپ مستقیم یا اضافه‌کردن تایل‌های چاپی.</li>
            <li>موارد استفاده: اسباب‌بازی‌های آموزشی، مسابقات، هدیه‌های سفارشی و دیزاین داخلی.</li>
          </ul>
        </div>

        <div class="card">
          <h3>پازل‌های آکریلیک و پلاستیکی</h3>
          <p>
            آکریلیک (پلکسی) و پلاستیک‌های مهندسی برای طرح‌هایی با رنگ‌های روشن، قابلیت شفاف و وزن کم کاربرد دارند. قابل حکاکی و چاپ UV مستقیم هستند.
          </p>
          <ul>
            <li>مزایا: تنوع رنگ، قیمت مناسب‌تر نسبت به شیشه، قابل‌شکل‌دهی آسان.</li>
            <li>فرآیند: برش لیزر، خم‌کاری حرارتی، چسب‌کاری ساختاری، چاپ UV.</li>
          </ul>
        </div>

        <div class="card">
          <h3>پازل‌های ترکیبی / هیبریدی</h3>
          <p>
            ترکیب دو یا چند متریال (مثلاً شیشه + چوب، فلز + آکریلیک) برای خلق پازل‌های چندلایه با جلوه‌های بصری و عملکردی ویژه.
          </p>
          <ul>
            <li>مزایا: امکان ایجاد محصولات منحصر‌به‌فرد و تخصصی.</li>
            <li>موارد استفاده: پروژه‌های هنری، محصولات پریمیوم و نمایشگاهی.</li>
          </ul>
        </div>

        <div class="card">
          <h3>پازل‌های مکانیکی و سه‌بعدی</h3>
          <p>
            پازل‌هایی که شامل قطعات مکانیکی، قفل‌ها یا سازه‌های سه‌بعدی هستند؛ مناسب برای چالش‌های فکری پیشرفته و محصولات لوکس.
          </p>
          <ul>
            <li>فرآیند: ترکیب CNC، تراشکاری دقیق، مونتاژ دستی و آزمون عملکردی.</li>
          </ul>
        </div>
      </div>
    </section>

    <section>
      <h2>خط تولید و فرآیند کیفیت</h2>
      <p style="color:#333">
        ما ترکیبی از ماشین‌آلات صنعتی و کارگاه‌های دستی را به کار می‌گیریم تا ساختارهای دقیق و ظریف را با کیفیت تکرارپذیر تولید کنیم. فرایند کلی تولید شامل مراحل زیر است:
      </p>
      <ul>
        <li><strong>طراحی و نمونه‌سازی:</strong> طراحی CAD/Vector، تولید نمونه اولیه جهت ارزیابی.</li>
        <li><strong>برش و شکل‌دهی:</strong> استفاده از لیزر، CNC، واترجت، یا برش مکانیکی مناسب هر متریال.</li>
        <li><strong>پرداخت و پوشش‌دهی:</strong> پولیش، رنگ‌کدن، پوشش‌های محافظ و آنودایزینگ برای فلزات.</li>
        <li><strong>مونتاژ و کنترل کیفیت:</strong> مونتاژ نهایی، تست عملکرد (برای پازل‌های مکانیکی) و کنترل کیفیت بصری.</li>
        <li><strong>بسته‌بندی و ارسال:</strong> بسته‌بندی اختصاصی، درج دفترچه راهنما، و آماده‌سازی برای حمل و نقل داخلی یا صادرات.</li>
      </ul>

      <h3>استانداردها و تضمین کیفیت</h3>
      <ul>
        <li>کنترل ابعادی و تطابق با طرح.</li>
        <li>تست دوام و عمر مفید برای قطعات متحرک.</li>
        <li>استفاده از مواد استاندارد و مناسب بازار هدف (غذا/کودک/خانه).</li>
      </ul>
    </section>

    <section>
      <h2>سفارشی‌سازی و همکاری B2B</h2>
      <p style="color:#333">
        ما خدمات کامل سفارشی‌سازی ارائه می‌دهیم:
      </p>
      <ul>
        <li>طراحی لوگو و برندینگ روی پازل و بسته‌بندی.</li>
        <li>توسعه خط تولید اختصاصی برای سفارشات عمده (OEM/Private Label).</li>
        <li>محدودیت‌های کمینه تولید (MOQ) قابل مذاکره بسته به متریال و فرآیند.</li>
        <li>همکاری با طراحان و هنرمندان برای مجموعه‌های ویژه و نسخه‌های محدود (limited edition).</li>
      </ul>
    </section>

    <section>
      <h2>محیط‌زیست و مواد پایدار</h2>
      <p style="color:#333">
        رعایت اصل پایداری برای ما اهمیت دارد. در تولید پازل‌ها:
      </p>
      <ul>
        <li>استفاده از چوب‌های دارای گواهی یا روکش‌های بازیافت‌پذیر در امکان‌پذیر بودن.</li>
        <li>حداقل‌سازی ضایعات از طریق بهینه‌سازی برش و استفاده از فناوری‌های دقیق.</li>
        <li>گزینه‌های بسته‌بندی بازیافت‌پذیر و قابل‌تخصیص برای برندهای مشتری.</li>
      </ul>
    </section>

    <section>
      <h2>نمونه‌کارها و مشتریان</h2>
      <p style="color:#333">
        ما تجربه همکاری با فروشگاه‌های هدیه، گالری‌های هنری، شرکت‌های تبلیغاتی و مشتریان خصوصی را داریم. نمونه‌کارها شامل:
      </p>
      <ul>
        <li>مجموعه‌های هنری شیشه‌ای با چاپ سرامیکی و قاب‌های چوبی.</li>
        <li>پازل‌های برنجی حک‌شده برای مراسم یادبود و لوح‌های یادبود.</li>
        <li>ست‌های چوبی آموزشی برای کودکان با رنگ‌های غیرسمی.</li>
      </ul>
    </section>

    <section>
      <h2>پرسش‌های متداول</h2>
      <h3>چقدر طول می‌کشد تا سفارش سفارشی ساخته شود؟</h3>
      <p>زمان تولید بسته به پیچیدگی و تیراژ بین چند روز تا چند هفته متغیر است. برای سفارشات بزرگ‌تر زمان‌بندی دقیق اعلام می‌شود.</p>

      <h3>حداقل تیراژ سفارش (MOQ) چقدر است؟</h3>
      <p>بسته به متریال و فرآیند؛ برای نمونه‌های آماده معمولاً امکان سفارش تکی وجود دارد، اما برای تولید سفارشی MOQ مذاکره می‌شود.</p>

      <h3>آیا امکان ارسال بین‌المللی دارید؟</h3>
      <p>بله. بسته‌بندی و مستندسازی صادراتی انجام می‌پذیرد.</p>
    </section>
            </div>`);
        return this.root;
    }
}
class Shop extends Page{
    constructor() {
        super('shop');
    }
    render(){
        this.root = $(`<div>
    <div class="message">
        <p>برای ورود به فروشگاه پازل های حرفه ای استینو، کلیک کنید</p>
        <a href="https://stino.ir" target="_blank" class="btn"><i class="fal fa-chevron-left"></i><span>ورود به فروشگاه استینو</span></a>
    </div>
            </div>`);
        return this.root;
    }
}