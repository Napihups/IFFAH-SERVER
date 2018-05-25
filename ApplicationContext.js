var AppContext = (function (){

	this.socket = null


	this.setSocket = function(socketModule) {
		this.socket = socketModule;
	}

	this.getSocket = function() {
		if(this.socket != null){
			return this.socket;
		}
	}
			
	return this
})();

module.exports = AppContext;