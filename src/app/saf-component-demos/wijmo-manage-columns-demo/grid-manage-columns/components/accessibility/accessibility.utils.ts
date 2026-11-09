export const defaultInstruction = `
    To pick up a draggable item, press the space bar.
    While dragging, use the arrow keys to move the item.
    Press space again to drop the item in its new position, or press escape to cancel.
  `;

export const onDragStart = (active: string) =>
  `Picked up draggable item ${active}.`;

export const onDragOver = (active: string, over?: string) => {
  if (over) {
    return `Draggable item ${active} was moved over droppable area ${over}. Press enter or space to drop the column`;
  }

  return `Draggable item ${active} is no longer over a droppable area. Press enter or space to drop the column`;
};

export const onDragEnd = (active: string, over?: string) => {
  if (over) {
    return `Draggable item ${active} was dropped over droppable area ${over}`;
  }

  return `Draggable item ${active} was dropped.`;
};

export const onDragCancel = (active: string) =>
  `Dragging was cancelled. Draggable item ${active} was dropped.`;
