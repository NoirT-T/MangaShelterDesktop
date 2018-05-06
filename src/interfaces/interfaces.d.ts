interface mangaList{
    mangaList:Array<{
        photo: string,
        name: string,
        status: Array<string>,
        author: string,
        description: string | undefined | any,
        genre: Array<string>,
        translators: Array<string>
    }>
}