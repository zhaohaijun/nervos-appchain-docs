var common = {
    
    loadSidebar: true,
    autoHeader: true,
    subMaxLevel: 6,
    loadNavbar: true,
    basePath: './',
    
    // search: 'auto',

    // configuration for searching plugin
    search: {
        maxAge: 86400000, // expiration time in milliseconds, one day by default
        // paths: [
        // '/',
        // ], // or 'auto'

        // localization
        placeholder: {
            '/zh-CN/': '搜索',
            '/': 'Type to search',
        },


        // localization
        noData: {
            '/zh-CN/': '找不到结果',
            '/': 'No Results',
        },

        // depth of the maximum searching title levels
        depth: 6,
    },


}