// Playlist Data
const songs = [
{
    title: "Kora Kagaz Tha Ye Mera",
    artist: "Kishore kumar,Lata mangeshkar",
    image: "images/img1.png",
    audio: "songs/song1.mp3"
},
{
    title: "São Paulo",
    artist: "The Weeknd",
    image: "images/img2.png",
    audio: "songs/song2.mp3"
},
{
    title: "Tu Hi Meri Shab Hai",
    artist: "KK ",
    image: "images/img3.png",
    audio: "songs/song3.mp3"
},
{
    title: "Kutti Story",
    artist: "Anirudh Ravichander,Thalapathy Vijay",
    image: "images/img4.png",
    audio: "songs/song4.mp3"
},
{
    title: "Deva Shree Ganesha",
    artist: "Ajay-Atul",
    image: "images/img5.png",
    audio: "songs/song5.mp3"
}
];

const audio = document.getElementById("audio");
const albumArt = document.getElementById("albumArt");
const songTitle = document.getElementById("songTitle");
const artistName = document.getElementById("artistName");

const playBtn = document.getElementById("playBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const progressBar = document.getElementById("progressBar");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const volumeSlider = document.getElementById("volumeSlider");
const playlistContainer = document.getElementById("playlist");

let currentSongIndex = 0;


// Loads a song into the player

function loadSong(index){

    const song = songs[index];

    songTitle.textContent = song.title;
    artistName.textContent = song.artist;
    albumArt.src = song.image;
    audio.src = song.audio;

    updatePlaylistHighlight();
}


// Play current song

function playSong(){
    audio.play();
    playBtn.textContent = "⏸";
}


// Pause current song

function pauseSong(){
    audio.pause();
    playBtn.textContent = "▶";
}


// Toggle play and pause

function togglePlayPause(){

    if(audio.paused){
        playSong();
    }else{
        pauseSong();
    }

}


// Play next song
function nextSong(){

    currentSongIndex++;

    if(currentSongIndex >= songs.length){
        currentSongIndex = 0;
    }

    loadSong(currentSongIndex);
    playSong();
}


// Play previous song

function previousSong(){

    currentSongIndex--;

    if(currentSongIndex < 0){
        currentSongIndex = songs.length - 1;
    }

    loadSong(currentSongIndex);
    playSong();
}


// Update progress bar while song plays

function updateProgress(){

    progressBar.max = audio.duration;

    progressBar.value = audio.currentTime;

    currentTime.textContent = formatTime(audio.currentTime);

    duration.textContent = formatTime(audio.duration);
}


// Convert seconds into minutes:seconds

function formatTime(time){

    if(isNaN(time)) return "0:00";

    let minutes = Math.floor(time / 60);

    let seconds = Math.floor(time % 60);

    if(seconds < 10){
        seconds = "0" + seconds;
    }

    return `${minutes}:${seconds}`;
}


// Jump to selected part of song

function changeProgress(){

    audio.currentTime = progressBar.value;
}


// Create playlist items

function createPlaylist(){

    songs.forEach((song,index)=>{

        const li = document.createElement("li");

        li.textContent = `${song.title} - ${song.artist}`;

        li.addEventListener("click",()=>{

            currentSongIndex = index;

            loadSong(index);

            playSong();

        });

        playlistContainer.appendChild(li);

    });

}


// Highlight current song in playlist

function updatePlaylistHighlight(){

    const items = playlistContainer.querySelectorAll("li");

    items.forEach((item,index)=>{

        item.classList.remove("active-song");

        if(index === currentSongIndex){
            item.classList.add("active-song");
        }

    });

}


// Change volume level

function changeVolume(){

    audio.volume = volumeSlider.value;
}

playBtn.addEventListener("click",togglePlayPause);
nextBtn.addEventListener("click",nextSong);
prevBtn.addEventListener("click",previousSong);

audio.addEventListener("timeupdate",updateProgress);

progressBar.addEventListener("input",changeProgress);

volumeSlider.addEventListener("input",changeVolume);

audio.addEventListener("ended",nextSong);

createPlaylist();
loadSong(currentSongIndex);