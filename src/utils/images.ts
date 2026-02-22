export const getSportImage = (sport: string) => {
    switch (sport) {
        case 'football':
            return '/images/football.png';
        case 'basketball':
            return '/images/basketball.png';
        case 'tennis':
            return '/images/tennis.png'
        default:
            return '/images/football.png';
    }
}