import cheerio from 'cheerio';

export default class Mangachan {
    static searchUrl = 'do=search&subaction=search&story=';
    static baseUrl = 'http://mangachan.me/';
    static baseSearchUrl = 'http://mangachan.me/catalog';
    static baseSearchResults: mangaList;

    constructor() {
    }

    static Parse(body: string) {
        try {
            const $ = cheerio.load(body);
            const lol = $('.content_row');
            for (let i of lol.toArray()) {
                this.baseSearchResults.mangaList.push({
                    photo: i.children[1].children[1].children[0].attribs.src,
                    description: i.children[17].children[0].data,
                    name: i.children[3].children[1].children[3].children[0].children[0].data,
                    author: i.children[5].children[3].children[1].children[1].children[1].children[0].data,
                    status: (() => {
                        let arr = i.children[7].children[3].children[1].children;
                        let arrayBack = [];
                        for (let i of arr) {

                            try {
                                if (i.data !== undefined) {
                                    arrayBack.push(i.data);
                                }
                                else {
                                    const str1: string | undefined = i.children[0].children[0].data;
                                    const str2: string | undefined = i.children[1].data;
                                    const str3: string | undefined = str1 + str2;
                                    arrayBack.push(str3);
                                }
                            } catch (e) {
                            }
                        }
                        arrayBack.pop();
                        return arrayBack;
                    })(),
                    genre: (() => {
                        let arr = i.children[9].children[3].children[1].children[1].children;
                        let arrayBack = [];
                        for (let i of arr)
                            if (i.name === 'a')
                                arrayBack.push(i.children[0].data);
                        return arrayBack;
                    })(),
                    translators: (() => {
                        let arr = i.children[11].children[3].children[1].children[1].children;
                        let arrayBack = [];
                        for (let i of arr)
                            try {
                                if (i.name === 'a')
                                    arrayBack.push(i.children[0].data);
                            } catch (e) {
                            }
                        return arrayBack;
                    })(),
                });
            }
            return this.baseSearchResults;
        }catch (e) {
            return []
        }
    }

}