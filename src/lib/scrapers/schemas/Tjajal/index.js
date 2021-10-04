const Tjajal = {
    bulletin: {
        listItem: "table tbody tr",
        data: {
            agreementDate: 'td:nth-child(1)',
            publicationDate: 'td:nth-child(2)',
            room: 'td:nth-child(3)',
            record:'td:nth-child(4)',
            plaintiff:'td:nth-child(5)',
            defendant:'td:nth-child(6)',
            thirdParty:'td:nth-child(7)',
            rawContent:'td:nth-child(8)' ,
            viewMoreUrl:{
                selector:'td:nth-child(8) a',
                attr: "href"
            },
        }
    },
    numberOfPages: {
        selector: 'table + div',
    },
    pages: {
        listItem: '.page-item',
        data: {
            value: '.page-link',
            link:{
                selector:'.page-link',
                attr: "href"
            },

        }
    }
}
module.exports = {
    Tjajal
};