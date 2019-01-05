export function ApiManager() {
    this.baseUrl = 'http://localhost:3000';
    
    this.registerUser = function(email, password, callback) {
        let registerUrl = this.baseUrl + '/users';
        let obj = { 'email': email, 'password': password }; 
        let data = JSON.stringify(obj);

        this.ajaxRequest(registerUrl, 'POST', data, function(error, response) {
            callback(error);
        });
    };

    this.validateUser = function(email, password, callback) {
        let validateUrl = this.baseUrl + '/users/validate';
        let obj = { 'email': email, 'password': password };
        let data = JSON.stringify(obj);

        this.ajaxRequest(validateUrl, 'POST', data, function(error, response) {
            var result = {
                success: !error,
                userId : ''
            };

            let obj = JSON.parse(response);

            if (!error) {
                result.userId = obj._id;
            }

            callback(result);
        });
    };

	this.ajaxRequest = function(url, method, data, callback) {
		let request = new XMLHttpRequest();

		//Förhindra cachning
		url += ('?d=' + new Date().getTime());

		request.open(method, url, true);
		request.setRequestHeader('Content-type','application/json; charset=utf-8');
		request.setRequestHeader('Cache-Control', 'no-cache');

		request.onreadystatechange = function() {
			if (this.readyState == 4) {
				if (this.status == 200) {
					callback(false, this.responseText);
				} else {
                    callback(true, null);
				}
			}
		}
		
		request.send(data);
	};
};