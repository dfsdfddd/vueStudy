/**
 * Created by liuwupop on 17/05/22.
 */
window.vm = new Vue({
	el:"#app",
	data:{
		productList: [],
		checkAll: false,
		totalMoney:0,
        showModal: false,
		currentProduct:'',
	},
	mounted: function(){
		var _this = this;
		this.cartView();
	}
	,
	filters: {
		//过滤器
		formatMoney: function(value,quentity){
			if (!quentity)quentity =1;
			return "￥" +(value*quentity).toFixed(2) + "元"
		}
	},
	methods: {
		cartView: function(){
			this.$http.get("data/cartData.json").then(response => {
				var res = response.data;
				if (res && res.status == 1){
					this.productList = res.result.list;
				}
            });
		},
        selectAll: function(isCheck){
			//全选所有
			this.checkAll = isCheck;
			var _this = this;
			this.productList.forEach(function (item) {
				if (typeof item.checked == 'undefined'){
					_this.$set(item, 'checked',isCheck);
				}else {
					item.checked = isCheck;
				}
            })
            this.calcTotalMoney();
        },
        selectedProduct: function (product) {
			//选择产品
			if (typeof product.checked == 'undefined'){

				this.$set(product, "checked",true)
			}else{
				product.checked = !product.checked;
			}
			this.isCheckAll();
			this.calcTotalMoney();
        },
        isCheckAll: function(){
			//是否已经被全选
			var flag = true;
			this.productList.forEach(function (item) {
				if (!item.checked){
					flag = false;
				}
            });
			if(flag){
				this.checkAll = true;
			}else {
                this.checkAll = false;
			}
        },
        calcTotalMoney: function(){
			//计算所有的时间
			let totalMoney = 0;
			this.productList.forEach(function(item){
				if(item.checked){
					totalMoney= totalMoney + (item.productPrice*item.productQuentity)
				}
			})
			this.totalMoney = totalMoney;
        },
        changeMoney: function(product,way){
			//改变时间
			if (way>0){
				product.productQuentity++;
			}else {
                product.productQuentity--;
				if ( product.productQuentity<0){
					product.productQuentity = 1;
				}
			}
            this.calcTotalMoney();
        },
   		delConfirm: function(product){
			//删除条目
			this.showModal=true;
			this.currentProduct=product;
        },
        delCurrentProduct: function () {
			this.showModal = false;
			var index = this.productList.indexOf(this.currentProduct);
			this.productList.splice(index,1);
			console.log(this.productList)
        }
	}
})