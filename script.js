import { TV_SHOWS } from "./constants.js";
// Declaring global variables
const showList = document.getElementById("show_list");
const seasons = document.getElementsByClassName("seasons");

for (let i = 0; i < TV_SHOWS.length; i++) {
    const showDetails = TV_SHOWS[i];
    const show = `
        <div class="show">
            <div class="show_left">
                <img class="show_img" src="${showDetails.image}" />
                <select name="seasons" class="seasons">
                    <option value="none" selected="true" disabled>Season</option>
                </select>
            </div>
            <div class="show_content">
                <div class="show_head">
                    ${showDetails.name}
                </div>
                <a href="/" class="show_premier">
                    Premiered at ${showDetails.channel} on ${showDetails.premiered} (${showDetails.status})
                </a>
                <div class="show_description">
                    ${showDetails.summary}
                </div>
                <div class="show_genres">
                    <div class="genres_head">Genres:</div>
                </div>
                <div class="episodes">
                
                </div>
            </div>
        </div>
    `;

    showList.insertAdjacentHTML('beforeend', show);
}

for (let i = 0; i < TV_SHOWS.length; i++) {
    for (let j = 0; j < TV_SHOWS[i].genres.length; j++) {
        const genre = `
            <div class="genres">${TV_SHOWS[i].genres[j]}</div>
        `

        const showGenres = document.getElementsByClassName("show_genres")[i];

        showGenres.insertAdjacentHTML('beforeend', genre);
    }
}

for (let i = 0; i < TV_SHOWS.length; i++) {
    for (let j = 0; j < TV_SHOWS[i].seasons.length; j++) {
        const option = `
            <option class="" value="${j}">Season ${j + 1}</option>
        `

        const seasons = document.getElementsByClassName("seasons")[i];

        seasons.insertAdjacentHTML('beforeend', option);
    }
}

function calcSeasonAndEpi(seasonIdx, episodeIdx) {
    var res = "";
    if(seasonIdx < 9) {
        res+="S"+"0"+(seasonIdx+1);
    } else {
        res+="S"+(seasonIdx+1);
    }

    if(episodeIdx < 9) {
        res+="E"+"0"+(episodeIdx+1);
    } else {
        res+="E"+(episodeIdx+1);
    }

    return res;
}

for (let i = 0; i < seasons.length; i++) {
    seasons[i].addEventListener('change', ((event) => {
        const seasonIdx = parseInt(event.target.value.trim());

        const episodesAppend = document.getElementsByClassName("episodes")[i];
        if(episodesAppend.children.length > 0) {
            while (episodesAppend.firstChild) {
                episodesAppend.removeChild(episodesAppend.lastChild);
            }
        } 

        const seasonItem = `
            <div class="season_title">
                Season ${seasonIdx+1}
            </div>
            <div class="marcar_todo">
                <input type="checkbox" name="show${seasonIdx+1}" value="show${seasonIdx+1}">
                <label class="marcar_todo_text" for="show${seasonIdx+1}">Marcar Todo</label>
            </div>
        `
        
        episodesAppend.insertAdjacentHTML('beforeend', seasonItem);

        const episodes = TV_SHOWS[i].seasons[seasonIdx];

        for(let j=0; j<episodes.length; j++) {
            const episode = `
                <div class="episode">
                    <img class="episode_img" src="${episodes[j].image}" />
                    <div class="episode_content">
                        <input type="checkbox" name="${episodes[j].number}" value="${episodes[j].number}">
                        <label class="episode_heading" for="${episodes[j].number}">${calcSeasonAndEpi(seasonIdx, j)}: ${episodes[j].name}</label>
                        <div class="episode_date">
                            ${episodes[j].airdate}
                        </div>
                        <div class="episode_description">
                            ${episodes[j].summary}
                        </div>
                    </div>
                </div>
            `

            episodesAppend.insertAdjacentHTML('beforeend', episode);
        }
    }))
}