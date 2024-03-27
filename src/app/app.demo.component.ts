// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterOutlet } from '@angular/router';
// import { BlockNoteEditor } from '@blocknote/core';

// type UIElement =
//   | 'formattingToolbar'
//   | 'linkToolbar'
//   | 'imageToolbar'
//   | 'sideMenu'
//   | 'suggestionMenu'
//   | 'tableHandles';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [CommonModule, RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.scss',
// })
// export class AppComponent {
//   editor: HTMLElement;

//   uiElement: UIElement = 'linkToolbar';

//   ngOnInit() {
//     this.initializeEditor();
//   }

//   createButton(text: string, onClick?: () => void) {
//     const element = document.createElement('a');
//     element.href = '#';
//     element.text = text;
//     element.style.margin = '10px';
//     element.style.textDecoration = 'none';

//     if (onClick) {
//       element.addEventListener('click', (e) => {
//         onClick();
//         e.preventDefault();
//       });
//     }

//     return element;
//   }

//   // initializeEditor() {
//   //   const editor = BlockNoteEditor.create();
//   //   editor.mount(document.getElementById('root'));

//   //   let element: HTMLElement | null = null; // Declare element variable outside the event handler

// <-------------sideMenu --------------------->
//   //   editor.sideMenu.onUpdate((sideMenuState) => {
//   //     if (!element) {
//   //       element = document.createElement('div');
//   //       element.style.background = 'gray';
//   //       element.style.position = 'absolute';
//   //       element.style.top = '';
//   //       element.style.padding = '5px';
//   //       element.style.opacity = '0.8';

//   //       const addBtn = this.createButton('+', () => {
//   //         editor.sideMenu.addBlock();
//   //       });
//   //       element.appendChild(addBtn);

//   //       const dragBtn = this.createButton('::', () => {});
//   //       dragBtn.addEventListener('dragstart', editor.sideMenu.blockDragStart);
//   //       dragBtn.addEventListener('dragend', editor.sideMenu.blockDragEnd);
//   //       dragBtn.draggable = true;
//   //       element.style.display = 'none';
//   //       element.appendChild(dragBtn);

//   //       document.getElementById('root')!.appendChild(element);
//   //     }

//   //     if (sideMenuState.show) {
//   //       element.style.display = 'block';
//   //       element.style.top = sideMenuState.referencePos.top + 'px';
//   //       element.style.left =
//   //         sideMenuState.referencePos.x - element.offsetWidth + 'px';
//   //     } else {
//   //       element.style.display = 'none';
//   //     }
//   //   });
//   // }

//   initializeEditor() {
//     const editor = BlockNoteEditor.create();
//     editor.mount(document.getElementById('root'));

//     let sideMenuElement: HTMLElement | null = null;
//     let formattingToolbarElement: HTMLElement | null = null;
//     let linkToolbarElement: HTMLElement | null = null;
//     let imageToolbarElement: HTMLElement | null = null;
//     let suggestionMenuElement: HTMLElement | null = null;
//     let tableHandlesElement: HTMLElement | null = null;
//     // Initialize sideMenu
//     editor.sideMenu.onUpdate((sideMenuState) => {
//       if (!sideMenuElement) {
//         sideMenuElement = document.createElement('div');
//         sideMenuElement.style.background = 'gray';
//         sideMenuElement.style.position = 'absolute';
//         sideMenuElement.style.top = '';
//         sideMenuElement.style.padding = '5px';
//         sideMenuElement.style.opacity = '0.8';

//         // Add button for side menu
//         const addBtn = this.createButton('+', () => {
//           editor.sideMenu.addBlock();
//         });
//         sideMenuElement.appendChild(addBtn);

//         // Add button for dragging blocks
//         const dragBtn = this.createButton('::', () => {});
//         dragBtn.addEventListener('dragstart', editor.sideMenu.blockDragStart);
//         dragBtn.addEventListener('dragend', editor.sideMenu.blockDragEnd);
//         dragBtn.draggable = true;
//         sideMenuElement.style.display = 'none';
//         sideMenuElement.appendChild(dragBtn);

//         document.getElementById('root')!.appendChild(sideMenuElement);
//       }

