import { Component, Renderer2, ViewChild, ElementRef, HostListener } from '@angular/core';

const enum Status {
  OFF = 0,
  RESIZE = 1,
  MOVE = 2
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  width = 300;
  height = 150;
  color = 'red';
  init:any;
 
  left: number = 15;
  top: number = 15;

  width2 = 300;
  height2 = 300;
  color2 = 'red';
  init2:any;
 
  left2: number = 200;
  top2: number = 300;

  @ViewChild("box") public box: ElementRef;
  private boxPosition: { left: number, top: number };
  private containerPos: { left: number, top: number, right: number, bottom: number };
  public mouse: {x: number, y: number}
  public status: Status = Status.OFF;
  private mouseClick: {x: number, y: number, left: number, top: number}


  @ViewChild("box2") public box2: ElementRef;
  private boxPosition2: { left: number, top: number };
  private containerPos2: { left: number, top: number, right: number, bottom2: number };
  public mouse2: {x: number, y: number}
  public status2: Status = Status.OFF;
  private mouseClick2: {x: number, y: number, left: number, top: number}

  constructor(private renderer: Renderer2) {}
  ngAfterViewInit(){
    this.loadBox();
    this.loadContainer();
  }
  
  private loadContainer(){
    const left = this.boxPosition.left - this.left;
    const top = this.boxPosition.top - this.top;
    const right = left + 600;
    const bottom = top + 450;
    this.containerPos = { left, top, right, bottom };

    const left2 = this.boxPosition2.left - this.left2;
    const top2 = this.boxPosition2.top - this.top2;
    const right2 = left2 + 600;
    const bottom2 = top2 + 450;
    this.containerPos2 = { left2, top2, right2, bottom2 };
  }

  private loadBox(){
    const {left, top} = this.box.nativeElement.getBoundingClientRect();
    this.boxPosition = {left, top};

    const {left2, top2} = this.box2.nativeElement.getBoundingClientRect();
    this.boxPosition2 = {left2, top2};
  }

  dragEvent(event: MouseEvent, status: number,box:number) {
console.log(box);
    if(box == 1){
    if(status === 1) {
      this.init={x:event.pageX,width:this.width,height:this.height}
      console.log("entra");

      event.stopPropagation();
    } else if(status === 2) {
      this.mouseClick = { x: event.clientX, y: event.clientY, left: this.left, top: this.top };
    } else {
      this.loadBox()
    };

    this.status = status;
    }

    if(box == 2){
      if(status === 1) {
        this.init2={x:event.pageX,width:this.width2,height:this.height2}
        event.stopPropagation();
      } else if(status === 2) {
        this.mouseClick = { x: event.clientX, y: event.clientY, left: this.left2, top: this.top2 };
      } else {
        this.loadBox()
      };
  
      this.status2 = status;
      }
  }

  getHeight(length, ratio) {
    let height = length / Math.sqrt(Math.pow(ratio, 2) + 1);
    return Math.round(height);
  }

  getWidth(length, ratio) {
    let width = length / Math.sqrt(1 / (Math.pow(ratio, 2) + 1));
    return Math.round(width);
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent){
    this.mouse = { x: event.clientX, y: event.clientY };
    var id = "1";
console.log(event);
    if(this.status === Status.RESIZE) this.resize(event);
    else if(this.status === Status.MOVE) this.move(id);
  }

  private resize(e){
    const newWidth = this.init.width + e.pageX - this.init.x;
    const newHeight = this.init.height + e.pageX - this.init.x;
    const minSize = 10;

    if (newWidth < minSize || newHeight < minSize) return;

    this.width = newWidth;
    this.height = newHeight;

    const newWidth2 = this.init2.width + e.pageX - this.init2.x;
    const newHeight2 = this.init2.height + e.pageX - this.init2.x;
    const minSize2 = 10;

    if (newWidth2 < minSize2 || newHeight2 < minSize2) return;

    this.width2 = newWidth2;
    this.height2 = newHeight2;
  }

  private resizeCondMeet(){
    return (this.mouse.x < this.containerPos.right && this.mouse.y < this.containerPos.bottom);
  }

  private move(id){
    var left = this.mouseClick.left + (this.mouse.x - this.mouseClick.x);
    var top = this.mouseClick.top + (this.mouse.y - this.mouseClick.y);

   var b = id+"1";

   console.log("se" + b);

  }
}
