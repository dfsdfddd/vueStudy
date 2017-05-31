/**
 * Created by liuwupop on 16/10/22.
 */
window.vm = new Vue({
	el:"#app",
	data:{
		productList:[]
	},
	mounted: function(){

	},
	filters: {

	},
	methods: {
		cartView: function(){
			this.$http.get('data/cartData.json').then(function(response){
				var res = response.data
				if (res && res.status == 1){
					this.productList = res.result;
				}
			})
		}
	}
})