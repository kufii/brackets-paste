/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window, XMLHttpRequest */

/** Simple extension that adds a "File > Hello World" menu item */
define(function (require, exports, module) {
    
    'use strict';
    
    // Brackets modules
    var CommandManager = brackets.getModule('command/CommandManager'),
        Menus          = brackets.getModule('command/Menus');
    
    var httpReq = new XMLHttpRequest();
    var url = 'http://paste.ee/api';
    var fields2 = 'key=public&description=test&paste=this is a test paste&format=JSON';
    var fields = {key: 'public', language: 'plain', description: 'test', paste: 'this is a test paste', encrypted: 0, expire: 0, format: 'json'};
    var fields3 = ['public', 'test', 'this is a test paste', 'JSON'];

    // Pastes highlighted text 
    var doPaste = function () {
        httpReq.open('POST', url, true);
        console.log('good');

        //httpReq.setRequestHeader('Content-type', 'application/ecmascript');
        httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        console.log('ok');

        httpReq.onreadystatechange = function () {
            console.log('test');
            if (httpReq.readyState === 4 && httpReq.status === 200) {
                console.log('once');
                console.log('test');
                console.log(httpReq.responseText);
            }
        };
        
        httpReq.send(fields2);
    };

    // Register a command (a UI-less object associating an id to a handler)
    var commandId = 'pastePlugin.paste';
    CommandManager.register('Upload paste', commandId, doPaste);

    // Create a menu item bound to the command
    var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
    menu.addMenuItem(commandId, 'Ctrl-Shift-P');
});