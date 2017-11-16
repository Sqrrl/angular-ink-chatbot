import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[botChatScroll]'
})
export class ChatScrollDirective implements OnInit {

  constructor(private elementRef: ElementRef) {}

  public ngOnInit() {
    this.scrollToBottom();

    (new MutationObserver(() => {
      this.scrollToBottom();
    })).observe(this.elementRef.nativeElement, { childList: true, subtree: true });
  }

  private scrollToBottom() {
    this.elementRef.nativeElement.scroll({
      top: this.elementRef.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }
}
