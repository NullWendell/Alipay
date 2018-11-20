/*
 * @Date: 2018-11-17 12:50:58
 * @LastEditors: wmf
 * @version: 
 * @Description: 
 * @Author: wmf
 * @LastEditTime: 2018-11-18 20:44:37
 */

/****************************************************
 *                                                  *
 *                 支付宝小程序 API                  *
 *                                                  *
 ***************************************************/
 module.exports = {
    /** 
     * @param 导航栏 navigateTo
     * @method navigateTo 保留当前页面，跳转到应用内的某个指定页面，可以使用 navigateBack 返回到原来页面。
     * @param string url 必填 需要跳转的应用内非 tabBar 的目标页面路径 ,路径后可以带参数
     * @param 注意：页面最大深度为10，即可连续调用 10 次 navigateTo
     */
     navigateTo (url){
        return my.navigateTo({url: url});
     },
      /** 
     * @param 导航栏 navigateBack
     * @method navigateBack 关闭当前页面，返回上一级或多级页面。可通过 getCurrentPages 获取当前的页面栈信息，决定需要返回几层。
     * @param Number num  必填 返回的页面数，如果 delta 大于现有打开的页面数，则返回到首页
     */
    navigateBack (num){
        return my.navigateBack({url: num});
     },
     /** 
     * @param 导航栏 redirectTo
     * @method redirectTo 关闭当前页面，跳转到应用内的某个指定页面。
     * @param string url 必填 需要跳转的应用内非 tabBar 的目标页面路径 ,路径后可以带参数
     */
    redirectTo (url){
        return my.redirectTo({url: url});
    },
    /** 
     * @param 导航栏 reLaunch
     * @method reLaunch 关闭当前所有页面，跳转到应用内的某个指定页面。
     * @param 基础库 1.4.0+ & 支付宝客户端 10.1.8+ 支持
     * @param string url 必填 需要跳转的应用内非 tabBar 的目标页面路径 ,路径后可以带参数
     */
    reLaunch (url){
        return my.reLaunch({url: url});
    },
     /** 
     * @param 导航栏 setNavigationBar
     * @method setNavigationBar 设置导航栏文字 若需其他请修改此方法
     * @param String title 导航栏标题
     */
    setNavigationBar (title){
        return my.setNavigationBar({title: title});
    },
     /** 
     * @param 导航栏 showNavigationBarLoading 
     * @method showNavigationBarLoading 显示导航栏 loading 搭配 hideNavigationBarLoading 使用
     */
    showNavigationBarLoading (){
        return my.showNavigationBarLoading();
    },
    /** 
     * @param 导航栏 hideNavigationBarLoading 
     * @method hideNavigationBarLoading 隐藏导航栏 loading
     */
    hideNavigationBarLoading (){
        return my.hideNavigationBarLoading();
    },
    /** 
     * @param TabBar TabBar  
     * @method switchTab 跳转到指定 tabBar 页面，并关闭其他所有非 tabBar 页面
     * @param String url 必填 跳转到指定 tabBar 页面路径
     */
    switchTab (url){
        return my.switchTab({url: url});
    },
    /** 
     * @param 交互反馈  
     * @method alert 警告框 title默认为 “温馨提示” 如不符合请修改
     * @param String text alert框的内容
     */
    alert (text){
        return my.alert({title: '温馨提示',content: text});
    },
    /** 
     * @param 交互反馈  
     * @method confirm  确认框  title默认为 “温馨提示” 如不符合请修改 true 为确定，false为取消
     * @param String 必填text confirm框的内容
     * @param  确认按钮文字，默认‘确定’ 如不符合请修改
     * @param  确认按钮文字，默认‘取消’ 如不符合请修改
     */
    confirm (text){
        return new Promise(function(resolve){
            my.confirm({
                title: '温馨提示',
                content: text,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                complete: res =>{
                    resolve(res.confirm)
                }
            });
        })
    },
    /** 
     * @param 交互反馈  
     * @method prompt  可输入的确认s框  placeholder默认“请输入” 如不符合请修改 成功返回输入框的值，失败返回false
     * @param String 必填title prompt标题
     * @param  确认按钮文字，默认‘取消’ 如不符合请修改
     */
    prompt (title){
        return new Promise(function(resolve){
            my.prompt({
                message: title,
                placeholder: '请输入',
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                complete: res =>{
                    if(res.inputValue){
                        resolve(res.inputValue)
                    }else{
                        resolve(res.ok)
                    }
                }
            });
        })
    },
    /** 
     * @param 交互反馈  
     * @method showToast  显示一个弱提示 默认3s之后消失如不符合请修改
     * @param String 必填type 展示相应图标，默认 none，支持 success,fail,exception,none’。
     * @param String 必填text 提示的文字内容
     */
    showToast (type,text){
        return my.showToast({type: type,content: text,duration: 3000,});
    },
    /** 
     * @param 交互反馈  配合hideLoading使用
     * @method showLoading  显示加载提示 如果在此时间之前调用了hideLoading 则不会显示
     * @param String 必填text 提示的文字内容
     */
    showLoading (text){
        return my.showLoading({content: text});
    },
    /** 
     * @param 交互反馈 
     * @method hideLoading  显示加载提示
     */
    hideLoading (){
        return my.hideLoading();
    },
    /** 
     * @param 交互反馈  
     * @method showActionSheet  显示操作菜单 若需要飘红效果请修改 成功返回数组索引，失败返回-1
     * @param String title 菜单标题
     * @param Array arry 菜单按钮文字数组 示列['菜单一', '菜单二', '菜单三', '菜单四', '菜单五'],  
     */
    showActionSheet (title,arry){
        return new Promise(function(resolve){
            my.showActionSheet({
                title: title,
                items: arry,
                complete: res =>{
                    resolve(res)
                }
            });
        });
    },
     /** 
     * @param 下拉刷新  
     * @method onPull  下拉刷新 在 Page 中自定义 onPullDownRefresh 函数，可以监听该页面用户的下拉刷新事件。
     * @param 需要在页面对应的 .json 配置文件中配置 "pullRefresh": true 选项，才能开启下拉刷新事件。
当   * @param 处理完数据刷新后，调用stopPullDownRefresh 可以停止当前页面的下拉刷新。
     */
    onPull (){
        return my.onPullDownRefresh();
    },
     /** 
     * @param 下拉刷新  
     * @method stopPull  下拉刷新 在 Page 中自定义 onPullDownRefresh 函数，可以监听该页面用户的下拉刷新事件。
     * @param 需要在页面对应的 .json 配置文件中配置 "pullRefresh": true 选项，才能开启下拉刷新事件。
当   * @param 处理完数据刷新后，调用stopPullDownRefresh 可以停止当前页面的下拉刷新。
     */
    stopPull (){
        return my.stopPullDownRefresh();
    },
     /** 
     * @param 联系人  
     * @method Phone 成功返回联系人对象  失败返回 erroe错误代码 具体参考小程序文档
     */
    Phone (){
        return new Promise(function(resolve){
            my.choosePhoneContact({
                complete: res =>{
                    if(res.name){
                        resolve(res)
                    }else{
                        resolve(res.error)
                    }
                }
            });
        });
    },
     /** 
     * @param 联系人  
     * @method chooseAlipayContact 唤起支付宝通讯录，选择一个或者多个支付宝联系人。
     * @param Number num 单次最多选择联系人个数，最大 10  成功返回一个对象 失败返回error错误代码 具体参考小程序文档
     * @param 如成功返回账号的真实姓名，手机号 邮箱，头像连接 支付宝账号唯一 userId
     * @param 返回的 mobile 和 email 字段不一定全有值，取决于所选取联系人的支付宝账号类型是手机号还是邮箱。
     */
    chooseAlipayContact (num){
        return new Promise(function(resolve){
            my.chooseAlipayContact({
                count: num,
                complete: res =>{
                    if(res.contacts){
                        resolve(res.contacts[0])
                    }else{
                        resolve(res.error)
                    }
                }
            });
        });
    },
     /** 
     * @param 联系人  
     * @method chooseContact 唤起支付宝通讯录，选择一个或者多个支付宝联系人。
     * @param Number num 单次最多选择联系人个数，最大 10  成功返回一个对象 失败返回error错误代码 具体参考小程序文档
     * @param 如成功返回账号的真实姓名，手机号 邮箱，头像连接 支付宝账号唯一 userId
     * @param 返回的 mobile 和 email 字段不一定全有值，取决于所选取联系人的支付宝账号类型是手机号还是邮箱。
     */
    chooseContact (num){
        return new Promise(function(resolve){
            my.chooseContact({
                count: num,
                complete: res =>{
                    if(res.contacts){
                        resolve(res.contacts[0])
                    }else{
                        resolve(res.error)
                    }
                }
            });
        });
    },
    /** 
     * @param 选择城市  若需显示自定义城市请修改
     * @method chooseContact 唤起支付宝通讯录，选择一个或者多个支付宝联系人。
     * @param Boolean boo 是否显示热门城市，显示true 不显示false
     * @param 是否显示当前定位城市，默认 false 如需请修改
     * @param 若成功返回行政区划代码以及城市名对象 失败不会触发回调
     */
    chooseCity (boo){
        return new Promise(function(resolve){
            my.chooseCity({
                showLocatedCity: false,
                showHotCities: boo,
                complete: res =>{
                    if(res.city){
                        resolve(res.city)
                    }else{
                        resolve(res)
                    }
                }
            });
        });
    },
    /** 
     * @param 选择日期
     * @method datePicker 唤起支付宝通讯录，选择一个或者多个支付宝联系人。
     * @param String form 返回的日期格式，1，yyyy-MM-dd（默认）2，HH:mm 3，yyyy-MM-dd HH:mm 4，yyyy-MM  5，yyyy 
     * @param String curr 初始选择的日期时间，不传则默认当前时间
     * @param String star 最小日期时间，不传则默认当前时间
     * @param String end 最大日期时间，不传则默认
     * @param 若成功返回选择日期对象对象 失败返回 error错误代码
     */
    datePicker (form,curr,star,end){
        let [format,currentDate,startDate,endDate] = ['yyyy-MM-dd','','','']
        if(form){
            format = form;
        }
        if(curr){
            currentDate = curr;
        }
        if(star){
            startDate = star;
        }
        if(end){
            endDate = end;
        }
        return new Promise(function(resolve){
            my.datePicker({
                format: format,
                currentDate: currentDate,
                startDate: startDate,
                endDate: endDate,
                complete: res =>{
                    if(res.date){
                        resolve(res.date)
                    }else{
                        resolve(res.error)
                    }
                }
            });
        });
    },
      /** 
     * @param 滚动  
     * @method pageScrollTo  滚动到页面的目标位置
     * @param Number num 滚动到页面的目标位置，单位为px
     */
    pageScrollTo (num){
        return my.pageScrollTo({scrollTop: num});
    },
    /** 
     * @param 级联选择
     * @method multiLevelSelect 级联选择功能主要使用在于多级关联数据选择，比如说省市区的信息选择
     * @param String  title 标题
     * @param Array list 选择数据列表 具体数据格式请参考小程序文档
     * @param 若成功返回所选择的数组 失败怎返回false
     */
    multiLevelSelect (title,list){
        return new Promise(function(resolve){
            my.multiLevelSelect({
                title: title,
                list: list,
                complete: res =>{
                    if(res.result){
                        resolve(res.result)
                    }else{
                        resolve(res.success)
                    }
                }
            });
        });
    },
    /** 
     * @param 授权 如需请求接口请添加
     * @method getAuthCode 级联选择功能主要使用在于多级关联数据选择，比如说省市区的信息选择
     * @param String  scopes 授权类型支持 auth_base（静默授权）/ auth_user（主动授权） / auth_zhima（芝麻信用）
     * @param 若成功返回所选择的数组 失败怎返回false
     */
    getAuthCode (scopes){
        return new Promise(function(resolve){
            my.getAuthCode({
                scopes: scopes,
                complete: res =>{
                    if(res.authCode){
                        resolve(res.authCode)
                    }else{
                        resolve(false)
                    }
                }
            });
        });
    },
     /** 
     * @param 小程序唤起支付
     * @method tradePay 发起支付
     * @param String  str 支付宝交易号
     * @param 成功与失败都返回一个对象 具体参考小程序文档
     */
    tradePay (str){
        return new Promise(function(resolve){
            my.tradePay({
                tradeNO: str,
                complete: res =>{
                    resolve(res)
                }
            });
        });
    },
    /** 
     * @param 跳转支付宝卡包
     * @method openCardList 打开支付宝卡列表。
     */
    openCardList (){
        return my.openCardList();
    },
    /** 
     * @param 跳转支付宝卡包
     * @method openMerchantCardList 打开当前用户的某个商户的卡列表
     * @param String str 商户编号
     */
    openMerchantCardList (str){
        return my.openMerchantCardList({partnerId: str});
    },
    /** 
     * @param 跳转支付宝卡包
     * @method openCardDetail 打开当前用户的某张卡的详情页
     * @param String str 卡实例Id
     */
    openCardDetail (str){
        return my.openCardDetail({passId: str});
    },
    /** 
     * @param 小程序跳转 
     * @method navigateToMiniProgram 发起支付
     * @param String  id必填 要跳转的目标小程序appId
     * @param String  url 要打开的页面路径，如果为空则打开首页	
     * @param Object data 需要传递给目标小程序的数据，目标小程序可在 App.onLaunch()，App.onShow() 中获取到这份数据
     */
    navigateToMiniProgram (id,url,data){
        return new Promise(function(resolve){
            my.navigateToMiniProgram({
                appId: id,
                path: url,
                extraData: data,
                complete: res =>{
                    resolve(res)
                }
            });
        });
    },
    /** 
     * @param 打开支付宝应用或页面 如果需要判断跳转成功与否请优化
     * @method openCardDetail 打开当前用户的某张卡的详情页
     * @param String url 要跳转的支付宝业务、运营活动schema或url
     */
    Page (url){
        return my.ap.navigateToAlipayPage({path: url});
    },
    /** 
     * @param 刷脸认证 
     * @method face 该接口通过活体检测和人脸比对技术，认证当前用户是否为登陆支付宝用户的本人和真人。
     * @param String  id必填 业务流水号，需要保证唯一性，不超过64位 如果不知道请传userid
     * @param 成功与否都返回一个对象 具体请参考小程序文档进行判断
     */
    face (id){
        return new Promise(function(resolve){
            my.ap.faceVerify({
                bizId: id,
                bizType: '2',
                complete: res =>{
                    resolve(res)
                }
            });
        });
    },
    /** 
     * @param 图片 
     * @method chooseImage 拍照或从手机相册中选择图片
     * @param Number  num 最大可选照片数
     * @param String  str 相册选取或者拍照，默认 [‘camera’,‘album’]
     * @param 成功返回图片路径 失败或用户取消则返回false
     */
    chooseImage (num,str){
        let type;
        if(str){
            type = str;
        }else{
            type = ''
        }
        return new Promise(function(resolve){
            my.chooseImage({
                count: num,
                sourceType: type,
                complete: res =>{
                    if(res.apFilePaths){
                        resolve(res.apFilePaths)
                    }else{
                        resolve(false)
                    }
                }
            });
        });
    },
     /** 
     * @param 预览图片。
     * @method previewImage 预览图片。
     * @param Array url 要预览的图片链接列表数组
     */
    previewImage (url){
        return my.previewImage({urls: url});
    },
    /** 
     * @param 位置 
     * @method getLocation 拍照或从手机相册中选择图片
     * @param Number  type 0：获取经纬度1：获取经纬度和详细到区县级别的逆地理编码数据2：获取经纬度和详细到街道级别的逆地理编码数据，不推荐使用3：获取经纬度和详细到POI级别的逆地理编码数据，不推荐使用
     * @param 成功失败都返回一个对象 具体参考小程序官方文档
     */
    getLocation (type){
        return new Promise(function(resolve){
            my.getLocation({
                type: type,
                complete: res =>{
                    resolve(res)
                }
            });
        });
    },
    /** 
     * @param 系统信息 
     * @method getSystemInfoSync 获取系统信息
     * @param 成功失败都返回一个对象 具体参考小程序官方文档
     */
    getSystemInfoSync (){
        return new Promise(function(resolve){
            my.getSystemInfoSync({
                complete: res =>{
                    resolve(res)
                }
            });
        });
    },
     /** 
     * @param 网络请求 超时时间，单位ms，默认30000 以及设置请求的 HTTP 头，默认 {'Content-Type': 'application/x-www-form-urlencoded'} 如需请修改 
     * @method post 向指定服务器发起一个跨域 http 请求
     * @param String  url 目标服务器url 相对地址或者http/https开头完整地址 
     * @param 如果为相对地址 请在全局app.js里面添加 示列 apiUrl: 'https://restapi.amap.com/v3/',
     * @param String  req 请求参数
     * @param 成功失败都返回一个对象 具体参考小程序官方文档
     */
    post (url,req){
        let that = this;
        const app = getApp();
        let api;
        if(url.indexOf('http') == 0){
           api = url;
        }else{
            api = app.apiUrl + url;
        }
        return new Promise(function(resolve){
            that.showLoading();
            my.httpRequest({
                url: api,
                method: 'POST',
                data: req,
                dataType: 'json',
                complete: res =>{
                    resolve(res);
                    that.hideLoading();
                }
            });
        });
    },
    /** 
     * 
     * 上传图片
     * @method upload 默认上传图片，如需其他请修改
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
            my.uploadFile({
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
     * @param 拨打电话
     * @method makePhoneCall 拨打电话
     * @param String num 要拨打的电话号码
     */
    makePhoneCall (num){
        return my.makePhoneCall({number: num});
    },
    /** 
     * @param 扫码 
     * @method scan 
     * @param String type qr,扫码框样式为二维码扫码框 bar，扫码样式为条形码扫码框
     * @param 成功失败都返回一个对象 具体参考小程序官方文档
     */
    scan (type){
        return new Promise(function(resolve){
            my.scan({
                type: type,
                complete: res =>{
                    resolve(res)
                }
            });
        });
    },
     /** 
     * @param 缓存 同步将数据存储在本地缓存中指定的 key 中
     * @method setStorageSync 同一个支付宝用户，同一个小程序缓存总上限为10MB
     * @param String key 缓存数据的key
     */
    setStorageSync (key,data){
        return my.setStorageSync({key: key,data: data});
    },
    /** 
     * @param 同步获取缓存数据
     * @method getStorageSync 
     * @param String key 缓存数据的key
     * @param 成功失败都返回一个对象 具体参考小程序官方文档
     */
    getStorageSync (key){
        return my.getStorageSync({ key: key });
    },
    /** 
     * @param 同步删除缓存数据。
     * @method removeStorageSync 
     * @param String key 缓存数据的key
     * @param 成功失败都返回一个对象 具体参考小程序官方文档
     */
    removeStorageSync (key){
        return my.removeStorageSync({ key: key });
    },
    /** 
     * @param 同步清除本地数据缓存。
     * @method clearStorageSync 
     */
    clearStorageSync (){
        return my.clearStorageSync();
    },
    /** 
     * @param 网络状态 
     * @method getNetwork 获取当前网络状态
     * @param 成功失败都返回一个对象 具体参考小程序官方文档
     */
    getNetwork (){
        return new Promise(function(resolve){
            my.getNetworkType({
                complete: res =>{
                    resolve(res)
                }
            });
        });
    },
    /** 
     * @param 网络状态 
     * @method onStatusChange 开始网络状态变化的监听
     * @param 成功失败都返回一个对象 具体参考小程序官方文档
     */
    onStatusChange (){
        return new Promise(function(resolve){
            my.onNetworkStatusChange ({
                complete: res =>{
                    resolve(res)
                }
            });
        });
    },
    /** 
     * @param 网络状态 
     * @method offStatusChange 取消网络状态变化的监听
     */
    offStatusChange (){
        return my.offNetworkStatusChange();
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
