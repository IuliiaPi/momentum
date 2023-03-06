const langEn = document.querySelector('#lang-en');
const langUa = document.querySelector('#lang-ua');

// time 
// day 
// greeting 

const time = document.querySelector('.time');
const day = document.querySelector('.day');
const greeting = document.querySelector('.greeting');
let timeOfDay;

function showTime() {

    const date = new Date();

    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
    const currentDate = date.toLocaleDateString('en-US', options);
    day.textContent = currentDate;

    const hours = date.getHours();

    function getTimeOfDay(hours) {
        if (hours < 6) {
            timeOfDay = "night";
        } else if (hours < 12) {
            timeOfDay = "morning";
        } else if (hours < 18) {
            timeOfDay = "afternoon";
        } else {
            timeOfDay = "evening";
        }
    }
    getTimeOfDay(hours);

    const greetingText = `Good ${timeOfDay}, `;
    greeting.textContent = greetingText;

    setTimeout(showTime, 1000);  // setInterval(showTime, 1000);
}
showTime();


// greeting input [Enter name]

const greetingContainer = document.querySelector('.greeting-container');
const enterName = document.querySelector('.enter-name');
enterName.value = 'Dear Friend';

function setLocalStorage() {
    localStorage.setItem('name', enterName.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        enterName.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage);


// slider  -------------------------------------------------------------------

const btnSlidePrev = document.querySelector('.slide-prev');
const btnSlideNext = document.querySelector('.slide-next');

let randomNum;
function getRandomNum() {
    randomNum = Math.floor(Math.random() * 20) + 1;  // Returns a random integer from 1 to 20
}
getRandomNum();

function setBg() {
    let bgNum = String(randomNum).padStart(2, "0");
    const img = new Image();
    const imageSrc = `https://github.com/IuliiaPi/stage1-tasks/blob/assets/images/${timeOfDay}/${bgNum}.jpg?raw=true`;
    img.src = imageSrc;
    img.addEventListener('load', () => {  //  or  img.onload = () => {
        document.body.style.backgroundImage = `url(${imageSrc})`;
    });
};
setBg();

function getSlideNext() {
    if (randomNum === 20) {
        randomNum = 1;
    } else {
        randomNum++;
    }
    setBg();
}
btnSlideNext.addEventListener("click", getSlideNext);

function getSlidePrev() {
    if (randomNum === 1) {
        randomNum = 20;
    } else {
        randomNum--;
    }
    setBg();
}
btnSlidePrev.addEventListener("click", getSlidePrev);


// Images API: Unsplash API и Flickr API  ---------------------------------------------------------------

async function getLinkToImage() {
    const url = 'https://api.unsplash.com/photos/random?query=morning&client_id=zCHXfBFZzSS0FdFvKMsQaROLD0Lvm4LfJgDM3T2t5Ow';
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.urls.regular);
}
getLinkToImage();

// function getLinkToImage() {
//     const url = 'https://api.unsplash.com/photos/random?query=morning&client_id=e2077ad31a806c894c460aec8f81bc2af4d09c4f8104ae3177bb809faf0eac17';
//     fetch(url)
//       .then(res => res.json())
//       .then(data => {
//         console.log(data.urls.regular)
//       });
//     }
//     getLinkToImage();

// change quote  ----------------------------------------------------------------

const footerQuote = document.querySelector('.footer__quote');
const btnChangeQuote = document.querySelector('.change-quote');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
quote.textContent = `"Life is what happens when you're busy making other plans."`;
author.textContent = "John Lennon";

async function getQuotes() {
    let quotes = 'quotes_en.json';
    const res = await fetch(quotes);
    const data = await res.json();
    // console.log(data);
    let randomNum = Math.floor(Math.random() * data.length);
    quote.textContent = `"${data[randomNum].text}."`;
    author.textContent = `${data[randomNum].author}`;
}
getQuotes();

// async function getQuotesUa() {
//     let quotes = 'quotes_ru.json'; 
//     const res = await fetch(quotes);
//     const data = await res.json();
//     // console.log(data);
//     let randomNum = Math.floor(Math.random() * data.length);
//     quote.textContent = `"${data[randomNum].text}."`;
//     author.textContent = `${data[randomNum].author}`;
// }
// getQuotesUa();

btnChangeQuote.addEventListener("click", getQuotes);

// langEn.addEventListener("click", getQuotes);

// langUa.addEventListener("click", getQuotesUa);
// btnChangeQuote.addEventListener("click", getQuotesUa);

// get Weather  ---------------------------------------------------------------

const weatherBlock = document.querySelector('#weather');
const weatherIcon = document.querySelector('.weather__icon');
const weatherIconImg = document.querySelector('.weather__icon-img');
const temperature = document.querySelector('.weather__temp');
const weatherDescription = document.querySelector('.weather__description');
const feelsLike = document.querySelector('.weather__feels-like');
const wind = document.querySelector('.weather__wind');
const humidity = document.querySelector('.weather__humidity');

