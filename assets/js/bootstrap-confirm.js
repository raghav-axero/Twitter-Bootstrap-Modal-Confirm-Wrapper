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
        ///	<summary>
        /// Wrapper to show confirm modal using Twitter bootstrap.
        ///	</summary>
        ///	<param name="message" type="String">The confirm message</param>
        ///	<param name="options" type="Object">Can be a confirm function or options for confirm modal</param>
        
        if (typeof(options) == 'function') {
            var onConfirm = options;
            options = $.confirm.defaults;
            options.onConfirm = onConfirm;
        } else {
            options = $.extend({}, $.confirm.defaults, options);
        }
        // Variable declarations
        var modal = $(options.container);
        var header = $(options.headerContainer);
        var title = $(options.headerTitleContainer);
        var body = $(options.bodyContainer);
        var footer = $(options.footerContainer);
        var messageContainer = $(options.messageContainer);
        var confirmButton = $(options.confirmButton);
        var cancelButton = $(options.cancelButton);

        var close = function() {
            modal.modal('hide');
        };
        // Append header
        if (options.title && options.showHeader) {
            title.append(options.title);
            if (options.showHeaderCloseButton) {
                header.append(options.headerCloseButton);
            }
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
            var confirmButtonHtml = null;
            if (options.confirmButtonIcon) {
                confirmButtonHtml = options.confirmButtonIcon;
            }
            if (options.confirmButtonText) {
                confirmButtonHtml = (confirmButtonHtml)
                    ? confirmButtonHtml + ' ' + options.confirmButtonText
                    : options.confirmButtonText;
            }
            confirmButton.html(confirmButtonHtml);
            if (options.confirmButtonClass) {
                confirmButton.addClass(options.confirmButtonClass);
            }
            confirmButton.on('click', function() {
                if (options.onConfirm != null) {
                    options.onConfirm.apply(modal);
                    if (options.hideOnConfirm) {
                        modal.modal('hide');
                    }
                }
            });

            var cancelButtonHtml = null;
            if (options.confirmButtonIcon) {
                cancelButtonHtml = options.cancelButtonIcon;
            }
            if (options.confirmButtonText) {
                cancelButtonHtml = (cancelButtonHtml)
                    ? cancelButtonHtml + ' ' + options.cancelButtonText
                    : options.cancelButtonText;
            }
            cancelButton.html(cancelButtonHtml);
            if (options.cancelButtonClass) {
                cancelButton.addClass(options.cancelButtonClass);
            }

            cancelButton.on('click', function() {
                if (options.onCancel != null) {
                    options.onCancel();
                    modal.modal('hide');
                }
            });
            if (options.reverseButtonsOrder) {
                footer.append(cancelButton);
                footer.append(confirmButton);
            } else {
                footer.append(confirmButton);
                footer.append(cancelButton);
            }
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

        // True to show the header close button, false to hide it
        showHeaderCloseButton: true,  
        
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
        
        // Icon to show on confirm button
        confirmButtonIcon: null,
        
        // Display text for confirm button
        confirmButtonText: 'Yes',
        
        // CSSClass for confirm button
        confirmButtonClass: 'btn-primary',
        
        // Cancel button in footer
        cancelButton: '<button class="btn" data-dismiss="modal" aria-hidden="true"></button>',

        // Icon to show on cancel button
        cancelButtonIcon: null,
        
        // Display text for cancel button
        cancelButtonText: 'No',
        
        // CSSClass for cancel button
        cancelButtonClass: null,
        
        // Callback method on confirm button click
        onConfirm:null,
        
        // Callback method on cancel button click
        onCancel: null,
        
        // True to reverse the buttons order. By default confirm button will come left to cancel button. 
        reverseButtonsOrder:false,
    };
    
    $.fn.confirm = function(options) {
        $.confirm(this, options);
        return this;
    };

})(jQuery);