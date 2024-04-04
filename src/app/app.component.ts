import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  BlockNoteEditor,
  SuggestionMenuState,
  suggestionMenuPluginKey,
} from '@blocknote/core';
import { SuggestionMenu } from '@blocknote/react';

type UIElement =
  | 'formattingToolbar'
  | 'linkToolbar'
  | 'imageToolbar'
  | 'sideMenu'
  | 'suggestionMenus'
  | 'tableHandles';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  editor: BlockNoteEditor;

  uiElement: UIElement = 'linkToolbar';

  ngOnInit() {
    this.initializeEditor();
  }

  createButton(text: string, onClick?: () => void) {
    const element = document.createElement('a');
    element.href = '#';
    element.innerHTML = text;

    element.style.margin = '10px';
    element.style.textDecoration = 'none';
    element.style.fontSize = '1.2rem';
    element.style.fontWeight = '300';
    element.style.color = '#777';

    if (onClick) {
      element.addEventListener('click', (e) => {
        onClick();
        e.preventDefault();
      });
    }

    return element;
  }
  createFormattingButton(text: string, onClick?: () => void) {
    const element = document.createElement('a');
    element.href = '#';
    element.innerHTML = text;

    element.style.margin = '10px';
    element.style.textDecoration = 'none';
    element.style.fontSize = '1rem';
    element.style.fontWeight = '600';
    element.style.color = '#999';

    if (onClick) {
      element.addEventListener('click', (e) => {
        onClick();
        e.preventDefault();
      });
    }

    return element;
  }

  // link btn
  createLinkBtn(text: string, onLinkSet?: (url: string) => void) {
    const element = document.createElement('button'); // Changed to button element
    element.innerHTML = text;

    element.style.margin = '10px';
    element.style.fontSize = '1rem';
    element.style.fontWeight = '600';
    element.style.color = '#999';
    element.style.border = 'none';
    element.style.background = 'none';
    element.style.cursor = 'pointer';

    if (onLinkSet) {
      element.addEventListener('click', (e) => {
        e.preventDefault();
        const span = document.createElement('span');
        span.style.display = 'block';
        span.style.marginTop = '10px';
        span.style.position = 'absolute';
        span.style.top = '0';
        span.style.left = '0';
        span.style.right = '0';
        span.style.bottom = '0';
        span.style.background = 'transparent';
        span.style.outline = 'none';
        // span.style.outline = 'none';
        span.style.transform = 'translate(50%, 15%)';
        const input = document.createElement('input');
        input.style.background = 'transparent';
        input.style.color = '#999';
        input.style.padding = '5px';
        input.style.fontWeight = '600';

        input.style.outline = 'none';
        input.type = 'text';
        input.placeholder = 'Enter URL and press Enter';
        input.style.width = '200px';
        input.style.marginRight = '10px';
        const button = document.createElement('button');
        button.innerHTML = 'Cancel';
        button.style.background = 'transparent';
        button.style.color = '#999';
        button.style.outline = 'none';
        button.style.border = '0.5px solid #ccc';
        button.style.borderRadius = '2px';
        button.style.padding = '5px';

        button.addEventListener('click', () => {
          span.remove();
        });
        input.addEventListener('keyup', (e) => {
          if (e.key === 'Enter') {
            onLinkSet(input.value);
            span.remove();
          }
        });
        span.appendChild(input);
        span.appendChild(button);
        document.body.appendChild(span);
      });
    }

    return element;
  }

  createSelect(
    options: { text: string; value: string; propType?: number }[],
    onChange?: (value: string, propType?: number) => void
  ) {
    const element = document.createElement('select');
    element.style.padding = '3px';
    element.style.background = 'transparent';
    element.style.outline = 'none';
    element.style.border = 'none';
    element.style.fontSize = '1rem';
    element.style.fontWeight = '600';
    element.style.color = '#999';

    options.forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.innerHTML = option.text;
      optionElement.style.background = '#1f1f1f';
      optionElement.style.color = '#999';
      optionElement.style.borderRadius = '15px';
      optionElement.style.fontSize = '0.8rem';

      optionElement.value = option.value;
      if (option.propType !== undefined) {
        optionElement.setAttribute('data-propType', option.propType.toString());
      }
      element.appendChild(optionElement);
    });

    if (onChange) {
      element.addEventListener('change', (event) => {
        const selectedOption = event.target as HTMLSelectElement;
        const value = selectedOption.value;
        const propType =
          selectedOption.selectedOptions[0]?.getAttribute('data-propType');
        onChange(value, propType ? parseInt(propType, 10) : undefined);
      });
    }

    return element;
  }
  // createSuggestionMenus(
  //   options: { text: string; value: string; propType?: number }[],
  //   onClick?: (value: string, propType?: number) => void
  // ) {
  //   const element = document.createElement('div');
  //   element.style.padding = '3px';
  //   element.style.background = 'transparent';
  //   element.style.outline = 'none';
  //   element.style.border = 'none';
  //   element.style.fontSize = '1rem';
  //   element.style.fontWeight = '600';
  //   element.style.color = '#999';

  //   options.forEach((option) => {
  //     const optionElement = document.createElement('option');
  //     optionElement.innerHTML = option.text;
  //     optionElement.style.background = '#000';
  //     optionElement.style.color = '#999';
  //     optionElement.style.borderRadius = '15px';
  //     optionElement.style.fontSize = '0.8rem';

  //     optionElement.innerText = option.value;
  //     if (option.propType !== undefined) {
  //       optionElement.setAttribute('data-propType', option.propType.toString());
  //     }
  //     element.appendChild(optionElement);
  //   });

  //   if (onClick) {
  //     element.addEventListener('click', (event) => {
  //       const selectedOption = event.target as HTMLSelectElement;
  //       const value = selectedOption.innerText;
  //       const propType =
  //         selectedOption.selectedOptions[0]?.getAttribute('data-propType');
  //       onClick(value, propType ? parseInt(propType, 10) : undefined);
  //     });
  //   }

  //   return element;
  // }

  createSuggestionMenus(
    options: { text: string; value: string; propType?: number }[],
    onClick?: (value: string, propType?: number) => void
  ) {
    const element = document.createElement('div');
    element.style.display = 'flex';
    element.style.flexDirection = 'column';
    element.style.alignItems = 'center';
    element.style.justifyContent = 'center';
    element.style.gap = '10px';
    element.style.padding = '30px';
    element.style.background = 'transparent';
    element.style.outline = 'none';
    element.style.border = 'none';
    element.style.fontSize = '1rem';
    element.style.fontWeight = '600';
    element.style.color = '#999';

    options.forEach((option) => {
      const optionElement = document.createElement('div');
      optionElement.innerHTML = option.text;
      optionElement.style.display = 'flex';
      optionElement.style.minWidth = '300px';
      optionElement.style.alignItems = 'center';
      optionElement.style.justifyContent = 'space-between';
      optionElement.style.background = '#1f1f1f';
      optionElement.style.color = '#999';
      // optionElement.style.borderRadius = '3px';
      optionElement.style.fontSize = '1.5rem';
      optionElement.style.cursor = 'pointer';
      optionElement.style.borderBottom = '0.1px dashed   #ccc';
      optionElement.style.paddingBottom = '10px';

      optionElement.addEventListener('click', () => {
        onClick && onClick(option.value, option.propType);
        // onClick && this.editor.suggestionMenus.closeMenu();
      });

      element.appendChild(optionElement);
    });

    return element;
  }

  initializeEditor() {
    const editor = BlockNoteEditor.create();
    this.editor = editor;
    editor.mount(document.getElementById('root'));

    let sideMenuElement: HTMLElement | null = null;
    let formattingToolbarElement: HTMLElement | null = null;
    let linkToolbarElement: HTMLElement | null = null;
    let imageToolbarElement: HTMLElement | null = null;
    let suggestionMenuElement: HTMLElement | null = null;
    let tableHandlesElement: HTMLElement | null = null;

    // Initialize sideMenu
    editor.sideMenu.onUpdate((sideMenuState) => {
      if (!sideMenuElement) {
        sideMenuElement = document.createElement('div');
        sideMenuElement.style.background = 'transparent';
        sideMenuElement.style.width = 'fit-content';

        sideMenuElement.style.display = 'flex';
        sideMenuElement.style.alignItems = 'center';
        sideMenuElement.style.justifyContent = 'center';
        sideMenuElement.style.position = 'absolute';
        sideMenuElement.style.top = '40px';
        sideMenuElement.style.marginTop = '0px';
        sideMenuElement.style.padding = '5px ';
        sideMenuElement.style.opacity = '0.8';

        // Add button for side menu Plus
        const addBtn = this.createButton(
          '<i class="fa-solid fa-plus"></i>',
          () => {
            editor.sideMenu.addBlock();
          }
        );
        sideMenuElement.appendChild(addBtn);

        // Add button for dragging blocks
        const dragBtn = this.createButton(
          '<i class="fa-solid fa-grip-vertical"></i>',
          () => {}
        );
        dragBtn.addEventListener('dragstart', editor.sideMenu.blockDragStart);
        dragBtn.addEventListener('dragend', editor.sideMenu.blockDragEnd);
        dragBtn.draggable = true;
        sideMenuElement.style.display = 'none';
        sideMenuElement.appendChild(dragBtn);

        document.getElementById('root')!.appendChild(sideMenuElement);
      }

      if (sideMenuState.show) {
        sideMenuElement.style.display = 'block';
        sideMenuElement.style.top = sideMenuState.referencePos.top + 'px';
        sideMenuElement.style.left =
          sideMenuState.referencePos.x - sideMenuElement.offsetWidth + 'px';
      } else {
        sideMenuElement.style.display = 'none';
      }
    });

    // Initialize formattingToolbar
    editor.formattingToolbar.onUpdate((formattingToolbarState) => {
      if (!formattingToolbarElement) {
        formattingToolbarElement = document.createElement('div');
        formattingToolbarElement.style.background = '#1f1f1f';
        formattingToolbarElement.style.position = 'absolute';
        formattingToolbarElement.style.top = '50px';
        formattingToolbarElement.style.padding = '0';
        // formattingToolbarElement.style.opacity = '0.8';
        formattingToolbarElement.style.border = '0.5px solid #ccc';
        formattingToolbarElement.style.borderRadius = '10px';
        formattingToolbarElement.style.boxShadow =
          '1px 0px 8px -1px rgba(0,0,0,0.75);';

        //  text change para - to heading
        const changeParaSelect = this.createSelect(
          [
            { text: 'T Paragraph', value: 'paragraph' },
            { text: 'T Heading 1', value: 'heading', propType: 1 },
            { text: 'T Heading 2', value: 'heading', propType: 2 },
            { text: 'T Heading 3', value: 'heading', propType: 3 },
            { text: 'T Bullet list', value: 'bulletListItem' },
            { text: 'T Number list', value: 'numberedListItem' },
          ],
          (
            value:
              | 'paragraph'
              | 'heading'
              | 'bulletListItem'
              | 'numberedListItem',
            propType: 3 | 2 | 1
          ) => {
            // console.log(value);
            const blockToUpdate = editor.getSelection().blocks[0].id;
            if (propType !== undefined && propType !== null) {
              editor.updateBlock(blockToUpdate, {
                type: 'heading',
                props: {
                  level: propType,
                },
              });
            } else {
              editor.updateBlock(blockToUpdate, { type: value });
            }
          }
        );

        formattingToolbarElement.appendChild(changeParaSelect);

        // Add buttons for formatting options
        //bold
        const boldBtn = this.createFormattingButton(
          '<i class="fa-solid fa-bold"></i>',
          () => {
            editor.toggleStyles({ bold: true });
            console.log(editor.getActiveStyles());
          }
        );
        formattingToolbarElement.appendChild(boldBtn);
        // italicred
        const italicBtn = this.createFormattingButton(
          '<i class="fa-solid fa-italic"></i>',
          () => {
            editor.toggleStyles({ italic: true });
          }
        );
        formattingToolbarElement.appendChild(italicBtn);
        // underline
        const underlineBtn = this.createFormattingButton(
          '<i class="fa-solid fa-underline"></i>',
          () => {
            editor.toggleStyles({ underline: true });
          }
        );
        formattingToolbarElement.appendChild(underlineBtn);
        // strike through
        const strikethroughBtn = this.createFormattingButton(
          '<i class="fa-solid fa-strikethrough"></i>',
          () => {
            editor.toggleStyles({ strike: true });
          }
        );

        formattingToolbarElement.appendChild(strikethroughBtn);

        // align left btn
        const alignLeftBtn = this.createFormattingButton(
          '<i class="fa-solid fa-align-left"></i>',
          () => {
            console.log(editor.getSelection().blocks);
            const blockToUpdate = editor.getSelection().blocks[0].id;
            editor.updateBlock(blockToUpdate, {
              props: { textAlignment: 'left' },
            });
          }
        );
        formattingToolbarElement.appendChild(alignLeftBtn);
        // align center btn
        const alignCenterBtn = this.createFormattingButton(
          '<i class="fa-solid fa-align-center"></i>',
          () => {
            console.log(editor.getSelection().blocks);
            const blockToUpdate = editor.getSelection().blocks[0].id;
            editor.updateBlock(blockToUpdate, {
              props: { textAlignment: 'center' },
            });
          }
        );
        formattingToolbarElement.appendChild(alignCenterBtn);
        // align right btn
        const alignRightBtn = this.createFormattingButton(
          '<i class="fa-solid fa-align-right"></i>',
          () => {
            console.log(editor.getSelection().blocks);
            const blockToUpdate = editor.getSelection().blocks[0].id;
            editor.updateBlock(blockToUpdate, {
              props: { textAlignment: 'right' },
            });
          }
        );
        formattingToolbarElement.appendChild(alignRightBtn);
        // color btns
        const colorSelect = this.createSelect(
          [
            { text: 'A', value: '' },
            { text: 'Gray', value: 'gray' },
            { text: 'Brown', value: 'brown' },
            { text: 'Red', value: 'red' },
            { text: 'Orange', value: 'orange' },
            { text: 'Yellow', value: 'yellow' },
            { text: 'Green', value: 'green' },
            { text: 'Blue', value: 'blue' },
            { text: 'Purple', value: 'purple' },
            { text: 'Pink', value: 'pink' },
          ],
          (value) => {
            editor.toggleStyles({ textColor: value });
          }
        );

        formattingToolbarElement.appendChild(colorSelect);

        // set link
        const setLink = this.createLinkBtn(
          '<i class="fa-solid fa-link"></i>',
          (url) => {
            // console.log(url);
            const text = editor.getSelectedText();
            editor.createLink(url, text);
          }
        );
        formattingToolbarElement.appendChild(setLink);
        // nest block
        const setNest = this.createFormattingButton(
          '<i class="fa-solid fa-indent"></i>',
          () => {
            // const currentBlock = editor.getSelection().blocks[0];

            const canNest = editor.canNestBlock();
            if (canNest) {
              editor.nestBlock();
            }
            console.log(editor.nestBlock());
          }
        );
        formattingToolbarElement.appendChild(setNest);
        // unnest block
        const setUnNest = this.createFormattingButton(
          '<i class="fa-solid fa-outdent"></i>',
          () => {
            // const currentBlock = editor.getSelection().blocks[0];
            editor.unnestBlock();
            // console.log(editor.nestBlock());
          }
        );
        formattingToolbarElement.appendChild(setUnNest);

        document.getElementById('root')!.appendChild(formattingToolbarElement);
      }

      if (formattingToolbarState.show) {
        formattingToolbarElement.style.display = 'block';
        formattingToolbarElement.style.left =
          formattingToolbarState.referencePos.x + 'px';
      } else {
        formattingToolbarElement.style.display = 'none';
      }
    });

    //  suggestionMenu
    // editor.suggestionMenus.onUpdate('/', (state: SuggestionMenuState) => {
    //   console.log('/ is pressed !');
    //   if (!suggestionMenuElement) {
    //     console.log('if block execute');
    //     suggestionMenuElement = document.createElement('div');
    //     suggestionMenuElement.setAttribute('id', 'suggestionMenuElement');
    //     console.log(suggestionMenuElement.id);
    //     suggestionMenuElement.style.background = '#1f1f1f';
    //     suggestionMenuElement.style.maxWidth = 'fit-content';
    //     suggestionMenuElement.style.maxHeight = 'fit-content';
    //     // suggestionMenuElement.style.position = 'absolute';
    //     suggestionMenuElement.style.position = 'relative';
    //     suggestionMenuElement.style.top = '0';
    //     suggestionMenuElement.style.bottom = '0';
    //     suggestionMenuElement.style.right = '0';
    //     suggestionMenuElement.style.left = '0';
    //     // suggestionMenuElement.style.margin = 'auto 10%';

    //     suggestionMenuElement.style.padding = '0';
    //     suggestionMenuElement.style.border = '0.5px solid #ccc';
    //     suggestionMenuElement.style.borderRadius = '10px';
    //     suggestionMenuElement.style.boxShadow =
    //       '1px 0px 8px -1px rgba(0,0,0,0.75);';

    //     const changeSuggestionElement = this.createSuggestionMenus(
    //       [
    //         // { text: 'T Paragraph', value: 'paragraph' },
    //         // { text: 'T Heading 1', value: 'heading', propType: 1 },
    //         // { text: 'T Heading 2', value: 'heading', propType: 2 },
    //         // { text: 'T Heading 3', value: 'heading', propType: 3 },
    //         // { text: 'T Bullet list', value: 'bulletListItem' },
    //         // { text: 'T Number list', value: 'numberedListItem' },
    //         // below code looks like above just for styling.
    //         {
    //           text: '<span>H1 </span> <span>Heading 1</span>',
    //           value: 'heading',
    //           propType: 1,
    //         },
    //         {
    //           text: ' <span>H2 </span> <span>Heading 2 </span>',
    //           value: 'heading',
    //           propType: 2,
    //         },
    //         {
    //           text: '  <span>H3 </span> <span>Heading 3 </span>',
    //           value: 'heading',
    //           propType: 3,
    //         },
    //         {
    //           text: '<span><i class="fa-solid fa-t"></i></span> <span>Paragraph</span>',
    //           value: 'paragraph',
    //         },
    //         {
    //           text: '<span><i class="fa-solid fa-list"></i></span> <span>Bullet list</span> ',
    //           value: 'bulletListItem',
    //         },
    //         {
    //           text: '<span><i class="fa-solid fa-list-ol"></i></span> <span>Number list</span>  ',
    //           value: 'numberedListItem',
    //         },
    //       ],
    //       (
    //         value:
    //           | 'paragraph'
    //           | 'heading'
    //           | 'bulletListItem'
    //           | 'numberedListItem',
    //         propType: 3 | 2 | 1
    //       ) => {
    //         const allBlockArray = editor.document;
    //         const len = allBlockArray.length;
    //         const blockToUpdate = allBlockArray[len - 1];
    //         // console.log(lastBlock);

    //         // const blockToUpdate = editor.getSelection().blocks[0].id;
    //         if (propType !== undefined && propType !== null) {
    //           editor.updateBlock(blockToUpdate, {
    //             type: 'heading',
    //             props: {
    //               level: propType,
    //             },
    //           });
    //         } else {
    //           editor.updateBlock(blockToUpdate, { type: value });
    //         }
    //         console.log('invoked ');
    //         console.log(state.show);
    //         // if (state.show) {
    //         //   suggestionMenuElement.style.display = 'block';
    //         //   // suggestionMenuElement.style.left = state.referencePos.x + 'px';
    //         //   // console.log(state);
    //         // } else {
    //         //   suggestionMenuElement.style.display = 'none';
    //         // }
    //       }
    //     );

    //     suggestionMenuElement.appendChild(changeSuggestionElement);

    //     document.getElementById('root')!.appendChild(suggestionMenuElement);

    //     console.log(state.show);
    //     if (state.show) {
    //       suggestionMenuElement.style.display = 'block';
    //       suggestionMenuElement.style.left = state.referencePos.x + 'px';
    //       // console.log(state);
    //     } else {
    //       suggestionMenuElement.style.display = 'none';
    //     }
    //   }
    //   // else {
    //   //   console.log('else block execute');

    //   //   console.log('already created !');
    //   //   console.log(state.show);
    //   //   if (state.show) {
    //   //     suggestionMenuElement.style.display = 'block';
    //   //     suggestionMenuElement.style.left = state.referencePos.x + 'px';
    //   //     // console.log(state);
    //   //   } else {
    //   //     suggestionMenuElement.style.display = 'none';
    //   //   }
    //   // }
    // });
    // editor.suggestionMenus.onUpdate('/', (state: SuggestionMenuState) => {
    //   console.log('/ is triggered');
    //   if (!suggestionMenuElement) {
    //     suggestionMenuElement = document.createElement('div');
    //     suggestionMenuElement.setAttribute('id', 'suggestionMenuElement');
    //     suggestionMenuElement.style.background = '#1f1f1f';
    //     suggestionMenuElement.style.maxWidth = 'fit-content';
    //     suggestionMenuElement.style.maxHeight = 'fit-content';
    //     // suggestionMenuElement.style.position = 'absolute';
    //     suggestionMenuElement.style.position = 'relative';
    //     suggestionMenuElement.style.top = '0';
    //     suggestionMenuElement.style.bottom = '0';
    //     suggestionMenuElement.style.right = '0';
    //     suggestionMenuElement.style.left = '0';
    //     // suggestionMenuElement.style.margin = 'auto 10%';

    //     suggestionMenuElement.style.padding = '0';
    //     suggestionMenuElement.style.border = '0.5px solid #ccc';
    //     suggestionMenuElement.style.borderRadius = '10px';
    //     suggestionMenuElement.style.boxShadow =
    //       '1px 0px 8px -1px rgba(0,0,0,0.75);';

    //     const changeSuggestionElement = this.createSuggestionMenus(
    //       [
    //         // { text: 'T Paragraph', value: 'paragraph' },
    //         // { text: 'T Heading 1', value: 'heading', propType: 1 },
    //         // { text: 'T Heading 2', value: 'heading', propType: 2 },
    //         // { text: 'T Heading 3', value: 'heading', propType: 3 },
    //         // { text: 'T Bullet list', value: 'bulletListItem' },
    //         // { text: 'T Number list', value: 'numberedListItem' },
    //         // below code looks like above just for styling.
    //         {
    //           text: '<span>H1 </span> <span>Heading 1</span>',
    //           value: 'heading',
    //           propType: 1,
    //         },
    //         {
    //           text: ' <span>H2 </span> <span>Heading 2 </span>',
    //           value: 'heading',
    //           propType: 2,
    //         },
    //         {
    //           text: '  <span>H3 </span> <span>Heading 3 </span>',
    //           value: 'heading',
    //           propType: 3,
    //         },
    //         {
    //           text: '<span><i class="fa-solid fa-t"></i></span> <span>Paragraph</span>',
    //           value: 'paragraph',
    //         },
    //         {
    //           text: '<span><i class="fa-solid fa-list"></i></span> <span>Bullet list</span> ',
    //           value: 'bulletListItem',
    //         },
    //         {
    //           text: '<span><i class="fa-solid fa-list-ol"></i></span> <span>Number list</span>  ',
    //           value: 'numberedListItem',
    //         },
    //       ],
    //       (
    //         value:
    //           | 'paragraph'
    //           | 'heading'
    //           | 'bulletListItem'
    //           | 'numberedListItem',
    //         propType: 3 | 2 | 1
    //       ) => {
    //         const allBlockArray = editor.document;
    //         const len = allBlockArray.length;
    //         const blockToUpdate = allBlockArray[len - 1];
    //         // console.log(lastBlock);

    //         // const blockToUpdate = editor.getSelection().blocks[0].id;
    //         if (propType !== undefined && propType !== null) {
    //           editor.updateBlock(blockToUpdate, {
    //             type: 'heading',
    //             props: {
    //               level: propType,
    //             },
    //           });
    //         } else {
    //           editor.updateBlock(blockToUpdate, { type: value });
    //         }
    //         console.log('invoked ');
    //         console.log(state.show);
    //         // if (state.show) {
    //         //   suggestionMenuElement.style.display = 'block';
    //         //   // suggestionMenuElement.style.left = state.referencePos.x + 'px';
    //         //   // console.log(state);
    //         // } else {
    //         //   suggestionMenuElement.style.display = 'none';
    //         // }
    //       }
    //     );

    //     suggestionMenuElement.appendChild(changeSuggestionElement);

    //     document.getElementById('root')!.appendChild(suggestionMenuElement);

    //     console.log('if block state ' + state.show);
    //     // if (state.show) {
    //     //   suggestionMenuElement.style.display = 'block';
    //     //   suggestionMenuElement.style.left = state.referencePos.x + 'px';
    //     //   // console.log(state);
    //     // } else {
    //     //   suggestionMenuElement.style.display = 'none';
    //     // }
    //   } else {
    //     console.log('already created !');
    //     console.log('if block state ' + state.show);

    //     // if (state.show) {
    //     //   suggestionMenuElement.style.display = 'block';
    //     //   suggestionMenuElement.style.left = state.referencePos.x + 'px';
    //     //   // console.log(state);
    //     // } else {
    //     //   suggestionMenuElement.style.display = 'none';
    //     // }
    //   }
    // });

    editor.suggestionMenus.onUpdate('/', (state: SuggestionMenuState) => {
      console.log('/ is triggered');
      if (!suggestionMenuElement) {
        suggestionMenuElement = document.createElement('div');
        suggestionMenuElement.setAttribute('id', 'suggestionMenuElement');
        suggestionMenuElement.style.background = '#1f1f1f';
        suggestionMenuElement.style.maxWidth = 'fit-content';
        suggestionMenuElement.style.maxHeight = 'fit-content';
        suggestionMenuElement.style.position = 'relative';
        suggestionMenuElement.style.top = '0';
        suggestionMenuElement.style.bottom = '0';
        suggestionMenuElement.style.right = '0';
        suggestionMenuElement.style.left = '0';
        suggestionMenuElement.style.padding = '0';
        suggestionMenuElement.style.border = '0.5px solid #ccc';
        suggestionMenuElement.style.borderRadius = '10px';
        suggestionMenuElement.style.boxShadow =
          '1px 0px 8px -1px rgba(0,0,0,0.75)';

        const changeSuggestionElement = document.createElement('div');
        changeSuggestionElement.style.display = 'flex';
        changeSuggestionElement.style.flexDirection = 'column';
        changeSuggestionElement.style.alignItems = 'center';
        changeSuggestionElement.style.justifyContent = 'center';
        changeSuggestionElement.style.gap = '10px';
        changeSuggestionElement.style.padding = '30px';
        changeSuggestionElement.style.background = 'transparent';
        changeSuggestionElement.style.outline = 'none';
        changeSuggestionElement.style.border = 'none';
        changeSuggestionElement.style.fontSize = '1rem';
        changeSuggestionElement.style.fontWeight = '600';
        changeSuggestionElement.style.color = '#999';

        const options = [
          {
            text: '<span>H1 </span> <span>Heading 1</span>',
            value: 'heading',
            propType: 1,
          },
          {
            text: ' <span>H2 </span> <span>Heading 2 </span>',
            value: 'heading',
            propType: 2,
          },
          {
            text: '  <span>H3 </span> <span>Heading 3 </span>',
            value: 'heading',
            propType: 3,
          },
          {
            text: '<span><i class="fa-solid fa-t"></i></span> <span>Paragraph</span>',
            value: 'paragraph',
          },
          {
            text: '<span><i class="fa-solid fa-list"></i></span> <span>Bullet list</span> ',
            value: 'bulletListItem',
          },
          {
            text: '<span><i class="fa-solid fa-list-ol"></i></span> <span>Number list</span>  ',
            value: 'numberedListItem',
          },
        ];

        options.forEach((option: any) => {
          const optionElement = document.createElement('div');
          optionElement.innerHTML = option.text;
          optionElement.style.display = 'flex';
          optionElement.style.minWidth = '300px';
          optionElement.style.alignItems = 'center';
          optionElement.style.justifyContent = 'space-between';
          optionElement.style.background = '#1f1f1f';
          optionElement.style.color = '#999';
          optionElement.style.fontSize = '1.5rem';
          optionElement.style.cursor = 'pointer';
          optionElement.style.borderBottom = '0.1px dashed #ccc';
          optionElement.style.paddingBottom = '10px';
          optionElement.addEventListener('click', () => {
            const allBlockArray = editor.document;
            const len = allBlockArray.length;
            const blockToUpdate = allBlockArray[len - 1];
            if (option.propType !== undefined && option.propType !== null) {
              editor.updateBlock(blockToUpdate, {
                type: 'heading',
                props: {
                  level: option.propType,
                },
              });
            } else {
              editor.updateBlock(blockToUpdate, { type: option.value });
            }
            console.log('invoked ');
            console.log(state.show);
          });
          changeSuggestionElement.appendChild(optionElement);
        });

        suggestionMenuElement.appendChild(changeSuggestionElement);
        document.getElementById('root')!.appendChild(suggestionMenuElement);
      }
      //  else {
      //   console.log('already created !');
      //   // console.log('if block state ' + state.show);
      //   // suggestionMenuElement.remove();
      // }
    });
  }
}