const city = document.querySelector('.weather__city');
const weatherError = document.querySelector('.weather-error');

city.value = 'Kyiv';
const lang = 'en';
const unitsMetric = 'metric';
const unitsImperial = 'imperial';

//     const url = 'https://api.openweathermap.org/data/2.5/weather?lang=en&appid=3ee4bd2dcd7dece6e7e79f8f64042146&units=metric';
//     const res = await fetch(url + '&q=' + xCity);

async function loadWeather(e) {

    const server = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=3ee4bd2dcd7dece6e7e79f8f64042146&units=${unitsMetric}`;
    const response = await fetch(server, {
        method: 'GET',
    });
    const responseResult = await response.json();
    // console.log(responseResult);

    if (response.ok) {
        weatherError.textContent = '';
        getWeather(responseResult);

    } else {
        weatherError.textContent = 'Enter correct city!';
        // if (res.status === 404 || city.value === '') {} 
        temperature.textContent = ``;
        weatherIcon.classList.add('hidden');
        weatherDescription.textContent = '';
        feelsLike.textContent = '';
        wind.textContent = ``;
        humidity.textContent = ``;
    }

}

function getWeather(data) {
    // console.log(data);
    weatherIcon.className = 'weather__icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    // or 
    // const weatherIcon2 = data.weather[0].icon;
    // weatherIconImg.src = `http://openweathermap.org/img/w/${weatherIcon2}.png`;
    // weatherIconImg.alt = `${data.weather[0].main}`;

    city.value = `${data.name}`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    feelsLike.textContent = `feels like: ${Math.round(data.main.feels_like)}°C`;
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
}

city.addEventListener('change', loadWeather);

if (weatherBlock) {
    loadWeather();
}

// LocalStorage City

function setLocalStorageCity() {
    localStorage.setItem('weather__city', city.value);
}
window.addEventListener('beforeunload', setLocalStorageCity);

function getLocalStorageCity() {
    if (localStorage.getItem('weather__city')) {
        city.value = localStorage.getItem('weather__city');
        loadWeather();
    }
}
window.addEventListener('load', getLocalStorageCity);



// player  -----------------------------------------------------------------------

import playList from './playList.js';
console.log(playList);

const player = document.querySelector('.player');
const btnPlayPrev = document.querySelector('.play-prev');
const btnPlay = document.querySelector('.play');
const btnPlayNext = document.querySelector('.play-next');
const playListContainer = document.querySelector('.play-list');
const trackList = playListContainer.childNodes;

const volume = document.querySelector('.volume');
const volumeRange = document.querySelector('.volume-range');
const audioTitle = document.querySelector('.audio-title');
const currentTime = document.querySelector('.current-time');
const trackDuration = document.querySelector('.track-duration');

playList.forEach((item, index) => {   // or  for(let i = 0; i < playList.length; i++) { }
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = item.title;  // or li.textContent = `${playList[index].title}`;
    playListContainer.append(li);
});



const audio = new Audio(playList);
let isPlay = false;
let playNum = 0;

function playAudio() {
    if (!isPlay) {
        // audio.src = "https://github.com/IuliiaPi/stage1-tasks/blob/momentum/assets/sounds/Aqua%20Caelestis.mp3?raw=true";
        // audio.src = "../assets/sounds/River Flows In You.mp3"
        audio.src = playList[playNum].src;
        audio.currentTime = 0;
        audio.play();
        isPlay = true;

        // if (audioTitle ===  playList[playNum].title) {
        //     playList[playNum].title.classList.add('item-active');
        // }

        // trackList[playNum].classList.add('item-active');
        // li.classList.add('item-active');
        // playList[playNum].title.classList.add('item-active');
        // playList[playNum].title.style.color = "red";
        // audioTitle.style.color = 'red';
    } else {
        audio.pause();
        isPlay = false;
        // trackList[playNum].classList.remove('item-active');
    }
    audioTitle.textContent = `${playList[playNum].title}`;  //
    trackDuration.textContent = `${playList[playNum].duration}`;  //
    // trackList[playNum].classList.toggle('item-active');
}
trackList[playNum].addEventListener('click', playAudio);

function toggleBtn() {
    btnPlay.classList.toggle('pause');
    playAudio();
}
btnPlay.addEventListener('click', toggleBtn);

function itemActive() {
    let playItem = document.querySelectorAll(".play-item");

    for (let i = 0; i < playItem.length; i++) {
        if (i === playNum) {
            playItem[i].classList.add("item-active");
        } else {
            playItem[i].classList.remove("item-active");
        }
    }
}

