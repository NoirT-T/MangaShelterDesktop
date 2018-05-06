export default function mangaList(state = [], action: any) {
    switch (action.type) {
        case 'SET_MANGA_LIST':
            return action.payload;
        default:
            return state;
    }
}