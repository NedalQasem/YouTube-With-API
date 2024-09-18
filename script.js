const videoCardContainer = document.querySelector('.video-container');

let api_key = "AIzaSyAooE2U0hrtyCYHNyuY3R8a6F4gpYcxIS0";
//after http link we add ? ...
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?"

//use fetch function to make request 
//URLSearchParams to add parameter after the link
//part param to snippet so , w'll get video related data 
//set chart param to most poplure , to fetch popular videos
//maxresult: is should be maxResult with "s" , set this to 1 for now , so we can uundertand the data structure esaily 
//region code is to specify from which region we are fetching data 

fetch (video_http + new URLSearchParams({
 key: api_key, 
 part:'snippet',
 chart: 'mostPopular',
 maxResults:103,
 regioncode: 'JO'
}))
.then(res => res.json())
.then(data => {
    //console.log(data)
//IF YOU notice the data, we have everything but we don't have channel icon image for this we want to fetch channel icon seperately
    data.items.forEach(item =>{
        getChannelIcon(item);
    })
})
//use catch block to handle error also 
.catch(err => console.log(err))

//create getChannelIcon function to fetch channel icon seperately 
const getChannelIcon = (video_data) => {
//use fetch founction again 
fetch (channel_http + new URLSearchParams ({
   key:api_key,
   part:'snippet',
   id: video_data.snippet.channelId
}))
.then(res => res.json())
.then(data => {
   //console.log(data);
   //add channel icon url to our video data. now we just have to create card
    video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
    makeVideoCard(video_data);
})
}

const makeVideoCard = (data) => {
    //use innerhtml method to attach HTML Elemnt 
    videoCardContainer.innerHTML += `
                    <div class="video" onclick="location.href =' https://youtube.com/watch?v=${data.id}'">
                        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
                          <div class="content">
                            <img src="${data.channelThumbnail}" class="channel-icon" alt="">
                              <div class="info">
                                <h4 class="title">${data.snippet.title}</h4>
                                <p class="channel-name">${data.snippet.channelTitle}</p>
                              </div>
                            </div>
                            <div class="dots"><i class='bx bx-dots-vertical-rounded'></i></div>
                          </div>
                    </div>
    `;
}


//search bar 

const searchInput = document.querySelector('.search-bar');
const searchBtn= document.querySelector('.search-btn');
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click' , () => {
    if(searchInput.value.length){
        location.herf = searchLink + searchInput.value;
    }
})