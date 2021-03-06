// new Vue({
//     el: '#app',
//     data: function() {
//         return {
//              visible: false 
//         }
//     }
// })
var Main = {
    data() {
        // const item = {
        //     activeName: '2016-05-02'
        // };
        return {
            config_info:{},
            config:{
              logo_img: true,
              logo_img_url:"https://cdn.jsdelivr.net/gh/medfav/MyPage/docs/webnav/img/logo.png",
              logo_text: "网址导航",
              data_source: "https://mockapi.eolinker.com/wMcT8EC5b9622df7c09ace9bd4ad3cde87932fd5b8344a4/data/tabs.json",
              default_search:"baidu",
              search_config:[]
            },
            load_info:"正在加载数据......",
            config_url: "https://mockapi.eolinker.com/wMcT8EC5b9622df7c09ace9bd4ad3cde87932fd5b8344a4/data/config.json",
            activeName: ['g1t1','g2t1'],
            // all_items: [],
            // group_items: [],
            // tab_items: [],
            source_info:{},
            tab_groups: [],
            searchbox_value:""
          };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      querySearch:(queryString, cb) => {
        // bing搜索建议
        $.ajax({
          url: "https://api.bing.com/qsonhs.aspx?type=cb&q=" + queryString + "&cb=window.bing.sug",
          type: "GET",
          dataType: "jsonp"
        })
        //bing搜索建议jsonp回调函数
        window.bing = {"sug":(bing_sug) => {
          console.log(bing_sug);
          let suggest_list = [{"value":bing_sug.AS.Query}];
          if(bing_sug.AS.FullResults > 0){
            bing_sug.AS.Results[0].Suggests.forEach(element => {
              suggest_list.push({"value":element.Txt});
            });
          }
          console.log(suggest_list);
          // 调用 callback 返回建议列表的数据
          cb(suggest_list);
        }};
      },
      handleSelect:function (item){
        console.log(item);
        this.searchButton(this.config.default_search);
      },
      searchButton:function(search_engines) {
          // document.querySelector(".el-autocomplete .el-input input").value;
          console.log(this.searchbox_value);
          let searchurl = "";
          this.config.search_config.forEach((item)=>{
            if(item.id==search_engines){
              searchurl = item.queryUrl.replace(/{}/g,encodeURIComponent(this.searchbox_value));
              if(searchurl!=""){
                window.open(searchurl,"_blank");
              }
            }
          })
        },
        isJSON:function(str) {
            if (typeof str == 'object'){
                console.log('It is not a Object!');
                return true;
            }
            if (typeof str == 'string') {
                try {
                    var obj=JSON.parse(str);
                    if(typeof obj == 'object' && obj ){
                        console.log('It is a JSON!');
                        return true;
                    }else{
                        console.log('It is not a JSON!');
                        return false;
                    }
                } catch(e) {
                    console.log('error：JSON格式错误！');
                    return false;
                }
            }
            console.log('It is not a string!');
            return false;
        }
    },
    mounted: function() {
      // axios.get("/data/data.json")
      // .then(response => {
      //   this.tab_items = response.data;
      // })
      axios.get(this.config_url,{
        "Content-Type":"application/json; charset=UTF-8"
      })
      .then(response => {
        if(!this.isJSON(response.data)){
            console.log("配置文件错误!");
            this.load_info = "配置文件错误!";
            return;
        }
        const config = typeof response.data == "string"?JSON.parse(response.data):response.data;
        this.config_info = config.config_info;
        console.log("配置数据版本：" + config.config_info.data_version + ", 更新日期：" + config.config_info.change_date);
        this.config.logo_img = config.logo_config.logo_img;
        this.config.logo_img_url = config.logo_config.logo_img_url;
        this.config.logo_text = config.logo_config.logo_text;
        // this.config.data_source = config.data_source;
        this.config.search_config = config.search.search_list;
        this.config.default_search = config.search.default_search
      });
      axios.get(this.config.data_source)
      .then(response => {
        if(!this.isJSON(response.data)){
            console.log("数据文件错误!");
            this.load_info = "数据文件错误!";
            return;
        }
        let res_data = typeof response.data == "string"?JSON.parse(response.data):response.data;
        this.source_info = res_data.source_info;
        console.log("导航数据版本：" + res_data.source_info.data_version + ", 更新日期：" + res_data.source_info.change_date);
        this.tab_groups = res_data.nav_data;
      });
      // axios.get("https://mockapi.eolinker.com/wMcT8EC5b9622df7c09ace9bd4ad3cde87932fd5b8344a4/data/tabs.json")
      // .then(response => {
      //   this.tab_groups = response.data;
      // })
    }
  };
var Ctor = Vue.extend(Main)
new Ctor().$mount('#app')
