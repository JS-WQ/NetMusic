$(function(){
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