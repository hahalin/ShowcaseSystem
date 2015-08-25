﻿(function () {
    'use strict';

    var userProfileCommentsDirective = function userProfileCommentsDirective(userProfileData, $routeParams, identity, commentsData, notifier) {
        return {
            restrict: 'A',
            templateUrl: 'user-profile-page/user-profile-comments-directive.html',
            scope: {
                comments: '=',
                username: '='
            },
            link: function (scope, element) {
                var username = $routeParams.username.toLowerCase();
                scope.commentsPage = 1;
                scope.lastPage = 1;
                scope.edittingComments = [];
                
                identity.getUser()
                    .then(function (user) {
                        scope.currentLoggedInUsername = user.userName;
                    });

                commentsData.getUserComments(username, scope.commentsPage)
                    .then(function (data) {
                        scope.comments = data.comments;
                        scope.isLastPage = data.isLastPage;
                        scope.lastPage = data.lastPage;
                    });

                scope.loadCommentsPage = function (page) {
                    commentsData.getUserComments(username, page)
                        .then(function (data) {
                            scope.commentsPage = page;
                            scope.comments = data.comments;
                            scope.isLastPage = data.isLastPage;
                            scope.lastPage = data.lastPage;
                        });
                };
                
                scope.editComment = function (id) {
                    scope.edittingComments[id] = true;
                };

                scope.cancelEdit = function (id) {
                    scope.edittingComments[id] = false;
                };
                
                scope.flagComment = function (commentId) {
                    commentsData.flagComment(commentId)
                        .then(function (data) {
                            for (var i = 0; i < scope.comments.length; i++) {
                                if (scope.comments[i].id == commentId) {
                                    scope.comments[i].isFlagged = true;
                                    break;
                                }
                            }
                        });
                };

                scope.unFlagComment = function (commentId) {
                    commentsData.unFlagComment(commentId)
                        .then(function (data) {
                            for (var i = 0; i < scope.comments.length; i++) {
                                if (scope.comments[i].id == commentId) {
                                    scope.comments[i].isFlagged = false;
                                    break;
                                }
                            }
                        });
                };

                scope.saveComment = function (id, text) {
                    if (text.length < 10 || text.length > 500) {
                        notifier.error('The comment length should be between 10 and 500 symbols.');
                        return;
                    }

                    commentsData.editComment(id, text)
                        .then(function (data) {
                            scope.edittingComments[id] = false;
                        });
                };
            }            
        };
    };

    angular
        .module('showcaseSystem.directives')
        .directive('userProfileComments', ['userProfileData', '$routeParams', 'identity', 'commentsData', 'notifier', userProfileCommentsDirective]);
}());