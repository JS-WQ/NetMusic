$(function(){
    let id = parseInt(location.search.match(/\bid=([^&]*)/)[1],10)

    $.get('./song.json').then(function(response){
        let songs = response
        let song = songs.filter(s=>s.id === id)[0]
        let {url} = song
        let audio = document.createElement('audio')
        audio.src = url
        audio.oncanplay=function(){
            audio.play()
            $('.song-container').addClass('playing')
        }
        $('.icon-pause').on('touchstart',function(){
            audio.pause()
            $('.song-container').removeClass('playing')
        })
        $('.icon-play').on('touchstart',function(){
            audio.play()
            $('.song-container').addClass('playing')
        })
    })
    $.get('/lyric.json').then(function(object){
        let {lyric} = object //等价于let lyric = object.lyric
        let array = lyric.split('\n') //把得到的数据分隔成不同的字符串
        let regex = /^\[(.+)\](.*)$/ 

        //对歌词进行分割
        array = array.map(function(string,index){
            let matches = string.match(regex)
            if(matches){
                return {time:matches[1],words:matches[2]}
            }
        })
    })
})