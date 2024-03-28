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
  editor: HTMLElement;

  uiElement: UIElement = 'linkToolbar';

  ngOnInit() {
    this.initializeEditor();
  }

  createButton(text: string, onClick?: () => void) {
    const element = document.createElement('a');
    element.href = '#';
    element.text = text;
    // element.style.border = 'none';
    // element.style.outline = 'none';
    // element.style.background = 'transparent';
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
  initializeEditor() {
    const editor = BlockNoteEditor.create();
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

        // Add buttons for formatting options
        //bold
        const boldBtn = this.createButton('B', () => {
          editor.toggleStyles({ bold: true });
          console.log(editor.getActiveStyles());
        });
        formattingToolbarElement.appendChild(boldBtn);
        // italicred
        const italicBtn = this.createButton('I', () => {
          editor.toggleStyles({ italic: true });
        });
        formattingToolbarElement.appendChild(italicBtn);
        // underline
        const underlineBtn = this.createButton('U', () => {
          editor.toggleStyles({ underline: true });
        });
        formattingToolbarElement.appendChild(underlineBtn);
        // strike through
        const strikethroughBtn = this.createButton('S', () => {
          editor.toggleStyles({ strike: true });
        });

        formattingToolbarElement.appendChild(strikethroughBtn);
        // align left btn
        const alignLeftBtn = this.createButton('L', () => {
          editor.getSelection().blocks[0].props.textAlignment = 'center';
          console.log(editor.getSelection().blocks[0].props);
        });
        formattingToolbarElement.appendChild(alignLeftBtn);
        // // color btn
        // const colorRedBtn = this.createButton('A', () => {
        //   editor.toggleStyles({ textColor: 'red' });
        // });
        // formattingToolbarElement.appendChild(colorRedBtn);
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
