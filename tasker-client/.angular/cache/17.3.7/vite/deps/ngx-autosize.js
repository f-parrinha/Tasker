import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Injectable,
  Input,
  InputFlags,
  NgModule,
  NgZone,
  Output,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵlistener
} from "./chunk-VCH6JVBI.js";
import "./chunk-WSA2QMXP.js";
import "./chunk-J4B6MK7R.js";

// node_modules/ngx-autosize/fesm2020/ngx-autosize.mjs
var WindowRef = class {
  get nativeWindow() {
    return window;
  }
};
WindowRef.ɵfac = function WindowRef_Factory(t) {
  return new (t || WindowRef)();
};
WindowRef.ɵprov = ɵɵdefineInjectable({
  token: WindowRef,
  factory: WindowRef.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WindowRef, [{
    type: Injectable
  }], null, null);
})();
var MAX_LOOKUP_RETRIES = 3;
var AutosizeDirective = class {
  constructor(element, _window, _zone) {
    this.element = element;
    this._window = _window;
    this._zone = _zone;
    this.onlyGrow = false;
    this.useImportant = false;
    this.resized = new EventEmitter();
    this.autosize = true;
    this.retries = 0;
    this._destroyed = false;
    if (this.element.nativeElement.tagName !== "TEXTAREA") {
      this._findNestedTextArea();
    } else {
      this.textAreaEl = this.element.nativeElement;
      this.textAreaEl.style["overflow-y"] = "hidden";
      this._onTextAreaFound();
    }
  }
  set minRows(value) {
    this._minRows = +value;
    if (this.textAreaEl) {
      this.textAreaEl.rows = this._minRows;
    }
  }
  set _autosize(autosize) {
    this.autosize = typeof autosize === "boolean" ? autosize : true;
  }
  onInput(textArea) {
    this.adjust();
  }
  ngOnDestroy() {
    this._destroyed = true;
    if (this._windowResizeHandler) {
      this._window.nativeWindow.removeEventListener("resize", this._windowResizeHandler, false);
    }
  }
  ngAfterContentChecked() {
    this.adjust();
  }
  ngOnChanges(changes) {
    this.adjust(true);
  }
  _findNestedTextArea() {
    this.textAreaEl = this.element.nativeElement.querySelector("TEXTAREA");
    if (!this.textAreaEl && this.element.nativeElement.shadowRoot) {
      this.textAreaEl = this.element.nativeElement.shadowRoot.querySelector("TEXTAREA");
    }
    if (!this.textAreaEl) {
      if (this.retries >= MAX_LOOKUP_RETRIES) {
        console.warn("ngx-autosize: textarea not found");
      } else {
        this.retries++;
        setTimeout(() => {
          this._findNestedTextArea();
        }, 100);
      }
      return;
    }
    this.textAreaEl.style["overflow-y"] = "hidden";
    this._onTextAreaFound();
  }
  _onTextAreaFound() {
    this._addWindowResizeHandler();
    setTimeout(() => {
      this.adjust();
    });
  }
  _addWindowResizeHandler() {
    this._windowResizeHandler = debounce(() => {
      this._zone.run(() => {
        this.adjust();
      });
    }, 200);
    this._zone.runOutsideAngular(() => {
      this._window.nativeWindow.addEventListener("resize", this._windowResizeHandler, false);
    });
  }
  adjust(inputsChanged = false) {
    if (this.autosize && !this._destroyed && this.textAreaEl && this.textAreaEl.parentNode) {
      const currentText = this.textAreaEl.value;
      if (inputsChanged === false && currentText === this._oldContent && this.textAreaEl.offsetWidth === this._oldWidth) {
        return;
      }
      this._oldContent = currentText;
      this._oldWidth = this.textAreaEl.offsetWidth;
      const clone = this.textAreaEl.cloneNode(true);
      const parent = this.textAreaEl.parentNode;
      clone.style.width = this.textAreaEl.offsetWidth + "px";
      clone.style.visibility = "hidden";
      clone.style.position = "absolute";
      clone.textContent = currentText;
      parent.appendChild(clone);
      clone.style["overflow-y"] = "hidden";
      clone.style.height = "auto";
      let height = clone.scrollHeight;
      let computedStyle = this._window.nativeWindow.getComputedStyle(clone, null);
      height += parseInt(computedStyle.getPropertyValue("border-top-width"));
      height += parseInt(computedStyle.getPropertyValue("border-bottom-width"));
      if (computedStyle.getPropertyValue("box-sizing") === "content-box") {
        height -= parseInt(computedStyle.getPropertyValue("padding-top"));
        height -= parseInt(computedStyle.getPropertyValue("padding-bottom"));
      }
      const oldHeight = this.textAreaEl.offsetHeight;
      const willGrow = height > oldHeight;
      if (this.onlyGrow === false || willGrow) {
        const lineHeight = this._getLineHeight();
        const rowsCount = height / lineHeight;
        if (this._minRows && this._minRows >= rowsCount) {
          height = this._minRows * lineHeight;
        } else if (this.maxRows && this.maxRows <= rowsCount) {
          const maxHeight = this.maxRows * lineHeight;
          height = this.onlyGrow ? Math.max(maxHeight, oldHeight) : maxHeight;
          this.textAreaEl.style["overflow-y"] = "auto";
        } else {
          this.textAreaEl.style["overflow-y"] = "hidden";
        }
        const heightStyle = height + "px";
        const important = this.useImportant ? "important" : "";
        this.textAreaEl.style.setProperty("height", heightStyle, important);
        this.resized.emit(height);
      }
      parent.removeChild(clone);
    }
  }
  _getLineHeight() {
    let lineHeight = parseInt(this.textAreaEl.style.lineHeight, 10);
    if (isNaN(lineHeight) && this._window.nativeWindow.getComputedStyle) {
      const styles = this._window.nativeWindow.getComputedStyle(this.textAreaEl);
      lineHeight = parseInt(styles.lineHeight, 10);
    }
    if (isNaN(lineHeight)) {
      const fontSize = this._window.nativeWindow.getComputedStyle(this.textAreaEl, null).getPropertyValue("font-size");
      lineHeight = Math.floor(parseInt(fontSize.replace("px", ""), 10) * 1.5);
    }
    return lineHeight;
  }
};
AutosizeDirective.ɵfac = function AutosizeDirective_Factory(t) {
  return new (t || AutosizeDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(WindowRef), ɵɵdirectiveInject(NgZone));
};
AutosizeDirective.ɵdir = ɵɵdefineDirective({
  type: AutosizeDirective,
  selectors: [["", "autosize", ""]],
  hostBindings: function AutosizeDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("input", function AutosizeDirective_input_HostBindingHandler($event) {
        return ctx.onInput($event.target);
      });
    }
  },
  inputs: {
    minRows: "minRows",
    _autosize: [InputFlags.None, "autosize", "_autosize"],
    maxRows: "maxRows",
    onlyGrow: "onlyGrow",
    useImportant: "useImportant"
  },
  outputs: {
    resized: "resized"
  },
  features: [ɵɵNgOnChangesFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AutosizeDirective, [{
    type: Directive,
    args: [{
      selector: "[autosize]"
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: WindowRef
    }, {
      type: NgZone
    }];
  }, {
    minRows: [{
      type: Input
    }],
    _autosize: [{
      type: Input,
      args: ["autosize"]
    }],
    maxRows: [{
      type: Input
    }],
    onlyGrow: [{
      type: Input
    }],
    useImportant: [{
      type: Input
    }],
    resized: [{
      type: Output
    }],
    onInput: [{
      type: HostListener,
      args: ["input", ["$event.target"]]
    }]
  });
})();
function debounce(func, timeout) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}
var AutosizeModule = class {
};
AutosizeModule.ɵfac = function AutosizeModule_Factory(t) {
  return new (t || AutosizeModule)();
};
AutosizeModule.ɵmod = ɵɵdefineNgModule({
  type: AutosizeModule,
  declarations: [AutosizeDirective],
  exports: [AutosizeDirective]
});
AutosizeModule.ɵinj = ɵɵdefineInjector({
  providers: [WindowRef],
  imports: [[]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AutosizeModule, [{
    type: NgModule,
    args: [{
      declarations: [AutosizeDirective],
      imports: [],
      providers: [WindowRef],
      exports: [AutosizeDirective]
    }]
  }], null, null);
})();
export {
  AutosizeDirective,
  AutosizeModule,
  WindowRef
};
//# sourceMappingURL=ngx-autosize.js.map
