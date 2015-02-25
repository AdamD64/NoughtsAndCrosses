
angular.module('tombola.noughtsAndCrosses')
    .controller('NoughtsAndCrossesController',['$scope','gameModel','gameAPI','audio', function ($scope,gameModel,gameAPI,audioService) {

        $scope.gameModel = gameModel;

        var updateTurn = function(promise){
            promise.then(function(data){
                $scope.gameModel.updateModel(data);
            })
                .catch(function(errorData){
                    alert('Error status:' + errorData.status + ' ' + errorData.message);
                });
        };

        $scope.startNewGame = function () {
            updateTurn(gameAPI.startNewGame($scope.gameModel.player1, $scope.gameModel.player2));
            $scope.gameModel.firstPlayer();
            audioService.startNewGameAudio();
        };

        $scope.makeMove = function (chosenSquare) {
            updateTurn(gameAPI.makeMove($scope.gameModel.currentPlayer, chosenSquare));
            gameModel.changePlayerNumber();
            audioService.makeMoveAudio();
        };


        $scope.changePlayerType1 = function () {
            $scope.gameModel.changePlayerType1();
        };

        $scope.changePlayerType2 = function () {
            $scope.gameModel.changePlayerType2();
        };

        $scope.changePlayerNumber = function () {
            $scope.gameModel.changePlayerNumber();
        };
    }]);