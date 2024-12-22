let btn = document.querySelector("#btn");
let tell = document.querySelector("#tell");


// Replace with your YouTube API Key
const YOUTUBE_API_KEY = "AIzaSyDGOpeJOHVVPL9oGiSPeUKu3UZ_a29Hf7M";
// Replace with your Google Custom Search API key and search engine ID
const GOOGLE_API_KEY = "AIzaSyDtz7Ezd-iZD-QKw1BQBIQWkG_1suPnt9o";
const GOOGLE_CX = "87de11f0eaedf4033";

// Store user queries
let commandHistory = [];

// Function to handle text-to-speech
/*const speakFunc = (input) => {
    let speakInput = new SpeechSynthesisUtterance(input);

    // Set the language and accent (British English)
    //speakInput.lang = 'en-GB';

    Set the language and accent (Indian English)
    speakInput.lang = 'en-IN';

    // Set the language and accent (Standard hindi)
    speakInput.lang = 'hi-GB';

    // Set other optional properties
    speakInput.pitch = 1; // Normal pitch
    speakInput.rate = 1;  // Normal speed
    speakInput.volume = 1; // Full volume

    window.speechSynthesis.speak(speakInput);
};*/

const speakFunc = (text, lang = 'en-GB') => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
};


// Greeting on page load
window.onload = () => {
    greetingFunc();
};

const greetingFunc = () => {
    let date = new Date();
    let hour = date.getHours();
    if (hour >= 0 && hour < 12) {
        speakFunc("Good morning, How can I help you!");
    } else if (hour >= 12 && hour < 16) {
        speakFunc("Good afternoon , How can I help you!");
    } else {
        speakFunc("Good evening , How can I help you!");
    }
};

// Start voice input
const startVoiceInput = () => {
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
        let recognition = new SpeechRecognition();
        recognition.lang = 'en-IN';
        recognition.onresult = (e) => {
            let spokenText = e.results[0][0].transcript;
            handleCommands(spokenText.toLowerCase());
        };
        recognition.start();
    } else {
        alert("Your browser does not support voice input!");
    }
};

// mic button work on click
btn.onclick = () => {
    btn.style.display = "none"
    tell.style.display = "block"
    startVoiceInput();

};

