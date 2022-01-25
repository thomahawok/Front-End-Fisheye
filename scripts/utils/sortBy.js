function sortByOption(mediasId, getOption) {
    switch (getOption) {
        case "popularity":
            return mediasId.sort((a, b) => {
                return b.likes - a.likes;
            });
                
        case "title":
            return mediasId.sort((a, b) => a.title.localeCompare(b.title));
              
        default:
            mediasId.sort((a, b) => {
                return b.likes - a.likes;
            });
    }
}