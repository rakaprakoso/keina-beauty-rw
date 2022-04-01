'use strict';

tinymce.PluginManager.add('example', function (editor, url) {
    var openDialog = function () {
        return editor.windowManager.open({
            title: 'Example plugin',
            body: {
                type: 'panel',
                items: [
                    {
                        type: 'input',
                        name: 'title',
                        label: 'Title'
                    }
                ]
            },
            buttons: [
                {
                    type: 'cancel',
                    text: 'Close'
                },
                {
                    type: 'submit',
                    text: 'Save',
                    primary: true
                }
            ],
            onSubmit: function (api) {
                // var data = api.getData();
                // /* Insert content when the window form is submitted */
                // editor.insertContent('Title: ' + data.title);
                // api.close();

                var accordionSet = [];
                var accordionElement = '';
                var curAccordion = Date.now();
                var accordionCount = parseInt(api.getData().title);
                for (var i = 0; i < accordionCount; i++) {
                    // var panel = '\n                    <div class="panel panel-default">\n                      <div class="panel-heading mceNonEditable productAccordion" role="tab" id="heading' + (curAccordion + i) + '">\n                        <h4 class="panel-title">\n                          <a role="button" data-toggle="collapse" class="mceEditable collapsed" data-parent="#accordion' + curAccordion + '" href="#collapse' + (curAccordion + i) + '" aria-expanded="true" aria-controls="collapse' + (curAccordion + i) + '">\n                            Change this header!\n                          </a>\n                        </h4>\n                      </div>\n                      <div id="collapse' + (curAccordion + i) + '" class="panel-collapse collapse mceNonEditable" role="tabpanel" aria-labelledby="heading' + (curAccordion + i) + '">\n                        <div class="panel-body mceEditable">\n                          <p>Change this content</p>\n                        </div>\n                      </div>\n                    </div>\n                ';
                    // accordionSet.push(panel);
                    var panel2 = '<div><input type="radio" name="tailwind_accordion" id="tab'+i+'" class="accordion__input px-2 py-4 hidden">'
                        + '<label for="tab'+i+'" class="accordion__label">Head</label>'
                        + '<div class="accordion__content">'
                        + '<p>Content</p>'
                        + '</div></div>'
                    accordionElement += panel2
                }

                // var accordion = '\n                    <div class="panel-group" id="accordion' + curAccordion + '" role="tablist" aria-multiselectable="true">\n                      ' + accordionSet.join('') + '\n                  </div>';
                // editor.insertContent(accordion);
                editor.insertContent(accordionElement);
                api.close();
            }
        });
    };
    /* Add a button that opens a window */
    editor.ui.registry.addButton('example', {
        text: 'My button',
        onAction: function () {
            /* Open window */
            openDialog();
        }
    });
    /* Adds a menu item, which can then be included in any menu via the menu/menubar configuration */
    // editor.ui.registry.addMenuItem('example', {
    //     text: 'Example plugin',
    //     onAction: function () {
    //         /* Open window */
    //         openDialog();
    //     }
    // });

    editor.ui.registry.addMenuItem('react-element', {
        text: 'Image',
        onAction: function () {
            console.log('context menu clicked');
            alert('context menu clicked');
        }
    });

    editor.ui.registry.addContextMenu('table', {
        update: function (element) {
            console.log('parent' + element.parentElement.getAttribute('react-element'))
            console.log('sendiri' + element.getAttribute('react-element'))
            return !element.parentElement.getAttribute('react-element') ? '' : 'react-element';
        }
    });

    /* Return the metadata for the help plugin */
    return {
        getMetadata: function () {
            return {
                name: 'Example plugin',
                url: 'http://exampleplugindocsurl.com'
            };
        }
    };
});

//register plugin to process context menu on a specific tag
// tinymce.PluginManager.add('example', function (editor) {
//     var selectedCode
//     // Create a function which returns an array of items, these can be Submenus or Simple Items
//     var contextMenuItems = () => {
//         return [
//             {
//                 type: 'submenu',
//                 text: "Submenu 1",
//                 getSubmenuItems: () => {
//                     if (selectedCode) {
//                         var contextMenuItems = []
//                         $.each(ArrayWithData, (index, data) => {
//                             contextMenuItems.push({
//                                 type: 'item',
//                                 text: `${data}`,
//                                 onAction: () => {
//                                     console.log("Clicked submenu option");
//                                 }
//                             })
//                         })
//                         // return array of contextmenuitems -> this goes to the Submenu
//                         return contextMenuItems
//                     }
//                 }
//             },
//             {
//                 icon: 'remove',
//                 text: 'Remove data',
//                 onAction: () => {
//                     console.log(`Removed data`)
//                 }
//             }

//         ]
//     }

//     // now register the contextmenu
//     editor.ui.registry.addContextMenu('contextmenu', {
//         update: function (element) {
//             //this way you can call contextMenuItems() every time you show the context menu
//             return (element.tagName == "your-condition" && element.className.includes("another condition")) ? contextMenuItems() : ""
//         }
//     });
// });
