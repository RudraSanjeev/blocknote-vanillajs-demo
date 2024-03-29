import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BlockNoteEditor } from '@blocknote/core';

type UIElement =
  | 'formattingToolbar'
  | 'linkToolbar'
  | 'imageToolbar'
  | 'sideMenu'
  | 'suggestionMenu'
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
    element.style.fontSize = '1.8rem';
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
  createSelect(
    options: { text: string; value: string; propType?: number }[],
    onChange?: (value: string, propType?: number) => void
  ) {
    const element = document.createElement('select');
    element.style.padding = '3px';
    element.style.background = 'transparent';
    element.style.outline = 'none';
    element.style.fontSize = '1rem';
    element.style.fontWeight = '600';
    element.style.color = '#999';

    options.forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.innerHTML = option.text;
      optionElement.value = option.value;
      if (option.propType !== undefined) {
        optionElement.setAttribute('data-propType', option.propType.toString());
      }
      element.appendChild(optionElement);
    });

    if (onChange) {
      element.addEventListener('change', (event) => {
        const selectedOption = options.find(
          (option) => option.value === (event.target as HTMLSelectElement).value
        );
        const propType = selectedOption ? selectedOption.propType : undefined;
        onChange((event.target as HTMLSelectElement).value, propType);
      });
    }

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
        sideMenuElement.style.marginTop = '-5px';
        // sideMenuElement.style.padding = '-5px ';
        sideMenuElement.style.opacity = '0.8';

        // Add button for side menu
        const addBtn = this.createButton('+', () => {
          editor.sideMenu.addBlock();
        });
        sideMenuElement.appendChild(addBtn);

        // Add button for dragging blocks
        const dragBtn = this.createButton('::', () => {});
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
        formattingToolbarElement.style.background = '#000';
        formattingToolbarElement.style.position = 'absolute';
        formattingToolbarElement.style.top = '50px';
        formattingToolbarElement.style.padding = '3px';
        formattingToolbarElement.style.opacity = '0.8';
        formattingToolbarElement.style.border = '1px solid #ccc';
        formattingToolbarElement.style.borderRadius = '10px';
        formattingToolbarElement.style.boxShadow =
          '1px 0px 8px -1px rgba(0,0,0,0.75);';

        //  text change para - to heading
        const changeParaSelect = this.createSelect(
          [
            { text: 'T Paragraph', value: 'paragraph' },
            { text: 'T Heading 3', value: 'heading', propType: 3 },
            { text: 'T Heading 1', value: 'heading', propType: 1 },
            { text: 'T Heading 2', value: 'heading', propType: 2 },
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

            // if (value === 'heading') {
            //   console.log(propType);
            //   editor.updateBlock(blockToUpdate, {
            //     type: 'heading',
            //     props: {
            //       level: propType,
            //     },
            //   });
            // } else {
            //   editor.updateBlock(blockToUpdate, { type: value });
            // }
            console.log(value);
            console.log(propType);
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
        const boldBtn = this.createButton(
          '<i class="fa-solid fa-bold"></i>',
          () => {
            editor.toggleStyles({ bold: true });
            console.log(editor.getActiveStyles());
          }
        );
        formattingToolbarElement.appendChild(boldBtn);
        // italicred
        const italicBtn = this.createButton(
          '<i class="fa-solid fa-italic"></i>',
          () => {
            editor.toggleStyles({ italic: true });
          }
        );
        formattingToolbarElement.appendChild(italicBtn);
        // underline
        const underlineBtn = this.createButton(
          '<i class="fa-solid fa-underline"></i>',
          () => {
            editor.toggleStyles({ underline: true });
          }
        );
        formattingToolbarElement.appendChild(underlineBtn);
        // strike through
        const strikethroughBtn = this.createButton(
          '<i class="fa-solid fa-strikethrough"></i>',
          () => {
            editor.toggleStyles({ strike: true });
          }
        );

        formattingToolbarElement.appendChild(strikethroughBtn);

        // align left btn
        const alignLeftBtn = this.createButton(
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
        const alignCenterBtn = this.createButton(
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
        const alignRightBtn = this.createButton(
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
            { text: 'A Red', value: 'red' },
            { text: 'A Green', value: 'green' },
            { text: 'A Blue', value: 'blue' },
          ],
          (value) => {
            editor.toggleStyles({ textColor: value });
          }
        );

        formattingToolbarElement.appendChild(colorSelect);

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
  }
}
