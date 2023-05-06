//Initializing Variables
let currentSong = 0;
let masterPlay = document.getElementById('masterPlay')
let audioElement = new Audio('Songs/1.mp3')
let gif = document.getElementById('songPlayingGif')
let mySongLengthBar = document.getElementById('mySongLengthBar')
let songItem = Array.from(document.getElementsByClassName('songItem'))
let songs = [
    {songName: "Raanjha", filePath: "Songs/1.mp3", coverName: "Covers/songItem1.jpg", duration: "5:00"},
    {songName: "Raataan Lambiyan", filePath: "Songs/2.mp3", coverName: "Covers/songItem2.jpg", duration: "5:00"},
    {songName: "Tera Ban Jaunga", filePath: "Songs/3.mp3", coverName: "Covers/songItem3.jpg", duration: "5:00"},
    {songName: "Saturday Saturday", filePath: "Songs/4.mp3", coverName: "Covers/songItem4.jpg", duration: "5:00"},
    {songName: "Kaun Tujhe", filePath: "Songs/5.mp3", coverName: "Covers/songItem5.png", duration: "5:00"}
]
songItem.forEach((element, i)=>{ //Set song and covers using loop, already set manually (check for duration)
    element.getElementsByTagName("img")[0].src = songs[i].coverName; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})// document.getElementsByClassName('timeStamp')[0].innerText = songs[i].duration


//Handle play/ pause Events
masterPlay.addEventListener('click', () => {
        if(audioElement.paused || audioElement.currentTime <= 0)    
        //If audio is paused/ not played yet, so play audio when clicked on 'play' button; remove 'play' and add 'pause' button. Gif starts playing.
        {
            audioElement.play()
            masterPlay.classList.remove('fa-play-circle')
            masterPlay.classList.add('fa-pause-circle')
            gif.style.opacity = 1
        }
        else{
        //Else audio is being played, so pause audio when clicked on 'play' button; remove 'pause' and add 'play' button. Gif stops playing.
                audioElement.pause()
                masterPlay.classList.remove('fa-pause-circle')
                masterPlay.classList.add('fa-play-circle')
                gif.style.opacity = 0
        }
})

//Updating Seek Bar
audioElement.addEventListener('timeupdate', () => {                    
    let songLength = parseInt((audioElement.currentTime/audioElement.duration)*100)  
    //gets songLength in % as seekBar is set as 100 max
    mySongLengthBar.value = songLength
})
//To play song at any point in Seek Bar
mySongLengthBar.addEventListener('change', () => {
    audioElement.currentTime = mySongLengthBar.value * audioElement.duration/100   //CT = D/100 as in %
})

//When clicked on 'play' button in song Item, remove play and add pause button
const makeAllPlay = () => {
    Array.from(document.getElementsByClassName('playSong')).forEach((element) => {
        element.classList.remove('fa-pause-circle')
        element.classList.add('fa-play-circle')    
    })
}

//From list of songs in album
Array.from(document.getElementsByClassName('playSong')).forEach((element) => {
    element.addEventListener('click', (e) => {
    makeAllPlay()
    currentSong = parseInt(e.target.id)       //To select song Item 
    //When clicked on 'play' button of one song, remove 'play' of other and add 'pause' to another track 
    e.target.classList.remove('fa-play-circle')    
    e.target.classList.add('fa-pause-circle')
    audioElement.src = `Songs/${currentSong}.mp3`     //Selected song
    masterSongInfo.innerText = songs[currentSong-1].songName 
    audioElement.currentTime = 0;   //As new song is being played so seekBar set to 0;
    audioElement.play()
    gif.style.opacity = 1
    masterPlay.classList.remove('fa-play-circle')       
    masterPlay.classList.add('fa-pause-circle')
    })
})

document.getElementById('next').addEventListener('click', () => {
    if(currentSong >= 5){          //Play first song if clicked on next from last song
        currentSong = 0;
    }
    else{
        currentSong += 1;
    }
    audioElement.src = `Songs/${currentSong+1}.mp3`   
    masterSongInfo.innerText = songs[currentSong].songName    
    audioElement.currentTime = 0;   
    audioElement.play()
    gif.style.opacity = 1
    masterPlay.classList.remove('fa-play-circle')    
    masterPlay.classList.add('fa-pause-circle')
})

document.getElementById('previous').addEventListener('click', () => {
    if(currentSong <= 0){           //Play last song if clicked on previous from first song
        currentSong = 5;
    }
    else{
        currentSong -= 1;
    }
    audioElement.src = `Songs/${currentSong+1}.mp3`
    masterSongInfo.innerText = songs[currentSong].songName   
    audioElement.currentTime = 0;   
    audioElement.play()
    gif.style.opacity = 1
    masterPlay.classList.remove('fa-play-circle')    
    masterPlay.classList.add('fa-pause-circle')
})