/* eslint-disable */ 

export function ApiManager() {
    this.baseUrl = 'http://localhost:3000';

    this.registerUser = function(email, password, callback) {
        let registerUrl = this.baseUrl + '/users';
        let obj = { 'email': email, 'password': password }; 
        let data = JSON.stringify(obj);

        this.ajaxRequest(registerUrl, 'POST', data, true, function(error, response) {
            let obj = JSON.parse(response);
            callback(error, obj);
        });
    };

    this.validateUser = function(email, password, callback) {
        let validateUrl = this.baseUrl + '/users/validate';
        let obj = { 'email': email, 'password': password };
        let data = JSON.stringify(obj);

        this.ajaxRequest(validateUrl, 'POST', data, true, function(error, response) {
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

    this.getImagesByUser = function(userId, callback) {
        let imagesUrl = this.baseUrl + '/images/user/' + userId + '/';

        this.ajaxRequest(imagesUrl, 'GET', null, true, function(error, response) {
            if (error) {
                callback([]);
            } else {
                let obj = JSON.parse(response);
                callback(obj);
            }
        });
    };

    this.uploadImage = function(blob, callback) {
        let uploadUrl = this.baseUrl + '/images';

        if (blob) {
            this.ajaxRequest(uploadUrl, 'POST', blob, false, function(error, response) {
                callback(!error);
            });
        }  
    };

	this.ajaxRequest = function(url, method, data, json, callback) {
		let request = new XMLHttpRequest();
		url += ('?d=' + new Date().getTime());

		request.onreadystatechange = function() {
			if (this.readyState == 4) {
				if (this.status >= 200 && this.status <= 299) {
					callback(false, this.responseText);
				} else {
                    callback(true, null);
				}
			}
		}
        
        request.open(method, url, true);

        if (json) {
            request.setRequestHeader('Content-type','application/json; charset=utf-8');
            request.setRequestHeader('Cache-Control', 'no-cache');
        }

		request.send(data);
	};
}