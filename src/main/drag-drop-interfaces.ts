// =================== INTERFACES ===================
namespace DDInterfaces {
  interface Draggable {
    dragStartHandler: (event: DragEvent) => void;
    dragEndHandler: (event: DragEvent) => void;
  }

  interface DropTarget {
    dragOverHandler: (event: DragEvent) => void;
    dropHandler: (event: DragEvent) => void;
    dragLeaveHandler: (event: DragEvent) => void;
  }
}