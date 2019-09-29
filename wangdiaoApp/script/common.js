function openMyToolFrame() {
    $api.addEvt($api.dom('.search-person'), 'click', function () {
        api.openFrame({
            name: 'frm_tools',
            url: './frm_tools.html',
            rect: {
                x: api.winWidth - 300,
                y: api.winHeight - api.frameHeight + 20,
                w: 300,
                h: api.frameHeight
            },
            progress: {
                type: "default",
                title: "",
                text: "正在加载数据"
            },
            animation: {
                type: "flip",
                subType: "from_bottom"
            },
            vScrollBarEnabled: true,
            hScrollBarEnabled: false
        });
    });
}

/*
 * 统一请求处理方法，后续可能会涉及到如果token失效要跳转到登录页面的操作
 * 该js需要放到apiready方法之后
 * 如果isLoading=true,success方法中需要自己使用api.hideProgress方法，进行关闭遮罩,主要是ajax多次调用时遮罩一直可以保持
 */
var common = {
    "loginInvalid": false,
    "notNull": function (val) {
        return val || "";
    },
    "sortAsc": function (x, y) {
        if (x < y) {
            return -1;
        } else if (x > y) {
            return 1;
        } else {
            return 0;
        }
    },
    "beginTransSync": function (db) {
        db.transactionSync({
            name: cmcdb.name,
            operation: 'begin'
        }, function (ret, err) {
            if (ret.status) {
            } else {
                alert(JSON.stringify(err));
            }
        });
    },
    "commitTransSync": function (db) {
        db.transactionSync({
            name: cmcdb.name,
            operation: 'commit'
        }, function (ret, err) {
            if (ret.status) {
            } else {
                alert(JSON.stringify(err));
            }
        });
    },
    "rollbackTransSync": function (db) {
        db.transactionSync({
            name: cmcdb.name,
            operation: 'rollback'
        }, function (ret, err) {
            if (ret.status) {
            } else {
                alert(JSON.stringify(err));
            }
        });
    },
    "post": function (param) {
        console.log( param.url)
        if (param.isLoading || false) {
            api.showProgress({
                title: param.title || '',
                text: param.text || '努力加载中...'
            });
        }
        var timeout = 10
        if (param.timeout) {
            timeout = param.timeout
        }
        api.ajax({
            url: param.url,
            method: 'post',
            timeout: timeout,
            headers: {
                "Content-Type": "application/json"
            }
        }, function (ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
            param.success(ret);
            // param.fail(err);
        });
    }
}