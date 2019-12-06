export const hanldeUrlPretty = (url) => {
    url = url.toLowerCase();
    url = url.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    url = url.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    url = url.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    url = url.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    url = url.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    url = url.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    url = url.replace(/đ/g, "d");
    url = url.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
    url = url.replace(/\u02C6|\u0306|\u031B/g, "");

    const hanldeUrl = url.split(" ");

    const rs = hanldeUrl.join("-");

    return rs;
};