function getPlayNext() {
    isPlay = false;
    if (playNum === playList.length - 1) {
        playNum = 0;
    } else {
        playNum++;
    }
    btnPlay.classList.add('pause');
    playAudio();
}

btnPlayNext.addEventListener("click", getPlayNext, itemActive);

function getPlayPrev() {
    isPlay = false;
    if (playNum === 0) {
        playNum = playList.length - 1;
    } else {
        playNum--;
    }
    btnPlay.classList.add('pause');
    playAudio();
}

btnPlayPrev.addEventListener("click", getPlayPrev, itemActive);

audio.addEventListener('ended', getPlayNext);

function toggleBtnVolume() {
    if (volume.classList.toggle('mute')) {
        audio.volume = 0;
    } else {
        audio.volume = 0.5;
    }
}
volume.addEventListener('click', toggleBtnVolume);

// const volumeBar = document.querySelector('.volume-bar');

// volumeRange.addEventListener('click', e => {
//   const volumeBarWidth = volumeRange.offsetWidth;
//   const newVolume = e.offsetX / parseInt(volumeBarWidth);
//   audio.volume = newVolume;
//   volumeRange.style.width = (newVolume) * 100 + '%';
// });

function changeVolume() {
    audio.volume = volumeRange.value / 1;
}
volumeRange.addEventListener('change', changeVolume);


// ---------progress-bar--------

const progress = document.querySelector('.progress');
const timeline = document.querySelector('.timeline');

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`
    timeSong.textContent = `${getTimeCodeFromNum(currentTime)}/${playList[playNum].duration}`
}
// audio.addEventListener('timeupdate', updateProgress);

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}
// timeline.addEventListener('click', setProgress);
// audio.addEventListener('ended', nextTrack);

function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
        seconds % 60
    ).padStart(2, 0)}`;
}




// to-do list  ----------------------------------------------------------------

const btnToDo = document.querySelector('.btn__to-do');

const toDoPopup = document.querySelector('.to-do__popup');
const toDoInput = document.querySelector('.to-do__input');
const toDoBtnAdd = document.querySelector('.to-do__btn-add');
const toDoList = document.querySelector('.to-do__list');

toDoInput.placeholder = 'add your new task';

// toDoList.forEach(element => {
// const li = document.createElement('li');
// li.classList.add('to-do__input');
// toDoList.append(li);
// li.textContent = element.placeholder;
// });

btnToDo.addEventListener('click', () => {
    toDoPopup.classList.toggle('popup__to-do_activ');
});

window.addEventListener('click', (e) => {
    if (!toDoPopup.contains(e.target) && !btnToDo.contains(e.target)) {
        toDoPopup.classList.remove('popup__to-do_activ');
    }
});

toDoBtnAdd.addEventListener('click', () => {

    const li = document.createElement('li');
    li.classList.add('to-do__li');
    li.textContent = toDoInput.value;
    toDoList.append(li);

    const btns = document.createElement('span');
    btns.classList.add('btns');
    li.append(btns);
    const btnEdit = document.createElement('button');
    btnEdit.classList.add('btn__edit');
    btnEdit.textContent = '/';
    btns.append(btnEdit);
    const btnDelete = document.createElement('button');
    btnDelete.classList.add('btn__delete');
    btnDelete.textContent = 'X';
    btns.append(btnDelete);

    btnDelete.addEventListener('click', () => {
        li.classList.add('hidden');
    });
});

// toDoInput.placeholder = 'add your new task';

function setLocalStorageToDo() {
    localStorage.setItem('to-do__input', toDoInput.value);
}
window.addEventListener('beforeunload', setLocalStorageToDo);

function getLocalStorageToDo() {
    if (localStorage.getItem('to-do__input')) {
        toDoInput.value = localStorage.getItem('to-do__input');
    }
}
window.addEventListener('load', getLocalStorageToDo);


// settings__popup  --------------------------------------------------------------------------

const settingsBtn = document.querySelector('.settings__btn');
const settingsPopup = document.querySelector('.settings__popup');

settingsBtn.addEventListener('click', () => {
    settingsPopup.classList.toggle('popup__settings_activ');
    // settingsPopup.classList.add('_active');
});

window.addEventListener('click', (e) => {
    if (!settingsPopup.contains(e.target) && !settingsBtn.contains(e.target)) {
        settingsPopup.classList.remove('popup__settings_activ');
    }
});

// document.addEventListener('click', (e) => {
// const click = e.composedPath().includes(settingsPopup);
// if (!click) {
// settingsBtn.classList.remove('hidden');
// settingsPopup.classList.remove('_active');
// page.addEventListener("click", onPageClick);
// }
// });