//       if (sideMenuState.show) {
//         sideMenuElement.style.display = 'block';
//         sideMenuElement.style.top = sideMenuState.referencePos.top + 'px';
//         sideMenuElement.style.left =
//           sideMenuState.referencePos.x - sideMenuElement.offsetWidth + 'px';
//       } else {
//         sideMenuElement.style.display = 'none';
//       }
//     });

// // Initialize formattingToolbar
// editor.formattingToolbar.onUpdate((formattingToolbarState) => {
//   if (!formattingToolbarElement) {
//     formattingToolbarElement = document.createElement('div');
//     formattingToolbarElement.style.background = 'lightgray';
//     formattingToolbarElement.style.position = 'absolute';
//     formattingToolbarElement.style.top = '50px'; // Adjust as needed
//     formattingToolbarElement.style.padding = '5px';
//     formattingToolbarElement.style.opacity = '0.8';

//     // Add buttons for formatting options
//     const boldBtn = this.createButton('B', () => {
//       editor.formattingToolbar.toggleBold();
//     });
//     formattingToolbarElement.appendChild(boldBtn);

//     const italicBtn = this.createButton('I', () => {
//       editor.formattingToolbar.toggleItalic();
//     });
//     formattingToolbarElement.appendChild(italicBtn);

//     // Add more buttons for other formatting options as needed

//     document.getElementById('root')!.appendChild(formattingToolbarElement);
//   }

//   if (formattingToolbarState.show) {
//     formattingToolbarElement.style.display = 'block';
//     formattingToolbarElement.style.left =
//       formattingToolbarState.referencePos.x + 'px';
//   } else {
//     formattingToolbarElement.style.display = 'none';
//   }
// });

//     // Initialize linkToolbar
//     editor.linkToolbar.onUpdate((linkToolbarState) => {
//       if (!linkToolbarElement) {
//         linkToolbarElement = document.createElement('div');
//         linkToolbarElement.style.background = 'lightblue';
//         linkToolbarElement.style.position = 'absolute';
//         linkToolbarElement.style.top = '100px'; // Adjust as needed
//         linkToolbarElement.style.padding = '5px';
//         linkToolbarElement.style.opacity = '0.8';

//         // Add input field for URL
//         const urlInput = document.createElement('input');
//         urlInput.type = 'text';
//         urlInput.placeholder = 'Enter URL';
//         linkToolbarElement.appendChild(urlInput);

//         // Add button for creating link
//         const createLinkBtn = this.createButton('Add Link', () => {
//           const url = urlInput.value.trim();
//           if (url !== '') {
//             editor.linkToolbar.addLink(url);
//           }
//           urlInput.value = ''; // Clear input after adding link
//         });
//         linkToolbarElement.appendChild(createLinkBtn);

//         document.getElementById('root')!.appendChild(linkToolbarElement);
//       }

//       if (linkToolbarState.show) {
//         linkToolbarElement.style.display = 'block';
//         linkToolbarElement.style.left = linkToolbarState.referencePos.x + 'px';
//       } else {
//         linkToolbarElement.style.display = 'none';
//       }
//     });

//     // Initialize imageToolbar
//     editor.imageToolbar.onUpdate((imageToolbarState) => {
//       if (!imageToolbarElement) {
//         imageToolbarElement = document.createElement('div');
//         imageToolbarElement.style.background = 'lightgreen';
//         imageToolbarElement.style.position = 'absolute';
//         imageToolbarElement.style.top = '150px'; // Adjust as needed
//         imageToolbarElement.style.padding = '5px';
//         imageToolbarElement.style.opacity = '0.8';

//         // Add input field for image URL
//         const imageUrlInput = document.createElement('input');
//         imageUrlInput.type = 'text';
//         imageUrlInput.placeholder = 'Enter Image URL';
//         imageToolbarElement.appendChild(imageUrlInput);

//         // Add button for adding image
//         const addImageBtn = this.createButton('Add Image', () => {
//           const imageUrl = imageUrlInput.value.trim();
//           if (imageUrl !== '') {
//             editor.imageToolbar.addImage(imageUrl);
//           }
//           imageUrlInput.value = ''; // Clear input after adding image
//         });
//         imageToolbarElement.appendChild(addImageBtn);

//         document.getElementById('root')!.appendChild(imageToolbarElement);
//       }

//       if (imageToolbarState.show) {
//         imageToolbarElement.style.display = 'block';
//         imageToolbarElement.style.left =
//           imageToolbarState.referencePos.x + 'px';
//       } else {
//         imageToolbarElement.style.display = 'none';
//       }
//     });

