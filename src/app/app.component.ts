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
  styleUrl: './app.component.scss',
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
    element.style.margin = '10px';
    element.style.textDecoration = 'none';

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
        sideMenuElement.style.background = 'gray';
        sideMenuElement.style.position = 'absolute';
        // sideMenuElement.style.top = '';
        sideMenuElement.style.padding = '5px';
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
        formattingToolbarElement.style.background = 'gray';
        formattingToolbarElement.style.position = 'absolute';
        formattingToolbarElement.style.top = '50px';
        formattingToolbarElement.style.padding = '5px';
        formattingToolbarElement.style.opacity = '0.8';

        // Add buttons for formatting options
        //bold
        const boldBtn = this.createButton('B', () => {
          editor.toggleStyles({ bold: true });
        });
        formattingToolbarElement.appendChild(boldBtn);
        // italic
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
        // strike through
        // const changeColorBtn = this.createButton('Color', () => {
        //   editor.toggleStyles({ textColor: 'yellow' });
        //   console.log(editor.getActiveStyles());
        //   const inlineContent = document.querySelector('.bn-inline-content');
        //   if (inlineContent) {
        //     const spans = inlineContent.querySelectorAll(
        //       'span[data-text-color]'
        //     );
        //     spans.forEach((span: HTMLElement) => {
        //       span.style.color = 'yellow';
        //     });
        //   }
        // });
        // formattingToolbarElement.appendChild(changeColorBtn);

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
