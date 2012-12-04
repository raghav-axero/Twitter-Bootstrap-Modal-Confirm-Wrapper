/*
Copyright (c) <Year> <First & Last Name>, <Your Web Site>
		
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:
		
The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
		
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
; (function ($) {


    $.confirm = function(message, options) {
        options = $.extend({}, $.confirm.defaults, options);

        // Variable declarations
        var modal = $(options.container);
        var header = $(options.headerContainer);
        var title = $(options.headerTitleContainer);
        var body = $(options.bodyContainer);
        var footer = $(options.footerContainer);
        var messageContainer = $(options.messageContainer);
        var confirmButton = $(options.confirmButton);
        var cancelButton = $(options.cancelButton);

        // Append header
        if (options.title && options.showHeader) {
            title.append(options.title);
            header.append(options.headerCloseButton);
            header.append(title);
            modal.append(header);
        }
        
        // Append body
        if (typeof(message) == 'string') {
            messageContainer.append(message);
            body.append(messageContainer);
        } else {
            message.show();
            body.append(message);
        }
        modal.append(body);
        
        // Append footer
        if (options.showFooter) {
            confirmButton.html(options.confirmButtonText);
            if (options.confirmButtonClass) {
                confirmButton.addClass(options.confirmButtonClass);
            }
            confirmButton.on('click', function() {
                if (options.onConfirm != null) {
                    options.onConfirm();
                    if (options.hideOnConfirm) {
                        modal.modal('hide');
                    }
                }
            });
  	
            cancelButton.html(options.cancelButtonText);
            if (options.cancelButtonClass) {
                cancelButton.addClass(options.cancelButtonClass);
            }
            
            cancelButton.on('click', function() {
                if (options.onCancel != null) {
                    options.onCancel();
                    modal.modal('hide');
                }
            });
            footer.append(confirmButton);
            footer.append(cancelButton);
            modal.append(footer);
        }

        // Show modal
        modal.modal(options);
    };

    $.confirm.defaults = {
        // Title for modal
        title: null,
        
        // True to show the header, false to hide it
        showHeader: true,
        
        // True to show the footer, false to hide it
        showFooter: true,
        
        // True to hide modal after confirm callback is complete. 
        // Set this to false if the confirm callback contains ajax call 
        // and hide the modal manually in the success callback of ajax call.
        hideOnConfirm: true,

        // Placeholder for modal.
        container: '<div class="modal"></div>',
        
        // Placeholder for header.
        headerContainer: '<div class="modal-header"></div>',
        
        // Close button in header.
        headerCloseButton: '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>',
        
        // Placeholder for header title.
        headerTitleContainer: '<h3></h3>',
        
        // Placeholder for body of modal.
        bodyContainer: '<div class="modal-body"></div>',
        
        // Placeholder for message.
        messageContainer: '<p></p>',
        
        // Placeholder for footer.
        footerContainer: '<div class="modal-footer"></div>',
        
        // Confirm button in footer
        confirmButton: '<button id="EditFilePropertiesModalSaveButton" class="btn"></button>',
        
        // Display text for confirm button
        confirmButtonText: 'Yes',
        
        // CSSClass for confirm button
        confirmButtonClass: 'btn-primary',
        
        // Cancel button in footer
        cancelButton: '<button class="btn" data-dismiss="modal" aria-hidden="true"></button>',
        
        // Display text for cancel button
        cancelButtonText: 'No',
        
        // CSSClass for cancel button
        cancelButtonClass: null,
        
        // Callback method on confirm button click
        onConfirm:null,
        
        // Callback method on cancel button click
        onCancel: null
    };
    
    $.fn.confirm = function(options) {
        $.confirm(this, options);
        return this;
    };

})(jQuery);