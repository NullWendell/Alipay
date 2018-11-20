/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-11-19 14:08:27 
 * @version: 0.0.1
 * @Description: 支付宝小程序 API  封装
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-11-20 14:22:22
 */
/****************************************************
 *                                                  *
 *                 微信小程序 API                    *
 *                                                  *
 ***************************************************/

module.exports = {
    /** 
     * @param 网络请求 超时时间，单位ms，默认30000 以及设置请求的 HTTP 头，默认 {'Content-Type': 'application/x-www-form-urlencoded'} 如需请修改 
     * @method post 向指定服务器发起一个跨域 http 请求 HTTP 请求方法 默认get
     * @param String  url 目标服务器url 相对地址或者http/https开头完整地址 如果为相对地址 请在全局app.js里面添加 示列 apiUrl: 'https://restapi.amap.com/v3/',
     * @param String  method 请求 HTTP 请求方法 默认get 其他具体请参考小程序官方文档
     * @param String  req 请求参数
     * @param 成功失败都返回一个对象 具体参考小程序官方文档
     */
    post (url,method,req){
        const app = getApp();
        let [api,meth] = ['','GET'];
        if(url.indexOf('http') == 0){
           api = url;
        }else{
            api = app.apiUrl + url;
        }
        //请求方法
        if(method){
            met = method;
        }
        return new Promise(function(resolve){
            // that.showLoading();
            wx.request({
                url: api,
                method: meth,
                data: req,
                dataType: 'json',
                complete: res =>{
                    resolve(res);
                   // that.hideLoading();
                }
            });
        });
    },
     /** 
     * 
     * 只上传图片base64
     * @method upImg base64图片 字段为img 如需请修改
     * @param {string} String url 接口地址
     * @param {string} String src 上传图片路径
     * @param {Object} Object  data 需要上传的数据
     * @param 成功失败都返回一个对象 具体参考小程序文档
     */
    upImg(url, src, data) {
        const app = getApp();
        let [FSM,req] = [wx.getFileSystemManager(),''];
        let api;
        if(url.indexOf('http') == 0){
           api = url;
        }else{
            api = app.apiUrl + url;
        }
        return new Promise(function(resolve){
             //图片转base64
            FSM.readFile({
                filePath: src,
                encoding: "base64",
                success: function (base) {
                    wx.request({
                        url: api,
                        method: 'POST',
                        data: Object.assign(data,{img: 'data:image/png;base64,'+ base.data}),
                        dataType: 'json',
                        complete: res =>{
                            resolve(res);
                           // that.hideLoading();
                        }
                    });
                }
            });
        });
    },
    /** 
     * 
     * 上传图片 二进制 文件流 服务的通过img字段可以获取
     * @method upload 默认上传图片，如需其他请修改  文件名，即对应的 key,为img
     * @param {string} String url 接口地址
     * @param {string} String src 上传图片路径
     * @param {Object} Object  data 需要上传的额外数据
     * @param 成功失败都返回一个对象 具体参考小程序文档
     */
    upload(url, src, data) {
        const app = getApp();
        let api;
        if(url.indexOf('http') == 0){
           api = url;
        }else{
            api = app.apiUrl + url;
        }
        return new Promise((resolve) => {
            wx.uploadFile({
                url: api, // 开发者服务器地址
                filePath: src, // 要上传文件资源的本地定位符
                fileName: 'img', // 文件名，即对应的 key, 开发者在服务器端通过这个 key 可以获取到文件二进制内容
                formData: data,
                header: {
                    'Content-Type': 'multipart/form-data'
                },
                fileType: 'image', //文件类型，image,video,audio
                complete: res =>{
                    resolve(res)
                } 
            });
        })
    },
    /** 
     * @param 界面交互反馈  配合hideLoading使用
     * @method showLoading  显示加载提示 如果在此时间之前调用了hideLoading 则不会显示
     * @param String 必填text 提示的文字内容 具体参考小程序文档 https://developers.weixin.qq.com/minigame/dev/api/ui/interaction/wx.showModal.html
     */
    showLoading (text){
        return wx.showLoading({title: text});
    },
    /** 
     * @param 界面交互反馈 
     * @method showLoading  隐藏加载提示 配合showloading使用
     * @param String 必填text 提示的文字内容 具体参考小程序文档 https://developers.weixin.qq.com/minigame/dev/api/ui/interaction/wx.showModal.html
     */
    hideLoading (){
        return wx.hideLoading();
    },
     /** 
     * @param 交互反馈  若需自定义图标的本地路径请修改 image 的优先级高于 icon
     * @method showToast  显示一个弱提示 默认3s之后消失如不符合请修改
     * @param String 必填type 展示相应图标支持 success显示成功图标，此时 title 文本最多显示 7 个汉字长度,loading显示加载图标，此时 title 文本最多显示 7 个汉字长度,none’。
     * @param String 必填text 提示的文字内容 具体参考小程序文档 https://developers.weixin.qq.com/minigame/dev/api/ui/interaction/wx.showModal.html
     */
    showToast (type,text){
        return wx.showToast({type: type,title: text,mask: true,duration: 3000,});
    },
    /** 
     * @param 交互反馈  
     * @method showModal  确认框  title默认为 “温馨提示” 如不符合请修改 true 为确定，false为取消
     * @param String 必填text showModal框的内容
     * @param Object bol 是否显示取消按钮
     * @param  确认按钮文字，默认‘确定，取消’ 如不符合请修改 具体参考小程序文档https://developers.weixin.qq.com/minigame/dev/api/ui/interaction/wx.showModal.html
     */
    showModal (text,bol){
        return new Promise(function(resolve){
            wx.showModal({
                title: '温馨提示',
                showCancel: bol,
                content: text,
                confirmText: '确定',
                cancelText: '取消',
                complete: res =>{
                    resolve(res.cancel)
                }
            });
        })
    },
    /** 
     * @param 交互反馈  成功返回说组索引，失败返回false
     * @method showActionSheet  显示操作菜单
     * @param Array arry 菜单按钮文字数组,数组长度最大为 6示列['菜单一', '菜单二', '菜单三', '菜单四', '菜单五'],  
     * 如不符合请修改 具体参考小程序文档https://developers.weixin.qq.com/minigame/dev/api/ui/interaction/wx.showModal.html
     */
    showActionSheet (arry){
        return new Promise(function(resolve){
            wx.showActionSheet({
                itemList: arry,
                success: res =>{
                    resolve(res.tapIndex)
                },
                fail: res =>{
                    resolve(false)
                }
            });
        });
    },
     /** 
     * @param 交互反馈 动态设置通过右上角按钮拉起的菜单的样式
     * @method setMenuStyle  动态设置通过右上角按钮拉起的菜单的样式
     * @param String type 样式风格 light浅色dark深色
     */
    setMenuStyle (type){
        return wx.setMenuStyle({type: type,});
    },
    /** 
     * @param 导航栏 navigateTo
     * @method navigateTo 保留当前页面，跳转到应用内的某个指定页面，可以使用 navigateBack 返回到原来页面。
     * @param string url 必填 需要跳转的应用内非 tabBar 的目标页面路径 ,路径后可以带参数
     * @param 注意：页面最大深度为10，即可连续调用 10 次 navigateTo
     */
    navigateTo (url){
        return wx.navigateTo({url: url});
     },
      /** 
     * @param 导航栏 navigateBack
     * @method navigateBack 关闭当前页面，返回上一级或多级页面。可通过  getCurrentPages() 获取当前的页面栈信息，决定需要返回几层。
     * @param Number num  必填 返回的页面数，如果 delta 大于现有打开的页面数，则返回到首页
     */
    navigateBack (num){
        return wx.navigateBack({delta: num});
     },
     /** 
     * @param 导航栏 redirectTo
     * @method redirectTo 关闭当前页面，跳转到应用内的某个指定页面。
     * @param string url 必填 需要跳转的应用内非 tabBar 的目标页面路径 ,路径后可以带参数
     */
    redirectTo (url){
        return wx.redirectTo({url: url});
    },
    /** 
     * @param 导航栏 reLaunch
     * @method reLaunch 关闭当前所有页面，跳转到应用内的某个指定页面。
     * @param 基础库 1.4.0+ & 支付宝客户端 10.1.8+ 支持
     * @param string url 必填 需要跳转的应用内非 tabBar 的目标页面路径 ,路径后可以带参数
     */
    reLaunch (url){
        return wx.reLaunch({url: url});
    },
    /** 
     * @param 系统信息 
     * @method getSystemInfoSync 获取系统信息
     * @param 成功失败都返回一个对象 具体参考小程序官方文档
     */
    getSystemInfoSync (){
        return wx.getSystemInfoSync()
    },
    /** 
     * @param 获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限。 
     * @method getSetting 
     * @param 成功失败都返回一个对象 具体参考小程序官方文档
     */
    getSetting (){
        return new Promise(function(resolve){
            wx.getSetting({
                complete: res =>{
                    resolve(res)
                }
            })
        });
    },
    /** 
     * @param 提前发起授权请求
     * @method authorize 
     * @param String scope 授权类型 具体参考https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html
     * @param 若授权成功返回true 失败返回false
     */
    authorize (scope){
        return new Promise(function(resolve){
            wx.authorize({
                scope: scope,
                complete: res =>{
                    if(res.errMsg == 'authorize:ok'){
                        resolve(true)
                    }else{
                        resolve(false)
                    }
                }
            })
        });
    },
    /** 
     * @param 调用接口获取登录凭证（code）。通过凭证进而换取用户登录态信息，包括用户的唯一标识（openid）及本次登录的会话密钥（session_key）等。
     * @method login 具体参考https://developers.weixin.qq.com/minigame/dev/api/open-api/login/wx.login.html
     * @param 若授权成功返回登录凭证（code） 失败返回false
     */
    login (){
        return new Promise(function(resolve){
            wx.login({
                timeout: 30000,
                complete: res =>{
                    if(res.code){
                        resolve(res.code)
                    }else{
                        resolve(false)
                    }
                }
            })
        });
    },
    /** 
     * @param 打开地图选择位置。 再次之前请先调用authorize('scope.userLocation')
     * @method chooseLocation https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.chooseLocation.html
     * @param 若成功返回一个对象 失败返回false
     */
    chooseLocation (){
        return new Promise(function(resolve){
            wx.chooseLocation({
                timeout: 30000,
                complete: res =>{
                    if(res.errMsg == 'chooseLocation:ok'){
                        resolve(res)
                    }else{
                        resolve(false)
                    }
                }
            })
        });
    },
    /** 
     * @param 获取当前的地理位置、速度。当用户离开小程序后，此接口无法调用，若需要高精确度请修改 再次之前请先调用authorize('scope.userLocation')
     * @method chooseLocation https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.getLocation.html
     * @param 成功失败都将返回一个对象
     */
    getLocation (){
        return new Promise(function(resolve){
            wx.getLocation({
                timeout: 30000,
                complete: res =>{
                    resolve(res)
                }
            })
        });
    },
    /** 
     * @param ​使用微信内置地图查看位置。再次之前请先调用authorize('scope.userLocation')
     * @method openLocation https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.openLocation.html
     * @param 成功失败都将返回一个对象
     */
    openLocation (){
        return new Promise(function(resolve){
            wx.openLocation({
                complete: res =>{
                    resolve(res)
                }
            })
        });
    },
    /** 
     * @param ​获取用户收货地址。调起用户编辑收货地址原生界面，并在编辑完成后返回用户选择的地址。再次之前请先调用authorize('scope.address')
     * @method chooseAddress https://developers.weixin.qq.com/miniprogram/dev/api/open-api/address/wx.chooseAddress.html
     * @param 成功返回一个对象 失败返回 false
     */
    chooseAddress (){
        return new Promise(function(resolve){
            wx.chooseAddress({
                complete: res =>{
                    if(res.errMsg == 'chooseAddress:ok'){
                        resolve(res)
                    }else{
                        resolve(false)
                    }
                }
            })
        });
    },
    /** 
     * @param获取用户过去三十天微信运动步数。需要先调用login 接口。步数信息会在用户主动进入小程序时更新。再次之前请先调用authorize('scope.werun')
     * @method getWeRunData 请将获取的数据发送后端进行解密 https://developers.weixin.qq.com/miniprogram/dev/api/open-api/werun/wx.getWeRunData.html
     * @param 成功返回一个对象 失败返回 false
     */
    getWeRunData (){
        return new Promise(function(resolve){
            wx.getWeRunData({
                complete: res =>{
                    if(res.errMsg == 'getWeRunData:ok'){
                        resolve(res)
                    }else{
                        resolve(false)
                    }
                }
            })
        });
    },
    /** 
     * @param 获取用户过去三十天微信运动步数。需要先调用login 接口。步数信息会在用户主动进入小程序时更新。再次之前请先调用authorize('scope.writePhotosAlbum')
     * @method saveImage https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.saveImageToPhotosAlbum.html
     * @param String src 图片文件路径，可以是临时文件路径或永久文件路径，不支持网络图片路径
     * @param 成功返回true 失败返回 false
     */
    saveImage (src){
        return new Promise(function(resolve){
            wx.saveImageToPhotosAlbum({
                filePath: src,
                complete: res =>{
                    if(res.errMsg == 'saveImageToPhotosAlbum:ok'){
                        resolve(true)
                    }else{
                        resolve(false)
                    }
                }
            })
        });
    },
    /** 
     * @param 选择用户的发票抬头 再次之前请先调用authorize('scope.invoiceTitle')
     * @method chooseInvoiceTitle https://developers.weixin.qq.com/miniprogram/dev/api/open-api/invoice/wx.chooseInvoiceTitle.html
     * @param 成功返回一个对象 失败返回 false
     */
    chooseInvoiceTitle (){
        return new Promise(function(resolve){
            wx.chooseInvoiceTitle({
                complete: res =>{
                    if(res.errMsg == 'chooseInvoiceTitle:ok'){
                        resolve(res)
                    }else{
                        resolve(false)
                    }
                }
            })
        });
    },
    /** 
     * @param 选择用户的发票抬头 再次之前请先调用authorize('scope.invoice')
     * @method chooseInvoice https://developers.weixin.qq.com/miniprogram/dev/api/open-api/invoice/wx.chooseInvoice.html
     * @param 成功返回一个对象 失败返回 false
     */
    chooseInvoice (){
        return new Promise(function(resolve){
            wx.chooseInvoice({
                complete: res =>{
                    console.log(res)
                    if(res.errMsg == 'chooseInvoice:ok'){
                        resolve(res)
                    }else{
                        resolve(false)
                    }
                }
            })
        });
    },
    /** 
     * @param 打开另一个小程序
     * @method navigateToMiniProgram https://developers.weixin.qq.com/miniprogram/dev/api/open-api/miniprogram-navigate/wx.navigateToMiniProgram.html
     * @param String  id必填 要跳转的目标小程序appId
     * @param String  url 要打开的页面路径，如果为空则打开首页	
     * @param Object data 需要传递给目标小程序的数据，目标小程序可在 App.onLaunch()，App.onShow() 中获取到这份数据
     * @param 成功失败返回一个对象 失败
     */
    navigateToMiniProgram (id,url,data){
        let [src,req] = ['',''];
        if(src){
            src = url;
        }
        if(data){
            req = data;
        }
        return new Promise(function(resolve){
            wx.navigateToMiniProgram({
                appId: id,
                path: src,
                extraData: req,
                complete: res =>{
                    resolve(res)
                }
            })
        });
    },
    /** 
     * @param 检查登录态是否过期。
     * @method checkSession https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.checkSession.html
     * @param 如果没有过期返回true 过期自动执行login方法
     */
    checkSession (){
        return new Promise(function(resolve){
            wx.checkSession({
                success: res =>{ 
                    resolve(true)
                },
                fail: error =>{
                    this.log()
                }
            })
        });
    },
    /** 
     * @param 生物认证
     * @method Certification https://developers.weixin.qq.com/miniprogram/dev/api/open-api/soter/wx.checkIsSoterEnrolledInDevice.html
     *  @param String model 类型有fingerPrint指纹 facial人脸识别（暂未支持）speech 声纹识别（暂未支持）
     * @param 获取设备内是否录入如指纹等生物信息的接口 如果成功返回一个对象，没有则返回false
     */
    Certification (model){
        return new Promise(function(resolve){
            wx.checkIsSoterEnrolledInDevice({
                checkAuthMode: model,
                complete: res =>{
                    if(res.errMsg == 'checkIsSoterEnrolledInDevice:ok'){
                        resolve(res)
                    }else{
                        resolve(false)
                    }
                }
            })
        });
    },
    /** 
     * @param 生物认证
     * @method checkIsSupport https://developers.weixin.qq.com/miniprogram/dev/api/open-api/soter/wx.checkIsSupportSoterAuthentication.html
     * @param 获取本机支持的 SOTER 生物认证方式
     * @param 获取本机支持的 SOTER 生物认证方式 如果成功返回一个数组，没有则返回false
     */
    checkIsSupport (){
        return new Promise(function(resolve){
            wx.checkIsSupportSoterAuthentication({
                complete: res =>{
                    console.log(res)
                    if(res.errMsg == 'checkIsSupportSoterAuthentication:ok'){
                        resolve(res.supportMode)
                    }else{
                        resolve(false)
                    }
                }
            })
        });
    },
    /** 
     * @param 生物认证
     * @method checkIsSoterEnrolledInDevice https://developers.weixin.qq.com/miniprogram/dev/api/open-api/soter/wx.checkIsSoterEnrolledInDevice.html
     * @param 如果没有过期返回true 过期自动执行login方法
     */
    checkIsSoterEnrolledInDevice (){
        return new Promise(function(resolve){
            wx.checkIsSoterEnrolledInDevice({
                complete: res =>{
                    resolve(res)
                }
            })
        });
    },
    /** 
     * @param 开始 SOTER 生物认证。验证流程请参考说明。
     * @method startSoter https://developers.weixin.qq.com/miniprogram/dev/api/open-api/soter/wx.startSoterAuthentication.html
     * @param String model 类型有fingerPrint指纹 facial人脸识别（暂未支持）speech 声纹识别（暂未支持）
     * @param String factor 挑战因子。
     * @param String text 验证描述，即识别过程中显示在界面上的对话框提示内容
     * @param 成功失败都返回一个对象
     */
    startSoter (model,factor,text){
        return new Promise(function(resolve){
            wx.startSoterAuthentication({
                requestAuthModes: model,
                challenge: factor,
                authContent: text,
                complete: res =>{
                    resolve(res)
                }
            })
        });
    },
    /**
     * 时间戳转换为日期
     * @method Timestamp  时间戳转换为日期
     * @param {*} time 时间戳
     * 默认返回 年月日 如需要 返回年月日时分秒 求修改
     */
    Timestamp(time) {
        let date = '';
        if (time.length == 10) {
            date = new Date(time * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        } else {
            date = new Date(time);
        }
        const Y = date.getFullYear() + '-';
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        const D = date.getDate() + ' ';
        // const h = date.getHours() + ':';
        // const m = date.getMinutes() + ':';
        // const s = date.getSeconds();
        return Y + M + D;
    },
     /** 
     * @param 发起微信支付。了解更多信息，请查看微信支付接口文档
     * @method requestPayment https://developers.weixin.qq.com/miniprogram/dev/api/open-api/payment/wx.requestPayment.html
     * @param Object req  固定格式{timeStamp: '',nonceStr:'',package: '',paySign:'',}签名类型，默认为MD5 如需其他请修改
     * @param 如果没有过期返回true 过期自动执行login方法
     */
    requestPayment (req){
        console.log(Date.parse(new Date()))
        return new Promise(function(resolve){
            wx.requestPayment({
                timeStamp: req.timeStamp,
                nonceStr: req.nonceStr,
                package: req.package,
                signType: 'MD5',
                paySign: req.paySign,
                success: res =>{ 
                    console.log('ok',res)
                },
                fail: error =>{
                    console.log('fail',error)
                }
            })
        });
    },
    /**
     * @param {*} token 规则应与后端保持一致 支持传参
     * @method token 如果不传n,p,k怎使用小程序全局app.js里面的配置  
     * @param {*} String n 账号
     * @param {*} String p 密码
     * @param {*} String key ......
     */
    getToken(n, p, key) {
        const app = getApp();
        if (n && p && key) {
            return {
                t: n + ":" + (new Date()).valueOf() + ":" + (md5(key + "_" + p).toString()).toUpperCase()
            };
        } else {
            return {
                t: app.n + ":" + (new Date()).valueOf() + ":" + (md5(app.k + "_" + app.p).toString()).toUpperCase()
            };
        }
    }
}