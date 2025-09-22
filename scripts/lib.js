let db = {
    resources: [{
            id: 1,
            img: 'flower1.jpg',
            width: 1000,
            height: 700,
            title: '',
            description: '',
            link: ''
        },
        {
            id: 2,
            img: 'flower2.jpg',
            width: 1000,
            height: 700,
            title: '',
            description: '',
            link: ''
        },
    ]
}

let createTemplate = (o) => {
    let dif = Math.abs(o.width-o.height)/3;
    let w = o.width / dif;
    let h = o.height / dif;
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
    let cssPos = () => {
        table.find('.slice').get().forEach((s, ii) => {
            let i = ii % w;
            let j = Math.floor(ii / w);
            let x = i * _w;
            let y = j * _h;
            $(s).css({
                'left': `${x}%`,
                'top': `${y}%`
            });
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
                    <label class="solved">${lg.solved}</label>
                    <label class="remain">${lg.remain}</label>
                    <label class="move">${lg.move}</label>`)
    }
    let _w = 100 / w;
    let _h = 100 / h;
    let clicks = 0;
    let slices = [];
    let game = $(`<div class="game" style="aspect-ratio:${w}/${h}; ${w > h ? 'width: 80%;' : 'height: 80%;'} "></div>`);
    let table = $(`<div class="puzzle-board" style="--bg:url('./images/${img}');"></div>`);
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

    $('.board').empty('').append(table, logger);
    const elem = $('.board').find('.game').get(0);
    const panzoom = Panzoom(elem, { contain: 'inside', startScale: 1 })
    shuffle();
    slices.forEach(m => {
        game.append(m.e);
    })
    cssPos();
    setTimeout(() => {
        //solveAll();
    }, 1000);
}
let si = db.resources[0];
$(document).ready(()=>{
    createTemplate(si);    
});