const wrapper = document.querySelector(".wrapper");
const musicImg = wrapper.querySelector(".img-area img");
const musicName = wrapper.querySelector(".song-details .name");
const musicArtist = wrapper.querySelector(".song-details .artist");
const mainAudio = wrapper.querySelector("#main-audio");
const playPauseBtn = wrapper.querySelector(".play-pause");
const prevBtn = wrapper.querySelector("#prev");
const nextBtn = wrapper.querySelector("#next");
const progressArea = wrapper.querySelector(".progress-area");
const progressBar = wrapper.querySelector(".progress-bar");
const musicList = wrapper.querySelector(".music-list");
const showMoreBtn = wrapper.querySelector("#more-music");
const hideMusicBtn = musicList.querySelector("#close"); 

let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);

window.addEventListener("load", () => {
    //calling load music function once window is loaded
    loadMusic(musicIndex);
    playingNow();
});

 // load music function
function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `images/${allMusic[indexNumb - 1].img}.jpg`;
    mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
}

//play music function
function playMusic() {
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
    playingNow();
}

//Pause music function
function pauseMusic() {
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
    playingNow();
}

//next music function
function nextMusic(){
    //here we decrement the index by 1
    musicIndex++;
    //if music songs are over then come to first song
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}

//prev music function
function prevMusic(){
    //here we increment the index by 1
    musicIndex--;
    //if music songs are over then come to first song
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}

//play or music button event
playPauseBtn.addEventListener("click", () => {
    const isMusicPaused = wrapper.classList.contains("paused");

    isMusicPaused ? pauseMusic() : playMusic();
});

//next music btn event
nextBtn.addEventListener("click", () => {
    nextMusic();
});

//prev music btn event
prevBtn.addEventListener("click", () => {
    prevMusic();
});

//update progress bar with according to music
mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrapper.querySelector(".current");
    let musicDuration = wrapper.querySelector(".duration");

    mainAudio.addEventListener("loadeddata", () => {
        //update song total duration
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if(totalSec < 10){//adding 0 if sec is less than 10
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    });

    //update playing song current time
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10){
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;

});

//update the playing song duration on mouse click
progressArea.addEventListener("click", (e) => {
    let progressWidthval = progressArea.clientWidth;
    let clickedoffSetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedoffSetX / progressWidthval) * songDuration;
    playMusic();
});

//work on repeat,shuffle song according to the icon
const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", () => {
    let getText = repeatBtn.innerText;

    switch(getText){
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "song looped");
            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Playback shuffle");
            break;
        case "shuffle":
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "Playlist looped");
            playingNow();
            break;
    }
});

//now the process of the suffle buttons 
mainAudio.addEventListener("ended", () => {

    let getText = repeatBtn.innerText;

    switch(getText){
        case "repeat":
            nextMusic();
            break;
        case "repeat_one":
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;
        case "shuffle":
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            do{
             randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            }while(musicIndex == randIndex);
            musicIndex = randIndex;
            loadMusic(musicIndex);
            playMusic();
            break;
    }
});

//Playlist showing button
showMoreBtn.addEventListener("click", () => {
    musicList.classList.toggle("show");
});

//playlist hiding button
hideMusicBtn.addEventListener("click", () => {
    showMoreBtn.click();
});

const ulTag = wrapper.querySelector("ul");

for(let i = 0; i < allMusic.length; i++){
    let liTag = `
            <li li-index="${i + 1}">
                <div class="row">
                    <span>${allMusic[i].name}</span>
                    <p>${allMusic[i].artist}</p>
                </div>
                <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
                <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
            </li>
        `;
    ulTag.insertAdjacentHTML("beforeend", liTag);

    let liAudioDuration = ulTag.querySelector(`#${allMusic[i].src}`);
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

    liAudioTag.addEventListener("loadeddata", () => {
        let audioDuration = liAudioTag.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);

        if(totalSec < 10){
            totalSec = `0${totalSec}`;
        }
        liAudioDuration.innerText = `${totalMin}:${totalSec}`;
        liAudioDuration.setAttribute("t-duration", `${totalMin}:${totalSec}`);
    });
    
}

//Play particular song on the playlist
const allLiTags = ulTag.querySelectorAll("li");

function playingNow(){

    for (let j = 0; j < allLiTags.length; j++){
        let audioTag = allLiTags[j].querySelector(".audio-duration");

        if(allLiTags[j].classList.contains("playing")){
            allLiTags[j].classList.remove("playing");
            let adDuration = audioTag.getAttribute("t-duration");
            audioTag.innerText = adDuration;
        }

        if(allLiTags[j].getAttribute("li-index") == musicIndex){
            allLiTags[j].classList.add("playing");
            audioTag.innerText = "playing";
        }
        
        allLiTags[j].setAttribute("onclick", "clicked(this)");
    }
}

//click event on played song
function clicked(element){

    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex;
    loadMusic(musicIndex);
    playMusic();

}