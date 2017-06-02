var vm = new Vue({
	el: ".container",
	data: {
		limitNum:3,
		addressIndex: 0,
		addressList: [],
		isNextFlag: false,
		loadMoreFlag: false,
		shippingMethod:1
	},
	mounted: function () {
		this.$nextTick(function () {
			this.queryAddress();
		});

	},
	computed: {
        filteAddress:function (){
            return this.addressList.slice(0,this.limitNum);
        }
	},
	methods: {
		queryAddress: function () {
            var _this = this;
            this.$http.get('data/address.json').then(function (response) {
                var res = response.body;
                if (res && res.status == "0"){
                    this.addressList = res.result
                }
            })
		},
		loadMoreData: function() {
			this.loadMoreFlag = !this.loadMoreFlag;
			if (this.loadMoreFlag) {
				this.limitNum = this.addressList.length;
			} else {
				this.limitNum = 3;
			}
		},
		setDefaultAddress: function(addrId) {
			var _this = this;
			this.addressList.forEach(function (item) {
				if (item.addressId == addrId){
					item.isDefault=true;
				}else {
					item.isDefault=false;
				}
            })
		},
		delConfirm: function(k) {
			var _this = this;
			_this.delItem = k;
		},
		delUserAddress: function() {
			var _this = this;
			_this.confirmModalFlag = false;
			_this.addressList.$remove(h.delItem);
		}
	}
});