// function onPageClick(e) {
//     if (settingsPopup.classList.contains('_active')) {
//         settingsBtn.classList.remove('hidden');
//         settingsPopup.classList.remove('_active');
//     }
// }


const blocks = document.querySelectorAll('.block');
const checkboxs = document.querySelectorAll('.checkbox');
const blockTitles = document.querySelectorAll('.block__title');

checkboxs.forEach((item, index) => {

    item.addEventListener('click', () => {

        // if (item.id === 'label-player') {
        //     player.classList.toggle('_no-checked');
        // }

        // if (item.id === 'label-weather') {
        //     weatherBlock.classList.toggle('_no-checked');
        // }

        // if (item.id === 'label-time') {
        //     time.classList.toggle('_no-checked');
        // }

        // if (item.id === 'label-date') {
        //     day.classList.toggle('_no-checked');
        // }

        // if (item.id === 'label-greeting') {
        //     greetingContainer.classList.toggle('_no-checked');
        // }

        // if (item.id === 'label-quote') {
        //     footerQuote.classList.toggle('_no-checked');
        // }

        // if (item.id === 'label-to-do-list') {
        //     btnToDo.classList.toggle('_no-checked');
        // }

        switch (item.id) {
            case 'checkbox-player':
                player.classList.toggle('_no-checked');
                break;
            case 'checkbox-weather':
                weatherBlock.classList.toggle('_no-checked');
                break;
            case 'checkbox-time':
                time.classList.toggle('_no-checked');
                break;
            case 'checkbox-date':
                day.classList.toggle('_no-checked');
                break;
            case 'checkbox-greeting':
                greetingContainer.classList.toggle('_no-checked');
                break;
            case 'checkbox-quote':
                footerQuote.classList.toggle('_no-checked');
                break;
            case 'checkbox-to-do-list':
                btnToDo.classList.toggle('_no-checked');
                break;
            default:
                alert("Error");
        }

    });

});


checkboxs.forEach((item, index) => {

    // if(!item.checked) {
    //     player.classList.add('_no-checked');  
    // } else {
    //     player.classList.add('_checked');  
    // }

});


// function setLocalStorageSettings() {
//     localStorage.setItem('block', label);
// }
// window.addEventListener('beforeunload', setLocalStorageSettings);

// function getLocalStorageSettings() {
//     if (localStorage.getItem('block')) {
//         label = localStorage.getItem('block');
//     }
// }
// window.addEventListener('load', getLocalStorageSettings);



// en/ua  --------------------------------------------------------------------------

const en = document.querySelector('.en');
// en.classList.add('current_lang');
const ua = document.querySelector('.ua');

// ua.addEventListener('click', () => {
// en.classList.remove('current_lang');
// ua.classList.add('current_lang');
// city.value = 'Київ';
// lang = 'ua';
// currentDate = date.toLocaleDateString('uk-UA', options);
// });

const state = {
    language: 'en',
    photoSource: 'github',
    blocks: ['time', 'date', 'greeting', 'quote', 'weather', 'audio', 'todolist']
}

let d;
const showGreetings = (lang = 'en') => {
    const TRANSLATION = {
        'en': 'Hello',
        'ru': 'Привет'
    }
    //   return '${TRANSLATION[lang]}';
    d = TRANSLATION[0];
    return d;
    console.log(d);
}
console.log(d);

const greetingTranslation = {
    'en': [
        ['Good night', 'Good morning', 'Good afternoon', 'Good evening'],
        ['[Enter your name]']
    ],
    'ua': [
        ['Доброї ночi', 'Доброго ранку', 'Доброго дня', 'Доброго вечора'],
        ['[Введiть ваше iм`я]']
    ],
    'ru': [
        ['Доброй ночи', 'Доброе утро', 'Добрый день', 'Добрый вечер'],
        ['Введите ваше имя]']
    ]
}
// greetings.textContent = "${greetingTranslation[lang][0][index]}, ";
// console.log(greetings.textContent);


const translation = {
    'greeting': {
        'en': {
            'morning': 'Good morning,',
            'afternoon': 'Good afternoon,',
            'evening': 'Good evening,',
            'night': 'Good night,',
            'placeholder': '[Enter Name]'
        },
        'ru': {
            'morning': 'Доброе утро,',
            'afternoon': 'Добрый день,',
            'evening': 'Добрый вечер,',
            'night': 'Доброй ночи,',
            'placeholder': '[Введите имя]'
        }
    },

    'weather': {
        'en': {
            'wind': 'Wind speed',
            'humidity': 'Humidity',
            'ms': 'm/s',
            'placeholder': '[Enter City]',
            'city': 'Minsk'
        },
        'ru': {
            'wind': 'Скорость ветра',
            'humidity': 'Влажность',
            'ms': 'м/с',
            'placeholder': '[Введите Город]',
            'city': 'Минск'
        }
    }
}