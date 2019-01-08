/* eslint-disable */ 

export function ApiManager() {
    this.baseUrl = 'http://superburken.se:3000';

    this.registerUser = function(email, password, callback) {
        let registerUrl = this.baseUrl + '/users';
        let data = { 'email': email, 'password': password }; 

        this.ajaxRequest(registerUrl, 'POST', data, true, function(error, response) {
            let obj = JSON.parse(response);
            callback(error, obj);
        });
    };

    this.validateUser = function(email, password, callback) {
        let validateUrl = this.baseUrl + '/users/validate';
        let data = { 'email': email, 'password': password };

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

    this.updateImage = function(imageId, userId, info, tags, callback) {
        let imagesUrl = this.baseUrl + '/images/' + imageId;

        let data = { 
            userId: userId,
            info: info,
            tags: tags
        };

        this.ajaxRequest(imagesUrl, 'PATCH', data, true, function(error, response) {
            if (error) {
                callback(false);
            } else {
                callback(true);
            }   
        });
    };

    this.deleteImage = function(imageId, userId, callback) {
        let imagesUrl = this.baseUrl + '/images/' + imageId;
        let data = { userId: userId};

        this.ajaxRequest(imagesUrl, 'DELETE', data, true, function(error, response) {
            if (error) {
                callback(false);
            } else {
                callback(true);
            }   
        });
    };

    this.getImage = function(imageId, callback) {
        let imagesUrl = this.baseUrl + '/images/' + imageId;

        this.ajaxRequest(imagesUrl, 'GET', null, true, function(error, response) {
            if (error) {
                callback(null);
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

    this.getImagesByUser = function(userId, callback) {
        let imagesUrl = this.baseUrl + '/images/user/' + userId + '/';

        this.ajaxRequest(imagesUrl, 'GET', null, true, function(error, response) {
            if (error) {
                callback(null);
            } else {
                let obj = JSON.parse(response);
                callback(obj);
            }
        });
    };

    this.getImagesByQuery = function(text, callback) {
        let imagesUrl = this.baseUrl + '/images/query/';
        let data = { query: text };

        this.ajaxRequest(imagesUrl, 'GET', data, true, function(error, response) {
            if (error) {
                callback(true, []);
            } else {
                let obj = JSON.parse(response);
                callback(false, obj);
            }
        });
    };

    this.getImages = function(callback) {
        let imagesUrl = this.baseUrl + '/images';

        this.ajaxRequest(imagesUrl, 'GET', null, true, function(error, response) {
            if (error) {
                callback([]);
            } else {
                let obj = JSON.parse(response);
                callback(obj);
            }
        });
    };

	this.ajaxRequest = function(url, method, data, json, callback) {
        let request = new XMLHttpRequest();
        var body = null;

		url += ('?d=' + new Date().getTime());

        if (method.toLowerCase() === 'get') {
            if (data) {
                url += this.formatParams(data);
            }
        } else {
            if (data) {
                body = json ? JSON.stringify(data) : data;
            }
        }

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

		request.send(body);
    };
    
    this.formatParams = function(params){
        return '&' + Object.keys(params).map(function(key){ return key + '=' + encodeURIComponent(params[key]) }).join('&');
    };
}