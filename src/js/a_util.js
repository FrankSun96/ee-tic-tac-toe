let cookie = {
    set: function(key, val, time) {
        var date = new Date();
        var expiresDays = time;
        date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000);
        document.cookie = key + "=" + val + ";expires=" + date.toGMTString();
    },
    get: function(key) {
        var getCookie = document.cookie.replace(/[ ]/g, "");
        var arrCookie = getCookie.split(";")
        var tips;
        for (var i = 0; i < arrCookie.length; i++) {
            var arr = arrCookie[i].split("=");
            if (key == arr[0]) {
                tips = arr[1];
              break;
            }
        }
        return tips;
    },
    delete: function(key) { 
        var date = new Date(); 
        date.setTime(date.getTime() - 10000); 
        document.cookie = key + "=v; expires =" + date.toGMTString(); 
    }
}

const ajaxPromise = param => {
        return new Promise((resovle, reject) => {
            $.ajax({
                "type": param.type || "post",
                "async": param.async || true,
                "url": param.url,
                "data": param.data || "",
                "success": res => {
                    resovle(res);
                },
                "error": err => {
                    reject(err);
                }
            })
        })
    }
