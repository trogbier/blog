const contentfulManagement = require("contentful-management")

module.exports = function () {
    const contentfulClient = contentfulManagement.createClient({
        accessToken: 'CFPAT-HzrQSCDssCORNotEizXPymbv7dp4nS7jfGUHFzTKHWc',
    })

    return contentfulClient
        .getSpace('4twfyxn0h4ow')
        .then(space => space.getEnvironment('master'))
}
