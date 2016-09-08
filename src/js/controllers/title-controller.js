/**
 * Page title controller.
 *
 * Created by Ruslan Kardanov.
 * Date: 08/09/16.
 */
titleController = function($scope, $rootScope, $translate, titleFactory) {

    // Handling title factory.
    $scope.titleFactory = titleFactory;

    // Listening to events updating page title.
    $rootScope.$on('$routeChangeSuccess', function() {
        $scope.updateTitle()
    });
    $rootScope.$on('languageChangeEvent', function() {
        $scope.updateTitle()
    });

    // Method to update page title.
    $scope.updateTitle = function() {
        if ($rootScope.ifHere('/work')) {
            titleFactory.setTitleFinish(' ' + ($translate.use() === translations_ru_RU.LOCALE ? translations_ru_RU.WORK : translations_en_US.WORK));
        } else if ($rootScope.ifHere('/travel')) {
            titleFactory.setTitleFinish(' ' + ($translate.use() === translations_ru_RU.LOCALE ? translations_ru_RU.TRAVEL : translations_en_US.TRAVEL));
        } else {
            titleFactory.setTitleFinish(' ');
        }
    }
}