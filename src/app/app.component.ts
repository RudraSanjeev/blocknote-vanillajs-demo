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

    let element: HTMLElement | null = null; // Declare element variable outside the event handler

    // <-------------sideMenu --------------------->
    editor.sideMenu.onUpdate((sideMenuState) => {
      if (!element) {
        element = document.createElement('div');
        element.style.background = 'gray';
        element.style.position = 'absolute';
        element.style.top = '';
        element.style.padding = '5px';
        element.style.opacity = '0.8';

        const addBtn = this.createButton('+', () => {
          editor.sideMenu.addBlock();
        });
        element.appendChild(addBtn);

        const dragBtn = this.createButton('::', () => {});
        dragBtn.addEventListener('dragstart', editor.sideMenu.blockDragStart);
        dragBtn.addEventListener('dragend', editor.sideMenu.blockDragEnd);
        dragBtn.draggable = true;
        element.style.display = 'none';
        element.appendChild(dragBtn);

        document.getElementById('root')!.appendChild(element);
      }

      if (sideMenuState.show) {
        element.style.display = 'block';
        element.style.top = sideMenuState.referencePos.top + 'px';
        element.style.left =
          sideMenuState.referencePos.x - element.offsetWidth + 'px';
      } else {
        element.style.display = 'none';
      }
    });

    let formattingToolbarElement: HTMLElement | null = null;

    // <-------------formattingToolbar --------------------->
    editor.formattingToolbar.onUpdate((formattingToolbarState) => {
      if (!formattingToolbarElement) {
        formattingToolbarElement = document.createElement('div');
        formattingToolbarElement.style.background = 'lightgray';
        formattingToolbarElement.style.position = 'absolute';
        formattingToolbarElement.style.top = '';
        formattingToolbarElement.style.padding = '5px';
        formattingToolbarElement.style.opacity = '0.8';

        // Add buttons for different formatting options
        const boldBtn = this.createButton('B', () => {
          this.editor.formattingToolbar.toggleBold();
        });
        formattingToolbarElement.appendChild(boldBtn);

        const italicBtn = this.createButton('I', () => {
          editor.formattingToolbar.toggleItalic();
        });
        formattingToolbarElement.appendChild(italicBtn);

        const underlineBtn = this.createButton('U', () => {
          editor.formattingToolbar.toggleUnderline();
        });
        formattingToolbarElement.appendChild(underlineBtn);

        // Add more buttons for other formatting options as needed

        document.getElementById('root')!.appendChild(formattingToolbarElement);
      }

      if (formattingToolbarState.show) {
        formattingToolbarElement.style.display = 'block';
        formattingToolbarElement.style.top =
          formattingToolbarState.referencePos.top + 'px';
        formattingToolbarElement.style.left =
          formattingToolbarState.referencePos.x + 'px'; // Adjust positioning as necessary
      } else {
        formattingToolbarElement.style.display = 'none';
      }
    });
  }
}
