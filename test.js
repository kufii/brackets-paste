/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window, XMLHttpRequest */

define(function (require, exports, module) {
    
    'use strict';
    
    // Brackets modules
    var CommandManager = brackets.getModule('command/CommandManager');
    var Menus = brackets.getModule('command/Menus');
    var EditorManager = brackets.getModule('editor/EditorManager');
    var Dialogs = brackets.getModule("widgets/Dialogs");
    
    var httpReq = new XMLHttpRequest();
    var url = 'http://paste.ee/api';
    
    // Encodes the selection to be sent properly in the POST request
    function encodeSelection(selection) {
        selection = selection.replace(/\+/g, '%2B');
        selection = selection.replace(/&/g, '%26');
        return selection;
    }
    
    // Returns the current highlighted text
    function getSelection() {
        try {
            var editor = EditorManager.getCurrentFullEditor();
            var selection = editor.getSelectedText();
            if (selection !== '') {
                return encodeSelection(selection);
            } else {
                throw 'NO_SELECTION';
            }
        } catch (e) {
            console.error(e);
        }
    }
    
    function getPasteId(responseText) {
        
    }
    
    function showDialog(pasteId) {
        var html = "Press Ctrl+C to copy the link!<div style='-webkit-user-select: text;'>paste.ee/p/" + pasteId + "</div>";
        var $dialog = $(".modal.instance");
        Dialogs.showModalDialog(Dialogs.DIALOG_ID_INFO, 'Paste plugin', '');
        
        $(".dialog-message", $dialog).html(html);
    }
    
    // Pastes highlighted text 
    function doPaste() {
        var fields = 'key=public&description=test&language=javascript&paste=' + getSelection() + '&format=JSON';

        httpReq.open('POST', url, true);
        console.log('help');
        
        httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        console.log('help');
        
        if (httpReq.readyState === 4 && httpReq.status === 200) {
            console.log('help');
            console.log(httpReq.responseText);
        }
        console.log(httpReq.readyState);
        
        console.log(httpReq.responseText);
        httpReq.send(fields);
        
        console.log(httpReq.readyState);
        
        showDialog(getPasteId(httpReq.responseText));
    }

    // Register a command (a UI-less object associating an id to a handler)
    var commandId = 'pastePlugin.paste';
    CommandManager.register('Upload paste', commandId, doPaste);

    // Create a menu item bound to the command
    var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
    menu.addMenuItem(commandId, 'Ctrl-Shift-P');
});
