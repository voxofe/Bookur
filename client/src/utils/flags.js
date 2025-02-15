const getFlagImage = (countryCode) => {
    try {
        return require(`../assets/images/flags/${countryCode.toLowerCase()}.svg`);
    } catch (error) {
        console.error(`Flag for country code "${countryCode}" not found.`);
        return null;
    }
};

export const languageFlags = {
    uk: getFlagImage("uk"),
    ireland: getFlagImage("ireland"),
    russia: getFlagImage("russia"),
    france: getFlagImage("france"),
    germany: getFlagImage("germany"),
    austria: getFlagImage("austria"),
    netherlands: getFlagImage("netherlands"),
    czechia: getFlagImage("czechia"),
    greece: getFlagImage("greece"),
    italy: getFlagImage("italy"),
    spain: getFlagImage("spain"),
    usa: getFlagImage("usa"),
    canada: getFlagImage("canada"),
    colombia: getFlagImage("colombia"),
    brazil: getFlagImage("brazil"),
    australia: getFlagImage("australia"),
    japan: getFlagImage("japan"),
    nigeria: getFlagImage("nigeria"),
};