//     // Initialize suggestionMenu
//     editor.suggestionMenu.onUpdate((suggestionMenuState) => {
//       if (!suggestionMenuElement) {
//         suggestionMenuElement = document.createElement('div');
//         suggestionMenuElement.style.background = 'lightyellow';
//         suggestionMenuElement.style.position = 'absolute';
//         suggestionMenuElement.style.top = '200px'; // Adjust as needed
//         suggestionMenuElement.style.padding = '5px';
//         suggestionMenuElement.style.opacity = '0.8';

//         // Add suggestions (Assuming suggestionMenuState.suggestions is an array)
//         suggestionMenuState.suggestions.forEach((suggestion) => {
//           const suggestionBtn = this.createButton(suggestion.text, () => {
//             // Implement action to apply suggestion
//             suggestion.action();
//           });
//           suggestionMenuElement.appendChild(suggestionBtn);
//         });

//         document.getElementById('root')!.appendChild(suggestionMenuElement);
//       }

//       if (suggestionMenuState.show) {
//         suggestionMenuElement.style.display = 'block';
//         suggestionMenuElement.style.left =
//           suggestionMenuState.referencePos.x + 'px';
//       } else {
//         suggestionMenuElement.style.display = 'none';
//       }
//     });

//     // Initialize tableHandles
//     editor.tableHandles.onUpdate((tableHandlesState) => {
//       if (!tableHandlesElement) {
//         tableHandlesElement = document.createElement('div');
//         tableHandlesElement.style.background = 'lightgrey';
//         tableHandlesElement.style.position = 'absolute';
//         tableHandlesElement.style.opacity = '0.8';

//         // Add buttons for table operations
//         const addRowBtn = this.createButton('Add Row', () => {
//           editor.tableHandles.addRow();
//         });
//         tableHandlesElement.appendChild(addRowBtn);

//         const addColumnBtn = this.createButton('Add Column', () => {
//           editor.tableHandles.addColumn();
//         });
//         tableHandlesElement.appendChild(addColumnBtn);

//         document.getElementById('root')!.appendChild(tableHandlesElement);
//       }

//       if (tableHandlesState.show) {
//         tableHandlesElement.style.display = 'block';
//         tableHandlesElement.style.top =
//           tableHandlesState.referencePos.top + 'px';
//         tableHandlesElement.style.left =
//           tableHandlesState.referencePos.left + 'px';
//       } else {
//         tableHandlesElement.style.display = 'none';
//       }
//     });
//   }
// }

// // let formattingToolbarElement: HTMLElement | null = null;

// // <-------------formattingToolbar --------------------->
// // editor.formattingToolbar.onUpdate((formattingToolbarState) => {
// //   if (!formattingToolbarElement) {
// //     formattingToolbarElement = document.createElement('div');
// //     formattingToolbarElement.style.background = 'lightgray';
// //     formattingToolbarElement.style.position = 'absolute';
// //     formattingToolbarElement.style.top = '';
// //     formattingToolbarElement.style.padding = '5px';
// //     formattingToolbarElement.style.opacity = '0.8';

// //     // Add buttons for different formatting options
// //     const boldBtn = this.createButton('B', () => {
// //       editor.formattingToolbar.toggleBold();
// //     });
// //     formattingToolbarElement.appendChild(boldBtn);

// //     const italicBtn = this.createButton('I', () => {
// //       editor.formattingToolbar.toggleItalic();
// //     });
// //     formattingToolbarElement.appendChild(italicBtn);

// //     const underlineBtn = this.createButton('U', () => {
// //       editor.formattingToolbar.toggleUnderline();
// //     });
// //     formattingToolbarElement.appendChild(underlineBtn);

// //     // Add more buttons for other formatting options as needed

// //     document.getElementById('root')!.appendChild(formattingToolbarElement);
// //   }

// //   if (formattingToolbarState.show) {
// //     formattingToolbarElement.style.display = 'block';
// //     formattingToolbarElement.style.top =
// //       formattingToolbarState.referencePos.top + 'px';
// //     formattingToolbarElement.style.left =
// //       formattingToolbarState.referencePos.x + 'px'; // Adjust positioning as necessary
// //   } else {
// //     formattingToolbarElement.style.display = 'none';
// //   }
// // });
// //   }
// // }
