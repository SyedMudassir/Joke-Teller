const button = document.getElementById('button');
const audio = document.getElementById('audio');
let joke = '';

// Toggle Button Enable/Disable
function toggleButton(){
    button.disabled = !button.disabled;
}

// Converting Text joke into Speech(Audio)
function jokeTextToSpeech(joke){
    VoiceRSS.speech({
        key: '8b7336b6a8214e1e8a2c40a7b0986ac5',
        src: joke,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false,
      });
} 

//  Getting jokes by Api
async function getJokes() {
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {
        response = await fetch(apiUrl);
        data = await response.json();
        if (joke = data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        }
        else {
            joke = data.joke;
        }
        jokeTextToSpeech(joke);
        toggleButton();
    }
    catch (error) {
        console.log(error);
    }
}
// Event Listner
button.addEventListener('click',getJokes);
audio.addEventListener('ended',toggleButton);