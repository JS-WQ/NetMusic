$(function(){
    $.get('./song.json').then(function(response){
        console.log('hhh')
        let items = response
        console.log(response)
        items.forEach((i)=>{
            let $li = $(`
            <li>
                <a href="./song.html?id=${i.id}">
                    <h3>${i.name}</h3>
                    <i></i>
                    <p>演唱者-${i.singer}</p>
                    <span></span>
                </a>
            </li>
            `)
            $('#newMusicList').append($li)
        })
        $('#musicloading').remove()
    },function(){
    })
})