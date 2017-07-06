$(function(){
    let id = parseInt(location.search.match(/\bid=([^&]*)/)[1],10)

    $.get('./song.json').then(function(response){
        let songs = response
        let song = songs.filter(s=>s.id === id)[0]
        let {url,name,lyric,image,bgimage} = song    

        initSong.call(undefined,url,image,bgimage)
        initLyric(name,lyric)
    })

    function initSong(url,image,bgimage){
        let audio = document.createElement('audio')
        audio.src = url

        audio.oncanplay=function(){
            $('.song-container').addClass('playing')
            $('#page').css("background-image",`url(${bgimage})`)

            $('.ring-musicbg').attr("src",`${image}`)


            audio.play()
        }
        audio.onended=function(){
            $('.song-container').removeClass('playing')
        }
        $('.icon-pause').on('touchstart',function(){
            audio.pause()
            $('.song-container').removeClass('playing')
        })
        $('.icon-play').on('touchstart',function(){
            audio.play()
            $('.song-container').addClass('playing')
        })
        setInterval(()=>{
            let songtimes = audio.currentTime
            let munites = ~~(songtimes/60)//两次取反可以去掉小数点
            let seconds = songtimes-munites*60
            let time = `${pad(munites)}:${pad(seconds)}` //歌曲播放的时间
            let $lineLyric = $('.lines>p')
            let $singline
            for(let i=0;i<$lineLyric.length;i++){
                if($lineLyric.eq(i).attr('data-time') < time && $lineLyric.eq(i+1).length !== 0 && $lineLyric.eq(i+1).attr('data-time') > time){
                    $singline = $lineLyric.eq(i)
                }else if($lineLyric.last().attr('data-time') === time){
                    alert(1)
                    $singline = $lineLyric.last()
                    break
                }
            }
            if($singline){
                $singline.addClass('active').prev().removeClass('active')
                let singlinetop = $singline.offset().top //选中行距顶部的高度
                let linestop = $('.lines').offset().top //模块距顶部的高度
                let resulttop = singlinetop -linestop - $('.songLrc').height()/3
                $('.lines').css('transform',`translateY(-${resulttop}px)`)
            }
        },500)
    }

    function pad(number){
        return number>=10 ? number + '' :'0' + number
    }

    //初始化歌词
    function initLyric(name,lyric){
        $('.songName').text(name)
        parseLyric.call(undefined,lyric)
    }

    //读取json里面的歌词，并把歌词放入播放页面
    function parseLyric(lyric){
        let array = lyric.split('\n') //把得到的数据分隔成不同的字符串
        let regex = /^\[(.+)\](.*)$/ 

        //对歌词进行分割
        array = array.map(function(string,index){
            let matches = string.match(regex)
            if(matches){
                return {time:matches[1],words:matches[2]}
            }
        })
        let $lyric = $('.songLrc')
        array.map(function(object){
            if(!object){return}
            let $p = $('<p></p>')
            $p.attr('data-time',object.time).text(object.words)
            $p.appendTo($lyric.children('.lines'))
        })
    }

})