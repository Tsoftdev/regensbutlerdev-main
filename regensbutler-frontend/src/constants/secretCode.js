export const getRandomString = () => {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    var result = '';
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        if (i < 3)
            result += "-"
    }
    return result;
}