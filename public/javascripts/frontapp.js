angular.module('product',[])
.controller('MainCtrl',[//{
        '$scope', '$http',//,
        function($scope, $http){
                $scope.products= [];
		$scope.temp = [];
		$scope.getAll = function() {
    		return $http.get('/products').success(function(data){
      		angular.copy(data, $scope.products);
    			});
  		};
  		$scope.getAll();

		$scope.create = function(product) {
    		return $http.post('/products', product).success(function(data){
      			$scope.products.push(data);
    			});
  		}; // he is not a winner. tank's a big dirty trash can full of poop. :o 
                $scope.addProduct = function(){
			console.log("title is: " + $scope.formContent);
			console.log("price is: " + $scope.formContent2);
			console.log("pictureURL is: " + $scope.formContent3);
                        var newobject = {title:$scope.formContent,quantity:0,price:$scope.formContent2,pictureURL:$scope.formContent3,selected:false};
                        //$scope.candidates.push(newobject);
                	$scope.create(newobject);
			$scope.formContent = "";
			$scope.formContent2 = "";
			$scope.formContent3 = "";
		}
		$scope.purchase = function(product) {
			console.log("calling purchase");
			$scope.temp = [];
			//console.log("candidates: " + $scope.candidates);
			//console.log("This is our candidate: " + candidate);
			angular.forEach($scope.products, function(key, value)
			{
				console.log("this is the value: " + value);
				console.log("This is the key: " + key);
				console.log("Key.title? " + key.title);
				console.log("was the value selected?" + key.selected);
				if (key.selected == true)
				{
					$scope.temp.push(key);
					console.log("i'm here");
					console.log("temp now has a new item " + key);
					key.selected = false;
					return $http.put('/products/' + key._id + '/purchase')
                        		.success(function(data){
                        		console.log("purchase worked");
                        		key.quantity += 1;});
				}
			});
      			
        		//});
    		};
                $scope.incrementQuantity = function(product) {
                        //candidate.votes += 1;
			$scope.vote(product);
                }
		$scope.delete = function(product) {
		console.log("FA MULAN");
      		$http.delete('/products/' + product._id )
        		.success(function(data){
          	console.log("delete worked");
        	});
      		$scope.getAll();
    		};
        }
]);