// Handle user commands
const handleCommands = (command) => {
    commandHistory.push(command);
    console.log("Command History:", commandHistory);
    btn.style.display = "flex"
    tell.style.display = "none"

    if (
        command.includes("hello") ||
        command.includes("hello mini") ||
        command.includes("hey") ||
        command.includes("hey mini") ||
        command.includes("hi") ||
        command.includes("hi mini")
    ) {
        speakFunc("Hello ... How can I help you!");

       /* // Restart voice recognition after greeting
        setTimeout(() => {
            startVoiceInput();
        }, 1000); // Small delay to ensure the greeting is  */
    }

    else if (
        command.includes("what is your name") ||
        command.includes("hey whatsup what's your name") ||
        command.includes("tell me your name") ||
        command.includes("your name please") ||
        command.includes("what's your name")
    ) {
        speakFunc("My name is mini, and I am a virtual assistant.");

    }
    else if (
        command.includes("hey whatsup")
    ) {
        speakFunc("i am fine, how are you");

        // Restart voice recognition for more commands
        setTimeout(() => {
            startVoiceInput();
        }, 2000);
    }

    else if (
        command.includes("who are you") ||
        command.includes("hu r you") ||
        command.includes("hello mini who are you") ||
        command.includes("hi mini who are you") ||
        command.includes("hey mini who are you") ||
        command.includes("who developed you") ||
        command.includes("who made you")
    ) {
        speakFunc("I am mini, and i am a virtual assistant Created by Mr. Khan.");

        // Restart voice recognition for more commands
        setTimeout(() => {
            startVoiceInput();
        }, 2000);
    }

    else if (
        command.includes("who is your father") ||
        command.includes("mini who is your father") ||
        command.includes("mini hu is your father") ||
        command.includes("hu is your father")
    ) {
        speakFunc("Father is creater of something, and my father is Mr. Khan, because he created me ")
    }

    else if (
        command.includes("who is your mother") ||
        command.includes("mini who is your mother") ||
        command.includes("mini hu is your mother") ||
        command.includes("hu is your mother")
    ) {
        speakFunc("Necessity is the mother of invention , your are the purpose of my creation , so that's why u can be consider as my mother")
    }

    else if (command.includes("who are you")) {
        speakFunc("i am a virtual assistant");
    }


    else if (
        command.includes("how r u") ||
        command.includes("hello mini how r u") ||
        command.includes("good evening how r u") ||
        command.includes("how are you") ||
        command.includes("good evening how are you") ||
        command.includes("what about you") ||
        command.includes("how are you feeling")
    ) {
        speakFunc("I am fine doing good what about u?");

        // Restart voice recognition for more commands
        setTimeout(() => {
            startVoiceInput();
        }, 2000);
    }

    else if (
        command.includes("open chat gpt")
    ) {
        speakFunc("Opening ChatGPT for you.");
        window.open("https://www.chatgpt.com", "_blank");
    }

    else if (
        command.includes("search on Chat gpt") ||
        command.includes("search on Chat gpt about") ||
        command.includes("open Chat gpt and tell me about") ||
        command.includes("open Chat gpt and search for")
    ) {
        const query = command
            .replace("search on Chat gpt", "")
            .replace("search on Chat gpt about", "")
            .replace("open Chat gpt and tell me about", "")
            .replace("open Chat gpt and search for", "").trim();

        if (query) {
            speakFunc(`Searching for ${query} on Chat GPT`);
            searchGoogle(query);
        } else {
            speakFunc("Please specify a query to search on Chat GPT.");
        }
    }

    else if (
        command.includes("tell me date") ||
        command.includes("what is date today") ||
        command.includes("tell me today's date") ||
        command.includes("date")
    ) {
        let date = new Date().toLocaleString(undefined, { day: 'numeric', month: 'long' });
        //speakFunc(`Today's date is ${date}.`);
        speakFunc(date);
    }

    else if (
        command.includes("tell me time") ||
        command.includes("tell me the time") ||
        command.includes("what is time") ||
        command.includes("time please") ||
        command.includes("time")
    ) {
        let time = new Date().toLocaleString(undefined, { hour: 'numeric', minute: 'numeric' });
        speakFunc(time);
    }

    // system application opening code

    else if (
        command.includes("open calculator") ||
        command.includes("calculator")
    ) {
        speakFunc("Opening... calculator for you.");
        window.open("calculator://");
    }

    // youtube play codes

    else if (
        command.includes("play") ||
        command.includes("open youtube and play") ||
        command.includes("start youtube and play") ||
        command.includes("search on youtube about") ||
        command.includes("can you play") ||
        command.includes("play any songs") ||
        command.includes("play any song") ||
        command.includes("open youtube") ||
        command.includes(" on youtube")
    ) {
        const songName = command
            .replace("play", "")
            .replace("open youtube and play", "")
            .replace("start youtube and play", "")
            .replace("search on youtube about", "")
            .replace("can you play", "")
            .replace("play any songs", "")
            .replace("play any song", "")
            .replace("open youtube", "")
            .replace("on youtube", "").trim();

        if (songName.length > 0) {
            speakFunc(`Playing ${songName} on YouTube.`);
            playYouTubeSong(songName);
        } else {
            speakFunc("Please specify a song to play on YouTube.");
        }
    }

    else if (command.includes("open youtube")) {
        speakFunc("Opening YouTube for you.");
        window.open("https://www.youtube.com", "_blank");
    }

    // google search codes
    else if (command.includes("open google")) {
        speakFunc("Opening Google for you.");
        window.open("https://www.google.com", "_blank");
    }

    else if (
        command.includes("search on google") ||
        command.includes("google search for") ||
        command.includes("open google and search") ||
        command.includes("tell me about") ||
        command.includes("do you know about") ||
        command.includes("what is the full form of ") ||
        command.includes("tell me the full form of") ||
        command.includes("tell me full form of") ||
        command.includes("mini do you know about")
    ) {
        const query = command
            .replace("search on google", "")
            .replace("google search for", "")
            .replace("open google and search", "")
            .replace("tell me about", "")
            .replace("what is the", "")
            .replace("tell me the ", "")
            .replace("do you know about", "").trim();

        if (query) {
            speakFunc(`Searching for ${query}`);
            searchGoogle(query);
        } else {
            speakFunc("Please specify a query to search on google.");
        }
    }

    else if (
        command.includes("Stop")
    ) {
        window.speechSynthesis.cancel();
        speakFunc("Sorry for the inconvenience.");
    }

    // Add more predefined commands as needed
    // ...

    /*else if (command.trim().length > 0) {
        speakFunc("Sorry, I did not hear you properly. Please repeat it again.");
        // Optionally restart voice input
        setTimeout(() => {
            startVoiceInput();
        }, 2000);
    }*/

    //online shop work commands 

    else if (
        command.includes("open aadhar pdf")
    ) {
        speakFunc("Opening... aadhar pdf");
        window.open("https://www.tndsc.co.in/downloads/2.pdf");
    }


    else {
        speakFunc(`This is what I found on the internet about${command}`);
        window.open(`https://www.google.com/search?q=${encodeURIComponent(command)}`, "_blank");
    }
};

// Play song on YouTube
const playYouTubeSong = (songName) => {
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(songName)}&type=video&key=${YOUTUBE_API_KEY}&maxResults=1`;

    fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                const videoId = data.items[0].id.videoId;
                const videoUrl = `https://www.youtube.com/watch?v=${videoId}&autoplay=1`;
                window.open(videoUrl, "_blank");
            } else {
                speakFunc("Sorry, I couldn't find the song on YouTube.");
            }
        })
        .catch(error => {
            console.error("Error fetching YouTube data:", error);
            speakFunc("There was an error fetching the song. Please try again later.");
        });
};


// Perform Google search
const searchGoogle = (query) => {
    const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&q=${encodeURIComponent(query)}`;

    fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                const topResults = data.items.slice(0, 3).map(item => item.title).join(", ");
                speakFunc(`Here are the results: ${topResults}`);

                const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
                window.open(googleSearchUrl, "_blank");
            } else {
                speakFunc("Sorry, I couldn't find anything related to your query.");
            }
        })
        .catch(error => {
            console.error("Error fetching Google search results:", error);
            speakFunc("There was an error fetching the results. Please try again later.");
        });
};