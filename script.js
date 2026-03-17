
console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Vakratunda mahakaya", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "O rangrez", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Deh vitthal vitthal zala", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Chikni chameli", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Asaree ke fall sa", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Kaakan", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Achyutam keshavam", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Nighon main dekho mere", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Patin bai", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Hanuman chalisa", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
    {songName: "May rang sharbaton k", filePath: "songs/11.mp3", coverPath: "covers/11.jpg"},
    {songName: "Bapu kisan he", filePath: "songs/12.mp3", coverPath: "covers/12.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= songs.length - 1){
    
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})


// ================= SEARCH FUNCTION =================

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function () {

    let filter = searchInput.value.toLowerCase();

    songItems.forEach((song, index) => {

        let songName = songs[index].songName.toLowerCase();

        if (songName.includes(filter)) {
            song.style.display = "flex";
        } else {
            song.style.display = "none";
        }

    });

});
