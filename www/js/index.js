/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("menubutton", this.onMenuKeyDown, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    onMenuKeyDown: function() {
        console.log('menu');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

        var pushNotification = window.plugins.pushNotification;

        if (navigator.platform == 'android' || navigator.platform == 'Android') {
        pushNotification.registerDevice({ alert:true, badge:true, sound:true,  projectid: "534936591177", appid : "AC72D-46994" },
                                        function(status) {
                                            var pushToken = status;
                                            console.warn('push token android: ' + pushToken);
                                            console.log(pushToken);
                                        },
                                        function(status) {
                                            console.log('android');
                                            console.warn(JSON.stringify(['failed to register ', status]));
                                        });


    } else {
        pushNotification.registerDevice({ alert:true, badge:true, sound:true,  appname: "Ad-Center", pw_appid : "AC72D-46994" },
                                        function(status) {
                                            var pushToken = status;
                                            console.warn('push token ios: ' + pushToken);
                                            console.log(pushToken);
                                            console.log(pushToken.deviceToken);
                                        },
                                        function(status) {
                                            console.log('iphone');
                                            console.warn(JSON.stringify(['failed to register ', status]));
                                        });

    }
     
    //     document.addEventListener('push-notification', function(event) {
    //         var title = event.notification.title;
    //             var userData = event.notification.userdata;
    //                                  
    //             if(typeof(userData) != "undefined") {
    //             console.warn('user data: ' + JSON.stringify(userData));
    //         }
    //                                      
    //         navigator.notification.alert(title);
    //     });

    }
};
